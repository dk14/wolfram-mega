import { MempoolConfig } from "../../config";
import { api as ndapi, Api, OracleId, PagingDescriptor, OracleCapability } from "../../node";
import { PeerAddr } from "../../p2p";
import * as http from 'http';
import * as url from 'url';
import { Collector, TraderApi, traderApi } from "../trader-api";
import { traderStorage, TraderQuery} from "../client-storage/trader-storage";
import * as fs from 'fs'
import { generateClosingTransaction, generateOpeningTransaction } from "../contracts/generate-cardano-tx";
import * as btc from "../contracts/generate-btc-tx";
import { p2pktr } from "../contracts/btc/tx";
import Sandbox from "@nyariv/sandboxjs";

const safeEval = (expression: string, data: any): any => {
    const sandbox = new Sandbox()
    const exec = sandbox.compile("return " + expression)
    const res = exec(data).run()
    return res
}

export const startTraderService = (cfg: MempoolConfig<PeerAddr>) => {
    global.cfg = cfg
    const storage = traderStorage(cfg.trader.dbPath, 1)

    const api: TraderApi<TraderQuery<OracleId>, TraderQuery<OracleCapability>> = traderApi(cfg.trader, cfg, ndapi, storage)
    const collectors: { [id: string] : Collector<any> } = {}

    http.createServer(async (req, res) => {
        res.statusCode = 200;

        try {

            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            const reqUrl =  url.parse(req.url!, true)
            const tag: string = typeof reqUrl.query.tag === "string" ? reqUrl.query.tag : ""

            const pageNo: number = typeof reqUrl.query.pageNo === "string" ? parseInt(reqUrl.query.pageNo as string) : 0
            const pageSize: number = typeof reqUrl.query.pageSize === "string" ? parseInt(reqUrl.query.pageSize as string) : 10
            const query: string = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : "true"
            const q = {where: async x => {return safeEval(query, x)}}
            const pubkey: string = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : ""
    
            const paging: PagingDescriptor = {
                page: pageNo,
                chunkSize: pageSize
            }

            if (req.method === 'GET' && (reqUrl.pathname == '/index.html' || reqUrl.pathname == '/index.htm') || reqUrl.pathname == '/') {
                res.setHeader('content-Type', 'text/html');
                res.end(fs.readFileSync(__dirname + '/html/trader/index.html').toString())
                return
            }

            if(reqUrl.pathname == '/broadcastIssuedOffers') {
                api.startBroadcastingIssuedOffers()
            } else if(reqUrl.pathname == '/broadcastIssuedReports') {
                api.startBroadcastingIssuedReports()
            } else if(reqUrl.pathname == '/pauseBroadcastIssuedOffers') {
                api.stopBroadcastingIssuedOffers()
            } else if(reqUrl.pathname == '/pauseBroadcastIssuedReports') {
                api.stopBroadcastingIssuedReports()
            } else if(reqUrl.pathname == '/listCollectors') {
                res.end(JSON.stringify(Object.keys(collectors).map(tag => `${collectors[tag].type}:${tag}`)))
            } else if(reqUrl.pathname == '/listOracles') {
                res.end(JSON.stringify(await storage.queryOracles(q, paging)))
            } else if(reqUrl.pathname == '/listCapabilities') {
                res.end(JSON.stringify(await storage.queryCapabilities(q, paging)))
            } else if(reqUrl.pathname == '/capabilityEndpoint') {
                const out = await storage.queryCapabilities({where: async cp => cp.capabilityPubKey === pubkey}, paging)
                const found = out.map(cp => (cp.endpoint ?? ''))
                if (found.length == 0) {
                    res.end(JSON.stringify(''))
                } else {
                    res.end(JSON.stringify(found[0]))
                }
                
            } else if(reqUrl.pathname == '/listReports') {
                res.end(JSON.stringify(await storage.queryReports(q, paging)))
            } else if(reqUrl.pathname == '/listOffers') {
                res.end(JSON.stringify(await storage.queryOffers(q, paging)))
            }  else if(reqUrl.pathname == '/listIssuedReports') {
                res.end(JSON.stringify(await storage.queryIssuedReports(q, paging)))
            } else if(reqUrl.pathname == '/listIssuedOffers') {
                res.end(JSON.stringify(await storage.queryIssuedOffers(q, paging)))
            } else if(reqUrl.pathname == '/deleteOracle') {
                await storage.removeOracles([pubkey])
                res.end()
            } else if(reqUrl.pathname == '/deleteCapability') {
                await storage.removeCps([pubkey])
                res.end()
            } else if(reqUrl.pathname == '/deleteOffer') {
                await storage.removeOffers([pubkey])
                res.end()
            } else if(reqUrl.pathname == '/deleteReport') {
                await storage.removeReports([pubkey])
                res.end()
            } else if(reqUrl.pathname == '/deleteIssuedOffer') {
                await storage.removeIssuedOffers([pubkey])
                res.end()
            } else if(reqUrl.pathname == '/deleteIssuedReport') {
                await storage.removeIssuedReports([pubkey])
                res.end()
            } else if (reqUrl.pathname == '/cancelCollector') {
                if (collectors[tag]) {
                    collectors[tag].cancel()
                    delete collectors[tag]
                }
                res.end()
            }
    
            if (req.method === 'POST') {
                var body = ''
                req.on('data',  function (chunk) {
                    body += chunk;
                });
                req.on('end', async function () {
                    try {
                        const postBody = JSON.parse(body);
                        res.statusCode = 201;
                        res.setHeader('content-Type', 'Application/json');
                        if(reqUrl.pathname == '/issueOffer') {
                            await api.issueOffer(postBody)
                        } else if (reqUrl.pathname == '/issueReport') {
                            await  api.issueReport(postBody)
                        } else if (reqUrl.pathname == '/collectCapabilities') {
                            const collector = await api.collectCapabilities(tag, 
                                {where: async x => {return safeEval(postBody.oquery, x)}}, 
                                async x => {return safeEval(postBody.opredicate, x)}, 
                                async x => {return safeEval(postBody.predicate, x)}
                            )
                            if (Object.values(collectors).length < cfg.trader!.maxCollectors) {
                                if (collectors[collector.tag]) {
                                    collectors[collector.tag].cancel()
                                }
                                collectors[collector.tag] = collector
                            }
                        } else if (reqUrl.pathname == '/collectOffers') {
                            const collector = await api.collectOffers(tag, 
                                {where: async x => {return safeEval(postBody.cpquery, x)}}, 
                                async x => {return safeEval(postBody.cppredicate, x)}, 
                                async x => {return safeEval(postBody.predicate, x)}
                            )
                            if (Object.values(collectors).length < cfg.trader!.maxCollectors) {
                                if (collectors[collector.tag]) {
                                    collectors[collector.tag].cancel()
                                }
                                collectors[collector.tag] = collector
                            }
                        } else if (reqUrl.pathname == '/collectReports') {
                            const collector = await api.collectReports(tag, 
                                {where: async x => {return safeEval(postBody.oquery, x)}}, 
                                async x => {return safeEval(postBody.opredicate, x)}, 
                                async x => {return safeEval(postBody.predicate, x)}
                            )
                            if (Object.values(collectors).length < cfg.trader!.maxCollectors) {
                                if (collectors[collector.tag]) {
                                    collectors[collector.tag].cancel()
                                }
                                collectors[collector.tag] = collector
                            }
                        } else if (reqUrl.pathname == '/collectOracles') {
                            const collector = await api.collectOracles(tag, async x => {return safeEval(postBody.predicate, x)})
                            if (Object.values(collectors).length < cfg.trader!.maxCollectors) {
                                if (collectors[collector.tag]) {
                                    collectors[collector.tag].cancel()
                                }
                                collectors[collector.tag] = collector
                            }
                        }
                        
                        if (reqUrl.pathname == '/generateOpeningTransaction') {
                            res.end(JSON.stringify(await generateOpeningTransaction(cfg.trader.heliosNetwork ?? "https://d1t0d7c2nekuk0.cloudfront.net/preprod.json", postBody)))
                        } else if (reqUrl.pathname == '/generateClosingTransaction') {
                            res.end(JSON.stringify(await generateClosingTransaction(cfg.trader.heliosNetwork ?? "https://d1t0d7c2nekuk0.cloudfront.net/preprod.json", postBody)))
                        } else if (reqUrl.pathname == '/btc/generateOpeningTransaction') {
                            res.end(JSON.stringify(await btc.generateOpeningTransaction(postBody)))
                        } else if (reqUrl.pathname == '/btc/generateClosingTransaction') {
                            res.end(JSON.stringify(await btc.generateClosingTransaction(postBody)))
                        } else if (reqUrl.pathname == '/btc/generateCetTransaction') {
                            res.end(JSON.stringify(await btc.generateCetTransaction(postBody)))
                        } else if (reqUrl.pathname == '/btc/generateCetRedemptionTransaction') {
                            res.end(JSON.stringify(await btc.generateCetRedemptionTransaction(postBody)))
                        } else if (reqUrl.pathname == '/btc/pub2addr') {
                            res.end(JSON.stringify(p2pktr(postBody).address))
                        }else {
                            res.end("{}")
                        }

                    } catch (err) {
                        console.error(err)
                        if (!res.writableEnded){
                            res.end(JSON.stringify({error: err.message}))
                        }
                    }
                })
            }
            
        } catch (err) {
            console.error(err)
            if (!res.writableEnded){
                res.end(JSON.stringify({error: err.message}))
            }
        }
    }).listen(cfg.trader.httpPort)

}
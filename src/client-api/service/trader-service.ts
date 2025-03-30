import { MempoolConfig } from "../../config";
import { api as ndapi, Api, OracleId, PagingDescriptor } from "../../node";
import { PeerAddr } from "../../p2p";
import * as http from 'http';
import * as url from 'url';
import * as safeEval from 'safe-eval'
import { Collector, TraderApi, traderApi } from "../trader-api";
import { traderStorage, TraderQuery} from "../client-storage/trader-storage";
import * as fs from 'fs'

export const startTraderService = (cfg: MempoolConfig<PeerAddr>) => {
    const storage = traderStorage(cfg.trader.dbPath, 5)

    const api: TraderApi<TraderQuery<OracleId>> = traderApi(cfg.trader, cfg, ndapi, storage)
    const collectors: { [id: string] : Collector<any> } = {}

    http.createServer(async (req, res) => {
        res.statusCode = 200;

        try {

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
                res.end(JSON.stringify(Object.keys(collectors)))
            } else if(reqUrl.pathname == '/listOracles') {
                res.end(JSON.stringify(await storage.queryOracles(q, paging)))
            } else if(reqUrl.pathname == '/listCapabilities') {
                res.end(JSON.stringify(await storage.queryCapabilities(q, paging)))
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
            } else if(reqUrl.pathname == '/deleteCapability') {
                await storage.removeCps([pubkey])
            } else if(reqUrl.pathname == '/deleteOffer') {
                await storage.removeOffers([pubkey])
            } else if(reqUrl.pathname == '/deleteReport') {
                await storage.removeReports([pubkey])
            } else if(reqUrl.pathname == '/deleteIssuedOffer') {
                await storage.removeIssuedOffers([pubkey])
            } else if(reqUrl.pathname == '/deleteIssuedReports') {
                await storage.removeIssuedReports([pubkey])
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
                        } else if (reqUrl.pathname == '/cancelCollector') {
                            if (collectors[tag]) {
                                collectors[tag].cancel()
                            }
                        }

                        res.end({})

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
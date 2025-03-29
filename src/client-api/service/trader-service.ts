import { MempoolConfig } from "../../config";
import { api as ndapi, Api, OracleId } from "../../node";
import { PeerAddr } from "../../p2p";
import * as http from 'http';
import * as url from 'url';
import * as safeEval from 'safe-eval'
import { Collector, TraderApi, traderApi } from "../trader-api";
import { traderStorage, TraderQuery} from "../client-storage/trader-storage";

export const startTraderService = (cfg: MempoolConfig<PeerAddr>) => {
    const storage = traderStorage(cfg.trader.dbPath, 5)

    const api: TraderApi<TraderQuery<OracleId>> = traderApi(cfg.trader, cfg, ndapi, storage)
    const collectors: { [id: string] : Collector<any> } = {}

    http.createServer(async (req, res) => {
        res.statusCode = 200;

        try {

            const reqUrl =  url.parse(req.url!, true)
            const tag: string = typeof reqUrl.query.tag === "string" ? reqUrl.query.tag : ""

            if(reqUrl.pathname == '/broadcastIssuedOffers') {
                api.startBroadcastingIssuedOffers()
            } else if(reqUrl.pathname == '/broadcastIssuedReports') {
                api.startBroadcastingIssuedReports()
            } else if(reqUrl.pathname == '/pauseBroadcastIssuedOffers') {
                api.stopBroadcastingIssuedOffers()
            } else if(reqUrl.pathname == '/pauseBroadcastIssuedReports') {
                api.stopBroadcastingIssuedReports()
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
                            const collector = await api.collectCapabilities(tag, {where: safeEval(postBody.oquery)}, safeEval(postBody.opredicate), safeEval(postBody.predicate))
                            if (Object.values(collectors).length < cfg.trader!.maxCollectors) {
                                if (collectors[collector.tag]) {
                                    collectors[collector.tag].cancel()
                                }
                                collectors[collector.tag] = collector
                            }
                        } else if (reqUrl.pathname == '/collectOffers') {
                            const collector = await api.collectOffers(tag, {where: safeEval(postBody.oquery)}, safeEval(postBody.opredicate), safeEval(postBody.predicate))
                            if (Object.values(collectors).length < cfg.trader!.maxCollectors) {
                                if (collectors[collector.tag]) {
                                    collectors[collector.tag].cancel()
                                }
                                collectors[collector.tag] = collector
                            }
                        } else if (reqUrl.pathname == '/collectReports') {
                            const collector = await api.collectReports(tag, {where: safeEval(postBody.oquery)}, safeEval(postBody.opredicate), safeEval(postBody.predicate))
                            if (Object.values(collectors).length < cfg.trader!.maxCollectors) {
                                if (collectors[collector.tag]) {
                                    collectors[collector.tag].cancel()
                                }
                                collectors[collector.tag] = collector
                            }
                        } else if (reqUrl.pathname == '/collectReports') {
                            const collector = await api.collectOracles(tag, safeEval(postBody.predicate))
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

                        //TODO add storage queries

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
    }).listen(cfg.oracle.httpPort)

    
    
}
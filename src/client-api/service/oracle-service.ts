import Stream from "stream";
import { MempoolConfig } from "../../config";
import { api as ndapi, PagingDescriptor } from "../../node";
import { PeerAddr, connectionPool } from "../../p2p";
import { capabilityStorage } from "../client-storage/capability-storage";
import { ConnectionPoolCfg } from "../connection-pool";
import { OracleControlAPI, oracleControlApi } from "../oracle-control-api";
import * as http from 'http';
import * as url from 'url';
import * as websocket from 'websocket-stream'
import * as readline from 'readline'
import * as fs from 'fs'
import * as safeEval from 'safe-eval'

export const startOracleService = (cfg: MempoolConfig<PeerAddr>) => {
    const storage = capabilityStorage(cfg.oracle.dbPath, 1, 100)
    const concfg: ConnectionPoolCfg = {
        maxConnections: cfg.maxConnections
    }
    const api: OracleControlAPI<PeerAddr> = oracleControlApi(cfg, ndapi, storage, connectionPool, concfg)
    api.startAdvertising(cfg.oracle)

    http.createServer(async (req, res) => {
        res.statusCode = 200;

        try {

            const reqUrl =  url.parse(req.url!, true)
            const pubkey: string = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : ""
            const difficulty: string = typeof reqUrl.query.difficulty === "string" ? reqUrl.query.difficulty : ""
            const pageNo: number = typeof reqUrl.query.pageNo === "string" ? parseInt(reqUrl.query.pageNo as string) : 0
            const pageSize: number = typeof reqUrl.query.pageSize === "string" ? parseInt(reqUrl.query.pageSize as string) : 10
            const query: string = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : "true"
            
    
            const paging: PagingDescriptor = {
                page: pageNo,
                chunkSize: pageSize
            }

            if (req.method === 'GET' && (reqUrl.pathname == '/index.html' || reqUrl.pathname == '/index.htm') || reqUrl.pathname == '/') {
                res.setHeader('content-Type', 'text/html');
                res.end(fs.readFileSync(__dirname + '/html/oracle/index.html').toString())
                return
            }

            if(reqUrl.pathname == '/start') {
                api.startAdvertising(cfg.oracle)
            } else if(reqUrl.pathname == '/pause') {
                api.pauseAdvertising(cfg.oracle)
            } else if(reqUrl.pathname == '/deactivateCapability') {
                api.deactivateCapability(pubkey)
            } else if(reqUrl.pathname == '/dropCapability') {
                api.dropCapability(pubkey)
            } else if(reqUrl.pathname == '/activateCapability') {
                api.dropCapability(pubkey)
            } else if(reqUrl.pathname == '/upgradeOraclePow') {
                api.upgradeOraclePow(parseInt(difficulty))
            } else if(reqUrl.pathname == '/upgradeCapabilityPow') {
                api.upgradeCapabilityPow(pubkey,parseInt(difficulty))
            } else if(reqUrl.pathname == '/viewStoredCapabilities') {
                const q = {where: async x => {return safeEval(query, x)}}
                const cps = await storage.listCapabilities(q, paging)
                res.end(JSON.stringify(cps))
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
                        if(reqUrl.pathname == '/addCapability') {
                            api.addCapability(postBody)
                        }
                        res.end("{}")

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

    const wsserver = websocket.createServer({server: http.createServer(), port: cfg.oracle.wsPort })
    
    wsserver.on("stream", (stream, req) => {

        const reqUrl =  url.parse(req.url!, true)

        const rl = readline.createInterface(stream, stream);

        // we assume single client app, so subscriptions are mutually exclusive, one subscriber per service
        // last opened socket will get active stream

        if(reqUrl.pathname == '/ranks') {
            api.watchMyRankSample(async ev => {  
                rl.write(JSON.stringify(ev) + "\n")
                
            })
        } else if(reqUrl.pathname == '/signCp') {
            api.watchSignMyCapabilityBroadcasts(ev => {  
                rl.write(JSON.stringify(ev) + "\n")
                rl.prompt()
                return new Promise(resolve => rl.on('line', line => resolve(JSON.parse(line))))
            })
        } else if(reqUrl.pathname == '/signAd') {
            api.watchSignMyOracleBroadcasts(ev => {  
                rl.write(JSON.stringify(ev) + "\n")
                rl.prompt()
                return new Promise(resolve => rl.on('line', line => resolve(JSON.parse(line))))
            })
        }

    })
 

    
    
}
import Stream from "stream";
import { MempoolConfig } from "../../config";
import { api as ndapi } from "../../api";
import { PagingDescriptor } from "../../protocol"
import { PeerAddr, connectionPool } from "../../p2p";
import { capabilityStorage } from "../client-storage/capability-storage";
import { ConnectionPoolCfg } from "../connection-pool";
import { OracleControlAPI, oracleControlApi } from "../oracle-control-api";
import * as http from 'http';
import * as url from 'url';
import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws';
import * as readline from 'readline'
import * as fs from 'fs'
import Sandbox from "@nyariv/sandboxjs";
import { Mutex } from "async-mutex";

const safeEval = (expression: string, data: any): any => {
    const sandbox = new Sandbox()
    const exec = sandbox.compile("return " + expression)
    const res = exec(data).run()
    return res
}

export const startOracleService = (cfg: MempoolConfig<PeerAddr>, storage = capabilityStorage(cfg.oracle.dbPath, 1, 100)) => {

    const concfg: ConnectionPoolCfg = {
        maxConnections: cfg.maxConnections
    }
    const api: OracleControlAPI<PeerAddr> = oracleControlApi(cfg, ndapi, storage, connectionPool, concfg)
    api.startAdvertising(cfg.oracle)

    http.createServer(async (req, res) => {
        res.statusCode = 200;

        try {

            const reqUrl =  url.parse(req.url!, true)
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);

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
                res.setHeader('content-Type', 'application/json');
                res.end("{}")
            } else if(reqUrl.pathname == '/pause') {
                api.pauseAdvertising(cfg.oracle)
            } else if(reqUrl.pathname == '/deactivateCapability') {
                api.deactivateCapability(pubkey)
                res.setHeader('content-Type', 'application/json');
                res.end("{}")
            } else if(reqUrl.pathname == '/dropCapability') {
                api.dropCapability(pubkey)
                res.setHeader('content-Type', 'application/json');
                res.end("{}")
            } else if(reqUrl.pathname == '/activateCapability') {
                api.activateCapability(pubkey)
                res.setHeader('content-Type', 'application/json');
                res.end("{}")
            } else if(reqUrl.pathname == '/upgradeOraclePow') {
                api.upgradeOraclePow(parseInt(difficulty))
                res.setHeader('content-Type', 'application/json');
                res.end("{}")
            } else if(reqUrl.pathname == '/upgradeCapabilityPow') {
                api.upgradeCapabilityPow(pubkey, parseInt(difficulty))
                res.setHeader('content-Type', 'application/json');
                res.end("{}")
            } else if(reqUrl.pathname == '/viewStoredCapabilities') {
                const q = {where: async x => {return safeEval(query, x)}}
                const cps = await storage.listCapabilities(q, paging)
                res.setHeader('content-Type', 'application/json')
                res.end(JSON.stringify(cps))
            } else if(reqUrl.pathname == '/id') {
                res.setHeader('content-Type', 'application/json')
                res.end(JSON.stringify(await api.id()))
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
    

    const wss = new WebSocketServer({ port: cfg.oracle.wsPort });
    

    wss.on('connection', function connection(ws, req) {
        ws.on('error', console.error);

        const stream = createWebSocketStream(ws, { encoding: 'utf8' });
        
        const reqUrl =  url.parse(req.url!, true)


        const rl = readline.createInterface(stream, stream);

        // we assume single client app, so subscriptions are mutually exclusive, one subscriber per service
        // last opened socket will get active stream

        if(reqUrl.pathname == '/ranks') {
            const mutex = new Mutex() 
            api.watchMyRankSample(async ev => { 
                mutex.runExclusive(() => { 
                    stream.write(JSON.stringify(ev) + "\n")
                })
            })
        } else if(reqUrl.pathname == '/signCp') {
            const mutex = new Mutex() // just in case two ads will come concurrently (should not happen)
            api.watchSignMyCapabilityBroadcasts(ev => {  
                return new Promise(resolve => {
                    mutex.runExclusive(() => { 
                        rl.question(JSON.stringify(ev) + "\n", a => resolve(JSON.parse(a))) //REPL
                    })
                })
            })
        } else if(reqUrl.pathname == '/signAd') {
            const mutex = new Mutex()
            api.watchSignMyOracleBroadcasts(ev => {
                return new Promise(resolve => {
                    mutex.runExclusive(() => {
                        rl.question(JSON.stringify(ev) + "\n", a => resolve(JSON.parse(a)))
                    })
                })
            })
        }
        

    })

   
    
}
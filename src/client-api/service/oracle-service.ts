import { MempoolConfig } from "../../config";
import { api as ndapi, Api } from "../../node";
import { PeerAddr, connectionPool } from "../../p2p";
import { capabilityStorage } from "../client-storage/capability-storage";
import { ConnectionPoolCfg } from "../connection-pool";
import { OracleControlAPI, oracleControlApi } from "../oracle-control-api";
import * as http from 'http';
import * as url from 'url';

export const startOracleService = (cfg: MempoolConfig<PeerAddr>) => {
    const storage = capabilityStorage(cfg.oracle.dbPath, 5, 100)
    const concfg: ConnectionPoolCfg = {
        maxConnections: cfg.maxConnections
    }
    const api: OracleControlAPI<PeerAddr> = oracleControlApi(cfg, ndapi, storage, connectionPool, concfg)

    http.createServer(async (req, res) => {
        res.statusCode = 200;

        try {

            const reqUrl =  url.parse(req.url!, true)
            const pubkey: string = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : ""
            const difficulty: string = typeof reqUrl.query.difficulty === "string" ? reqUrl.query.difficulty : ""

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
            }
            
            //TODO web-sockets
    
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

                        //TODO add storage queries

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
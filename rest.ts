import * as nd from './node';
import * as http from 'http';
import * as url from 'url';
import {p2pNode} from "./p2p";
import * as fs from 'fs'

// curl -i -X POST -H 'Content-Type: application/json' -d '{"pubkey": "AAA", "seqNo": 1, "cTTL": 2, "pow" : {"preimageType": "", "difficukty":0, "algorithm": "", "hash": "BBB"}, "bid": {"amount" : 0, "proof": ""}}' http://localhost:8080/oracle

// curl -i -X GET http://localhost:8080/oracles

export const startHttp = (cfg: nd.MempoolConfig<any>) => {
    http.createServer(async (req, res) => {
        res.statusCode = 200;

        try {
            const reqUrl =  url.parse(req.url!, true)
    
            const paging: nd.PagingDescriptor = {
                page: 0,
                chunkSize: 10
            }
        
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);

            if (req.method === 'GET' && (reqUrl.pathname == '/index.html' || reqUrl.pathname == '/index.htm') || reqUrl.pathname == '/') {
                res.setHeader('content-Type', 'text/html');
                res.end(fs.readFileSync('./index.html').toString())
                return
            }

            if(req.method === 'GET' && reqUrl.pathname == '/peers') {
                res.setHeader('content-Type', 'text/plain');
                if (p2pNode !== undefined) {
                    const list = p2pNode.peers.map(p => p.addr.server + ":" + p.addr.port).join(",")
                    console.log(list)
                    res.end(list)
                } else {
                    res.end("P2P not started yet!")
                }
                
                return
            }

            if(req.method === 'GET' && reqUrl.pathname == '/testOnlySign') {
                res.setHeader('content-Type', 'text/plain');
                const pk: string = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : ""
                const msg: string = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : ""
                
                res.end(JSON.stringify(nd.testOnlySign(msg, pk)))
                return
            }

            res.setHeader('content-Type', 'Application/json');

            if(req.method === 'GET' && reqUrl.pathname == '/testOnlyGenKeyPair') {
                
                res.end(JSON.stringify(nd.testOnlyGenerateKeyPair()))
                return
            }

            
            
        
            if (req.method === 'GET') {

                if(reqUrl.pathname == '/id') {
                    res.end(JSON.stringify(cfg.facilitatorId ?? {}))
                    return
                }

                if(reqUrl.pathname == '/oracles') {
                    nd.api.lookupOracles(paging, []).then(x => res.end(JSON.stringify(x)))
                    return
                }

                const pubkey: string = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : ""
            
                if(reqUrl.pathname == '/capabilities') {
                    if (reqUrl.query.pubkey == undefined) {
                        res.end(JSON.stringify("Specify capabilities?pubkey=<oracle_pubkey>"))
                    } else {
                        const pubkey: string = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : ""
                        nd.api.lookupCapabilities(paging, pubkey).then(x => res.end(JSON.stringify(x)))
                    }
                    return
                }
            
                if(reqUrl.pathname == '/reports') {
                    if (reqUrl.query.pubkey == undefined) {
                        res.end(JSON.stringify("Specify reports?pubkey=<oracle_pubkey>"))
                    } else {
                        nd.api.lookupReports(paging, pubkey).then(x => res.end(JSON.stringify(x)))
                    }
                }
                return
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
            
                        if(reqUrl.pathname == '/oracle') {
                            const out = await nd.api.announceOracle(cfg, postBody)
                            res.end(JSON.stringify(out))
                        }
                    
                        if(reqUrl.pathname == '/capability') {
                            const out = await nd.api.announceCapability(cfg, postBody)
                            res.end(JSON.stringify(out))
                        }
                    
                        if(reqUrl.pathname == '/report') {
                            const out = await nd.api.reportMalleability(cfg, postBody)
                            res.end(JSON.stringify(out))
                        }
                    
                        if(reqUrl.pathname == '/dispute') {
                            const out = await nd.api.disputeMissingfactClaim(postBody)
                            res.end(JSON.stringify(out))
                        }

                        if (p2pNode !== undefined) {
                            p2pNode.broadcastMessage(reqUrl.pathname!.slice(1), body)
                        }

                        return

                    } catch(err) {
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
    
        
    }).listen(cfg.httpPort)
}
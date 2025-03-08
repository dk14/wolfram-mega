import * as nd from './node';
import * as http from 'http';
import * as url from 'url';
import {p2pNode} from "./p2p";

// curl -i -X POST -H 'Content-Type: application/json' -d '{"pubkey": "AAA", "seqNo": 1, "cTTL": 2, "pow" : {"preimageType": "", "difficukty":0, "algorithm": "", "hash": "BBB"}, "bid": {"amount" : 0, "proof": ""}}' http://localhost:8080/oracle

// curl -i -X GET http://localhost:8080/oracles

export const startHttp = (cfg: nd.MempoolConfig<any>) => {
    http.createServer(async (req, res) => {
        res.statusCode = 200;
        res.setHeader('content-Type', 'Application/json');

        try {
            const reqUrl =  url.parse(req.url!, true)
    
            const paging: nd.PagingDescriptor = {
                page: 0,
                chunkSize: 10
            }
        
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);

        
            if (req.method === 'GET') {
                if(reqUrl.pathname == '/oracles') {
                    nd.api.lookupOracles(paging, []).then(x => res.end(JSON.stringify(x)))
                }
            
                if(reqUrl.pathname == '/capabilities') {
                    nd.api.lookupCapabilities(paging, reqUrl.query.pubkey![0]).then(x => res.end(JSON.stringify(x)))
                }
            
                if(reqUrl.pathname == '/reports') {
                    nd.api.lookupReports(paging, reqUrl.query.pubkey![0]).then(x => res.end(JSON.stringify(x)))
                }
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
                            const out = await nd.api.announceOracle(postBody)
                            res.end(JSON.stringify(out))
                        }
                    
                        if(reqUrl.pathname == '/capability') {
                            const out = await nd.api.announceCapability(postBody)
                            res.end(JSON.stringify(out))
                        }
                    
                        if(reqUrl.pathname == '/report') {
                            const out = await nd.api.reportMalleability(postBody)
                            res.end(JSON.stringify(out))
                        }
                    
                        if(reqUrl.pathname == '/dispute') {
                            const out = await nd.api.disputeMissingfactClaim(postBody)
                            res.end(JSON.stringify(out))
                        }

                        if (p2pNode !== undefined) {
                            p2pNode.broadcastMessage(reqUrl.pathname!.slice(1), body)
                        }

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
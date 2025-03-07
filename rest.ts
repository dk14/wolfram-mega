import * as nd from './node';
import * as http from 'http';
import * as url from 'url';

http.createServer((req, res) => {
    
    const reqUrl =  url.parse(req.url!, true)

    const paging: nd.PagingDescriptor = {
        page: 0,
        chunkSize: 10
    }

    console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');

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
        req.on('end', function () {
            const postBody = JSON.parse(body);
            res.statusCode = 201;
            res.setHeader('content-Type', 'Application/json');

            if(reqUrl.pathname == '/oracle') {
                res.end(JSON.stringify(nd.api.announceOracle(postBody)))
            }
        
            if(reqUrl.pathname == '/capability') {
                res.end(JSON.stringify(nd.api.announceCapability(postBody)))
            }
        
            if(reqUrl.pathname == '/report') {
                res.end(JSON.stringify(nd.api.reportMalleability(postBody)))
            }
        
            if(reqUrl.pathname == '/dispute') {
                res.end(JSON.stringify(nd.api.disputeMissingfactClaim(postBody)))
            }
            
          })
    }
})

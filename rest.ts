import * as nd from './node';
import * as http from 'http';
import * as url from 'url';

http.createServer((req, res) => {
    
    const reqUrl =  url.parse(req.url!, true)

    const paging: nd.PagingDescriptor = {
        page: 0,
        chunkSize: 100
    }

    console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');

    // GET endpoint
    if(reqUrl.pathname == '/oracles' && req.method === 'GET') {
        nd.api.lookupOracles(paging, []).then(x => res.end(JSON.stringify(x)))
    }

    if(reqUrl.pathname == '/capabilities' && req.method === 'GET') {
        //nd.api.lookupCapabilities(paging, ).then(x => res.end(JSON.stringify(x)))
    }

    if(reqUrl.pathname == '/reports' && req.method === 'GET') {
        //nd.api.lookupReports(paging).then(x => res.end(JSON.stringify(x)))
    }

    if(reqUrl.pathname == '/oracle' && req.method === 'POST') {

    }

    if(reqUrl.pathname == '/capability' && req.method === 'POST') {

    }

    if(reqUrl.pathname == '/report' && req.method === 'POST') {
 
    }

    if(reqUrl.pathname == '/dispute' && req.method === 'POST') {

    }
})

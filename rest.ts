import * as node from './node';
import * as http from 'http';
import * as url from 'url';

http.createServer((req, res) => {
    
    const reqUrl =  url.parse(req.url!, true)
    // GET endpoint
    if(reqUrl.pathname == '/oracles' && req.method === 'GET') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        const response = [
            {
                "message": "Here are the list of oracles "
            },
        ];
        res.statusCode = 200;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response))
    }

    if(reqUrl.pathname == '/capabilities' && req.method === 'GET') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        const response = [
            {
                "message": "Here are the list of oracles "
            },
        ];
        res.statusCode = 200;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response))
    }

    if(reqUrl.pathname == '/reports' && req.method === 'GET') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        const response = [
            {
                "message": "Here are the list of oracles "
            },
        ];
        res.statusCode = 200;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response))
    }

    if(reqUrl.pathname == '/oracle' && req.method === 'POST') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        const response = [
            {
                "message": "Here are the list of oracles "
            },
        ];
        res.statusCode = 200;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response))
    }

    if(reqUrl.pathname == '/capability' && req.method === 'POST') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        const response = [
            {
                "message": "Here are the list of oracles "
            },
        ];
        res.statusCode = 200;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response))
    }

    if(reqUrl.pathname == '/report' && req.method === 'POST') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        const response = [
            {
                "message": "Here are the list of oracles "
            },
        ];
        res.statusCode = 200;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response))
    }

    if(reqUrl.pathname == '/dispute' && req.method === 'POST') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        const response = [
            {
                "message": "Here are the list of oracles "
            },
        ];
        res.statusCode = 200;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response))
    }
})

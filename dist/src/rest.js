"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.startHttp = void 0;
const nd = __importStar(require("./node"));
const http = __importStar(require("http"));
const url = __importStar(require("url"));
const p2p_1 = require("./p2p");
const fs = __importStar(require("fs"));
// curl -i -X POST -H 'Content-Type: application/json' -d '{"pubkey": "AAA", "seqNo": 1, "cTTL": 2, "pow" : {"preimageType": "", "difficukty":0, "algorithm": "", "hash": "BBB"}, "bid": {"amount" : 0, "proof": ""}}' http://localhost:8080/oracle
// curl -i -X GET http://localhost:8080/oracles
const startHttp = (cfg) => {
    http.createServer(async (req, res) => {
        res.statusCode = 200;
        try {
            const reqUrl = url.parse(req.url, true);
            const pageNo = typeof reqUrl.query.pageNo === "string" ? parseInt(reqUrl.query.pageNo) : 0;
            const pageSize = typeof reqUrl.query.pageSize === "string" ? parseInt(reqUrl.query.pageSize) : 10;
            const paging = {
                page: pageNo,
                chunkSize: pageSize
            };
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            if (req.method === 'GET' && (reqUrl.pathname == '/index.html' || reqUrl.pathname == '/index.htm') || reqUrl.pathname == '/') {
                res.setHeader('content-Type', 'text/html');
                res.end(fs.readFileSync(__dirname + '/../index.html').toString());
                return;
            }
            if (req.method === 'GET' && (reqUrl.pathname == '/wolfram-mega-spec.yaml') || reqUrl.pathname == '/') {
                res.setHeader('content-Type', 'Application/json');
                res.end(fs.readFileSync(__dirname + '/../wolfram-mega-spec.yaml').toString().replace("$$url", "http://" + (cfg.hostname ?? "localhost") + ":" + cfg.httpPort));
                return;
            }
            if (req.method === 'GET' && reqUrl.pathname == '/peers') {
                res.setHeader('content-Type', 'text/plain');
                if (p2p_1.p2pNode !== undefined) {
                    const list = p2p_1.p2pNode.peers.map(p => p.addr.server + ":" + p.addr.port).join(",");
                    console.log(list);
                    res.end(list);
                }
                else {
                    res.end("P2P not started yet!");
                }
                return;
            }
            if (cfg.isTest && req.method === 'GET' && reqUrl.pathname == '/testOnlySign') {
                res.setHeader('content-Type', 'text/plain');
                const pk = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : "";
                const msg = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : "";
                res.end(JSON.stringify(nd.testOnlySign(msg, pk)));
                return;
            }
            res.setHeader('content-Type', 'Application/json');
            if (cfg.isTest && req.method === 'GET' && reqUrl.pathname == '/testOnlyGenKeyPair') {
                res.end(JSON.stringify(nd.testOnlyGenerateKeyPair()));
                return;
            }
            if (req.method === 'GET') {
                if (reqUrl.pathname == '/id') {
                    res.end(JSON.stringify(cfg.facilitatorId ?? {}));
                    return;
                }
                if (reqUrl.pathname == '/oracles') {
                    nd.api.lookupOracles(paging, []).then(x => res.end(JSON.stringify(x)));
                    return;
                }
                const pubkey = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : "";
                if (reqUrl.pathname == '/capabilities') {
                    if (reqUrl.query.pubkey == undefined) {
                        res.end(JSON.stringify("Specify capabilities?pubkey=<oracle_pubkey>"));
                    }
                    else {
                        const pubkey = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : "";
                        nd.api.lookupCapabilities(paging, pubkey).then(x => res.end(JSON.stringify(x)));
                    }
                    return;
                }
                if (reqUrl.pathname == '/reports') {
                    if (reqUrl.query.pubkey == undefined) {
                        res.end(JSON.stringify("Specify reports?pubkey=<oracle_pubkey>"));
                    }
                    else {
                        nd.api.lookupReports(paging, pubkey).then(x => res.end(JSON.stringify(x)));
                    }
                }
                if (reqUrl.pathname == '/offers') {
                    if (reqUrl.query.pubkey == undefined) {
                        res.end(JSON.stringify("Specify reports?pubkey=<capability_pubkey>"));
                    }
                    else {
                        nd.api.lookupOffers(paging, pubkey).then(x => res.end(JSON.stringify(x)));
                    }
                }
                return;
            }
            if (req.method === 'POST') {
                var body = '';
                req.on('data', function (chunk) {
                    body += chunk;
                });
                req.on('end', async function () {
                    try {
                        const postBody = JSON.parse(body);
                        res.statusCode = 201;
                        res.setHeader('content-Type', 'Application/json');
                        if (reqUrl.pathname == '/oracle') {
                            const out = await nd.api.announceOracle(cfg, postBody);
                            res.end(JSON.stringify(out));
                        }
                        if (reqUrl.pathname == '/capability') {
                            const out = await nd.api.announceCapability(cfg, postBody);
                            res.end(JSON.stringify(out));
                        }
                        if (reqUrl.pathname == '/report') {
                            const out = await nd.api.reportMalleability(cfg, postBody);
                            res.end(JSON.stringify(out));
                        }
                        if (reqUrl.pathname == '/dispute') {
                            const out = await nd.api.disputeMissingfactClaim(postBody);
                            res.end(JSON.stringify(out));
                        }
                        if (reqUrl.pathname == '/offer') {
                            const out = await nd.api.publishOffer(cfg, postBody);
                            res.end(JSON.stringify(out));
                        }
                        if (p2p_1.p2pNode !== undefined) {
                            p2p_1.p2pNode.broadcastMessage(reqUrl.pathname.slice(1), body);
                        }
                        return;
                    }
                    catch (err) {
                        console.error(err);
                        if (!res.writableEnded) {
                            res.end(JSON.stringify({ error: err.message }));
                        }
                    }
                });
            }
        }
        catch (err) {
            console.error(err);
            if (!res.writableEnded) {
                res.end(JSON.stringify({ error: err.message }));
            }
        }
    }).listen(cfg.httpPort);
};
exports.startHttp = startHttp;
//# sourceMappingURL=rest.js.map
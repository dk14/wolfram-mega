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
exports.startHttp = exports.endpointAPi = void 0;
const http = __importStar(require("http"));
const url = __importStar(require("url"));
const ws_1 = require("ws");
const readline = __importStar(require("readline"));
var globalSigner = null;
const endpointAPi = (signerFactory, lookup) => {
    const sign = signerFactory();
    const api = {
        requestNewCapability: async function (question) {
            if (lookup.newCp) {
                return lookup.newCp(question);
            }
            throw new Error('Function not implemented.');
        },
        requestCommitment: async function (req) {
            if (!lookup.checkCommitment(req)) {
                throw new Error('no commitment!');
            }
            const commitment = {
                req: req,
                contract: lookup.genContract ? await lookup.genContract(req) : '',
                oracleSig: ''
            };
            commitment.oracleSig = await sign([commitment, ""]);
            return commitment;
        },
        requestFact: async function (req) {
            const factMsg = await lookup.getFact(req.req);
            const fact = {
                factWithQuestion: factMsg,
                signatureType: 'SHA256',
                signature: await sign([req, factMsg])
            };
            return fact;
        }
    };
    return api;
};
exports.endpointAPi = endpointAPi;
const startHttp = (api, port, wsPort) => {
    const server = http.createServer(async (req, res) => {
        res.statusCode = 200;
        try {
            const reqUrl = url.parse(req.url, true);
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
                        if (reqUrl.pathname == '/requestNewCapability') {
                            const out = await api.requestNewCapability(postBody);
                            res.end(JSON.stringify(out));
                        }
                        if (reqUrl.pathname == '/requestCommitment') {
                            const out = await api.requestCommitment(postBody);
                            res.end(JSON.stringify(out));
                        }
                        if (reqUrl.pathname == '/requestFact') {
                            const out = await api.requestFact(postBody);
                            res.end(JSON.stringify(out));
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
    });
    server.listen(port);
    const wss = new ws_1.WebSocketServer({ port: wsPort });
    wss.on('connection', function connection(ws, req) {
        ws.on('error', console.error);
        const stream = (0, ws_1.createWebSocketStream)(ws, { encoding: 'utf8' });
        const rl = readline.createInterface(stream, stream);
        globalSigner = (msg) => {
            return new Promise(resolve => {
                rl.question(JSON.stringify(msg) + "\n", a => resolve(JSON.parse(a)));
            });
        };
    });
};
exports.startHttp = startHttp;
if (require.main === module) {
    const lookup = {
        getFact: async function (fr) {
            return "001";
        },
        checkCommitment: async function (c) {
            return true;
        }
    };
    const api = (0, exports.endpointAPi)(() => globalSigner, lookup);
    const httpPort = 90999;
    const wsPort = 909997;
    console.log(`Starting Oracle Mocking Endpoint... HTTP=${httpPort}, WS=${wsPort}`);
}
//# sourceMappingURL=oracle-endpoint.js.map
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
exports.startHttp = exports.endpointAPi = exports.webLookup = exports.webSigner = void 0;
const http = __importStar(require("http"));
const url = __importStar(require("url"));
const fs = __importStar(require("fs"));
const oracle_web_signer_1 = require("./oracle-web-signer");
exports.webSigner = oracle_web_signer_1.webSign;
exports.webLookup = {
    getFact: async function (fr) {
        try {
            if (await window.webOracleFacts.get("answers", fr.capabilityPubKey)) {
                return window.webOracleFacts.get("answers", fr.capabilityPubKey);
            }
        }
        catch {
        }
        return "WHAT";
    },
    checkCommitment: async function (c) {
        return true;
    }
};
const endpointAPi = (signerFactory, lookup) => {
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
            const sign = signerFactory();
            commitment.rValueSchnorrHex = await sign([commitment, "!RVALUE"]);
            commitment.oracleSig = await sign([commitment, ""]);
            return commitment;
        },
        requestFact: async function (req) {
            const sign = signerFactory();
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
const startHttp = (api, port) => {
    const server = http.createServer(async (req, res) => {
        res.statusCode = 200;
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        try {
            const reqUrl = url.parse(req.url, true);
            if (req.method === 'OPTIONS') {
                // Handle OPTIONS request
                res.writeHead(204, {
                    'Access-Control-Allow-Origin': '*', // Adjust as needed for your use case
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Max-Age': '86400', // Cache preflight response for 24 hours
                });
                res.end();
                return;
            }
            if (req.method === 'POST') {
                res.setHeader('Access-Control-Allow-Origin', '*');
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
};
exports.startHttp = startHttp;
if (require.main === module) {
    const path = process.argv[2] ?? "cfg/endpoint-test.json";
    const getcfg = () => {
        try {
            return JSON.parse(fs.readFileSync(__dirname + '/' + path).toString());
        }
        catch {
            return JSON.parse(fs.readFileSync(path).toString());
        }
    };
    const cfg = getcfg();
    const lookup = {
        getFact: async function (fr) {
            try {
                if (cfg.answers[fr.capabilityPubKey]) {
                    return cfg.answers[fr.capabilityPubKey];
                }
            }
            catch {
            }
            return "YES";
        },
        checkCommitment: async function (c) {
            return true;
        }
    };
    const restSigner = async (x) => {
        if (x[1] === '!RVALUE') {
            const res = ((await fetch(cfg.signerAddress + "rvalue", {
                method: 'post',
                body: JSON.stringify(x[0]),
                headers: { 'Content-Type': 'application/json' }
            })).text());
            return (res);
        }
        else if (x[1] === '') {
            return ((await fetch(cfg.signerAddress + "signCommitment", {
                method: 'post',
                body: JSON.stringify(x[0]),
                headers: { 'Content-Type': 'application/json' }
            })).text());
        }
        else {
            return ((await fetch(cfg.signerAddress + "signFact?fact=" + encodeURIComponent(x[1]), {
                method: 'post',
                body: JSON.stringify(x[0]),
                headers: { 'Content-Type': 'application/json' }
            })).text());
        }
    };
    const api = (0, exports.endpointAPi)(() => restSigner, lookup);
    console.log(`Starting Oracle Mocking Endpoint... HTTP=${cfg.httpPort}`);
    (0, exports.startHttp)(api, cfg.httpPort);
}
//# sourceMappingURL=oracle-endpoint.js.map
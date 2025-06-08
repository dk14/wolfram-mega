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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const url = __importStar(require("url"));
const fs = __importStar(require("fs"));
const schnorr_1 = require("../contracts/btc/schnorr");
const schnorr = require('bip-schnorr');
const muSig = schnorr.muSig;
const convert = schnorr.convert;
const bs58_1 = __importDefault(require("bs58"));
const utilcrypto = __importStar(require("../../crypto"));
const path = process.argv[2] ?? "cfg/signer-test.json";
const getcfg = () => {
    try {
        return JSON.parse(fs.readFileSync(__dirname + '/' + path).toString());
    }
    catch {
        return JSON.parse(fs.readFileSync(path).toString());
    }
};
const cfg = getcfg();
console.log('Starting Endpoint Signer... port = ' + cfg.httpPort);
const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
    try {
        if (req.method === 'POST') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            var body = '';
            req.on('data', function (chunk) {
                body += chunk;
            });
            req.on('end', async function () {
                try {
                    const commitment = JSON.parse(body);
                    res.statusCode = 201;
                    res.setHeader('content-Type', 'text/plain');
                    const crypto = cfg.crypto[commitment.req.capabilityPubKey];
                    const reqUrl = url.parse(req.url, true);
                    if (reqUrl.pathname == '/signCommitment') {
                        if (crypto === 'schnorr') {
                            const secret = Buffer.from(bs58_1.default.decode(cfg.capabilityPKs[commitment.req.capabilityPubKey])).toString("hex").substring(2, 64 + 2);
                            const kValue = (0, schnorr_1.schnorrApi)().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906");
                            const rValue = (0, schnorr_1.schnorrApi)().getPub(kValue);
                            const sValue = (0, schnorr_1.schnorrApi)().signatureSValue(secret, kValue, JSON.stringify(commitment)).padStart(64, "0");
                            res.end(rValue + sValue);
                        }
                        else {
                            const sig = (crypto === 'ed') ?
                                utilcrypto.testOnlySignEd(JSON.stringify(commitment), cfg.capabilityPKs[commitment.req.capabilityPubKey])
                                : utilcrypto.testOnlySignEd(JSON.stringify(commitment), cfg.capabilityPKs[commitment.req.capabilityPubKey]);
                            res.end(sig);
                        }
                    }
                    else if (reqUrl.pathname == '/signFact') {
                        if (crypto === 'schnorr') {
                            const secret = Buffer.from(bs58_1.default.decode(cfg.capabilityPKs[commitment.req.capabilityPubKey])).toString("hex").substring(2, 64 + 2);
                            const kValue = (0, schnorr_1.schnorrApi)().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906");
                            const sValue = (0, schnorr_1.schnorrApi)().signatureSValue(secret, kValue, reqUrl.query.fact).padStart(64, "0");
                            res.end(sValue);
                        }
                        else {
                            const sig = (crypto === 'ed') ?
                                utilcrypto.testOnlySignEd(reqUrl.query.fact, cfg.capabilityPKs[commitment.req.capabilityPubKey])
                                : utilcrypto.testOnlySign(reqUrl.query.fact, cfg.capabilityPKs[commitment.req.capabilityPubKey]);
                            res.end(sig);
                        }
                    }
                    else if (reqUrl.pathname == '/rvalue') {
                        console.log("____________" + crypto);
                        if (crypto === 'schnorr') {
                            const secret = Buffer.from(bs58_1.default.decode(cfg.capabilityPKs[commitment.req.capabilityPubKey])).toString("hex").substring(2, 64 + 2);
                            const kValue = (0, schnorr_1.schnorrApi)().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906");
                            const rValue = (0, schnorr_1.schnorrApi)().getPub(kValue);
                            res.end(rValue);
                        }
                        else {
                            res.end("---");
                        }
                    }
                    return;
                }
                catch (err) {
                    console.log(err);
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
server.listen(cfg.httpPort);
//# sourceMappingURL=oracle-endpoint-signer.js.map
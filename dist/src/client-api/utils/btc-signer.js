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
const schnorr = require('bip-schnorr');
const muSig = schnorr.muSig;
const convert = schnorr.convert;
const multisig = __importStar(require("../contracts/btc/mu-sig"));
const multisigInteractive = __importStar(require("../contracts/btc/mu-sig-interactive"));
const bs58_1 = __importDefault(require("bs58"));
const path = process.argv[2] ?? "cfg/btc-signer-test.json";
const getcfg = () => {
    try {
        return JSON.parse(fs.readFileSync(__dirname + '/' + path).toString());
    }
    catch {
        return JSON.parse(fs.readFileSync(path).toString());
    }
};
const cfg = getcfg();
console.log('Starting Btc Signer... port = ' + cfg.httpPort);
const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
    try {
        const reqUrl = url.parse(req.url, true);
        if (req.method === 'POST') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            var body = '';
            req.on('data', function (chunk) {
                body += chunk;
            });
            req.on('end', async function () {
                try {
                    const input = JSON.parse(body);
                    res.statusCode = 201;
                    res.setHeader('content-Type', 'text/plain');
                    if (reqUrl.pathname == '/sign') {
                        if (input.pubkeys.length > 1) {
                            const secret1 = cfg.secrets[input.pubkeys[0]] ?
                                Buffer.from(bs58_1.default.decode(cfg.secrets[input.pubkeys[0]])).toString("hex").substring(2, 64 + 2)
                                : input.s[0];
                            const secret2 = cfg.secrets[input.pubkeys[1]] ?
                                Buffer.from(bs58_1.default.decode(cfg.secrets[input.pubkeys[1]])).toString("hex").substring(2, 64 + 2)
                                : input.s[1];
                            const muSignature = multisig.sign(input.pubkeys[0], input.pubkeys[1], secret1, secret2, Buffer.from(input.msg, "hex"));
                            res.end(muSignature);
                        }
                        else {
                            //console.log(cfg.secrets[input.pubkeys[0]])
                            //console.log(Buffer.from(bs58.decode(cfg.secrets[input.pubkeys[0]])).toString("hex"))
                            const signature = schnorr.sign(Buffer.from(bs58_1.default.decode(cfg.secrets[input.pubkeys[0]])).toString("hex").substring(2, 64 + 2), Buffer.from(input.msg, "hex"));
                            res.end(signature.toString("hex"));
                        }
                    }
                    else if (reqUrl.pathname == '/muSigNonce1') {
                        const input = JSON.parse(body);
                        multisigInteractive.muSigNonce1(input.pk1, input.pk2, Buffer.from(bs58_1.default.decode(cfg.secrets[input.pk1])).toString("hex").substring(2, 64 + 2), Buffer.from(input.msg, "hex"));
                    }
                    else if (reqUrl.pathname == '/muSigCommitment2') {
                        const input = JSON.parse(body);
                        multisigInteractive.muSigCommitment2(input.pk1, input.pk2, Buffer.from(bs58_1.default.decode(cfg.secrets[input.pk2])).toString("hex").substring(2, 64 + 2), Buffer.from(input.msg, "hex"));
                    }
                    else if (reqUrl.pathname == '/sign1') {
                        const input = JSON.parse(body);
                        multisigInteractive.sign1(input.pk1, input.pk2, input.commitment2, input.nonce2, Buffer.from(bs58_1.default.decode(cfg.secrets[input.pk1])).toString("hex").substring(2, 64 + 2), Buffer.from(input.msg, "hex"), input.sessionId1);
                    }
                    else if (reqUrl.pathname == '/sign2') {
                        const input = JSON.parse(body);
                        multisigInteractive.sign2(input.pk1, input.pk2, input.partSig1, input.combinedNonceParity, input.nonce1, input.commitment1, Buffer.from(bs58_1.default.decode(cfg.secrets[input.pk2])).toString("hex").substring(2, 64 + 2), Buffer.from(input.msg, "hex"), input.sessionId2);
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
server.listen(cfg.httpPort);
//# sourceMappingURL=btc-signer.js.map
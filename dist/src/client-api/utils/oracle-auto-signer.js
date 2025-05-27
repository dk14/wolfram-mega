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
const ws_1 = __importStar(require("ws"));
const readline = __importStar(require("readline"));
const util = __importStar(require("../../util"));
const fs = __importStar(require("fs"));
const schnorr_1 = require("../contracts/btc/schnorr");
const bs58_1 = __importDefault(require("bs58"));
(async () => {
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
    console.log('Starting Oracle Auto-Signer...');
    const wsOracle = new ws_1.default(`ws://localhost:${cfg.oracleWsPort}/signAd`);
    wsOracle.on('error', console.error);
    await new Promise(resolve => wsOracle.on('open', () => resolve(true)));
    const streamOracle = (0, ws_1.createWebSocketStream)(wsOracle, { encoding: 'utf8' });
    streamOracle.on('error', console.error);
    const rlOracle = readline.createInterface(streamOracle);
    rlOracle.on('line', (line) => {
        console.log(line);
        const oracleId = JSON.parse(line);
        oracleId.oracleSignature = util.testOnlySign(JSON.stringify(oracleId), cfg.oraclePK);
        streamOracle.write(JSON.stringify(oracleId) + "\n");
    });
    const wsCp = new ws_1.default(`ws://localhost:${cfg.oracleWsPort}/signCp`);
    await new Promise(resolve => wsCp.on('open', () => resolve(true)));
    const streamCp = (0, ws_1.createWebSocketStream)(wsCp, { encoding: 'utf8' });
    streamCp.on('error', console.error);
    const rlCp = readline.createInterface(streamCp, streamCp);
    rlCp.on('line', (line) => {
        try {
            console.log(line);
            const cp = JSON.parse(line);
            cp.oracleSignature = "";
            cp.pow = undefined;
            cp.oracleSignature = util.testOnlySign(JSON.stringify(cp), cfg.oraclePK);
            streamCp.write(JSON.stringify(cp) + "\n");
        }
        catch (err) {
            console.error(err);
        }
    });
    const wsFact = new ws_1.default(`ws://localhost:${cfg.oracleEndpointWsPort}/`);
    await new Promise(resolve => wsFact.on('open', () => resolve(true)));
    const streamFact = (0, ws_1.createWebSocketStream)(wsFact, { encoding: 'utf8' });
    streamFact.on('error', console.error);
    const rlFact = readline.createInterface(streamFact, streamFact);
    rlFact.on('line', (line) => {
        try {
            console.log(line);
            const x = JSON.parse(line);
            const crypto = cfg.crypto[x[0].req.capabilityPubKey];
            const commitment = x[0];
            if (x[1] === '!RVALUE') {
                if (crypto === 'schnorr') {
                    const secret = Buffer.from(bs58_1.default.decode(cfg.capabilityPKs[commitment.req.capabilityPubKey])).toString("hex").substring(2, 64 + 2);
                    const kValue = (0, schnorr_1.schnorrApi)().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906");
                    const rValue = (0, schnorr_1.schnorrApi)().getPub(kValue);
                    streamFact.write(rValue + "\n");
                }
                streamFact.write(" " + "\n");
            }
            else if (x[1] === '') {
                if (crypto === 'schnorr') {
                    const secret = Buffer.from(bs58_1.default.decode(cfg.capabilityPKs[commitment.req.capabilityPubKey])).toString("hex").substring(2, 64 + 2);
                    const kValue = (0, schnorr_1.schnorrApi)().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906");
                    const rValue = (0, schnorr_1.schnorrApi)().getPub(kValue);
                    const sValue = (0, schnorr_1.schnorrApi)().signatureSValue(secret, kValue, JSON.stringify(commitment)).padStart(64, "0");
                    streamFact.write(rValue + sValue + "\n");
                }
                else {
                    const sig = (crypto === 'ed') ?
                        util.testOnlySignEd(JSON.stringify(commitment), cfg.capabilityPKs[commitment.req.capabilityPubKey])
                        : util.testOnlySignEd(JSON.stringify(commitment), cfg.capabilityPKs[commitment.req.capabilityPubKey]);
                    streamFact.write(sig + "\n");
                }
            }
            else {
                if (crypto === 'schnorr') {
                    const secret = Buffer.from(bs58_1.default.decode(cfg.capabilityPKs[commitment.req.capabilityPubKey])).toString("hex").substring(2, 64 + 2);
                    const kValue = (0, schnorr_1.schnorrApi)().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906");
                    const sValue = (0, schnorr_1.schnorrApi)().signatureSValue(secret, kValue, x[1]).padStart(64, "0");
                    streamFact.write(sValue + "\n");
                }
                else {
                    const sig = (crypto === 'ed') ?
                        util.testOnlySignEd(x[1], cfg.capabilityPKs[commitment.req.capabilityPubKey])
                        : util.testOnlySign(x[1], cfg.capabilityPKs[commitment.req.capabilityPubKey]);
                    streamFact.write(sig + "\n");
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    });
})();
//# sourceMappingURL=oracle-auto-signer.js.map
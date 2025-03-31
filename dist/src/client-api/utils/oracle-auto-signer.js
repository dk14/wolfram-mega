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
const ws_1 = __importStar(require("ws"));
const readline = __importStar(require("readline"));
const nd = __importStar(require("../../node"));
(async () => {
    console.log('Starting Oracle Auto-Signer...');
    const cfg = {
        oraclePK: "",
        capabilityPKs: {},
        oracleWsPort: 1000,
        oracleEndpointWsPort: 3000
    };
    const wsOracle = new ws_1.default(`ws://localhost:${cfg.oracleWsPort}/signAd`);
    wsOracle.on('error', console.error);
    await new Promise(resolve => wsOracle.on('open', () => resolve(true)));
    const streamOracle = (0, ws_1.createWebSocketStream)(wsOracle, { encoding: 'utf8' });
    streamOracle.on('error', console.error);
    const rlOracle = readline.createInterface(streamOracle);
    rlOracle.on('line', (line) => {
        console.log(line);
        const oracleId = JSON.parse(line);
        oracleId.oracleSignature = nd.testOnlySign(JSON.stringify(oracleId), cfg.oraclePK);
        streamOracle.write(JSON.stringify(oracleId) + "\n");
    });
    const wsCp = new ws_1.default(`ws://localhost:${cfg.oracleWsPort}/signCp`);
    await new Promise(resolve => wsCp.on('open', () => resolve(true)));
    const streamCp = (0, ws_1.createWebSocketStream)(wsCp, { encoding: 'utf8' });
    streamCp.on('error', console.error);
    const rlCp = readline.createInterface(streamCp, streamCp);
    rlCp.on('line', (line) => {
        console.log(line);
        const cp = JSON.parse(line);
        cp.oracleSignature = "";
        cp.pow = undefined;
        cp.oracleSignature = nd.testOnlySign(JSON.stringify(cp), cfg.oraclePK);
        streamCp.write(JSON.stringify(cp) + "\n");
    });
    const wsFact = new ws_1.default(`ws://localhost:${cfg.oracleWsPort}/signCp`);
    await new Promise(resolve => wsFact.on('open', () => resolve(true)));
    const streamFact = (0, ws_1.createWebSocketStream)(wsFact, { encoding: 'utf8' });
    streamFact.on('error', console.error);
    const rlFact = readline.createInterface(streamFact, streamFact);
    rlFact.on('line', (line) => {
        console.log(line);
        const x = JSON.parse(line);
        if (x[1] === '') {
            const sig = nd.testOnlySign(JSON.stringify(x[0]), cfg.capabilityPKs[x[0].req.capabilityPubKey]);
            streamFact.write(sig + "\n");
        }
        else {
            const sig = nd.testOnlySign(x[1], cfg.capabilityPKs[x[0].req.capabilityPubKey]);
            streamFact.write(sig + "\n");
        }
    });
})();
//# sourceMappingURL=oracle-auto-signer.js.map
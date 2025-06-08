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
const utilcrypto = __importStar(require("../../crypto"));
const fs = __importStar(require("fs"));
if (require.main === module) {
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
            oracleId.oracleSignature = utilcrypto.testOnlySign(JSON.stringify(oracleId), cfg.oraclePK);
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
                const cppow = cp.pow;
                cp.pow = undefined;
                cp.oracleSignature = utilcrypto.testOnlySign(JSON.stringify(cp), cfg.oraclePK);
                cp.pow = cppow;
                streamCp.write(JSON.stringify(cp) + "\n");
            }
            catch (err) {
                console.error(err);
            }
        });
    })();
}
//# sourceMappingURL=oracle-auto-signer.js.map
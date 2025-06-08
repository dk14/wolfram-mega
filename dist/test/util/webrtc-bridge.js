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
const webcfg_1 = require("../../webcfg");
webcfg_1.cfg.p2pseed = [];
webcfg_1.cfg.hostname = "dk14-peerjs-1586786454";
const configure_1 = require("./configure");
configure_1.configure;
const p2p_1 = require("../../src/p2p");
const p2p_webrtc_1 = require("../../src/p2p-webrtc");
const fs = __importStar(require("fs"));
process.on('uncaughtException', function (err) {
    console.log(err);
});
(async () => {
    await global.initWebapp;
    console.log("Start bridge...\n\n");
    console.log("\n\nStart WebRTC...\n\n");
    const webFacil = await (0, p2p_1.startP2P)(global.cfg, await (0, p2p_webrtc_1.browserPeerAPI)());
    const path = process.argv[2] ?? "cfg/mempool-1.json";
    const getcfg = () => {
        try {
            return JSON.parse(fs.readFileSync(__dirname + '/' + path).toString());
        }
        catch {
            return JSON.parse(fs.readFileSync(path).toString());
        }
    };
    const cfg = getcfg();
    console.log("\n\nStart TCP..." + cfg.p2pPort + "\n\n");
    const tcpFacil = await (0, p2p_1.startP2P)(cfg);
    const webProc = webFacil.processApiRequest;
    const tcpProc = tcpFacil.processApiRequest;
    webFacil.processApiRequest = tcpProc;
    tcpFacil.processApiRequest = webProc;
})();
//# sourceMappingURL=webrtc-bridge.js.map
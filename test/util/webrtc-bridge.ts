import { configure } from "./configure";
configure

import { startP2P } from "../../src/p2p";
import { browserPeerAPI } from "../../src/p2p-webrtc";
import { MempoolConfig } from "../../src/config";

import * as fs from 'fs'

process.on('uncaughtException', function (err) {
    console.log(err);
});

(async () => {
    await global.initWebapp
    console.log("Start bridge...\n\n")
    
    console.log("\n\nStart WebRTC...\n\n")
    const webFacil = await startP2P(global.cfg, await browserPeerAPI())
    
    const path = process.argv[2] ?? "cfg/mempool-1.json";
    
    const getcfg = (): MempoolConfig<any> => {
        try {
            return JSON.parse(fs.readFileSync(__dirname + '/' + path).toString())
        } catch {
            return JSON.parse(fs.readFileSync(path).toString())
        }
    
    }
    
    const cfg: MempoolConfig<any> = getcfg()

    console.log("\n\nStart TCP..." + cfg.p2pPort + "\n\n")
    const tcpFacil = await startP2P(cfg)

    const webProc = webFacil.processApiRequest
    const tcpProc = tcpFacil.processApiRequest

    webFacil.processApiRequest = tcpProc
    tcpFacil.processApiRequest = webProc

})()
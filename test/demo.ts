import { ChildProcessWithoutNullStreams, exec, spawn } from 'child_process'
import waitOn from 'wait-on'
import * as fs from 'fs'


interface DemoCfg {
   mempoolCfg: string,
   mockOracleCfg: string,
   signerCfg: string,
   btcSignerCfg: string
}



const getcfg = (path: string): any => {
    try {
        return JSON.parse(fs.readFileSync(__dirname + '/' + path).toString())
    } catch {
        return JSON.parse(fs.readFileSync(path).toString())
    }

}

const cfg: DemoCfg = getcfg(process.argv[2] ?? "cfg/demo.json");

(async () => {
    const waitFor = (resources: string[]) => {
        const opts = { resources }

        return new Promise<any>((resolve, reject) => waitOn(opts, err => !err ? resolve(0): reject(err)))

    }

    const peer = spawn("npm", ["run", "peer", cfg.mempoolCfg]);

    await waitFor(['http-get://localhost:' + getcfg(cfg.mempoolCfg).httpPort + '/id'])

    const endpoint = spawn("npm", ["run", "mock-oracle", cfg.mockOracleCfg]);

    await waitFor([ 'tcp:localhost:' + getcfg("../src/client-api/utils/" + cfg.mockOracleCfg).wsPort])
    const signer = spawn("npm", ["run", "auto-signer", cfg.signerCfg]);

    const btcSigner = spawn("npm", ["run", "btc-signer", cfg.btcSignerCfg]);

    
    const cleanUp = async () => {
        console.log("Exiting...")
        peer.kill(9)
        endpoint.kill(9)
        signer.kill(9)
        btcSigner.kill(9)
    }
    
    process.on('uncaughtException', async function (err) {
        console.log(err);
    });
    
    process.on('exit', cleanUp);
    process.on('SIGINT', cleanUp);
    process.on('SIGUSR1', cleanUp);
    process.on('SIGUSR2', cleanUp);

    peer.stderr.on('data', async function(data){
        console.log("[PEER-ERROR]" + data);
    });
    peer.stdout.on('data', async function(data){
        console.log("[PEER]" + data);
    });

    endpoint.stderr.on('data', async function(data){
        console.log("[ENDPOINT-ERROR]" + data);
    });
    endpoint.stdout.on('data', async function(data){
        console.log("[ENDPOINT]" + data);
    });

    signer.stderr.on('data', async function(data){
        console.log("[SIGNER-ERROR]" + data);
    });
    signer.stdout.on('data', async function(data){
        console.log("[SIGNER]" + data);
    });

    btcSigner.stderr.on('data', async function(data){
        console.log("[BTC-SIGNER-ERROR]" + data);
    });
    btcSigner.stdout.on('data', async function(data){
        console.log("[BTC-SIGNER]" + data);
    });

})()
import { ChildProcessWithoutNullStreams, exec, spawn } from 'child_process'
import waitOn from 'wait-on'
import * as fs from 'fs'
import * as http from 'http'
import * as httpProxy from 'http-proxy'
import HttpProxyRules from 'http-proxy-rules'


interface DemoCfg {
   mempoolCfg: string,
   mockOracleCfg: string,
   signerCfg: string,
   btcSignerCfg: string,
   httpPort: number
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


    // none of this should be exposed to public in prod!
    console.log("Starting proxy..." + cfg.httpPort)
    const proxyRules = new HttpProxyRules({
        rules: {
        '/peer-monitor/(.*)': `http://localhost:${getcfg(cfg.mempoolCfg).httpPort}/$1`,
        '/oracle-admin/(.*)': `http://localhost:${getcfg(cfg.mempoolCfg).oracle.httpPort}/$1`,
        '/oracle-endpoint/(.*)': `http://localhost:${getcfg("../src/client-api/utils/" + cfg.mockOracleCfg).httpPort}/$1`,
        '/trader-console/(.*)': `http://localhost:${getcfg(cfg.mempoolCfg).trader.httpPort}/$1`,

        },
        default: 'http://localhost:${getcfg(cfg.mempoolCfg).trader.httpPort}/' // default target
    });

    // Create reverse proxy instance
    const proxy = httpProxy.createProxy();

    http.createServer(function(req, res) {

        const target = proxyRules.match(req);
        if (target) {
        return proxy.web(req, res, {
            target: target
        })
        }

        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('The request url and path did not match any of the listed rules!');
    }).listen(cfg.httpPort)

})()
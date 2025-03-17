import { ChildProcessWithoutNullStreams, exec, spawn } from 'child_process'
import waitOn from 'wait-on'
import * as fs from 'fs'
import {promisify} from 'util'

const cleanUp = async () => {
    peers.forEach(x => x.proc?.kill())
    await exec('rm -r ./.tmp')
}

process.on('uncaughtException', async function (err) {
    console.log(err);
});

process.on('exit', cleanUp);
process.on('SIGINT', cleanUp);
process.on('SIGUSR1', cleanUp);
process.on('SIGUSR2', cleanUp);

const waitFor = (resources: string[]) => {
    const opts = { resources }

    return new Promise<any>((resolve, reject) => waitOn(opts, err => err ? resolve(0): reject()))

}

interface Peer {
    proc: ChildProcessWithoutNullStreams
    port: number
}

const start = async (portP2P: number, portHttp: number, seed: number[]): Promise<Peer> => {

    const cfg = {
        "maxOracles": 2,
        "maxCapabilities": 2,
        "maxReports": 2,
        "maxOffers": 2,
        "maxConnections": 100,
        "httpPort": portHttp,
        "p2pPort": portP2P,
        "isTest": true,
        "p2pseed": seed.map(port => {return {"server": "localhost", "port" : port}})
    }

    try { await promisify(exec)('mkdir ./.tmp') } catch {}
    fs.writeFileSync("./.tmp/" + portP2P + ".json", JSON.stringify(cfg), { flag: "w" })
    

    const child = spawn("npx", ["tsx", "app.ts", "./.tmp/" + portP2P + ".json"])
    
    child.stderr.on('data', function(data){
        console.log("" + data);
    });

    var flag = false
    return new Promise<Peer>((resolve, reject) => 
        child.stdout.on('data', function(data){
            console.log("" + data);
            
            if (!flag) {
                resolve({
                    proc: child,
                    port: portHttp
                })
            } 
            flag = true
        })
    )
    
    
}


const peers = await Promise.all(Array.from(Array(5).keys()).map(i => start(8433 + i, 8090 +i, [8080])))

//await waitFor(peers.map(p => 'http-get://localhost:' + p.port + '/id'))

peers.forEach(x => x.proc.kill())



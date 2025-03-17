import { ChildProcessWithoutNullStreams, exec, spawn } from 'child_process'
import waitOn from 'wait-on'
import * as fs from 'fs'
import {promisify} from 'util'
import * as nd from './node'
import * as pow from './pow'
import fetch from 'node-fetch'
import * as assert from 'assert'

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

    return new Promise<any>((resolve, reject) => waitOn(opts, err => !err ? resolve(0): reject()))

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
        "hostname": "localhost",
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
            //console.log("" + data);
            
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


interface OracleIdWithPk {
    body: nd.OracleId
    pk: string
}

const genOracle = async (): Promise<OracleIdWithPk> => {
    const keypair = nd.testOnlyGenerateKeyPair()
    const oracle: nd.OracleId = {
        pubkey: keypair.pub,
        oracleSignature: undefined,
        seqNo: 0,
        cTTL: 0,
        pow: undefined,
        bid:  {
            amount: 0,
            proof: ''
        },
        oracleSignatureType: 'SHA256'
    }
    oracle.pow = await pow.powOverOracleId(oracle, 2)
    oracle.oracleSignature = ""
    oracle.oracleSignature = nd.testOnlySign(JSON.stringify(oracle), keypair.pk)
    return {
        body: oracle,
        pk: keypair.pk
    }
}


const peers = await Promise.all(Array.from(Array(5).keys()).map(i => start(8433 + i, 8090 + i, [8433])))

console.log("Waiting for P2P network...")

const addr = (p: Peer) => {
    return 'http://localhost:' + p.port + '/'
}
await waitFor(peers.map(p => 'http-get://localhost:' + p.port + '/id'))

console.log("=========TESTING==========")

const oracle1 = await genOracle()

console.log("1) Submit oracle id")

const response1 = await fetch(addr(peers[0]) + 'oracle', {
	method: 'post',
	body: JSON.stringify(oracle1.body),
	headers: {'Content-Type': 'application/json'}
})


const res1 = await response1.text();
assert.strictEqual(res1, '"success"')

console.log("2) Check oracle id across the nodes")

const responses = await Promise.all(peers.map(p => fetch(addr(peers[0]) + 'oracles')))
const jsons = await Promise.all(responses.map(r => r.json()))
const results = jsons.map(j => j as nd.OracleId[])

results.forEach(r => {
    assert.deepStrictEqual(r, [oracle1.body])
})

peers.forEach(x => x.proc.kill())

console.log("OK!")


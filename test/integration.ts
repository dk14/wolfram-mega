import { ChildProcessWithoutNullStreams, exec, spawn } from 'child_process'
import waitOn from 'wait-on'
import * as fs from 'fs'
import {promisify} from 'util'
import * as nd from '../src/node'
import * as pow from '../src/pow'
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
    
    child.stderr.on('data', async function(data){
        console.log("" + data);
        await exec('rm -r ./.tmp')
        process.exit(255)
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

const genCp = async (pubkey: string, pk: string): Promise<nd.OracleCapability> => {
    const cp: nd.OracleCapability = {
        oraclePubKey: pubkey,
        capabilityPubKey: nd.testOnlyGenerateKeyPair().pub,
        question: 'What?',
        seqNo: 0,
        cTTL: 0,
        oracleSignature: "",
        oracleSignatureType: 'SHA256',
        pow: undefined
    }

    cp.oracleSignature = nd.testOnlySign(JSON.stringify(cp), pk)
    cp.pow = await pow.powOverOracleCapability(cp, 2)
    return cp
}

const genReport = async (pubkey: string, cppubkey: string): Promise<nd.Report> => {
    const req: nd.FactRequest = {
        capabilityPubKey: cppubkey,
        arguments: {}
    }
    const content: nd.FactDisagreesWithPublic = {
        type: 'fact-disagreees-with-public',
        request: req
    }
    const r: nd.Report = {
        seqNo: 0,
        cTTL: 0,
        pow: undefined,
        oraclePubKey: pubkey,
        content
    }

    r.pow = await pow.powOverReport(r, 2)
    return r
}

const genOffer = async (cppubkey: string): Promise<nd.OfferMsg> => {
    const req: nd.FactRequest = {
        capabilityPubKey: cppubkey,
        arguments: {}
    }
    const terms: nd.OfferTerms = {
        question: req,
        partyBetsOn: [],
        counterPartyBetsOn: [],
        partyBetAmount: 0,
        counterpartyBetAmount: 0
    }
    const content: nd.Offer = {
        message: '',
        customContract: '',
        terms,
        blockchain: 'bitcoin-testnet',
        transactionToBeCoSigned: '',
        contact: ''
    }
    const msg: nd.OfferMsg = {
        seqNo: 0,
        cTTL: 0,
        pow: undefined,
        content
    }

    msg.pow = await pow.powOverOffer(msg, 2)
    return msg
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

console.log("2) Check oracle id synced across the network")

const responses = await Promise.all(peers.map(p => fetch(addr(peers[0]) + 'oracles')))
const jsons = await Promise.all(responses.map(r => r.json()))
const results = jsons.map(j => j as nd.OracleId[])

results.forEach(r => {
    assert.deepStrictEqual(r, [oracle1.body])
})

console.log("3) Submit capability")

const cp1 = await genCp(oracle1.body.pubkey, oracle1.pk)

const response2 = await fetch(addr(peers[0]) + 'capability', {
	method: 'post',
	body: JSON.stringify(cp1),
	headers: {'Content-Type': 'application/json'}
})


const res2 = await response2.text();
assert.strictEqual(res2, '"success"')

console.log("4) Check capability synced across the network")

const responses2 = await Promise.all(peers.map(p => fetch(addr(peers[0]) + 'capabilities?pubkey=' + encodeURIComponent(oracle1.body.pubkey))))
const jsons2 = await Promise.all(responses2.map(r => r.json()))
const results2 = jsons2.map(j => j as nd.OracleCapability[])

results2.forEach(r => {
    assert.deepStrictEqual(r, [cp1])
})

console.log("5) Submit report")

const r1 = await genReport(oracle1.body.pubkey, cp1.capabilityPubKey)

const response3 = await fetch(addr(peers[0]) + 'report', {
	method: 'post',
	body: JSON.stringify(r1),
	headers: {'Content-Type': 'application/json'}
})


const res3 = await response3.text();
assert.strictEqual(res3, '"success"')

console.log("6) Check report synced across the network")

const responses3 = await Promise.all(peers.map(p => fetch(addr(peers[0]) + 'reports?pubkey=' + encodeURIComponent(oracle1.body.pubkey))))
const jsons3 = await Promise.all(responses3.map(r => r.json()))
const results3 = jsons3.map(j => j as nd.OracleCapability[])

results3.forEach(r => {
    assert.deepStrictEqual(r, [r1])
})

console.log("7) Submit offer")

const o1 = await genOffer(cp1.capabilityPubKey)

const response4 = await fetch(addr(peers[0]) + 'offer', {
	method: 'post',
	body: JSON.stringify(o1),
	headers: {'Content-Type': 'application/json'}
})


const res4 = await response4.text();
assert.strictEqual(res4, '"success"')

console.log("8) Check offer synced across the network")

const responses4 = await Promise.all(peers.map(p => fetch(addr(peers[0]) + 'offers?pubkey=' + encodeURIComponent(cp1.capabilityPubKey))))
const jsons4 = await Promise.all(responses4.map(r => r.json()))
const results4 = jsons4.map(j => j as nd.OracleCapability[])

results4.forEach(r => {
    assert.deepStrictEqual(r, [o1])
})


peers.forEach(x => x.proc.kill())

console.log("OK!")
process.exit(0)


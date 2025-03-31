import WebSocket, { createWebSocketStream } from 'ws';
import * as readline from 'readline'
import * as nd from '../../node'


interface SignerCfg {
    oraclePK: string
    capabilityPKs: {[pub: string]: string}
    oracleWsPort: number
    oracleEndpointWsPort: number
}

(async () => {

    console.log('Starting Oracle Auto-Signer...')

    const cfg: SignerCfg = {
        oraclePK: "",
        capabilityPKs: {},
        oracleWsPort: 1000,
        oracleEndpointWsPort: 3000
    }
    
    const wsOracle = new WebSocket(`ws://localhost:${cfg.oracleWsPort}/signAd`)
    wsOracle.on('error', console.error)
    await new Promise(resolve => wsOracle.on('open', () => resolve(true)))
    const streamOracle = createWebSocketStream(wsOracle, { encoding: 'utf8' })
    streamOracle.on('error', console.error);
    const rlOracle = readline.createInterface(streamOracle)

    rlOracle.on('line', (line) => {
        console.log(line)
        const oracleId: nd.OracleId = JSON.parse(line)
        oracleId.oracleSignature = nd.testOnlySign(JSON.stringify(oracleId), cfg.oraclePK)
        streamOracle.write(JSON.stringify(oracleId) + "\n")
    })

    const wsCp = new WebSocket(`ws://localhost:${cfg.oracleWsPort}/signCp`)
    await new Promise(resolve => wsCp.on('open', () => resolve(true)))
    const streamCp = createWebSocketStream(wsCp, { encoding: 'utf8' })
    streamCp.on('error', console.error);
    const rlCp = readline.createInterface(streamCp, streamCp)

    rlCp.on('line', (line) => {
        console.log(line)
        const cp: nd.OracleCapability = JSON.parse(line)
        cp.oracleSignature = ""
        cp.pow = undefined
        cp.oracleSignature = nd.testOnlySign(JSON.stringify(cp), cfg.oraclePK)
        streamCp.write(JSON.stringify(cp) + "\n")

    })

    const wsFact= new WebSocket(`ws://localhost:${cfg.oracleWsPort}/signCp`)
    await new Promise(resolve => wsFact.on('open', () => resolve(true)))
    const streamFact = createWebSocketStream(wsFact, { encoding: 'utf8' })
    streamFact.on('error', console.error);
    const rlFact = readline.createInterface(streamFact, streamFact)

    rlFact.on('line', (line) => {
        console.log(line)
        const x: [nd.Commitment, string] = JSON.parse(line)
        if (x[1] === '') {
            const sig = nd.testOnlySign(JSON.stringify(x[0]), cfg.capabilityPKs[x[0].req.capabilityPubKey])
            streamFact.write(sig + "\n")
        } else {
            const sig = nd.testOnlySign(x[1], cfg.capabilityPKs[x[0].req.capabilityPubKey])
            streamFact.write(sig + "\n")
        }      
    })
    
})()

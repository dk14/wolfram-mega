import WebSocket, { createWebSocketStream } from 'ws';
import * as readline from 'readline'
import * as mega from '../../protocol'
import * as nd from '../../api'
import * as utilcrypto from '../../crypto'
import * as fs from 'fs'
import { schnorrApi } from '../contracts/btc/schnorr';
import bs58 from 'bs58'

interface SignerCfg {
    oraclePK: string
    capabilityPKs: {[pub: string]: string}
    crypto: {[pub: string]: string}
    oracleWsPort: number
    oracleEndpointWsPort: number
}


if (require.main === module) {
(async () => {

    const path = process.argv[2] ?? "cfg/signer-test.json";

    const getcfg = (): SignerCfg => {
        try {
            return JSON.parse(fs.readFileSync(__dirname + '/' + path).toString())
        } catch {
            return JSON.parse(fs.readFileSync(path).toString())
        }

    }

    const cfg = getcfg()

    console.log('Starting Oracle Auto-Signer...')
    
    const wsOracle = new WebSocket(`ws://localhost:${cfg.oracleWsPort}/signAd`)
    wsOracle.on('error', console.error)
    await new Promise(resolve => wsOracle.on('open', () => resolve(true)))
    const streamOracle = createWebSocketStream(wsOracle, { encoding: 'utf8' })
    streamOracle.on('error', console.error);
    const rlOracle = readline.createInterface(streamOracle)

    rlOracle.on('line', (line) => {
        console.log(line)
        const oracleId: mega.OracleId = JSON.parse(line)
        oracleId.oracleSignature = utilcrypto.testOnlySign(JSON.stringify(oracleId), cfg.oraclePK)
        streamOracle.write(JSON.stringify(oracleId) + "\n")
    })

    const wsCp = new WebSocket(`ws://localhost:${cfg.oracleWsPort}/signCp`)
    await new Promise(resolve => wsCp.on('open', () => resolve(true)))
    const streamCp = createWebSocketStream(wsCp, { encoding: 'utf8' })
    streamCp.on('error', console.error);
    const rlCp = readline.createInterface(streamCp, streamCp)

    rlCp.on('line', (line) => {
        try {
            console.log(line)
            const cp: mega.OracleCapability = JSON.parse(line)
            cp.oracleSignature = ""
            const cppow = cp.pow
            cp.pow = undefined
            cp.oracleSignature = utilcrypto.testOnlySign(JSON.stringify(cp), cfg.oraclePK)
            cp.pow = cppow
            streamCp.write(JSON.stringify(cp) + "\n")
        } catch (err) {
            console.error(err)
        }

    })

    
})()
}

import WebSocket, { createWebSocketStream } from 'ws';
import * as readline from 'readline'
import * as mega from '../../protocol'
import * as nd from '../../node'
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
            cp.pow = undefined
            cp.oracleSignature = utilcrypto.testOnlySign(JSON.stringify(cp), cfg.oraclePK)
            streamCp.write(JSON.stringify(cp) + "\n")
        } catch (err) {
            console.error(err)
        }

    })

    const wsFact = new WebSocket(`ws://localhost:${cfg.oracleEndpointWsPort}/`)
    await new Promise(resolve => wsFact.on('open', () => resolve(true)))
    const streamFact = createWebSocketStream(wsFact, { encoding: 'utf8' })
    streamFact.on('error', console.error);
    const rlFact = readline.createInterface(streamFact, streamFact)

    rlFact.on('line', (line) => {
        try {
            console.log(line)
            const x: [mega.Commitment, string] = JSON.parse(line)
            const crypto = cfg.crypto[x[0].req.capabilityPubKey]
            const commitment = x[0]

            if (x[1] === '!RVALUE') {
                if (crypto === 'schnorr') {
                    const secret = Buffer.from(bs58.decode(cfg.capabilityPKs[commitment.req.capabilityPubKey])).toString("hex").substring(2, 64 + 2)
                    const kValue = schnorrApi().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906")
                    const rValue = schnorrApi().getPub(kValue)
                    streamFact.write(rValue + "\n")
                }
                streamFact.write(" " + "\n")
                
            } else if (x[1] === '') {
                if (crypto === 'schnorr') {
                    const secret = Buffer.from(bs58.decode(cfg.capabilityPKs[commitment.req.capabilityPubKey])).toString("hex").substring(2, 64 + 2)
                    const kValue = schnorrApi().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906")
                    const rValue = schnorrApi().getPub(kValue)
                    const sValue = schnorrApi().signatureSValue(secret, kValue, JSON.stringify(commitment)).padStart(64, "0")
                    streamFact.write(rValue + sValue + "\n")
                } else {
                    const sig = (crypto === 'ed') ? 
                    utilcrypto.testOnlySignEd(JSON.stringify(commitment), cfg.capabilityPKs[commitment.req.capabilityPubKey])
                    : utilcrypto.testOnlySignEd(JSON.stringify(commitment), cfg.capabilityPKs[commitment.req.capabilityPubKey])
                    
                    streamFact.write(sig + "\n")
                }
                
            } else {
                if (crypto === 'schnorr') {
                    const secret = Buffer.from(bs58.decode(cfg.capabilityPKs[commitment.req.capabilityPubKey])).toString("hex").substring(2, 64 + 2)
                    const kValue = schnorrApi().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906")
                    const sValue = schnorrApi().signatureSValue(secret, kValue, x[1]).padStart(64, "0")
                    streamFact.write(sValue + "\n")
                } else {
                    const sig = (crypto === 'ed') ? 
                    utilcrypto.testOnlySignEd(x[1], cfg.capabilityPKs[commitment.req.capabilityPubKey])
                    : utilcrypto.testOnlySign(x[1], cfg.capabilityPKs[commitment.req.capabilityPubKey])
                    streamFact.write(sig + "\n")
                }
                
            }   
        } catch (err) {
            console.error(err)
        }
           
    })
    
})()
}

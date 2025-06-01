
import * as http from 'http'
import * as url from 'url';
import * as fs from 'fs'
import { schnorrApi } from '../contracts/btc/schnorr';
const schnorr = require('bip-schnorr');
const muSig = schnorr.muSig;
const convert = schnorr.convert;
import * as multisig from '../contracts/btc/mu-sig'
import * as multisigInteractive from '../contracts/btc/mu-sig-interactive'
import bs58 from 'bs58'
import { Commitment } from '../../protocol';
import * as utilcrypto from '../../crypto'

const path = process.argv[2] ?? "cfg/signer-test.json";

interface EndSignerCfg {
    capabilityPKs: {[pub: string]: string}
    crypto: {[pub: string]: string}
    httpPort: number
}


const getcfg = (): EndSignerCfg => {
    try {
        return JSON.parse(fs.readFileSync(__dirname + '/' + path).toString())
    } catch {
        return JSON.parse(fs.readFileSync(path).toString())
    }

}

const cfg = getcfg()

console.log('Starting Endpoint Signer... port = ' + cfg.httpPort)

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);

    try {
        
        if (req.method === 'POST') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            var body = ''
            req.on('data',  function (chunk) {
                body += chunk;
            });

            req.on('end', async function () {
            
                
               try {
                    const commitment: Commitment = JSON.parse(body);
                    res.statusCode = 201;
                    res.setHeader('content-Type', 'text/plain');

                    const crypto = cfg.crypto[commitment.req.capabilityPubKey]
                    const reqUrl =  url.parse(req.url!, true)

                    if (reqUrl.pathname == '/signCommitment') {
                        if (crypto === 'schnorr') {
                            const secret = Buffer.from(bs58.decode(cfg.capabilityPKs[commitment.req.capabilityPubKey])).toString("hex").substring(2, 64 + 2)
                            const kValue = schnorrApi().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906")
                            const rValue = schnorrApi().getPub(kValue)
                            const sValue = schnorrApi().signatureSValue(secret, kValue, JSON.stringify(commitment)).padStart(64, "0")
                            res.end(rValue + sValue)
                        } else {
                            const sig = (crypto === 'ed') ? 
                            utilcrypto.testOnlySignEd(JSON.stringify(commitment), cfg.capabilityPKs[commitment.req.capabilityPubKey])
                            : utilcrypto.testOnlySignEd(JSON.stringify(commitment), cfg.capabilityPKs[commitment.req.capabilityPubKey])
                            
                            res.end(sig)
                        }
                    }  else if (reqUrl.pathname == '/signFact'){
                        if (crypto === 'schnorr') {
                            const secret = Buffer.from(bs58.decode(cfg.capabilityPKs[commitment.req.capabilityPubKey])).toString("hex").substring(2, 64 + 2)
                            const kValue = schnorrApi().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906")
                            const sValue = schnorrApi().signatureSValue(secret, kValue, reqUrl.query.fact as string).padStart(64, "0")
                            res.end(sValue)
                        } else {
                            const sig = (crypto === 'ed') ? 
                            utilcrypto.testOnlySignEd(reqUrl.query.fact as string, cfg.capabilityPKs[commitment.req.capabilityPubKey])
                            : utilcrypto.testOnlySign(reqUrl.query.fact as string, cfg.capabilityPKs[commitment.req.capabilityPubKey])

                            res.end(sig)
                        }
                    } else if (reqUrl.pathname == '/rvalue') {
                        console.log("____________" + crypto)
                        if (crypto === 'schnorr') {
                            
                            const secret = Buffer.from(bs58.decode(cfg.capabilityPKs[commitment.req.capabilityPubKey])).toString("hex").substring(2, 64 + 2)
                            const kValue = schnorrApi().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906")
                            const rValue = schnorrApi().getPub(kValue)
                            res.end(rValue)
                        } else {
                            res.end("---")
                        }
                    }
                    return

                } catch(err) {
                    console.log(err)
                    if (!res.writableEnded){
                        res.end(JSON.stringify({error: err.message}))
                    } 
                } 
                
            })
        }
    } catch (err) {
        console.error(err)
        if (!res.writableEnded){
            res.end(JSON.stringify({error: err.message}))
        } 
    }
})
server.listen(cfg.httpPort)
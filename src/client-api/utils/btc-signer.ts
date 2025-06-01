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

interface BtcSignerCfg {
    secrets: {[pub: string]: string}
    httpPort: number
}

const path = process.argv[2] ?? "cfg/btc-signer-test.json";

const getcfg = (): BtcSignerCfg => {
    try {
        return JSON.parse(fs.readFileSync(__dirname + '/' + path).toString())
    } catch {
        return JSON.parse(fs.readFileSync(path).toString())
    }

}

const cfg = getcfg()

console.log('Starting Btc Signer... port = ' + cfg.httpPort)

interface SignRequest {
    pubkeys: string[]
    s: string[]
    msg: string
}

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);

    try {
        const reqUrl = url.parse(req.url!, true)
        
        if (req.method === 'POST') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            var body = ''
            req.on('data',  function (chunk) {
                body += chunk;
            });
            req.on('end', async function () {

                try {
                    const input: SignRequest = JSON.parse(body);
                    res.statusCode = 201;
                    res.setHeader('content-Type', 'text/plain');
        
                    if (reqUrl.pathname == '/sign') {
                        if (input.pubkeys.length > 1) {
                            const secret1 = cfg.secrets[input.pubkeys[0]] ? 
                                Buffer.from(bs58.decode(cfg.secrets[input.pubkeys[0]])).toString("hex").substring(2, 64 + 2)
                                : input.s[0]
                            const secret2 = cfg.secrets[input.pubkeys[1]] ? 
                                Buffer.from(bs58.decode(cfg.secrets[input.pubkeys[1]])).toString("hex").substring(2, 64 + 2)
                                : input.s[1]

                            const muSignature = multisig.sign(input.pubkeys[0], input.pubkeys[1], 
                                secret1,
                                secret2,
                                Buffer.from(input.msg, "hex"))
                            
                            res.end(muSignature)
                        } else {
                            //console.log(cfg.secrets[input.pubkeys[0]])
                            //console.log(Buffer.from(bs58.decode(cfg.secrets[input.pubkeys[0]])).toString("hex"))
                            const signature: Buffer = schnorr.sign(Buffer.from(bs58.decode(cfg.secrets[input.pubkeys[0]])).toString("hex").substring(2, 64 + 2), Buffer.from(input.msg, "hex"))
                            res.end(signature.toString("hex"))
                        }    
                    } else if (reqUrl.pathname == '/muSigNonce1') {
                        const input = JSON.parse(body);
                        multisigInteractive.muSigNonce1(
                            input.pk1,
                            input.pk2,
                            Buffer.from(bs58.decode(cfg.secrets[input.pk1])).toString("hex").substring(2, 64 + 2),
                            Buffer.from(input.msg, "hex")
                        )
                    } else if (reqUrl.pathname == '/muSigCommitment2') {
                        const input = JSON.parse(body);
                        multisigInteractive.muSigCommitment2(
                            input.pk1,
                            input.pk2,
                            Buffer.from(bs58.decode(cfg.secrets[input.pk2])).toString("hex").substring(2, 64 + 2),
                            Buffer.from(input.msg, "hex")
                        )

                    } else if (reqUrl.pathname == '/sign1') {
                        const input = JSON.parse(body);
                        multisigInteractive.sign1(
                            input.pk1,
                            input.pk2,
                            input.commitment2,
                            input.nonce2,
                            Buffer.from(bs58.decode(cfg.secrets[input.pk1])).toString("hex").substring(2, 64 + 2),
                            Buffer.from(input.msg, "hex"),
                            input.sessionId1
                        )

                    } else if (reqUrl.pathname == '/sign2') {
                        const input = JSON.parse(body);
                        multisigInteractive.sign2(
                            input.pk1,
                            input.pk2,
                            input.partSig1,
                            input.combinedNonceParity,
                            input.nonce1,
                            input.commitment1,
                            Buffer.from(bs58.decode(cfg.secrets[input.pk2])).toString("hex").substring(2, 64 + 2),
                            Buffer.from(input.msg, "hex"),
                            input.sessionId2
                        )

                    }
                 
                    return

                } catch(err) {
                    console.error(err)
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



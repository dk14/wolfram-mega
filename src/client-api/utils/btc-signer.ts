import WebSocket, { createWebSocketStream } from 'ws';
import * as http from 'http'
import * as url from 'url';
import * as fs from 'fs'
import { schnorrApi } from '../contracts/btc/schnorr';
const schnorr = require('bip-schnorr');
const muSig = schnorr.muSig;
const convert = schnorr.convert;
import * as multisig from '../contracts/btc/mu-sig'

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
        
                    if(reqUrl.pathname == '/sign') {
                        if (input.pubkeys.length > 1) {
                            const muSignature = multisig.sign(input.pubkeys[0], input.pubkeys[1], 
                                cfg.secrets[input.pubkeys[0]] ?? input.s[0],
                                cfg.secrets[input.pubkeys[1]] ?? input.s[1],
                                Buffer.from(input.msg, "hex"))
                            
                            res.end(muSignature)
                        } else {
                            const signature: Buffer = schnorr.sign(convert.bufferToInt(Buffer.from(cfg.secrets[input.pubkeys[0]], "hex")), Buffer.from(input.msg, "hex"))
                            res.end(signature.toString("hex"))
                        }
                        
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



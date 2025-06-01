import * as http from 'http'
import * as url from 'url';
import { OracleEndpointApi } from '../oracle-endpoint-api'
import { OracleCapability, FactRequest, Commitment, Fact } from '../../protocol'
import * as fs from 'fs'
import { webSign } from './oracle-web-signer';

export interface LookUp {
    getFact: (fr: FactRequest) => Promise<string>
    checkCommitment: (c: FactRequest) => Promise<boolean>
    newCp?: (q: string) => Promise<OracleCapability>
    genContract?: (c: FactRequest) => Promise<string>
}

type Signer = (msg: [Commitment, string]) => Promise<string>

export const webSigner: Signer = webSign

export const webLookup: LookUp = {
    getFact: async function (fr: FactRequest): Promise<string> {
        try {
            if (await window.webOracleFacts.get("answers", fr.capabilityPubKey)) {
                return window.webOracleFacts.get("answers", fr.capabilityPubKey)
            }
        } catch {

        }
        return "WHAT"
    },
    checkCommitment: async function (c: FactRequest): Promise<boolean> {
        return true
    }
}



export const endpointAPi = (signerFactory: () => Signer, lookup: LookUp): OracleEndpointApi => {
    const api: OracleEndpointApi = {
        requestNewCapability: async function (question: string): Promise<OracleCapability> {
            if (lookup.newCp) {
                return lookup.newCp(question)
            }
            throw new Error('Function not implemented.')
        },
        requestCommitment: async function (req: FactRequest): Promise<Commitment> {
            if (!lookup.checkCommitment(req)) {
                throw new Error('no commitment!')
            }
            const commitment: Commitment = {
                req: req,
                contract: lookup.genContract ? await lookup.genContract(req) : '',
                oracleSig: ''
            }
            const sign = signerFactory()

            commitment.rValueSchnorrHex = await sign([commitment, "!RVALUE"])
            commitment.oracleSig = await sign([commitment, ""])

            
            return commitment
        },
        requestFact: async function (req: Commitment): Promise<Fact> {
            const sign = signerFactory()
            const factMsg = await lookup.getFact(req.req)
            const fact: Fact = {
                factWithQuestion: factMsg,
                signatureType: 'SHA256',
                signature:  await sign([req, factMsg])
            }
            return fact
        }
    }
    return api
}

export const startHttp = (api: OracleEndpointApi, port: number) => {
    const server = http.createServer(async (req, res) => {
        res.statusCode = 200;
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);

        try {
            const reqUrl = url.parse(req.url!, true)

            if (req.method === 'OPTIONS') {
                // Handle OPTIONS request
                res.writeHead(204, {
                  'Access-Control-Allow-Origin': '*', // Adjust as needed for your use case
                  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                  'Access-Control-Max-Age': '86400', // Cache preflight response for 24 hours
                });
                res.end();
                return
            }
            
            if (req.method === 'POST') {
                res.setHeader('Access-Control-Allow-Origin', '*');
                var body = ''
                req.on('data',  function (chunk) {
                    body += chunk;
                });
                req.on('end', async function () {

                    try {
                        const postBody = JSON.parse(body);
                        res.statusCode = 201;
                        res.setHeader('content-Type', 'Application/json');
            
                        if(reqUrl.pathname == '/requestNewCapability') {
                            const out = await api.requestNewCapability(postBody)
                            res.end(JSON.stringify(out))
                        }
                    
                        if(reqUrl.pathname == '/requestCommitment') {
                            const out = await api.requestCommitment(postBody)
                            res.end(JSON.stringify(out))
                        }
                    
                        if(reqUrl.pathname == '/requestFact') {
                            const out = await api.requestFact(postBody)
                            res.end(JSON.stringify(out))
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
    server.listen(port)


}

interface EndpointCfg {
    answers: {[pubkey: string]: string},
    httpPort: number,
    signerAddress: string
}

if (require.main === module) {

    const path = process.argv[2] ?? "cfg/endpoint-test.json";

    const getcfg = (): EndpointCfg => {
        try {
            return JSON.parse(fs.readFileSync(__dirname + '/' + path).toString())
        } catch {
            return JSON.parse(fs.readFileSync(path).toString())
        }

    }

    const cfg = getcfg()

    const lookup: LookUp = {
        getFact: async function (fr: FactRequest): Promise<string> {
            try {
                if (cfg.answers[fr.capabilityPubKey]) {
                    return cfg.answers[fr.capabilityPubKey]
                }
            } catch {

            }
            return "YES"
        },
        checkCommitment: async function (c: FactRequest): Promise<boolean> {
            return true
        }
    }

    const restSigner = async (x: [Commitment, string]): Promise<string> => {        
        if (x[1] === '!RVALUE') {
            const res = ((await fetch(cfg.signerAddress + "rvalue", {
                method: 'post',
                body: JSON.stringify(x[0]),
                headers: {'Content-Type': 'application/json'}
            })).text())
            return(res)
        } else if (x[1] === '') {
            return ((await fetch(cfg.signerAddress + "signCommitment", {
                method: 'post',
                body: JSON.stringify(x[0]),
                headers: {'Content-Type': 'application/json'}
            })).text())
        } else {
            return ((await fetch(cfg.signerAddress + "signFact?fact=" + encodeURIComponent(x[1]), {
                method: 'post',
                body: JSON.stringify(x[0]),
                headers: {'Content-Type': 'application/json'}
            })).text())
        }
    }
    const api = endpointAPi(() => restSigner, lookup)

    console.log(`Starting Oracle Mocking Endpoint... HTTP=${cfg.httpPort}`)
    startHttp(api, cfg.httpPort)
    
}
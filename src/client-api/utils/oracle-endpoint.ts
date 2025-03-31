import * as http from 'http'
import * as url from 'url';
import { OracleEndpointApi } from '../oracle-endpoint-api'
import { OracleCapability, FactRequest, Commitment, Fact } from '../../node'
import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws';
import * as readline from 'readline'

export interface LookUp {
    getFact: (fr: FactRequest) => Promise<string>
    checkCommitment: (c: FactRequest) => Promise<boolean>
    newCp?: (q: string) => Promise<OracleCapability>
    genContract?: (c: FactRequest) => Promise<string>
}

type Signer = (msg: [Commitment, string]) => Promise<string>
var globalSigner: Signer = null

export const endpointAPi = (signerFactory: () => Signer, lookup: LookUp): OracleEndpointApi => {
    const sign = signerFactory()
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
            commitment.oracleSig = await sign([commitment, ""])
            return commitment
        },
        requestFact: async function (req: Commitment): Promise<Fact> {
            const factMsg = await lookup.getFact(req.req)
            const fact: Fact = {
                factWithQuestion: factMsg,
                signatureType: 'SHA256',
                signature: await sign([req, factMsg])
            }
            return fact
        }
    }
    return api
}

export const startHttp = (api: OracleEndpointApi, port: number, wsPort: number) => {
    const server = http.createServer(async (req, res) => {
        res.statusCode = 200;

        try {
            const reqUrl = url.parse(req.url!, true)
            if (req.method === 'POST') {
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

    const wss = new WebSocketServer({ port: wsPort });
    

    wss.on('connection', function connection(ws, req) {
        ws.on('error', console.error);

        const stream = createWebSocketStream(ws, { encoding: 'utf8' });
        const rl = readline.createInterface(stream, stream);

        globalSigner = (msg) => {  
            return new Promise(resolve => {
                rl.question(JSON.stringify(msg) + "\n", a => resolve(JSON.parse(a)))
            })
        }    

    })
}



if (require.main === module) {
    const lookup: LookUp = {
        getFact: async function (fr: FactRequest): Promise<string> {
            return "001"
        },
        checkCommitment: async function (c: FactRequest): Promise<boolean> {
            return true
        }
    }
    const api = endpointAPi(() => globalSigner, lookup)
    const httpPort = 90999
    const wsPort = 909997

    console.log(`Starting Oracle Mocking Endpoint... HTTP=${httpPort}, WS=${wsPort}`)
    
}
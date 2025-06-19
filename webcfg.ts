import { p2pktr } from "./src/client-api/contracts/btc/tx";
import { MempoolConfig } from "./src/config";
import { Report, FactRequest, HashCashPow, Offer, OfferMsg, OfferTerms, OracleCapability, OracleId, MaleabilityReport, FactDisagreesWithPublic } from "./src/protocol";
import { Api, FacilitatorNode, api as ndapi} from './src/api';
import { Neighbor } from "./src/p2p";
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';
const ECPair = ECPairFactory(ecc);

const seedpool = 20
const prefix = "dk14-peerjs-10101010-"
const me =  Math.round(Math.random() * seedpool)

export const cfg: MempoolConfig<any> = {
    "maxOracles": 100,
    "maxCapabilities": 100,
    "maxReports": 100,
    "maxOffers": 10000,
    "maxConnections": 100,
    "maxMsgLength": 1000000,
    "httpPort": 8081,
    "p2pPort": 0,
    "p2pKeepAlive": 1000,
    "hostname": prefix + me,
    "isTest": true,
    "webrtcPeerServer": {
        host: "0.peerjs.com",
        port: 443,
        path: "/",
    },
    "p2pseed": [
        {"server": "dk14-peerjs-10101010-1"},
        {"server": "dk14-peerjs-1586786454-acceptor-test"}
    ].concat(Array(seedpool + 1).fill(0).map((_, i) => i === me ? undefined : ({"server": prefix + i})).filter(x => x !== undefined)),
    "oracle": {
        "id": {
            "pubkey": "AAA",
            "oracleSignatureType" : "SHA256"
        },
        "adInterval": 10000,
        "adTopN": 10,
        "dbPath": "./db/myoracle",
        "httpPort": 9080,
        "wsPort": 9081
    },
    "trader": {
        "broadcastOfferCycle": 5000,
        "broadcastReportCycle": 1000,
        "collectOffersCycle": 100,
        "collectReportsCycle": 100,
        "collectOracleAdsCycle": 100,
        "collectOracleCpCycle": 100,
        "pageSize": 100,
        "maxOraclesPages": 2,
        "maxCpPages": 2,
        "maxReportsPages": 2,
        "maxOffersPages": 20,
        "maxCollectors": 2,
        "dbPath": "./db",
        "httpPort": 0,
        "heliosNetwork": "https://d1t0d7c2nekuk0.cloudfront.net/preview.json",
        "btcSignerEndpoint": "http://localhost:9593/sign",
        "btcInteractiveSignerEndpoint": "http://localhost:9593/"
    }
}


export const pub1 = "e37e4cced6f555a1b2063d645f01ad4d57cc1ffa8c382d28d90561a945dbe13e"
export const pub2 = "7fe828395f6143c295ae162d235c3c4b58c27fa1fd2019e88da55979bba5396e"
const pubOracleCp = "07508128697f7a1aca5c3e86292daa4b08f76e68b405e4b4ffe50d066ade55c3"
const pubOracleCp2 = "7fe828395f6143c295ae162d235c3c4b58c27fa1fd2019e88da55979bba5396e"

const keyPair = ECPair.makeRandom()
export const pubRandom = keyPair.publicKey.toString("hex").slice(2)
export const privRandom = keyPair.toWIF()

//HD wallets: https://github.com/paulmillr/scure-bip32

const testPow: HashCashPow = {
    difficulty: 0,
    algorithm: 'SHA256',
    hash: 'TEST-OFFER',
    magicNo: 0
}

const testFactRequest: FactRequest = {
    capabilityPubKey: pubOracleCp,
    arguments: {}
}

const testOfferTerms: OfferTerms = {
    question: testFactRequest,
    partyBetsOn: ["YES"],
    counterPartyBetsOn: ["NO"],
    partyBetAmount: 4000,
    counterpartyBetAmount: 2087,
    txfee: 2000
}


const testOffer: Offer = {
    message: '',
    customContract: '',
    terms: testOfferTerms,
    blockchain: 'bitcoin-testnet',
    contact: ''
}

export const testOfferMsg: OfferMsg = {
    seqNo: 0,
    cTTL: 0,
    pow: testPow,
    content: testOffer
}

export const configureWebMocks = async () => {

    await window.privateDB.put("secrets", privRandom, pubRandom)

    await window.privateDB.put("secrets", "cRFAdefAzpxzKduj3F9wf3qSTgA5johBBqPZZT72hh46dgCRr997", pub1)
    await window.privateDB.put("secrets", "cPCMiHyZQt7UWF9y49CaW7ckT9FaFQj5ChnEbXnF51WwEcp6Agkq", pub2)
    await window.privateDB.put("secrets", "cW3z2LN7rwnomrds4cF2PJhbrCmFPkX1Q8KY5Fe6F6myRotHFXrv", pubOracleCp) 
    await window.webOracleFacts.put("answers", "YES", pubOracleCp)
    await window.webOracleFacts.put("answers", "YES", pubOracleCp2)
       
 
    const mockPow: HashCashPow = {
        difficulty: 0,
        algorithm: 'SHA256',
        hash: 'MOCK',
        magicNo: 0
    }

    const testOracle: OracleId = {
        pubkey: pubOracleCp,
        seqNo: 0,
        cTTL: 0,
        pow: mockPow,
        bid: {amount: 0, proof: ""},
        oracleSignature: '',
        oracleSignatureType: 'SHA256'
    }

    await window.storage.addOracle(testOracle)

    const testCp: OracleCapability = {
        oraclePubKey: pubOracleCp,
        capabilityPubKey: pubOracleCp,
        question: 'human extinct?',
        seqNo: 0,
        cTTL: 0,
        oracleSignature: '',
        oracleSignatureType: 'SHA256',
        pow: mockPow,
        endpoint: "weboracle:local",
        tags: ["world"],
        answers: ["YES", "NO"]
    }

    const testCp2: OracleCapability = {
        oraclePubKey: pubOracleCp,
        capabilityPubKey: pubOracleCp2,
        question: 'human extinct?',
        seqNo: 0,
        cTTL: 0,
        oracleSignature: '',
        oracleSignatureType: 'SHA256',
        pow: mockPow,
        endpoint: "weboracle:local",
        tags: ["world"],
        answers: ["YES", "NO"]
    }

    try {
        await ndapi.announceOracle(cfg, testOracle)
        await ndapi.announceCapability(cfg, testCp)
    } catch (e) {
        console.error(e)
    }
    
    await window.storage.addCp(testCp)


    await ndapi.announceCapability(cfg, testCp2)
    await window.storage.addCp(testCp2)

    const reportPow: HashCashPow = {
        difficulty: 0,
        algorithm: "SHA256",
        hash: "report-13",
        magicNo: 0
    }

    const reportPow2: HashCashPow = {
        difficulty: 0,
        algorithm: "SHA256",
        hash: "report-13-self-issued",
        magicNo: 0
    }

    const request: FactRequest = {
        capabilityPubKey: pubOracleCp,
        arguments: {}
    }

    const maleabilityReport: FactDisagreesWithPublic = {
        type: "fact-disagreees-with-public",
        request: request
    }

    const report: Report = {
        seqNo: 0,
        cTTL: 0,
        pow: reportPow,
        oraclePubKey: pubOracleCp,
        content: maleabilityReport
    }

    const report2: Report = {
        seqNo: 0,
        cTTL: 0,
        pow: reportPow2,
        oraclePubKey: pubOracleCp,
        content: maleabilityReport
    }

    try {
        await ndapi.reportMalleability(cfg, report)
    } catch (e) {
        console.error(e)
    }
    await window.storage.addReport(report)

    try {
        await ndapi.reportMalleability(cfg, report2)
    } catch (e) {
        console.error(e)
    }
    await window.storage.addReport(report2)
    await window.storage.addIssuedReport(report2)
    
}

export const nodeMock: FacilitatorNode<Neighbor> = {
    peers: [],
    discovered: async function (peer: Neighbor): Promise<void> {
        
    },
    broadcastPeer: function (peer: Neighbor): void {
        
    },
    processApiRequest: async function (command: string, content: string): Promise<void> {
        
    },
    broadcastMessage: function (command: string, content: string): void {
       
    }
}
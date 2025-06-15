import { p2pktr } from "./src/client-api/contracts/btc/tx";
import { MempoolConfig } from "./src/config";
import { FactRequest, HashCashPow, Offer, OfferMsg, OfferTerms, OracleCapability, OracleId } from "./src/protocol";
import { Api, FacilitatorNode, api as ndapi} from './src/api';
import { Neighbor } from "./src/p2p";

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
    "hostname": "dk14-peerjs-10101010" + Math.round(Math.random() * 1000),
    "isTest": true,
    "webrtcPeerServer": {
        host: "0.peerjs.com",
        port: 443,
        path: "/",
    },
    "p2pseed": [
        {"server": "dk14-peerjs-1586786454"},
        {"server": "dk14-peerjs-1586786454-acceptor-test"}
    ],
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


const pub1 = "e37e4cced6f555a1b2063d645f01ad4d57cc1ffa8c382d28d90561a945dbe13e"
const pub2 = "7fe828395f6143c295ae162d235c3c4b58c27fa1fd2019e88da55979bba5396e"
const pubOracleCp = "07508128697f7a1aca5c3e86292daa4b08f76e68b405e4b4ffe50d066ade55c3"
const pubOracleCp2 = "7fe828395f6143c295ae162d235c3c4b58c27fa1fd2019e88da55979bba5396e"


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

    


    try {
        await window.privateDB.add("secrets", "cRFAdefAzpxzKduj3F9wf3qSTgA5johBBqPZZT72hh46dgCRr997", pub1)
        await window.privateDB.add("secrets", "cPCMiHyZQt7UWF9y49CaW7ckT9FaFQj5ChnEbXnF51WwEcp6Agkq", pub2)
        await window.privateDB.add("secrets", "cW3z2LN7rwnomrds4cF2PJhbrCmFPkX1Q8KY5Fe6F6myRotHFXrv", pubOracleCp) 
        await window.webOracleFacts.add("answers", "YES", pubOracleCp)
        await window.webOracleFacts.add("answers", "YES", pubOracleCp2)
    } catch (e) {
        console.error(e)
    }

    window.address = p2pktr(pub1).address
    window.pubkey = pub1
 
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

    try{
        await window.storage.addOracle(testOracle)
    } catch {

    }

   

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


    try{
        await ndapi.announceOracle(cfg, testOracle)
        await ndapi.announceCapability(cfg, testCp)
        await window.storage.addCp(testCp)
    } catch {
        
    }

    try {

        await ndapi.announceCapability(cfg, testCp2)
         await window.storage.addCp(testCp2)

    } catch {
        
    }
    

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
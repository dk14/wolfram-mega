"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeMock = exports.configureWebMocks = exports.testOfferMsg = exports.privRandom = exports.pubRandom = exports.pub2 = exports.pub1 = exports.cfg = void 0;
const api_1 = require("./src/api");
const ecpair_1 = __importDefault(require("ecpair"));
const ecc = __importStar(require("tiny-secp256k1"));
const ECPair = (0, ecpair_1.default)(ecc);
const seedpool = 20;
const prefix = "dk14-peerjs-10101010-";
const me = Math.round(Math.random() * seedpool);
exports.cfg = {
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
        { "server": "dk14-peerjs-10101010-1" },
        { "server": "dk14-peerjs-1586786454-acceptor-test" }
    ].concat(Array(seedpool + 1).fill(0).map((_, i) => i === me ? undefined : ({ "server": prefix + i })).filter(x => x !== undefined)),
    "oracle": {
        "id": {
            "pubkey": "AAA",
            "oracleSignatureType": "SHA256"
        },
        "adInterval": 10000,
        "adTopN": 10,
        "dbPath": "./db/myoracle",
        "httpPort": 9080,
        "wsPort": 9081
    },
    "trader": {
        "broadcastOfferCycle": 10000,
        "broadcastReportCycle": 1000,
        "collectOffersCycle": 7000,
        "collectReportsCycle": 5000,
        "collectOracleAdsCycle": 1000,
        "collectOracleCpCycle": 1000,
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
};
exports.pub1 = "e37e4cced6f555a1b2063d645f01ad4d57cc1ffa8c382d28d90561a945dbe13e";
exports.pub2 = "7fe828395f6143c295ae162d235c3c4b58c27fa1fd2019e88da55979bba5396e";
const pubOracleCp = "07508128697f7a1aca5c3e86292daa4b08f76e68b405e4b4ffe50d066ade55c3";
const pubOracleCp2 = "7fe828395f6143c295ae162d235c3c4b58c27fa1fd2019e88da55979bba5396e";
const keyPair = ECPair.makeRandom();
exports.pubRandom = keyPair.publicKey.toString("hex").slice(2);
exports.privRandom = keyPair.toWIF();
//HD wallets: https://github.com/paulmillr/scure-bip32
const testPow = {
    difficulty: 0,
    algorithm: 'SHA256',
    hash: 'TEST-OFFER',
    magicNo: 0
};
const testFactRequest = {
    capabilityPubKey: pubOracleCp,
    arguments: {}
};
const testOfferTerms = {
    question: testFactRequest,
    partyBetsOn: ["YES"],
    counterPartyBetsOn: ["NO"],
    partyBetAmount: 4000,
    counterpartyBetAmount: 2087,
    txfee: 2000
};
const testOffer = {
    message: '',
    customContract: '',
    terms: testOfferTerms,
    blockchain: 'bitcoin-testnet',
    contact: ''
};
exports.testOfferMsg = {
    seqNo: 0,
    cTTL: 0,
    pow: testPow,
    content: testOffer
};
const configureWebMocks = async () => {
    await window.privateDB.put("secrets", exports.privRandom, exports.pubRandom);
    await window.privateDB.put("secrets", "cRFAdefAzpxzKduj3F9wf3qSTgA5johBBqPZZT72hh46dgCRr997", exports.pub1);
    await window.privateDB.put("secrets", "cPCMiHyZQt7UWF9y49CaW7ckT9FaFQj5ChnEbXnF51WwEcp6Agkq", exports.pub2);
    await window.privateDB.put("secrets", "cW3z2LN7rwnomrds4cF2PJhbrCmFPkX1Q8KY5Fe6F6myRotHFXrv", pubOracleCp);
    await window.webOracleFacts.put("answers", "YES", pubOracleCp);
    await window.webOracleFacts.put("answers", "YES", pubOracleCp2);
    const mockPow = {
        difficulty: 0,
        algorithm: 'SHA256',
        hash: 'MOCK',
        magicNo: 0
    };
    const testOracle = {
        pubkey: pubOracleCp,
        seqNo: 0,
        cTTL: 0,
        pow: mockPow,
        bid: { amount: 0, proof: "" },
        oracleSignature: '',
        oracleSignatureType: 'SHA256'
    };
    await window.storage.addOracle(testOracle);
    const testCp = {
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
    };
    const testCp2 = {
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
    };
    try {
        await api_1.api.announceOracle(exports.cfg, testOracle);
        await api_1.api.announceCapability(exports.cfg, testCp);
    }
    catch (e) {
        console.error(e);
    }
    await window.storage.addCp(testCp);
    await api_1.api.announceCapability(exports.cfg, testCp2);
    await window.storage.addCp(testCp2);
    const reportPow = {
        difficulty: 0,
        algorithm: "SHA256",
        hash: "report-13",
        magicNo: 0
    };
    const reportPow2 = {
        difficulty: 0,
        algorithm: "SHA256",
        hash: "report-13-self-issued",
        magicNo: 0
    };
    const request = {
        capabilityPubKey: pubOracleCp,
        arguments: {}
    };
    const maleabilityReport = {
        type: "fact-disagreees-with-public",
        request: request
    };
    const report = {
        seqNo: 0,
        cTTL: 0,
        pow: reportPow,
        oraclePubKey: pubOracleCp,
        content: maleabilityReport
    };
    const report2 = {
        seqNo: 0,
        cTTL: 0,
        pow: reportPow2,
        oraclePubKey: pubOracleCp,
        content: maleabilityReport
    };
    try {
        await api_1.api.reportMalleability(exports.cfg, report);
    }
    catch (e) {
        console.error(e);
    }
    await window.storage.addReport(report);
    try {
        await api_1.api.reportMalleability(exports.cfg, report2);
    }
    catch (e) {
        console.error(e);
    }
    await window.storage.addReport(report2);
    await window.storage.addIssuedReport(report2);
};
exports.configureWebMocks = configureWebMocks;
exports.nodeMock = {
    peers: [],
    discovered: async function (peer) {
    },
    broadcastPeer: function (peer) {
    },
    processApiRequest: async function (command, content) {
    },
    broadcastMessage: function (command, content) {
    }
};
//# sourceMappingURL=webcfg.js.map
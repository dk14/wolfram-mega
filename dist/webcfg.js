"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeMock = exports.configureWebMocks = exports.cfg = void 0;
const tx_1 = require("./src/client-api/contracts/btc/tx");
const api_1 = require("./src/api");
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
    "hostname": "dk14-peerjs-10101010" + Math.round(Math.random() * 1000),
    "isTest": true,
    "webrtcPeerServer": {
        host: "0.peerjs.com",
        port: 443,
        path: "/",
    },
    "p2pseed": [
        { "server": "dk14-peerjs-1586786454" },
        { "server": "dk14-peerjs-1586786454-acceptor-test" }
    ],
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
};
const configureWebMocks = async () => {
    const pub1 = "e37e4cced6f555a1b2063d645f01ad4d57cc1ffa8c382d28d90561a945dbe13e";
    const pub2 = "7fe828395f6143c295ae162d235c3c4b58c27fa1fd2019e88da55979bba5396e";
    const pubOracleCp = "07508128697f7a1aca5c3e86292daa4b08f76e68b405e4b4ffe50d066ade55c3";
    const pubOracleCp2 = "7fe828395f6143c295ae162d235c3c4b58c27fa1fd2019e88da55979bba5396e";
    try {
        await window.privateDB.add("secrets", "cRFAdefAzpxzKduj3F9wf3qSTgA5johBBqPZZT72hh46dgCRr997", pub1);
        await window.privateDB.add("secrets", "cPCMiHyZQt7UWF9y49CaW7ckT9FaFQj5ChnEbXnF51WwEcp6Agkq", pub2);
        await window.privateDB.add("secrets", "cW3z2LN7rwnomrds4cF2PJhbrCmFPkX1Q8KY5Fe6F6myRotHFXrv", pubOracleCp);
    }
    catch (e) {
        console.error(e);
    }
    await window.webOracleFacts.add("answers", "YES", pubOracleCp);
    await window.webOracleFacts.add("answers", "YES", pubOracleCp2);
    window.address = (0, tx_1.p2pktr)(pub1).address;
    window.pubkey = pub1;
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
    const testOfferMsg = {
        seqNo: 0,
        cTTL: 0,
        pow: testPow,
        content: testOffer
    };
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
        tags: ["world"]
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
        tags: ["world"]
    };
    await api_1.api.announceOracle(exports.cfg, testOracle);
    await api_1.api.announceCapability(exports.cfg, testCp);
    await window.storage.addCp(testCp);
    await api_1.api.announceCapability(exports.cfg, testCp2);
    await window.storage.addCp(testCp2);
    await api_1.api.publishOffer(exports.cfg, testOfferMsg);
    await window.storage.addOffer(testOfferMsg);
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
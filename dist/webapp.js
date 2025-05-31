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
const trader_api_1 = require("./src/client-api/trader-api");
const node_1 = require("./src/node");
const btc = __importStar(require("./src/client-api/contracts/generate-btc-tx"));
const sandboxjs_1 = __importDefault(require("@nyariv/sandboxjs"));
const idb_1 = require("idb");
const matching_1 = require("./src-web/matching");
const tx_1 = require("./src/client-api/contracts/btc/tx");
const stalking_1 = require("./src-web/stalking");
global.initWebapp = new Promise(async (resolve) => {
    window.spec = await (await fetch("./../wolfram-mega-spec.yaml")).text();
    const safeEval = (expression, data) => {
        const sandbox = new sandboxjs_1.default();
        const exec = sandbox.compile("return " + expression);
        const res = exec(data).run();
        return res;
    };
    const cfg = {
        "maxOracles": 100,
        "maxCapabilities": 100,
        "maxReports": 100,
        "maxOffers": 100,
        "maxConnections": 100,
        "maxMsgLength": 1000000,
        "httpPort": 8081,
        "p2pPort": 8334,
        "hostname": "localhost",
        "isTest": true,
        "p2pseed": [
            { "server": "dk14-peerjs-1586786454", "port": 0 }
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
            "broadcastOfferCycle": 1000,
            "broadcastReportCycle": 1000,
            "collectOffersCycle": 1000,
            "collectReportsCycle": 1000,
            "collectOracleAdsCycle": 1000,
            "collectOracleCpCycle": 1000,
            "pageSize": 100,
            "maxOraclesPages": 2,
            "maxCpPages": 2,
            "maxReportsPages": 2,
            "maxOffersPages": 2,
            "maxCollectors": 2,
            "dbPath": "./db",
            "httpPort": 7080,
            "heliosNetwork": "https://d1t0d7c2nekuk0.cloudfront.net/preview.json",
            "btcSignerEndpoint": "http://localhost:9593/sign",
            "btcInteractiveSignerEndpoint": "http://localhost:9593/"
        }
    };
    const adaptjs = (js) => async (x) => { return safeEval(js, x); };
    const adaptPred = (p) => "(" + p.toString() + ")(this)";
    const adaptQuery = (q) => "(" + q.where.toString() + ")(this)";
    const traderApiRemote = {
        collectOracles: async function (tag, predicate, limit) {
            await fetch('./collectOracles?tag=' + encodeURIComponent(tag), {
                method: 'post',
                body: JSON.stringify({
                    predicate,
                    limit
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            throw new Error('Function not implemented.');
        },
        collectCapabilities: async function (tag, q, opredicate, predicate, limit) {
            await fetch('./collectCapabilities?tag=' + encodeURIComponent(tag), {
                method: 'post',
                body: JSON.stringify({
                    oquery: q,
                    opredicate,
                    predicate
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            throw new Error('Function not implemented.');
        },
        collectReports: async function (tag, q, opredicate, predicate, limit) {
            await fetch('./collectReports?tag=' + encodeURIComponent(tag), {
                method: 'post',
                body: JSON.stringify({
                    oquery: q,
                    opredicate,
                    predicate
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            throw new Error('Function not implemented.');
        },
        collectOffers: async function (tag, q, cppredicate, matchingPredicate, limit) {
            await fetch('./collectOffers?tag=' + encodeURIComponent(tag), {
                method: 'post',
                body: JSON.stringify({
                    cpquery: q,
                    cppredicate,
                    predicate: matchingPredicate
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            throw new Error('Function not implemented.');
        },
        issueReport: async function (r) {
            await fetch('./issueReport', {
                method: 'post',
                body: JSON.stringify(r),
                headers: { 'Content-Type': 'application/json' }
            });
        },
        issueOffer: async function (o) {
            await fetch('./issueOffer', {
                method: 'post',
                body: JSON.stringify(o),
                headers: { 'Content-Type': 'application/json' }
            });
        },
        startBroadcastingIssuedOffers: function () {
            fetch('./broadcastIssuedOffers');
        },
        stopBroadcastingIssuedOffers: function () {
            throw new Error('Function not implemented.');
        },
        startBroadcastingIssuedReports: function () {
            fetch('./broadcastIssuedReports');
        },
        stopBroadcastingIssuedReports: function () {
            throw new Error('Function not implemented.');
        }
    };
    const traderApiRemoteAdapted = {
        collectOracles: async function (tag, predicate, limit) {
            return traderApiRemote.collectOracles(tag, adaptPred(predicate), limit);
        },
        collectCapabilities: async function (tag, q, opredicate, predicate, limit) {
            return traderApiRemote.collectCapabilities(tag, adaptQuery(q), adaptPred(opredicate), adaptPred(predicate), limit);
        },
        collectReports: async function (tag, q, opredicate, predicate, limit) {
            return traderApiRemote.collectReports(tag, adaptQuery(q), adaptPred(opredicate), adaptPred(predicate), limit);
        },
        collectOffers: async function (tag, q, cppredicate, matchingPredicate, limit) {
            return traderApiRemote.collectOffers(tag, adaptQuery(q), adaptPred(cppredicate), adaptPred(matchingPredicate), limit);
        },
        issueReport: function (r) {
            return traderApiRemote.issueReport(r);
        },
        issueOffer: function (o) {
            return traderApiRemote.issueOffer(o);
        },
        startBroadcastingIssuedOffers: function () {
            traderApiRemote.startBroadcastingIssuedOffers();
        },
        stopBroadcastingIssuedOffers: function () {
            traderApiRemote.stopBroadcastingIssuedOffers();
        },
        startBroadcastingIssuedReports: function () {
            traderApiRemote.startBroadcastingIssuedReports();
        },
        stopBroadcastingIssuedReports: function () {
            traderApiRemote.stopBroadcastingIssuedReports();
        }
    };
    //WALLETT
    window.privateDB = await (0, idb_1.openDB)('private', 1, {
        upgrade(db) {
            db.createObjectStore('secrets');
        },
    });
    const pub1 = "cRFAdefAzpxzKduj3F9wf3qSTgA5johBBqPZZT72hh46dgCRr997";
    const pub2 = "cRFAdefAzpxzKduj3F9wf3qSTgA5johBBqPZZT72hh46dgCRr997";
    const pubOracleCp = "cW3z2LN7rwnomrds4cF2PJhbrCmFPkX1Q8KY5Fe6F6myRotHFXrv";
    try {
        await window.privateDB.add("secrets", pub1, "e37e4cced6f555a1b2063d645f01ad4d57cc1ffa8c382d28d90561a945dbe13e");
        await window.privateDB.add("secrets", pub2, "7fe828395f6143c295ae162d235c3c4b58c27fa1fd2019e88da55979bba5396e");
        await window.privateDB.add("secrets", pubOracleCp, "07508128697f7a1aca5c3e86292daa4b08f76e68b405e4b4ffe50d066ade55c3");
    }
    catch {
    }
    try {
        window.address = (0, tx_1.p2pktr)(pub1).address;
    }
    catch {
    }
    //LOCAL ORACLE
    window.webOracleFacts = await (0, idb_1.openDB)('web-oracle', 1, {
        upgrade(db) {
            db.createObjectStore('answers');
        },
    });
    try {
        await window.webOracleFacts.add("answers", pubOracleCp, "YES");
    }
    catch {
    }
    const db = await (0, idb_1.openDB)('store', 1, {
        upgrade(db) {
            db.createObjectStore('oracles');
            db.createObjectStore('cps');
            db.createObjectStore('reports');
            db.createObjectStore('offers');
            db.createObjectStore('issued-reports');
            db.createObjectStore('issued-offers');
        },
    });
    const indexDBstorage = {
        addOracle: async function (o) {
            const found = await db.get("oracles", o.pubkey);
            await db.put("oracles", o, o.pubkey);
            return found === undefined;
        },
        addCp: async function (cp) {
            const found = await db.get("cps", cp.capabilityPubKey);
            await db.put("cps", cp, cp.capabilityPubKey);
            return found === undefined;
        },
        addReport: async function (r) {
            const found = await db.get("reports", r.pow.hash);
            await db.put("reports", r, r.pow.hash);
            return found === undefined;
        },
        addIssuedReport: async function (r) {
            const found = await db.get("issued-reports", r.pow.hash);
            await db.put("issued-reports", r, r.pow.hash);
            return found === undefined;
        },
        addOffer: async function (o) {
            const found = await db.get("offers", o.pow.hash);
            await db.put("offers", o, o.pow.hash);
            return found === undefined;
        },
        addIssuedOffer: async function (o) {
            const found = await db.get("issued-offers", o.pow.hash);
            await db.put("issued-offers", o, o.pow.hash);
            return found === undefined;
        },
        removeOracles: async function (pubkeys) {
            Promise.all(pubkeys.map(pub => db.delete("oracles", pub)));
        },
        removeCps: async function (pubkeys) {
            await Promise.all(pubkeys.map(pub => db.delete("cps", pub)));
        },
        removeReports: async function (pubkeys) {
            await Promise.all(pubkeys.map(pub => db.delete("reports", pub)));
        },
        removeOffers: async function (pubkeys) {
            await Promise.all(pubkeys.map(pub => db.delete("offers", pub)));
        },
        removeIssuedOffers: async function (pubkeys) {
            await Promise.all(pubkeys.map(pub => db.delete("issued-offers", pub)));
        },
        removeIssuedReports: async function (pubkeys) {
            await Promise.all(pubkeys.map(pub => db.delete("issued-reports", pub)));
        },
        allOracles: function (q, opredicate, handler) {
            throw new Error('Function not implemented.');
        },
        allCps: function (q, cppredicate, handler) {
            throw new Error('Function not implemented.');
        },
        queryOracles: async function (q, paging) {
            const oracles = db.transaction('oracles').store;
            const result = [];
            var i = 0;
            for await (const cursor of oracles) {
                if (q.where(cursor.value)) {
                    i++;
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break;
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value);
                    }
                }
            }
            return result;
        },
        queryCapabilities: async function (q, paging) {
            const cps = db.transaction('cps').store;
            const result = [];
            var i = 0;
            for await (const cursor of cps) {
                if (q.where(cursor.value)) {
                    i++;
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break;
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value);
                    }
                }
            }
            return result;
        },
        queryOffers: async function (q, paging) {
            const offers = db.transaction('offers').store;
            const result = [];
            var i = 0;
            for await (const cursor of offers) {
                if (q.where(cursor.value)) {
                    i++;
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break;
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value);
                    }
                }
            }
            return result;
        },
        queryReports: async function (q, paging) {
            const reports = db.transaction('reports').store;
            const result = [];
            var i = 0;
            for await (const cursor of reports) {
                if (q.where(cursor.value)) {
                    i++;
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break;
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value);
                    }
                }
            }
            return result;
        },
        queryIssuedOffers: async function (q, paging) {
            const offers = db.transaction('issued-offers').store;
            const result = [];
            var i = 0;
            for await (const cursor of offers) {
                if (q.where(cursor.value)) {
                    i++;
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break;
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value);
                    }
                }
            }
            return result;
        },
        queryIssuedReports: async function (q, paging) {
            const reports = db.transaction('issued-reports').store;
            const result = [];
            var i = 0;
            for await (const cursor of reports) {
                if (q.where(cursor.value)) {
                    i++;
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break;
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value);
                    }
                }
            }
            return result;
        },
        allIssuedOffers: async function (handler) {
            (await db.getAll("issued-offers")).forEach(o => {
                handler(o);
            });
        },
        allIssuedReports: async function (handler) {
            (await db.getAll("issued-offers")).forEach(o => {
                handler(o);
            });
        }
    };
    const remoteStorage = {
        addOracle: function (o) {
            throw new Error('Function not implemented.');
        },
        addCp: function (cp) {
            throw new Error('Function not implemented.');
        },
        addReport: function (r) {
            throw new Error('Function not implemented.');
        },
        addIssuedReport: function (r) {
            throw new Error('Function not implemented.');
        },
        addOffer: function (o) {
            throw new Error('Function not implemented.');
        },
        addIssuedOffer: function (o) {
            throw new Error('Function not implemented.');
        },
        removeOracles: function (pubkeys) {
            throw new Error('Function not implemented.');
        },
        removeCps: function (pubkeys) {
            throw new Error('Function not implemented.');
        },
        removeReports: function (pubkeys) {
            throw new Error('Function not implemented.');
        },
        removeOffers: function (pubkeys) {
            throw new Error('Function not implemented.');
        },
        removeIssuedOffers: function (pubkeys) {
            throw new Error('Function not implemented.');
        },
        removeIssuedReports: function (pubkeys) {
            throw new Error('Function not implemented.');
        },
        allOracles: function (q, opredicate, handler) {
            throw new Error('Function not implemented.');
        },
        allCps: function (q, cppredicate, handler) {
            throw new Error('Function not implemented.');
        },
        queryOracles: function (q, paging) {
            throw new Error('Function not implemented.');
        },
        queryCapabilities: function (q, paging) {
            throw new Error('Function not implemented.');
        },
        queryOffers: function (q, paging) {
            throw new Error('Function not implemented.');
        },
        queryReports: function (q, paging) {
            throw new Error('Function not implemented.');
        },
        queryIssuedOffers: function (q, paging) {
            throw new Error('Function not implemented.');
        },
        queryIssuedReports: function (q, paging) {
            throw new Error('Function not implemented.');
        },
        allIssuedOffers: function (handler) {
            throw new Error('Function not implemented.');
        },
        allIssuedReports: function (handler) {
            throw new Error('Function not implemented.');
        }
    };
    const adaptedStorage = {
        addOracle: function (o) {
            throw new Error('Function not implemented.');
        },
        addCp: function (cp) {
            throw new Error('Function not implemented.');
        },
        addReport: function (r) {
            throw new Error('Function not implemented.');
        },
        addIssuedReport: function (r) {
            throw new Error('Function not implemented.');
        },
        addOffer: function (o) {
            throw new Error('Function not implemented.');
        },
        addIssuedOffer: function (o) {
            throw new Error('Function not implemented.');
        },
        removeOracles: function (pubkeys) {
            throw new Error('Function not implemented.');
        },
        removeCps: function (pubkeys) {
            throw new Error('Function not implemented.');
        },
        removeReports: function (pubkeys) {
            throw new Error('Function not implemented.');
        },
        removeOffers: function (pubkeys) {
            throw new Error('Function not implemented.');
        },
        removeIssuedOffers: function (pubkeys) {
            throw new Error('Function not implemented.');
        },
        removeIssuedReports: function (pubkeys) {
            throw new Error('Function not implemented.');
        },
        allOracles: function (q, opredicate, handler) {
            throw new Error('Function not implemented.');
        },
        allCps: function (q, cppredicate, handler) {
            throw new Error('Function not implemented.');
        },
        queryOracles: function (q, paging) {
            throw new Error('Function not implemented.');
        },
        queryCapabilities: function (q, paging) {
            throw new Error('Function not implemented.');
        },
        queryOffers: function (q, paging) {
            throw new Error('Function not implemented.');
        },
        queryReports: function (q, paging) {
            throw new Error('Function not implemented.');
        },
        queryIssuedOffers: function (q, paging) {
            throw new Error('Function not implemented.');
        },
        queryIssuedReports: function (q, paging) {
            throw new Error('Function not implemented.');
        },
        allIssuedOffers: function (handler) {
            throw new Error('Function not implemented.');
        },
        allIssuedReports: function (handler) {
            throw new Error('Function not implemented.');
        }
    };
    const node = {
        peers: [],
        discovered: function (peer) {
        },
        broadcastPeer: function (peer) {
        },
        processApiRequest: async function (command, content) {
        },
        broadcastMessage: function (command, content) {
        }
    };
    try {
        //startP2P(cfg, browserPeerAPI)
    }
    catch (e) {
        console.log(e);
    }
    window.pool = node_1.api;
    window.traderApi = (0, trader_api_1.traderApi)(cfg.trader, cfg, node_1.api, indexDBstorage, node);
    window.storage = indexDBstorage;
    window.btc = {
        generateClosingTransaction: btc.generateClosingTransaction,
        generateCetRedemptionTransaction: btc.generateCetRedemptionTransaction,
        generateDlcContract: btc.generateDlcContract
    };
    window.matching = matching_1.matchingEngine;
    window.stalking = stalking_1.stalkingEngine;
    const testPow = {
        difficulty: 0,
        algorithm: 'SHA-256',
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
        partyBetAmount: 10,
        counterpartyBetAmount: 200
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
    await node_1.api.publishOffer(cfg, testOfferMsg);
    await window.storage.addOffer(testOfferMsg);
    const mockPow = {
        difficulty: 0,
        algorithm: 'SHA-256',
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
        oracleSignatureType: ''
    };
    await window.storage.addOracle(testOracle);
    const testCp = {
        oraclePubKey: pubOracleCp,
        capabilityPubKey: pubOracleCp,
        question: '???',
        seqNo: 0,
        cTTL: 0,
        oracleSignature: '',
        oracleSignatureType: '',
        pow: mockPow,
        endpoint: "weboracle:local"
    };
    await node_1.api.announceOracle(cfg, testOracle);
    await node_1.api.announceCapability(cfg, testCp);
    await window.storage.addCp(testCp);
    console.log("WebAPI is ready!");
    resolve(window);
});
//# sourceMappingURL=webapp.js.map
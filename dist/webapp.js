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
Object.defineProperty(exports, "__esModule", { value: true });
const trader_api_1 = require("./src/client-api/trader-api");
const p2p_1 = require("./src/p2p");
const api_1 = require("./src/api");
const btc = __importStar(require("./src/client-api/contracts/generate-btc-tx"));
const idb_1 = require("idb");
const matching_1 = require("./src-web/matching");
const tx_1 = require("./src/client-api/contracts/btc/tx");
const stalking_1 = require("./src-web/stalking");
const p2p_webrtc_1 = require("./src/p2p-webrtc");
const storage_1 = require("./src-web/impl/storage");
const webcfg_1 = require("./webcfg");
const oracle_data_provider_1 = require("./src-web/oracle-data-provider");
const transactions_1 = require("./src-web/transactions");
window.txfee = 2000;
const initWebapp = new Promise(async (resolve) => {
    window.spec = await (await fetch("./../wolfram-mega-spec.yaml")).text();
    global.cfg = webcfg_1.cfg;
    //PROFILE
    window.profiledb = await (0, idb_1.openDB)('profile', 1, {
        upgrade(db) {
            db.createObjectStore('xpub');
            db.createObjectStore('preferences');
        },
    });
    window.user = "default";
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get('user');
        if (param) {
            window.user = param;
        }
    }
    catch {
    }
    let xpub = await window.profiledb.get("xpub", window.user);
    if (!xpub) {
        if (window.user === 'alice') {
            xpub = webcfg_1.pub1;
        }
        else if (window.user === 'bob') {
            xpub = webcfg_1.pub2;
        }
        else {
            xpub = (0, webcfg_1.configurePub)();
        }
        try {
            await window.profiledb.put("xpub", xpub, window.user);
        }
        catch {
        }
    }
    window.address = (0, tx_1.p2pktr)(xpub).address;
    window.pubkey = xpub;
    //WALLETT
    window.privateDB = await (0, idb_1.openDB)('private', 1, {
        upgrade(db) {
            db.createObjectStore('secrets');
        },
    });
    //LOCAL ORACLE
    window.webOracleFacts = await (0, idb_1.openDB)('web-oracle', 1, {
        upgrade(db) {
            db.createObjectStore('answers');
        },
    });
    window.pool = api_1.api;
    if (!global.isTest) {
        const api = await (0, p2p_1.startP2P)(global.cfg, await (0, p2p_webrtc_1.browserPeerAPI)());
        setInterval(() => {
            window.peerlist = api.peers.map(x => x.addr.server);
        });
    }
    const store = (0, storage_1.indexDBstorage)(await (0, storage_1.database)());
    window.traderApi = (0, trader_api_1.traderApi)(webcfg_1.cfg.trader, webcfg_1.cfg, api_1.api, store, p2p_1.p2pNode);
    window.storage = store;
    window.hashLockProvider = matching_1.hashLockProvider;
    window.btc = {
        generateClosingTransaction: btc.generateClosingTransaction,
        generateCetRedemptionTransaction: btc.generateCetRedemptionTransaction,
        generateDlcContract: btc.generateDlcContract,
        generateChildDlcContract: btc.generateChildDlcContract
    };
    window.matching = matching_1.matchingEngine;
    window.stalking = stalking_1.stalkingEngine;
    window.progressOffers = async () => {
        await window.stalking.trackIssuedOffers({
            "bitcoin-testnet": transactions_1.btcDlcContractInterpreter
        }, oracle_data_provider_1.dataProvider);
    };
    await (0, webcfg_1.configureWebMocks)();
    window.pool = api_1.api;
    if (!global.isTest && !window.test) {
        (0, p2p_1.startP2P)(global.cfg, await (0, p2p_webrtc_1.browserPeerAPI)());
        setInterval(() => window.stalking.trackIssuedOffers({
            "bitcoin-testnet": transactions_1.btcDlcContractInterpreter
        }, oracle_data_provider_1.dataProvider), 200);
    }
    console.log("WebAPI is ready!");
    resolve();
});
global.initWebapp = initWebapp;
window.initWebapp = initWebapp;
const ev = new CustomEvent('init-webapp', { bubbles: true, cancelable: false });
try {
    window.document.body.dispatchEvent(ev);
}
catch {
}
//# sourceMappingURL=webapp.js.map
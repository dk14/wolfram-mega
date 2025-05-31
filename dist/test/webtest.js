"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("fake-indexeddb/auto");
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = jsdom.window;
global.document = window.document;
global.localStorage = undefined;
const fetch_mock_1 = __importDefault(require("fetch-mock"));
const transactions_1 = require("../src-web/transactions");
const oracle_data_provider_1 = require("../src-web/oracle-data-provider");
fetch_mock_1.default.config.allowRelativeUrls = true;
fetch_mock_1.default.mockGlobal().route("./../wolfram-mega-spec.yaml", "data");
require("../webapp");
(async () => {
    await global.initWebapp;
    console.log("\n");
    console.log("MATCHING TEST");
    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": transactions_1.btcDlcContractInterpreter
    }, oracle_data_provider_1.dataProvider), 1000);
    const preferences = {
        minOraclePow: 0,
        minOracleReputation: 0,
        tags: [],
        txfee: 0
    };
    console.log("- start collectors");
    window.matching.collectQuestions(preferences);
    window.matching.collectOffers(preferences);
    console.log("- pick offer");
    const offer = await window.matching.pickOffer();
    console.log("- accept selected offer");
    await window.matching.acceptOffer(offer);
    console.log("- generate random offer");
    const myOffer = await window.matching.generateOffer(preferences);
    console.log("- broadcast generated offer");
    await window.matching.broadcastOffer(myOffer);
    console.log("- create and broadcast custom offer");
    // custom offer
    const oracles = await window.storage.queryCapabilities({ where: async (x) => true }, {
        page: 0,
        chunkSize: 100
    });
    const oracle = {
        capabilityPub: oracles[0].capabilityPubKey,
        oracle: '',
        endpoint: ''
    };
    const myCustomOffer = {
        id: 'id',
        bet: [1, 100],
        oracles: [oracle],
        question: '?',
        status: 'matching',
        blockchain: 'bitcoin-testnet',
        role: 'initiator'
    };
    await window.matching.broadcastOffer(myCustomOffer);
    console.log("OK!");
    process.exit(0);
})();
//# sourceMappingURL=webtest.js.map
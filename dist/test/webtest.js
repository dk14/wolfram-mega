"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configure_1 = require("./util/configure");
configure_1.configure;
global.isUnitTestTest = true;
const transactions_1 = require("../src-web/transactions");
const oracle_data_provider_1 = require("../src-web/oracle-data-provider");
const assert_1 = __importDefault(require("assert"));
require("../webapp");
(async () => {
    await global.initWebapp;
    console.log("\n");
    console.log("MATCHING TEST");
    //startP2P(global.cfg, await browserPeerAPI())
    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": transactions_1.btcDlcContractInterpreter
    }, oracle_data_provider_1.dataProvider), 1000);
    const preferences = {
        minOracleRank: 0,
        tags: [],
        txfee: 0
    };
    console.log("- start collectors");
    window.matching.collectQuestions(preferences);
    window.matching.collectOffers(preferences);
    console.log("- pick offer");
    const offer = await window.matching.pickOffer(preferences);
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
    console.log("\n");
    console.log("WEBPAGE TEST");
    console.log("- model: data is present");
    assert_1.default.ok(window["model"]);
    assert_1.default.ok(window["model"].contracts);
    assert_1.default.ok(window["model"].contracts[0]);
    console.log("- view: UI elements are present");
    assert_1.default.strictEqual(document.getElementById("matching").className, "scrollable");
    assert_1.default.strictEqual(document.getElementById("profile").className, "scrollable profile");
    console.log("- controller: fetch or generate offers");
    const pickedOffer = await window["pickOrGenerateOffer"](true);
    assert_1.default.ok(pickedOffer);
    const generatedOffer = await window["pickOrGenerateOffer"](false);
    assert_1.default.ok(generatedOffer);
    console.log("\n");
    console.log("OK!");
    process.exit(0);
})();
//# sourceMappingURL=webtest.js.map
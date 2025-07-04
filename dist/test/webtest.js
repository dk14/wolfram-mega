"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
global.isUnitTestTest = true;
const configure_1 = require("./util/configure");
configure_1.configure;
const transactions_1 = require("../src-web/transactions");
const oracle_data_provider_1 = require("../src-web/oracle-data-provider");
const assert_1 = __importDefault(require("assert"));
const webcfg_1 = require("../webcfg");
const tx_1 = require("../src/client-api/contracts/btc/tx");
require("../webapp");
(async () => {
    const initView = new Promise(resolve => {
        document.addEventListener('load', resolve);
    });
    // have to be registered before `initWebapp` mutex, otherwise events would be fired ahead
    const initController = new Promise(resolve => {
        document.addEventListener('init-offer-controller', resolve);
    });
    const initModel = new Promise(resolve => {
        document.addEventListener('init-model', resolve);
    });
    await global.initWebapp;
    console.log("\n");
    console.log("SETUP TEST");
    console.log("- user pubkey is selected");
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('user'); //see configure.ts
    assert_1.default.equal(param, "alice");
    assert_1.default.equal("alice", window.user);
    assert_1.default.equal(webcfg_1.pub1, window.pubkey);
    assert_1.default.equal((0, tx_1.p2pktr)(webcfg_1.pub1).address, window.address);
    console.log("- profile created");
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
    console.log("- view: UI elements are present");
    await initView;
    assert_1.default.strictEqual(document.getElementById("matching").className, "scrollable");
    assert_1.default.strictEqual(document.getElementById("profile").className, "scrollable profile");
    console.log("- model: data is present");
    await initModel;
    assert_1.default.ok(window["model"]);
    assert_1.default.ok(window["model"].contracts);
    console.log("- controller: fetch or generate offers");
    await initController;
    const pickedOffer = await window["pickOrGenerateOffer"](true);
    assert_1.default.ok(pickedOffer);
    const generatedOffer = await window["pickOrGenerateOffer"](false);
    assert_1.default.ok(generatedOffer);
    console.log("\n");
    console.log("OK!");
    process.exit(0);
})();
//# sourceMappingURL=webtest.js.map
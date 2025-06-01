"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("fake-indexeddb/auto");
const fs_1 = __importDefault(require("fs"));
const jsdom_1 = require("jsdom");
const webpage = fs_1.default.readFileSync(__dirname + "/../../webapp/index.html").toString("utf-8");
const jsdom = new jsdom_1.JSDOM(webpage, { runScripts: "dangerously" });
global.window = jsdom.window;
global.document = window.document;
global.localStorage = undefined;
const fetch_mock_1 = __importDefault(require("fetch-mock"));
const transactions_1 = require("../../src-web/transactions");
const oracle_data_provider_1 = require("../../src-web/oracle-data-provider");
fetch_mock_1.default.config.allowRelativeUrls = true;
fetch_mock_1.default.mockGlobal().route("./../../wolfram-mega-spec.yaml", "data");
require("../../webapp");
(async () => {
    await global.initWebapp;
    console.log("\n");
    console.log("Start Acceptor");
    console.log("\n");
    console.log("----------");
    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": transactions_1.btcDlcContractInterpreter
    }, oracle_data_provider_1.dataProvider), 10);
    const preferences = {
        minOraclePow: 0,
        minOracleReputation: 0,
        tags: [],
        txfee: 0
    };
    window.matching.collectQuestions(preferences);
    window.matching.collectOffers(preferences);
    let offer = undefined;
    let i = 0;
    while (offer === undefined && i < 30) {
        i++;
        const candidate = await window.matching.pickOffer();
        if (candidate.bet[1] === 30345) {
            offer = candidate;
        }
    }
    await window.matching.acceptOffer(offer);
    setInterval(async () => {
        const orders = await window.matching.listOrders({ page: 0, chunkSize: 100 });
        const txReady = orders.filter(o => o.status === "opening tx available" && o.bet[1] === 30345).length > 0;
        if (txReady) {
            console.log("OK");
            process.exit(0);
        }
    }, 1000);
})();
//# sourceMappingURL=webtest-acceptor.js.map
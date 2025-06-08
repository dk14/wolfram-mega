"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webcfg_1 = require("../../webcfg");
webcfg_1.cfg.p2pseed = [];
webcfg_1.cfg.hostname = process.argv[3] ?? "acceptor-peer";
const configure_1 = require("./configure");
configure_1.configure;
const transactions_1 = require("../../src-web/transactions");
const oracle_data_provider_1 = require("../../src-web/oracle-data-provider");
const p2p_1 = require("../../src/p2p");
const p2p_webrtc_1 = require("../../src/p2p-webrtc");
const trader_api_1 = require("../../src/client-api/trader-api");
const api_1 = require("../../src/api");
(async () => {
    await global.initWebapp;
    console.log("Start...");
    const isComposite = (process.argv[4] ?? "non-composite") === "composite";
    (0, p2p_1.startP2P)(global.cfg, await (0, p2p_webrtc_1.browserPeerAPI)());
    window.address = "tb1p0l5zsw2lv9pu99dwzckjxhpufdvvylapl5spn6yd54vhnwa989hq20cvyv";
    window.pubkey = "7fe828395f6143c295ae162d235c3c4b58c27fa1fd2019e88da55979bba5396e";
    window.txfee = 2000;
    window.traderApi = (0, trader_api_1.traderApi)(webcfg_1.cfg.trader, webcfg_1.cfg, api_1.api, window.storage, p2p_1.p2pNode);
    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": transactions_1.btcDlcContractInterpreter
    }, oracle_data_provider_1.dataProvider), 1000);
    const preferences = {
        minOraclePow: 0,
        minOracleReputation: 0,
        tags: ["world"],
        txfee: 0
    };
    window.matching.collectQuestions(preferences);
    window.matching.collectOffers(preferences);
    let i = 0;
    try {
        const offer = await (new Promise((resolve, reject) => {
            const cancel = setInterval(async () => {
                i++;
                if (i > 20) {
                    clearInterval(cancel);
                    reject("OFFER DID NOT MATCH!");
                }
                else {
                    const candidate = await window.matching.pickOffer(preferences);
                    //console.log(candidate)
                    if (candidate.bet[1] === 2053) {
                        resolve(candidate);
                    }
                }
            }, 500);
        }));
        await window.matching.acceptOffer(offer);
    }
    catch (msg) {
        console.log(msg);
        process.exit(255);
    }
    setInterval(async () => {
        const orders = await window.matching.listOrders(100);
        const txReady = orders.filter(o => (o.status === "redeemed" && o.bet[1] === 2053) || (o.status === "redeemed" && isComposite && o.bet[1] === 3000)).length > (isComposite ? 1 : 0);
        console.error(await window.matching.listOrders(100));
        if (txReady) {
            console.error(await window.matching.listOrders(100));
            console.error("OK");
            console.log("OK");
            process.exit(0);
        }
    }, 3000);
    setTimeout(async () => {
        console.error("TX NOT GENERATED!");
        process.exit(255);
    }, 200000);
})();
//# sourceMappingURL=webtest-acceptor.js.map
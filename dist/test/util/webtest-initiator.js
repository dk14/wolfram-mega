"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webcfg_1 = require("../../webcfg");
webcfg_1.cfg.p2pseed = [];
webcfg_1.cfg.p2pseed[0] = { server: process.argv[3] ?? "acceptor-peer", port: 0 };
webcfg_1.cfg.hostname = process.argv[2] ?? "initiator-peer2";
const configure_1 = require("./configure");
configure_1.configure;
const transactions_1 = require("../../src-web/transactions");
const oracle_data_provider_1 = require("../../src-web/oracle-data-provider");
const p2p_1 = require("../../src/p2p");
const p2p_webrtc_1 = require("../../src/p2p-webrtc");
const trader_api_1 = require("../../src/client-api/trader-api");
const api_1 = require("../../src/api");
const dsl_1 = require("../../src-web/dsl");
(async () => {
    await global.initWebapp;
    console.log("Start...");
    (0, p2p_1.startP2P)(global.cfg, await (0, p2p_webrtc_1.browserPeerAPI)());
    window.address = "tb1pudlyenkk7426rvsx84j97qddf4tuc8l63suz62xeq4s6j3wmuylq0j54ex"; //e37 pub
    window.pubkey = "e37e4cced6f555a1b2063d645f01ad4d57cc1ffa8c382d28d90561a945dbe13e";
    window.txfee = 2000;
    const isComposite = (process.argv[4] ?? "non-composite") === "composite";
    window.traderApi = (0, trader_api_1.traderApi)(webcfg_1.cfg.trader, webcfg_1.cfg, api_1.api, window.storage, p2p_1.p2pNode);
    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": transactions_1.btcDlcContractInterpreter
    }, oracle_data_provider_1.dataProvider), 1000);
    const preferences = {
        minOracleRank: 0,
        tags: ["world"],
        txfee: 0
    };
    window.matching.collectQuestions(preferences);
    window.matching.collectOffers(preferences);
    const oracles = await window.storage.queryCapabilities({ where: async (x) => x.tags[0] === 'world' }, {
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
        bet: [4000, 2053],
        oracles: [oracle],
        question: '?',
        status: 'matching',
        blockchain: 'bitcoin-testnet',
        role: 'initiator'
    };
    const myCompositeOffer = await (new dsl_1.Dsl(async (dsl) => {
        const a = 60;
        if (dsl.outcome(oracles[0].capabilityPubKey, ["YES"], ["NO"])) {
            dsl.pay(dsl_1.Dsl.Bob, 4000);
            if (dsl.outcome(oracles[1].capabilityPubKey, ["YES"], ["NO"])) {
                dsl.pay(dsl_1.Dsl.Alice, 3000);
            }
            else {
                dsl.pay(dsl_1.Dsl.Bob, 3000);
            }
        }
        else {
            dsl.pay(dsl_1.Dsl.Alice, 2053);
        }
    })).enumerateWithBound(140000);
    await window.matching.broadcastOffer(isComposite ? myCompositeOffer : myCustomOffer);
    setInterval(async () => {
        const orders = await window.matching.listOrders(100);
        const txReady = orders.filter(o => o.status === "redeemed" && (o.bet[1] === 2053 || (isComposite && o.bet[1] === 3000))).length > (isComposite ? 1 : 0);
        if (txReady) {
            console.error(await window.matching.listOrders(100));
            console.error("OK");
            console.log("OK");
            process.exit(0);
        }
    }, 1000);
    setTimeout(async () => {
        console.error("TX NOT GENERATED!");
        process.exit(255);
    }, 200000);
})();
//# sourceMappingURL=webtest-initiator.js.map
import "fake-indexeddb/auto";
import fs from "fs"

import { JSDOM } from 'jsdom';
const webpage = fs.readFileSync(__dirname + "/../../webapp/index.html").toString("utf-8")
const jsdom = new JSDOM(webpage, { runScripts: "dangerously" });
global.window = (jsdom.window as unknown as Window & typeof globalThis);
global.document = window.document;
global.localStorage = undefined

import fetchMock from 'fetch-mock';
import { btcDlcContractInterpreter } from "../../src-web/transactions";
import { PreferenceModel, CapabilityModel, OfferModel, MatchingEngine } from "../../src-web/matching";
import { dataProvider } from "../../src-web/oracle-data-provider";
import assert from "assert";
fetchMock.config.allowRelativeUrls = true
fetchMock.mockGlobal().route("./../../wolfram-mega-spec.yaml", "data");

require("../../webapp");

(async () => {
    await global.initWebapp
    console.log("\n")
    console.log("Start Initiator")
    console.log("\n")
    console.log("----------")

    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": btcDlcContractInterpreter
    }, dataProvider), 10)
        
    const preferences: PreferenceModel = {
        minOraclePow: 0,
        minOracleReputation: 0,
        tags: [],
        txfee: 0
    }
    
    window.matching.collectQuestions(preferences)
    window.matching.collectOffers(preferences)

    const oracles = await window.storage.queryCapabilities({where: async x => true}, {
        page: 0,
        chunkSize: 100
    })

    const oracle: CapabilityModel = {
        capabilityPub: oracles[0].capabilityPubKey,
        oracle: '',
        endpoint: ''
    }
    const myCustomOffer: OfferModel = {
        id: 'id',
        bet: [1, 30345],
        oracles: [oracle],
        question: '?',
        status: 'matching',
        blockchain: 'bitcoin-testnet',
        role: 'initiator'
    }

    await window.matching.broadcastOffer(myCustomOffer)

    setInterval(async () => {
        const orders = await window.matching.listOrders({page: 0, chunkSize: 100})
        const txReady = orders.filter(o => o.status === "opening tx available" && o.bet[1] === 30345).length > 0
        if (txReady) {
            console.log("OK")
            process.exit(0)
        }
    }, 1000)

})()



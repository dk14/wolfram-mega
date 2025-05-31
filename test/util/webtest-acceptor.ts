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

    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": btcDlcContractInterpreter
    }, dataProvider), 10)
        
    const preferences: PreferenceModel = {
        minOraclePow: 0,
        minOracleReputation: 0,
        tags: [],
        txfee: 0
    }
    
    console.log("- start collectors")
    window.matching.collectQuestions(preferences)
    window.matching.collectOffers(preferences)

    const oracles = await window.storage.queryCapabilities({where: async x => true}, {
        page: 0,
        chunkSize: 100
    })

    let offer: OfferModel = undefined
    let i = 0
    while (offer === undefined && i < 30) {
        i++
        const candidate = await window.matching.pickOffer()
        if (candidate.bet[1] === 30345){
            offer = candidate
        }
    }

    await window.matching.acceptOffer(offer)
   
    setInterval(async () => {
        const orders = await window.matching.listOrders({page: 0, chunkSize: 100})
        const txReady = orders.filter(o => o.status === "opening tx available" && o.bet[1] === 30345).length > 0
        if (txReady) {
            console.log("OK")
            process.exit(0)
        }
    }, 1000)




})()



import "fake-indexeddb/auto";

const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = (jsdom.window as Window & typeof globalThis);
global.document = window.document;
global.localStorage = undefined

import fetchMock from 'fetch-mock';
import { btcDlcContractInterpreter } from "../src-web/transactions";
import { PreferenceModel, CapabilityModel, OfferModel, MatchingEngine } from "../src-web/matching";
import { dataProvider } from "../src-web/oracle-data-provider";
fetchMock.config.allowRelativeUrls = true
fetchMock.mockGlobal().route("./../wolfram-mega-spec.yaml", "data");

require("../webapp");


(async () => {
    await global.initWebapp
    console.log("\n")
    console.log("MATCHING TEST")

    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": btcDlcContractInterpreter
    }, dataProvider), 1000)
        
    const preferences: PreferenceModel = {
        minOraclePow: 0,
        minOracleReputation: 0,
        tags: [],
        txfee: 0
    }
    
    console.log("- start collectors")
    window.matching.collectQuestions(preferences)
    window.matching.collectOffers(preferences)

    console.log("- pick offer")

    const offer = await window.matching.pickOffer()

    console.log("- accept selected offer")
    await window.matching.acceptOffer(offer)

    console.log("- generate random offer")
    const myOffer = await window.matching.generateOffer(preferences)

    console.log("- broadcast generated offer")
    await window.matching.broadcastOffer(myOffer)

    console.log("- create and broadcast custom offer")
    // custom offer
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
        bet: [1, 100],
        oracles: [oracle],
        question: '?',
        status: 'matching',
        blockchain: 'bitcoin-testnet',
        role: 'initiator'
    }

    await window.matching.broadcastOffer(myCustomOffer)
    console.log("OK!")
    process.exit(0)


})()



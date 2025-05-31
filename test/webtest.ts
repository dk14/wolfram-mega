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
    console.log("TEST")
    await global.initWebapp

    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": btcDlcContractInterpreter
    }, dataProvider), 1000)
        
    const preferences: PreferenceModel = {
        minOraclePow: 0,
        minOracleReputation: 0,
        tags: [],
        txfee: 0
    }
    
    window.matching.collectQuestions(preferences)
    window.matching.collectOffers(preferences)
    await window.matching.broadcastOffer(await window.matching.generateOffer(preferences))

    const offer = await window.matching.pickOffer()

    await window.matching.acceptOffer(offer)

    const myOffer = await window.matching.generateOffer(preferences)
    await window.matching.broadcastOffer(myOffer)

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



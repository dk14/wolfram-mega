import { configure } from "./util/configure";
configure
global.isUnitTestTest = true

import { btcDlcContractInterpreter } from "../src-web/transactions";
import { PreferenceModel, CapabilityModel, OfferModel, MatchingEngine } from "../src-web/matching";
import { dataProvider } from "../src-web/oracle-data-provider";
import assert from "assert";
import { startP2P } from "../src/p2p";
import { browserPeerAPI } from "../src/p2p-webrtc";

require("../webapp");


(async () => {
    await global.initWebapp
    console.log("\n")
    console.log("MATCHING TEST")

    //startP2P(global.cfg, await browserPeerAPI())

    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": btcDlcContractInterpreter
    }, dataProvider), 1000)
        
    const preferences: PreferenceModel = {
        minOracleRank: 0,
        tags: [],
        txfee: 0
    }
    
    console.log("- start collectors")
    window.matching.collectQuestions(preferences)
    window.matching.collectOffers(preferences)

    console.log("- pick offer")

    const offer = await window.matching.pickOffer(preferences)

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

    console.log("\n")
    console.log("WEBPAGE TEST")

    console.log("- model: data is present")
    assert.ok(window["model"])
    assert.ok(window["model"].contracts)
    assert.ok(window["model"].contracts[0])

    console.log("- view: UI elements are present")
    assert.strictEqual(document.getElementById("matching").className, "scrollable")
    assert.strictEqual(document.getElementById("profile").className, "scrollable profile")

    console.log("- controller: fetch or generate offers")

    const pickedOffer = await window["pickOrGenerateOffer"](true)
    assert.ok(pickedOffer)
    const generatedOffer = await window["pickOrGenerateOffer"](false)
    assert.ok(generatedOffer)

    console.log("\n")
    console.log("OK!")
    process.exit(0)


})()



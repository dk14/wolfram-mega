global.isUnitTestTest = true
import { configure } from "./util/configure";
configure


import { btcDlcContractInterpreter } from "../src-web/transactions";
import { PreferenceModel, CapabilityModel, OfferModel } from "../src-web/models";
import { dataProvider } from "../src-web/oracle-data-provider";
import assert from "assert";
import { startP2P } from "../src/p2p";
import { browserPeerAPI } from "../src/p2p-webrtc";
import { pub1 } from "../webcfg";
import { p2pktr } from "../src/client-api/contracts/btc/tx";

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

    await global.initWebapp

    console.log("\n")
    console.log("SETUP TEST")
    console.log("- user pubkey is selected") 
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('user'); //see configure.ts
    assert.equal(param, "alice") 
    assert.equal("alice", window.user) 
    assert.equal(pub1, window.pubkey)
    assert.equal(p2pktr(pub1).address, window.address)

    console.log("- profile created")
    


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
    


    console.log("- view: UI elements are present")

    await initView

    assert.strictEqual(document.getElementById("matching").className, "scrollable")
    assert.strictEqual(document.getElementById("profile").className, "scrollable profile")

    console.log("- model: data is present")

    await initModel

    assert.ok(window["model"])
    assert.ok(window["model"].contracts)

 
    console.log("- controller: fetch or generate offers")
    await initController

    const pickedOffer = await window["pickOrGenerateOffer"](true)
    assert.ok(pickedOffer)
    const generatedOffer = await window["pickOrGenerateOffer"](false)
    assert.ok(generatedOffer)

    console.log("\n")
    console.log("OK!")
    process.exit(0)


})()



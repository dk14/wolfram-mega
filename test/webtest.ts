import "fake-indexeddb/auto";
import fs from "fs"

global.isTest = true

import { JSDOM } from 'jsdom';
const webpage = fs.readFileSync(__dirname + "/../webapp/index.html").toString("utf-8")
const jsdom = new JSDOM(webpage, { runScripts: "dangerously" });
global.window = (jsdom.window as unknown as Window & typeof globalThis);
global.document = window.document;
global.localStorage = undefined

import fetchMock from 'fetch-mock';
import { btcDlcContractInterpreter } from "../src-web/transactions";
import { PreferenceModel, CapabilityModel, OfferModel, MatchingEngine } from "../src-web/matching";
import { dataProvider } from "../src-web/oracle-data-provider";
import assert from "assert";
import { startP2P } from "../src/p2p";
import { browserPeerAPI } from "../src/p2p-webrtc";
fetchMock.config.allowRelativeUrls = true
fetchMock.mockGlobal().route("./../wolfram-mega-spec.yaml", "data");

import wrtc from '@roamhq/wrtc';
RTCPeerConnection = wrtc.RTCPeerConnection;
RTCIceCandidate = wrtc.RTCIceCandidate;
RTCSessionDescription = wrtc.RTCSessionDescription;

window.fetch = require('node-fetch');
window.WebSocket = require('ws');
window.FileReader = require('filereader');

Blob = require('node-blob');
const blobToArraybuffer = require('blob-to-arraybuffer');
Blob.prototype.arrayBuffer = function() {
    return blobToArraybuffer(this);
}

require("../webapp");


(async () => {
    await global.initWebapp
    console.log("\n")
    console.log("MATCHING TEST")

    startP2P(global.cfg, browserPeerAPI())

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



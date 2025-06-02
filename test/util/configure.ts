import "fake-indexeddb/auto";
import fs from "fs"
global.isTest = true

import { JSDOM } from 'jsdom';
const webpage = fs.readFileSync("webapp/index.html").toString("utf-8")
const jsdom = new JSDOM(webpage, { runScripts: "dangerously" });
global.window = (jsdom.window as unknown as Window & typeof globalThis);
global.document = window.document;
global.localStorage = undefined

import fetchMock from 'fetch-mock';


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

const data = fs.readFileSync("wolfram-mega-spec.yaml").toString("utf-8")


fetchMock.config.allowRelativeUrls = true
fetchMock.mockGlobal().route("./../wolfram-mega-spec.yaml", data)


const mockUtxo1 = [{"txid":"4f206f6510b4be3a10fde4ab8dd02ee8300bd96e60e7d4a1f15f77196c067410","vout":1,"status":{"confirmed":true,"block_height":4357410,"block_hash":"0000000000002928af4c71a5a46d7f612e17b063a05505a5cc3b52c91136c9ff","block_time":1747188354},"value":4000},{"txid":"d816a61c588840463fb8b59eee2cae55c53b5e7d680315aba65d5138225ac710","vout":0,"status":{"confirmed":true,"block_height":4360709,"block_hash":"000000000000032c6cd44d27148a9dc0741e626cfe7953731cb89ac98cfd8d9f","block_time":1747227043},"value":3000},{"txid":"4e06cc881ff74f2e14b1fad1ae6c77ab5487441af5dab49ebe07430eb3baa62b","vout":1,"status":{"confirmed":true,"block_height":4360701,"block_hash":"00000000000003955b53b593970a3ce96772a591dec2eb89393f3ac5200c90c9","block_time":1747225853},"value":188347}]
const mockUtxo2 = [{"txid":"d816a61c588840463fb8b59eee2cae55c53b5e7d680315aba65d5138225ac710","vout":0,"status":{"confirmed":true,"block_height":4360709,"block_hash":"000000000000032c6cd44d27148a9dc0741e626cfe7953731cb89ac98cfd8d9f","block_time":1747227043},"value":3000},{"txid":"4f206f6510b4be3a10fde4ab8dd02ee8300bd96e60e7d4a1f15f77196c067410","vout":1,"status":{"confirmed":true,"block_height":4357410,"block_hash":"0000000000002928af4c71a5a46d7f612e17b063a05505a5cc3b52c91136c9ff","block_time":1747188354},"value":4000},{"txid":"4e06cc881ff74f2e14b1fad1ae6c77ab5487441af5dab49ebe07430eb3baa62b","vout":1,"status":{"confirmed":true,"block_height":4360701,"block_hash":"00000000000003955b53b593970a3ce96772a591dec2eb89393f3ac5200c90c9","block_time":1747225853},"value":188347}]


fetchMock.mockGlobal().route("https://mempool.space/testnet/api/address/tb1pudlyenkk7426rvsx84j97qddf4tuc8l63suz62xeq4s6j3wmuylq0j54ex/utxo", JSON.stringify(mockUtxo1))
fetchMock.mockGlobal().route("https://mempool.space/testnet/api/address/tb1p0l5zsw2lv9pu99dwzckjxhpufdvvylapl5spn6yd54vhnwa989hq20cvyv/utxo", JSON.stringify(mockUtxo2))



require('./../../webapp');

(async () => {
    await global.initWebapp

    global.cfg.webrtcPeerServer = {
        host: "localhost",
        port: 9009,
        path: "/",
        pingInterval: 500
    }
})

export const configure = true

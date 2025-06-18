"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
require("fake-indexeddb/auto");
const fs_1 = __importDefault(require("fs"));
global.isTest = true;
const jsdom_1 = require("jsdom");
const baseUrl = 'https://dk14.github.io/wolfram-mega/webapp/';
const queryParams = {
    user: 'alice'
};
// Construct the URL with query parameters
const urlWithParams = new URL(baseUrl);
for (const key in queryParams) {
    urlWithParams.searchParams.append(key, queryParams[key]);
}
const webpage = process.argv[2] === "unit" ? fs_1.default.readFileSync("webapp/index.html").toString("utf-8") : "<html></html>";
const jsdom = new jsdom_1.JSDOM(webpage, { url: urlWithParams.toString(), resources: "usable", runScripts: "dangerously" });
const fetchPkg = 'node_modules/whatwg-fetch/dist/fetch.umd.js';
jsdom.window.eval(fs_1.default.readFileSync(fetchPkg, 'utf-8'));
global.window = jsdom.window;
global.document = window.document;
global.localStorage = undefined;
const fetch_mock_1 = __importDefault(require("fetch-mock"));
const wrtc_1 = __importDefault(require("@roamhq/wrtc"));
const api_1 = require("../../src/api");
const webcfg_1 = require("../../webcfg");
RTCPeerConnection = wrtc_1.default.RTCPeerConnection;
RTCIceCandidate = wrtc_1.default.RTCIceCandidate;
RTCSessionDescription = wrtc_1.default.RTCSessionDescription;
window.fetch = require('node-fetch');
window.WebSocket = require('ws');
window.FileReader = require('filereader');
Blob = require('node-blob');
const blobToArraybuffer = require('blob-to-arraybuffer');
Blob.prototype.arrayBuffer = function () {
    return blobToArraybuffer(this);
};
const data = fs_1.default.readFileSync("wolfram-mega-spec.yaml").toString("utf-8");
fetch_mock_1.default.config.allowRelativeUrls = true;
fetch_mock_1.default.mockGlobal().route("./../wolfram-mega-spec.yaml", data);
const mockUtxo1 = [{ "txid": "4f206f6510b4be3a10fde4ab8dd02ee8300bd96e60e7d4a1f15f77196c067410", "vout": 1, "status": { "confirmed": true, "block_height": 4357410, "block_hash": "0000000000002928af4c71a5a46d7f612e17b063a05505a5cc3b52c91136c9ff", "block_time": 1747188354 }, "value": 4000 }, { "txid": "d816a61c588840463fb8b59eee2cae55c53b5e7d680315aba65d5138225ac710", "vout": 0, "status": { "confirmed": true, "block_height": 4360709, "block_hash": "000000000000032c6cd44d27148a9dc0741e626cfe7953731cb89ac98cfd8d9f", "block_time": 1747227043 }, "value": 3000 }, { "txid": "4e06cc881ff74f2e14b1fad1ae6c77ab5487441af5dab49ebe07430eb3baa62b", "vout": 1, "status": { "confirmed": true, "block_height": 4360701, "block_hash": "00000000000003955b53b593970a3ce96772a591dec2eb89393f3ac5200c90c9", "block_time": 1747225853 }, "value": 188347 }];
const mockUtxo2 = [{ "txid": "d816a61c588840463fb8b59eee2cae55c53b5e7d680315aba65d5138225ac710", "vout": 0, "status": { "confirmed": true, "block_height": 4360709, "block_hash": "000000000000032c6cd44d27148a9dc0741e626cfe7953731cb89ac98cfd8d9f", "block_time": 1747227043 }, "value": 3000 }, { "txid": "4f206f6510b4be3a10fde4ab8dd02ee8300bd96e60e7d4a1f15f77196c067410", "vout": 1, "status": { "confirmed": true, "block_height": 4357410, "block_hash": "0000000000002928af4c71a5a46d7f612e17b063a05505a5cc3b52c91136c9ff", "block_time": 1747188354 }, "value": 4000 }, { "txid": "4e06cc881ff74f2e14b1fad1ae6c77ab5487441af5dab49ebe07430eb3baa62b", "vout": 2, "status": { "confirmed": true, "block_height": 4360701, "block_hash": "00000000000003955b53b593970a3ce96772a591dec2eb89393f3ac5200c90c9", "block_time": 1747225853 }, "value": 188347 }];
fetch_mock_1.default.mockGlobal().route("https://mempool.space/testnet/api/address/tb1pudlyenkk7426rvsx84j97qddf4tuc8l63suz62xeq4s6j3wmuylq0j54ex/utxo", JSON.stringify(mockUtxo1));
fetch_mock_1.default.mockGlobal().route("https://mempool.space/testnet/api/address/tb1p0l5zsw2lv9pu99dwzckjxhpufdvvylapl5spn6yd54vhnwa989hq20cvyv/utxo", JSON.stringify(mockUtxo2));
require('./../../webapp');
const promise = new Promise(async (resolve) => {
    await global.initWebapp;
    /**
    global.cfg.webrtcPeerServer = {
        host: "localhost",
        port: 9000,
        path: "/hello",
        pingInterval: 1000
    }
    */
    await api_1.api.publishOffer(global.cfg, webcfg_1.testOfferMsg);
    await window.storage.addOffer(webcfg_1.testOfferMsg);
    global.initWebapp = promise;
    resolve(null);
});
exports.configure = true;
//# sourceMappingURL=configure.js.map
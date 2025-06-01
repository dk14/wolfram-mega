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
fetchMock.mockGlobal().route("./../wolfram-mega-spec.yaml", data);

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

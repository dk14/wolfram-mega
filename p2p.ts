import * as node from './node';
import * as net from 'net';

const Peer = require('p2p-node').Peer

const onmessage = (ev) => {
    console.log("I got message "+ev.command);
    //commands: peer, oracle, capability, report, dispute
}

const onconnect = (ev) => {
    console.log("I'm connected!" + ev.peer);
}

const discoverPeerSeed = (): string[] => {
    return [""]
}

var discovered = discoverPeerSeed().map(addr => {
    const p = new Peer(addr);
    p.connect()
    p.onmessage(onmessage)
    p.onconnect(onconnect)
    return p
})

const server = net.createServer(function(socket) {
    const p = new Peer(socket.remoteAddress, socket.remotePort);
    p.connect(socket);
    p.onmessage(onmessage)
    p.onconnect(onconnect)
    discovered.push(p)
});






"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.startP2P = exports.p2pNode = void 0;
const nd = __importStar(require("./node"));
const net = __importStar(require("net"));
const p2p_node_1 = require("p2p-node");
exports.p2pNode = undefined;
const startP2P = (cfg) => {
    var connections = 0;
    const onmessage = (ev) => {
        try {
            node.processApiRequest(ev.command, ev.data.toString('utf8'));
        }
        catch (err) {
            console.error(err);
        }
    };
    const onconnect = (ev) => {
        connections++;
        const p = peers.find(x => ev.peer === x.peer);
        console.log("I'm connected! " + p.addr.server + ":" + p.addr.port);
        if (cfg.hostname !== undefined) {
            broadcastPeer({ server: cfg.hostname, port: cfg.p2pPort, seqNo: cfg.hostSeqNo ?? 0 }, true);
        }
        peers.forEach(peer => {
            console.log("[send][peer]" + JSON.stringify(peer.addr) + "  ==> " + JSON.stringify(p.addr));
            p.peer.send('peer', Buffer.from(JSON.stringify(peer.addr), 'utf8'));
        });
        if (checkDuplicatePeer(p.addr)) {
            return;
        }
        broadcastPeer(p.addr);
    };
    const peers = [];
    const ondisconnect = (ev) => {
        connections--;
        const index = peers.findIndex((x => ev.peer.server === x.peer.server && ev.peer.port === x.peer.port));
        if (index > -1) {
            peers.splice(index, 1);
        }
    };
    cfg.p2pseed.forEach(x => discovered(x));
    function checkDuplicatePeer(addr) {
        const found = peers.findIndex(x => addr.server === x.addr.server && addr.port === x.addr.port);
        if (found > -1) {
            if ((peers[found].addr.seqNo ?? 0) < (addr.seqNo ?? 0)) {
                peers[found].addr.seqNo = addr.seqNo;
                console.log("[rebroadcast peer]" + JSON.stringify(addr));
                broadcastPeer(addr, true);
            }
            console.log("[ignore duplicate peer]" + JSON.stringify(addr));
            return true;
        }
        else {
            return false;
        }
    }
    function broadcastPeer(peer, skipDuplicateCheck = false) {
        if (!skipDuplicateCheck && checkDuplicatePeer(peer)) {
            return;
        }
        console.log("Discovered: " + peer.server + ":" + peer.port);
        console.log(peers.map(p => p.addr));
        peers.forEach(p => {
            console.log("[send][peer]" + JSON.stringify(peer) + "  ==> " + JSON.stringify(p.addr));
            p.peer.send('peer', Buffer.from(JSON.stringify(peer), 'utf8'));
        });
    }
    function discovered(addr, socket) {
        if (checkDuplicatePeer(addr)) {
            return;
        }
        if (connections > cfg.maxConnections) {
            return;
        }
        try {
            const p = new p2p_node_1.Peer(addr.server, addr.port);
            p.connect(socket);
            p.on('message', onmessage);
            p.on('connect', onconnect);
            p.on('end', ondisconnect);
            if (socket === undefined) {
                peers.push({ peer: p, addr: addr });
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    function reduceCTTL(content) {
        const msg = JSON.parse(content);
        if (msg.cTTL <= 0) {
            return [JSON.stringify(msg), false];
        }
        else {
            msg.cTTL--;
            return [JSON.stringify(msg), true];
        }
    }
    async function processApiRequest(command, content) {
        console.log("[receive][cmd: " + command + "] " + content);
        switch (command) {
            case 'peer': {
                discovered(JSON.parse(content));
                break;
            }
            case 'oracle': {
                const result = await nd.api.announceOracle(cfg, JSON.parse(content));
                if (result == 'success') {
                    broadcastMessage(command, content);
                }
                else if (result == 'duplicate') {
                    const [adjusted, toBroadcast] = reduceCTTL(content);
                    if (toBroadcast) {
                        broadcastMessage(command, adjusted);
                    }
                }
                break;
            }
            case 'capability': {
                const result = await nd.api.announceCapability(cfg, JSON.parse(content));
                if (result == 'success') {
                    broadcastMessage(command, content);
                }
                else if (result == 'duplicate') {
                    const [adjusted, toBroadcast] = reduceCTTL(content);
                    if (toBroadcast) {
                        broadcastMessage(command, adjusted);
                    }
                }
                break;
            }
            case 'report': {
                const result = await nd.api.reportMalleability(cfg, JSON.parse(content));
                if (result == 'success') {
                    broadcastMessage(command, content);
                }
                else if (result == 'duplicate') {
                    const [adjusted, toBroadcast] = reduceCTTL(content);
                    if (toBroadcast) {
                        broadcastMessage(command, adjusted);
                    }
                }
                break;
            }
            case 'dispute': {
                const result = await nd.api.disputeMissingfactClaim(JSON.parse(content));
                if (result == 'success') {
                    broadcastMessage(command, content);
                }
                else if (result == 'duplicate' || result == "report not found") {
                    const [adjusted, toBroadcast] = reduceCTTL(content);
                    if (toBroadcast) {
                        broadcastMessage(command, adjusted);
                    }
                }
                break;
            }
            case 'offer': {
                const result = await nd.api.publishOffer(cfg, JSON.parse(content));
                if (result == 'success') {
                    broadcastMessage(command, content);
                }
                else if (result == 'duplicate') {
                    const [adjusted, toBroadcast] = reduceCTTL(content);
                    if (toBroadcast) {
                        broadcastMessage(command, adjusted);
                    }
                }
                break;
            }
        }
    }
    function broadcastMessage(command, content) {
        peers.forEach(p => {
            console.log("[send][cmd: " + command + "] " + content + " ===> " + JSON.stringify(p.addr));
            p.peer.send(command, Buffer.from(content, 'utf8'));
        });
    }
    const node = {
        peers, discovered, broadcastPeer, processApiRequest, broadcastMessage
    };
    const server = net.createServer(function (socket) {
        console.log("Remote connection");
        discovered({ server: socket.remoteAddress, port: socket.remotePort, seqNo: 0 }, socket);
    });
    server.listen(cfg.p2pPort, cfg.hostname);
    exports.p2pNode = node;
    var seqNo = 0;
    setInterval(() => {
        if (cfg.hostname !== undefined) {
            seqNo++;
            broadcastPeer({ server: cfg.hostname, port: cfg.p2pPort, seqNo: (cfg.hostSeqNo ?? 0) + seqNo }, true);
        }
    }, (cfg.p2pKeepAlive ?? 100000));
};
exports.startP2P = startP2P;
//# sourceMappingURL=p2p.js.map
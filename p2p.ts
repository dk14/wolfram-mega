import * as nd from './node';
import * as net from 'net';
import { Socket } from 'net';
import {Peer} from 'p2p-node'

interface PeerAddr {
    server: string,
    port: number,
    seqNo?: number
} 

interface Neighbor {
    peer: Peer
    addr: PeerAddr
}

export var p2pNode: nd.FacilitatorNode<Neighbor> | undefined = undefined

export const startP2P = (cfg: nd.MempoolConfig<PeerAddr>) => {

    var connections = 0
    const onmessage = (ev) => {
        console.log("I got message "+ev.command);
        try {
            node.processApiRequest(ev.command, ev.data.toString('utf8'))
        } catch (err) {
            console.error(err)
        }
    }
    
    const onconnect = (ev) => {
        connections++
        const p = peers.find(x => ev.peer === x.peer)!
        console.log("I'm connected! " + p.addr.server + ":" + p.addr.port);

        if (checkDuplicatePeer(p.addr)) {
            return
        }
        broadcastPeer(p.addr)

        if (cfg.hostname !== undefined) {
            broadcastPeer({server: cfg.hostname, port: cfg.p2pPort, seqNo: cfg.hostSeqNo ?? 0})
        }
        
    }

    const peers: Neighbor[] = []

    const ondisconnect = (ev) => {
        connections--
        const index = peers.findIndex((x => ev.peer.server === x.peer.server && ev.peer.port === x.peer.port))
        if (index > -1) {
            peers.splice(index, 1);
        }
    }
    
    cfg.p2pseed.forEach(x => discovered(x))

    function checkDuplicatePeer(addr: PeerAddr): boolean {
        const found = peers.findIndex(x => addr.server === x.addr.server && addr.port === x.addr.port)
        if (found > -1) {
            if ((peers[found].addr.seqNo ?? 0) < (addr.seqNo ?? 0)) {
                peers[found].addr.seqNo = addr.seqNo
                console.log("[rebroadcast peer]" + JSON.stringify(addr))
                broadcastPeer(addr)
            }
            console.log("[ignore duplicate peer]" + JSON.stringify(addr))
            return true
        } else {
            return false
        }
    }

    function broadcastPeer(peer: PeerAddr): void {
        if (checkDuplicatePeer(peer)) {
            return
        }
        console.log("Discovered: " + peer.server + ":" + peer.port);
        console.log(peers.map(p => p.addr))
        peers.forEach(p => {
            console.log("[send][peer]" + JSON.stringify(peer) + "  ==> " + JSON.stringify(p.addr))
            p.peer.send('peer', Buffer.from(JSON.stringify(peer), 'utf8'))
        });
    }

    function discovered(addr: PeerAddr, socket?: Socket): void {
        if (checkDuplicatePeer(addr)) {
            return
        }
        if (connections > cfg.maxConnections) {
            return
        }
        try {
            const p = new Peer(addr.server, addr.port)
            
            p.connect(socket)
            
            p.on('message', onmessage)
            p.on('connect', onconnect)
            p.on('end', ondisconnect)

            peers.push({peer : p, addr: addr})

            
        } catch (err) {
            console.error(err)
        }
    }



    async function processApiRequest(command: string, content: string): Promise<void> {
        //commands: peer, oracle, capability, report, dispute
        console.log("[receive][cmd: " + command + "] " + content)
        switch(command) {
            case 'peer': { 
                discovered(JSON.parse(content))
                break; 
            } 
            case 'oracle': {
                const result = await nd.api.announceOracle(JSON.parse(content))
                if (result == 'success' || result == 'lowbid') { //TODO is lowbid candidate for broadcast, would te message loop?
                    broadcastMessage(command, content) 
                } else {
                    //TODO reduce cTTL, if not zero - broadcast anyway
                }
                break;
            }
            case 'capability': {
                const result = await nd.api.announceCapability(JSON.parse(content))
                if (result == 'success') {
                    broadcastMessage(command, content)
                } else {
                    //TODO reduce cTTL, if not zero - broadcast anyway
                }
                break;
            }
            case 'report': {
                const result = await nd.api.reportMalleability(JSON.parse(content))
                if (result == 'success') {
                    broadcastMessage(command, content)
                } else {
                    //TODO reduce cTTL, if not zero - broadcast anyway
                }
                break;
            }
            case 'dispute': {
                const result = await nd.api.disputeMissingfactClaim(JSON.parse(content))
                if (result == 'success') {
                    broadcastMessage(command, content)
                } else {
                    //TODO reduce cTTL, if not zero - broadcast anyway
                }
                break;
            }


        }

    }
    function broadcastMessage(command: string, content: string): void {
        peers.forEach(p => {
            console.log("[send][cmd: " + command + "] " + content + " ===> " + JSON.stringify(p.addr))
            p.peer.send(command, Buffer.from(content, 'utf8'));
        });
    }

    const node: nd.FacilitatorNode<any> = {
        peers, discovered, broadcastPeer, processApiRequest, broadcastMessage
    }
    
    const server = net.createServer(function(socket) {
        console.log("Remote connection")
        discovered({server: socket.remoteAddress!, port: socket.remotePort!, seqNo: 0}, socket)
    });

    server.listen(cfg.p2pPort, cfg.hostname);
    
    p2pNode = node
    
}


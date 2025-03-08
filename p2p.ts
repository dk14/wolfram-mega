import * as nd from './node';
import * as net from 'net';
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
    }

    const peers: Neighbor[] = []

    const ondisconnect = (ev) => {
        connections--
        const index = peers.findIndex((x => ev.peer.server === x.peer.server && ev.peer.port === x.peer.port))
        if (index > -1) {
            peers.splice(index, 1);
        }
    }
    
    cfg.p2pseed.forEach(discovered)

    function broadcastPeer(peer: PeerAddr): void {
        peers.forEach(p => {
            p.peer.send('peer', Buffer.from(JSON.stringify(peer), 'utf8'));
        });
    }

    function discovered(peer: PeerAddr): void {
        const found = peers.findIndex(x => peer.server === x.peer.server && peer.port === x.peer.port)
        if (found > -1) {
            if ((peers[found].addr.seqNo ?? 0) < (peer.seqNo ?? 0)) {
                peers[found].addr.seqNo = peer.seqNo
                broadcastPeer(peer)
            }
            return
        }
        if (connections > cfg.maxConnections) {
            return
        }
        try {
            const p = new Peer(peer.server, peer.port)
            p.connect()
            p.on('message', onmessage)
            p.on('connect', onconnect)
            p.on('end', ondisconnect)
            broadcastPeer(peer)
            peers.push({peer : p, addr: peer})
        } catch (err) {
            console.error(err)
        }
    }



    async function processApiRequest(command: string, content: string): Promise<void> {
        //commands: peer, oracle, capability, report, dispute
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
            }
            case 'capability': {
                const result = await nd.api.announceOracle(JSON.parse(content))
                if (result == 'success') {
                    broadcastMessage(command, content)
                } else {
                    //TODO reduce cTTL, if not zero - broadcast anyway
                }
            }
            case 'report': {
                const result = await nd.api.reportMalleability(JSON.parse(content))
                if (result == 'success') {
                    broadcastMessage(command, content)
                } else {
                    //TODO reduce cTTL, if not zero - broadcast anyway
                }
            }
            case 'dispute': {
                const result = await nd.api.disputeMissingfactClaim(JSON.parse(content))
                if (result == 'success') {
                    broadcastMessage(command, content)
                } else {
                    //TODO reduce cTTL, if not zero - broadcast anyway
                }
            }


        }

    }
    function broadcastMessage(command: string, content: string): void {
        peers.forEach(p => {
            p.peer.send(command, Buffer.from(content, 'utf8'));
        });
    }

    const node: nd.FacilitatorNode<any> = {
        peers, discovered, broadcastPeer, processApiRequest, broadcastMessage
    }
    
    const server = net.createServer(function(socket) {
        discovered({server: socket.remoteAddress!, port: socket.remotePort!, seqNo: 0})
    });

    server.listen(cfg.p2pPort, cfg.hostname);

    if (cfg.hostname !== undefined) {
        broadcastPeer({server: cfg.hostname, port: cfg.p2pPort, seqNo: cfg.hostSeqNo ?? 0})
    }
    
    return node
    
}


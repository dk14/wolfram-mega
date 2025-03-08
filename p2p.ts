import * as nd from './node';
import * as net from 'net';
import {Peer} from 'p2p-node'

interface PeerAddr {
    server: string,
    port: number
}

export const startP2P = (cfg: nd.MempoolConfig<PeerAddr>) => {


    const onmessage = (ev) => {
        console.log("I got message "+ev.command);
        node.processApiRequest(ev.command, ev.data.toString('utf8'))
        
    }
    
    const onconnect = (ev) => {
        console.log("I'm connected!" + ev.peer);
    }



    const peers: Peer[] = []
    
    cfg.p2pseed.forEach(addr => discovered(addr))
    


    function broadcastPeer(peer: PeerAddr): void {
        peers.forEach(p => {
            p.send('peer', Buffer.from(JSON.stringify(peer), 'utf8'));
        });
    }

    function discovered(peer: PeerAddr): Peer {
        const p = new Peer(peer.server, peer.port);
        p.connect()
        p.on('message', onmessage)
        p.on('connect', onconnect)
        broadcastPeer(peer)
        peers.push(p)
    }



    async function processApiRequest(command: string, content: string): Promise<string> {
        //commands: peer, oracle, capability, report, dispute
        switch(command) {
            case 'peer': { 
                if (peers.find(x => x === content) === undefined && peers.length < 100) {
                    discovered(JSON.parse(content))
                }
                    
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
        throw new Error("Function not implemented.")
    }
    function broadcastMessage(command: string, content: string): void {
        peers.forEach(p => {
            p.send(command, Buffer.from(content, 'utf8'));
        });
    }

    const node: nd.FacilitatorNode<any> = {
        peers, discovered, broadcastPeer, processApiRequest, broadcastMessage
    }
    
    const server = net.createServer(function(socket) {
        discovered({server: socket.remoteAddress!, port: socket.remotePort!})
    });

    server.listen(cfg.p2pPort);

    
    
    //TODO remove disconnected peers

    return node
    
}


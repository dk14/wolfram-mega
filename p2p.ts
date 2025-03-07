import * as nd from './node';
import * as net from 'net';

const Peer = require('p2p-node').Peer

export const sttartP2P = () => {

    const onmessage = (ev) => {
        console.log("I got message "+ev.command);
        node.processApiRequest(ev.command, ev.data.toString('utf8'))
        
    }
    
    const onconnect = (ev) => {
        console.log("I'm connected!" + ev.peer);
    }
    
    const discoverPeerSeed = (): string[] => {
        return [""]
    }

    const node: nd.FacilitatorNode<any> = {
        peers: discoverPeerSeed().map(addr => {
            const p = new Peer(addr);
            p.connect()
            p.onmessage(onmessage)
            p.onconnect(onconnect)
            node.discovered(p)
            return p
        }),
        discovered: function (peer: string): void {
            node.broadcastPeer(peer)
        },
        broadcastPeer: function (peer: string): void {
            this.peers.array.forEach(p => {
                p.send('peer', Buffer.from(peer, 'utf8'));
            });
        },
        processApiRequest: async function (command: string, content: string): Promise<string> {
            //commands: peer, oracle, capability, report, dispute
            switch(command) {
                case 'peer': { 
                    if (node.peers.find(x => x === content) === undefined && node.peers.length < 100) {
                        node.peers.push(content)
                    }
                        
                    break; 
                } 
                case 'oracle': {
                    const result = await nd.api.announceOracle(JSON.parse(content))
                    if (result == 'success' || result == 'lowbid') { //TODO is lowbid candidate for broadcast, would te message loop?
                        node.broadcastMessage(command, content) 
                    } else {
                        //TODO reduce cTTL, if not zero - broadcast anyway
                    }
                }
                case 'capability': {
                    const result = await nd.api.announceOracle(JSON.parse(content))
                    if (result == 'success') {
                        node.broadcastMessage(command, content)
                    } else {
                        //TODO reduce cTTL, if not zero - broadcast anyway
                    }
                }
                case 'report': {
                    const result = await nd.api.reportMalleability(JSON.parse(content))
                    if (result == 'success') {
                        node.broadcastMessage(command, content)
                    } else {
                        //TODO reduce cTTL, if not zero - broadcast anyway
                    }
                }
                case 'dispute': {
                    const result = await nd.api.disputeMissingfactClaim(JSON.parse(content))
                    if (result == 'success') {
                        node.broadcastMessage(command, content)
                    } else {
                        //TODO reduce cTTL, if not zero - broadcast anyway
                    }
                }
    
            }
            throw new Error("Function not implemented.")
        },
        broadcastMessage: function (command: string, content: string): void {
            this.peers.array.forEach(p => {
                p.send(command, Buffer.from(content, 'utf8'));
            });
        }
    }
    
    const server = net.createServer(function(socket) {
        const p = new Peer(socket.remoteAddress, socket.remotePort);
        p.connect(socket);
        p.onmessage(onmessage)
        p.onconnect(onconnect)
        node.discovered(p)
        node.peers.push(p)
    });
    
    //TODO remove disconnected peers
    
}


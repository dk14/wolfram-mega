import * as nd from './node';
import * as mega from './protocol';
import * as net from 'net';
import * as p2pn from 'p2p-node'
import * as p2pjs from "peerjs";
import { MempoolConfig } from "./config"
import { ConnectionPool, ConnectionPoolCfg } from './client-api/connection-pool';
import fetch from 'node-fetch'


export type Socket = {
    remoteAddress?: string,
    remotePort?: number,
    dataConnection?: p2pjs.DataConnection
}

export interface Event {
    command?: string,
    data?: Buffer,
    peer?: Peer
}

export interface Peer {
    on: (ev: "message" | "connect" | "end", handler: (ev: Event) => void) => void
    send: (cmd: string, msg: Buffer) => void
    server: string
    port: number
    disconnect: () => void
    connect: (addr: Socket) => void
}

export interface PeerApi {
    createPeer: (server: string, port?: number, socket?: Socket) => Promise<Peer>
    createServer: (cfg: MempoolConfig<PeerAddr>, discovered: (addr: PeerAddr, socket?: Socket) => void) => void
}

export const serverPeerAPI: PeerApi = {
    createPeer: async (server: string, port?: number, socket?: Socket): Promise<Peer> => {
       return new p2pn.Peer(server, port)
    },
    createServer: (cfg: MempoolConfig<PeerAddr>, discovered: (addr: PeerAddr, socket?: Socket) => void): void => {
        const server = net.createServer(function(socket: Socket) {
            console.log("Remote connection")
            discovered({server: socket.remoteAddress!, port: socket.remotePort!, seqNo: 0}, socket)
        });
        server.listen(cfg.p2pPort, cfg.hostname);
    }

}

export interface PeerAddr {
    server: string,
    port?: number,
    seqNo?: number,
    httpPort?: number
} 

export interface Neighbor {
    peer: Peer
    addr: PeerAddr
}

export var p2pNode: nd.FacilitatorNode<Neighbor> | undefined = undefined

export var connectionPool: ConnectionPool<PeerAddr> | undefined = undefined

export const startP2P = async (cfg: MempoolConfig<PeerAddr>, peerApi = serverPeerAPI): Promise<nd.FacilitatorNode<Neighbor>> => {
    var peersAnnounced = 0

    var connections = 0
    const onmessage = (ev: Event) => {
        try {
            node.processApiRequest(ev.command, ev.data.toString('utf8'))
        } catch (err) {
            console.error(err)
        }
    }
    
    const onconnect = (ev: Event) => {
        connections++
        const p = peers.find(x => ev.peer === x.peer)!
        console.log("I'm connected! " + p.addr.server + ":" + p.addr.port);

        if (cfg.hostname !== undefined) {
            broadcastPeer({server: cfg.hostname, port: cfg.p2pPort, seqNo: cfg.hostSeqNo ?? 0}, true)
        }

        peers.forEach(peer => {
            console.log("[send][peer]" + JSON.stringify(peer.addr) + "  ==> " + JSON.stringify(p.addr))
            p.peer.send('peer', Buffer.from(JSON.stringify(peer.addr), 'utf8'))
        });

        if (checkDuplicatePeer(p.addr)) {
            return
        }
        broadcastPeer(p.addr)
        
    }

    const peers: Neighbor[] = []

    const ondisconnect = (ev: Event) => {
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
                broadcastPeer(addr, true)
            }
            console.log("[ignore duplicate peer]" + JSON.stringify(addr))
            return true
        } else {
            return false
        }
    }

    function broadcastPeer(peer: PeerAddr, skipDuplicateCheck: boolean = false): void {
        peersAnnounced++
        if (peersAnnounced > (cfg.peerAnnouncementQuota ?? 10)) return
        if (!skipDuplicateCheck && checkDuplicatePeer(peer)) {
            return
        }
        console.log("Discovered: " + peer.server + ":" + peer.port);
        console.log(peers.map(p => p.addr))
        peers.forEach(p => {
            console.log("[send][peer]" + JSON.stringify(peer) + "  ==> " + JSON.stringify(p.addr))
            p.peer.send('peer', Buffer.from(JSON.stringify(peer), 'utf8'))
        });
    }

    async function discovered(addr: PeerAddr, socket?: Socket): Promise<void> {
        if (checkDuplicatePeer(addr)) {
            return
        }
        if (connections > cfg.maxConnections) {
            return
        }
        try {
            const p : Peer = await peerApi.createPeer(addr.server, addr.port, socket)
            
            p.connect(socket)
            
            p.on('message', onmessage)
            p.on('connect', onconnect)
            p.on('end', ondisconnect)

            if (socket === undefined) { //outbound
                peers.push({peer : p, addr: addr})
            }
                
        } catch (err) {
            console.error(err)
        }
    }

    function reduceCTTL(content: string): [string, boolean] {
        const msg: mega.MsgLike = JSON.parse(content)
        if (msg.cTTL > (cfg.ttlThreshold ?? 7)) {
            return [JSON.stringify(msg), false]
        }
        if (msg.cTTL <= 0) {
            return [JSON.stringify(msg), false]
        } else {
            msg.cTTL--
            return [JSON.stringify(msg), true]
        }
    }

    async function processApiRequest(command: string, content: string): Promise<void> {
        console.log("[receive][cmd: " + command + "] " + content)
        if (content.length > cfg.maxMsgLength) {
            throw "Content too large"
        }
        switch(command) {
            case 'peer': { 
                await discovered(JSON.parse(content))
                break;
            } 
            case 'oracle': {
                const result = await nd.api.announceOracle(cfg, JSON.parse(content))
                if (result == 'success') {
                    broadcastMessage(command, content) 
                } else if (result == 'duplicate') {
                    const [adjusted, toBroadcast] = reduceCTTL(content)
                    if (toBroadcast) {
                        broadcastMessage(command, adjusted)
                    }
                }
                break;
            }
            case 'capability': {
                const result = await nd.api.announceCapability(cfg, JSON.parse(content))
                if (result == 'success') {
                    broadcastMessage(command, content)
                } else if (result == 'duplicate') {
                    const [adjusted, toBroadcast] = reduceCTTL(content)
                    if (toBroadcast) {
                        broadcastMessage(command, adjusted)
                    }
                }
                break;
            }
            case 'report': {
                const result = await nd.api.reportMalleability(cfg, JSON.parse(content))
                if (result == 'success') {
                    broadcastMessage(command, content)
                } else if (result == 'duplicate') {
                    const [adjusted, toBroadcast] = reduceCTTL(content)
                    if (toBroadcast) {
                        broadcastMessage(command, adjusted)
                    }
                }
                break;
            }
            case 'dispute': {
                const result = await nd.api.disputeMissingfactClaim(JSON.parse(content))
                if (result == 'success') {
                    broadcastMessage(command, content)
                } else if (result == 'duplicate' || result == "report not found")  {
                    const [adjusted, toBroadcast] = reduceCTTL(content)
                    if (toBroadcast) {
                        broadcastMessage(command, adjusted)
                    }
                }
                break;
            }
            case 'offer': {
                const result = await nd.api.publishOffer(cfg, JSON.parse(content))
                if (result == 'success') {
                    broadcastMessage(command, content)
                } else if (result == 'duplicate') {
                    const [adjusted, toBroadcast] = reduceCTTL(content)
                    if (toBroadcast) {
                        broadcastMessage(command, adjusted)
                    }
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
    
    peerApi.createServer(cfg, discovered)
    
    p2pNode = node
    connectionPool = {
        list: function (cfg: ConnectionPoolCfg): PeerAddr[] {
            return peers.map(x => x.addr)
        },
        getapi: function (peer: PeerAddr): nd.Api {
            const prefix = `http://${peer.server}:${peer.httpPort ?? 8080}/`
            return remoteApi(prefix)
        },
        drop: function (cfg: ConnectionPoolCfg, peer: PeerAddr): void {
            const neighbor = peers.find(x => x.addr === peer)
            if (neighbor) {
                neighbor.peer.disconnect()
            }
        }
    }

    setInterval(() => {
        peersAnnounced = 0
    }, 1000)

    if (cfg.hostname !== undefined) {
        var seqNo = 0
        setInterval(() => {
            seqNo++
            broadcastPeer({server: cfg.hostname, port: cfg.p2pPort, seqNo: (cfg.hostSeqNo ?? 0) + seqNo, httpPort: cfg.httpPort}, true)
        }, (cfg.p2pKeepAlive ?? 100000))
    }

    return node
    
}

const suffix = (paging: mega.PagingDescriptor) => {
    return `pageNo=${paging.page}&pageSize=${paging.chunkSize}`
}

export const remoteApi = (prefix: string) => ({
    announceOracle: async function (cfg: MempoolConfig<any>, id: mega.OracleId): Promise<('success' | 'duplicate') | ('low pow difficulty' | 'wrong signature' | 'wrong pow' | 'no oracle found' | ['invalid request', string])> {
        return 'low pow difficulty'
    },
    announceCapability: async function (cfg: MempoolConfig<any>, cp: mega.OracleCapability): Promise<('success' | 'duplicate') | ('low pow difficulty' | 'wrong signature' | 'wrong pow' | 'no oracle found' | ['invalid request', string])> {
        return 'low pow difficulty'
    },
    reportMalleability: async function (cfg: MempoolConfig<any>, report: mega.Report): Promise<('success' | 'duplicate') | ('low pow difficulty' | 'wrong signature' | 'wrong pow' | 'no oracle found' | ['invalid request', string])> {
        return 'low pow difficulty'
    },
    disputeMissingfactClaim: async function (dispute: mega.Dispute): Promise<('success' | 'duplicate') | (('low pow difficulty' | 'wrong signature' | 'wrong pow' | 'no oracle found' | ['invalid request', string]) | 'invalid fact' | 'report not found' | 'unknown')> {
        return 'low pow difficulty'
    },
    publishOffer: async function (cfg: MempoolConfig<any>, offer: mega.OfferMsg): Promise<('success' | 'duplicate') | ('low pow difficulty' | 'wrong signature' | 'wrong pow' | 'no oracle found' | ['invalid request', string])> {
        return 'low pow difficulty'
    },
    lookupOracles: async function (paging: mega.PagingDescriptor): Promise<mega.OracleId[]> {
        return (await (await fetch(prefix + "oracles?" + suffix(paging))).json()) as mega.OracleId[]
    },
    lookupCapabilities: async function (paging: mega.PagingDescriptor, oraclePub: string): Promise<mega.OracleCapability[]> {
        return (await (await fetch(prefix + `capabilities?pubkey=${encodeURIComponent(oraclePub)}&` + suffix(paging))).json()) as mega.OracleCapability[]
    },
    lookupReports: async function (paging: mega.PagingDescriptor, oraclePub: string): Promise<mega.Report[]> {
        return (await (await fetch(prefix + `reports?pubkey=${encodeURIComponent(oraclePub)}&` + suffix(paging))).json()) as mega.Report[]
    },
    lookupOffers: async function (paging: mega.PagingDescriptor, capabilityPubKey: string): Promise<mega.OfferMsg[]> {
        return (await (await fetch(prefix + `offers?pubkey=${encodeURIComponent(capabilityPubKey)}&` + suffix(paging))).json()) as mega.OfferMsg[]
    }
})
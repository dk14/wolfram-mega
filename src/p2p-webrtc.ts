import { MempoolConfig } from './config';
import {Peer, Event, Socket, PeerApi, PeerAddr} from './p2p'
import * as p2pjs from "peerjs";

interface Datum {
    cmd: string
    msg: string
}

const adaptorOutbound = (c: p2pjs.DataConnection, server: string, resolve: (p: Peer) => void): void => {
    const adaptor = {
        on: (ev: "message" | "connect" | "end", handler: (ev: Event) => void): void => {
            if (ev === "connect") {
                handler({peer: adaptor})
            } else if (ev === "message") {
                c.on("data", (data: Datum) => {
                    handler({
                        command: data.cmd,
                        data: Buffer.from(data.msg, "base64") 
                    })
                })
            } else if (ev === "end") {
                c.on("close", () => handler({}))
            }
            
        },
        send: (cmd: string, msg: Buffer): void => {
            c.send({
                cmd, msg: msg.toString("base64")
            })
        },
        server,
        port: 0,
        disconnect: (): void => {
            c.close({flush: true})
        },
        connect: (addr: Socket): void => {}
    }
    resolve(adaptor)
}
       


const adaptorInbound = (c: p2pjs.DataConnection, server: string): Peer => {
    const adaptor: Peer = {
        on: (ev: "message" | "connect" | "end", handler: (ev: Event) => void): void => {
            if (ev === "connect") {  
                handler({peer: adaptor})
            } else if (ev === "message") {
                c.on("data", (data: Datum) => {
                    handler({
                        command: data.cmd,
                        data: Buffer.from(data.msg, "base64") 
                    })
                })  
            } else if (ev === "end") {
                c.on("close", () => handler({}))
            }
        },
        send: (cmd: string, msg: Buffer): void => {
            c.send({cmd, msg: msg.toString("base64")})    
        },
        server,
        port: 9,
        disconnect: (): void => {
            c.close({flush: true})
        },
        connect: (addr: Socket): void => {
        
        }
    }
    return adaptor
}

export const browserPeerAPI: () => PeerApi = () => {
    console.log("Creating webrtc peer: " + global.cfg.hostname)
    const jspeer = new p2pjs.Peer(global.cfg.hostname)

    return {
        createPeer: async (server: string, port?: number, socket?: Socket): Promise<Peer> => {

            if (socket === undefined) {
                console.log("Try to connect to peer..." + server)
                const connection = jspeer.connect(server)

                return await new Promise(resolve => {
                    connection.on('open', () => {
                        console.log("Connection open..." + server)
                        adaptorOutbound(connection, server, resolve)
                    })
                })
            } else {
                console.log("Inbound connection..." + server)
                return adaptorInbound(socket.dataConnection, server)
            }
        },
        createServer: (cfg: MempoolConfig<PeerAddr>, discovered: (addr: PeerAddr, socket?: Socket) => void): void => {
            jspeer.on("connection", c => {
                discovered({server: c.peer}, {dataConnection: c})
            })
        }
    }

}
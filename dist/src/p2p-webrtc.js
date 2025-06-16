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
exports.browserPeerAPI = void 0;
const p2pjs = __importStar(require("peerjs"));
const adaptorOutbound = (c, server, resolve) => {
    const adaptor = {
        on: (ev, handler) => {
            if (ev === "connect") {
                handler({ peer: adaptor });
            }
            else if (ev === "message") {
                c.on("data", (data) => {
                    handler({
                        command: data.cmd,
                        data: Buffer.from(data.msg, "base64")
                    });
                });
            }
            else if (ev === "end") {
                c.on("close", () => handler({}));
            }
        },
        send: (cmd, msg) => {
            c.send({
                cmd, msg: msg.toString("base64")
            });
        },
        server,
        port: 0,
        disconnect: () => {
            c.close({ flush: true });
        },
        connect: (addr) => { }
    };
    resolve(adaptor);
};
const adaptorInbound = (c, server) => {
    const adaptor = {
        on: (ev, handler) => {
            if (ev === "connect") {
                handler({ peer: adaptor });
            }
            else if (ev === "message") {
                c.on("data", (data) => {
                    handler({
                        command: data.cmd,
                        data: Buffer.from(data.msg, "base64")
                    });
                });
            }
            else if (ev === "end") {
                c.on("close", () => handler({}));
            }
        },
        send: (cmd, msg) => {
            c.send({ cmd, msg: msg.toString("base64") });
        },
        server,
        port: 0,
        disconnect: () => {
            c.close({ flush: true });
        },
        connect: (addr) => {
        }
    };
    return adaptor;
};
const browserPeerAPI = async () => {
    console.log("Creating webrtc peer: " + global.cfg.hostname);
    cfg.webrtcPeerServer.secure = false;
    const jspeer = new p2pjs.Peer(cfg.hostname, cfg.webrtcPeerServer);
    await new Promise(resolve => {
        jspeer.on('open', function (id) {
            console.log('My peer ID is: ' + id);
            cfg.hostname = id;
            resolve(id);
        });
    });
    return {
        createPeer: async (server, port, socket) => {
            if (socket === undefined) {
                console.log("Try to connect to peer..." + server);
                const connection = jspeer.connect(server);
                return await new Promise(resolve => {
                    connection.on('open', () => {
                        console.log("Outbound connection open..." + server);
                        adaptorOutbound(connection, server, resolve);
                    });
                });
            }
            else {
                console.log("Inbound connection..." + server);
                return adaptorInbound(socket.dataConnection, server);
            }
        },
        createServer: (cfg, discovered) => {
            jspeer.on("connection", c => {
                console.log("Inbound connection open..." + c.peer);
                discovered({ server: c.peer, port: 0 }, { dataConnection: c });
            });
        }
    };
};
exports.browserPeerAPI = browserPeerAPI;
//# sourceMappingURL=p2p-webrtc.js.map
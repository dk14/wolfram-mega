"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
const child_process_1 = require("child_process");
const peer_1 = require("peer");
exports.configure = true;
const peerServer = (0, peer_1.PeerServer)({ port: 9000, path: "/hello" });
peerServer.listen();
peerServer.on('connection', (client) => {
    console.error("[peer-server]: connected:" + client.getId());
});
const initiatorId = "initiator-" + Math.floor(Math.random() * 1000000);
const acceptorId = "acceptor-" + Math.floor(Math.random() * 1000000);
const initiator = (0, child_process_1.spawn)("npx", ["tsx", "test/util/webtest-initiator.ts", process.argv[4] ?? initiatorId, process.argv[5] ?? acceptorId, process.argv[3] ?? "non-composite"]);
// npm run webtest-it notrace  
// npm run webtest-it trace  # more logs
// npm run webtest-it notrace composite #composite contracts
// npm run webtest-it trace composite 
let lastmsg = "";
const fullLog = process.argv[2] === "trace";
//if you don't see STALKING messages - webrtc did not negotiate p2p connection
setTimeout(() => {
    initiator.stderr.on('data', async function (data) {
        console.log("INITIATOR-E: " + data);
        //process.exit(255)
    });
    initiator.stdout.on('data', async function (data) {
        if (fullLog) {
            console.log("INITIATOR: " + data);
        }
        if (data === "OK") {
            if (lastmsg === "OK") {
                process.exit(0);
            }
            else {
                lastmsg = "OK";
            }
        }
    });
    initiator.on("exit", (e) => {
        process.exit(e);
    });
}, 1000);
setTimeout(() => {
    const acceptor = (0, child_process_1.spawn)("npx", ["tsx", "test/util/webtest-acceptor.ts", process.argv[4] ?? initiatorId, process.argv[5] ?? acceptorId, process.argv[3] ?? "non-composite"]);
    acceptor.stderr.on('data', async function (data) {
        console.log("ACCEPTOR-E: " + data);
        //process.exit(255)
    });
    acceptor.stdout.on('data', async function (data) {
        if (fullLog) {
            console.log("ACCEPTOR: " + data);
        }
        if (data === "OK") {
            if (lastmsg === "OK") {
                console.log("OK");
                process.exit(0);
            }
            else {
                lastmsg = "OK";
            }
        }
    });
    acceptor.on("exit", (e) => {
        process.exit(e);
    });
}, 2000);
//# sourceMappingURL=webtest-integration.js.map
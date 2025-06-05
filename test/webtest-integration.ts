import { ChildProcessWithoutNullStreams, exec, spawn } from 'child_process'

import { PeerServer } from "peer";


export const configure = true

const peerServer = PeerServer({ port: 9009, path: "/" }); // this requires internet lol

const initiator = spawn("npx", ["tsx", "test/util/webtest-initiator.ts", process.argv[3] ?? "initiator-peer2", process.argv[4] ?? "acceptor-peer2", process.argv[5] ?? "non-composite"])
    
//example `npm run webtest-it no-trace initiator-peer2 acceptor-peer2 non-composite

let lastmsg = ""

const fullLog = process.argv[2] === "trace";

//if you don't see STALKING messages - webrtc did not negotiate p2p connection

setTimeout(() => {

    initiator.stderr.on('data', async function(data){
        console.log("INITIATOR-E: " + data);
        //process.exit(255)
    });

    initiator.stdout.on('data', async function(data){
        if (fullLog) {
            console.log("INITIATOR: " + data);
        }
        if (data === "OK") {
            if (lastmsg === "OK") {
                process.exit(0)
            } else {
                lastmsg = "OK"
            }
        } 
    });

    initiator.on("exit", (e) => {
        process.exit(e)
    })

}, 1000)


setTimeout(() => {

    const acceptor = spawn("npx", ["tsx", "test/util/webtest-acceptor.ts", process.argv[3] ?? "initiator-peer2", process.argv[4] ?? "acceptor-peer2", process.argv[5] ?? "non-composite"])
        
    acceptor.stderr.on('data', async function(data){
            console.log("ACCEPTOR-E: " + data);
            //process.exit(255)
    });

    acceptor.stdout.on('data', async function(data){
        if (fullLog) {
            console.log("ACCEPTOR: " + data);
        }
        if (data === "OK") {
            if (lastmsg === "OK") {
                console.log("OK")
                process.exit(0)
            } else {
                lastmsg = "OK"
            }
        }
    });

    acceptor.on("exit", (e) => {
        process.exit(e)
    })

}, 2000)
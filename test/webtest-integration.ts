import { ChildProcessWithoutNullStreams, exec, spawn } from 'child_process'

import { PeerServer } from "peer";


export const configure = true

const peerServer = PeerServer({ port: 9009, path: "/" });

const initiator = spawn("npx", ["tsx", "test/util/webtest-initiator.ts"])
    
let lastmsg = ""

setTimeout(() => {

    initiator.stderr.on('data', async function(data){
        console.log("INITIATOR-ERR: " + data);
        //process.exit(255)
    });

    initiator.stdout.on('data', async function(data){
        //console.log("INITIATOR: " + data);
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

    const acceptor = spawn("npx", ["tsx", "test/util/webtest-acceptor.ts"])
        
    acceptor.stderr.on('data', async function(data){
            console.log("ACCEPTOR-ERR: " + data);
            //process.exit(255)
    });

    acceptor.stdout.on('data', async function(data){
        //console.log("ACCEPTOR: " + data);
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
import { ChildProcessWithoutNullStreams, exec, spawn } from 'child_process'

// DRAFT
// TODO this test needs peersjs integration finished in order to work


const initiator = spawn("npx", ["tsx", "test/util/webtest-initiator.ts"])
    
let lastmsg = ""

initiator.stderr.on('data', async function(data){
        console.log("INITIATOR-ERR: " + data);
        //process.exit(255)
});

initiator.stdout.on('data', async function(data){
    console.log("INITIATOR: " + data);
    if (data === "OK") {
        if (lastmsg === "OK") {
            process.exit(0)
        } else {
            lastmsg = "OK"
        }
    } 
});


const acceptor = spawn("npx", ["tsx", "test/util/webtest-acceptor.ts"])
    
acceptor.stderr.on('data', async function(data){
        console.log("ACCEPTOR-ERR: " + data);
        //process.exit(255)
});

acceptor.stdout.on('data', async function(data){
    console.log("ACCEPTOR: " + data);
    if (data === "OK") {
        if (lastmsg === "OK") {
            process.exit(0)
        } else {
            lastmsg = "OK"
        }
    }
});
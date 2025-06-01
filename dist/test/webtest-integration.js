"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
// DRAFT
// TODO this test needs peersjs integration finished in order to work
const initiator = (0, child_process_1.spawn)("npx", ["tsx", "test/util/webtest-initiator.ts"]);
let lastmsg = "";
initiator.stderr.on('data', async function (data) {
    console.log("" + data);
    process.exit(255);
});
initiator.stdout.on('data', async function (data) {
    console.log("" + data);
    if (data === "OK") {
        if (lastmsg === "OK") {
            process.exit(0);
        }
        else {
            lastmsg = "OK";
        }
    }
});
const acceptor = (0, child_process_1.spawn)("npx", ["tsx", "test/util/webtest-acceptor.ts"]);
acceptor.stderr.on('data', async function (data) {
    console.log("" + data);
    process.exit(255);
});
acceptor.stdout.on('data', async function (data) {
    console.log("" + data);
    if (data === "OK") {
        if (lastmsg === "OK") {
            process.exit(0);
        }
        else {
            lastmsg = "OK";
        }
    }
});
//# sourceMappingURL=webtest-integration.js.map
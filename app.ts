import { MempoolConfig } from './src/node';
import {startP2P} from './src/p2p';
import {startHttp} from './src/rest';
import * as fs from 'fs'

//npx tsx app.ts mempool-cfg.json

process.on('uncaughtException', function (err) {
    console.log(err);
});

const path = process.argv[2] ?? "cfg/mempool-1.json";

const cfg: MempoolConfig<any> = JSON.parse(fs.readFileSync('./' + path).toString())

console.log("Start HTTP service...  " + cfg.httpPort)
startHttp(cfg)
console.log("Start P2P service...   " + cfg.p2pPort)
startP2P(cfg)
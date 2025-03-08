import { MempoolConfig } from './node';
import {startP2P} from './p2p';
import {startHttp} from './rest';
import * as fs from 'fs'

process.on('uncaughtException', function (err) {
    console.log(err);
});

const path = process.argv[2] ?? "mempool-cfg.json";

const cfg: MempoolConfig<any> = JSON.parse(fs.readFileSync('./' + path).toString())

console.log("Start HTTP service...  " + cfg.httpPort)
startHttp(cfg)
console.log("Start P2P service...   " + cfg.p2pPort)
startP2P(cfg)
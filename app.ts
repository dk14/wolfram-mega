import { startOracleService } from './src/client-api/service/oracle-service';
import { startTraderService } from './src/client-api/service/trader-service';
import { MempoolConfig } from './src/config';
import {startP2P} from './src/p2p';
import {startHttp} from './src/rest';
import * as fs from 'fs'

//npx tsx app.ts mempool-cfg.json

process.on('uncaughtException', function (err) {
    console.log(err);
});

const path = process.argv[2] ?? "cfg/mempool-1.json";

const getcfg = (): MempoolConfig<any> => {
    try {
        return JSON.parse(fs.readFileSync(__dirname + '/' + path).toString())
    } catch {
        return JSON.parse(fs.readFileSync(path).toString())
    }

}

const cfg: MempoolConfig<any> = getcfg()

console.log("Start HTTP service...  " + cfg.httpPort)
startHttp(cfg)
console.log("Start P2P service...   " + cfg.p2pPort)
startP2P(cfg)

if (cfg.oracle) {
    console.log("Start Oracle Control service...   HTTP = " + cfg.oracle.httpPort + ", WS = " + cfg.oracle.wsPort) 
    startOracleService(cfg)
}

if (cfg.trader) {
    console.log("Start Trader service...           HTTP = " + cfg.trader.httpPort) 
    startTraderService(cfg)
}
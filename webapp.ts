import { Collector, JsPredicate_, Predicate_, TraderApi, traderApi } from './src/client-api/trader-api';
import { MempoolConfig } from './src/config';
import { startP2P } from './src/p2p';
import { OracleId, OracleCapability, OfferMsg, Report } from './src/protocol';
import { api as ndapi} from './src/node';
import * as btc from "./src/client-api/contracts/generate-btc-tx";
import Sandbox from "@nyariv/sandboxjs";


const safeEval = (expression: string, data: any): any => {
    const sandbox = new Sandbox()
    const exec = sandbox.compile("return " + expression)
    const res = exec(data).run()
    return res
}

export interface TraderQuery<T> {
    where: (cp: T) => Promise<boolean>
}

const cfg: MempoolConfig<any> = {
    "maxOracles": 100,
    "maxCapabilities": 100,
    "maxReports": 100,
    "maxOffers": 100,
    "maxConnections": 100,
    "maxMsgLength": 1000000,
    "httpPort": 8081,
    "p2pPort": 8334,
    "hostname": "localhost",
    "isTest": true,
    "p2pseed": [
        {"server": "dk14-peerjs-1586786454", "port" : 0}
    ],
    "oracle": {
        "id": {
            "pubkey": "AAA",
            "oracleSignatureType" : "SHA256"
        },
        "adInterval": 10000,
        "adTopN": 10,
        "dbPath": "./db/myoracle",
        "httpPort": 9080,
        "wsPort": 9081
    },
    "trader": {
        "broadcastOfferCycle": 1000,
        "broadcastReportCycle": 1000,
        "collectOffersCycle": 1000,
        "collectReportsCycle": 1000,
        "collectOracleAdsCycle": 1000,
        "collectOracleCpCycle": 1000,
        "pageSize": 100,
        "maxOraclesPages": 2,
        "maxCpPages": 2,
        "maxReportsPages": 2,
        "maxOffersPages": 2,
        "maxCollectors": 2,
        "dbPath": "./db",
        "httpPort": 7080,
        "heliosNetwork": "https://d1t0d7c2nekuk0.cloudfront.net/preview.json",
        "btcSignerEndpoint": "http://localhost:9593/sign",
        "btcInteractiveSignerEndpoint": "http://localhost:9593/"
    }
}

console.log("Start P2P service...   " + cfg.p2pPort)
startP2P(cfg)


interface BtcApi {
    generateOpeningTransaction: (OpeningParams) => Promise<btc.Hex>
    generateClosingTransaction: (ClosingParams) => Promise<btc.Hex>
    generateCetTransaction: (CetParams) => Promise<btc.Hex>
    generateCetRedemptionTransaction: (CetRedemptioParams) => Promise<btc.Hex>
}

declare global {
    interface Window {
        traderApi: TraderApi<TraderQuery<OracleId>, TraderQuery<OracleCapability>, Predicate_>;
        btc: BtcApi;
        myOtherVar: number;
    }
}

const adaptjs = (js: string) => async x => {return safeEval(js, x)}

const traderApiRemote: TraderApi<string, string, JsPredicate_> = {
    collectOracles: function (tag: string, predicate: string, limit: number): Promise<Collector<OracleId>> {
        throw new Error('Function not implemented.');
    },
    collectCapabilities: function (tag: string, q: string, opredicate: string, predicate: string, limit: number): Promise<Collector<OracleCapability>> {
        throw new Error('Function not implemented.');
    },
    collectReports: function (tag: string, q: string, opredicate: string, predicate: string, limit: number): Promise<Collector<Report>> {
        throw new Error('Function not implemented.');
    },
    collectOffers: function (tag: string, q: string, cppredicate: string, matchingPredicate: string, limit: number): Promise<Collector<OfferMsg>> {
        throw new Error('Function not implemented.');
    },
    issueReport: function (r: Report): Promise<void> {
        throw new Error('Function not implemented.');
    },
    issueOffer: function (o: OfferMsg): Promise<void> {
        throw new Error('Function not implemented.');
    },
    startBroadcastingIssuedOffers: function (): void {
        throw new Error('Function not implemented.');
    },
    stopBroadcastingIssuedOffers: function (): void {
        throw new Error('Function not implemented.');
    },
    startBroadcastingIssuedReports: function (): void {
        throw new Error('Function not implemented.');
    },
    stopBroadcastingIssuedReports: function (): void {
        throw new Error('Function not implemented.');
    }
}

window.traderApi = traderApi(cfg.trader, cfg, ndapi, null, null)

window.btc = { 
    generateOpeningTransaction: btc.generateOpeningTransaction, 
    generateClosingTransaction: btc.generateClosingTransaction,
    generateCetTransaction: btc.generateCetTransaction,
    generateCetRedemptionTransaction: btc.generateCetRedemptionTransaction
}



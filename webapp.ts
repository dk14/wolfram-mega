import { Collector, JsPredicate_, Predicate, Predicate_, TraderApi, TraderStorage, traderApi } from './src/client-api/trader-api';
import { MempoolConfig } from './src/config';
import { startP2P } from './src/p2p';
import { OracleId, OracleCapability, OfferMsg, Report, PagingDescriptor } from './src/protocol';
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
const adaptPred = <T>(p: Predicate<T>) => p.toString()
const adaptQuery = <T>(q: TraderQuery<T>) => q.where.toString()

const traderApiRemote: TraderApi<string, string, JsPredicate_> = {
    collectOracles: async function (tag: string, predicate: string, limit: number): Promise<Collector<OracleId>> {
        await fetch('./collectOracles?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                predicate: 'true',
                limit
            }),
            headers: {'Content-Type': 'application/json'}
        }) 
        throw new Error('Function not implemented.');
    },
    collectCapabilities: async function (tag: string, q: string, opredicate: string, predicate: string, limit: number): Promise<Collector<OracleCapability>> {
        await fetch('./collectCapabilities?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                oquery: q,
                opredicate,
                predicate
            }),
            headers: {'Content-Type': 'application/json'}
        })
        
        throw new Error('Function not implemented.');
    },
    collectReports: async function (tag: string, q: string, opredicate: string, predicate: string, limit: number): Promise<Collector<Report>> {
        await fetch('./collectReports?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                oquery: q,
                opredicate,
                predicate
            }),
            headers: {'Content-Type': 'application/json'}
        })
        throw new Error('Function not implemented.');
    },
    collectOffers: async function (tag: string, q: string, cppredicate: string, matchingPredicate: string, limit: number): Promise<Collector<OfferMsg>> {
        await fetch('./collectOffers?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                cpquery: q,
                cppredicate,
                predicate: matchingPredicate
            }),
            headers: {'Content-Type': 'application/json'}
        })
        throw new Error('Function not implemented.');
    },
    issueReport: async function (r: Report): Promise<void> {
        await fetch('./issueReport', {
            method: 'post',
            body: JSON.stringify(r),
            headers: {'Content-Type': 'application/json'}
        })
    },
    issueOffer: async function (o: OfferMsg): Promise<void> {
        await fetch('./issueOffer', {
            method: 'post',
            body: JSON.stringify(o),
            headers: {'Content-Type': 'application/json'}
        })
    },
    startBroadcastingIssuedOffers: function (): void {
        fetch('./broadcastIssuedOffers')
    },
    stopBroadcastingIssuedOffers: function (): void {
        throw new Error('Function not implemented.');
    },
    startBroadcastingIssuedReports: function (): void {
        fetch('./broadcastIssuedReports')
    },
    stopBroadcastingIssuedReports: function (): void {
        throw new Error('Function not implemented.');
    }
}

const traderApiRemoteAdapted: TraderApi<TraderQuery<OracleId>, TraderQuery<OracleCapability>, Predicate_> = {
    
    collectOracles: async function (tag: string, predicate: (cp: OracleId) => Promise<boolean>, limit: number): Promise<Collector<OracleId>> {
        return traderApiRemote.collectOracles(tag, adaptPred(predicate), limit)
    },
    collectCapabilities: async function (tag: string, q: TraderQuery<OracleId>, opredicate: (cp: OracleId) => Promise<boolean>, predicate: (cp: OracleCapability) => Promise<boolean>, limit: number): Promise<Collector<OracleCapability>> {
        return traderApiRemote.collectCapabilities(tag, adaptQuery(q), adaptPred(opredicate), adaptPred(predicate), limit)
    },
    collectReports: async function (tag: string,  q: TraderQuery<OracleId>, opredicate: (cp: OracleId) => Promise<boolean>, predicate: (cp: Report) => Promise<boolean>, limit: number): Promise<Collector<Report>> {
        return traderApiRemote.collectReports(tag, adaptQuery(q), adaptPred(opredicate), adaptPred(predicate), limit)
    },
    collectOffers: async function (tag: string,  q: TraderQuery<OracleCapability>, cppredicate: (o: OracleCapability) => Promise<boolean>, matchingPredicate: (cp: OfferMsg) => Promise<boolean>, limit: number): Promise<Collector<OfferMsg>> {
        return traderApiRemote.collectOffers(tag, adaptQuery(q), adaptPred(cppredicate), adaptPred(matchingPredicate), limit)
    },
    issueReport: function (r: Report): Promise<void> {
        return traderApiRemote.issueReport(r)
    },
    issueOffer: function (o: OfferMsg): Promise<void> {
       return traderApiRemote.issueOffer(o)
    },
    startBroadcastingIssuedOffers: function (): void {
       traderApiRemote.startBroadcastingIssuedOffers()
    },
    stopBroadcastingIssuedOffers: function (): void {
        traderApiRemote.stopBroadcastingIssuedOffers()
    },
    startBroadcastingIssuedReports: function (): void {
        traderApiRemote.startBroadcastingIssuedReports()
    },
    stopBroadcastingIssuedReports: function (): void {
        traderApiRemote.stopBroadcastingIssuedReports()
    }
}

type Storage = TraderStorage<TraderQuery<OracleId>, TraderQuery<OracleCapability>, TraderQuery<Report>, TraderQuery<OfferMsg>>

const indexDBstorage: Storage = {
    addOracle: function (o: OracleId): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addCp: function (cp: OracleCapability): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addReport: function (r: Report): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addIssuedReport: function (r: Report): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addOffer: function (o: OfferMsg): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addIssuedOffer: function (o: OfferMsg): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    removeOracles: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeCps: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeReports: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeOffers: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeIssuedOffers: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeIssuedReports: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allOracles: function (q: TraderQuery<OracleId>, opredicate: (cp: OracleId) => Promise<boolean>, handler: (id: OracleId) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allCps: function (q: TraderQuery<OracleCapability>, cppredicate: (cp: OracleCapability) => Promise<boolean>, handler: (id: OracleCapability) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    queryOracles: function (q: TraderQuery<OracleId>, paging: PagingDescriptor): Promise<OracleId[]> {
        throw new Error('Function not implemented.');
    },
    queryCapabilities: function (q: TraderQuery<OracleCapability>, paging: PagingDescriptor): Promise<OracleCapability[]> {
        throw new Error('Function not implemented.');
    },
    queryOffers: function (q: TraderQuery<OfferMsg>, paging: PagingDescriptor): Promise<OfferMsg[]> {
        throw new Error('Function not implemented.');
    },
    queryReports: function (q: TraderQuery<Report>, paging: PagingDescriptor): Promise<Report[]> {
        throw new Error('Function not implemented.');
    },
    queryIssuedOffers: function (q: TraderQuery<OfferMsg>, paging: PagingDescriptor): Promise<OfferMsg[]> {
        throw new Error('Function not implemented.');
    },
    queryIssuedReports: function (q: TraderQuery<Report>, paging: PagingDescriptor): Promise<Report[]> {
        throw new Error('Function not implemented.');
    },
    allIssuedOffers: function (handler: (o: OfferMsg) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allIssuedReports: function (handler: (r: Report) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    }
}

type RemoteStorage = TraderStorage<string, string, string, string>

const remoteStorage: RemoteStorage = {
    addOracle: function (o: OracleId): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addCp: function (cp: OracleCapability): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addReport: function (r: Report): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addIssuedReport: function (r: Report): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addOffer: function (o: OfferMsg): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addIssuedOffer: function (o: OfferMsg): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    removeOracles: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeCps: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeReports: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeOffers: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeIssuedOffers: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeIssuedReports: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allOracles: function (q: string, opredicate: (cp: OracleId) => Promise<boolean>, handler: (id: OracleId) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allCps: function (q: string, cppredicate: (cp: OracleCapability) => Promise<boolean>, handler: (id: OracleCapability) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    queryOracles: function (q: string, paging: PagingDescriptor): Promise<OracleId[]> {
        throw new Error('Function not implemented.');
    },
    queryCapabilities: function (q: string, paging: PagingDescriptor): Promise<OracleCapability[]> {
        throw new Error('Function not implemented.');
    },
    queryOffers: function (q: string, paging: PagingDescriptor): Promise<OfferMsg[]> {
        throw new Error('Function not implemented.');
    },
    queryReports: function (q: string, paging: PagingDescriptor): Promise<Report[]> {
        throw new Error('Function not implemented.');
    },
    queryIssuedOffers: function (q: string, paging: PagingDescriptor): Promise<OfferMsg[]> {
        throw new Error('Function not implemented.');
    },
    queryIssuedReports: function (q: string, paging: PagingDescriptor): Promise<Report[]> {
        throw new Error('Function not implemented.');
    },
    allIssuedOffers: function (handler: (o: OfferMsg) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allIssuedReports: function (handler: (r: Report) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    }
}

const adaptedStorage: Storage = {
    addOracle: function (o: OracleId): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addCp: function (cp: OracleCapability): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addReport: function (r: Report): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addIssuedReport: function (r: Report): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addOffer: function (o: OfferMsg): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addIssuedOffer: function (o: OfferMsg): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    removeOracles: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeCps: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeReports: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeOffers: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeIssuedOffers: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeIssuedReports: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allOracles: function (q: TraderQuery<OracleId>, opredicate: (cp: OracleId) => Promise<boolean>, handler: (id: OracleId) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allCps: function (q: TraderQuery<OracleCapability>, cppredicate: (cp: OracleCapability) => Promise<boolean>, handler: (id: OracleCapability) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    queryOracles: function (q: TraderQuery<OracleId>, paging: PagingDescriptor): Promise<OracleId[]> {
        throw new Error('Function not implemented.');
    },
    queryCapabilities: function (q: TraderQuery<OracleCapability>, paging: PagingDescriptor): Promise<OracleCapability[]> {
        throw new Error('Function not implemented.');
    },
    queryOffers: function (q: TraderQuery<OfferMsg>, paging: PagingDescriptor): Promise<OfferMsg[]> {
        throw new Error('Function not implemented.');
    },
    queryReports: function (q: TraderQuery<Report>, paging: PagingDescriptor): Promise<Report[]> {
        throw new Error('Function not implemented.');
    },
    queryIssuedOffers: function (q: TraderQuery<OfferMsg>, paging: PagingDescriptor): Promise<OfferMsg[]> {
        throw new Error('Function not implemented.');
    },
    queryIssuedReports: function (q: TraderQuery<Report>, paging: PagingDescriptor): Promise<Report[]> {
        throw new Error('Function not implemented.');
    },
    allIssuedOffers: function (handler: (o: OfferMsg) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allIssuedReports: function (handler: (r: Report) => Promise<void>): Promise<void> {
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



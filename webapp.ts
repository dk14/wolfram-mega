import { Collector, Predicate, TraderApi, TraderStorage, traderApi } from './src/client-api/trader-api';
import { Neighbor, p2pNode, startP2P } from './src/p2p';
import { OracleId, OracleCapability, OfferMsg, Report, PagingDescriptor, Commitment, Fact, FactRequest, HashCashPow, Offer, OfferTerms } from './src/protocol';
import { Api, FacilitatorNode, api as ndapi} from './src/api';
import * as btc from "./src/client-api/contracts/generate-btc-tx";
import { IDBPDatabase, openDB } from 'idb';
import { HashLockProvider,  hashLockProvider, matchingEngine } from './src-web/matching';
import { p2pktr } from './src/client-api/contracts/btc/tx';
import { stalkingEngine, StalkingEngine } from './src-web/stalking';
import { browserPeerAPI } from './src/p2p-webrtc';
import { TraderQuery, database, Storage, indexDBstorage } from './src-web/impl/storage';
import { cfg, configureWebMocks, nodeMock } from './webcfg';
import { dataProvider } from './src-web/oracle-data-provider';
import { btcDlcContractInterpreter } from './src-web/transactions';
import Sandbox from '@nyariv/sandboxjs';
import { Dsl } from './src-web/dsl';
import { MatchingEngine } from './src-web/models';

export interface BtcApi {
    generateDlcContract:(params: btc.DlcParams) => Promise<btc.DlcContract>
    generateChildDlcContract:(params: btc.ChildDlcParams) => Promise<btc.DlcContract>
    generateClosingTransaction: (P: btc.ClosingParams) => Promise<btc.Hex>
    generateCetRedemptionTransaction: (p: btc.CetRedemptionParams) => Promise<btc.Hex>
   
}

declare global {
    interface Window {
        traderApi: TraderApi<TraderQuery<OracleId>, TraderQuery<OracleCapability>, boolean>
        storage: Storage
        btc: BtcApi
        matching: MatchingEngine
        stalking: StalkingEngine

        txfee: number

        pool: Api
        spec: string
        address: string
        pubkey: string

        privateDB: IDBPDatabase<unknown> //security note: secrts will be shared across pages in origin (subdomain, e.g. dk14.github.io)
        webOracleFacts: IDBPDatabase<unknown>

        hashLockProvider: HashLockProvider

        evalDiscreet: (expression: string, parties: string[], bounds: [number, number][]) => Promise<any>

        test: boolean

        peerlist: string[]
    }
}

window.txfee = 2000

global.initWebapp = new Promise(async (resolve) => {

window.spec = await (await fetch("./../wolfram-mega-spec.yaml")).text()

global.cfg = cfg

//WALLETT
window.privateDB = await openDB('private', 1, {
    upgrade(db) {
      db.createObjectStore('secrets');
    },
});

//LOCAL ORACLE
window.webOracleFacts = await openDB('web-oracle', 1, {
    upgrade(db) {
      db.createObjectStore('answers');
    },
})


window.pool = ndapi

if (!global.isTest) {
    const api = await startP2P(global.cfg, await browserPeerAPI())
    setInterval(() => {
        window.peerlist = api.peers.map(x => x.addr.server)
    })
}

const store = indexDBstorage(await database())

window.traderApi = traderApi(cfg.trader, cfg, ndapi, store, p2pNode)
window.storage = store
window.hashLockProvider = hashLockProvider

window.btc = { 
    generateClosingTransaction: btc.generateClosingTransaction,
    generateCetRedemptionTransaction: btc.generateCetRedemptionTransaction,
    generateDlcContract: btc.generateDlcContract,
    generateChildDlcContract: btc.generateChildDlcContract
}


window.matching = matchingEngine
window.stalking = stalkingEngine

await configureWebMocks()

window.pool = ndapi

if (!global.isTest && !window.test) {
    startP2P(global.cfg, await browserPeerAPI())
     setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": btcDlcContractInterpreter
    }, dataProvider), 200)
}

console.log("WebAPI is ready!")
resolve(window)

})

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
import { cfg, configureWebMocks, nodeMock, pub1, pub2, pubRandom } from './webcfg';
import { dataProvider } from './src-web/oracle-data-provider';
import { btcDlcContractInterpreter, UTxO } from './src-web/transactions';
import Sandbox from '@nyariv/sandboxjs';
import { Dsl } from './src-web/dsl';
import { MatchingEngine } from './src-web/matching-api';

export interface BtcApi {
    generateDlcContract:(params: btc.DlcParams) => Promise<btc.DlcContract>
    generateChildDlcContract:(params: btc.ChildDlcParams) => Promise<btc.DlcContract>
    generateClosingTransaction: (P: btc.ClosingParams) => Promise<btc.Hex>
    generateCetRedemptionTransaction: (p: btc.CetRedemptionParams) => Promise<btc.Hex>
   
}

declare global {
    interface Window {

        user: string

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
        initWebapp: Promise<void>
        progressOffers: () => Promise<void>

        profiledb: IDBPDatabase<unknown>

        spentUtxos: UTxO[]
        spentUtxosMemoize: {[id: string]: UTxO[]}
    }
}

window.txfee = 2000

const initWebapp = new Promise<void>(async (resolve) => {

    window.spec = await (await fetch("./../mega-peers-spec.yaml")).text()

    global.cfg = cfg

    //PROFILE
    window.profiledb = await openDB('profile', 1, {
        upgrade(db) {
        db.createObjectStore('xpub');
        db.createObjectStore('preferences');
        },
    });

    window.user = "default"

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get('user');
        if (param) {
            window.user = param
        }
    } catch {

    }

    let xpub: string = await window.profiledb.get("xpub", window.user)

    if (!xpub) {
        if (window.user === 'alice') {
            xpub = pub1
        } else if (window.user === 'bob') {
            xpub = pub2
        } else {
            xpub = pubRandom  
        }  
        try {
            await window.profiledb.put("xpub", xpub, window.user)
        } catch {

        } 
    }

    window.address = p2pktr(xpub).address
    window.pubkey = xpub

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

    window.progressOffers = async () => {
        await window.stalking.trackIssuedOffers({
            "bitcoin-testnet": btcDlcContractInterpreter
        }, dataProvider)
    }

    await configureWebMocks()

    window.pool = ndapi

    if (!global.isTest && !window.test) {
        startP2P(global.cfg, await browserPeerAPI())
    }

    console.log("WebAPI is ready!")
    resolve()

})

global.initWebapp = initWebapp
window.initWebapp = initWebapp

const ev = new CustomEvent<string>('init-webapp',{ bubbles: true, cancelable: false });

try {
    window.document.body.dispatchEvent(ev)
} catch {
    
}




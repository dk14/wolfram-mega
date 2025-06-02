import { configure } from "./configure";
configure


import { btcDlcContractInterpreter } from "../../src-web/transactions";
import { PreferenceModel, CapabilityModel, OfferModel, MatchingEngine } from "../../src-web/matching";
import { dataProvider } from "../../src-web/oracle-data-provider";
import { p2pNode, startP2P } from "../../src/p2p";
import { browserPeerAPI } from "../../src/p2p-webrtc";
import { MempoolConfig } from "../../src/config";
import { traderApi } from "../../src/client-api/trader-api";
import { api } from "../../src/node";

declare var cfg: MempoolConfig<any>

(async () => {
    await global.initWebapp
    console.log("Start...")

    cfg.p2pseed = []
    cfg.p2pseed[0] = {server: "acceptor-peer", port: 0}
    cfg.hostname = "initiator-peer"

    startP2P(cfg, await browserPeerAPI())
    window.traderApi = traderApi(cfg.trader, cfg, api, window.storage, p2pNode)

    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": btcDlcContractInterpreter
    }, dataProvider), 10)
        
    const preferences: PreferenceModel = {
        minOraclePow: 0,
        minOracleReputation: 0,
        tags: [],
        txfee: 0
    }
    
    window.matching.collectQuestions(preferences)
    window.matching.collectOffers(preferences)

    const oracles = await window.storage.queryCapabilities({where: async x => true}, {
        page: 0,
        chunkSize: 100
    })

    const oracle: CapabilityModel = {
        capabilityPub: oracles[0].capabilityPubKey,
        oracle: '',
        endpoint: ''
    }
    const myCustomOffer: OfferModel = {
        id: 'id',
        bet: [1, 30345],
        oracles: [oracle],
        question: '?',
        status: 'matching',
        blockchain: 'bitcoin-testnet',
        role: 'initiator'
    }


    await window.matching.broadcastOffer(myCustomOffer)

    setInterval(async () => {
        const orders = await window.matching.listOrders({page: 0, chunkSize: 100})
        const txReady = orders.filter(o => o.status === "opening tx available" && o.bet[1] === 30345).length > 0
        if (txReady) {
            console.log("OK")
            process.exit(0)
        }
    }, 1000)

    setTimeout(async () => {
        console.log("TX NOT GENERATED!")
        process.exit(255)
    }, 20000)
    

})()



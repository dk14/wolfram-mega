
import { cfg } from "../../webcfg";
cfg.p2pseed = []
cfg.p2pseed[0] = {server: process.argv[3] ?? "acceptor-peer", port: 0}
cfg.hostname = process.argv[2] ?? "initiator-peer2"

import { configure } from "./configure";
configure


import { btcDlcContractInterpreter } from "../../src-web/transactions";
import { PreferenceModel, CapabilityModel, OfferModel } from "../../src-web/models";
import { dataProvider } from "../../src-web/oracle-data-provider";
import { p2pNode, startP2P } from "../../src/p2p";
import { browserPeerAPI } from "../../src/p2p-webrtc";
import { MempoolConfig } from "../../src/config";
import { traderApi } from "../../src/client-api/trader-api";
import { api } from "../../src/api";
import { Dsl } from "../../src-web/dsl";


(async () => {
    await global.initWebapp
    console.log("Start...")

    startP2P(global.cfg, await browserPeerAPI())

    window.address = "tb1pudlyenkk7426rvsx84j97qddf4tuc8l63suz62xeq4s6j3wmuylq0j54ex" //e37 pub
    window.pubkey = "e37e4cced6f555a1b2063d645f01ad4d57cc1ffa8c382d28d90561a945dbe13e"
    window.txfee = 2000

    const isComposite = (process.argv[4] ?? "non-composite") === "composite"

    window.traderApi = traderApi(cfg.trader, cfg, api, window.storage, p2pNode)

    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": btcDlcContractInterpreter
    }, dataProvider), 2000)
        
    const preferences: PreferenceModel = {
        minOracleRank: 0,
        tags: ["world"],
        txfee: 0
    }
    
    window.matching.collectQuestions(preferences)
    window.matching.collectOffers(preferences)

    const oracles = await window.storage.queryCapabilities({where: async x => x.tags[0] === 'world'}, {
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
        bet: [4000, 2053],
        oracles: [oracle],
        question: '?',
        status: 'matching',
        blockchain: 'bitcoin-testnet',
        role: 'initiator'
    }

    const myCompositeOffer = await (new Dsl(async dsl => {
        const a = 60
        if (dsl.outcome(oracles[0].capabilityPubKey, ["YES"], ["NO"])) {
            dsl.pay(Dsl.Bob, 4000) 
            if (dsl.outcome(oracles[1].capabilityPubKey, ["YES"], ["NO"])) {
                dsl.pay(Dsl.Alice, 3000)
            } else {
                dsl.pay(Dsl.Bob, 3000)
            } 
        } else {
            dsl.pay(Dsl.Alice, 2053)
        }
    })).enumerateWithBound(140000000, 20000000)

    await window.matching.broadcastOffer(isComposite ? myCompositeOffer : myCustomOffer)

    setInterval(async () => {
        const orders = await window.matching.listOrders(100)
        const txReady = orders.filter(o => (o.status === "outcome revealed" && o.bet[1] === 2053) || (o.status === "redeemed" && isComposite && o.bet[1] === 3000)).length > (isComposite ? 1 : 0)
        if (txReady) {
            console.error(await window.matching.listOrders(100))
            console.error("OK")
            console.log("OK")
            process.exit(0)
        }
    }, 1000)

    setTimeout(async () => {
        console.error("TX NOT GENERATED!")
        process.exit(255)
    }, 200000)
    

})()



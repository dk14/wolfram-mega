import { configure } from "./configure";
configure

import { btcDlcContractInterpreter } from "../../src-web/transactions";
import { PreferenceModel, CapabilityModel, OfferModel, MatchingEngine } from "../../src-web/matching";
import { dataProvider } from "../../src-web/oracle-data-provider";
import { p2pNode, startP2P } from "../../src/p2p";
import { browserPeerAPI } from "../../src/p2p-webrtc";
import { MempoolConfig } from "../../src/config";
import { traderApi } from "../../src/client-api/trader-api";
import { api } from "../../src/api";

declare var cfg: MempoolConfig<any>

(async () => {
    await global.initWebapp
    console.log("Start...")

    cfg.p2pseed = []
    cfg.hostname = "acceptor-peer"
    window.address = "tb1p0l5zsw2lv9pu99dwzckjxhpufdvvylapl5spn6yd54vhnwa989hq20cvyv"
    window.pubkey = "7fe828395f6143c295ae162d235c3c4b58c27fa1fd2019e88da55979bba5396e"
    window.txfee = 2000
    
    startP2P(cfg, await browserPeerAPI())
    window.traderApi = traderApi(cfg.trader, cfg, api, window.storage, p2pNode)

    setInterval(() => window.stalking.trackIssuedOffers({
        "bitcoin-testnet": btcDlcContractInterpreter
    }, dataProvider), 1000)
        
    const preferences: PreferenceModel = {
        minOraclePow: 0,
        minOracleReputation: 0,
        tags: ["world"],
        txfee: 0
    }
    
    window.matching.collectQuestions(preferences)
    window.matching.collectOffers(preferences)

    let i = 0
    try {
        const offer: OfferModel = await (new Promise((resolve, reject) => {
            const cancel = setInterval(async () => {
                i++
                if (i > 20) {
                    clearInterval(cancel)
                    reject("OFFER DID NOT MATCH!")
                } else {
                    const candidate = await window.matching.pickOffer(preferences)
                    //console.log(candidate)
                    if (candidate.bet[1] === 2053){
                        resolve(candidate)
                    }
                }
            }, 500)
        }))

        await window.matching.acceptOffer(offer)

    } catch (msg) {
        console.log(msg)
        process.exit(255)
    }
   
    setInterval(async () => {
        const orders = await window.matching.listOrders(100)
        const txReady = orders.filter(o => o.status === "outcome revealed" && o.bet[1] === 2053).length > 0
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
    }, 60000)

})()



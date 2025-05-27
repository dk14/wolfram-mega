import { Or } from "@nyariv/sandboxjs/dist/node/parser"
import { TraderApi } from "../src/client-api/trader-api"
import { OracleCapability, OracleId, PagingDescriptor } from "../src/protocol"
import { BtcApi, TraderQuery, Storage } from "../webapp"

declare global {
    interface Window {
        traderApi: TraderApi<TraderQuery<OracleId>, TraderQuery<OracleCapability>, boolean>
        storage: Storage
        btc: BtcApi
        matching: MatchingEngine
    }
}

export type OfferStatus = 'matching' | 'accepted' | 'oracle committed' | 'signing' 
| 'opening tx available' | 'tx submitted' | 'waiting for outcome' | 'outcome revealed' | 'redeem tx available' | 'redeemed'


export interface PreferenceModel {
    minOraclePow: number,
    minOracleReputation: number,
    tags: string[]
}


export interface CapabilityModel {
    id: string
    oracle: string
    endpoint: string
}

export interface OfferModel {
    id: string
    bet: number[]
    betOn?: boolean,
    oracles: CapabilityModel[],
    question: "am i gonna win???",
    txid?: string,
    tx?: string,
    redemtion_txid: string,
    redemtion_tx: string,
    status: OfferStatus
}

export interface MatchingEngine {
    collectQuestions: (cfg: PreferenceModel) => Promise<void>
    collectOffers: (cfg: PreferenceModel) => Promise<void>
    generateOffer: (cfg: PreferenceModel) => Promise<OfferModel>
    broadcastOffer: (o: OfferModel) => Promise<void>
    acceptOffer: (o: OfferModel) => Promise<void>
}

const capabilityFilter = (tag: string) => {
    return async (cp: OracleCapability) => cp.tags?.find(x => x === tag) !== undefined
}

export const matchingEngine: MatchingEngine = {
    generateOffer: async function (cfg: PreferenceModel): Promise<OfferModel> {
        window.storage.queryOracles
        throw new Error("Function not implemented.")
    },
    broadcastOffer: async function (o: OfferModel): Promise<void> {
        throw new Error("Function not implemented.")
    },
    acceptOffer: async function (o: OfferModel): Promise<void> {
        throw new Error("Function not implemented.")
    },
    collectQuestions: async function (cfg: PreferenceModel): Promise<void> {
        cfg.tags.forEach(tag => {
            window.traderApi.collectOracles("pref-oracles-" + tag, async (o: OracleId) => o.tags?.find(x => x === tag) !== undefined, 10)
        })
        cfg.tags.forEach(tag => {
            window.traderApi.collectCapabilities(
                "pref-cps-" + tag, 
                {where: async x => true},
                async (o: OracleId) => o.tags?.find(x => x === tag) !== undefined,
                capabilityFilter(tag), 
                10)
        })
    },
    collectOffers: async function (cfg: PreferenceModel): Promise<void> {
        const paging: PagingDescriptor = { page: 0, chunkSize: 100 }
        const cps = cfg.tags.map(tag => window.storage.queryCapabilities({where: async x => capabilityFilter(tag)(x)}, paging))
        const cpPubList = (await Promise.all(cps)).flat().map(x => x.capabilityPubKey)
        cpPubList.forEach(cpPub => {
            window.traderApi.collectOffers(
                "cppub-" + cpPub,
                {where: async x => x.capabilityPubKey === cpPub},
                async x => true,
                async x => true,
                10)
            
        })

    }
}

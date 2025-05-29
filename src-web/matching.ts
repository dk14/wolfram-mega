import { Or } from "@nyariv/sandboxjs/dist/node/parser"
import { TraderApi } from "../src/client-api/trader-api"
import { AcceptOffer, FactRequest, HashCashPow, Offer, OfferTerms, OracleCapability, OracleId, PagingDescriptor, PartiallySignedTx } from "../src/protocol"
import { BtcApi, TraderQuery, Storage } from "../webapp"
import { randomInt } from "crypto"

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
    bet: [number, number]
    betOn?: boolean,
    oracles: CapabilityModel[],
    question: string,
    txid?: string,
    tx?: string,
    redemtion_txid?: string,
    redemtion_tx?: string,
    status: OfferStatus
    role: 'initiator' | 'acceptor'
}

export interface MatchingEngine {
    pickOffer: () => Promise<OfferModel>
    collectQuestions: (cfg: PreferenceModel) => Promise<void>
    collectOffers: (cfg: PreferenceModel) => Promise<void>
    generateOffer: (cfg: PreferenceModel) => Promise<OfferModel>
    broadcastOffer: (o: OfferModel) => Promise<void>
    acceptOffer: (o: OfferModel) => Promise<void>
    listOrders: (p: PagingDescriptor) => Promise<OfferModel[]>
}

const capabilityFilter = (tag: string) => {
    return async (cp: OracleCapability) => cp.tags?.find(x => x === tag) !== undefined
}

const oneElemPage = {
    page: 0,
    chunkSize: 1
}

export const matchingEngine: MatchingEngine = {
    pickOffer: async function (): Promise<OfferModel> {
        const candidates = (await window.storage.queryOffers({where: async x => true}, {
            page: 0,
            chunkSize: 100
        }))

        const offer = candidates[randomInt(candidates.length)]
        const capability = (await window.storage.queryCapabilities({
            where: async x => x.capabilityPubKey === offer.content.terms.question.capabilityPubKey
        }, oneElemPage))[0]
        
        if (!capability) {
            throw "capability is not synced; try another offer"
        }

        //TODO check that capability is compatible with binary option

        const model: OfferModel = {
            id: offer.pow.hash,
            bet: [offer.content.terms.partyBetAmount, offer.content.terms.counterpartyBetAmount],
            oracles: [{
                id: "",
                oracle: "Wolfram",
                endpoint: "http://localhost:8080" //can use fact-missing claim as an endpoint too
            }],
            question: capability.question,
            status: "matching",
            role: 'acceptor'
        }
        return model
    },
    generateOffer: async function (cfg: PreferenceModel): Promise<OfferModel> {
        window.storage.queryOracles
        window.storage.queryCapabilities
        //pick a question

        throw new Error("Function not implemented.")
    },
    broadcastOffer: async function (o: OfferModel): Promise<void> {
        const pow: HashCashPow = {
            difficulty: 0,
            algorithm: "",
            hash: "", //initial id
            magicNo: 0
        }

        const factRequest: FactRequest = {
            capabilityPubKey: "",
            arguments: {}
        }

        const offerTerms: OfferTerms = {
            question: factRequest,
            partyBetsOn: [o.betOn ? "YES": "NO"],
            counterPartyBetsOn: [!o.betOn ? "YES": "NO"],
            partyBetAmount: o.bet[0],
            counterpartyBetAmount: o.bet[1]
        }

        //TODO attach BTC precommitment
        //TODO subscribe to updates
        //- atach BTC partialSig on update
        //TODO subscribe to oracle
        // - generate redemtion if WIN

        const offer: Offer = { 
            message: "",
            customContract: "",
            terms: offerTerms,
            blockchain: "bitcoin-testnet",
            contact: ""
        }
        window.traderApi.issueOffer({
            seqNo: 0,
            cTTL: 0,
            pow: pow,
            content: offer
        })
    },
    acceptOffer: async function (o: OfferModel): Promise<void> {
        const offer = (await window.storage.queryOffers({where: async x => x.pow.hash === o.id}, oneElemPage))[0]
        const openingTx: PartiallySignedTx = {
            tx: "",
            sessionIds: [],
            nonceParity: [],
            sessionNonces: [],
            sesionCommitments: [],
            partialSigs: []
        }
        const accept: AcceptOffer = {
            chain: "bitcoin-testnet",
            openingTx: openingTx,
            offerRef: undefined,
            cetTxSet: []
        }
        offer.content.accept = accept
        offer.pow.hash = offer.pow.hash + "accept" //will be upgraded

        //TODO attach BTC pre-commitment
        //TODO subscribe to updates
        // - attach BTC signature and submit tx on update
        //TODO subscribe to oracle
        // - generate redemtion if WIN

       window.traderApi.issueOffer(offer)
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

    },
    listOrders: async function (p: PagingDescriptor): Promise<OfferModel[]> {
        return []
    }
}

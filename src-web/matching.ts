import { TraderApi } from "../src/client-api/trader-api"
import { AcceptOffer, DependsOn, FactRequest, HashCashPow, Offer, OfferTerms, OracleCapability, OracleId, PagingDescriptor, PartiallySignedTx } from "../src/protocol"
import { BtcApi, TraderQuery, Storage } from "../webapp"

export const randomInt = (n: number): number => {
    return Math.floor(Math.random() * (n - 1));
}

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
    tags: string[],
    txfee: number
}


export interface CapabilityModel {
    capabilityPub: string
    oracle: string
    endpoint: string
    params?: {[id: string]: string}
    answer?: string
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
    status: OfferStatus,
    blockchain: string,
    role: 'initiator' | 'acceptor'
    dependsOn?: DependsOn[]
}

export interface MatchingEngine {
    pickOffer: () => Promise<OfferModel>
    collectQuestions: (cfg: PreferenceModel) => Promise<string[]>
    collectOffers: (cfg: PreferenceModel) => Promise<string[]>
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

export const getOriginatorId = (): string => { //TODO generate per trade
    if (localStorage === undefined) {
        return randomInt(1200000).toString()
    }
    if (localStorage.getItem("originatorId") === undefined) {
        localStorage.setItem("originatorId", randomInt(1200000).toString())
    }
    return localStorage.getItem("originatorId")
}

export const checkOriginatorId = (id: string): boolean => {
    return id === getOriginatorId()
}


export const matchingEngine: MatchingEngine = {
    pickOffer: async function (): Promise<OfferModel> {
        const candidates = (await window.storage.queryOffers({where: async x => true}, {
            page: 0,
            chunkSize: 100
        }))

        const offer = candidates[randomInt(candidates.length)]

        if (!offer) {
            throw "no offers found in database; db.length =" + candidates.length
        }

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
                capabilityPub: "",
                oracle: "Wolfram",
                endpoint: "http://localhost:8080" //can use fact-missing claim as an endpoint too
            }],
            question: capability.question,
            blockchain: "bitcoin-testnet",
            status: "matching",
            role: 'acceptor'
        }
        return model
    },
    generateOffer: async function (cfg: PreferenceModel): Promise<OfferModel> {

        const candidates = (await window.storage.queryCapabilities({where: async x => true}, {
            page: 0,
            chunkSize: 100
        }))

        if (candidates.length === 0) {
            throw "no capabilties found"
        }

        const cp = candidates[randomInt(candidates.length)]
        //pick a question

        const partyBetAmountOptions = [1, 100, 200, 500]
        const partyBetAmount = partyBetAmountOptions[randomInt(partyBetAmountOptions.length)]
        const counterpartyBetAmountOptions = [5, 250, 300, 500]
        const counterpartyBetAmount = counterpartyBetAmountOptions[randomInt(counterpartyBetAmountOptions.length)]
        
        const model: OfferModel = {
            id: "aaa",
            bet: [partyBetAmount, counterpartyBetAmount],
            oracles: [{
                capabilityPub: "",
                oracle: cp.oraclePubKey,
                endpoint: "http://localhost:8080"
            }],
            question: cp.question,
            blockchain: "bitcoin-testnet",
            status: "matching",
            role: 'initiator'
        }

        return model
    },
    broadcastOffer: async function (o: OfferModel): Promise<void> {
        if (o.status !== 'matching') {
            throw "progresssed offers not accepted. status must be 'matching'"
        }
        if (o.role !== 'initiator') {
            throw "you must be initiator; use acceptOffer to accept"
        }
        const pow: HashCashPow = {
            difficulty: 0,
            algorithm: "SHA-256",
            hash: "", //initial id
            magicNo: 0
        }

        const factRequest: FactRequest = {
            capabilityPubKey: o.oracles[0].capabilityPub,
            arguments: {}
        }

        const offerTerms: OfferTerms = {
            question: factRequest,
            partyBetsOn: [o.betOn ? "YES": "NO"],
            counterPartyBetsOn: [!o.betOn ? "YES": "NO"],
            partyBetAmount: o.bet[0],
            counterpartyBetAmount: o.bet[1]
        }

        const offer: Offer = { 
            message: "",
            customContract: "",
            terms: offerTerms,
            blockchain: "bitcoin-testnet",
            contact: "",
            originatorId: getOriginatorId(),
            addresses: [window.address],
            orderId: randomInt(1200000).toString()
        }

        window.traderApi.issueOffer({
            seqNo: 0,
            cTTL: 0,
            pow: pow,
            content: offer
        })
    },
    acceptOffer: async function (o: OfferModel): Promise<void> {
        if (o.status !== 'matching') {
            throw "progresssed offers not accepted. status must be 'matching'"
        }
        if (o.role !== 'acceptor') {
            throw "you must be initiator; use acceptOffer to accept"
        }
        const offer = (await window.storage.queryOffers({where: async x => x.pow.hash === o.id}, oneElemPage))[0]
        const openingTx: PartiallySignedTx = {
            tx: "TODO",
            sessionIds: [],
            nonceParity: [],
            sessionNonces: [],
            sesionCommitments: ["TODO"],
            partialSigs: []
        }
        const accept: AcceptOffer = {
            chain: o.blockchain,
            openingTx: openingTx,
            offerRef: undefined,
            cetTxSet: [],
            acceptorId: getOriginatorId()
        }
        offer.content.accept = accept
        if (!offer.content.addresses) {
            offer.content.addresses = []
        }
        offer.content.addresses[1] = window.address
        offer.pow.hash = offer.pow.hash + "accept" + randomInt(100) //will be upgraded


       window.traderApi.issueOffer(offer)
    },
    collectQuestions: async function (cfg: PreferenceModel): Promise<string[]> {
        const ocollectors = cfg.tags.map(tag => {
            window.traderApi.collectOracles("pref-oracles-" + tag, async (o: OracleId) => o.tags?.find(x => x === tag) !== undefined, 10)
            return "pref-oracles-" + tag
        })
        const cpcollectors = cfg.tags.map(tag => {
            window.traderApi.collectCapabilities(
                "pref-cps-" + tag, 
                {where: async x => true},
                async (o: OracleId) => o.tags?.find(x => x === tag) !== undefined,
                capabilityFilter(tag), 
                10)
            return "pref-cps-" + tag
        })
        return ocollectors.concat(cpcollectors)
    },
    collectOffers: async function (cfg: PreferenceModel): Promise<string[]> {
        const paging: PagingDescriptor = { page: 0, chunkSize: 100 }
        const cps = cfg.tags.map(tag => window.storage.queryCapabilities({where: async x => capabilityFilter(tag)(x)}, paging))
        const cpPubList = (await Promise.all(cps)).flat().map(x => x.capabilityPubKey)
        return cpPubList.map(cpPub => {
            window.traderApi.collectOffers(
                "cppub-" + cpPub,
                {where: async x => x.capabilityPubKey === cpPub},
                async x => true,
                async x => true,
                10)
            return "cppub-" + cpPub
        })

    },
    listOrders: async function (p: PagingDescriptor): Promise<OfferModel[]> {
        const pagedescriptor = {
            page: 0,
            chunkSize: 100
        }

        const myOffers = (await window.storage.queryIssuedOffers({
            where: async x => checkOriginatorId(x.content.originatorId)}, pagedescriptor))
        
    
        const theirOffers = (await window.storage.queryIssuedOffers({
            where: async x => checkOriginatorId(x.content.originatorId)}, pagedescriptor))

        const myModels = myOffers.map(o => {
            const model: OfferModel = {
                id: "",
                bet: [o.content.terms.partyBetAmount, o.content.terms.counterpartyBetAmount],
                oracles: [{
                    capabilityPub: o.content.terms.question.capabilityPubKey,
                    oracle: o.content.terms.question.capabilityPubKey,
                    endpoint: "TODO"
                }],
                question: "TODO",
                blockchain: o.content.blockchain,
                status: "matching",
                role: "initiator"
            }
            return model
        })

        const theirModels = theirOffers.map(o => {
            const model: OfferModel = {
                id: "",
                bet: [o.content.terms.partyBetAmount, o.content.terms.counterpartyBetAmount],
                oracles: [{
                    capabilityPub: o.content.terms.question.capabilityPubKey,
                    oracle: o.content.terms.question.capabilityPubKey,
                    endpoint: "TODO"
                }],
                question: "TODO",
                blockchain: o.content.blockchain,
                status: "matching",
                role: "acceptor"
            }
            return model
        })
        return myModels.concat(theirModels)
    }
}

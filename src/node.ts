/* c8 ignore start */
import {createVerify, generateKeyPairSync, createSign, sign, createPrivateKey, KeyObject} from 'crypto'
import fetch from 'node-fetch'
import https from 'https'
import * as fs from 'fs'
import { hash } from './util'
import Enforcer from 'openapi-enforcer'
import { console } from 'inspector'
import { MempoolConfig } from "./config"
import {OracleId, OracleCapability, 
    Commitment, HashCashPow, MsgLike, WithPow, 
    Answer, Bid, Report, OfferMsg, Registered, NotRegistered, ReportAccepted,
    ReportRejected, Dispute, DisputeAccepted, DisputeRejected, PagingDescriptor,
    Fact, FactRequest
} from './protocol'
import { createPemPub } from './util'
import OpenAPIRequestValidator from 'openapi-request-validator'

const openapi = __dirname ? Enforcer(__dirname + '/../wolfram-mega-spec.yaml') : new OpenAPIRequestValidator(window.spec)
/* c8 ignore end */

const validate = async (msg: any, path, method): Promise<any> => {
    const [ _, error ] = (await openapi).request({ method, path, body: msg})
    return error
}

//we keep data in memory (HDD is only used as a backup storage), some data (malleability reports) can be sharded between peers
// facilitators can start multiple fact sharing nodes in order to keep more data available
// our secret sauce here is that reports are prioritized by PoW, so even sharding would be eventually consistent
interface Oracle { 
    id: OracleId
    capabilies: OracleCapability[]
    reports: Report[]
}

interface Mempool {
    oracles: { [id: string] : Oracle; }
    offers: OfferMsg[]
}




export interface Api {

    //----exposed as P2P and REST POST----
    announceOracle: (cfg: MempoolConfig<any>, id: OracleId) => Promise<Registered | NotRegistered>
    announceCapability: (cfg: MempoolConfig<any>, cp: OracleCapability) => Promise<Registered | NotRegistered>
    reportMalleability: (cfg: MempoolConfig<any>, report: Report) => Promise<ReportAccepted | ReportRejected>
    disputeMissingfactClaim: (dispute: Dispute) => Promise<DisputeAccepted | DisputeRejected> 
    publishOffer: (cfg: MempoolConfig<any>, offer: OfferMsg) => Promise<Registered | NotRegistered>
    //note: it does not dispute time delay/SLA, but it is less crushial for most option contracts

    //----exposed only as REST GET----- oracles should be sorted by proofs of payment
    lookupOracles: (paging: PagingDescriptor) => Promise<OracleId[]>
    lookupCapabilities: (paging: PagingDescriptor, oraclePub: string) => Promise<OracleCapability[]>
    lookupReports: (paging: PagingDescriptor, oraclePub: string) => Promise<Report[]>
    lookupOffers: (paging: PagingDescriptor, capabilityPubKey: string) => Promise<OfferMsg[]>

}


export interface FacilitatorNode<PeerT> { //TODO implement
    peers: PeerT[]
    discovered: (peer: PeerT) => void
    broadcastPeer: (peer: PeerT) => void

    processApiRequest: (command: string, content: string) => Promise<void>
    broadcastMessage: (command: string, content: string) => void

}



export const checkPow = (pow: HashCashPow, preimage: string): boolean => {
    if (!pow.hash.endsWith("0".repeat(pow.difficulty))) {
        return false
    }
    return hash(preimage + pow.magicNo + (pow.magicString ?? ""), pow.algorithm) === pow.hash
}

export const checkCapabilitySignature = (cp: OracleCapability): boolean => {
    const signature = cp.oracleSignature
    const pow = cp.pow
    cp.oracleSignature = ""
    cp.pow = undefined
    const res = createVerify(cp.oracleSignatureType).update(JSON.stringify(cp)).verify(createPemPub(cp.oraclePubKey), signature, 'base64')
    cp.oracleSignature = signature
    cp.pow = pow
    return res
}

export const checkOracleIdSignature = (o: OracleId): boolean => {
    const signature = o.oracleSignature
    o.oracleSignature = ""
    const res = createVerify(o.oracleSignatureType).update(JSON.stringify(o)).verify(createPemPub(o.pubkey), signature, 'base64')
    o.oracleSignature = signature
    return res
}

const checkOracleRank = (cfg: MempoolConfig<any>, oracle: OracleId, mempool: Mempool): boolean => { 
    if (Object.keys(mempool.oracles).length >= cfg.maxOracles) {
        const evict = Object.values(mempool.oracles).find(o => o.id.bid.amount <= oracle.bid.amount && o.id.pow.difficulty <= oracle.pow.difficulty)
        if (evict !== undefined ) {
            delete mempool.oracles[evict.id.pubkey]
            return true
        }
        return false
    }
    return true
}

const checkCapabilityRank = (cfg: MempoolConfig<any>, cp: OracleCapability, o: Oracle): boolean => {
    if (o.capabilies.length >= cfg.maxCapabilities) {
        const index = o.capabilies.findIndex(c => c.pow.difficulty <= cp.pow.difficulty)
        if (index > -1) {
            o.capabilies.splice(index, 1)
            return true
        }
        return false
    }
    return true
}

const checkReportRank = (cfg: MempoolConfig<any>, report: Report, o: Oracle): boolean => {
    if (o.reports.length >= cfg.maxReports) {
        const index = o.reports.findIndex(r => r.pow.difficulty <= report.pow.difficulty)
        if (index > -1) {
            o.reports.splice(index, 1)
            return true
        }
        return false
    }
    return true
}

const checkOfferRank = (cfg: MempoolConfig<any>, offer: OfferMsg, m: Mempool): boolean => {
    if (m.offers.length >= (cfg.maxOffers ?? 0)) {
        const index = m.offers.findIndex(r => r.pow.difficulty <= offer.pow.difficulty)
        if (index > -1) {
            m.offers.splice(index, 1)
            return true
        }
        return false
    }
    return true
}

const validateBid = async (cfg: MempoolConfig<any>, bid: Bid): Promise<boolean> => {
    /* c8 ignore start */
    if (cfg.lnRestHost === undefined || cfg.lnMacaroonPath === undefined || cfg.facilitatorId === undefined || cfg.facilitatorId.rewardAddress === undefined){
        return false
    }
    if (bid.paymentType === undefined || bid.paymentType === "lightning") {
        try {
            const headers = new Headers()
            headers['Grpc-Metadata-macaroon'] = fs.readFileSync(cfg.lnMacaroonPath).toString('hex')

            const httpsAgent = new https.Agent({
                rejectUnauthorized: false
            })
            
            const body: any = await (await fetch(
                'https://' + cfg.lnRestHost + '/v1/invoice/' + bid.proof,
                {
                    headers,
                    agent: httpsAgent,
                }
            )).json()
            return body.payment_addr === cfg.facilitatorId?.rewardAddress && body.amt_paid_msat === bid.amount && body.state === "SETTLED"
        } catch (err) {
            console.log(err)
            return false
        }
    }
    return false
    /* c8 ignore end */
}

const validateFact = (fact: Fact, req: FactRequest): boolean => {
    return createVerify(fact.signatureType).update(fact.factWithQuestion).verify(createPemPub(req.capabilityPubKey), fact.signature, 'base64')
}

export const testOnlyReset = () => { 
    //could've made api a factory, but this is more realistic, 
    //since implementations of Api ackuiring sockets, files, databases and other resources 
    //are outside of the scope of node.ts module
    mempool.oracles = {}
    mempool.offers = []
}

const mempool: Mempool = {
    oracles: {},
    offers: []
}

export const api: Api = {

    announceOracle: async (cfg: MempoolConfig<any>, id: OracleId): Promise<Registered | NotRegistered> => {
        const error = await validate(id, '/oracle', 'POST')
        if (error !== undefined) {
            return ['invalid request', error.toString()]
        }
        if (!(id.pow.difficulty == 0 || checkOracleIdSignature(id))) {
            return "wrong signature"
        }
        if (checkPow(id.pow, id.pubkey) || id.pow.difficulty == 0) {
            if (!(id.bid.amount == 0 || await validateBid(cfg, id.bid))) {
                id.bid.amount = 0 //todo unsafe
            }
            if (checkOracleRank(cfg, id, mempool)) {
                if (mempool.oracles[id.pubkey] === undefined) {
                    mempool.oracles[id.pubkey] = {
                        id,
                        capabilies: [],
                        reports: []
                    };
                    return "success";
                } else {
                    if (mempool.oracles[id.pubkey].id.seqNo < id.seqNo && mempool.oracles[id.pubkey].id.pow.difficulty <= id.pow.difficulty) {
                        mempool.oracles[id.pubkey].id.seqNo = id.seqNo;
                        mempool.oracles[id.pubkey].id.pow = id.pow
                        return "success";
                    } else {
                        return "duplicate";
                    }
                }
            } else {
                return "low pow difficulty";
            }
        } else {
            return "wrong pow";
        }
    },
    announceCapability: async (cfg: MempoolConfig<any>, cp: OracleCapability): Promise<Registered | NotRegistered> => {
        const error = await validate(cp, '/capability', 'POST')
        if (error !== undefined) {
            return ['invalid request', error.toString()]
        }
        if (mempool.oracles[cp.oraclePubKey] === undefined) {
            return 'no oracle found';
        }
        if (cp.pow.difficulty == 0 || checkCapabilitySignature(cp)) {
            if (cp.pow.difficulty == 0 || checkPow(cp.pow, cp.oracleSignature)) {
                if (checkCapabilityRank(cfg, cp, mempool.oracles[cp.oraclePubKey])) {
                    const found = mempool.oracles[cp.oraclePubKey].capabilies.find(x => x.capabilityPubKey == cp.capabilityPubKey);
                    if (found !== undefined) {
                        if (found.seqNo < cp.seqNo && found.pow.difficulty <= cp.pow.difficulty) {
                            found.seqNo = cp.seqNo
                            found.pow = cp.pow
                            found.off = cp.off
                            return "success";
                        } else {
                            return "duplicate";
                        }
                    }
                    mempool.oracles[cp.oraclePubKey].capabilies.push(cp);
                    return "success";
                } else {
                    return "low pow difficulty";
                }
            } else {
                return "wrong pow";
            }

        } else {
            return "wrong signature";
        }
    },
    reportMalleability: async (cfg: MempoolConfig<any>, report: Report): Promise<ReportAccepted | ReportRejected> => {
        const error = await validate(report, '/report', 'POST')
        if (error !== undefined) {
            return ['invalid request', error.toString()]
        }
        if (mempool.oracles[report.oraclePubKey] === undefined) {
            return 'no oracle found'
        }
        if (!checkPow(report.pow, JSON.stringify(report.content)) && !(report.pow.difficulty == 0)) {
            return "wrong pow";
        }

        if (!checkReportRank(cfg, report, mempool.oracles[report.oraclePubKey])) {
            return "low pow difficulty";
        }

        const found = mempool.oracles[report.oraclePubKey].reports.find(x => x.pow.hash == report.pow.hash);
        if (found !== undefined) {
            if (found.seqNo < report.seqNo) {
                found.seqNo = report.seqNo;
                return "success";
            } else {
                return "duplicate";
            }
        }
        mempool.oracles[report.oraclePubKey].reports.push(report);
        return "success";
    },
    disputeMissingfactClaim: async (dispute: Dispute): Promise<DisputeAccepted | DisputeRejected> => {
        const error = await validate(dispute, '/dispute', 'POST')
        if (error !== undefined) {
            return ['invalid request', error.toString()]
        }
        if (mempool.oracles[dispute.oraclePubKey] === undefined) {
            return 'no oracle found'
        }
        const oracle = mempool.oracles[dispute.oraclePubKey];
        if (!validateFact(dispute.fact, dispute.claim.request)) {
            return "invalid fact";
        }
        if (oracle !== undefined) {
            const found = mempool.oracles[oracle.id.pubkey].reports.find(x => x.content.type == "fact-missing" && x.pow.hash == dispute.reportPow.hash);
            if (found !== undefined && found.content.type == 'fact-missing') {
                found.content.dispute = dispute.fact;
                return "success";
            } else {
                return "report not found";
            }
        } else {
            return 'no oracle found'
        }
    },
    lookupOracles: async (paging: PagingDescriptor): Promise<OracleId[]> => {
        return Object.values(mempool.oracles)
            .sort((a, b) => a.id.bid.amount - b.id.bid.amount)
            .map(x => x.id)
            .slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    lookupCapabilities: async (paging: PagingDescriptor, oraclePub: string): Promise<OracleCapability[]> => {
        if (mempool.oracles[oraclePub] === undefined) {
            console.log("oracle not found " + oraclePub);
            return [];
        }
        return mempool.oracles[oraclePub].capabilies.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);

    },
    lookupReports: async (paging: PagingDescriptor, oraclePub: string): Promise<Report[]> => {
        if (mempool.oracles[oraclePub] === undefined) {
            console.log("oracle not found " + oraclePub);
            return [];
        }
        return mempool.oracles[oraclePub].reports.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    publishOffer: async function (cfg: MempoolConfig<any>, offer: OfferMsg): Promise<Registered | NotRegistered> {
        const error = await validate(offer, '/offer', 'POST')
        if (error !== undefined) {
            return ['invalid request', error.toString()]
        }
        if (!checkPow(offer.pow, JSON.stringify(offer.content)) && !(offer.pow.difficulty == 0)) {
            return "wrong pow";
        }
        if (!checkOfferRank(cfg, offer, mempool)) {
            return "low pow difficulty";
        }
        const found = mempool.offers.find(x => x.pow.hash === offer.pow.hash)
        if (found !== undefined) {
            if (found.seqNo < offer.seqNo && found.pow.difficulty <= offer.pow.difficulty) {
                found.seqNo = offer.seqNo
                found.pow = offer.pow
                return "success"
            }
            return "duplicate"
        }
        const cp = Object.values(mempool.oracles).find(o => 
            o.capabilies.find(c => 
                c.capabilityPubKey === offer.content.terms.question.capabilityPubKey
            ) !== undefined
        )
        if (cp === undefined) {
            return "no oracle found"
        }
        mempool.offers.push(offer)
        return "success"
    },
    lookupOffers: async function (paging: PagingDescriptor, capabilityPubKey: string): Promise<OfferMsg[]> {
        return mempool.offers.filter(o => o.content.terms.question.capabilityPubKey === capabilityPubKey)
            .slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    }
}
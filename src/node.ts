/* c8 ignore start */
import {createVerify, generateKeyPairSync, createSign, sign, createPrivateKey, KeyObject} from 'crypto'
import fetch from 'node-fetch'
import https from 'https'
import * as fs from 'fs'
import {hash} from './util'
import Enforcer from 'openapi-enforcer'
import { console } from 'inspector'
import { MempoolConfig } from "./config"

const openapi = Enforcer(__dirname + '/../wolfram-mega-spec.yaml')
/* c8 ignore end */

const curve = 'secp521r1';

interface KeyPair {
    pub: string, 
    pk: string
}


const regexPem = /.{64}/g;
export const createPemPub = (base64: string): string => {
    return '-----BEGIN PUBLIC KEY-----\n'+ base64.replace(regexPem, '$&\n') + '\n-----END PUBLIC KEY-----\n'
}

export const createPemPk = (base64: string): string => {
    return '-----BEGIN EC PRIVATE KEY-----\n' + base64.replace(regexPem, '$&\n') + '\n-----END EC PRIVATE KEY-----\n'
}

export const createPemPkEd = (base64: string): KeyObject => {
    const pem = '-----BEGIN PRIVATE KEY-----\n' + base64.replace(regexPem, '$&\n') + '-----END PRIVATE KEY-----\n'
    return createPrivateKey({key: pem})
}

export const testOnlyGenerateKeyPair = (): KeyPair => {
    const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: curve });
    return {
        pub: publicKey.export({ type: 'spki', format: 'der' }).toString('base64'),
        pk: privateKey.export({ type: 'sec1', format: 'der' }).toString('base64')
    }
}

export const testOnlyGenerateKeyPairEd = (): KeyPair => {
    const { publicKey, privateKey } = generateKeyPairSync('ed25519');
    return {
        pub: publicKey.export({ type: 'spki', format: 'der' }).toString('base64'),
        pk: privateKey.export({ type: 'pkcs8', format: 'der' }).toString('base64')
    }
}

export const testOnlySign = (msg: string, pk: string) => {
    return createSign('SHA256').update(msg).sign(createPemPk(pk), 'base64')
}

export const testOnlySignEd = (msg: string, pk: string) => {
    return sign(null, Buffer.from(msg), createPemPkEd(pk)).toString('base64')
}

//used for broadcast
export interface MsgLike {
    seqNo: number 
    cTTL: number 
}

export interface WithPow {
    pow: HashCashPow
}

export type Value = string
export type Answer = string

export interface Param {
    name: string
    values: Value[]
}

export interface Commitment {
    req: FactRequest
    contract: string
    rValueSchnorrHex?: string
    curve?: string
    rewardAddress?: string
    oracleSig: string
}

export interface OracleCapability extends MsgLike {
    oraclePubKey: string
    capabilityPubKey: string
    capabilitySignatureType?: string
    question: string // oracle is responsible for unambiguity of question - this field can be use to match capabilities of different oracles

    seqNo: number 
    cTTL: number

    oracleSignature: string //sign this OracleCapability JSON record (with empty string signature field)
    oracleSignatureType: string
    pow: HashCashPow

    tags?: string[]
    off?: boolean
    
    params?: Param[] //possible params
    answers?: Answer[] //possible answers
    endpoint?: string //how to query oracle
    commitmentEndpoint?: string //where to get comitment to future value from oracle

}


export interface HashCashPow {
    difficulty: number
    algorithm: string
    hash: string //empty string for preimage
    magicNo: number
    magicString?: string
}

export interface Bid {
    paymentType?: string
    amount: number
    proof: string
}

export interface OracleId extends MsgLike, WithPow {
    pubkey: string // sign every request/response
    seqNo: number //used for broadcast
    cTTL: number //used for broadcast

    pow: HashCashPow
    manifestUri?: string

    bid: Bid

    oracleSignature: string
    oracleSignatureType: string
    tags?: string[]
    previousId?: OracleId //in case oracle has to change pubkey
    previousIdSignatureToNewPubkey?: string
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

export interface FactRequest {
    capabilityPubKey: string
    arguments: { [id: string] : string; }
    invoice?: string
}

export interface ProofOfPayment {
    request: FactRequest
    proofOfPayment: string
}


export interface Fact {
    factWithQuestion: string
    signatureType: string
    signature: string
}

export interface WithFactRequest {
    request: FactRequest
    capabilitySignatureOverRequest?: string
    commitment?: Commitment
}

export interface FactDisagreesWithPublic extends WithFactRequest { //this report is for manual review, it requires pow to submit in order to avoid spamming. Strongest pows will be prioritized
    type: 'fact-disagreees-with-public'
    request: FactRequest
    capabilitySignatureOverRequest?: string
    fact?: Fact
    comment?: string
}

export interface FactConflict extends WithFactRequest {
    type: 'fact-conflict'
    request: FactRequest
    capabilitySignatureOverRequest?: string
    fact: Fact
    facts: Fact[] //must be of the same capability; TODO validator
}

export interface FactMissing extends WithFactRequest {
    type: 'fact-missing'
    request: FactRequest
    capabilitySignatureOverRequest: string
    payment?: ProofOfPayment
    dispute?: Fact
}

export type MaleabilityReport = FactDisagreesWithPublic | FactConflict | FactMissing

export interface Dispute {
    claim: FactMissing
    reportPow: HashCashPow
    oraclePubKey: string
    fact: Fact
}

export interface Report extends MsgLike, WithPow {
    seqNo: number
    cTTL: number
    pow: HashCashPow
    oraclePubKey: string
    content: MaleabilityReport
}

export interface OfferTerms {
    question: FactRequest
    partyBetsOn: Answer[]
    counterPartyBetsOn: Answer[]
    partyBetAmount: number
    counterpartyBetAmount: number
}

export interface PartiallySignedTx {
    tx: string
    pubCombined: string
    sessionNonces: string[]
    sesionCommitments: string[]
    partialSigs: string[]
}

export interface AccepOffer {
    chain: 'bitcoin-testnet'
    openingTx: PartiallySignedTx
    offerRef: HashCashPow
    cetTxSet: PartiallySignedTx[]
    previousAcceptRef?: HashCashPow //for sharing precommitments in interactive sign
}

export interface FinalizeOffer {
    txid: string
    acceptRef: HashCashPow
}

export interface Offer {
    message: string
    customContract: string
    terms: OfferTerms
    blockchain: 'bitcoin-testnet' | 'bitcoin-mainnet' | 'plutus-testnet'
    contact: string
    transactionToBeCoSigned?: PartiallySignedTx //note for interactive sign: can be used to share precommitment (ideally) and/or nonce. Only skip commitment when secret is one-off
    txfee?: string
    accept?: AccepOffer //note for interactive sign: counterparty returns its commitment through this first time and party replies with its nonce; second time: it returns its nonce and partial sig
    finalize?: FinalizeOffer //here after final signature is put; txid is reported
    
}


export interface OfferMsg extends MsgLike, WithPow {
    seqNo: number
    cTTL: number
    pow: HashCashPow
    content: Offer
}



export interface PagingDescriptor {
    page: number
    chunkSize: number
}


type Registered = 'success' | 'duplicate'
type NotRegistered = 'low pow difficulty' | 'wrong signature' | 'wrong pow' | 'no oracle found' | ['invalid request', string]

type DisputeAccepted = Registered
type DisputeRejected = NotRegistered | 'invalid fact' | 'report not found' | 'unknown'

type ReportAccepted = Registered
type ReportRejected = NotRegistered


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
        const [ _, error ] = (await openapi).request({ method: 'POST', path: '/oracle', body: id})
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
        const [ _, error ] = (await openapi).request({ method: 'POST', path: '/capability', body: cp})
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
        const [ _, error ] = (await openapi).request({ method: 'POST', path: '/report', body: report})
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
        const [ _, error ] = (await openapi).request({ method: 'POST', path: '/dispute', body: dispute})
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
        const [ _, error ] = (await openapi).request({ method: 'POST', path: '/offer', body: offer})
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
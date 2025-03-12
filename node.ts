import {createHash, createVerify, generateKeyPairSync, createSign} from 'crypto'
import * as request from 'request'
import * as fs from 'fs'
import { off } from 'process';


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

export const testOnlyGenerateKeyPair = (): KeyPair => {
    const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: curve });
    return {
        pub: publicKey.export({ type: 'spki', format: 'der' }).toString('base64'),
        pk: privateKey.export({ type: 'sec1', format: 'der' }).toString('base64')
    }
}

export const testOnlySign = (msg: string, pk: string) => {
    return createSign('SHA256').update(msg).sign(pk, 'base64')
}

//used for broadcast
export interface MsgLike {
    seqNo: number 
    cTTL: number 
}

export interface WithPow {
    pow: HashCashPow
}

type Value = string
type Answer = string

export interface Param {
    name: string
    values: Value[]
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
    
    params?: Param[] //possible params
    answers?: Answer[] //possible answers
    endpoint?: string //how to query oracle

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

export interface Offer {
    message: string
    customContract: string
    terms: OfferTerms
    blockchain: 'bitcoin-testnet' | 'bitcoin-mainnet'
    transactionToBeCoSigned: string //counterparty pays fees, can broadcast as a confirmation
    signaturesToAggregate?: string[]
    contact: string
}


export interface OfferMsg extends MsgLike, WithPow {
    seqNo: number
    cTTL: number
    pow: HashCashPow
    content: Offer
}

interface FacilitatorId {
    websiteManifestUri?: string
    rewardAddress?: string
    facilitatorRewardIdPow?: HashCashPow // preimage is concat of reward addresses
}

export interface PagingDescriptor {
    page: number
    chunkSize: number
}


type Registered = 'success' | 'duplicate'
type NotRegistered = 'low pow difficulty' | 'wrong signature' | 'wrong pow' | 'no oracle found'

type DisputeAccepted = string
type DisputeRejected = string

type ReportAccepted = string
type ReportRejected = string


interface Api {
    mempool: Mempool

    //----exposed as P2P and REST POST----
    announceOracle: (cfg: MempoolConfig<any>, id: OracleId) => Promise<Registered | NotRegistered>
    announceCapability: (cfg: MempoolConfig<any>, cp: OracleCapability) => Promise<Registered | NotRegistered>
    reportMalleability: (cfg: MempoolConfig<any>, report: Report) => Promise<ReportAccepted | ReportRejected>
    disputeMissingfactClaim: (dispute: Dispute) => Promise<DisputeAccepted | DisputeRejected> 
    publishOffer: (cfg: MempoolConfig<any>, offer: OfferMsg) => Promise<Registered | NotRegistered>
    //note: it does not dispute time delay/SLA, but it is less crushial for most option contracts

    //----exposed only as REST GET----- oracles should be sorted by proofs of payment
    lookupOracles: (paging: PagingDescriptor, questions: string[]) => Promise<OracleId[]>
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

export interface MempoolConfig<PeerAddrT> {
    maxOracles: number
    maxCapabilities: number
    maxReports: number
    maxOffers?: number
    maxConnections: number
    httpPort: number
    p2pPort: number
    p2pseed: PeerAddrT[]
    hostSeqNo?: number
    hostname?: string
    facilitatorId?: FacilitatorId
    lnRestHost?: string
    lnMacaroonPath?: string
    isTest: boolean
    p2pKeepAlive?: number
}

const hash = (msg: string, algo: string): string => {
    return createHash(algo).update(msg).digest('hex')
}

const checkPow = (pow: HashCashPow, preimage: string): boolean => {
    if (!pow.hash.endsWith("0".repeat(pow.difficulty))) {
        return false
    }
    return hash(preimage + pow.magicNo + (pow.magicString ?? ""), pow.algorithm) === pow.hash
}

const checkCapabilitySignature = (cp: OracleCapability): boolean => {
    const signature = cp.oracleSignature
    cp.oracleSignature = ""
    const res = createVerify(cp.oracleSignatureType).update(JSON.stringify(cp)).verify(createPemPub(cp.oraclePubKey), cp.oracleSignature, 'base64')
    cp.oracleSignature = signature
    return res
}

const checkOracleIdSignature = (o: OracleId): boolean => {
    const signature = o.oracleSignature
    o.oracleSignature = ""
    const res = createVerify(o.oracleSignatureType).update(JSON.stringify(o)).verify(createPemPub(o.pubkey), o.oracleSignature, 'base64')
    o.oracleSignature = signature
    return res
}

const checkOracleRank = (cfg: MempoolConfig<any>, oracle: OracleId, mempool: Mempool): boolean => { 
    if (Object.keys(mempool.oracles).length > cfg.maxOracles) {
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
    if (o.capabilies.length > cfg.maxCapabilities) {
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
    if (o.reports.length > cfg.maxReports) {
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
    if (m.offers.length > (cfg.maxOffers ?? 0)) {
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
    if (cfg.lnRestHost === undefined || cfg.lnMacaroonPath === undefined || cfg.facilitatorId === undefined || cfg.facilitatorId.rewardAddress === undefined){
        return false
    }
    /* c8 ignore start */
    if (bid.paymentType === undefined || bid.paymentType === "lightning") {
        let options = {
            url: 'https://' + cfg.lnRestHost + '/v1/invoice/' + bid.proof,
            rejectUnauthorized: false,
            json: true,
            headers: {
              'Grpc-Metadata-macaroon': fs.readFileSync(cfg.lnMacaroonPath).toString('hex'),
            },
          }

        return new Promise<boolean>(function (resolve, reject) {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    if (body.payment_addr === cfg.facilitatorId?.rewardAddress && body.amt_paid_msat === bid.amount && body.state === "SETTLED") {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                } else {
                    reject(error);
                }
            })
        })
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
    api.mempool.oracles = {}
    api.mempool.offers = []
}

export const api: Api = {
    mempool: {
        oracles: {},
        offers: []
    },
    announceOracle: async (cfg: MempoolConfig<any>, id: OracleId): Promise<Registered | NotRegistered> => {
        if (!(id.pow.difficulty == 0 || checkOracleIdSignature(id))) {
            return "wrong signature"
        }
        if (checkPow(id.pow, id.pubkey) || id.pow.difficulty == 0) {
            if (!(id.bid.amount == 0 || await validateBid(cfg, id.bid))) {
                id.bid.amount = 0 //todo unsafe
            }
            if (checkOracleRank(cfg, id, api.mempool)) {
                if (api.mempool.oracles[id.pubkey] === undefined) {
                    api.mempool.oracles[id.pubkey] = {
                        id,
                        capabilies: [],
                        reports: []
                    };
                    return "success";
                } else {
                    if (api.mempool.oracles[id.pubkey].id.seqNo < id.seqNo && api.mempool.oracles[id.pubkey].id.pow.difficulty <= id.pow.difficulty) {
                        api.mempool.oracles[id.pubkey].id.seqNo = id.seqNo;
                        api.mempool.oracles[id.pubkey].id.pow = id.pow
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
        if (api.mempool.oracles[cp.oraclePubKey] === undefined) {
            return 'no oracle found';
        }
        if (cp.pow.difficulty == 0 || checkCapabilitySignature(cp)) {
            if (cp.pow.difficulty == 0 || checkPow(cp.pow, cp.oracleSignature)) {
                if (checkCapabilityRank(cfg, cp, api.mempool.oracles[cp.oraclePubKey])) {
                    const found = api.mempool.oracles[cp.oraclePubKey].capabilies.find(x => x.question == cp.question);
                    if (found !== undefined) {
                        if (found.seqNo < cp.seqNo && found.pow.difficulty <= cp.pow.difficulty) {
                            found.seqNo = cp.seqNo;
                            found.pow = cp.pow
                            return "success";
                        } else {
                            return "duplicate";
                        }
                    }
                    api.mempool.oracles[cp.oraclePubKey].capabilies.push(cp);
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
        if (api.mempool.oracles[report.oraclePubKey] === undefined) {
            return "no oracle found:" + report.oraclePubKey;
        }
        if (!checkPow(report.pow, JSON.stringify(report.content)) && !(report.pow.difficulty == 0)) {
            return "wrong pow";
        }

        if (!checkReportRank(cfg, report, api.mempool.oracles[report.oraclePubKey])) {
            return "low pow difficulty";
        }

        const found = api.mempool.oracles[report.oraclePubKey].reports.find(x => x.pow.hash == report.pow.hash);
        if (found !== undefined) {
            if (found.seqNo < report.seqNo) {
                found.seqNo = report.seqNo;
                return "success";
            } else {
                return "duplicate";
            }
        }
        api.mempool.oracles[report.oraclePubKey].reports.push(report);
        return "success";
    },
    disputeMissingfactClaim: async (dispute: Dispute): Promise<DisputeAccepted | DisputeRejected> => {
        if (api.mempool.oracles[dispute.oraclePubKey] === undefined) {
            return "no oracle found:" + dispute.oraclePubKey;
        }
        const oracle = api.mempool.oracles[dispute.oraclePubKey];
        if (!validateFact(dispute.fact, dispute.claim.request)) {
            return "invalid fact";
        }
        if (oracle !== undefined) {
            const found = api.mempool.oracles[oracle.id.pubkey].reports.find(x => x.content.type == "fact-missing" && x.pow.hash == dispute.reportPow.hash);
            if (found !== undefined && found.content.type == 'fact-missing') {
                found.content.dispute = dispute.fact;
                return "success";
            } else {
                return "report not found";
            }
        } else {
            return "unknown oracle";
        }
    },
    lookupOracles: async (paging: PagingDescriptor, questions: string[]): Promise<OracleId[]> => {
        return Object.values(api.mempool.oracles)
            .sort((a, b) => a.id.bid.amount - b.id.bid.amount)
            .map(x => x.id)
            .slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    lookupCapabilities: async (paging: PagingDescriptor, oraclePub: string): Promise<OracleCapability[]> => {
        if (api.mempool.oracles[oraclePub] === undefined) {
            console.log("oracle not found " + oraclePub);
            return [];
        }
        return api.mempool.oracles[oraclePub].capabilies.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);

    },
    lookupReports: async (paging: PagingDescriptor, oraclePub: string): Promise<Report[]> => {
        if (api.mempool.oracles[oraclePub] === undefined) {
            console.log("oracle not found " + oraclePub);
            return [];
        }
        return api.mempool.oracles[oraclePub].reports.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    publishOffer: async function (cfg: MempoolConfig<any>, offer: OfferMsg): Promise<Registered | NotRegistered> {
        if (!checkPow(offer.pow, JSON.stringify(offer.content)) && !(offer.pow.difficulty == 0)) {
            return "wrong pow";
        }
        if (!checkOfferRank(cfg, offer, api.mempool)) {
            return "low pow difficulty";
        }
        if (api.mempool.offers.find(x => x.pow.hash === offer.pow.hash) !== undefined) {
            return "duplicate"
        }
        const cp = Object.values(api.mempool.oracles).find(o => 
            o.capabilies.find(c => 
                c.capabilityPubKey === offer.content.terms.question.capabilityPubKey
            ) !== undefined
        )
        if (cp === undefined) {
            return "no oracle found"
        }
        api.mempool.offers.push(offer)
        return "success"
    },
    lookupOffers: async function (paging: PagingDescriptor, capabilityPubKey: string): Promise<OfferMsg[]> {
        return api.mempool.offers.filter(o => o.content.terms.question.capabilityPubKey === capabilityPubKey)
            .slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    }
}
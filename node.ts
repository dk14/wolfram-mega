import {createHash, createVerify} from 'crypto'

export interface Param {
    name: string
    values: string[]
}

interface OracleCapability {
    oraclePubKey: string
    capabilityPubKey: string
    question: string // oracle is responsible for unambiguity of question - this field can be use to match capabilities of different oracles

    seqNo: number //used for broadcast
    cTTL: number //used for broadcast

    oracleSignature: string //sign this OracleCapability JSON record (with empty string signature field)
    oracleSignatureType: string
    pow: HashCashPow
    
    params?: Param[] //possible params
    answers?: string[] //possible answers
    endpoint?: string //how to query oracle

}


type PreimageType = string

interface HashCashPow {
    preimageType: PreimageType
    difficulty: number
    algorithm: string
    hash: string
}

interface Bid {
    amount: number
    proof: string
}

interface OracleId {
    pubkey: string // sign every request/response
    seqNo: number //used for broadcast
    cTTL: number //used for broadcast

    pow: HashCashPow
    manifestUri?: string

    bid: Bid

    previousId?: OracleId //in case oracle has to change pubkey
    previousIdSignatureToNewPubkey?: string
}

//we keep data in memory (HDD is only used as a backup storage), some data (malleability reports) can be sharded between peers
// facilitators can start multiple fact sharing nodes in order to keep more data available
// our secret sauce here is that reports are prioritized by PoW, so even sharding would be eventually consistent
interface Oracle { 
    id: OracleId
    capabilies: OracleCapability[]
    reports: MaleabilityReport[]
}

interface Mempool {
    oracles: { [id: string] : Oracle; }
}

interface FactRequest {
    capabilityPubKey: string
    arguments: { [id: string] : string; }
}

interface ProofOfPayment {
    request: FactRequest
    proofOfPayment: string
}


interface Fact {
    factWithArguments: string
    signatureType: string
    signature: string
}

interface FactDisagreesWithPublic { //this report is for manual review, it requires pow to submit in order to avoid spamming. Strongest pows will be prioritized
    type: 'fact-disagreees-with-public'
    request: FactRequest
    comment?: string
    pow: HashCashPow
}

interface FactConflict {
    type: 'fact-conflict'
    request: FactRequest
    facts: Fact[] //must be of the same capability; TODO validator
    pow: HashCashPow
}

interface FactMissing {
    type: 'fact-missing'
    request: FactRequest
    payment?: ProofOfPayment
    dispute?: Fact
    pow: HashCashPow
}

type MaleabilityReport = FactDisagreesWithPublic | FactConflict | FactMissing

interface Dispute {
    seqNo: number //used for broadcast
    cTTL: number //used for broadcast
    claim: FactMissing
    oraclePubKey: string
    fact: Fact
}

interface Report {
    seqNo: number //used for broadcast
    cTTL: number //used for broadcast
    oraclePubKey: string
    content: MaleabilityReport
}

interface FacilitatorId {
    websiteManifestUri?: string
    rewardAddress?: string[]
    facilitatorRewardIdPow?: HashCashPow // preimage is concat of reward addresses
}

export interface PagingDescriptor {
    page: number
    chunkSize: number
}


type Registered = string
type NotRegistered = string

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
    //note: it does not dispute time delay/SLA, but it is less crushial for most option contracts

    //----exposed only as REST GET----- oracles should be sorted by proofs of payment
    lookupOracles: (paging: PagingDescriptor, questions: string[]) => Promise<OracleId[]>
    lookupCapabilities: (paging: PagingDescriptor, oraclePub: string) => Promise<OracleCapability[]>
    lookupReports: (paging: PagingDescriptor, oraclePub: string) => Promise<MaleabilityReport[]>

    proxify: (req: FactRequest, uri: string) => Promise<string>

}

//https://github.com/cryptocoinjs/p2p-node/tree/master

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
    maxConnections: number
    httpPort: number
    p2pPort: number
    p2pseed: PeerAddrT[]
    hostSeqNo?: number
    hostname?: string
    facilitatorId?: FacilitatorId
}

const hash = (msg: string, algo: string): string => {
    return createHash(algo).update(msg).digest('hex')
}

const checkPow = (pow: HashCashPow, preimage: string): boolean => {
    return true

    if (!pow.hash.endsWith("0".repeat(pow.difficulty))) {
        return false
    }
    return hash(preimage, pow.algorithm) === pow.hash
}

const checkCapabilitySignature = (cp: OracleCapability): boolean => {
    return true

    const signature = cp.oracleSignature
    cp.oracleSignature = ""
    
    return createVerify(cp.oracleSignatureType).update(JSON.stringify(cp)).verify(cp.oraclePubKey, signature)
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
        const index = o.reports.findIndex(r => r.pow.difficulty <= report.content.pow.difficulty)
        if (index > -1) {
            o.reports.splice(index, 1)
            return true
        }
        return false
    }
    return true
}

const validateBid = (bid: Bid): boolean => {
    //check if payment was confirmed on chain explorers (or local lightning node)
    return true
}

const validateFact = (fact: Fact, req: FactRequest): boolean => {
    return true
    return createVerify(fact.signatureType).update(fact.factWithArguments).verify(req.capabilityPubKey, fact.signature)
}

export const api: Api = {
    mempool: {
        oracles: {}
    },
    announceOracle: async (cfg: MempoolConfig<any>, id: OracleId): Promise<Registered | NotRegistered> => {
        if (checkPow(id.pow, id.pubkey)) {
            if (checkOracleRank(cfg, id, api.mempool)) {
                if (api.mempool.oracles[id.pubkey] === undefined) {
                    if (validateBid(id.bid)) {
                        api.mempool.oracles[id.pubkey] = {
                            id,
                            capabilies: [],
                            reports: []
                        }
                        return "success"
                    } else {
                        return "lowbid"
                    }

                } else {
                    //todo merge pows after checking that other fields are same
                    return "duplicate"
                }

            } else {
                return "rank is too low"
            }
        } else {
            return "wrong pow"
        }

    },
    announceCapability: async (cfg: MempoolConfig<any>, cp: OracleCapability): Promise<Registered | NotRegistered> => {
        if (api.mempool.oracles[cp.oraclePubKey] === undefined) {
            return "no oracle found:" + cp.oraclePubKey
        }
        if (checkCapabilitySignature(cp)) {
            if (checkPow(cp.pow, cp.oracleSignature)) {
                if (checkCapabilityRank(cfg, cp, api.mempool.oracles[cp.oraclePubKey])) {
                    if (api.mempool.oracles[cp.oraclePubKey].capabilies.find(x => x.question == cp.question)) {
                        return "duplicate"
                    }
                    api.mempool.oracles[cp.oraclePubKey].capabilies.push(cp)
                    return "success"
                } else {
                    return "evicted: rank is too low"
                }
            } else {
                return "wrong pow"
            }

        } else {
            return "wrong signature"
        }
    },
    reportMalleability: async (cfg: MempoolConfig<any>, report: Report): Promise<ReportAccepted | ReportRejected> => {
        if (api.mempool.oracles[report.oraclePubKey] === undefined) {
            return "no oracle found:" + report.oraclePubKey
        }
        if (!checkPow(report.content.pow, "TODO")) {
            return "wrong pow"
        }

        if (!checkReportRank(cfg, report, api.mempool.oracles[report.oraclePubKey])) {
            return "evicted"
        }
        if (api.mempool.oracles[report.oraclePubKey].reports.find(x => x.pow.hash == report.content.pow.hash)) {
            return "duplicate"
        }
        api.mempool.oracles[report.oraclePubKey].reports.push(report.content)
        return "success"
    },
    disputeMissingfactClaim: async (dispute: Dispute): Promise<DisputeAccepted | DisputeRejected> => {
        if (api.mempool.oracles[dispute.oraclePubKey] === undefined) {
            return "no oracle found:" + dispute.oraclePubKey
        }
        const oracle = api.mempool.oracles[dispute.oraclePubKey]
        if (!validateFact(dispute.fact, dispute.claim.request)) {
            return "invalid fact"
        }
        if (oracle !== undefined) {
            const found = api.mempool.oracles[oracle.id.pubkey].reports.find(x => x.type == "fact-missing" && x.pow.hash == dispute.claim.pow.hash)
            if (found !== undefined && found.type == 'fact-missing') {
                found.dispute = dispute.fact
                return "success"
            } else {
                return "not found"
            }
        } else {
            return "unknown oracle"
        }
    },
    lookupOracles: async (paging: PagingDescriptor, questions: string[]): Promise<OracleId[]> => {
        return Object.values(api.mempool.oracles)
            .sort((a, b) => a.id.bid.amount - b.id.bid.amount)
            .map(x => x.id)
            .slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
    },
    lookupCapabilities: async (paging: PagingDescriptor, oraclePub: string): Promise<OracleCapability[]> => {
        if (api.mempool.oracles[oraclePub] === undefined) {
            console.log("oracle not found " + oraclePub)
            return []
        }
        return api.mempool.oracles[oraclePub].capabilies.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)

    },
    lookupReports: async (paging: PagingDescriptor, oraclePub: string): Promise<MaleabilityReport[]> => {
        if (api.mempool.oracles[oraclePub] === undefined) {
            console.log("oracle not found " + oraclePub)
            return []
        }
        return api.mempool.oracles[oraclePub].reports.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
    },

    proxify: async (req: FactRequest, uri: string): Promise<string> => {
        return ""
    }
}
import {createHash} from 'crypto'

export interface Param {
    name: string
    values: string[]
}

interface OracleCapability {
    oracleId: OracleId
    seqNo: number //used for broadcast
    cTTL: number //used for broadcast
    question: string // oracle is responsible for unambiguity of question - this field can be use to match capabilities of different oracles
    params: Param[]
    answers: string[] 
    queryUri: string //how to query oracle
    pubkey: string
    signature: string
    pow: HashCashPow
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
    capability: OracleCapability
    arguments: { [id: string] : string; }
}

interface ProofOfPayment {
    request: FactRequest
    proofOfPayment: string
}


interface Fact {
    request: FactRequest
    factWithArguments: string
    signature: string
}

interface FactDisagreesWithPublic { //this report is for manual review, it requires pow to submit in order to avoid spamming. Strongest pows will be prioritized
    type: 'fact-disagreees-with-public'
    fact: Fact
    comment: string
    pow: HashCashPow
}

interface FactConflict {
    type: 'fact-conflict'
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
    fact: Fact
}

interface Report {
    seqNo: number //used for broadcast
    cTTL: number //used for broadcast
    oracleId: OracleId
    content: MaleabilityReport
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
    announceOracle: (id: OracleId) => Promise<Registered | NotRegistered>
    announceCapability: (cp: OracleCapability) => Promise<Registered | NotRegistered>
    reportMalleability: (report: Report) => Promise<ReportAccepted | ReportRejected>
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
}

const hash = (msg: string, algo: string): string => {
    return createHash(algo).update(msg).digest('hex')
}

const checkPow = (pow: HashCashPow, preimage: string): boolean => {
    if (!pow.hash.endsWith("0".repeat(pow.difficulty))) {
        return false
    }
    return hash(preimage, pow.algorithm) === pow.hash
}

const checkCapabilitySignature = (cp: OracleCapability): boolean => {
    return true
}

const checkOracleRank = (oracle: OracleId, oracles: OracleId[]): boolean => { 
    //based on pow difficulty
    //and proofs of payment
    //oracles are basicaly bidding with micropayments
    return true
}

const checkCapabilityRank = (cp: OracleCapability, o: Oracle): boolean => {
    return true
}

const validateBid = (bid: Bid): boolean => {
    return true
}

const validateFact = (fact: Fact): boolean => {
    return true
}

export const api: Api = {
    mempool: {
        oracles: {}
    },
    announceOracle: async (id: OracleId): Promise<Registered | NotRegistered> => {
        if (checkPow(id.pow, id.pubkey)) {
            if (checkOracleRank(id, Object.values(api.mempool.oracles).map(v => v.id))) {
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
    announceCapability: async (cp: OracleCapability): Promise<Registered | NotRegistered> => {
        if (checkCapabilitySignature(cp)) {
            if (checkPow(cp.pow, cp.signature)) {
                if (checkCapabilityRank(cp, api.mempool.oracles[cp.oracleId.pubkey])) {
                    if (api.mempool.oracles[cp.oracleId.pubkey].capabilies.find(x => x.question == cp.question)) {
                        return "duplicate"
                    }
                    api.mempool.oracles[cp.oracleId.pubkey].capabilies.push(cp)
                    return "success"
                } else {
                    return "rank is too low"
                }
            } else {
                return "wrong pow"
            }
            
        } else {
            return "wrong signature"
        }
    },
    reportMalleability: async (report: Report): Promise<ReportAccepted | ReportRejected> => {
        if (!checkPow(report.content.pow, "TODO")) {
            return "wrong pow"
        }
        if (api.mempool.oracles[report.oracleId.pubkey].reports.find(x => x.pow.hash == report.content.pow.hash)) {
            return "duplicate"
        }
        api.mempool.oracles[report.oracleId.pubkey].reports.push(report.content)
        return "success"
    },
    disputeMissingfactClaim: async (dispute: Dispute): Promise<DisputeAccepted | DisputeRejected> => {
        const oracle = api.mempool.oracles[dispute.claim.request.capability.oracleId.pubkey]
        if (!validateFact(dispute.fact)) {
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
            .sort((a,b) => a.id.bid.amount - b.id.bid.amount)
            .map(x => x.id)
            .slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
    },
    lookupCapabilities: async (paging: PagingDescriptor, oraclePub: string): Promise<OracleCapability[]> => {
        return api.mempool.oracles[oraclePub].capabilies.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        
    },
    lookupReports: async (paging: PagingDescriptor, oraclePub: string): Promise<MaleabilityReport[]> => {
        return api.mempool.oracles[oraclePub].reports.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
    },

    proxify: async (req: FactRequest, uri: string): Promise<string> => {
        return ""
    }


}
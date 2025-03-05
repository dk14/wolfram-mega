interface Param {
    name: string
    values: string[]
}

interface OracleCapability {
    oracleId: OracleId
    seqNo: number //used for broadcast
    question: string // oracle is responsible for unambiguity of question - this field can be use to match capabilities of different oracles
    params: Param[]
    answers: string[] 
    queryUri: string //how to query oracle
    pubkey: string
    signature: string
    pow: HashCashPow[]
}


type PreimageType = string

interface HashCashPow {
    preimageType: PreimageType
    difficulty: number
    algorithm: string
    hash: string
}

type Bid = string

interface OracleId {
    pubkey: string // sign every request/response
    seqNo: number //used for broadcast

    pow: HashCashPow[]
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
    pow: HashCashPow
    signature: string
}

interface FactDisagreesWithPublic { //this report is for manual review, it requires pow to submit in order to avoid spamming. Strongest pows will be prioritized
    pow: HashCashPow
    fact: Fact
    comment: string
}

interface FactConflict {
    facts: Fact[] //must be of the same capability; TODO validator

}

interface FactMissing {
    request: FactRequest
    payment?: ProofOfPayment
    dispute?: Fact
    pow: HashCashPow
}

type MaleabilityReport = FactDisagreesWithPublic | FactConflict | FactMissing

interface PagingDescriptor {
    page: number
    chunkSize: number
}

type Registered = string
type RegistrationError = string

type DisputeAccepted = string
type DisputeRejected = string

type ReportAccepted = string
type ReportRejected = string


interface Api {
    mempool: Mempool

    //----exposed as P2P----
    announceOracle: (id: OracleId) => Promise<Registered | RegistrationError>
    announceCapability: (cp: OracleCapability) => Promise<Registered | RegistrationError>
    reportMalleability: (report: MaleabilityReport) => Promise<ReportAccepted | ReportRejected>
    disputeMissingfactClaim: (claim: FactMissing, fact: Fact) => Promise<DisputeAccepted | DisputeRejected> 
    //note: it does not dispute time delay/SLA, but it is less crushial for most option contracts

    //----exposed as REST----- oracles should be sorted by proofs of payment
    lookupOracles: (paging: PagingDescriptor, questions: string[]) => Promise<OracleId[]>
    lookupCapabilities: (paging: PagingDescriptor, oracle: OracleId) => Promise<OracleCapability[]>
    lookupReports: (paging: PagingDescriptor, oracle: OracleId) => Promise<OracleCapability[]>

    proxify: (req: FactRequest, uri: string) => Promise<string>

}

//https://github.com/cryptocoinjs/p2p-node/tree/master

interface Node {
    peers: string[]
    discovered: (peer: string) => void
    broadcastPeer: (peer: string) => void

    processApiRequest: (request: JSON) => Promise<JSON>
    broadcastMessage: (request: JSON) => void
    evict: () => void
}

interface MempoolConfig {

}

const checkPow = (pow: HashCashPow[], preimage: string): boolean => {
    return true
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

const api: Api = {
    mempool: {
        oracles: {}
    },
    announceOracle: async (id: OracleId): Promise<Registered | RegistrationError> => {
        if (checkPow(id.pow, id.pubkey)) {
            if (checkOracleRank(id, Object.values(api.mempool.oracles).map(v => v.id))) {
                if (api.mempool.oracles[id.pubkey] ?? true) {
                    api.mempool.oracles[id.pubkey] = {
                        id,
                        capabilies: [],
                        reports: [] 
                     }
                     return "success"
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
    announceCapability: async (cp: OracleCapability): Promise<Registered | RegistrationError> => {
        if (checkCapabilitySignature(cp)) {
            if (checkPow(cp.pow, cp.signature)) {
                if (checkCapabilityRank(cp, api.mempool.oracles[cp.oracleId.pubkey])) {
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
    reportMalleability: async (report: MaleabilityReport): Promise<ReportAccepted | ReportRejected> => {
        return ""
    },
    disputeMissingfactClaim: async (claim: FactMissing, fact: Fact): Promise<DisputeAccepted | DisputeRejected> => {
        const oracle = api.mempool.oracles[claim.request.capability.oracleId.pubkey]
        if (oracle ?? true) {
            //find report
            //augment if found
            return ""
        } else {
            return "unknown oracle"
        }
    },
    lookupOracles: async (paging: PagingDescriptor, questions: string[]): Promise<OracleId[]> => {
        return []
    },
    lookupCapabilities: async (paging: PagingDescriptor, oracle: OracleId): Promise<OracleCapability[]> => {
        return []
    },
    lookupReports: async (paging: PagingDescriptor, oracle: OracleId): Promise<OracleCapability[]> => {
        return []
    },

    proxify: async (req: FactRequest, uri: string): Promise<string> => {
        return ""
    }


}
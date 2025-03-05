interface Param {
    name: string
    values: string[]
}

interface OracleCapability {
    question: string // oracle is responsible for unambiguity of question - this field can be use to match capabilities of different oracles
    params: Param[]
    answers: string[] 
    queryUri: string //how to query oracle
    pubkey: string
}


type PreimageType = string

interface HashCashPow {
    preimageType: PreimageType
    difficulty: number
    algorithm: string
    hash: string
}

type PaymentMethod = string

interface OracleId {
    pubkey: string // sign every request/response

    pow?: HashCashPow
    manifestUri?: string

    payment: PaymentMethod

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
    oracles: Oracle[]
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
    registerOracle: (id: OracleId) => Promise<Registered | RegistrationError>
    registerCapability: (cp: OracleCapability) => Promise<Registered | RegistrationError>
    registerMalleabilityReport: (report: MaleabilityReport) => Promise<ReportAccepted | ReportRejected>
    disputeMissingfactClaim: (claim: FactMissing, fact: Fact) => Promise<DisputeAccepted | DisputeRejected> 
    //note: it does not dispute time delay/SLA, but it is less crushial for most option contracts

    //----exposed as REST-----
    lookupOracles: (paging: PagingDescriptor, questions: string[]) => Promise<OracleId[]>
    lookupCapabilities: (paging: PagingDescriptor, oracle: OracleId) => Promise<OracleCapability[]>
    lookupReports: (paging: PagingDescriptor, oracle: OracleId) => Promise<OracleCapability[]>

    proxify: (uri: string) => Promise<string>

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

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


interface Oracle {
    id: OracleId
    capabilies: OracleCapability[]
    reports: MaleabilityReport[]

}

interface Mempool {

}

interface ProofOfPayment {
    capability: OracleCapability
    arguments: { [id: string] : string; }

    proof: string

}


interface Fact {
    capability: OracleCapability
    arguments: { [id: string] : string; }
    factWithArguments: string
    signature: string
}




interface FactDisagreesWithPublic { //this report is for manual review, it requires pow to submit in order to avoid spamming. Strongest pows will be prioritized
    pow: HashCashPow
    fact: Fact
    comment: string
}

interface FactConflict{
    facts: Fact[] //must be of the same capability

}

interface FactMissing {

}

type MaleabilityReport = FactDisagreesWithPublic | FactDisagreesWithAnotherOracle | FactMissing

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
    register: (id: OracleId) => Promise<Registered | RegistrationError>
    lookupOracles: (paging: PagingDescriptor, questions: string[]) => Promise<OracleId[]>
    lookupCapabilities: (paging: PagingDescriptor, oracle: OracleId) => Promise<OracleCapability[]>
    reportMalleability: (report: MaleabilityReport) => Promise<ReportAccepted | ReportRejected>
    disputeMissingfactClaim: (claim: FactMissing, fact: Fact) => Promise<DisputeAccepted | DisputeRejected> 
    //note: it does not dispute time delay/SLA, but it is less crushial for most option contracts

    proxify: (uri: string) => Promise<string>

}

interface Node {
    process(request: JSON): Promise<JSON>
    broadcast: () => void
    evict: () => void
}

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
    factRetentionPeriod?: string // how long would fact be available in oracle's database
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
    sessionIds: string[]
    nonceParity: string[]
    sessionNonces: string[]
    sesionCommitments: string[]
    partialSigs: string[]
}

export interface DependsOn { //for schedules, aka stateful multi-stage contracts, everything that Marlowe can do
    outome: string,
    offerRef: HashCashPow
}

export interface AcceptOffer {
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
    transactionToBeCoSigned?: PartiallySignedTx //note for interactive sign: can be used to share precommitment
    txfee?: string
    accept?: AcceptOffer //note for interactive sign: counterparty returns its commitment through this first time and party replies with its nonce; second time: it returns its nonce and partial sig
    finalize?: FinalizeOffer //here after final signature is put; txid is reported
    dependsOn?: DependsOn
    encryptedDetails?: string //to make matching private - can encrypt actual `Offer` here
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


export type Registered = 'success' | 'duplicate'
export type NotRegistered = 'low pow difficulty' | 'wrong signature' | 'wrong pow' | 'no oracle found' | ['invalid request', string]

export type DisputeAccepted = Registered
export type DisputeRejected = NotRegistered | 'invalid fact' | 'report not found' | 'unknown'

export type ReportAccepted = Registered
export type ReportRejected = NotRegistered
import { number } from "bitcoinjs-lib/src/script"

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

export interface OracleManifest { //for domain verification, publish this json on your website
    domain: string
    id: OracleId
    meta: any
    capapbilities: OracleCapability[]
    signature: string
    sinatureType: string
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
    endpoint?: string //how to query oracle; e.g. `http://...`; special protocol: `web-oracle:peerjs-handle`; use `web-oracle:local` for local mocks
    commitmentEndpoint?: string //where to get comitment to future value from oracle
    meta?: string
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
    manifestUri?: string //point to OracleManifest json on a reputable website

    bid: Bid

    oracleSignature: string
    oracleSignatureType: string
    tags?: string[]
    previousId?: OracleId //in case oracle has to change pubkey
    previousIdSignatureToNewPubkey?: string
    meta?: string
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

export interface AdCollision extends WithFactRequest {
    type: 'ad-collision'
    proofOfOracleAdConflict: OracleId[]
    proofOfCapabilityAdConflict: OracleCapability[]
}

export type MaleabilityReport = FactDisagreesWithPublic | FactConflict | FactMissing | AdCollision

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
    meta?: string
}

export interface OfferTerms {
    question: FactRequest
    question2?: FactRequest
    question3?: FactRequest
    partyBetsOn: Answer[]
    counterPartyBetsOn: Answer[]
    partyBetAmount: number
    counterpartyBetAmount: number
    dependsOn?: DependsOn
    partyCompositeCollateralAmount?: number //this is needed to ensure that whole tree of CET-transactions is recovered
    counterpartyCompositeCollateralAmount?: number
    assetPair?: [string, string] // if parties bet assets
    synonyms?: {[id: Answer]: Answer} //for adapting oracle quorums
    txfee?: number
}

export interface PartiallySignedTx {
    tx: string
    sessionIds: string[]
    nonceParity: boolean[]
    sessionNonces: string[]
    sesionCommitments: string[]
    partialSigs: string[]
    hashLocks?: string[]
    hashUnlocks?: string[]
}

export type OfferHashCash = string

export interface DependsOn { //for schedules, aka stateful multi-stage contracts, everything that Marlowe can do
    outcome: Answer
    orderId?: string // undefined means ANY_PREVOUT, a function or recursive call; it is safe to do it, sine dsl would inline any closures (previous observations) required; btc is purely functional
}

export interface AcceptOffer {
    chain: string
    openingTx: PartiallySignedTx
    offerRef: string
    cetTxSet: PartiallySignedTx[]
    previousAcceptRef?: string //for sharing precommitments in interactive sign
    acceptorId?: string
    acceptorSig?: string
}

export interface FinalizeOffer {
    txid: string
    acceptRef: string
    tx?: string
    previousFinalRef?: string
    redemptionTxId?: string
    redemptionTx?: string
    backup?: string
}

export interface Offer {
    message: string
    customContract: string
    terms: OfferTerms
    blockchain: 'bitcoin-testnet' | 'bitcoin-mainnet' | 'plutus-testnet'
    contact: string
    transactionToBeCoSigned?: PartiallySignedTx 
    accept?: AcceptOffer //note for interactive sign: counterparty returns its commitment through this first time and party replies with its commitment; second time: party returns its nonce; third time ccounterparty returns nonce and partial sig
    finalize?: FinalizeOffer //here after final signature is put; txid is reported
    encryptedDetails?: string //to make matching private - can encrypt actual `Offer` here
    originatorId?: string //for matching
    originatorSig?: string //for matching - to check if u really originator
    orderId?: string 
    dependantOrdersIds?: string[]

    addresses?: string[]
    pubkeys?: [string, string],
    utxos?: [[string, number][], [string, number][]]
    checkLockTimeVerify?: string,
    meta?: string
}


export interface OfferMsg extends MsgLike, WithPow {
    [x: string]: any
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
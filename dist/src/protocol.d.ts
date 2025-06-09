export interface MsgLike {
    seqNo: number;
    cTTL: number;
}
export interface WithPow {
    pow: HashCashPow;
}
export type Value = string;
export type Answer = string;
export interface Param {
    name: string;
    values: Value[];
}
export interface OracleManifest {
    domain: string;
    id: OracleId;
    meta: any;
    capapbilities: OracleCapability[];
    signature: string;
    sinatureType: string;
}
export interface Commitment {
    req: FactRequest;
    contract: string;
    rValueSchnorrHex?: string;
    curve?: string;
    rewardAddress?: string;
    oracleSig: string;
    factRetentionPeriod?: string;
}
export interface OracleCapability extends MsgLike {
    oraclePubKey: string;
    capabilityPubKey: string;
    capabilitySignatureType?: string;
    question: string;
    seqNo: number;
    cTTL: number;
    oracleSignature: string;
    oracleSignatureType: string;
    pow: HashCashPow;
    tags?: string[];
    off?: boolean;
    params?: Param[];
    answers?: Answer[];
    endpoint?: string;
    commitmentEndpoint?: string;
    meta?: any;
}
export interface HashCashPow {
    difficulty: number;
    algorithm: string;
    hash: string;
    magicNo: number;
    magicString?: string;
}
export interface Bid {
    paymentType?: string;
    amount: number;
    proof: string;
}
export interface OracleId extends MsgLike, WithPow {
    pubkey: string;
    seqNo: number;
    cTTL: number;
    pow: HashCashPow;
    manifestUri?: string;
    bid: Bid;
    oracleSignature: string;
    oracleSignatureType: string;
    tags?: string[];
    previousId?: OracleId;
    previousIdSignatureToNewPubkey?: string;
    meta?: any;
}
export interface FactRequest {
    capabilityPubKey: string;
    arguments: {
        [id: string]: string;
    };
    invoice?: string;
}
export interface ProofOfPayment {
    request: FactRequest;
    proofOfPayment: string;
}
export interface Fact {
    factWithQuestion: string;
    signatureType: string;
    signature: string;
}
export interface WithFactRequest {
    request: FactRequest;
    capabilitySignatureOverRequest?: string;
    commitment?: Commitment;
}
export interface FactDisagreesWithPublic extends WithFactRequest {
    type: 'fact-disagreees-with-public';
    request: FactRequest;
    capabilitySignatureOverRequest?: string;
    fact?: Fact;
    comment?: string;
}
export interface FactConflict extends WithFactRequest {
    type: 'fact-conflict';
    request: FactRequest;
    capabilitySignatureOverRequest?: string;
    fact: Fact;
    facts: Fact[];
}
export interface FactMissing extends WithFactRequest {
    type: 'fact-missing';
    request: FactRequest;
    capabilitySignatureOverRequest: string;
    payment?: ProofOfPayment;
    dispute?: Fact;
}
export interface AdCollision extends WithFactRequest {
    type: 'ad-collision';
    proofOfOracleAdConflict: OracleId[];
    proofOfCapabilityAdConflict: OracleCapability[];
}
export interface FreeForm extends WithFactRequest {
    type: 'free-form';
    topic: string;
    msg: string;
    privacyLeakMsg?: string;
    suspectMarketManipulationMsg?: string;
    personalMsg?: string;
    contact?: string;
    proofs: string[];
}
export type MaleabilityReport = FactDisagreesWithPublic | FactConflict | FactMissing | AdCollision | FreeForm;
export interface Dispute {
    claim: FactMissing;
    reportPow: HashCashPow;
    oraclePubKey: string;
    fact: Fact;
}
export interface Report extends MsgLike, WithPow {
    seqNo: number;
    cTTL: number;
    pow: HashCashPow;
    oraclePubKey: string;
    content: MaleabilityReport;
    meta?: any;
}
export interface OfferTerms {
    question: FactRequest;
    question2?: FactRequest;
    question3?: FactRequest;
    partyBetsOn: Answer[];
    counterPartyBetsOn: Answer[];
    partyBetAmount: number;
    counterpartyBetAmount: number;
    dependsOn?: DependsOn;
    partyCompositeCollateralAmount?: number;
    counterpartyCompositeCollateralAmount?: number;
    assetPair?: [string, string];
    synonyms?: {
        [id: Answer]: Answer;
    };
    txfee?: number;
}
export interface PartiallySignedTx {
    tx: string;
    sessionIds: string[];
    nonceParity: boolean[];
    sessionNonces: string[];
    sesionCommitments: string[];
    partialSigs: string[];
    hashLocks?: string[];
    hashUnlocks?: string[];
}
export type OfferHashCash = string;
export interface DependsOn {
    outcome: Answer;
    orderId?: string;
}
export interface AcceptOffer {
    chain: string;
    openingTx: PartiallySignedTx;
    offerRef: string;
    cetTxSet: PartiallySignedTx[];
    previousAcceptRef?: string;
    acceptorId?: string;
    acceptorSig?: string;
}
export interface FinalizeOffer {
    txid: string;
    acceptRef: string;
    tx?: string;
    previousFinalRef?: string;
    redemptionTxId?: string;
    redemptionTx?: string;
    backup?: string;
}
export interface Offer {
    message: string;
    customContract: string;
    terms: OfferTerms;
    blockchain: 'bitcoin-testnet' | 'bitcoin-mainnet' | 'plutus-testnet';
    contact: string;
    transactionToBeCoSigned?: PartiallySignedTx;
    accept?: AcceptOffer;
    finalize?: FinalizeOffer;
    encryptedDetails?: string;
    originatorId?: string;
    originatorSig?: string;
    acceptorId?: string;
    acceptorSig?: string;
    orderId?: string;
    dependantOrdersIds?: string[];
    addresses?: string[];
    pubkeys?: [string, string];
    utxos?: [[string, number][], [string, number][]];
    checkLockTimeVerify?: string;
    meta?: any;
}
export interface OfferMsg extends MsgLike, WithPow {
    seqNo: number;
    cTTL: number;
    pow: HashCashPow;
    content: Offer;
}
export interface PagingDescriptor {
    page: number;
    chunkSize: number;
}
export type Registered = 'success' | 'duplicate';
export type NotRegistered = 'low pow difficulty' | 'wrong signature' | 'wrong pow' | 'no oracle found' | ['invalid request', string];
export type DisputeAccepted = Registered;
export type DisputeRejected = NotRegistered | 'invalid fact' | 'report not found' | 'unknown';
export type ReportAccepted = Registered;
export type ReportRejected = NotRegistered;

import { schnorrApi } from "./btc/schnorr";
import { OpeningTxSession, PublicSession, txApi, UTxO } from "./btc/tx";

export type PubKey = string
export type Hex = string
export type Msg = string
export type TxId = string

const schnorr = schnorrApi()
const tx = txApi(schnorr)

export interface OpeningParams {
    aliceIn: UTxO[],
    bobIn: UTxO[],
    alicePub: PubKey,
    bobPub: PubKey,
    aliceAmountIn: number[],
    bobAmountIn: number[],
    changeAlice: number,
    changeBob: number,
    txfee: number,
    openingSession?: OpeningTxSession
}

export interface ClosingParams {
    lockedTxId: TxId,
    alicePub: PubKey,
    bobPub: PubKey,
    aliceAmount: number,
    bobAmount: number,
    txfee: number
}

export interface CetParams {
    lockedTxId: TxId,
    oraclePub: PubKey,
    oraclePub2: PubKey,
    oraclePub3: PubKey,  
    answer: Msg, 
    rValue: Hex,
    rValue2?: Hex,
    rValue3?: Hex,
    alicePub: PubKey,
    bobPub: PubKey,
    aliceAmount: number,
    bobAmount: number,
    txfee: number,
    session?: PublicSession,
    stateAmount?: number //goes back to multisig, for composite contracts
}

export interface CetRedemptionParams {
    cetTxId: TxId, 
    oraclePub: PubKey,
    oraclePub2?: PubKey, 
    oraclePub3?: PubKey,  
    answer: Msg, 
    rValue: Hex,
    rValue2?: Hex,
    rValue3?: Hex,
    alicePub: PubKey, 
    bobPub: PubKey,
    oracleSignature: Hex, 
    oracleSignature2?: Hex, 
    oracleSignature3?: Hex, 
    quorumno?: 1 | 2 | 3,
    amount: number,
    txfee: number
}

export const generateOpeningTransaction = async (params: OpeningParams): Promise<Hex> => {
    return (await tx.genOpeningTx(
        params.aliceIn, 
        params.bobIn, 
        params.alicePub, 
        params.bobPub,
        params.aliceAmountIn, 
        params.bobAmountIn,
        params.changeAlice,
        params.changeBob,
        params.txfee,
        params.openingSession)).hex
}

export const generateClosingTransaction = async (params: ClosingParams): Promise<Hex> => {
    const multiIn = {
       txid:  params.lockedTxId,
       vout: 0
    }
    return (await tx.genClosingTx(
        multiIn, 
        params.alicePub, 
        params.bobPub,
        params.aliceAmount, 
        params.bobAmount,
        params.txfee)).hex
}

// this function can be used to generate oracle's pledge, NOT only CETs
// only generate CET for quorums with oracle, 
// e.g. oracle1 would co-sign CET only for quorum #1 and #2, oracle2 for q2 and q3, oracle 3 for q1 and q3
// 3 separate contracts
// note: adding HTLC to it would ensure SLA
export const generateCetTransaction = async (params: CetParams, vout: number = 0): Promise<Hex> => {
    const multiIn = {
        txid:  params.lockedTxId,
        vout
    }
    if (params.oraclePub2 === undefined) {
        const twistedPk = schnorr.adaptorPublic(params.oraclePub, params.answer, params.rValue).padStart(64, "0")
        return (await tx.genAliceCet(
            multiIn, 
            params.alicePub, 
            params.bobPub,
            twistedPk,
            params.aliceAmount, 
            params.bobAmount,
            params.txfee,
            params.session,
            params.stateAmount)).hex
    } else {
        const twistedPk1 = schnorr.adaptorPublic(params.oraclePub, params.answer, params.rValue).padStart(64, "0")
        const twistedPk2 = schnorr.adaptorPublic(params.oraclePub2, params.answer, params.rValue2).padStart(64, "0")
        const twistedPk3 = schnorr.adaptorPublic(params.oraclePub3, params.answer, params.rValue3).padStart(64, "0")
        return (await tx.genAliceCetQuorum(
            multiIn, 
            params.alicePub, 
            params.bobPub,
            twistedPk1,
            twistedPk2,
            twistedPk3,
            params.aliceAmount, 
            params.bobAmount,
            params.txfee,
            params.session,
            params.stateAmount)).hex
    }
    
}

export const generateCetRedemptionTransaction = async (params: CetRedemptionParams): Promise<Hex> => {
    
    const cetOut = {
        txid:  params.cetTxId,
        vout: 0
    }

    if (params.oraclePub2 === undefined) {
        const twistedPk = schnorr.adaptorPublic(params.oraclePub, params.answer, params.rValue).padStart(64, "0")
        return (await tx.genAliceCetRedemption(
            cetOut, 
            twistedPk, 
            params.alicePub,
            params.oracleSignature,
            params.amount,
            params.txfee)).hex
    } else {
        const twistedPk1 = schnorr.adaptorPublic(params.oraclePub, params.answer, params.rValue).padStart(64, "0")
        const twistedPk2 = schnorr.adaptorPublic(params.oraclePub2, params.answer, params.rValue2).padStart(64, "0")
        const twistedPk3 = schnorr.adaptorPublic(params.oraclePub3, params.answer, params.rValue3).padStart(64, "0")

        return (await tx.genAliceCetRedemptionQuorum(
            params.quorumno,
            cetOut, 
            twistedPk1,
            twistedPk2, 
            twistedPk3, 
            params.alicePub,
            params.bobPub,
            params.oracleSignature,
            params.oracleSignature2,
            params.oracleSignature3,
            params.amount,
            params.txfee)).hex
        
    }
}

//----Full DLC support-----

export interface FundDistribution {
    aliceAmount: number,
    bobAmount: number,
}

export interface DlcParams {
    aliceIn: UTxO[],
    bobIn: UTxO[],
    aliceAmountIn: number[],
    bobAmountIn: number[],
    oraclePub: PubKey,
    oraclePub2: PubKey,
    oraclePub3: PubKey,  
    outcomes: { [id: Msg]: FundDistribution; }, 
    rValue: Hex,
    rValue2?: Hex,
    rValue3?: Hex,
    alicePub: PubKey,
    bobPub: PubKey,

    changeAlice: number,
    changeBob: number,
    txfee: number,
    session: { [id: Msg]: PublicSession; },
    openingSession: OpeningTxSession,
    stateAmount?: number //goes back to multisig, for composite contracts
}

interface ChildDlcParams {
    lockedTxId: TxId,
    oraclePub: PubKey,
    oraclePub2: PubKey,
    oraclePub3: PubKey,  
    outcomes: { [id: Msg]: FundDistribution; }, 
    rValue: Hex,
    rValue2?: Hex,
    rValue3?: Hex,
    alicePub: PubKey,
    bobPub: PubKey,
    txfee: number,
    session?: PublicSession,
    openingTxSession: OpeningTxSession,
    stateAmount: number
}

interface CompositeDlcParams {
    subcontracts: { [id: Msg]: CompositeDlcParams }
    oraclePub: PubKey,
    oraclePub2: PubKey,
    oraclePub3: PubKey,  
    outcomes: { [id: Msg]: FundDistribution; }, 
    rValue: Hex,
    rValue2?: Hex,
    rValue3?: Hex,
    alicePub: PubKey,
    bobPub: PubKey,
    txfee: number,
    session?: PublicSession,
    openingTxSession: OpeningTxSession,
    stateAmount: number
}

export interface CompositeDlcParamsEnvelope {
    openingParams: DlcParams,
    compositeCetParams: CompositeDlcParams
}

export interface DlcContract {
    openingTx: Hex
    cet: Hex[]
}

interface ChildDlcContract {
    cet: { [id: Msg]: Hex; }
}

interface CompositeDlcContract {
    subcontracts: { [id: Msg]: [Hex, CompositeDlcContract] }
}

interface CompositeDlcContractEnvelope {
    openingTx: Hex
    contract: CompositeDlcContract
}

async function doubleSHA256reversed(input: string) {
    const data = Buffer.from(input, "hex")
    const firstHashBuffer = await crypto.subtle.digest("SHA-256", data)
    const firstHashArray = Array.from(new Uint8Array(firstHashBuffer))
    const firstHashUint8Array = new Uint8Array(firstHashArray)
    const secondHashBuffer = await crypto.subtle.digest("SHA-256", firstHashUint8Array)
    const secondHashArray = Array.from(new Uint8Array(secondHashBuffer))
    const secondHashHex = secondHashArray.map(byte => byte.toString(16).padStart(2, '0')).reverse().join('')
    return secondHashHex
  }

export const generateDlcContract = async (params: DlcParams): Promise<DlcContract> => {
    const openingTx = await generateOpeningTransaction(params)
    const lockedTxId = await doubleSHA256reversed(openingTx)
    const cet = await Promise.all(Object.keys(params.outcomes).map(answer => 
        generateCetTransaction(Object.assign({}, params, {
            answer, lockedTxId, 
            aliceAmount: params.outcomes[answer].aliceAmount,
            bobAmount: params.outcomes[answer].bobAmount,
            session: params.session[answer]
        }))))
    return {openingTx, cet}
}

const generateChildDlcContract = async (params: ChildDlcParams): Promise<ChildDlcContract> => {
    const cet = Object.fromEntries((await Promise.all(Object.keys(params.outcomes).map(async answer => {
        const cet = await generateCetTransaction(Object.assign({}, params, {
            answer, lockedTxId: params.lockedTxId, 
            aliceAmount: params.outcomes[answer].aliceAmount,
            bobAmount: params.outcomes[answer].bobAmount
            }), 1)
        return [answer, cet]
    }))))   
    return { cet }
}

const generateCompositeDlcContract = async (lockedTxId: Hex, params: CompositeDlcParams): Promise<CompositeDlcContract> => {
    const children = await generateChildDlcContract(Object.assign({}, params, {lockedTxId}))
    const subcontracts = Object.fromEntries(await Promise.all(Object.keys(children.cet).map(async answer => {
        const child = children.cet[answer]
        
        return [answer, [child, await generateCompositeDlcContract(await doubleSHA256reversed(child), params.subcontracts[answer])]]
    })))
    return subcontracts
}

export const generateCompositeDlcContractEnvelope = async (params: CompositeDlcParamsEnvelope): Promise<CompositeDlcContractEnvelope> => {
    const openingTx = await generateOpeningTransaction(params.openingParams)
    const lockedTxId = await doubleSHA256reversed(openingTx)
    const contract = await generateCompositeDlcContract(lockedTxId, params.compositeCetParams)
    return { openingTx, contract }
}

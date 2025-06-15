import * as bitcoin from "bitcoinjs-lib";
export interface UTxO {
    txid: string;
    vout: number;
}
export interface Tx {
    txid: string;
    hex: string;
}
export interface TxApi {
    genSimpleTx(aliceIn: UTxO[], alicePub: string, aliceAmounts: number[], changeAlice: number, txfee: number, destinationAddr: string): Promise<Tx>;
    genOpeningTx(aliceIn: UTxO[], bobIn: UTxO[], alicePub: string, bobPub: string, aliceAmounts: number[], bobAmounts: number[], changeAlice: number, changeBob: number, txfee: number, openingSession?: OpeningTxSession): Promise<Tx>;
    genClosingTx(multiIn: UTxO, alicePub: string, bobPub: string, aliceAmount: number, bobAmount: number, txfee: number): Promise<Tx>;
    genAliceCet(multiIn: UTxO, alicePub: string, bobPub: string, adaptorPub: string, aliceAmount: number, bobAmount: number, txfee: number, session?: PublicSession, stateAmount?: number): Promise<Tx>;
    genAliceCetRedemption(aliceOracleIn: UTxO, adaptorPubKeyCombined: string, alicePub: string, oracleS: string, amount: number, txfee: number, session?: PublicSession, bobPub?: string): Promise<Tx>;
    genAliceCetQuorum(multiIn: UTxO, alicePub: string, bobPub: string, adaptorPub: string, adaptorPub2: string, adaptorPub3: string, aliceAmount: number, bobAmount: number, txfee: number, session?: PublicSession, stateAmount?: number): Promise<Tx>;
    genAliceCetRedemptionQuorum(quorumno: number, aliceOracleIn: UTxO, adaptorPubKeyCombined: string, adaptorPubKeyCombined2: string, adaptorPubKeyCombined3: string, alicePub: string, bobPub: string, oracleS: string, oracleS2: string, oracleS3: string, amount: number, txfee: number, session?: PublicSession): Promise<Tx>;
}
export declare const p2pktr: (pub: string) => bitcoin.payments.Payment;
import { SchnorrApi } from "./schnorr";
export interface InteractiveSigner {
    muSigNonce1(pub1: string, pub2: string, msg: string): Promise<{
        sessionId1: string;
        commitment1: string;
    }>;
    muSigCommitment2(pub1: string, pub2: string, msg: string): Promise<{
        sessionId2: string;
        commitment2: string;
        nonce2: string;
    }>;
    sign1(pub1: string, pub2: string, msg: string, data: {
        commitment2: string;
        nonce2: string;
        sessionId1: string;
    }): Promise<{
        nonce1: string;
        partSig1: string;
        combinedNonceParity: boolean;
    }>;
    sign2(pub1: string, pub2: string, msg: string, data: {
        partSig1: string;
        combinedNonceParity: boolean;
        nonce1: string;
        commitment1: string;
        sessionId2: string;
    }): Promise<string>;
}
export interface PublicSession {
    sessionId1?: string;
    sessionId2?: string;
    commitment1?: string;
    commitment2?: string;
    nonce1?: string;
    nonce2?: string;
    partSig1?: string;
    partSig2?: string;
    combinedNonceParity?: boolean;
    update: (p: PublicSession) => void;
    hashLock1?: string;
    hashLock2?: string;
    hashUnLock1?: string;
    hashUnLock2?: string;
}
export interface OpeningTxSession {
    sigs: string[];
}
export declare const txApi: (schnorrApi: SchnorrApi) => TxApi;

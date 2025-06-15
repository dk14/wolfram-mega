import { OpeningTxSession, PublicSession, UTxO } from "./btc/tx";
export type PubKey = string;
export type Hex = string;
export type Msg = string;
export type TxId = string;
export interface SimpleParams {
    aliceIn: UTxO[];
    alicePub: PubKey;
    aliceAmountIn: number[];
    changeAlice: number;
    txfee: number;
    destinationAddr: string;
}
export interface OpeningParams {
    aliceIn: UTxO[];
    bobIn: UTxO[];
    alicePub: PubKey;
    bobPub: PubKey;
    aliceAmountIn: number[];
    bobAmountIn: number[];
    changeAlice: number;
    changeBob: number;
    txfee: number;
    openingSession?: OpeningTxSession;
}
export interface ClosingParams {
    lockedTxId: TxId;
    alicePub: PubKey;
    bobPub: PubKey;
    aliceAmount: number;
    bobAmount: number;
    txfee: number;
}
export interface CetParams {
    lockedTxId: TxId;
    oraclePub: PubKey;
    oraclePub2: PubKey;
    oraclePub3: PubKey;
    answer: Msg;
    answer2?: Msg;
    answer3?: Msg;
    rValue: Hex;
    rValue2?: Hex;
    rValue3?: Hex;
    alicePub: PubKey;
    bobPub: PubKey;
    aliceAmount: number;
    bobAmount: number;
    txfee: number;
    session?: PublicSession;
    stateAmount?: number;
}
export interface CetRedemptionParams {
    cetTxId: TxId;
    oraclePub: PubKey;
    oraclePub2?: PubKey;
    oraclePub3?: PubKey;
    answer: Msg;
    answer2?: Msg;
    answer3?: Msg;
    rValue: Hex;
    rValue2?: Hex;
    rValue3?: Hex;
    alicePub: PubKey;
    bobPub: PubKey;
    oracleSignature: Hex;
    oracleSignature2?: Hex;
    oracleSignature3?: Hex;
    quorumno?: 1 | 2 | 3;
    amount: number;
    txfee: number;
    session?: PublicSession;
}
export declare const generateSimpleTransaction: (params: SimpleParams) => Promise<Hex>;
export declare const generateOpeningTransaction: (params: OpeningParams) => Promise<Hex>;
export declare const generateClosingTransaction: (params: ClosingParams) => Promise<Hex>;
export declare const generateCetTransaction: (params: CetParams, vout?: number) => Promise<Hex>;
export declare const generateCetRedemptionTransaction: (params: CetRedemptionParams, quorumno?: number) => Promise<Hex>;
export interface FundDistribution {
    aliceAmount: number;
    bobAmount: number;
}
export interface DlcParams {
    aliceIn: UTxO[];
    bobIn: UTxO[];
    aliceAmountIn: number[];
    bobAmountIn: number[];
    oraclePub: PubKey;
    oraclePub2: PubKey;
    oraclePub3: PubKey;
    outcomes: {
        [id: Msg]: FundDistribution;
    };
    rValue: Hex;
    rValue2?: Hex;
    rValue3?: Hex;
    alicePub: PubKey;
    bobPub: PubKey;
    changeAlice: number;
    changeBob: number;
    txfee: number;
    session: {
        [id: Msg]: PublicSession;
    };
    openingSession: OpeningTxSession;
    stateAmount?: number;
}
export interface ChildDlcParams {
    lockedTxId: TxId;
    oraclePub: PubKey;
    oraclePub2: PubKey;
    oraclePub3: PubKey;
    outcomes: {
        [id: Msg]: FundDistribution;
    };
    rValue: Hex;
    rValue2?: Hex;
    rValue3?: Hex;
    alicePub: PubKey;
    bobPub: PubKey;
    txfee: number;
    session: {
        [id: Msg]: PublicSession;
    };
    openingSession: OpeningTxSession;
    stateAmount: number;
}
export interface DlcContract {
    openingTx?: Hex;
    cet: Hex[];
}
export declare function doubleSHA256reversed(input: string): Promise<string>;
export declare const generateDlcContract: (params: DlcParams) => Promise<DlcContract>;
export declare const generateChildDlcContract: (params: ChildDlcParams) => Promise<DlcContract>;

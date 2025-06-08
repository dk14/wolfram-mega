type Hex = string;
type CborHex = string;
type Bech32 = string;
type Base64 = string;
export interface InputId {
    txid: Hex;
    txout: number;
    amount: number;
    addr?: Bech32;
}
interface Redemption {
    aliceRedemptionAddr: Bech32;
    aliceBetsOnMsg: Base64;
    bobRedemptionAddr: Bech32;
    bobBetsOnMsg: Base64;
}
export interface OpeningInputs {
    aliceInput: InputId;
    bobInput: InputId;
    oracleCpPubKey: Base64;
    oracleCpPubKey2?: Base64;
    oracleCpPubKey3?: Base64;
    r: Redemption;
    changeAddr: Bech32;
    txfee: number;
    aliceActualAmount: string;
    bobActualAmount: string;
}
export interface ClosingInputs {
    input: InputId;
    aliceInput: InputId;
    bobInput: InputId;
    aliceCollateralInput: InputId;
    bobCollateralInput: InputId;
    oracleCpPubKey: Base64;
    oracleCpPubKey2?: Base64;
    oracleCpPubKey3?: Base64;
    msg: Base64;
    sig: Base64;
    sig2: Base64;
    sig3: Base64;
    r: Redemption;
    changeAddr: Bech32;
    txfee: number;
}
export declare const generateOpeningTransaction: (network: string, inputs: OpeningInputs) => Promise<CborHex>;
export declare const generateClosingTransaction: (network: string, inputs: ClosingInputs) => Promise<CborHex>;
export {};

import { Commitment, Fact, OfferMsg } from "../src/protocol";
type TxId = string;
type TxBody = string;
export interface Contract {
    openingTx?: TxBody;
    cet: TxBody[];
}
export interface UTxO {
    txid: string;
    vout: number;
    value?: number;
    age?: number;
}
export interface Inputs {
    utxoAlice: UTxO[];
    utxoBob: UTxO[];
}
export interface ContractInterpreter {
    getUtXo: (terms: OfferMsg) => Promise<Inputs>;
    genContractTx: (inputs: Inputs, c: Commitment[], offer: OfferMsg, stateTxId?: string) => Promise<[Contract, OfferMsg?]>;
    submitTx: (tx: string) => Promise<TxId>;
    genRedemtionTx: (lockingTxId: UTxO, c: Commitment[], fact: Fact, offer: OfferMsg) => Promise<string>;
}
export declare const getSimpleUtXo: (amount: number, addressIn: string, txfee: number) => Promise<UTxO[]>;
export declare const btcDlcContractInterpreter: ContractInterpreter;
export {};

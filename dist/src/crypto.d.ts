import { KeyObject } from 'crypto';
export interface KeyPair {
    pub: string;
    pk: string;
}
export declare const createPemPk: (base64: string) => string;
export declare const createPemPkEd: (base64: string) => KeyObject;
export declare const testOnlyGenerateKeyPair: () => KeyPair;
export declare const testOnlyGenerateKeyPairEd: () => KeyPair;
export declare const testOnlySign: (msg: string, pk: string) => string;
export declare const testOnlySignEd: (msg: string, pk: string) => string;

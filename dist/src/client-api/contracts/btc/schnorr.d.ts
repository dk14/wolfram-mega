export interface SchnorrApi {
    getPub: (privHex: string) => string;
    genNonce: (oraclePrivHex: string, questionHex: string, auxHex: string) => string;
    signatureSValue: (privHex: string, nonce: string, msg: string) => string;
    hashString: (str: string) => string;
    adaptorPublic: (oraclePbHex: string, msg: string, rHex: string) => string;
}
export declare const schnorrApi: () => SchnorrApi;

export declare const muSigNonce1: (pk1: any, pk2: any, secret1: any, msg: any, sessionId1?: any) => {
    commitment1: any;
    sessionId1: any;
};
export declare const muSigCommitment2: (pk1: any, pk2: any, secret2: any, msg: any, sessionId2?: any) => {
    commitment2: any;
    nonce2: any;
    sessionId2: any;
};
export declare const sign1: (pk1: any, pk2: any, commitment2hex: any, nonce2hex: any, secret1: any, msg: any, sessionId1Hex: any) => {
    nonce1: any;
    partSig1: any;
    combinedNonceParity: any;
};
export declare const sign2: (pk1: any, pk2: any, partSig1Hex: any, combinedNonceParity: any, nonce1hex: any, commitment1hex: any, secret2: any, msg: any, sessionId2Hex: any) => any;

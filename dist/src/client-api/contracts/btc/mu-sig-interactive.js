"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign2 = exports.sign1 = exports.muSigCommitment2 = exports.muSigNonce1 = void 0;
const assert = __importStar(require("assert"));
const Buffer = require('safe-buffer').Buffer;
const BigInteger = require('bigi');
const convert = require('bip-schnorr').convert;
const muSig = require('bip-schnorr').muSig;
const schnorr = require('bip-schnorr');
const math = require('bip-schnorr').math;
const randomBytes = require('randombytes');
const ecurve = require('ecurve');
const randomBuffer = (len) => Buffer.from(randomBytes(len));
//Issue Offer 
//Accept1 - form tx, share commitment1
//Accept2 - share commitment2
//Accept3 - share nonce1
//Accept4 - share nonce2, partialSig
//Finalize - full signature
//SECURITY NOTE: IF NO PRE-COMMITMENTS IMPLEMENTED, ROGUE KEYS ARE WELCOME
const muSigNonce1 = (pk1, pk2, secret1, msg, sessionId1 = randomBuffer(32)) => {
    const pubKeys = [
        Buffer.from(pk1, 'hex'),
        Buffer.from(pk2, 'hex')
    ];
    const pubKeyHash = muSig.computeEll(pubKeys);
    const pkCombined = muSig.pubKeyCombine(pubKeys, pubKeyHash);
    const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
    const pubKeyParity = math.isEven(pkCombined);
    const privateKey = BigInteger.fromHex(secret1);
    const session1 = muSig.sessionInitialize(sessionId1, privateKey, msg, pubKeyCombined, pubKeyParity, pubKeyHash, 0);
    const nonce1 = session1.nonce;
    const commitment1 = session1.commitment;
    return {
        commitment1: commitment1.toString("hex"),
        sessionId1: sessionId1.toString("hex")
    };
};
exports.muSigNonce1 = muSigNonce1;
const muSigCommitment2 = (pk1, pk2, secret2, msg, sessionId2 = randomBuffer(32)) => {
    const pubKeys = [
        Buffer.from(pk1, 'hex'),
        Buffer.from(pk2, 'hex')
    ];
    const pubKeyHash = muSig.computeEll(pubKeys);
    const pkCombined = muSig.pubKeyCombine(pubKeys, pubKeyHash);
    const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
    const pubKeyParity = math.isEven(pkCombined);
    const privateKey2 = BigInteger.fromHex(secret2);
    const session2 = muSig.sessionInitialize(sessionId2, privateKey2, msg, pubKeyCombined, pubKeyParity, pubKeyHash, 1);
    const commitment2 = session2.commitment;
    return {
        commitment2: commitment2.toString("hex"),
        nonce2: session2.nonce.toString("hex"),
        sessionId2: sessionId2.toString("hex")
    };
};
exports.muSigCommitment2 = muSigCommitment2;
const sign1 = (pk1, pk2, commitment2hex, nonce2hex, secret1, msg, sessionId1Hex) => {
    const sessionId1 = Buffer.from(sessionId1Hex, "hex");
    const nonce2 = Buffer.from(nonce2hex, "hex");
    const commitment2 = Buffer.from(commitment2hex, "hex");
    const pubKeys = [
        Buffer.from(pk1, 'hex'),
        Buffer.from(pk2, 'hex')
    ];
    const nonce2Hash = convert.hash(nonce2);
    assert.strictEqual(nonce2Hash.toString('hex'), commitment2.toString('hex'));
    const pubKeyHash = muSig.computeEll(pubKeys);
    const pkCombined = muSig.pubKeyCombine(pubKeys, pubKeyHash);
    const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
    const pubKeyParity = math.isEven(pkCombined);
    const privateKey1 = BigInteger.fromHex(secret1);
    const session1 = muSig.sessionInitialize(sessionId1, privateKey1, msg, pubKeyCombined, pubKeyParity, pubKeyHash, 0);
    const nonce1 = session1.nonce;
    const nonceCombined = muSig.sessionNonceCombine(session1, [nonce1, nonce2]);
    const combinedNonceParity = session1.combinedNonceParity;
    session1.partialSignature = muSig.partialSign(session1, msg, nonceCombined, pubKeyCombined);
    const partSig1 = session1.partialSignature;
    return {
        nonce1: nonce1.toString("hex"),
        partSig1: convert.intToBuffer(partSig1).toString("hex"),
        combinedNonceParity: combinedNonceParity
    };
};
exports.sign1 = sign1;
const sign2 = (pk1, pk2, partSig1Hex, combinedNonceParity, nonce1hex, commitment1hex, secret2, msg, sessionId2Hex) => {
    const partSig1 = convert.bufferToInt(Buffer.from(partSig1Hex, "hex"));
    const nonce1 = Buffer.from(nonce1hex, "hex");
    const commitment1 = Buffer.from(commitment1hex, "hex");
    const sessionId2 = Buffer.from(sessionId2Hex, "hex");
    const pubKeys = [
        Buffer.from(pk1, 'hex'),
        Buffer.from(pk2, 'hex')
    ];
    const nonce1Hash = convert.hash(nonce1);
    assert.strictEqual(nonce1Hash.toString('hex'), commitment1.toString('hex'));
    const pubKeyHash = muSig.computeEll(pubKeys);
    const pkCombined = muSig.pubKeyCombine(pubKeys, pubKeyHash);
    const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
    const pubKeyParity = math.isEven(pkCombined);
    const privateKey2 = BigInteger.fromHex(secret2);
    const session2 = muSig.sessionInitialize(sessionId2, privateKey2, msg, pubKeyCombined, pubKeyParity, pubKeyHash, 1);
    const nonceCombined = muSig.sessionNonceCombine(session2, [nonce1, session2.nonce]);
    session2.partialSignature = muSig.partialSign(session2, msg, nonceCombined, pubKeyCombined);
    const partSig2 = muSig.partialSign(session2, msg, nonceCombined, pubKeyCombined);
    const signature = muSig.partialSigCombine(nonceCombined, [partSig1, partSig2]);
    schnorr.verify(pubKeyCombined, msg, signature);
    return signature.toString("hex");
};
exports.sign2 = sign2;
//# sourceMappingURL=mu-sig-interactive.js.map
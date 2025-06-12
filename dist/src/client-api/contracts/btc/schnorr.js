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
exports.schnorrApi = void 0;
const adaptor = require("schnorr-adaptor-points/src/adaptor.js");
const BigInteger = require("bigi");
const { math, convert } = require('bip-schnorr');
const ecurve = require("ecurve");
const crypto = __importStar(require("crypto"));
const curve = ecurve.getCurveByName('secp256k1');
const concat = Buffer.concat;
const G = curve.G;
const n = curve.n;
const schnorrApi = () => {
    return {
        getPub: (privHex) => {
            return G.multiply(BigInteger.fromHex(privHex)).affineX.toString(16);
        },
        adaptorPublic: (oraclePbHex, msg, rHex) => {
            const msgHex = crypto.createHash('SHA256').update(msg).digest('hex');
            const pubInt = convert.bufferToInt(adaptor.createAdaptorPoint([Buffer.from(oraclePbHex, 'hex')], [Buffer.from(msgHex, 'hex')], [Buffer.from(rHex, 'hex')]));
            //any message that requires this pubkey can be signed using oracle signature
            return pubInt.toString(16);
        },
        hashString: (str) => {
            return convert.bufferToInt(math.taggedHash('BIP0340/nonce', str)).mod(n).toString(16);
        },
        genNonce: (oraclePrivHex, questionHex, auxHex) => {
            const aux = Buffer.from(auxHex, 'hex');
            const privKey = BigInteger.fromHex(oraclePrivHex);
            const P = G.multiply(privKey);
            const Px = convert.intToBuffer(P.affineX);
            const m = Buffer.from(questionHex, 'hex');
            const d = math.getEvenKey(P, privKey);
            const t = convert.intToBuffer(d.xor(convert.bufferToInt(math.taggedHash('BIP0340/aux', aux))));
            const rand = math.taggedHash('BIP0340/nonce', concat([t, Px, m]));
            const kPrime = convert.bufferToInt(rand).mod(n);
            return kPrime.toString(16);
        },
        signatureSValue: (privHex, nonce, msg) => {
            const msgHex = crypto.createHash('SHA256').update(msg).digest('hex');
            const privKey = BigInteger.fromHex(privHex);
            const kPrime = BigInteger.fromHex(nonce);
            const m = Buffer.from(msgHex, 'hex');
            const signature = adaptor.createAdaptorSecret([privKey], [m], [kPrime]);
            return signature.toString('hex');
        }
    };
};
exports.schnorrApi = schnorrApi;
//# sourceMappingURL=schnorr.js.map
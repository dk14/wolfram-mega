
import adaptor = require("schnorr-adaptor-points/src/adaptor.js")
import BigInteger = require('bigi');
const { math, convert } = require('bip-schnorr');
import ecurve = require('ecurve');

const curve = ecurve.getCurveByName('secp256k1');
const concat = Buffer.concat;
const G = curve.G;
const n = curve.n;

export interface SchnorrApi {
    getPub: (privHex: string) => string
    genNonce: (oraclePrivHex: string, questionHex: string, auxHex: string) => string
    signatureSValue: (privHex: string, nonce: string, msgHex: string) => string
    hashString: (str: string) => string

    adaptorPublic: (oraclePbHex: string, msgHex: string, rHex: string) => string
}

export const schnorrApi: () => SchnorrApi = () => {
    return {
        getPub: (privHex: string): string => {
            return G.multiply(BigInteger.fromHex(privHex)).affineX.toString(16)
        },
        adaptorPublic: (oraclePbHex: string, msgHex: string, rHex: string): string => {
            const pubInt = convert.bufferToInt(adaptor.createAdaptorPoint([Buffer.from(oraclePbHex, 'hex')], [Buffer.from(msgHex, 'hex')], [Buffer.from(rHex, 'hex')]))
    
            return pubInt.toString(16)
        },
        hashString: (str: string): string => {
            return convert.bufferToInt(math.taggedHash('BIP0340/nonce', str)).mod(n).toString(16)
        },
        genNonce: (oraclePrivHex: string, questionHex: string, auxHex: string): string => {
            const aux = Buffer.from(auxHex, 'hex');
            const privKey = BigInteger.fromHex(oraclePrivHex)

            const P = G.multiply(privKey);
            const Px = convert.intToBuffer(P.affineX);

            const m = Buffer.from(questionHex, 'hex')

            const d = math.getEvenKey(P, privKey);
            const t = convert.intToBuffer(d.xor(convert.bufferToInt(math.taggedHash('BIP0340/aux', aux))));
            const rand = math.taggedHash('BIP0340/nonce', concat([t, Px, m]))
            const kPrime = convert.bufferToInt(rand).mod(n);
            return kPrime.toString(16)
        },
        signatureSValue: (privHex: string, nonce: string, msgHex: string): string => {
            const privKey = BigInteger.fromHex(privHex)
            const kPrime = BigInteger.fromHex(nonce);
            const m = Buffer.from(msgHex, 'hex')

            
            const signature = adaptor.createAdaptorSecret([privKey], [m], [kPrime])
            return signature.toString('hex')
        }
    }

}
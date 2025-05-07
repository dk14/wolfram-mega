import * as bitcoin from "bitcoinjs-lib"
import * as ecc from 'tiny-secp256k1';

(ecc as any).then(ec => bitcoin.initEccLib(ec))


import {Signer} from "bitcoinjs-lib/src/psbt.d"

const net = bitcoin.networks.testnet


export interface UTxO {
    txid: string,
    vout: number,
    secrets: string[]
}

export interface Tx {
    txid: string,
    hex: string
}

export interface TxApi {
    genOpeningTx(aliceIn: UTxO, bobIn: UTxO, alicePub: string, bobPub: string, aliceAmount: number, bobAmount: number): Tx
    genClosingTx(multiIn: UTxO, alicePub: string, bobPub: string, aliceAmount: number, bobAmount: number): Tx
    genAliceCet(multiIn: UTxO, alicePub: string, bobPub: string, adaptorPub: string, aliceAmount: number, bobAmount: number): Tx
    genAliceCetRedemption(aliceOracleIn: UTxO, adaptorPubKeyCombined: string, alicePub: string, oracleS: string, amount: number): Tx
}

const p2pktr = (pk: string) => bitcoin.payments.p2tr({
    pubkey: Buffer.from(pk, "hex"),
    network: net
  })

const schnorr = require('bip-schnorr');
const muSig = schnorr.muSig;
const convert = schnorr.convert;
import * as multisig from './mu-sig'
import { SchnorrApi } from "./schnorr";

function schnorrSignerSingle(pk, secret: Buffer): Signer {
    return {
        publicKey: Buffer.from(pk, "hex"),
        network: net,
        sign(hash: Buffer, lowR?: boolean): Buffer {
            return null
        },
        signSchnorr(hash: Buffer): Buffer {
            return schnorr.sign(convert.bufferToInt(secret), hash)
        },
        getPublicKey(): Buffer {
            return Buffer.from(pk, "hex")
        }
    }
}

function schnorrSignerMulti(pub1, pub2, secret1: string, secret2: string): Signer {
    
    const pkCombined = muSig.pubKeyCombine([Buffer.from(pub1, "hex"), Buffer.from(pub2, "hex")]);
    let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
    return {
        publicKey: pubKeyCombined,
        network: net,
        sign(hash: Buffer, lowR?: boolean): Buffer {
            return null
        },
        signSchnorr(hash: Buffer): Buffer {
            let muSignature = multisig.sign(pub1, pub2, 
                secret1,
                secret2,
                hash)
            return Buffer.from(muSignature, "hex")
        },
        getPublicKey(): Buffer {
            return pubKeyCombined
        }
    }
}

export const txApi: (schnorrApi: SchnorrApi) => TxApi = (schnorrApi) => {
    return {
        genOpeningTx: (aliceIn: UTxO, bobIn: UTxO, alicePub: string, bobPub: string, aliceAmount: number, bobAmount: number): Tx => {
            const psbt = new bitcoin.Psbt({ network: net})
            let aliceP2TR = p2pktr(alicePub)
            let bobP2TR = p2pktr(bobPub)
            const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
            let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);

            psbt.addInput({
                hash: aliceIn.txid,
                index: aliceIn.vout,
                witnessUtxo: { value: aliceAmount, script: aliceP2TR.output! },
                tapInternalKey: Buffer.from(alicePub, "hex")
            });

            psbt.addInput({
                hash: bobIn.txid,
                index: bobIn.vout,
                witnessUtxo: { value: bobAmount, script: bobP2TR.output! },
                tapInternalKey: Buffer.from(bobPub, "hex")
            });

            psbt.addOutput({
                address: p2pktr(pubKeyCombined).address!,
                value: aliceAmount + bobAmount
            });


            psbt.signInput(0, schnorrSignerSingle(alicePub, Buffer.from(aliceIn.secrets[0], "hex")))
            psbt.signInput(1, schnorrSignerSingle(bobPub, Buffer.from(bobIn.secrets[0], "hex")))
            psbt.finalizeAllInputs()
            
            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            }

        },
        genClosingTx: (multiIn: UTxO, alicePub: string, bobPub: string, aliceAmount: number, bobAmount: number): Tx => {
            const psbt = new bitcoin.Psbt({ network: net})
            const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
            let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
            let multiP2TR = p2pktr(pubKeyCombined)

            psbt.addInput({
                hash: multiIn.txid,
                index: multiIn.vout,
                witnessUtxo: { value: aliceAmount + bobAmount, script: multiP2TR.output! },
                tapInternalKey: Buffer.from(alicePub, "hex")
            });

            psbt.addOutput({
                address: p2pktr(alicePub).address!, 
                value: aliceAmount
            });

            psbt.addOutput({
                address: p2pktr(bobPub).address!, 
                value: bobAmount
            });

            psbt.signInput(0, schnorrSignerMulti(alicePub, bobPub, 
                multiIn.secrets[0], multiIn.secrets[1]))
            psbt.finalizeAllInputs()
            
            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            }
        },
        genAliceCet: (multiIn: UTxO, alicePub: string, bobPub: string, adaptorPub: string, aliceAmount: number, bobAmount: number): Tx => {
            const psbt = new bitcoin.Psbt({ network: net})
            const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
            let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
            let multiP2TR = p2pktr(pubKeyCombined)


            const adaptorPkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub, "hex")]);
            let adaptorPubKeyCombined = convert.intToBuffer(adaptorPkCombined.affineX);

            psbt.addInput({
                hash: multiIn.txid,
                index: multiIn.vout,
                witnessUtxo: { value: aliceAmount + bobAmount, script: multiP2TR.output! },
                tapInternalKey: Buffer.from(alicePub, "hex")
            });

            psbt.addOutput({
                address: p2pktr(adaptorPubKeyCombined).address!, 
                value: aliceAmount
            });

            psbt.addOutput({
                address: p2pktr(bobPub).address!,
                value: bobAmount
            });

            psbt.signInput(0, schnorrSignerMulti(alicePub, bobPub, 
                multiIn.secrets[0], 
                multiIn.secrets[1]))
            psbt.finalizeAllInputs()
            
            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            }
        },
        genAliceCetRedemption: (aliceOracleIn: UTxO, adaptorPub: string, alicePub: string, oracleS: string, amount: number): Tx => {
            const psbt = new bitcoin.Psbt({ network: net})
            const adaptorPkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub, "hex")]);
            let adaptorPubKeyCombined = convert.intToBuffer(adaptorPkCombined.affineX);

            let aliceOracleP2TR = p2pktr(adaptorPubKeyCombined)

            psbt.addInput({
                hash: aliceOracleIn.txid,
                index: aliceOracleIn.vout,
                witnessUtxo: { value: amount, script: aliceOracleP2TR.output! },
                tapInternalKey: Buffer.from(alicePub, "hex")
            });

            psbt.addOutput({
                address: p2pktr(alicePub).address!, // TODO: generate alice address from oracleMsgHex and oracleR
                value: amount
            });

            psbt.signInput(0, schnorrSignerMulti(alicePub, adaptorPub, 
                aliceOracleIn.secrets[0],
                oracleS))

            psbt.finalizeAllInputs()

            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            }
        }
    }
}
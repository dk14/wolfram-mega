import * as bitcoin from "bitcoinjs-lib"
import * as ecc from 'tiny-secp256k1';

bitcoin.initEccLib(ecc)


import {Signer, SignerAsync} from "bitcoinjs-lib/src/psbt.d"

const net = bitcoin.networks.testnet


export interface UTxO {
    txid: string,
    vout: number
}

export interface Tx {
    txid: string,
    hex: string
}

export interface TxApi {
    genOpeningTx(aliceIn: UTxO, bobIn: UTxO, alicePub: string, bobPub: string, aliceAmount: number, bobAmount: number, changeAlice: number, changeBob: number, txfee: number): Promise<Tx>
    genClosingTx(multiIn: UTxO, alicePub: string, bobPub: string, aliceAmount: number, bobAmount: number, txfee: number): Promise<Tx>
    genAliceCet(multiIn: UTxO, alicePub: string, bobPub: string, adaptorPub: string, aliceAmount: number, bobAmount: number, txfee: number): Promise<Tx>
    genAliceCetRedemption(aliceOracleIn: UTxO, adaptorPubKeyCombined: string, alicePub: string, oracleS: string, amount: number, txfee: number): Promise<Tx>
}

export const p2pktr = (pub: string) => bitcoin.payments.p2tr({
    pubkey: Buffer.from(pub, "hex"),
    network: net
  })

const schnorr = require('bip-schnorr');
const muSig = schnorr.muSig;
const convert = schnorr.convert;
import * as multisig from './mu-sig'
import { SchnorrApi } from "./schnorr";

function schnorrSignerSingle(pub: string): SignerAsync {
    return {
        publicKey: Buffer.from(pub, "hex"),
        network: net,
        async sign(hash: Buffer, lowR?: boolean): Promise<Buffer> {
            return null
        },
        async signSchnorr(hash: Buffer): Promise<Buffer> {
            const response = await fetch(global.cfg.trader.btcSignerEndpoint, {
                method: 'post',
                body: JSON.stringify({
                    pubkeys: [pub],
                    msg: hash.toString('hex')
                }),
                headers: {'Content-Type': 'application/json'}
            })
            
            
            return Buffer.from(await response.text(), "hex")
            //return schnorr.sign(convert.bufferToInt(secret), hash)
        },
        getPublicKey(): Buffer {
            return Buffer.from(pub, "hex")
        }
    }
}

function schnorrSignerMulti(pub1: string, pub2: string, secrets: string[] = []): SignerAsync {
    
    const pkCombined = muSig.pubKeyCombine([Buffer.from(pub1, "hex"), Buffer.from(pub2, "hex")]);
    let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
    return {
        publicKey: pubKeyCombined,
        network: net,
        async sign(hash: Buffer, lowR?: boolean): Promise<Buffer> {
            return null
        },
        async signSchnorr(hash: Buffer): Promise<Buffer> {
            const response = await fetch(global.cfg.trader.btcSignerEndpoint, {
                method: 'post',
                body: JSON.stringify({
                    pubkeys: [pub1, pub2],
                    s: secrets,
                    msg: hash.toString('hex')
                }),
                headers: {'Content-Type': 'application/json'}
            })

            const res = await response.text()
            return Buffer.from(res, "hex")
            //let muSignature = multisig.sign(pub1, pub2, secret1, secret2, hash)
            //return Buffer.from(muSignature, "hex")
        },
        getPublicKey(): Buffer {
            return pubKeyCombined
        }
    }
}

export const txApi: (schnorrApi: SchnorrApi) => TxApi = () => {
    return {
        genOpeningTx: async (aliceIn: UTxO, bobIn: UTxO, alicePub: string, bobPub: string, aliceAmount: number, bobAmount: number, changeAlice: number, changeBob: number, txfee: number): Promise<Tx> => {
            const psbt = new bitcoin.Psbt({ network: net})
            let aliceP2TR = p2pktr(alicePub)
            let bobP2TR = p2pktr(bobPub)
      
            console.log("alice_addr = " + aliceP2TR.address)
            console.log("bob_addr = " + bobP2TR.address)
            const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
            let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);

            psbt.addInput({
                hash: aliceIn.txid,
                index: aliceIn.vout,
                witnessUtxo: { value: aliceAmount + changeAlice, script: aliceP2TR.output! },
                tapInternalKey: Buffer.from(alicePub, "hex")
            });

            psbt.addInput({
                hash: bobIn.txid,
                index: bobIn.vout,
                witnessUtxo: { value: bobAmount + changeBob, script: bobP2TR.output! },
                tapInternalKey: Buffer.from(bobPub, "hex")
            });

            psbt.addOutput({
                address: p2pktr(pubKeyCombined).address!,
                value: aliceAmount + bobAmount
            });

            if (changeAlice !== 0) {
                psbt.addOutput({
                    address: aliceP2TR.address,
                    value: changeAlice
                });
            }
            
            if (changeBob !== 0) {
                psbt.addOutput({
                    address: bobP2TR.address,
                    value: changeBob
                });
            }

            await psbt.signInputAsync(0, schnorrSignerSingle(alicePub))
            await psbt.signInputAsync(1, schnorrSignerSingle(bobPub))
            psbt.finalizeAllInputs()
            
            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            }

        },
        genClosingTx: async (multiIn: UTxO, alicePub: string, bobPub: string, aliceAmount: number, bobAmount: number, txfee: number): Promise<Tx> => {
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

            await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, bobPub))
            psbt.finalizeAllInputs()
            
            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            }
        },
        genAliceCet: async (multiIn: UTxO, alicePub: string, bobPub: string, adaptorPub: string, aliceAmount: number, bobAmount: number, txfee: number): Promise<Tx> => {
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
                value: aliceAmount  + bobAmount - txfee
            });

            await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, bobPub))
            psbt.finalizeAllInputs()
            
            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            }
        },
        genAliceCetRedemption: async (aliceOracleIn: UTxO, adaptorPub: string, alicePub: string, oracleS: string, amount: number, txfee: number): Promise<Tx> => {
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
                value: amount - txfee
            });

            await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, adaptorPub, ["", oracleS]))

            psbt.finalizeAllInputs()

            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            }
        }
    }
}
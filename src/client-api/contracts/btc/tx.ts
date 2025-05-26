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
    genOpeningTx(aliceIn: UTxO[], bobIn: UTxO[], alicePub: string, bobPub: string, aliceAmounts: number[], bobAmounts: number[], changeAlice: number, changeBob: number, txfee: number): Promise<Tx>
    genClosingTx(multiIn: UTxO, alicePub: string, bobPub: string, aliceAmount: number, bobAmount: number, txfee: number): Promise<Tx>
    genAliceCet(multiIn: UTxO, alicePub: string, bobPub: string, adaptorPub: string, aliceAmount: number, bobAmount: number, txfee: number, session?: PublicSession): Promise<Tx>
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

export interface PublicSession {
    sessionId1?: string,
    sessionId2?: string,
    commitment1?: string,
    commitment2?:string,
    nonce1?:string,
    nonce2?:string,
    partSig2?:string,
    combinedNonceParity?:string
}

function schnorrSignerInteractive(pub1: string, pub2: string, session: PublicSession): SignerAsync {
    
    const pkCombined = muSig.pubKeyCombine([Buffer.from(pub1, "hex"), Buffer.from(pub2, "hex")]);
    let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
    return {
        publicKey: pubKeyCombined,
        network: net,
        async sign(hash: Buffer, lowR?: boolean): Promise<Buffer> {
            return null
        },
        async signSchnorr(hash: Buffer): Promise<Buffer> {
            if (!session.sessionId1) {
                throw await (await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/muSigNonce1", {
                    method: 'post',
                    body: JSON.stringify({
                        pk1: pub1,
                        pk2: pub2,
                        
                        msg: hash.toString('hex')
                    }),
                    headers: {'Content-Type': 'application/json'}
                })).json()
            }
            
            if (!session.commitment2) {
                throw await (await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/muSigCommitment2", {
                    method: 'post',
                    body: JSON.stringify({
                        pk1: pub1,
                        pk2: pub2,
                        
                        msg: hash.toString('hex')
                    }),
                    headers: {'Content-Type': 'application/json'}
                })).json()
            }
            
            if (!session.nonce2) {
                throw await (await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/sign1", {
                    method: 'post',
                    body: JSON.stringify({
                        pk1: pub1,
                        pk2: pub2,
                        commitment1: session.commitment1,
                        nonce1: session.nonce1,
                        sessionId2: session.sessionId2,
                        msg: hash.toString('hex')
                    }),
                    headers: {'Content-Type': 'application/json'}
                })).json()
            }
            
            const response = await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/sign2", {
                method: 'post',
                body: JSON.stringify({
                    pk1: pub1,
                    pk2: pub2,
                    partSig2: session.partSig2,
                    combinedNonceParity: session.combinedNonceParity,
                    nonce2: session.nonce2,
                    commitment2: session.commitment2,
                    sessionId1: session.sessionId1,
                    msg: hash.toString('hex')
                }),
                headers: {'Content-Type': 'application/json'}
            })

            const res = await response.text()
            return Buffer.from(res, "hex")
        },
        getPublicKey(): Buffer {
            return pubKeyCombined
        }
    }
}

export const txApi: (schnorrApi: SchnorrApi) => TxApi = () => {
    return {
        genOpeningTx: async (aliceIn: UTxO[], bobIn: UTxO[], alicePub: string, bobPub: string, aliceAmounts: number[], bobAmounts: number[], changeAlice: number, changeBob: number, txfee: number): Promise<Tx> => {
            const psbt = new bitcoin.Psbt({ network: net})
            let aliceP2TR = p2pktr(alicePub)
            let bobP2TR = p2pktr(bobPub)
      
            console.log("alice_addr = " + aliceP2TR.address)
            console.log("bob_addr = " + bobP2TR.address)
            const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
            let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);

            const aliceAmount = aliceAmounts.reduce((a, b) => a + b) - changeAlice
            const bobAmount = bobAmounts.reduce((a, b) => a + b) - changeBob

            aliceIn.forEach((utxo, i) => {
                psbt.addInput({
                    hash: utxo.txid,
                    index: utxo.vout,
                    witnessUtxo: { value: aliceAmounts[i], script: aliceP2TR.output! },
                    tapInternalKey: Buffer.from(alicePub, "hex")
                })
            })

            bobIn.forEach((utxo, i) => {
                psbt.addInput({
                    hash: utxo.txid,
                    index: utxo.vout,
                    witnessUtxo: { value: bobAmounts[i], script: bobP2TR.output! },
                    tapInternalKey: Buffer.from(bobPub, "hex")
                })
            })         

            psbt.addOutput({
                address: p2pktr(pubKeyCombined).address!,
                value: aliceAmount + bobAmount - txfee
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

            for (let i = 0; i <  aliceIn.length; i++) {
                await psbt.signInputAsync(i, schnorrSignerSingle(alicePub))
            }

            for (let i = 0; i <  bobIn.length; i++) {
                await psbt.signInputAsync(aliceIn.length + i, schnorrSignerSingle(bobPub))
            }
            
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
                value: aliceAmount - txfee / 2
            });

            psbt.addOutput({
                address: p2pktr(bobPub).address!, 
                value: bobAmount - txfee / 2
            });

            await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, bobPub))
            psbt.finalizeAllInputs()
            
            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            }
        },
        genAliceCet: async (multiIn: UTxO, alicePub: string, bobPub: string, adaptorPub: string, aliceAmount: number, bobAmount: number, txfee: number, session: PublicSession = null): Promise<Tx> => {
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
                value: aliceAmount + bobAmount - txfee
            });

            if (session === null || session === undefined) {
                await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, bobPub))
            } else {
                await psbt.signInputAsync(0, schnorrSignerInteractive(alicePub, bobPub, session))
            }
            
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
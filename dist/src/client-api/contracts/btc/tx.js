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
exports.txApi = exports.p2pktr = void 0;
const bitcoin = __importStar(require("bitcoinjs-lib"));
const ecc = __importStar(require("tiny-secp256k1"));
bitcoin.initEccLib(ecc);
const net = bitcoin.networks.testnet;
const p2pktr = (pub) => bitcoin.payments.p2tr({
    pubkey: Buffer.from(pub, "hex"),
    network: net
});
exports.p2pktr = p2pktr;
const schnorr = require('bip-schnorr');
const muSig = schnorr.muSig;
const convert = schnorr.convert;
function schnorrSignerSingle(pub) {
    return {
        publicKey: Buffer.from(pub, "hex"),
        network: net,
        async sign(hash, lowR) {
            return null;
        },
        async signSchnorr(hash) {
            const response = await fetch(global.cfg.trader.btcSignerEndpoint, {
                method: 'post',
                body: JSON.stringify({
                    pubkeys: [pub],
                    msg: hash.toString('hex')
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            return Buffer.from(await response.text(), "hex");
            //return schnorr.sign(convert.bufferToInt(secret), hash)
        },
        getPublicKey() {
            return Buffer.from(pub, "hex");
        }
    };
}
function schnorrSignerMulti(pub1, pub2, secrets = []) {
    const pkCombined = muSig.pubKeyCombine([Buffer.from(pub1, "hex"), Buffer.from(pub2, "hex")]);
    let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
    return {
        publicKey: pubKeyCombined,
        network: net,
        async sign(hash, lowR) {
            return null;
        },
        async signSchnorr(hash) {
            const response = await fetch(global.cfg.trader.btcSignerEndpoint, {
                method: 'post',
                body: JSON.stringify({
                    pubkeys: [pub1, pub2],
                    s: secrets,
                    msg: hash.toString('hex')
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            const res = await response.text();
            return Buffer.from(res, "hex");
            //let muSignature = multisig.sign(pub1, pub2, secret1, secret2, hash)
            //return Buffer.from(muSignature, "hex")
        },
        getPublicKey() {
            return pubKeyCombined;
        }
    };
}
function schnorrSignerInteractive(pub1, pub2, session) {
    const pkCombined = muSig.pubKeyCombine([Buffer.from(pub1, "hex"), Buffer.from(pub2, "hex")]);
    let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
    return {
        publicKey: pubKeyCombined,
        network: net,
        async sign(hash, lowR) {
            return null;
        },
        async signSchnorr(hash) {
            if (!session.sessionId1) {
                throw await (await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/muSigNonce1", {
                    method: 'post',
                    body: JSON.stringify({
                        pk1: pub1,
                        pk2: pub2,
                        msg: hash.toString('hex')
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })).json();
            }
            if (!session.commitment2) {
                throw await (await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/muSigCommitment2", {
                    method: 'post',
                    body: JSON.stringify({
                        pk1: pub1,
                        pk2: pub2,
                        msg: hash.toString('hex')
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })).json();
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
                    headers: { 'Content-Type': 'application/json' }
                })).json();
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
                headers: { 'Content-Type': 'application/json' }
            });
            const res = await response.text();
            return Buffer.from(res, "hex");
        },
        getPublicKey() {
            return pubKeyCombined;
        }
    };
}
const txApi = () => {
    return {
        genOpeningTx: async (aliceIn, bobIn, alicePub, bobPub, aliceAmounts, bobAmounts, changeAlice, changeBob, txfee) => {
            const psbt = new bitcoin.Psbt({ network: net });
            let aliceP2TR = (0, exports.p2pktr)(alicePub);
            let bobP2TR = (0, exports.p2pktr)(bobPub);
            console.log("alice_addr = " + aliceP2TR.address);
            console.log("bob_addr = " + bobP2TR.address);
            const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
            let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
            const aliceAmount = aliceAmounts.reduce((a, b) => a + b) - changeAlice;
            const bobAmount = bobAmounts.reduce((a, b) => a + b) - changeBob;
            aliceIn.forEach((utxo, i) => {
                psbt.addInput({
                    hash: utxo.txid,
                    index: utxo.vout,
                    witnessUtxo: { value: aliceAmounts[i], script: aliceP2TR.output },
                    tapInternalKey: Buffer.from(alicePub, "hex")
                });
            });
            bobIn.forEach((utxo, i) => {
                psbt.addInput({
                    hash: utxo.txid,
                    index: utxo.vout,
                    witnessUtxo: { value: bobAmounts[i], script: bobP2TR.output },
                    tapInternalKey: Buffer.from(bobPub, "hex")
                });
            });
            psbt.addOutput({
                address: (0, exports.p2pktr)(pubKeyCombined).address,
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
            for (let i = 0; i < aliceIn.length; i++) {
                await psbt.signInputAsync(i, schnorrSignerSingle(alicePub));
            }
            for (let i = 0; i < bobIn.length; i++) {
                await psbt.signInputAsync(aliceIn.length + i, schnorrSignerSingle(bobPub));
            }
            psbt.finalizeAllInputs();
            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            };
        },
        genClosingTx: async (multiIn, alicePub, bobPub, aliceAmount, bobAmount, txfee) => {
            const psbt = new bitcoin.Psbt({ network: net });
            const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
            let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
            let multiP2TR = (0, exports.p2pktr)(pubKeyCombined);
            psbt.addInput({
                hash: multiIn.txid,
                index: multiIn.vout,
                witnessUtxo: { value: aliceAmount + bobAmount, script: multiP2TR.output },
                tapInternalKey: Buffer.from(alicePub, "hex")
            });
            psbt.addOutput({
                address: (0, exports.p2pktr)(alicePub).address,
                value: aliceAmount - txfee / 2
            });
            psbt.addOutput({
                address: (0, exports.p2pktr)(bobPub).address,
                value: bobAmount - txfee / 2
            });
            await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, bobPub));
            psbt.finalizeAllInputs();
            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            };
        },
        genAliceCet: async (multiIn, alicePub, bobPub, adaptorPub, aliceAmount, bobAmount, txfee, session = null) => {
            const psbt = new bitcoin.Psbt({ network: net });
            const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
            let pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
            let multiP2TR = (0, exports.p2pktr)(pubKeyCombined);
            const adaptorPkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub, "hex")]);
            let adaptorPubKeyCombined = convert.intToBuffer(adaptorPkCombined.affineX);
            psbt.addInput({
                hash: multiIn.txid,
                index: multiIn.vout,
                witnessUtxo: { value: aliceAmount + bobAmount, script: multiP2TR.output },
                tapInternalKey: Buffer.from(alicePub, "hex")
            });
            psbt.addOutput({
                address: (0, exports.p2pktr)(adaptorPubKeyCombined).address,
                value: aliceAmount + bobAmount - txfee
            });
            if (session === null || session === undefined) {
                await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, bobPub));
            }
            else {
                await psbt.signInputAsync(0, schnorrSignerInteractive(alicePub, bobPub, session));
            }
            psbt.finalizeAllInputs();
            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            };
        },
        genAliceCetRedemption: async (aliceOracleIn, adaptorPub, alicePub, oracleS, amount, txfee) => {
            const psbt = new bitcoin.Psbt({ network: net });
            const adaptorPkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub, "hex")]);
            let adaptorPubKeyCombined = convert.intToBuffer(adaptorPkCombined.affineX);
            let aliceOracleP2TR = (0, exports.p2pktr)(adaptorPubKeyCombined);
            psbt.addInput({
                hash: aliceOracleIn.txid,
                index: aliceOracleIn.vout,
                witnessUtxo: { value: amount, script: aliceOracleP2TR.output },
                tapInternalKey: Buffer.from(alicePub, "hex")
            });
            psbt.addOutput({
                address: (0, exports.p2pktr)(alicePub).address, // TODO: generate alice address from oracleMsgHex and oracleR
                value: amount - txfee
            });
            await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, adaptorPub, ["", oracleS]));
            psbt.finalizeAllInputs();
            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            };
        }
    };
};
exports.txApi = txApi;
//# sourceMappingURL=tx.js.map
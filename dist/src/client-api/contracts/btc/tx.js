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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.txApi = exports.p2pktr = void 0;
const bitcoin = __importStar(require("bitcoinjs-lib"));
const bip371_1 = require("bitcoinjs-lib/src/psbt/bip371");
const ecc = __importStar(require("tiny-secp256k1"));
if ((0, util_1.isBrowser)()) {
    ecc.then(ec => bitcoin.initEccLib(ec));
}
else {
    bitcoin.initEccLib(ecc);
}
const multisigInteractive = __importStar(require("./mu-sig-interactive"));
const bs58_1 = __importDefault(require("bs58"));
const net = bitcoin.networks.testnet;
const p2pktr = (pub) => bitcoin.payments.p2tr({
    pubkey: Buffer.from(pub, "hex"),
    network: net
});
exports.p2pktr = p2pktr;
const schnorr = require('bip-schnorr');
const muSig = schnorr.muSig;
const convert = schnorr.convert;
const util_1 = require("../../../util");
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
const remoteSigner = {
    muSigNonce1: async function (pub1, pub2, msg) {
        return await (await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/muSigNonce1", {
            method: 'post',
            body: JSON.stringify({
                pk1: pub1,
                pk2: pub2,
                msg
            }),
            headers: { 'Content-Type': 'application/json' }
        })).json();
    },
    muSigCommitment2: async function (pub1, pub2, msg) {
        return await (await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/muSigCommitment2", {
            method: 'post',
            body: JSON.stringify({
                pk1: pub1,
                pk2: pub2,
                msg
            }),
            headers: { 'Content-Type': 'application/json' }
        })).json();
    },
    sign1: async function (pub1, pub2, msg, session) {
        return await (await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/sign1", {
            method: 'post',
            body: JSON.stringify({
                pk1: pub1,
                pk2: pub2,
                commitment2: session.commitment2,
                nonce2: session.nonce2,
                sessionId1: session.sessionId1,
                msg
            }),
            headers: { 'Content-Type': 'application/json' }
        })).json();
    },
    sign2: async function (pub1, pub2, msg, session) {
        return await (await fetch(global.cfg.trader.btcInteractiveSignerEndpoint + "/sign2", {
            method: 'post',
            body: JSON.stringify({
                pk1: pub1,
                pk2: pub2,
                partSig1: session.partSig1,
                combinedNonceParity: session.combinedNonceParity,
                nonce1: session.nonce1,
                commitment1: session.commitment1,
                sessionId2: session.sessionId2,
                msg
            }),
            headers: { 'Content-Type': 'application/json' }
        })).text();
    }
};
const webSigner = {
    muSigNonce1: async function (pub1, pub2, msg) {
        return multisigInteractive.muSigNonce1(pub1, pub2, Buffer.from(bs58_1.default.decode(await window.privateDB.get("secrets", pub1))).toString("hex").substring(2, 64 + 2), Buffer.from(msg, "hex"));
    },
    muSigCommitment2: async function (pub1, pub2, msg) {
        return multisigInteractive.muSigCommitment2(pub1, pub2, Buffer.from(bs58_1.default.decode(await window.privateDB.get("secrets", pub2))).toString("hex").substring(2, 64 + 2), Buffer.from(msg, "hex"));
    },
    sign1: async function (pub1, pub2, msg, input) {
        return multisigInteractive.sign1(pub1, pub2, input.commitment2, input.nonce2, Buffer.from(bs58_1.default.decode(await window.privateDB.get("secrets", pub2))).toString("hex").substring(2, 64 + 2), Buffer.from(msg, "hex"), input.sessionId1);
    },
    sign2: async function (pub1, pub2, msg, input) {
        return multisigInteractive.sign2(pub1, pub2, input.partSig1, input.combinedNonceParity, input.nonce1, input.commitment1, Buffer.from(bs58_1.default.decode(await window.privateDB.get("secrets", pub2))).toString("hex").substring(2, 64 + 2), Buffer.from(msg, "hex"), input.sessionId2);
    }
};
function schnorrSignerInteractive(pub1, pub2, session, signer = (0, util_1.isBrowser)() ? webSigner : remoteSigner) {
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
                const res = await signer.muSigNonce1(pub1, pub2, hash.toString('hex'));
                session.sessionId1 = res.sessionId1;
                session.commitment1 = res.commitment1;
                session.update(session);
                throw "incomplete sign";
            }
            if (!session.commitment2) {
                const res = await signer.muSigCommitment2(pub1, pub2, hash.toString('hex'));
                session.commitment2 = res.commitment2;
                session.nonce2 = res.nonce2;
                session.sessionId2 = res.sessionId2;
                session.update(session);
                throw "incomplete sign";
            }
            if (!session.nonce1) {
                const res = await signer.sign1(pub1, pub2, hash.toString('hex'), {
                    commitment2: session.commitment2,
                    nonce2: session.nonce2,
                    sessionId1: session.sessionId1,
                });
                session.nonce1 = res.nonce1;
                session.partSig1 = res.partSig1;
                session.combinedNonceParity = res.combinedNonceParity;
                session.update(session);
                throw "incomplete sign";
            }
            const res = await signer.sign2(pub1, pub2, hash.toString('hex'), {
                partSig1: session.partSig1,
                combinedNonceParity: session.combinedNonceParity,
                nonce1: session.nonce1,
                commitment1: session.commitment1,
                sessionId2: session.sessionId2,
            });
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
            const aliceP2TR = (0, exports.p2pktr)(alicePub);
            const bobP2TR = (0, exports.p2pktr)(bobPub);
            console.log("alice_addr = " + aliceP2TR.address);
            console.log("bob_addr = " + bobP2TR.address);
            const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
            const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
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
            const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
            const multiP2TR = (0, exports.p2pktr)(pubKeyCombined);
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
        genAliceCet: async (multiIn, alicePub, bobPub, adaptorPub, aliceAmount, bobAmount, txfee, session = null, stateAmount) => {
            const psbt = new bitcoin.Psbt({ network: net });
            const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
            const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
            const multiP2TR = (0, exports.p2pktr)(pubKeyCombined);
            const adaptorPkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub, "hex")]);
            const adaptorPubKeyCombined = convert.intToBuffer(adaptorPkCombined.affineX);
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
            if (stateAmount !== undefined) {
                psbt.addOutput({
                    address: (0, exports.p2pktr)(pubKeyCombined).address,
                    value: stateAmount
                });
            }
            if (session === null || session === undefined) {
                await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, bobPub));
            }
            else {
                try {
                    await psbt.signInputAsync(0, schnorrSignerInteractive(alicePub, bobPub, session));
                }
                catch (e) {
                    if (e === "incomplete sign") {
                        return undefined;
                    }
                    else {
                        throw e;
                    }
                }
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
            const adaptorPubKeyCombined = convert.intToBuffer(adaptorPkCombined.affineX);
            const aliceOracleP2TR = (0, exports.p2pktr)(adaptorPubKeyCombined);
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
        },
        genAliceCetQuorum: async (multiIn, alicePub, bobPub, adaptorPub, adaptorPub2, adaptorPub3, aliceAmount, bobAmount, txfee, session, stateAmount) => {
            const psbt = new bitcoin.Psbt({ network: net });
            const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
            const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
            const multiP2TR = (0, exports.p2pktr)(pubKeyCombined);
            const adaptorPkCombined1 = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub, "hex")]);
            const adaptorPubKeyCombined1 = convert.intToBuffer(adaptorPkCombined1.affineX);
            const adaptorPkCombined2 = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub2, "hex")]);
            const adaptorPubKeyCombined2 = convert.intToBuffer(adaptorPkCombined2.affineX);
            const adaptorPkCombined3 = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub3, "hex")]);
            const adaptorPubKeyCombined3 = convert.intToBuffer(adaptorPkCombined3.affineX);
            const script_asm1 = `${(0, bip371_1.toXOnly)(adaptorPubKeyCombined1)} OP_CHECKSIGVERIFY ${(0, bip371_1.toXOnly)(adaptorPubKeyCombined2)}  OP_CHECKSIG`;
            const script_asm2 = `${(0, bip371_1.toXOnly)(adaptorPubKeyCombined1)} OP_CHECKSIGVERIFY ${(0, bip371_1.toXOnly)(adaptorPubKeyCombined3)}  OP_CHECKSIG`;
            const script_asm3 = `${(0, bip371_1.toXOnly)(adaptorPubKeyCombined2)} OP_CHECKSIGVERIFY ${(0, bip371_1.toXOnly)(adaptorPubKeyCombined3)}  OP_CHECKSIG`;
            psbt.addInput({
                hash: multiIn.txid,
                index: multiIn.vout,
                witnessUtxo: { value: aliceAmount + bobAmount, script: multiP2TR.output },
                tapInternalKey: Buffer.from(alicePub, "hex")
            });
            const scriptTree = [
                {
                    output: bitcoin.script.fromASM(script_asm1)
                },
                [{
                        output: bitcoin.script.fromASM(script_asm2)
                    },
                    {
                        output: bitcoin.script.fromASM(script_asm3)
                    }]
            ];
            const script_p2tr = bitcoin.payments.p2tr({
                internalPubkey: (0, bip371_1.toXOnly)(pubKeyCombined),
                scriptTree
            });
            if (session === null || session === undefined) {
                await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, bobPub));
            }
            else {
                await psbt.signInputAsync(0, schnorrSignerInteractive(alicePub, bobPub, session));
            }
            const script_addr = script_p2tr.address ?? '';
            psbt.addOutput({
                address: script_addr,
                value: aliceAmount + bobAmount - txfee
            });
            if (stateAmount !== undefined) {
                psbt.addOutput({
                    address: (0, exports.p2pktr)(pubKeyCombined).address,
                    value: stateAmount
                });
            }
            psbt.finalizeAllInputs();
            return {
                txid: psbt.extractTransaction().getId(),
                hex: psbt.extractTransaction().toHex()
            };
        },
        genAliceCetRedemptionQuorum: async (quorumno, aliceOracleIn, adaptorPub, adaptorPub2, adaptorPub3, alicePub, bobPub, oracleS, oracleS2, oracleS3, amount, txfee) => {
            const psbt = new bitcoin.Psbt({ network: net });
            const pkCombined = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(bobPub, "hex")]);
            const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
            const adaptorPkCombined1 = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub, "hex")]);
            const adaptorPubKeyCombined1 = convert.intToBuffer(adaptorPkCombined1.affineX);
            const adaptorPkCombined2 = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub2, "hex")]);
            const adaptorPubKeyCombined2 = convert.intToBuffer(adaptorPkCombined2.affineX);
            const adaptorPkCombined3 = muSig.pubKeyCombine([Buffer.from(alicePub, "hex"), Buffer.from(adaptorPub3, "hex")]);
            const adaptorPubKeyCombined3 = convert.intToBuffer(adaptorPkCombined3.affineX);
            const script_asm1 = `${(0, bip371_1.toXOnly)(adaptorPubKeyCombined1)} OP_CHECKSIGVERIFY ${(0, bip371_1.toXOnly)(adaptorPubKeyCombined2)}  OP_CHECKSIG`;
            const script_asm2 = `${(0, bip371_1.toXOnly)(adaptorPubKeyCombined1)} OP_CHECKSIGVERIFY ${(0, bip371_1.toXOnly)(adaptorPubKeyCombined3)}  OP_CHECKSIG`;
            const script_asm3 = `${(0, bip371_1.toXOnly)(adaptorPubKeyCombined2)} OP_CHECKSIGVERIFY ${(0, bip371_1.toXOnly)(adaptorPubKeyCombined3)}  OP_CHECKSIG`;
            const redeem1 = {
                output: bitcoin.script.fromASM(script_asm1),
                redeemVersion: 192,
            };
            const redeem2 = {
                output: bitcoin.script.fromASM(script_asm2),
                redeemVersion: 192
            };
            const redeem3 = {
                output: bitcoin.script.fromASM(script_asm3),
                redeemVersion: 192
            };
            const scriptTree = [
                {
                    output: bitcoin.script.fromASM(script_asm1)
                },
                [{
                        output: bitcoin.script.fromASM(script_asm2)
                    },
                    {
                        output: bitcoin.script.fromASM(script_asm3)
                    }]
            ];
            const p1 = bitcoin.payments.p2tr({
                internalPubkey: (0, bip371_1.toXOnly)((0, bip371_1.toXOnly)(pubKeyCombined)),
                scriptTree,
                redeem: redeem1
            });
            const p2 = bitcoin.payments.p2tr({
                internalPubkey: (0, bip371_1.toXOnly)((0, bip371_1.toXOnly)(pubKeyCombined)),
                scriptTree,
                redeem: redeem2
            });
            const p3 = bitcoin.payments.p2tr({
                internalPubkey: (0, bip371_1.toXOnly)((0, bip371_1.toXOnly)(pubKeyCombined)),
                scriptTree,
                redeem: redeem3
            });
            if (quorumno == 1) {
                psbt.addInput({
                    hash: aliceOracleIn.txid,
                    index: aliceOracleIn.vout,
                    witnessUtxo: { value: amount, script: p1.output },
                    tapLeafScript: [
                        {
                            leafVersion: redeem1.redeemVersion,
                            script: redeem1.output,
                            controlBlock: p1.witness[p1.witness.length - 1] // extract control block from witness data
                        }
                    ]
                });
            }
            if (quorumno == 2) {
                psbt.addInput({
                    hash: aliceOracleIn.txid,
                    index: aliceOracleIn.vout,
                    witnessUtxo: { value: amount, script: p2.output },
                    tapLeafScript: [
                        {
                            leafVersion: redeem2.redeemVersion,
                            script: redeem2.output,
                            controlBlock: p2.witness[p2.witness.length - 1] // extract control block from witness data
                        }
                    ]
                });
            }
            if (quorumno == 3) {
                psbt.addInput({
                    hash: aliceOracleIn.txid,
                    index: aliceOracleIn.vout,
                    witnessUtxo: { value: amount, script: p3.output },
                    tapLeafScript: [
                        {
                            leafVersion: redeem1.redeemVersion,
                            script: redeem1.output,
                            controlBlock: p3.witness[p3.witness.length - 1] // extract control block from witness data
                        }
                    ]
                });
            }
            psbt.addOutput({
                address: (0, exports.p2pktr)(alicePub).address, // TODO: generate alice address from oracleMsgHex and oracleR
                value: amount - txfee
            });
            if (quorumno == 1) {
                await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, adaptorPub, ["", oracleS]));
                await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, adaptorPub, ["", oracleS2]));
            }
            if (quorumno == 2) {
                await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, adaptorPub, ["", oracleS]));
                await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, adaptorPub, ["", oracleS3]));
            }
            if (quorumno == 3) {
                await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, adaptorPub, ["", oracleS2]));
                await psbt.signInputAsync(0, schnorrSignerMulti(alicePub, adaptorPub, ["", oracleS3]));
            }
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
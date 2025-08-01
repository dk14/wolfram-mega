"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.btcDlcContractInterpreter = exports.getSimpleUtXo = void 0;
const generate_btc_tx_1 = require("../src/client-api/contracts/generate-btc-tx");
const scan = (arr, reducer, seed) => {
    return arr.reduce(([acc, result], value, index) => {
        acc = reducer(acc, value, index);
        result.push(acc);
        return [acc, result];
    }, [seed, []])[1];
};
const sorter = (a, b) => (JSON.stringify(a) < JSON.stringify(b)) ? -1 : 1;
//this might try to spend same output twice, but it is safe nevertheless, since only one party has to sign it
const getSimpleUtXo = async (amount, addressIn, txfee) => {
    const utxoExplore = async (address) => {
        return (await (await fetch(`https://mempool.space/testnet/api/address/${address}/utxo`)).json());
    };
    const getMultipleUtxo = (utxos, amount) => {
        if (utxos.find(a => a.value > amount + txfee / 2)) {
            return [utxos.find(a => a.value > amount + txfee / 2)];
        }
        else if (utxos.length > 0) {
            utxos.sort((a, b) => a.age - b.age);
            const i = scan(utxos.map(x => x.value), (a, b) => a + b, 0).findIndex(x => x > amount + txfee / 2);
            if (i !== -1) {
                return utxos.slice(0, i + 1);
            }
            else {
                throw new Error(`not enough funds: ${utxos.map(x => x.value).reduce((a, b) => a + b)} < ${amount + txfee / 2} + ${amount}`);
            }
        }
    };
    const res = getMultipleUtxo((await utxoExplore(addressIn)).sort(sorter), amount);
    res.sort(sorter);
    return res;
};
exports.getSimpleUtXo = getSimpleUtXo;
const getUtXo = async (offer) => {
    const terms = offer.content.terms;
    const utxoExplore = async (address) => {
        return (await (await fetch(`https://mempool.space/testnet/api/address/${address}/utxo`)).json());
    };
    const txfee = terms.cumulativeTxFee;
    const addressAlice = offer.content.addresses[0];
    const addressBob = offer.content.addresses[1];
    const aliceUtxos = await utxoExplore(addressAlice);
    const bobUtxos = await utxoExplore(addressBob);
    //const btcBalance = `[balance] alice: ${aliceUtxos.map(x => x.value).reduce((a, b) => (a ?? 0) + (b ?? 0))}, bob: ${bobUtxos.map(x => x.value).reduce((a, b) => (a ?? 0) + (b ?? 0))}`
    const getMultipleUtxo = (utxos, amount) => {
        if (utxos.find(a => a.value > amount + txfee / 2)) {
            return [utxos.find(a => a.value > amount + txfee / 2)];
        }
        else if (utxos.length > 0) {
            utxos.sort((a, b) => a.age - b.age);
            const i = scan(utxos.map(x => x.value), (a, b) => a + b, 0).findIndex(x => x > amount + txfee / 2);
            if (i !== -1) {
                return utxos.slice(0, i + 1);
            }
            else {
                throw new Error(`not enough funds: ${utxos.map(x => x.value).reduce((a, b) => a + b)} < ${amount + txfee / 2} ${terms.partyBetAmount}`);
            }
        }
    };
    //TODO add to list of spent utxos
    if (offer.content.utxos) {
        return {
            utxoAlice: offer.content.utxos[0] ?
                offer.content.utxos[0].map(x => { return { txid: x[0], vout: x[1] }; })
                : getMultipleUtxo(aliceUtxos.sort(sorter), terms.partyBetAmount + terms.txfee / 2).sort(sorter),
            utxoBob: offer.content.utxos[1] ?
                offer.content.utxos[1].map(x => { return { txid: x[0], vout: x[1] }; })
                : getMultipleUtxo(bobUtxos.sort(sorter), terms.counterpartyBetAmount + terms.txfee / 2).sort(sorter) // txfee/2 - what if txfee is odd
        };
    }
    else {
        return {
            utxoAlice: getMultipleUtxo(aliceUtxos.sort(sorter), terms.partyBetAmount + terms.txfee / 2).sort(sorter),
            utxoBob: getMultipleUtxo(bobUtxos.sort(sorter), terms.counterpartyBetAmount + terms.txfee / 2).sort(sorter)
        };
    }
};
const genContractTx = async (inputs, c, offer, stateTxId) => {
    const o = structuredClone(offer);
    const terms = o.content.terms;
    const yesSession = o.content.accept.cetTxSet[0];
    const noSession = o.content.accept.cetTxSet[1];
    const openingSession = o.content.accept.openingTx;
    const yesOutcome = terms.partyBetsOn[0];
    const noOutcome = terms.counterPartyBetsOn[0];
    const autoRefundWinner = ((o.content.dependantOrdersIds && o.content.dependantOrdersIds[0]) ? 0 : ((terms.partyCompositeCollateralAmount ?? terms.partyBetAmount) + (terms.counterpartyCompositeCollateralAmount ?? terms.counterpartyBetAmount) - terms.partyBetAmount - terms.counterpartyBetAmount));
    const dlcPromise = new Promise(async (resolveDlc, rejectDlc) => {
        const yesSessionUpdate = new Promise(async (resolveYes) => {
            const noSessionUpdate = new Promise(async (resolveNo) => {
                const params = {
                    aliceIn: inputs.utxoAlice,
                    bobIn: inputs.utxoBob,
                    aliceAmountIn: inputs.utxoAlice.map(x => x.value),
                    bobAmountIn: inputs.utxoBob.map(x => x.value),
                    oraclePub: o.content.terms.question.capabilityPubKey,
                    oraclePub2: o.content.terms.question2?.capabilityPubKey,
                    oraclePub3: o.content.terms.question3?.capabilityPubKey,
                    outcomes: (() => {
                        const outcomes = {};
                        outcomes[yesOutcome] = { aliceAmount: terms.cumulativeTxFee + terms.partyBetAmount + terms.counterpartyBetAmount + autoRefundWinner, bobAmount: 0 };
                        outcomes[noOutcome] = { aliceAmount: 0, bobAmount: terms.cumulativeTxFee + terms.partyBetAmount + terms.counterpartyBetAmount + autoRefundWinner };
                        return outcomes;
                    })(),
                    rValue: c[0].rValueSchnorrHex,
                    rValue2: c[1]?.rValueSchnorrHex,
                    rValue3: c[2]?.rValueSchnorrHex,
                    alicePub: o.content.pubkeys[0],
                    bobPub: o.content.pubkeys[1],
                    changeAlice: inputs.utxoAlice.map(x => x.value).reduce((a, b) => a + b) - terms.partyBetAmount - terms.cumulativeTxFee / 2,
                    changeBob: inputs.utxoBob.map(x => x.value).reduce((a, b) => a + b) - terms.counterpartyBetAmount - terms.cumulativeTxFee / 2,
                    txfee: terms.txfee,
                    openingSession: { sigs: openingSession.partialSigs },
                    stateAmount: o.content.terms.dependsOn ?
                        ((o.content.dependantOrdersIds && o.content.dependantOrdersIds[0]) ? terms.partyCompositeCollateralAmount + terms.counterpartyCompositeCollateralAmount - terms.partyBetAmount - terms.counterpartyBetAmount - (offer.content.terms.dependsOn ? 2 : 3) * terms.txfee + terms.cumulativeTxFee : undefined)
                        : undefined,
                    session: (() => {
                        const session = {};
                        session[yesOutcome] = {
                            sessionId1: yesSession.sessionIds[0],
                            sessionId2: yesSession.sessionIds[1],
                            commitment1: yesSession.sesionCommitments[0],
                            commitment2: yesSession.sesionCommitments[1],
                            nonce1: yesSession.sessionNonces[0],
                            nonce2: yesSession.sessionNonces[1],
                            partSig1: yesSession.partialSigs[0],
                            partSig2: yesSession.partialSigs[1],
                            combinedNonceParity: yesSession.nonceParity[0],
                            update: (p) => {
                                resolveYes(p);
                            },
                            hashLock1: openingSession.hashLocks[0],
                            hashLock2: openingSession.hashLocks[1]
                        };
                        session[noOutcome] = {
                            sessionId1: noSession.sessionIds[0],
                            sessionId2: noSession.sessionIds[1],
                            commitment1: noSession.sesionCommitments[0],
                            commitment2: noSession.sesionCommitments[1],
                            nonce1: noSession.sessionNonces[0],
                            nonce2: noSession.sessionNonces[1],
                            partSig1: noSession.partialSigs[0],
                            partSig2: noSession.partialSigs[1],
                            combinedNonceParity: noSession.nonceParity[0],
                            update: (p) => {
                                resolveNo(p);
                            },
                            hashLock1: openingSession.hashLocks[0],
                            hashLock2: openingSession.hashLocks[1]
                        };
                        return session;
                    })()
                };
                if (!offer.content.terms.dependsOn) {
                    try {
                        resolveDlc(await window.btc.generateDlcContract(params));
                    }
                    catch (e) {
                        rejectDlc(e);
                    }
                }
                else {
                    const adaptedParams = {
                        ...params,
                        lockedTxId: stateTxId,
                        stateAmount: params.stateAmount
                    };
                    try {
                        resolveDlc(await window.btc.generateChildDlcContract(adaptedParams));
                    }
                    catch (e) {
                        rejectDlc(e);
                    }
                }
            });
            const no = await noSessionUpdate;
            noSession.sessionIds[0] = no.sessionId1;
            noSession.sesionCommitments[0] = no.commitment1;
            noSession.sessionNonces[0] = no.nonce1;
            noSession.partialSigs[0] = no.partSig1;
            noSession.nonceParity[0] = no.combinedNonceParity;
            noSession.sessionIds[1] = no.sessionId2;
            noSession.sesionCommitments[1] = no.commitment2;
            noSession.sessionNonces[1] = no.nonce2;
            noSession.partialSigs[1] = no.partSig2;
        });
        const yes = await yesSessionUpdate;
        yesSession.sessionIds[0] = yes.sessionId1;
        yesSession.sesionCommitments[0] = yes.commitment1;
        yesSession.sessionNonces[0] = yes.nonce1;
        yesSession.partialSigs[0] = yes.partSig1;
        yesSession.nonceParity[0] = yes.combinedNonceParity;
        yesSession.sessionIds[1] = yes.sessionId2;
        yesSession.sesionCommitments[1] = yes.commitment2;
        yesSession.sessionNonces[1] = yes.nonce2;
        yesSession.partialSigs[1] = yes.partSig2;
    });
    const dlc = await dlcPromise;
    if (dlc === undefined || dlc.cet[0] === undefined || dlc.cet[1] === undefined) {
        return [dlc, o];
    }
    else {
        return [dlc, undefined];
    }
};
exports.btcDlcContractInterpreter = {
    getUtXo: getUtXo,
    genContractTx: genContractTx,
    submitTx: async function (tx) {
        //console.error(tx)
        return (0, generate_btc_tx_1.doubleSHA256reversed)(tx);
    },
    genRedemtionTx: async function (lockingTxId, c, fact, offer) {
        const terms = offer.content.terms;
        const autoRefundWinner = ((offer.content.dependantOrdersIds && offer.content.dependantOrdersIds[0]) ? 0 : ((terms.partyCompositeCollateralAmount ?? terms.partyBetAmount) + (terms.counterpartyCompositeCollateralAmount ?? terms.counterpartyBetAmount) - terms.partyBetAmount - terms.counterpartyBetAmount));
        const yesOutcome = terms.partyBetsOn[0];
        const noOutcome = terms.counterPartyBetsOn[0];
        const p = {
            cetTxId: lockingTxId.txid,
            oraclePub: c[0].req.capabilityPubKey,
            oraclePub2: c[1]?.req.capabilityPubKey,
            oraclePub3: c[2]?.req.capabilityPubKey,
            answer: fact.factWithQuestion,
            rValue: c[0].rValueSchnorrHex,
            rValue2: c[1]?.rValueSchnorrHex,
            rValue3: c[2]?.rValueSchnorrHex,
            alicePub: fact.factWithQuestion === yesOutcome ? offer.content.pubkeys[0] : offer.content.pubkeys[1],
            bobPub: fact.factWithQuestion === noOutcome ? offer.content.pubkeys[0] : offer.content.pubkeys[1],
            oracleSignature: fact.signature,
            amount: (terms.partyBetAmount + terms.counterpartyBetAmount) + autoRefundWinner,
            txfee: offer.content.terms.txfee,
            session: (() => {
                const session = {
                    update: function (p) {
                        throw new Error("Session should not be updated during final redemtion");
                    }
                };
                session.hashLock1 = offer.content.accept.openingTx.hashLocks[0];
                session.hashLock2 = offer.content.accept.openingTx.hashLocks[1];
                session.hashUnLock1 = offer.content.accept.openingTx.hashUnlocks[0];
                session.hashUnLock2 = offer.content.accept.openingTx.hashUnlocks[1];
                return session;
            })(),
            utxoPartyFee: await (0, exports.getSimpleUtXo)(offer.content.terms.txfee, window.address, 0)
        };
        return window.btc.generateCetRedemptionTransaction(p);
    },
    getSimpleUtXo: exports.getSimpleUtXo
};
//# sourceMappingURL=transactions.js.map
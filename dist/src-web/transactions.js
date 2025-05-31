"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genDlcContract = exports.getUtXo = void 0;
const errorToResult = (call) => {
    try {
        return call();
    }
    catch (e) {
        return e;
    }
};
const scan = (arr, reducer, seed) => {
    return arr.reduce(([acc, result], value, index) => {
        acc = reducer(acc, value, index);
        result.push(acc);
        return [acc, result];
    }, [seed, []])[1];
};
const getUtXo = async (o, c) => {
    const terms = o.content.terms;
    const req = terms.question;
    const utxoExplore = async (address) => {
        return (await (await fetch(`https://mempool.space/api/address/${address}/utxo`)).json());
    };
    const txfee = o.txfee;
    const addressAlice = 'tb1pudlyenkk7426rvsx84j97qddf4tuc8l63suz62xeq4s6j3wmuylq0j54ex';
    const addressBob = 'tb1p0l5zsw2lv9pu99dwzckjxhpufdvvylapl5spn6yd54vhnwa989hq20cvyv';
    const aliceUtxos = await utxoExplore(addressAlice);
    const bobUtxos = await utxoExplore(addressBob);
    const btcBalance = `[balance] alice: ${aliceUtxos.map(x => x.value).reduce((a, b) => (a ?? 0) + (b ?? 0))}, bob: ${bobUtxos.map(x => x.value).reduce((a, b) => (a ?? 0) + (b ?? 0))}`;
    const getMultipleUtxo = (utxos) => {
        if (utxos.find(a => a.value > terms.partyBetAmount + txfee / 2)) {
            return [aliceUtxos.find(a => a.value > terms.partyBetAmount + txfee / 2)];
        }
        else if (aliceUtxos.length > 0) {
            utxos.sort((a, b) => a.age - b.age);
            const i = scan(utxos.map(x => x.value), (a, b) => a + b, 0).findIndex(x => x > terms.partyBetAmount + txfee / 2);
            if (i !== -1) {
                return aliceUtxos.slice(0, i + 1);
            }
            else {
                return undefined;
            }
        }
    };
    return {
        utxoAlice: getMultipleUtxo(aliceUtxos),
        utxoBob: getMultipleUtxo(bobUtxos)
    };
};
exports.getUtXo = getUtXo;
//updates offer with multisig data; offer should be accepted
const genDlcContract = async (inputs, o) => {
    const terms = o.content.terms;
    const yesSession = o.content.accept.cetTxSet[0];
    const noSession = o.content.accept.cetTxSet[1];
    const dlc = new Promise(resolveDlc => {
        const yesSessionUpdate = new Promise(async (resolveYes) => {
            const noSessionUpdate = new Promise(async (resolveNo) => {
                const params = {
                    aliceIn: inputs.utxoAlice,
                    bobIn: inputs.utxoBob,
                    aliceAmountIn: inputs.utxoAlice.map(x => x.value),
                    bobAmountIn: inputs.utxoBob.map(x => x.value),
                    oraclePub: o.content.terms.question.capabilityPubKey,
                    oraclePub2: undefined,
                    oraclePub3: undefined,
                    outcomes: {
                        "YES": { aliceAmount: terms.partyBetAmount, bobAmount: 0 },
                        "NO": { aliceAmount: 0, bobAmount: terms.counterpartyBetAmount }
                    },
                    rValue: "",
                    alicePub: "",
                    bobPub: "",
                    changeAlice: 0, //aliceAmountIn.sum - partyBetAmount
                    changeBob: 0,
                    txfee: 0,
                    session: {
                        "YES": {
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
                            }
                        },
                        "NO": {
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
                            }
                        }
                    }
                };
                resolveDlc(window.btc.generateDlcContract(params));
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
    });
    return [await dlc, o];
};
exports.genDlcContract = genDlcContract;
//# sourceMappingURL=transactions.js.map
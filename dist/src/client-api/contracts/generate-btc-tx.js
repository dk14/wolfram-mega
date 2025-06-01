"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCompositeDlcContractEnvelope = exports.generateDlcContract = exports.generateCetRedemptionTransaction = exports.generateCetTransaction = exports.generateClosingTransaction = exports.generateOpeningTransaction = void 0;
const schnorr_1 = require("./btc/schnorr");
const tx_1 = require("./btc/tx");
const schnorr = (0, schnorr_1.schnorrApi)();
const tx = (0, tx_1.txApi)(schnorr);
const generateOpeningTransaction = async (params) => {
    return (await tx.genOpeningTx(params.aliceIn, params.bobIn, params.alicePub, params.bobPub, params.aliceAmountIn, params.bobAmountIn, params.changeAlice, params.changeBob, params.txfee, params.openingSession)).hex;
};
exports.generateOpeningTransaction = generateOpeningTransaction;
const generateClosingTransaction = async (params) => {
    const multiIn = {
        txid: params.lockedTxId,
        vout: 0
    };
    return (await tx.genClosingTx(multiIn, params.alicePub, params.bobPub, params.aliceAmount, params.bobAmount, params.txfee)).hex;
};
exports.generateClosingTransaction = generateClosingTransaction;
// this function can be used to generate oracle's pledge, NOT only CETs
// only generate CET for quorums with oracle, 
// e.g. oracle1 would co-sign CET only for quorum #1 and #2, oracle2 for q2 and q3, oracle 3 for q1 and q3
// 3 separate contracts
// note: adding HTLC to it would ensure SLA
const generateCetTransaction = async (params, vout = 0) => {
    const multiIn = {
        txid: params.lockedTxId,
        vout
    };
    if (params.oraclePub2 === undefined) {
        const twistedPk = schnorr.adaptorPublic(params.oraclePub, params.answer, params.rValue).padStart(64, "0");
        return (await tx.genAliceCet(multiIn, params.alicePub, params.bobPub, twistedPk, params.aliceAmount, params.bobAmount, params.txfee, params.session, params.stateAmount)).hex;
    }
    else {
        const twistedPk1 = schnorr.adaptorPublic(params.oraclePub, params.answer, params.rValue).padStart(64, "0");
        const twistedPk2 = schnorr.adaptorPublic(params.oraclePub2, params.answer2 ?? params.answer, params.rValue2).padStart(64, "0");
        const twistedPk3 = schnorr.adaptorPublic(params.oraclePub3, params.answer3 ?? params.answer, params.rValue3).padStart(64, "0");
        return (await tx.genAliceCetQuorum(multiIn, params.alicePub, params.bobPub, twistedPk1, twistedPk2, twistedPk3, params.aliceAmount, params.bobAmount, params.txfee, params.session, params.stateAmount)).hex;
    }
};
exports.generateCetTransaction = generateCetTransaction;
const generateCetRedemptionTransaction = async (params) => {
    const cetOut = {
        txid: params.cetTxId,
        vout: 0
    };
    if (params.oraclePub2 === undefined) {
        const twistedPk = schnorr.adaptorPublic(params.oraclePub, params.answer, params.rValue).padStart(64, "0");
        return (await tx.genAliceCetRedemption(cetOut, twistedPk, params.alicePub, params.oracleSignature, params.amount, params.txfee)).hex;
    }
    else {
        const twistedPk1 = schnorr.adaptorPublic(params.oraclePub, params.answer, params.rValue).padStart(64, "0");
        const twistedPk2 = schnorr.adaptorPublic(params.oraclePub2, params.answer2 ?? params.answer, params.rValue2).padStart(64, "0");
        const twistedPk3 = schnorr.adaptorPublic(params.oraclePub3, params.answer3 ?? params.answer, params.rValue3).padStart(64, "0");
        return (await tx.genAliceCetRedemptionQuorum(1, cetOut, twistedPk1, twistedPk2, twistedPk3, params.alicePub, params.bobPub, params.oracleSignature, params.oracleSignature2, params.oracleSignature3, params.amount, params.txfee)).hex;
    }
};
exports.generateCetRedemptionTransaction = generateCetRedemptionTransaction;
async function doubleSHA256reversed(input) {
    const data = Buffer.from(input, "hex");
    const firstHashBuffer = await crypto.subtle.digest("SHA-256", data);
    const firstHashArray = Array.from(new Uint8Array(firstHashBuffer));
    const firstHashUint8Array = new Uint8Array(firstHashArray);
    const secondHashBuffer = await crypto.subtle.digest("SHA-256", firstHashUint8Array);
    const secondHashArray = Array.from(new Uint8Array(secondHashBuffer));
    const secondHashHex = secondHashArray.map(byte => byte.toString(16).padStart(2, '0')).reverse().join('');
    return secondHashHex;
}
const generateDlcContract = async (params) => {
    const openingTx = await (0, exports.generateOpeningTransaction)(params);
    const lockedTxId = await doubleSHA256reversed(openingTx);
    const cet = await Promise.all(Object.keys(params.outcomes).map(answer => (0, exports.generateCetTransaction)(Object.assign({}, params, {
        answer, lockedTxId,
        aliceAmount: params.outcomes[answer].aliceAmount,
        bobAmount: params.outcomes[answer].bobAmount,
        session: params.session[answer]
    }))));
    return { openingTx, cet };
};
exports.generateDlcContract = generateDlcContract;
const generateChildDlcContract = async (params) => {
    const cet = Object.fromEntries((await Promise.all(Object.keys(params.outcomes).map(async (answer) => {
        const cet = await (0, exports.generateCetTransaction)(Object.assign({}, params, {
            answer, lockedTxId: params.lockedTxId,
            aliceAmount: params.outcomes[answer].aliceAmount,
            bobAmount: params.outcomes[answer].bobAmount
        }), 1);
        return [answer, cet];
    }))));
    return { cet };
};
const generateCompositeDlcContract = async (lockedTxId, params) => {
    const children = await generateChildDlcContract(Object.assign({}, params, { lockedTxId }));
    const subcontracts = Object.fromEntries(await Promise.all(Object.keys(children.cet).map(async (answer) => {
        const child = children.cet[answer];
        return [answer, [child, await generateCompositeDlcContract(await doubleSHA256reversed(child), params.subcontracts[answer])]];
    })));
    return subcontracts;
};
const generateCompositeDlcContractEnvelope = async (params) => {
    const openingTx = await (0, exports.generateOpeningTransaction)(params.openingParams);
    const lockedTxId = await doubleSHA256reversed(openingTx);
    const contract = await generateCompositeDlcContract(lockedTxId, params.compositeCetParams);
    return { openingTx, contract };
};
exports.generateCompositeDlcContractEnvelope = generateCompositeDlcContractEnvelope;
//# sourceMappingURL=generate-btc-tx.js.map
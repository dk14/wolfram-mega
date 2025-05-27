"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCetRedemptionTransaction = exports.generateCetTransaction = exports.generateClosingTransaction = exports.generateOpeningTransaction = void 0;
const schnorr_1 = require("./btc/schnorr");
const tx_1 = require("./btc/tx");
const schnorr = (0, schnorr_1.schnorrApi)();
const tx = (0, tx_1.txApi)(schnorr);
const generateOpeningTransaction = async (params) => {
    return (await tx.genOpeningTx(params.aliceIn, params.bobIn, params.alicePub, params.bobPub, params.aliceAmountIn, params.bobAmountIn, params.changeAlice, params.changeBob, params.txfee)).hex;
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
const generateCetTransaction = async (params) => {
    const multiIn = {
        txid: params.lockedTxId,
        vout: 0
    };
    const twistedPk = schnorr.adaptorPublic(params.oraclePub, params.answer, params.rValue).padStart(64, "0");
    return (await tx.genAliceCet(multiIn, params.alicePub, params.bobPub, twistedPk, params.aliceAmount, params.bobAmount, params.txfee, params.session)).hex;
};
exports.generateCetTransaction = generateCetTransaction;
const generateCetRedemptionTransaction = async (params) => {
    const twistedPk = schnorr.adaptorPublic(params.oraclePub, params.answer, params.rValue).padStart(64, "0");
    const cetOut = {
        txid: params.cetTxId,
        vout: 0
    };
    return (await tx.genAliceCetRedemption(cetOut, twistedPk, params.alicePub, params.oracleSignature, params.amount, params.txfee)).hex;
};
exports.generateCetRedemptionTransaction = generateCetRedemptionTransaction;
//# sourceMappingURL=generate-btc-tx.js.map
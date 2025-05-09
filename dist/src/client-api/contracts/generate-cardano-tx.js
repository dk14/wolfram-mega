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
exports.generateClosingTransaction = exports.generateOpeningTransaction = void 0;
const codec_utils_1 = require("@helios-lang/codec-utils");
const compiler_1 = require("@helios-lang/compiler");
const ledger_1 = require("@helios-lang/ledger");
const tx_utils_1 = require("@helios-lang/tx-utils");
const uplc_1 = require("@helios-lang/uplc");
const fs = __importStar(require("fs"));
// https://github.com/lley154/helios-examples/blob/main/vesting/pages/index.tsx
const stringToArray = (s) => {
    console.log(s);
    return s.split("").map(char => char.charCodeAt(0));
};
const extractRawPub = (pub) => {
    return Array.from(Buffer.from(pub, 'base64').subarray(44 - 32));
};
const extractRawSig = (sig) => {
    return Array.from(Buffer.from(sig, 'base64'));
};
function makeValidator() {
    const src = fs.readFileSync(__dirname + "/plutus-option.hl").toString();
    const program = new compiler_1.Program(src);
    return program.compile(false);
}
async function getNetworkParams(network) {
    return await fetch(network)
        .then(response => response.json());
}
const generateOpeningTransaction = async (network, inputs) => {
    const uplc = makeValidator();
    const validatorHash = (0, ledger_1.makeValidatorHash)(uplc.hash());
    const address1 = (0, ledger_1.parseShelleyAddress)(inputs.aliceInput.addr);
    const isMainnet = address1.mainnet;
    const utxo1 = (0, ledger_1.makeTxInput)((0, ledger_1.makeTxOutputId)({
        txId: (0, ledger_1.makeTxId)(inputs.aliceInput.txid),
        utxoIdx: inputs.aliceInput.txout
    }), (0, ledger_1.makeTxOutput)(address1, (0, ledger_1.makeValue)(BigInt(inputs.aliceActualAmount))));
    const address2 = (0, ledger_1.parseShelleyAddress)(inputs.bobInput.addr);
    const utxo2 = (0, ledger_1.makeTxInput)((0, ledger_1.makeTxOutputId)({
        txId: (0, ledger_1.makeTxId)(inputs.bobInput.txid),
        utxoIdx: inputs.bobInput.txout
    }), (0, ledger_1.makeTxOutput)(address2, (0, ledger_1.makeValue)(BigInt(inputs.bobActualAmount))));
    const txBuilder = (0, tx_utils_1.makeTxBuilder)({ isMainnet });
    txBuilder.spendUnsafe([utxo1, utxo2]);
    const alicePkh = address1.spendingCredential;
    const BobPkh = address2.spendingCredential;
    const datum = (0, uplc_1.makeListData)([(0, uplc_1.makeByteArrayData)(alicePkh.bytes),
        (0, uplc_1.makeByteArrayData)(BobPkh.bytes),
        (0, uplc_1.makeByteArrayData)(extractRawPub(inputs.oracleCpPubKey)),
        (0, uplc_1.makeByteArrayData)(stringToArray(inputs.r.aliceBetsOnMsg)),
        (0, uplc_1.makeByteArrayData)(stringToArray(inputs.r.bobBetsOnMsg))
    ]);
    const collateral = inputs.aliceInput.amount + inputs.bobInput.amount - inputs.txfee;
    const validatorAddr = (0, ledger_1.makeShelleyAddress)(isMainnet, validatorHash);
    // XXX: I don't the ledger allows using collateral at validator addresses
    const utxo3 = (0, ledger_1.makeTxOutput)(validatorAddr, (0, ledger_1.makeValue)(BigInt(collateral)), (0, ledger_1.makeInlineTxOutputDatum)(datum));
    txBuilder.addOutput(utxo3);
    console.log("opening script hash = " + validatorHash.toHex() + "\n" + (0, codec_utils_1.bytesToHex)(datum.toCbor()));
    if (BigInt(inputs.aliceInput.amount) < BigInt(inputs.aliceActualAmount)) {
        txBuilder.addOutput((0, ledger_1.makeTxOutput)((0, ledger_1.parseShelleyAddress)(inputs.r.aliceRedemptionAddr), (0, ledger_1.makeValue)(BigInt(inputs.aliceActualAmount) - BigInt(inputs.aliceInput.amount))));
    }
    if (BigInt(inputs.bobInput.amount) < BigInt(inputs.bobActualAmount)) {
        txBuilder.addOutput((0, ledger_1.makeTxOutput)((0, ledger_1.parseShelleyAddress)(inputs.r.bobRedemptionAddr), (0, ledger_1.makeValue)(BigInt(inputs.bobActualAmount) - BigInt(inputs.bobInput.amount))));
    }
    const networkParams = await getNetworkParams(network);
    const tx = await txBuilder.build({
        networkParams,
        changeAddress: (0, ledger_1.parseShelleyAddress)(inputs.changeAddr),
    });
    return (0, codec_utils_1.bytesToHex)(tx.toCbor());
};
exports.generateOpeningTransaction = generateOpeningTransaction;
const generateClosingTransaction = async (network, inputs) => {
    const uplc = makeValidator();
    const validatorHash = (0, ledger_1.makeValidatorHash)(uplc.hash());
    const aliceAddr = (0, ledger_1.parseShelleyAddress)(inputs.aliceInput.addr);
    const isMainnet = aliceAddr.mainnet;
    const alicePkh = aliceAddr.spendingCredential;
    const bobAddr = (0, ledger_1.parseShelleyAddress)(inputs.bobInput.addr);
    const BobPkh = bobAddr.spendingCredential;
    const validatorAddr = (0, ledger_1.makeShelleyAddress)(isMainnet, validatorHash);
    const datum = (0, uplc_1.makeListData)([(0, uplc_1.makeByteArrayData)(alicePkh.bytes),
        (0, uplc_1.makeByteArrayData)(BobPkh.bytes),
        (0, uplc_1.makeByteArrayData)(extractRawPub(inputs.oracleCpPubKey)),
        (0, uplc_1.makeByteArrayData)(stringToArray(inputs.r.aliceBetsOnMsg)),
        (0, uplc_1.makeByteArrayData)(stringToArray(inputs.r.bobBetsOnMsg))
    ]);
    console.log("closing script hash = " + validatorHash.toHex() + "\n" + (0, codec_utils_1.bytesToHex)(datum.toCbor()));
    // XXX: I don't Cardano allows using collateral at validator addresses
    const collateral = (0, ledger_1.makeTxInput)((0, ledger_1.makeTxOutputId)({
        txId: (0, ledger_1.makeTxId)(inputs.input.txid),
        utxoIdx: inputs.input.txout
    }), (0, ledger_1.makeTxOutput)(validatorAddr, (0, ledger_1.makeValue)(BigInt(inputs.input.amount)), (0, ledger_1.makeInlineTxOutputDatum)(datum)));
    const valRedeemer = (0, uplc_1.makeListData)([
        (0, uplc_1.makeByteArrayData)(stringToArray(inputs.msg)),
        (0, uplc_1.makeByteArrayData)(extractRawSig(inputs.sig))
    ]);
    const txBuilder = (0, tx_utils_1.makeTxBuilder)({ isMainnet });
    txBuilder.spendUnsafe(collateral, valRedeemer);
    const value = (0, ledger_1.makeValue)(BigInt(inputs.input.amount - inputs.txfee));
    txBuilder.attachUplcProgram(uplc);
    if (inputs.msg === inputs.r.aliceBetsOnMsg) {
        const addr = (0, ledger_1.parseShelleyAddress)(inputs.r.aliceRedemptionAddr);
        const out = (0, ledger_1.makeTxOutput)(addr, value);
        txBuilder.addSigners(addr.spendingCredential);
        const collateralFee = (0, ledger_1.makeTxInput)((0, ledger_1.makeTxOutputId)({
            txId: (0, ledger_1.makeTxId)(inputs.aliceCollateralInput.txid),
            utxoIdx: inputs.aliceCollateralInput.txout
        }), (0, ledger_1.makeTxOutput)(aliceAddr, (0, ledger_1.makeValue)(BigInt(inputs.aliceCollateralInput.amount))));
        txBuilder.addCollateral(collateralFee);
        txBuilder.addOutput(out);
    }
    else if (inputs.msg === inputs.r.bobBetsOnMsg) {
        const addr = (0, ledger_1.parseShelleyAddress)(inputs.r.bobRedemptionAddr);
        const out = (0, ledger_1.makeTxOutput)(addr, value);
        txBuilder.addSigners(addr.spendingCredential);
        const collateralFee = (0, ledger_1.makeTxInput)((0, ledger_1.makeTxOutputId)({
            txId: (0, ledger_1.makeTxId)(inputs.bobCollateralInput.txid),
            utxoIdx: inputs.bobCollateralInput.txout
        }), (0, ledger_1.makeTxOutput)(bobAddr, (0, ledger_1.makeValue)(BigInt(inputs.bobCollateralInput.amount))));
        txBuilder.addCollateral(collateralFee);
        txBuilder.addOutput(out);
    }
    const networkParams = await getNetworkParams(network);
    await fetch(network)
        .then(response => response.json());
    const tx = await txBuilder.build({
        networkParams,
        changeAddress: (0, ledger_1.parseShelleyAddress)(inputs.changeAddr)
    });
    return (0, codec_utils_1.bytesToHex)(tx.toCbor());
};
exports.generateClosingTransaction = generateClosingTransaction;
//# sourceMappingURL=generate-cardano-tx.js.map
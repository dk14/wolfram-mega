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
const helios_1 = require("@hyperionbt/helios");
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
const pickContract = (inputs) => {
    if (inputs.oracleCpPubKey2 === undefined) {
        return "/plutus-option.hl";
    }
    else {
        return "/plutus-option-quorum.hl";
    }
};
const pickDatum = (inputs) => {
    const alicePkh = helios_1.Address.fromBech32(inputs.aliceInput.addr).pubKeyHash;
    const BobPkh = helios_1.Address.fromBech32(inputs.bobInput.addr).pubKeyHash;
    if (inputs.oracleCpPubKey2 === undefined) {
        return new helios_1.ListData([new helios_1.ByteArrayData(alicePkh.bytes),
            new helios_1.ByteArrayData(BobPkh.bytes),
            new helios_1.ByteArrayData(extractRawPub(inputs.oracleCpPubKey)),
            new helios_1.ByteArrayData(stringToArray(inputs.r.aliceBetsOnMsg)),
            new helios_1.ByteArrayData(stringToArray(inputs.r.bobBetsOnMsg))
        ]);
    }
    else {
        return new helios_1.ListData([new helios_1.ByteArrayData(alicePkh.bytes),
            new helios_1.ByteArrayData(BobPkh.bytes),
            new helios_1.ByteArrayData(extractRawPub(inputs.oracleCpPubKey)),
            new helios_1.ByteArrayData(extractRawPub(inputs.oracleCpPubKey2)),
            new helios_1.ByteArrayData(extractRawPub(inputs.oracleCpPubKey3)),
            new helios_1.ByteArrayData(stringToArray(inputs.r.aliceBetsOnMsg)),
            new helios_1.ByteArrayData(stringToArray(inputs.r.bobBetsOnMsg))
        ]);
    }
};
const pickRedeemer = (inputs) => {
    if (inputs.oracleCpPubKey2 === undefined) {
        return new helios_1.ListData([
            new helios_1.ByteArrayData(stringToArray(inputs.msg)),
            new helios_1.ByteArrayData(extractRawSig(inputs.sig))
        ]);
    }
    else {
        return new helios_1.ListData([
            new helios_1.ByteArrayData(stringToArray(inputs.msg)),
            new helios_1.ByteArrayData(extractRawSig(inputs.sig)),
            new helios_1.ByteArrayData(extractRawSig(inputs.sig2)),
            new helios_1.ByteArrayData(extractRawSig(inputs.sig3))
        ]);
    }
};
const generateOpeningTransaction = async (network, inputs) => {
    const tx = new helios_1.Tx();
    const src = fs.readFileSync(__dirname + pickContract(inputs)).toString();
    const program = helios_1.Program.new(src);
    const uplc = program.compile(false);
    const utxo1 = new helios_1.TxInput(helios_1.TxOutputId.fromProps({
        txId: helios_1.TxId.fromHex(inputs.aliceInput.txid),
        utxoId: inputs.aliceInput.txout
    }), new helios_1.TxOutput(helios_1.Address.fromBech32(inputs.aliceInput.addr), new helios_1.Value(BigInt(inputs.aliceActualAmount))));
    const utxo2 = new helios_1.TxInput(helios_1.TxOutputId.fromProps({
        txId: helios_1.TxId.fromHex(inputs.bobInput.txid),
        utxoId: inputs.bobInput.txout
    }), new helios_1.TxOutput(helios_1.Address.fromBech32(inputs.bobInput.addr), new helios_1.Value(BigInt(inputs.bobActualAmount))));
    tx.addInputs([utxo1, utxo2]);
    const datum = pickDatum(inputs);
    const collateral = inputs.aliceInput.amount + inputs.bobInput.amount - inputs.txfee;
    const utxo3 = new helios_1.TxOutput(helios_1.Address.fromHash(uplc.validatorHash, true), new helios_1.Value(BigInt(collateral)), helios_1.Datum.inline(datum));
    tx.addOutput(utxo3);
    console.log("opening script hash = " + uplc.validatorHash.hex + "\n" + datum.toCborHex());
    if (BigInt(inputs.aliceInput.amount) < BigInt(inputs.aliceActualAmount)) {
        tx.addOutput(new helios_1.TxOutput(helios_1.Address.fromBech32(inputs.r.aliceRedemptionAddr), new helios_1.Value(BigInt(inputs.aliceActualAmount) - BigInt(inputs.aliceInput.amount))));
    }
    if (BigInt(inputs.bobInput.amount) < BigInt(inputs.bobActualAmount)) {
        tx.addOutput(new helios_1.TxOutput(helios_1.Address.fromBech32(inputs.r.bobRedemptionAddr), new helios_1.Value(BigInt(inputs.bobActualAmount) - BigInt(inputs.bobInput.amount))));
    }
    const networkParams = new helios_1.NetworkParams(await fetch(network)
        .then(response => response.json()));
    await tx.finalize(networkParams, helios_1.Address.fromBech32(inputs.changeAddr));
    return tx.toCborHex();
};
exports.generateOpeningTransaction = generateOpeningTransaction;
const generateClosingTransaction = async (network, inputs) => {
    const tx = new helios_1.Tx();
    const src = fs.readFileSync(__dirname + "/plutus-option.hl").toString();
    const program = helios_1.Program.new(src);
    const uplc = program.compile(false);
    const addr = helios_1.Address.fromHash(uplc.validatorHash);
    const datum = pickDatum(inputs);
    console.log("closing script hash = " + uplc.validatorHash.hex + "\n" + datum.toCborHex());
    const collateral = new helios_1.TxInput(helios_1.TxOutputId.fromProps({
        txId: helios_1.TxId.fromHex(inputs.input.txid),
        utxoId: inputs.input.txout
    }), new helios_1.TxOutput(addr, new helios_1.Value(BigInt(inputs.input.amount)), helios_1.Datum.inline(datum)));
    const valRedeemer = pickRedeemer(inputs);
    tx.addInput(collateral, valRedeemer);
    const value = new helios_1.Value(BigInt(inputs.input.amount - inputs.txfee));
    tx.attachScript(uplc);
    if (inputs.msg === inputs.r.aliceBetsOnMsg) {
        const addr = helios_1.Address.fromBech32(inputs.r.aliceRedemptionAddr);
        const out = new helios_1.TxOutput(addr, value);
        tx.addSigner(helios_1.Address.fromBech32(inputs.r.aliceRedemptionAddr).pubKeyHash);
        const collateralFee = new helios_1.TxInput(helios_1.TxOutputId.fromProps({
            txId: helios_1.TxId.fromHex(inputs.aliceCollateralInput.txid),
            utxoId: inputs.aliceCollateralInput.txout
        }), new helios_1.TxOutput(helios_1.Address.fromBech32(inputs.aliceInput.addr), new helios_1.Value(BigInt(inputs.aliceCollateralInput.amount))));
        tx.addCollateral(collateralFee);
        tx.addOutput(out);
    }
    else if (inputs.msg === inputs.r.bobBetsOnMsg) {
        const addr = helios_1.Address.fromBech32(inputs.r.bobRedemptionAddr);
        const out = new helios_1.TxOutput(addr, value);
        tx.addSigner(helios_1.Address.fromBech32(inputs.r.bobRedemptionAddr).pubKeyHash);
        const collateralFee = new helios_1.TxInput(helios_1.TxOutputId.fromProps({
            txId: helios_1.TxId.fromHex(inputs.bobCollateralInput.txid),
            utxoId: inputs.bobCollateralInput.txout
        }), new helios_1.TxOutput(helios_1.Address.fromBech32(inputs.bobInput.addr), new helios_1.Value(BigInt(inputs.bobCollateralInput.amount))));
        tx.addCollateral(collateralFee);
        tx.addOutput(out);
    }
    const networkParams = new helios_1.NetworkParams(await fetch(network)
        .then(response => response.json()));
    await tx.finalize(networkParams, helios_1.Address.fromBech32(inputs.changeAddr));
    return tx.toCborHex();
};
exports.generateClosingTransaction = generateClosingTransaction;
//# sourceMappingURL=generate-cardano-tx.js.map
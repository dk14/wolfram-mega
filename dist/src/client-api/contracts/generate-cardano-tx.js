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
exports.generateOpeningTransaction = void 0;
const helios_1 = __importDefault(require("@hyperionbt/helios"));
const fs = __importStar(require("fs"));
// https://github.com/lley154/helios-examples/blob/main/vesting/pages/index.tsx
const generateOpeningTransaction = (aliceInput, bobInput, oraclePubKey) => {
    const tx = new helios_1.default.Tx();
    const src = fs.readFileSync(__dirname + "/plutus-option.hl").toString();
    const program = helios_1.default.Program.new(src);
    const uplc = program.compile(false);
    const utxo1 = new helios_1.default.TxInput(helios_1.default.TxOutputId.fromCbor(aliceInput.cbor));
    const utxo2 = new helios_1.default.TxInput(helios_1.default.TxOutputId.fromCbor(bobInput.cbor));
    tx.addInputs([utxo1, utxo2]);
    const alicePkh = helios_1.default.Address.fromBech32(aliceInput.addr).pubKeyHash;
    const BobPkh = helios_1.default.Address.fromBech32(aliceInput.addr).pubKeyHash;
    const datum = new helios_1.default.ListData([new helios_1.default.ByteArrayData(alicePkh.bytes),
        new helios_1.default.ByteArrayData(BobPkh.bytes),
        new helios_1.default.ByteArrayData(Array.from(Uint8Array.from(atob(oraclePubKey), c => c.charCodeAt(0))))]);
    const collateral = aliceInput.amount + bobInput.amount;
    const utxo3 = new helios_1.default.TxOutput(helios_1.default.Address.fromHash(uplc.validatorHash, true), new helios_1.default.Value(BigInt(collateral)), helios_1.default.Datum.inline(datum));
    tx.addOutput(utxo3);
    return {
        tx: tx.toCborHex(), //helios.Tx.fromCbor()
        asInput: {
            cbor: utxo3.toCborHex(),
            amount: collateral,
            addr: helios_1.default.Address.fromHash(uplc.validatorHash, true).toBech32()
        }
    };
};
exports.generateOpeningTransaction = generateOpeningTransaction;
//# sourceMappingURL=generate-cardano-tx.js.map
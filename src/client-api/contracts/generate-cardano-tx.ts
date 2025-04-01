import { Address, ByteArrayData, ConstrData, Datum, ListData, Program, Tx, TxId, TxInput, TxOutput, TxOutputId, Value } from "@hyperionbt/helios"
import * as fs from 'fs'

type Hex = string
type CborHex = string
type Bech32 = string
type Base64 = string

export interface InputId {
    txid: Hex,
    txout: number,
    amount: number,
    addr?: Bech32
} 

interface Redemption {
    aliceRedemptionAddr: Bech32,
    aliceBetsOnMsg: Base64
    bobRedemptionAddr: Bech32
    bobBetsOnMsg: Base64
}

export interface OpeningInputs {
    aliceInput: InputId, 
    bobInput: InputId,
    oraclePubKey: Base64,
    r: Redemption
}

export interface ClosingInputs {
    input: InputId,
    aliceInput: InputId, 
    bobInput: InputId,
    oraclePubKey: Base64,
    msg: Base64, 
    sig: Base64,
    r: Redemption
}

// https://github.com/lley154/helios-examples/blob/main/vesting/pages/index.tsx

const stringToArray = (s: Base64): number[] => {
    return Array.from(Uint8Array.from(atob(s), c => c.charCodeAt(0)))
}

export const generateOpeningTransaction = (inputs: OpeningInputs): CborHex => {
    const tx = new Tx()
    const src = fs.readFileSync(__dirname + "/plutus-option.hl").toString()
    const program = Program.new(src)

    const uplc = program.compile(false)

    
    const utxo1 = new TxInput(TxOutputId.fromProps({
        txId: TxId.fromHex(inputs.aliceInput.txid), 
        utxoId: inputs.aliceInput.txout
    }), new TxOutput(Address.fromBech32(inputs.aliceInput.addr), new Value(BigInt(inputs.aliceInput.amount))))

    const utxo2 = new TxInput(TxOutputId.fromProps({
        txId: TxId.fromHex(inputs.bobInput.txid), 
        utxoId: inputs.bobInput.txout
    }), new TxOutput(Address.fromBech32(inputs.bobInput.addr), new Value(BigInt(inputs.bobInput.amount))))

    tx.addInputs([utxo1, utxo2])

    const alicePkh = Address.fromBech32(inputs.aliceInput.addr).pubKeyHash
    const BobPkh = Address.fromBech32(inputs.bobInput.addr).pubKeyHash

    const datum = new ListData([new ByteArrayData(alicePkh.bytes),
        new ByteArrayData(BobPkh.bytes),
        new ByteArrayData(stringToArray(inputs.oraclePubKey)),
        new ByteArrayData(stringToArray(inputs.r.aliceBetsOnMsg)),
        new ByteArrayData(stringToArray(inputs.r.bobBetsOnMsg))
    ])

    const collateral = inputs.aliceInput.amount + inputs.bobInput.amount

    const utxo3 = new TxOutput(
        Address.fromHash(uplc.validatorHash, true),
        new Value(BigInt(collateral)),
        Datum.inline(datum)
    )

    tx.addOutput(utxo3)
    
    return tx.toCborHex()

}

export const generateClosingTransaction = (inputs: ClosingInputs): CborHex => {
    const tx = new Tx()
    const src = fs.readFileSync(__dirname + "/plutus-option.hl").toString()
    const program = Program.new(src)

    const uplc = program.compile(false)
    const addr = Address.fromHash(uplc.validatorHash)

    const alicePkh = Address.fromBech32(inputs.aliceInput.addr).pubKeyHash
    const BobPkh = Address.fromBech32(inputs.bobInput.addr).pubKeyHash

    const datum = new ListData([new ByteArrayData(alicePkh.bytes),
        new ByteArrayData(BobPkh.bytes),
        new ByteArrayData(stringToArray(inputs.oraclePubKey)),
        new ByteArrayData(stringToArray(inputs.r.aliceBetsOnMsg)),
        new ByteArrayData(stringToArray(inputs.r.bobBetsOnMsg))
    ])

    const collateral = new TxInput(TxOutputId.fromProps({
        txId: TxId.fromHex(inputs.input.txid), 
        utxoId: inputs.input.txout
    }), new TxOutput(addr, new Value(BigInt(inputs.input.amount)),  Datum.inline(datum)))

    const valRedeemer = new ConstrData(1, [
        new ByteArrayData(stringToArray(inputs.msg)),
        new ByteArrayData(stringToArray(inputs.sig))
    ])
    tx.addInput(collateral, valRedeemer)
    const value = new Value(BigInt(inputs.input.amount))

    tx.attachScript(uplc)

    if (inputs.msg === inputs.r.aliceBetsOnMsg) {
        const addr = Address.fromBech32(inputs.r.aliceRedemptionAddr)
        const out = new TxOutput(addr, value)
        tx.addOutput(out)
    } else if (inputs.msg === inputs.r.bobBetsOnMsg) {
        const addr = Address.fromBech32(inputs.r.bobRedemptionAddr)
        const out = new TxOutput(addr, value)
        tx.addOutput(out)
    }
    return tx.toCborHex()
}
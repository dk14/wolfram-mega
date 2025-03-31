import helios, { Program } from "@hyperionbt/helios"
import * as fs from 'fs'

type CborHex = string
type Bech32 = string
type Base64 = string

export interface InputId {
    cbor: CborHex,
    amount: number,
    addr: Bech32
} 

export interface OpeningTransaction {
    tx: CborHex,
    asInput: InputId
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
    opening: OpeningTransaction, 
    msg: Base64, 
    sig: Base64,
    r: Redemption
}



// https://github.com/lley154/helios-examples/blob/main/vesting/pages/index.tsx

const stringToArray = (s: Base64): number[] => {
    return Array.from(Uint8Array.from(atob(s), c => c.charCodeAt(0)))
}

export const generateOpeningTransaction = (inputs: OpeningInputs): OpeningTransaction => {
    const tx = new helios.Tx()
    const src = fs.readFileSync(__dirname + "/plutus-option.hl").toString()
    const program = helios.Program.new(src)

    const uplc = program.compile(false)

    const utxo1 = new helios.TxInput(helios.TxOutputId.fromCbor(inputs.aliceInput.cbor))
    const utxo2 = new helios.TxInput(helios.TxOutputId.fromCbor(inputs.bobInput.cbor))
    tx.addInputs([utxo1, utxo2])

    const alicePkh = helios.Address.fromBech32(inputs.aliceInput.addr).pubKeyHash
    const BobPkh = helios.Address.fromBech32(inputs.aliceInput.addr).pubKeyHash

    const datum = new helios.ListData([new helios.ByteArrayData(alicePkh.bytes),
        new helios.ByteArrayData(BobPkh.bytes),
        new helios.ByteArrayData(stringToArray(inputs.oraclePubKey)),
        new helios.ByteArrayData(stringToArray(inputs.r.aliceBetsOnMsg)),
        new helios.ByteArrayData(stringToArray(inputs.r.bobBetsOnMsg))
    ])

    const collateral = inputs.aliceInput.amount + inputs.bobInput.amount

    const utxo3 = new helios.TxOutput(
        helios.Address.fromHash(uplc.validatorHash, true),
        new helios.Value(BigInt(collateral)),
        helios.Datum.inline(datum)
    )

    tx.addOutput(utxo3)
    
    return {
        tx: tx.toCborHex(), //helios.Tx.fromCbor()
        asInput: {
            cbor: utxo3.toCborHex(),
            amount: collateral,
            addr: helios.Address.fromHash(uplc.validatorHash, true).toBech32()
        }
    } 

}

export const generateClosingTransaction = (inputs: ClosingInputs): CborHex => {
    const tx = new helios.Tx()
    const collateral = new helios.TxInput(helios.TxOutputId.fromCbor(inputs.opening.asInput.cbor))
    const valRedeemer = new helios.ConstrData(1, [
        new helios.ByteArrayData(stringToArray(inputs.msg)),
        new helios.ByteArrayData(stringToArray(inputs.sig))
    ])
    tx.addInput(collateral, valRedeemer)
    const value = new helios.Value(BigInt(inputs.opening.asInput.amount))
    if (inputs.msg === inputs.r.aliceBetsOnMsg) {
        const addr = helios.Address.fromBech32(inputs.r.aliceRedemptionAddr)
        const out = new helios.TxOutput(addr, value)
        tx.addOutput(out)
    } else if (inputs.msg === inputs.r.bobBetsOnMsg) {
        const addr = helios.Address.fromBech32(inputs.r.bobRedemptionAddr)
        const out = new helios.TxOutput(addr, value)
        tx.addOutput(out)
    }
    return tx.toCborHex()
}
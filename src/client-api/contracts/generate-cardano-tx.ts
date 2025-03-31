import helios, { Program } from "@hyperionbt/helios"
import * as fs from 'fs'

interface InputId {
    cbor: string,
    amount: number,
    addr: string
} 

interface OpeningTransaction {
    tx: helios.Tx,
    asInput: InputId
}

// https://github.com/lley154/helios-examples/blob/main/vesting/pages/index.tsx

export const generateOpeningTransaction = (aliceInput: InputId, bobInput: InputId, oraclePubKey: string): OpeningTransaction => {
    const tx = new helios.Tx()
    const src = fs.readFileSync(__dirname + "/plutus-option.hl").toString()
    const program = helios.Program.new(src)

    const uplc = program.compile(false)


    const utxo1 = new helios.TxInput(helios.TxOutputId.fromCbor(aliceInput.cbor))
    const utxo2 = new helios.TxInput(helios.TxOutputId.fromCbor(bobInput.cbor))
    tx.addInputs([utxo1, utxo2])

    const alicePkh = helios.Address.fromBech32(aliceInput.addr).pubKeyHash
    const BobPkh = helios.Address.fromBech32(aliceInput.addr).pubKeyHash

    const datum = new helios.ListData([new helios.ByteArrayData(alicePkh.bytes),
        new helios.ByteArrayData(BobPkh.bytes),
        new helios.ByteArrayData(Array.from(Uint8Array.from(atob(oraclePubKey), c => c.charCodeAt(0))))])

    const collateral = aliceInput.amount + bobInput.amount

    const utxo3 = new helios.TxOutput(
        helios.Address.fromHash(uplc.validatorHash, true),
        new helios.Value(BigInt(collateral)),
        helios.Datum.inline(datum)
    )

    tx.addOutput(utxo3)
    
    return {
        tx, 
        asInput: {
            cbor: "string",
            amount: collateral,
            addr: helios.Address.fromHash(uplc.validatorHash, true).toBech32()
        }
    } 

}
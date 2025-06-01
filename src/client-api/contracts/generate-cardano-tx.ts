import { Address, ByteArrayData, ConstrData, Datum, ListData, NetworkParams, Program, Tx, TxId, TxInput, TxOutput, TxOutputId, Value } from "@hyperionbt/helios"
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
    oracleCpPubKey: Base64,
    oracleCpPubKey2?: Base64,
    oracleCpPubKey3?: Base64,
    r: Redemption,
    changeAddr: Bech32,
    txfee: number,
    aliceActualAmount: string,
    bobActualAmount: string
}

export interface ClosingInputs {
    input: InputId,
    aliceInput: InputId, 
    bobInput: InputId,
    aliceCollateralInput: InputId, 
    bobCollateralInput: InputId,
    oracleCpPubKey: Base64,
    oracleCpPubKey2?: Base64,
    oracleCpPubKey3?: Base64,
    msg: Base64, 
    sig: Base64,
    sig2: Base64,
    sig3: Base64,
    r: Redemption,
    changeAddr: Bech32,
    txfee: number
}

// https://github.com/lley154/helios-examples/blob/main/vesting/pages/index.tsx

const stringToArray = (s: string): number[] => {
    console.log(s)
    return s.split("").map(char => char.charCodeAt(0))
}

const extractRawPub = (pub: Base64): number[] => {
    return Array.from(Buffer.from(pub, 'base64').subarray(44 - 32))
}

const extractRawSig = (sig: Base64): number[] => {
    return Array.from(Buffer.from(sig, 'base64'))
}

const pickContract = (inputs: OpeningInputs | ClosingInputs): string => {
    if (inputs.oracleCpPubKey2 === undefined) {
        return "/plutus-option.hl"
    } else {
        return "/plutus-option-quorum.hl"
    }
}

const pickDatum = (inputs: OpeningInputs | ClosingInputs): ListData => {
    const alicePkh = Address.fromBech32(inputs.aliceInput.addr).pubKeyHash
    const BobPkh = Address.fromBech32(inputs.bobInput.addr).pubKeyHash
    
    if (inputs.oracleCpPubKey2 === undefined) {
        return new ListData([new ByteArrayData(alicePkh.bytes),
            new ByteArrayData(BobPkh.bytes),
            new ByteArrayData(extractRawPub(inputs.oracleCpPubKey)),
            new ByteArrayData(stringToArray(inputs.r.aliceBetsOnMsg)),
            new ByteArrayData(stringToArray(inputs.r.bobBetsOnMsg))
        ])
    } else {
        return new ListData([new ByteArrayData(alicePkh.bytes),
            new ByteArrayData(BobPkh.bytes),
            new ByteArrayData(extractRawPub(inputs.oracleCpPubKey)),
            new ByteArrayData(extractRawPub(inputs.oracleCpPubKey2)),
            new ByteArrayData(extractRawPub(inputs.oracleCpPubKey3)),
            new ByteArrayData(stringToArray(inputs.r.aliceBetsOnMsg)),
            new ByteArrayData(stringToArray(inputs.r.bobBetsOnMsg))
        ])
    }
}

const pickRedeemer = (inputs: ClosingInputs): ListData => { 
    if (inputs.oracleCpPubKey2 === undefined) {
        return new ListData([
            new ByteArrayData(stringToArray(inputs.msg)),
            new ByteArrayData(extractRawSig(inputs.sig))
        ])
    } else {
        return new ListData([
            new ByteArrayData(stringToArray(inputs.msg)),
            new ByteArrayData(extractRawSig(inputs.sig)),
            new ByteArrayData(extractRawSig(inputs.sig2)),
            new ByteArrayData(extractRawSig(inputs.sig3))
        ])
    }
}


export const generateOpeningTransaction = async (network: string, inputs: OpeningInputs): Promise<CborHex> => {
    const tx = new Tx()
    const src = fs.readFileSync(__dirname + pickContract(inputs)).toString()
    const program = Program.new(src)

    const uplc = program.compile(false)

    const utxo1 = new TxInput(TxOutputId.fromProps({
        txId: TxId.fromHex(inputs.aliceInput.txid), 
        utxoId: inputs.aliceInput.txout
    }), new TxOutput(Address.fromBech32(inputs.aliceInput.addr), new Value(BigInt(inputs.aliceActualAmount))))

    const utxo2 = new TxInput(TxOutputId.fromProps({
        txId: TxId.fromHex(inputs.bobInput.txid), 
        utxoId: inputs.bobInput.txout
    }), new TxOutput(Address.fromBech32(inputs.bobInput.addr), new Value(BigInt(inputs.bobActualAmount))))

    tx.addInputs([utxo1, utxo2])

    const datum = pickDatum(inputs)

    const collateral = inputs.aliceInput.amount + inputs.bobInput.amount - inputs.txfee

    const utxo3 = new TxOutput(
        Address.fromHash(uplc.validatorHash, true),
        new Value(BigInt(collateral)),
        Datum.inline(datum)
    )

    tx.addOutput(utxo3)

    console.log("opening script hash = " + uplc.validatorHash.hex + "\n" + datum.toCborHex())


    if (BigInt(inputs.aliceInput.amount) < BigInt(inputs.aliceActualAmount)) {
        tx.addOutput(
            new TxOutput(
                Address.fromBech32(inputs.r.aliceRedemptionAddr), 
                new Value(BigInt(inputs.aliceActualAmount) - BigInt(inputs.aliceInput.amount))))
    }

    if (BigInt(inputs.bobInput.amount) < BigInt(inputs.bobActualAmount)) {
        tx.addOutput(
            new TxOutput(
                Address.fromBech32(inputs.r.bobRedemptionAddr), 
                new Value(BigInt(inputs.bobActualAmount) - BigInt(inputs.bobInput.amount))))
    }

    const networkParams = new NetworkParams(
        await fetch(network)
             .then(response => response.json())
    )
    
    await tx.finalize(networkParams, Address.fromBech32(inputs.changeAddr))
    
    return tx.toCborHex()

}

export const generateClosingTransaction = async (network: string, inputs: ClosingInputs): Promise<CborHex> => {
    const tx = new Tx()
    const src = fs.readFileSync(__dirname + pickContract(inputs)).toString()
    const program = Program.new(src)

    const uplc = program.compile(false)
    const addr = Address.fromHash(uplc.validatorHash)

    const datum = pickDatum(inputs)

    console.log("closing script hash = " + uplc.validatorHash.hex + "\n" + datum.toCborHex())


    const collateral = new TxInput(TxOutputId.fromProps({
        txId: TxId.fromHex(inputs.input.txid), 
        utxoId: inputs.input.txout
    }), new TxOutput(addr, new Value(BigInt(inputs.input.amount)),  Datum.inline(datum)))

    
    const valRedeemer = pickRedeemer(inputs)
    
    tx.addInput(collateral, valRedeemer)
    const value = new Value(BigInt(inputs.input.amount - inputs.txfee))

    tx.attachScript(uplc)

    if (inputs.msg === inputs.r.aliceBetsOnMsg) {
        const addr = Address.fromBech32(inputs.r.aliceRedemptionAddr)
        const out = new TxOutput(addr, value)
        tx.addSigner(Address.fromBech32(inputs.r.aliceRedemptionAddr).pubKeyHash)
        const collateralFee = new TxInput(TxOutputId.fromProps({
            txId: TxId.fromHex(inputs.aliceCollateralInput.txid), 
            utxoId: inputs.aliceCollateralInput.txout
        }), new TxOutput(Address.fromBech32(inputs.aliceInput.addr), new Value(BigInt(inputs.aliceCollateralInput.amount))))
        tx.addCollateral(collateralFee)
        tx.addOutput(out)
    } else if (inputs.msg === inputs.r.bobBetsOnMsg) {
        const addr = Address.fromBech32(inputs.r.bobRedemptionAddr)
        const out = new TxOutput(addr, value)
        tx.addSigner(Address.fromBech32(inputs.r.bobRedemptionAddr).pubKeyHash)
        const collateralFee = new TxInput(TxOutputId.fromProps({
            txId: TxId.fromHex(inputs.bobCollateralInput.txid), 
            utxoId: inputs.bobCollateralInput.txout
        }), new TxOutput(Address.fromBech32(inputs.bobInput.addr), new Value(BigInt(inputs.bobCollateralInput.amount))))
        tx.addCollateral(collateralFee)
        tx.addOutput(out)
    }

    const networkParams = new NetworkParams(
        await fetch(network)
             .then(response => response.json())
    )

    await tx.finalize(networkParams, Address.fromBech32(inputs.changeAddr))

    return tx.toCborHex()
}
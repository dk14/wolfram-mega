import { bytesToHex } from "@helios-lang/codec-utils"
import { Program } from "@helios-lang/compiler"
import { makeShelleyAddress, NetworkParams, Tx, makeTxId, makeTxInput, TxOutput, makeTxOutputId, Value, parseShelleyAddress, makeTxOutput, makeValue, ShelleyAddress, PubKeyHash, PubKey, makeValidatorHash, ValidatorHash, makeTxOutputDatum, makeInlineTxOutputDatum } from "@helios-lang/ledger"
import { makeTxBuilder } from "@helios-lang/tx-utils"
import { makeByteArrayData, makeConstrData, makeListData, UplcProgramV2 } from "@helios-lang/uplc"
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
    msg: Base64, 
    sig: Base64,
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

function makeValidator(): UplcProgramV2 {
    const src = fs.readFileSync(__dirname + "/plutus-option.hl").toString()
    const program = new Program(src)

    return program.compile(false)    
}

async function getNetworkParams(network: string): Promise<NetworkParams> {
    return await fetch(network)
         .then(response => response.json())
}

export const generateOpeningTransaction = async (network: string, inputs: OpeningInputs): Promise<CborHex> => {
    const uplc = makeValidator()
    const validatorHash = makeValidatorHash(uplc.hash())
    
    const address1 = parseShelleyAddress(inputs.aliceInput.addr) as ShelleyAddress<PubKeyHash>

    const isMainnet = address1.mainnet
    const utxo1 = makeTxInput(makeTxOutputId({
        txId: makeTxId(inputs.aliceInput.txid), 
        utxoIdx: inputs.aliceInput.txout
    }), makeTxOutput(address1, makeValue(BigInt(inputs.aliceActualAmount))))

    const address2 = parseShelleyAddress(inputs.bobInput.addr) as ShelleyAddress<PubKeyHash>
    const utxo2 = makeTxInput(makeTxOutputId({
        txId: makeTxId(inputs.bobInput.txid), 
        utxoIdx: inputs.bobInput.txout
    }), makeTxOutput(address2, makeValue(BigInt(inputs.bobActualAmount))))

    const txBuilder = makeTxBuilder({isMainnet})
    txBuilder.spendUnsafe([utxo1, utxo2])

    const alicePkh = address1.spendingCredential
    const BobPkh = address2.spendingCredential

    const datum = makeListData([makeByteArrayData(alicePkh.bytes),
        makeByteArrayData(BobPkh.bytes),
        makeByteArrayData(extractRawPub(inputs.oracleCpPubKey)),
        makeByteArrayData(stringToArray(inputs.r.aliceBetsOnMsg)),
        makeByteArrayData(stringToArray(inputs.r.bobBetsOnMsg))
    ])

    const collateral = inputs.aliceInput.amount + inputs.bobInput.amount - inputs.txfee

    const validatorAddr = makeShelleyAddress(isMainnet, validatorHash) as ShelleyAddress<ValidatorHash> 
    // XXX: I don't the ledger allows using collateral at validator addresses
    const utxo3 = makeTxOutput(
        validatorAddr,
        makeValue(BigInt(collateral)),
        makeInlineTxOutputDatum(datum)
    )

    txBuilder.addOutput(utxo3)

    console.log("opening script hash = " + validatorHash.toHex() + "\n" + bytesToHex(datum.toCbor()))


    if (BigInt(inputs.aliceInput.amount) < BigInt(inputs.aliceActualAmount)) {
        txBuilder.addOutput(
            makeTxOutput(
                parseShelleyAddress(inputs.r.aliceRedemptionAddr), 
                makeValue(BigInt(inputs.aliceActualAmount) - BigInt(inputs.aliceInput.amount))))
    }

    if (BigInt(inputs.bobInput.amount) < BigInt(inputs.bobActualAmount)) {
        txBuilder.addOutput(
            makeTxOutput(
                parseShelleyAddress(inputs.r.bobRedemptionAddr), 
                makeValue(BigInt(inputs.bobActualAmount) - BigInt(inputs.bobInput.amount))))
    }

    const networkParams = await getNetworkParams(network)
    
    const tx = await txBuilder.build({
        networkParams,
        changeAddress: parseShelleyAddress(inputs.changeAddr),
    })
    
    return bytesToHex(tx.toCbor())
}

export const generateClosingTransaction = async (network: string, inputs: ClosingInputs): Promise<CborHex> => {
    const uplc = makeValidator()
    const validatorHash = makeValidatorHash(uplc.hash())

    const aliceAddr = parseShelleyAddress(inputs.aliceInput.addr) as ShelleyAddress<PubKeyHash>
    const isMainnet = aliceAddr.mainnet
    const alicePkh = aliceAddr.spendingCredential
    const bobAddr = parseShelleyAddress(inputs.bobInput.addr) as ShelleyAddress<PubKeyHash>
    const BobPkh = bobAddr.spendingCredential
    const validatorAddr = makeShelleyAddress(isMainnet, validatorHash)

    const datum = makeListData([makeByteArrayData(alicePkh.bytes),
        makeByteArrayData(BobPkh.bytes),
        makeByteArrayData(extractRawPub(inputs.oracleCpPubKey)),
        makeByteArrayData(stringToArray(inputs.r.aliceBetsOnMsg)),
        makeByteArrayData(stringToArray(inputs.r.bobBetsOnMsg))
    ])

    console.log("closing script hash = " + validatorHash.toHex() + "\n" + bytesToHex(datum.toCbor()))

    // XXX: I don't Cardano allows using collateral at validator addresses
    const collateral = makeTxInput(makeTxOutputId({
        txId: makeTxId(inputs.input.txid), 
        utxoIdx: inputs.input.txout
    }), makeTxOutput(validatorAddr, makeValue(BigInt(inputs.input.amount)),  makeInlineTxOutputDatum(datum)))

    
    const valRedeemer = makeListData([
        makeByteArrayData(stringToArray(inputs.msg)),
        makeByteArrayData(extractRawSig(inputs.sig))
    ])
    
    const txBuilder = makeTxBuilder({isMainnet})

    txBuilder.spendUnsafe(collateral, valRedeemer)
    const value = makeValue(BigInt(inputs.input.amount - inputs.txfee))

    txBuilder.attachUplcProgram(uplc)

    if (inputs.msg === inputs.r.aliceBetsOnMsg) {
        const addr = parseShelleyAddress(inputs.r.aliceRedemptionAddr) as ShelleyAddress<PubKeyHash>
        const out = makeTxOutput(addr, value)
        txBuilder.addSigners(addr.spendingCredential)
        const collateralFee = makeTxInput(makeTxOutputId({
            txId: makeTxId(inputs.aliceCollateralInput.txid), 
            utxoIdx: inputs.aliceCollateralInput.txout
        }), makeTxOutput(aliceAddr, makeValue(BigInt(inputs.aliceCollateralInput.amount))))
        txBuilder.addCollateral(collateralFee)
        txBuilder.addOutput(out)
    } else if (inputs.msg === inputs.r.bobBetsOnMsg) {
        const addr = parseShelleyAddress(inputs.r.bobRedemptionAddr) as ShelleyAddress<PubKeyHash>
        const out = makeTxOutput(addr, value)
        txBuilder.addSigners(addr.spendingCredential)
        const collateralFee = makeTxInput(makeTxOutputId({
            txId: makeTxId(inputs.bobCollateralInput.txid), 
            utxoIdx: inputs.bobCollateralInput.txout
        }), makeTxOutput(bobAddr, makeValue(BigInt(inputs.bobCollateralInput.amount))))
        txBuilder.addCollateral(collateralFee)
        txBuilder.addOutput(out)
    }

    const networkParams = await getNetworkParams(network)
        await fetch(network)
             .then(response => response.json())

    const tx = await txBuilder.build({
        networkParams,
        changeAddress: parseShelleyAddress(inputs.changeAddr)       
    })

    return bytesToHex(tx.toCbor())
}
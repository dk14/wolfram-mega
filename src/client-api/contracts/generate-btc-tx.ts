import { schnorrApi } from "./btc/schnorr";
import { txApi } from "./btc/tx";

const schnorr = schnorrApi()
const tx = txApi(schnorr)

const aliceSecret = ""
const bobSecret = ""

const alicePub = schnorr.getPub(aliceSecret)
const bobPub = schnorr.getPub(bobSecret)

const question = "??"

let aliceIn = {
    "txid": "aliceTxId",
    "vout": 0,
    "secrets": [aliceSecret]
}

let bobIn = {
    "txid": "bobTxId",
    "vout": 0,
    "secrets": [bobSecret]
}


const aliceAmountIn = 10000
const bobAmountIn = 20000
const openingTx = tx.genOpeningTx(aliceIn, bobIn, alicePub, bobPub, aliceAmountIn, bobAmountIn)

const multiIn = {
    "txid": openingTx.txid,
    "vout": 0,
    "secrets": [aliceSecret, bobSecret]
}

const closingTx = tx.genClosingTx(multiIn, alicePub, bobPub, aliceAmountIn, bobAmountIn)

//----Oracle----

const oracleSecret = ""

//commitment
const oraclePub = schnorr.getPub(oracleSecret)
const kValue = schnorr.genNonce(oracleSecret, question, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906")
const rValue = schnorr.getPub(kValue)

//prepare CET

const answer = "NO"
const twistedPk = schnorr.adaptorPublic(oraclePub, answer, rValue).padStart(64, "0")

const cetTx = tx.genAliceCet(multiIn, alicePub, bobPub, twistedPk, aliceAmountIn, bobAmountIn)

//redeem CET

const oracleSignature = schnorr.signatureSValue(oracleSecret, kValue, answer).padStart(64, "0")
let redemptionIn = {
    "txid": cetTx.txid,
    "vout": 0,
    "secrets": [aliceSecret]
}
const redemptionTx = tx.genAliceCetRedemption(redemptionIn, twistedPk, alicePub, oracleSignature, aliceAmountIn)


import { resolve } from "path"
import { PublicSession } from "../src/client-api/contracts/btc/tx"
import { CetRedemptionParams, DlcContract, DlcParams } from "../src/client-api/contracts/generate-btc-tx"
import { Commitment, Fact, OfferMsg, OfferTerms } from "../src/protocol"
import { PreferenceModel } from "./matching"
import { off } from "process"

type TxId = string
type TxBody = string

export interface Contract {
    openingTx: TxBody
    cet: TxBody[]
}

export interface UTxO {
    txid: string
    vout: number
    value?: number
    age?: number
}

export interface Inputs {
    utxoAlice: UTxO[]
    utxoBob: UTxO[]
}

export interface ContractInterpreter {
    getUtXo: (terms: OfferMsg) => Promise<Inputs>
    genContractTx: (inputs: Inputs, c: Commitment[], offer: OfferMsg) => Promise<[Contract, OfferMsg?]>
    submitTx: (tx: string) => Promise<TxId>
    genRedemtionTx: (lockingTxId: UTxO, c: Commitment[], fact: Fact, offer: OfferMsg) => Promise<string>
}



const scan = (arr, reducer, seed) => {
    return arr.reduce(([acc, result], value, index) => {
        acc = reducer(acc, value, index);
        result.push(acc);
        return [acc, result];
    }, [seed, []])[1];
}


const getUtXo = async (offer: OfferMsg): Promise<Inputs> => {

    const terms = offer.content.terms

    //const terms = o.content.terms
    const req = terms.question

    const utxoExplore = async (address: string): Promise<UTxO[]> => {
       return (await (await fetch (`https://mempool.space/api/address/${address}/utxo`)).json())
    }

    const txfee = terms.txfee

    const addressAlice = offer.content.addresses[0]
    const addressBob = offer.content.addresses[1]
    
    const aliceUtxos = await utxoExplore(addressAlice)

    const bobUtxos = await utxoExplore(addressBob)

    //const btcBalance = `[balance] alice: ${aliceUtxos.map(x => x.value).reduce((a, b) => (a ?? 0) + (b ?? 0))}, bob: ${bobUtxos.map(x => x.value).reduce((a, b) => (a ?? 0) + (b ?? 0))}`

    const getMultipleUtxo = (utxos: UTxO[]): UTxO[] => {
        if (utxos.find(a => a.value > terms.partyBetAmount + txfee / 2)) {
            return [aliceUtxos.find(a => a.value > terms.partyBetAmount + txfee / 2)]
        } else if (aliceUtxos.length > 0) {
            utxos.sort((a, b) => a.age - b.age)
            const i = scan(utxos.map(x => x.value), (a, b) => a + b, 0).findIndex(x => x > terms.partyBetAmount + txfee / 2)

            if (i !== -1) {
                return aliceUtxos.slice(0, i + 1)      
            } else {
                return undefined
            }
        }
    }

    return {
        utxoAlice: offer.content.utxos[0] ? 
        offer.content.utxos[0].map(x => {return {txid: x[0], vout: x[1]}})
            : getMultipleUtxo(aliceUtxos),

        utxoBob: offer.content.utxos[1] ? 
            offer.content.utxos[1].map(x => {return {txid: x[0], vout: x[1]}})
            : getMultipleUtxo(bobUtxos)
    }
}

const genContractTx = async (inputs: Inputs, c: Commitment[], offer: OfferMsg): Promise<[DlcContract, OfferMsg?]> => {
    const o = structuredClone(offer)
    const terms = o.content.terms
    const yesSession = o.content.accept.cetTxSet[0]
    const noSession = o.content.accept.cetTxSet[1]
    const openingSession = o.content.accept.openingTx

    const dlcPromise: Promise<DlcContract> = new Promise(resolveDlc => {
        const yesSessionUpdate: Promise<PublicSession> = new Promise(async resolveYes => {
            const noSessionUpdate: Promise<PublicSession> = new Promise(async resolveNo => {
                const params: DlcParams = {
                    aliceIn: inputs.utxoAlice,
                    bobIn: inputs.utxoBob,
                    aliceAmountIn: inputs.utxoAlice.map(x => x.value),
                    bobAmountIn: inputs.utxoBob.map(x => x.value),
                    oraclePub: o.content.terms.question.capabilityPubKey,
                    oraclePub2: o.content.terms.question2?.capabilityPubKey,
                    oraclePub3: o.content.terms.question3?.capabilityPubKey,
                    outcomes: {
                        "YES": {aliceAmount: terms.partyBetAmount, bobAmount: 0},
                        "NO": {aliceAmount: 0, bobAmount: terms.counterpartyBetAmount}
                    },
                    rValue: c[0].rValueSchnorrHex,
                    rValue2: c[1]?.rValueSchnorrHex,
                    rValue3: c[2]?.rValueSchnorrHex,
                    alicePub: "",
                    bobPub: "",
                    changeAlice: 0, //aliceAmountIn.sum - partyBetAmount
                    changeBob: 0,
                    txfee: 0,
                    openingSession: { sigs: openingSession.partialSigs },
                    session: {
                        "YES":  {
                            sessionId1: yesSession.sessionIds[0],
                            sessionId2: yesSession.sessionIds[1],
                            commitment1: yesSession.sesionCommitments[0],
                            commitment2: yesSession.sesionCommitments[1],
                            nonce1: yesSession.sessionNonces[0],
                            nonce2: yesSession.sessionNonces[1],
                            partSig1: yesSession.partialSigs[0],
                            partSig2: yesSession.partialSigs[1],
                            combinedNonceParity: yesSession.nonceParity[0],
                            update: (p: PublicSession) => {
                                resolveYes(p)
                            }
                        },
                        "NO":  {
                            sessionId1: noSession.sessionIds[0],
                            sessionId2: noSession.sessionIds[1],
                            commitment1: noSession.sesionCommitments[0],
                            commitment2: noSession.sesionCommitments[1],
                            nonce1: noSession.sessionNonces[0],
                            nonce2: noSession.sessionNonces[1],
                            partSig1: noSession.partialSigs[0],
                            partSig2: noSession.partialSigs[1],
                            combinedNonceParity: noSession.nonceParity[0],
                            update: (p: PublicSession) => {
                                resolveNo(p)
                            }
                        }
                    }
                }
                resolveDlc(window.btc.generateDlcContract(params))

            })

            const yes = await yesSessionUpdate
            yesSession.sessionIds[0] = yes.sessionId1
            yesSession.sesionCommitments[0] = yes.commitment1
            yesSession.sessionNonces[0] = yes.nonce1
            yesSession.partialSigs[0] = yes.partSig1
            yesSession.nonceParity[0] = yes.combinedNonceParity
            yesSession.sessionIds[1] = yes.sessionId2
            yesSession.sesionCommitments[1] = yes.commitment2
            yesSession.sessionNonces[1] = yes.nonce2
            yesSession.partialSigs[1] = yes.partSig2

            const no = await noSessionUpdate
            noSession.sessionIds[0] = no.sessionId1
            noSession.sesionCommitments[0] = no.commitment1
            noSession.sessionNonces[0] = no.nonce1
            noSession.partialSigs[0] = no.partSig1
            noSession.nonceParity[0] = no.combinedNonceParity
            noSession.sessionIds[1] = no.sessionId2
            noSession.sesionCommitments[1] = no.commitment2
            noSession.sessionNonces[1] = no.nonce2
            noSession.partialSigs[1] = no.partSig2

        })
    })
    
    const dlc = await dlcPromise
    if (dlc.cet[0] === 'undefined' || dlc.cet[1] === 'undefined') {
        return [dlc, o]
    } else {
        return [dlc, undefined]
    }
    
}

export const btcDlcContractInterpreter: ContractInterpreter = {
    getUtXo: getUtXo,
    genContractTx: genContractTx,
    submitTx: async function (tx: string): Promise<string> {
        throw new Error("Function not implemented.")
    },
    genRedemtionTx: async function (lockingTxId: UTxO, c: Commitment[], fact: Fact, offer: OfferMsg): Promise<string> {
        const terms = offer.content.terms
        const p: CetRedemptionParams = {
            cetTxId: lockingTxId.txid,
            oraclePub: c[0].req.capabilityPubKey,
            oraclePub2: c[1]?.req.capabilityPubKey,
            oraclePub3: c[2]?.req.capabilityPubKey,
            answer: fact.factWithQuestion,
            rValue: c[0].rValueSchnorrHex,
            rValue2: c[1]?.rValueSchnorrHex,
            rValue3: c[2]?.rValueSchnorrHex,
            alicePub: offer.content.pubkeys[0],
            bobPub: offer.content.pubkeys[0],
            oracleSignature: fact.signature,
            amount: (terms.partyBetAmount + terms.counterpartyBetAmount) - terms.txfee,
            txfee: offer.content.terms.txfee
        }
        return window.btc.generateCetRedemptionTransaction(p)
    }
}


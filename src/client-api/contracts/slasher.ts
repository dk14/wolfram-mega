import { OpeningTxSession, PublicSession } from "./btc/tx";
import { CetRedemptionParams, DlcContract, DlcParams, generateCetRedemptionTransaction, generateDlcContract } from "./generate-btc-tx";


/**
 * We implement pairwise quorum commitments here.
 * In the essence they are special case of binary option.
 * This binary option would keep initial distribution of funds intact.
 * If Alice puts 5 satochi into an escrow, and Bob puts 10 satochi into an escrow,
 * Then regardless of the outcome, Alice gets 5 satochi and Bob gets 10 satochi.
 * 
 * The trick is in order to unlock funds, oracles either have to conspire to avoid MAD (which is possible under rgular pledge scenario)
 * Or they have to agree on data (pairwise).
 * 
 * Pledge refunds: partial quorums (2 of 3) refunded partially.
 * Total vote: 100% refund
 * full disagreement - no refund
 * 
 * Note: 
 * 
 * MAD-conspiracy case (multisig) can be omitted by modifying DLC logic.
 * Oracles can simply send funds into adaptor-signature-locked output, bypassing multisig.
 * This however does not exclude conspiracy - since oracles would still be able to agree on data privately, 
 * but not share signatures with users.
 * Thus we simply implement standard DLC-contract here.
 * 
 * Note2:
 * 
 * In any case, oracle conspiracy can be reported in Mega and auto-verified - through `MissingFact` report.
 */

type Hex = string
type Msg = string

interface UTxO {
    txid: Hex
    vout: number
    amount: number
}

interface QuorumUtxos {
    oracle1: UTxO[]
    oracle2: UTxO[]
    oracle3: UTxO[]
}



interface QuorumPubs {
    oracle1Pub: Hex
    oracle2Pub: Hex
    oracle3Pub: Hex
}

interface QuorumDlcs {
    contract12Params: DlcParams
    contract13Params: DlcParams
    contract23Params: DlcParams
    oracle12Dlc: DlcContract
    oracle13Dlc: DlcContract
    oracle23lc: DlcContract
}

interface QuorumPledge {
    oracle1Pledge: number
    oracle2Pledge: number
    oracle3Pledge: number
    oracleCoherentOutcomes: Msg[] //since oracles agreed on pledge - they can agree to cohere messages
    rvalue1: Hex,
    rvalue2: Hex,
    rvalue3: Hex,
    txfee12: number,
    txfee13: number,
    txfee23: number
}

interface QuorumSession {
    oracle12CetSession: {[id: Msg] : PublicSession }
    oracle13CetSession: {[id: Msg] : PublicSession }
    oracle23CetSession: {[id: Msg] : PublicSession }
    oracle12OpeningSession: OpeningTxSession
    oracle13OpeningSession: OpeningTxSession
    oracle23OpeningSession: OpeningTxSession
}

interface QuorumSignatures {
    oracle1Signature: Hex
    oracle2Signature: Hex
    oracle3Signature: Hex
}

interface Slasher {
    genSlashingContract: (quorumUtxOs: QuorumUtxos, quorumPledge: QuorumPledge, quorumPubs: QuorumPubs, quorumSession: QuorumSession) => Promise<QuorumDlcs>
    genRedemtionTx: (quorumno: 1 | 2 | 3, cetTxId: Hex, outcome: Msg, signatures: QuorumSignatures, dlcs: QuorumDlcs, txfee: number) => Promise<Hex>
}

export const btcSlasher: Slasher = {
    genSlashingContract: async function (quorumUtxOs: QuorumUtxos, quorumPledge: QuorumPledge, quorumPubs: QuorumPubs, quorumSession: QuorumSession): Promise<QuorumDlcs> {
        const outcomes12 = Object.fromEntries(quorumPledge
            .oracleCoherentOutcomes
            .map(x => [x, {aliceAmount: quorumPledge.oracle1Pledge, bobAmount: quorumPledge.oracle2Pledge}]))
        
        const contract12Params: DlcParams = {
            aliceIn: quorumUtxOs.oracle1,
            bobIn: quorumUtxOs.oracle2,
            aliceAmountIn: quorumUtxOs.oracle1.map(x => x.amount),
            bobAmountIn: quorumUtxOs.oracle2.map(x => x.amount),
            oraclePub: quorumPubs.oracle1Pub,
            oraclePub2: quorumPubs.oracle2Pub,
            oraclePub3: quorumPubs.oracle3Pub,
            outcomes: outcomes12,
            rValue: quorumPledge.rvalue1,
            rValue2: quorumPledge.rvalue2,
            rValue3: quorumPledge.rvalue3,
            alicePub: quorumPubs.oracle1Pub,
            bobPub: quorumPubs.oracle2Pub,
            changeAlice: quorumUtxOs.oracle1.map(x => x.amount).reduce((a, b) => a + b) 
                - quorumPledge.oracle1Pledge 
                - quorumPledge.txfee12 / 2,
            changeBob: quorumUtxOs.oracle2.map(x => x.amount).reduce((a, b) => a + b) 
                - quorumPledge.oracle2Pledge 
                - quorumPledge.txfee12 / 2,
            txfee: quorumPledge.txfee12,
            session: quorumSession.oracle12CetSession,
            openingSession: quorumSession.oracle12OpeningSession
        }    
        const contract12 = await generateDlcContract(contract12Params)

        const outcomes13 = Object.fromEntries(quorumPledge
            .oracleCoherentOutcomes
            .map(x => [x, {aliceAmount: quorumPledge.oracle1Pledge, bobAmount: quorumPledge.oracle3Pledge}]))
        
        const contract13Params: DlcParams = {
            aliceIn: quorumUtxOs.oracle1,
            bobIn: quorumUtxOs.oracle3,
            aliceAmountIn: quorumUtxOs.oracle1.map(x => x.amount),
            bobAmountIn: quorumUtxOs.oracle3.map(x => x.amount),
            oraclePub: quorumPubs.oracle1Pub,
            oraclePub2: quorumPubs.oracle2Pub,
            oraclePub3: quorumPubs.oracle3Pub,
            outcomes: outcomes13,
            rValue: quorumPledge.rvalue1,
            rValue2: quorumPledge.rvalue2,
            rValue3: quorumPledge.rvalue3,
            alicePub: quorumPubs.oracle1Pub,
            bobPub: quorumPubs.oracle3Pub,
            changeAlice: quorumUtxOs.oracle1.map(x => x.amount).reduce((a, b) => a + b) 
                - quorumPledge.oracle1Pledge 
                - quorumPledge.txfee13 / 2,
            changeBob: quorumUtxOs.oracle3.map(x => x.amount).reduce((a, b) => a + b) 
                - quorumPledge.oracle3Pledge 
                - quorumPledge.txfee13 / 2,
            txfee: quorumPledge.txfee13,
            session: quorumSession.oracle13CetSession,
            openingSession: quorumSession.oracle13OpeningSession
        }    
        const contract13 = await generateDlcContract(contract13Params)

        const outcomes23 = Object.fromEntries(quorumPledge
            .oracleCoherentOutcomes
            .map(x => [x, {aliceAmount: quorumPledge.oracle2Pledge, bobAmount: quorumPledge.oracle3Pledge}]))
        
        const contract23Params: DlcParams = {
                aliceIn: quorumUtxOs.oracle2,
                bobIn: quorumUtxOs.oracle3,
                aliceAmountIn: quorumUtxOs.oracle2.map(x => x.amount),
                bobAmountIn: quorumUtxOs.oracle3.map(x => x.amount),
                oraclePub: quorumPubs.oracle1Pub,
                oraclePub2: quorumPubs.oracle2Pub,
                oraclePub3: quorumPubs.oracle3Pub,
                outcomes: outcomes23,
                rValue: quorumPledge.rvalue1,
                rValue2: quorumPledge.rvalue2,
                rValue3: quorumPledge.rvalue3,
                alicePub: quorumPubs.oracle2Pub,
                bobPub: quorumPubs.oracle3Pub,
                changeAlice: quorumUtxOs.oracle2.map(x => x.amount).reduce((a, b) => a + b) 
                    - quorumPledge.oracle2Pledge 
                    - quorumPledge.txfee23 / 2,
                changeBob: quorumUtxOs.oracle3.map(x => x.amount).reduce((a, b) => a + b) 
                    - quorumPledge.oracle3Pledge 
                    - quorumPledge.txfee23 / 2,
                txfee: quorumPledge.txfee23,
                session: quorumSession.oracle23CetSession,
                openingSession: quorumSession.oracle23OpeningSession
        }    

        const contract23 = await generateDlcContract(contract23Params)
        
        return {
            contract12Params,
            contract13Params,
            contract23Params,
            oracle12Dlc: contract12,
            oracle13Dlc: contract13,
            oracle23lc: contract23
        }
    },
    genRedemtionTx: async function (quorumno: 1 | 2 | 3, cetTxId: Hex, outcome: Msg, signatures: QuorumSignatures,  dlcs: QuorumDlcs, txfee: number): Promise<string> {
        const contractParams = quorumno == 1 ? dlcs.contract12Params : (quorumno == 2 ? dlcs.contract13Params : dlcs.contract23Params) 
        const cetRedemtionParams: CetRedemptionParams = {
            cetTxId,
            oraclePub: contractParams.oraclePub,
            oraclePub2: contractParams.oraclePub2,
            oraclePub3: contractParams.oraclePub3,
            answer: outcome,
            rValue: contractParams.rValue,
            rValue2: contractParams.rValue2,
            rValue3: contractParams.rValue3,
            alicePub: contractParams.alicePub,
            bobPub: contractParams.bobPub,
            oracleSignature: signatures.oracle1Signature,
            oracleSignature2: signatures.oracle2Signature,
            oracleSignature3:  signatures.oracle3Signature,
            amount: contractParams.aliceAmountIn.reduce((a,b) => a + b)
                + contractParams.bobAmountIn.reduce((a,b) => a + b)
                - contractParams.txfee
                - txfee,
            txfee
        }
        return await generateCetRedemptionTransaction(cetRedemtionParams, quorumno)
    }
}
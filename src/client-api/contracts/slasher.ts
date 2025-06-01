import { OpeningTxSession, PublicSession, UTxO } from "./btc/tx";
import { DlcContract, DlcParams, generateDlcContract } from "./generate-btc-tx";


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

interface QuorumUtxos {
    oracle1: UTxO[]
    oracle2: UTxO[]
    oracle3: UTxO[]
}

type Hex = string
type Msg = string

interface QuorumPubs {
    oracle1Pub: Hex
    oracle2Pub: Hex
    oracle3Pub: Hex
}

interface QuorumDlcs {
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
    value2: Hex,
    value3: Hex,
    txfee12: number,
    txfee13: number,
    txfee23: number
}

interface QuorumSession {
    oracle12CetSession: PublicSession
    oracle13CetSession: PublicSession
    oracle23CetSession: PublicSession
    oracle12OpeningSession: {[id: Msg] : OpeningTxSession }
    oracle13OpeningSession: {[id: Msg] : OpeningTxSession }
    oracle23OpeningSession:{[id: Msg] : OpeningTxSession }
}

interface Slasher {
    genSlashingContract: (quorumUtxOs: QuorumUtxos, quorumPledge: QuorumPledge, quorumPubs: QuorumPubs, quorumSession: QuorumSession) => Promise<QuorumDlcs>
    genRedemtionTx: (quorumno: 1 | 2 | 3, dlcs: QuorumDlcs) => Promise<Hex>
}

export const btcSlasher: Slasher = {
    genSlashingContract: async function (quorumUtxOs: QuorumUtxos, quorumPledge: QuorumPledge, quorumPubs: QuorumPubs, quorumSession: QuorumSession): Promise<QuorumDlcs> {
        const contract12Params: DlcParams = {
            aliceIn: quorumUtxOs.oracle1,
            bobIn: quorumUtxOs.oracle2,
            aliceAmountIn: [],
            bobAmountIn: [],
            oraclePub: "",
            oraclePub2: "",
            oraclePub3: "",
            outcomes: {},
            rValue: "",
            rValue2: "",
            rValue3: "",
            alicePub: "",
            bobPub: "",
            changeAlice: 0,
            changeBob: 0,
            txfee: quorumPledge.txfee12,
            session: {},
            openingSession: undefined
        }
        const contract12 = await generateDlcContract(contract12Params)
        return undefined
    },
    genRedemtionTx: function (quorumno: 2 | 1 | 3, dlcs: QuorumDlcs): Promise<string> {
        throw new Error("Function not implemented.");
    }
}
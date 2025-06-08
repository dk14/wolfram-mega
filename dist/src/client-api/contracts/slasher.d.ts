import { OpeningTxSession, PublicSession } from "./btc/tx";
import { DlcContract, DlcParams } from "./generate-btc-tx";
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
type Hex = string;
type Msg = string;
interface UTxO {
    txid: Hex;
    vout: number;
    amount: number;
}
interface QuorumUtxos {
    oracle1: UTxO[];
    oracle2: UTxO[];
    oracle3: UTxO[];
}
interface QuorumPubs {
    oracle1Pub: Hex;
    oracle2Pub: Hex;
    oracle3Pub: Hex;
}
interface QuorumDlcs {
    contract12Params: DlcParams;
    contract13Params: DlcParams;
    contract23Params: DlcParams;
    oracle12Dlc: DlcContract;
    oracle13Dlc: DlcContract;
    oracle23lc: DlcContract;
}
interface QuorumPledge {
    oracle1Pledge: number;
    oracle2Pledge: number;
    oracle3Pledge: number;
    oracleCoherentOutcomes: Msg[];
    rvalue1: Hex;
    rvalue2: Hex;
    rvalue3: Hex;
    txfee12: number;
    txfee13: number;
    txfee23: number;
}
interface QuorumSession {
    oracle12CetSession: {
        [id: Msg]: PublicSession;
    };
    oracle13CetSession: {
        [id: Msg]: PublicSession;
    };
    oracle23CetSession: {
        [id: Msg]: PublicSession;
    };
    oracle12OpeningSession: OpeningTxSession;
    oracle13OpeningSession: OpeningTxSession;
    oracle23OpeningSession: OpeningTxSession;
}
interface QuorumSignatures {
    oracle1Signature: Hex;
    oracle2Signature: Hex;
    oracle3Signature: Hex;
}
interface Slasher {
    genSlashingContract: (quorumUtxOs: QuorumUtxos, quorumPledge: QuorumPledge, quorumPubs: QuorumPubs, quorumSession: QuorumSession) => Promise<QuorumDlcs>;
    genRedemtionTx: (quorumno: 1 | 2 | 3, cetTxId: Hex, outcome: Msg, signatures: QuorumSignatures, dlcs: QuorumDlcs, txfee: number) => Promise<Hex>;
}
export declare const btcSlasher: Slasher;
export {};

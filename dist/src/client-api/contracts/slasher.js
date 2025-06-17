"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.btcSlasher = void 0;
const generate_btc_tx_1 = require("./generate-btc-tx");
exports.btcSlasher = {
    genSlashingContract: async function (quorumUtxOs, quorumPledge, quorumPubs, quorumSession) {
        const outcomes12 = Object.fromEntries(quorumPledge
            .oracleCoherentOutcomes
            .map(x => [x, { aliceAmount: quorumPledge.oracle1Pledge, bobAmount: quorumPledge.oracle2Pledge }]));
        const contract12Params = {
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
            alicePub: () => quorumPubs.oracle1Pub,
            bobPub: () => quorumPubs.oracle2Pub,
            changeAlice: quorumUtxOs.oracle1.map(x => x.amount).reduce((a, b) => a + b)
                - quorumPledge.oracle1Pledge
                - quorumPledge.txfee12 / 2,
            changeBob: quorumUtxOs.oracle2.map(x => x.amount).reduce((a, b) => a + b)
                - quorumPledge.oracle2Pledge
                - quorumPledge.txfee12 / 2,
            txfee: quorumPledge.txfee12,
            session: quorumSession.oracle12CetSession,
            openingSession: quorumSession.oracle12OpeningSession
        };
        const contract12 = await (0, generate_btc_tx_1.generateDlcContract)(contract12Params);
        const outcomes13 = Object.fromEntries(quorumPledge
            .oracleCoherentOutcomes
            .map(x => [x, { aliceAmount: quorumPledge.oracle1Pledge, bobAmount: quorumPledge.oracle3Pledge }]));
        const contract13Params = {
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
            alicePub: () => quorumPubs.oracle1Pub,
            bobPub: () => quorumPubs.oracle3Pub,
            changeAlice: quorumUtxOs.oracle1.map(x => x.amount).reduce((a, b) => a + b)
                - quorumPledge.oracle1Pledge
                - quorumPledge.txfee13 / 2,
            changeBob: quorumUtxOs.oracle3.map(x => x.amount).reduce((a, b) => a + b)
                - quorumPledge.oracle3Pledge
                - quorumPledge.txfee13 / 2,
            txfee: quorumPledge.txfee13,
            session: quorumSession.oracle13CetSession,
            openingSession: quorumSession.oracle13OpeningSession
        };
        const contract13 = await (0, generate_btc_tx_1.generateDlcContract)(contract13Params);
        const outcomes23 = Object.fromEntries(quorumPledge
            .oracleCoherentOutcomes
            .map(x => [x, { aliceAmount: quorumPledge.oracle2Pledge, bobAmount: quorumPledge.oracle3Pledge }]));
        const contract23Params = {
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
            alicePub: () => quorumPubs.oracle2Pub,
            bobPub: () => quorumPubs.oracle3Pub,
            changeAlice: quorumUtxOs.oracle2.map(x => x.amount).reduce((a, b) => a + b)
                - quorumPledge.oracle2Pledge
                - quorumPledge.txfee23 / 2,
            changeBob: quorumUtxOs.oracle3.map(x => x.amount).reduce((a, b) => a + b)
                - quorumPledge.oracle3Pledge
                - quorumPledge.txfee23 / 2,
            txfee: quorumPledge.txfee23,
            session: quorumSession.oracle23CetSession,
            openingSession: quorumSession.oracle23OpeningSession
        };
        const contract23 = await (0, generate_btc_tx_1.generateDlcContract)(contract23Params);
        return {
            contract12Params,
            contract13Params,
            contract23Params,
            oracle12Dlc: contract12,
            oracle13Dlc: contract13,
            oracle23lc: contract23
        };
    },
    genRedemtionTx: async function (quorumno, cetTxId, outcome, signatures, dlcs, txfee) {
        const contractParams = quorumno == 1 ? dlcs.contract12Params : (quorumno == 2 ? dlcs.contract13Params : dlcs.contract23Params);
        const cetRedemtionParams = {
            cetTxId,
            oraclePub: contractParams.oraclePub,
            oraclePub2: contractParams.oraclePub2,
            oraclePub3: contractParams.oraclePub3,
            answer: outcome,
            rValue: contractParams.rValue,
            rValue2: contractParams.rValue2,
            rValue3: contractParams.rValue3,
            alicePub: contractParams.alicePub(outcome),
            bobPub: contractParams.bobPub(outcome),
            oracleSignature: signatures.oracle1Signature,
            oracleSignature2: signatures.oracle2Signature,
            oracleSignature3: signatures.oracle3Signature,
            amount: contractParams.aliceAmountIn.reduce((a, b) => a + b)
                + contractParams.bobAmountIn.reduce((a, b) => a + b)
                - contractParams.txfee
                - txfee,
            txfee
        };
        return await (0, generate_btc_tx_1.generateCetRedemptionTransaction)(cetRedemtionParams, quorumno);
    }
};
//# sourceMappingURL=slasher.js.map
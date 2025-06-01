"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.btcSlasher = void 0;
const generate_btc_tx_1 = require("./generate-btc-tx");
exports.btcSlasher = {
    genSlashingContract: async function (quorumUtxOs, quorumPledge, quorumPubs, quorumSession) {
        const contract12Params = {
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
        };
        const contract12 = await (0, generate_btc_tx_1.generateDlcContract)(contract12Params);
        return undefined;
    },
    genRedemtionTx: function (quorumno, dlcs) {
        throw new Error("Function not implemented.");
    }
};
//# sourceMappingURL=slasher.js.map
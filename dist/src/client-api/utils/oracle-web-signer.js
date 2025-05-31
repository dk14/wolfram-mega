"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSign = void 0;
const schnorr_1 = require("../contracts/btc/schnorr");
const bs58_1 = __importDefault(require("bs58"));
const webSign = async (x) => {
    const commitment = x[0];
    const pk = await window.privateDB.get("secrets", commitment.req.capabilityPubKey);
    if (x[1] === '!RVALUE') {
        const secret = Buffer.from(bs58_1.default.decode(pk)).toString("hex").substring(2, 64 + 2);
        const kValue = (0, schnorr_1.schnorrApi)().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906");
        const rValue = (0, schnorr_1.schnorrApi)().getPub(kValue);
        return rValue;
    }
    else if (x[1] === '') {
        const secret = Buffer.from(bs58_1.default.decode(pk)).toString("hex").substring(2, 64 + 2);
        const kValue = (0, schnorr_1.schnorrApi)().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906");
        const rValue = (0, schnorr_1.schnorrApi)().getPub(kValue);
        const sValue = (0, schnorr_1.schnorrApi)().signatureSValue(secret, kValue, JSON.stringify(commitment)).padStart(64, "0");
        return rValue + sValue;
    }
};
exports.webSign = webSign;
//# sourceMappingURL=oracle-web-signer.js.map
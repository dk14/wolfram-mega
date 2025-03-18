"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.powOverOffer = exports.powOverReport = exports.powOverOracleCapability = exports.powOverOracleId = void 0;
const util_1 = require("./util");
const powOverOracleId = async (o, difficulty, algorithm = "SHA256") => {
    const res = (0, util_1.mine)(difficulty, o.pubkey, algorithm);
    return {
        difficulty,
        algorithm,
        hash: res.hash,
        magicNo: res.magicNo,
        magicString: res.magicString
    };
};
exports.powOverOracleId = powOverOracleId;
const powOverOracleCapability = async (cp, difficulty, algorithm = "SHA256") => {
    const res = (0, util_1.mine)(difficulty, cp.oracleSignature, algorithm);
    return {
        difficulty,
        algorithm,
        hash: res.hash,
        magicNo: res.magicNo,
        magicString: res.magicString
    };
};
exports.powOverOracleCapability = powOverOracleCapability;
const powOverReport = async (r, difficulty, algorithm = "SHA256") => {
    const res = (0, util_1.mine)(difficulty, JSON.stringify(r.content), algorithm);
    return {
        difficulty,
        algorithm,
        hash: res.hash,
        magicNo: res.magicNo,
        magicString: res.magicString
    };
};
exports.powOverReport = powOverReport;
const powOverOffer = async (offer, difficulty, algorithm = "SHA256") => {
    const res = (0, util_1.mine)(difficulty, JSON.stringify(offer.content), algorithm);
    return {
        difficulty,
        algorithm,
        hash: res.hash,
        magicNo: res.magicNo,
        magicString: res.magicString
    };
};
exports.powOverOffer = powOverOffer;
//# sourceMappingURL=pow.js.map
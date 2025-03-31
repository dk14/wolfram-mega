"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mine = exports.hash = void 0;
const crypto_1 = require("crypto");
const hash = (msg, algo = "SHA256") => {
    return (0, crypto_1.createHash)(algo).update(msg).digest('hex');
};
exports.hash = hash;
const mine = (difficulty, preimage, algorithm) => {
    var magicNo = 0;
    var magicString = "";
    while (!(0, exports.hash)(preimage + magicNo + magicString, algorithm).endsWith("0".repeat(difficulty))) {
        magicNo++;
    }
    return {
        magicNo,
        magicString,
        hash: (0, exports.hash)(preimage + magicNo + magicString, algorithm)
    };
};
exports.mine = mine;
//# sourceMappingURL=util.js.map
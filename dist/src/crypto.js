"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testOnlySignEd = exports.testOnlySign = exports.testOnlyGenerateKeyPairEd = exports.testOnlyGenerateKeyPair = exports.createPemPkEd = exports.createPemPk = void 0;
const crypto_1 = require("crypto");
const curve = 'secp521r1';
const regexPem = /.{64}/g;
const createPemPk = (base64) => {
    return '-----BEGIN EC PRIVATE KEY-----\n' + base64.replace(regexPem, '$&\n') + '\n-----END EC PRIVATE KEY-----\n';
};
exports.createPemPk = createPemPk;
const createPemPkEd = (base64) => {
    const pem = '-----BEGIN PRIVATE KEY-----\n' + base64.replace(regexPem, '$&\n') + '-----END PRIVATE KEY-----\n';
    return (0, crypto_1.createPrivateKey)({ key: pem });
};
exports.createPemPkEd = createPemPkEd;
const testOnlyGenerateKeyPair = () => {
    const { publicKey, privateKey } = (0, crypto_1.generateKeyPairSync)('ec', { namedCurve: curve });
    return {
        pub: publicKey.export({ type: 'spki', format: 'der' }).toString('base64'),
        pk: privateKey.export({ type: 'sec1', format: 'der' }).toString('base64')
    };
};
exports.testOnlyGenerateKeyPair = testOnlyGenerateKeyPair;
const testOnlyGenerateKeyPairEd = () => {
    const { publicKey, privateKey } = (0, crypto_1.generateKeyPairSync)('ed25519');
    return {
        pub: publicKey.export({ type: 'spki', format: 'der' }).toString('base64'),
        pk: privateKey.export({ type: 'pkcs8', format: 'der' }).toString('base64')
    };
};
exports.testOnlyGenerateKeyPairEd = testOnlyGenerateKeyPairEd;
const testOnlySign = (msg, pk) => {
    return (0, crypto_1.createSign)('SHA256').update(msg).sign((0, exports.createPemPk)(pk), 'base64');
};
exports.testOnlySign = testOnlySign;
const testOnlySignEd = (msg, pk) => {
    return (0, crypto_1.sign)(null, Buffer.from(msg), (0, exports.createPemPkEd)(pk)).toString('base64');
};
exports.testOnlySignEd = testOnlySignEd;
//# sourceMappingURL=crypto.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.testOnlyReset = exports.checkPow = exports.testOnlySign = exports.testOnlyGenerateKeyPair = exports.createPemPk = exports.createPemPub = void 0;
const crypto_1 = require("crypto");
const request = __importStar(require("request"));
const fs = __importStar(require("fs"));
const util_1 = require("./util");
const openapi_enforcer_1 = __importDefault(require("openapi-enforcer"));
const inspector_1 = require("inspector");
const openapi = (0, openapi_enforcer_1.default)('./wolfram-mega-spec.yaml');
const curve = 'secp521r1';
const regexPem = /.{64}/g;
const createPemPub = (base64) => {
    return '-----BEGIN PUBLIC KEY-----\n' + base64.replace(regexPem, '$&\n') + '\n-----END PUBLIC KEY-----\n';
};
exports.createPemPub = createPemPub;
const createPemPk = (base64) => {
    return '-----BEGIN EC PRIVATE KEY-----\n' + base64.replace(regexPem, '$&\n') + '\n-----END EC PRIVATE KEY-----\n';
};
exports.createPemPk = createPemPk;
const testOnlyGenerateKeyPair = () => {
    const { publicKey, privateKey } = (0, crypto_1.generateKeyPairSync)('ec', { namedCurve: curve });
    return {
        pub: publicKey.export({ type: 'spki', format: 'der' }).toString('base64'),
        pk: privateKey.export({ type: 'sec1', format: 'der' }).toString('base64')
    };
};
exports.testOnlyGenerateKeyPair = testOnlyGenerateKeyPair;
const testOnlySign = (msg, pk) => {
    return (0, crypto_1.createSign)('SHA256').update(msg).sign((0, exports.createPemPk)(pk), 'base64');
};
exports.testOnlySign = testOnlySign;
const checkPow = (pow, preimage) => {
    if (!pow.hash.endsWith("0".repeat(pow.difficulty))) {
        return false;
    }
    return (0, util_1.hash)(preimage + pow.magicNo + (pow.magicString ?? ""), pow.algorithm) === pow.hash;
};
exports.checkPow = checkPow;
const checkCapabilitySignature = (cp) => {
    const signature = cp.oracleSignature;
    const pow = cp.pow;
    cp.oracleSignature = "";
    cp.pow = undefined;
    const res = (0, crypto_1.createVerify)(cp.oracleSignatureType).update(JSON.stringify(cp)).verify((0, exports.createPemPub)(cp.oraclePubKey), signature, 'base64');
    cp.oracleSignature = signature;
    cp.pow = pow;
    return res;
};
const checkOracleIdSignature = (o) => {
    const signature = o.oracleSignature;
    o.oracleSignature = "";
    const res = (0, crypto_1.createVerify)(o.oracleSignatureType).update(JSON.stringify(o)).verify((0, exports.createPemPub)(o.pubkey), signature, 'base64');
    o.oracleSignature = signature;
    return res;
};
const checkOracleRank = (cfg, oracle, mempool) => {
    if (Object.keys(mempool.oracles).length >= cfg.maxOracles) {
        const evict = Object.values(mempool.oracles).find(o => o.id.bid.amount <= oracle.bid.amount && o.id.pow.difficulty <= oracle.pow.difficulty);
        if (evict !== undefined) {
            delete mempool.oracles[evict.id.pubkey];
            return true;
        }
        return false;
    }
    return true;
};
const checkCapabilityRank = (cfg, cp, o) => {
    if (o.capabilies.length >= cfg.maxCapabilities) {
        const index = o.capabilies.findIndex(c => c.pow.difficulty <= cp.pow.difficulty);
        if (index > -1) {
            o.capabilies.splice(index, 1);
            return true;
        }
        return false;
    }
    return true;
};
const checkReportRank = (cfg, report, o) => {
    if (o.reports.length >= cfg.maxReports) {
        const index = o.reports.findIndex(r => r.pow.difficulty <= report.pow.difficulty);
        if (index > -1) {
            o.reports.splice(index, 1);
            return true;
        }
        return false;
    }
    return true;
};
const checkOfferRank = (cfg, offer, m) => {
    if (m.offers.length >= (cfg.maxOffers ?? 0)) {
        const index = m.offers.findIndex(r => r.pow.difficulty <= offer.pow.difficulty);
        if (index > -1) {
            m.offers.splice(index, 1);
            return true;
        }
        return false;
    }
    return true;
};
const validateBid = async (cfg, bid) => {
    /* c8 ignore start */
    if (cfg.lnRestHost === undefined || cfg.lnMacaroonPath === undefined || cfg.facilitatorId === undefined || cfg.facilitatorId.rewardAddress === undefined) {
        return false;
    }
    if (bid.paymentType === undefined || bid.paymentType === "lightning") {
        let options = {
            url: 'https://' + cfg.lnRestHost + '/v1/invoice/' + bid.proof,
            rejectUnauthorized: false,
            json: true,
            headers: {
                'Grpc-Metadata-macaroon': fs.readFileSync(cfg.lnMacaroonPath).toString('hex'),
            },
        };
        return new Promise(function (resolve, reject) {
            request.get(options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    if (body.payment_addr === cfg.facilitatorId?.rewardAddress && body.amt_paid_msat === bid.amount && body.state === "SETTLED") {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
                else {
                    reject(error);
                }
            });
        });
    }
    return false;
    /* c8 ignore end */
};
const validateFact = (fact, req) => {
    return (0, crypto_1.createVerify)(fact.signatureType).update(fact.factWithQuestion).verify((0, exports.createPemPub)(req.capabilityPubKey), fact.signature, 'base64');
};
const testOnlyReset = () => {
    //could've made api a factory, but this is more realistic, 
    //since implementations of Api ackuiring sockets, files, databases and other resources 
    //are outside of the scope of node.ts module
    exports.api.mempool.oracles = {};
    exports.api.mempool.offers = [];
};
exports.testOnlyReset = testOnlyReset;
exports.api = {
    mempool: {
        oracles: {},
        offers: []
    },
    announceOracle: async (cfg, id) => {
        const [_, error] = (await openapi).request({ method: 'POST', path: '/oracle', body: id });
        if (error !== undefined) {
            return ['invalid request', error.toString()];
        }
        if (!(id.pow.difficulty == 0 || checkOracleIdSignature(id))) {
            return "wrong signature";
        }
        if ((0, exports.checkPow)(id.pow, id.pubkey) || id.pow.difficulty == 0) {
            if (!(id.bid.amount == 0 || await validateBid(cfg, id.bid))) {
                id.bid.amount = 0; //todo unsafe
            }
            if (checkOracleRank(cfg, id, exports.api.mempool)) {
                if (exports.api.mempool.oracles[id.pubkey] === undefined) {
                    exports.api.mempool.oracles[id.pubkey] = {
                        id,
                        capabilies: [],
                        reports: []
                    };
                    return "success";
                }
                else {
                    if (exports.api.mempool.oracles[id.pubkey].id.seqNo < id.seqNo && exports.api.mempool.oracles[id.pubkey].id.pow.difficulty <= id.pow.difficulty) {
                        exports.api.mempool.oracles[id.pubkey].id.seqNo = id.seqNo;
                        exports.api.mempool.oracles[id.pubkey].id.pow = id.pow;
                        return "success";
                    }
                    else {
                        return "duplicate";
                    }
                }
            }
            else {
                return "low pow difficulty";
            }
        }
        else {
            return "wrong pow";
        }
    },
    announceCapability: async (cfg, cp) => {
        const [_, error] = (await openapi).request({ method: 'POST', path: '/capability', body: cp });
        if (error !== undefined) {
            return ['invalid request', error.toString()];
        }
        if (exports.api.mempool.oracles[cp.oraclePubKey] === undefined) {
            return 'no oracle found';
        }
        if (cp.pow.difficulty == 0 || checkCapabilitySignature(cp)) {
            if (cp.pow.difficulty == 0 || (0, exports.checkPow)(cp.pow, cp.oracleSignature)) {
                if (checkCapabilityRank(cfg, cp, exports.api.mempool.oracles[cp.oraclePubKey])) {
                    const found = exports.api.mempool.oracles[cp.oraclePubKey].capabilies.find(x => x.question == cp.question);
                    if (found !== undefined) {
                        if (found.seqNo < cp.seqNo && found.pow.difficulty <= cp.pow.difficulty) {
                            found.seqNo = cp.seqNo;
                            found.pow = cp.pow;
                            found.off = cp.off;
                            return "success";
                        }
                        else {
                            return "duplicate";
                        }
                    }
                    exports.api.mempool.oracles[cp.oraclePubKey].capabilies.push(cp);
                    return "success";
                }
                else {
                    return "low pow difficulty";
                }
            }
            else {
                return "wrong pow";
            }
        }
        else {
            return "wrong signature";
        }
    },
    reportMalleability: async (cfg, report) => {
        const [_, error] = (await openapi).request({ method: 'POST', path: '/report', body: report });
        if (error !== undefined) {
            return ['invalid request', error.toString()];
        }
        if (exports.api.mempool.oracles[report.oraclePubKey] === undefined) {
            return 'no oracle found';
        }
        if (!(0, exports.checkPow)(report.pow, JSON.stringify(report.content)) && !(report.pow.difficulty == 0)) {
            return "wrong pow";
        }
        if (!checkReportRank(cfg, report, exports.api.mempool.oracles[report.oraclePubKey])) {
            return "low pow difficulty";
        }
        const found = exports.api.mempool.oracles[report.oraclePubKey].reports.find(x => x.pow.hash == report.pow.hash);
        if (found !== undefined) {
            if (found.seqNo < report.seqNo) {
                found.seqNo = report.seqNo;
                return "success";
            }
            else {
                return "duplicate";
            }
        }
        exports.api.mempool.oracles[report.oraclePubKey].reports.push(report);
        return "success";
    },
    disputeMissingfactClaim: async (dispute) => {
        const [_, error] = (await openapi).request({ method: 'POST', path: '/dispute', body: dispute });
        if (error !== undefined) {
            return ['invalid request', error.toString()];
        }
        if (exports.api.mempool.oracles[dispute.oraclePubKey] === undefined) {
            return 'no oracle found';
        }
        const oracle = exports.api.mempool.oracles[dispute.oraclePubKey];
        if (!validateFact(dispute.fact, dispute.claim.request)) {
            return "invalid fact";
        }
        if (oracle !== undefined) {
            const found = exports.api.mempool.oracles[oracle.id.pubkey].reports.find(x => x.content.type == "fact-missing" && x.pow.hash == dispute.reportPow.hash);
            if (found !== undefined && found.content.type == 'fact-missing') {
                found.content.dispute = dispute.fact;
                return "success";
            }
            else {
                return "report not found";
            }
        }
        else {
            return 'no oracle found';
        }
    },
    lookupOracles: async (paging, questions) => {
        return Object.values(exports.api.mempool.oracles)
            .sort((a, b) => a.id.bid.amount - b.id.bid.amount)
            .map(x => x.id)
            .slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    lookupCapabilities: async (paging, oraclePub) => {
        if (exports.api.mempool.oracles[oraclePub] === undefined) {
            inspector_1.console.log("oracle not found " + oraclePub);
            return [];
        }
        return exports.api.mempool.oracles[oraclePub].capabilies.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    lookupReports: async (paging, oraclePub) => {
        if (exports.api.mempool.oracles[oraclePub] === undefined) {
            inspector_1.console.log("oracle not found " + oraclePub);
            return [];
        }
        return exports.api.mempool.oracles[oraclePub].reports.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    publishOffer: async function (cfg, offer) {
        const [_, error] = (await openapi).request({ method: 'POST', path: '/offer', body: offer });
        if (error !== undefined) {
            return ['invalid request', error.toString()];
        }
        if (!(0, exports.checkPow)(offer.pow, JSON.stringify(offer.content)) && !(offer.pow.difficulty == 0)) {
            return "wrong pow";
        }
        if (!checkOfferRank(cfg, offer, exports.api.mempool)) {
            return "low pow difficulty";
        }
        const found = exports.api.mempool.offers.find(x => x.pow.hash === offer.pow.hash);
        if (found !== undefined) {
            if (found.seqNo < offer.seqNo && found.pow.difficulty <= offer.pow.difficulty) {
                found.seqNo = offer.seqNo;
                found.pow = offer.pow;
                return "success";
            }
            return "duplicate";
        }
        const cp = Object.values(exports.api.mempool.oracles).find(o => o.capabilies.find(c => c.capabilityPubKey === offer.content.terms.question.capabilityPubKey) !== undefined);
        if (cp === undefined) {
            return "no oracle found";
        }
        exports.api.mempool.offers.push(offer);
        return "success";
    },
    lookupOffers: async function (paging, capabilityPubKey) {
        return exports.api.mempool.offers.filter(o => o.content.terms.question.capabilityPubKey === capabilityPubKey)
            .slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    }
};
//# sourceMappingURL=node.js.map
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
exports.api = exports.testOnlyReset = exports.checkOracleIdSignature = exports.checkCapabilitySignature = exports.checkPow = exports.createPemPub = void 0;
const crypto_1 = require("crypto");
const node_fetch_1 = __importDefault(require("node-fetch"));
const https_1 = __importDefault(require("https"));
const fs = __importStar(require("fs"));
const util_1 = require("./util");
const openapi_enforcer_1 = __importDefault(require("openapi-enforcer"));
const openapi_request_validator_1 = __importDefault(require("openapi-request-validator"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const regexPem = /.{64}/g;
const createPemPub = (base64) => {
    return '-----BEGIN PUBLIC KEY-----\n' + base64.replace(regexPem, '$&\n') + '\n-----END PUBLIC KEY-----\n';
};
exports.createPemPub = createPemPub;
/* c8 ignore start */
const openapi = !(0, util_1.isBrowser)() ? (0, openapi_enforcer_1.default)(__dirname + '/../wolfram-mega-spec.yaml')
    : new openapi_request_validator_1.default(js_yaml_1.default.load(window.spec));
const validate = async (msg, path, method) => {
    if (!(0, util_1.isBrowser)()) {
        const [_, error] = (await openapi).request({ method, path, body: msg });
        return error;
    }
    else {
        const request = {
            path,
            headers: {
                'content-type': 'application/json'
            },
            body: msg,
            params: {},
        };
        return openapi.validateRequest(request);
    }
};
const checkPow = (pow, preimage) => {
    if (!pow.hash.endsWith("0".repeat(pow.difficulty))) {
        return false;
    }
    return (0, util_1.hash)(preimage + pow.magicNo + (pow.magicString ?? ""), pow.algorithm) === pow.hash;
};
exports.checkPow = checkPow;
const checkCapabilitySignature = (cp) => {
    const signature = cp.oracleSignature;
    const cttl = cp.cTTL;
    cp.cTTL = 0;
    const pow = cp.pow;
    cp.oracleSignature = "";
    cp.pow = undefined;
    const res = (0, crypto_1.createVerify)(cp.oracleSignatureType).update(JSON.stringify(cp)).verify((0, exports.createPemPub)(cp.oraclePubKey), signature, 'base64');
    cp.oracleSignature = signature;
    cp.pow = pow;
    cp.cTTL = cttl;
    return res;
};
exports.checkCapabilitySignature = checkCapabilitySignature;
const checkOracleIdSignature = (o) => {
    const signature = o.oracleSignature;
    const cttl = o.cTTL;
    o.cTTL = 0;
    o.oracleSignature = "";
    const res = (0, crypto_1.createVerify)(o.oracleSignatureType).update(JSON.stringify(o)).verify((0, exports.createPemPub)(o.pubkey), signature, 'base64');
    o.oracleSignature = signature;
    o.cTTL = cttl;
    return res;
};
exports.checkOracleIdSignature = checkOracleIdSignature;
const evaluateStrength = (oracle, mempool) => {
    const cps = mempool.oracles[oracle.pubkey].capabilies;
    if (cps.length == 0) {
        return oracle.pow.difficulty;
    }
    else {
        return cps.map(cp => cp.pow.difficulty).reduce((a, b) => a + b) + oracle.pow.difficulty;
    }
};
const checkOracleRank = (cfg, oracle, mempool) => {
    if (oracle.pow.difficulty < (cfg.powThresholdOracles ?? 0)) {
        return false;
    }
    if (Object.keys(mempool.oracles).length >= cfg.maxOracles) {
        const evict = Object.values(mempool.oracles).find(o => o.id.bid.amount <= oracle.bid.amount && evaluateStrength(o.id, mempool) <= oracle.pow.difficulty);
        /* c8 ignore start */
        if (cfg.randomEvictionRate) {
            const n = Object.values(mempool.oracles).length;
            const random = Buffer.from(oracle.pow.hash + "1212", "hex");
            const victim = Object.values(mempool.oracles)[random[random.length - 1] % n];
            const random2 = Buffer.from(victim.id.pow.hash + "1213", "hex");
            if (random2[random2.length - 1] % (1 / cfg.randomEvictionRate) === 0) {
                delete mempool.oracles[victim.id.pubkey];
                return true;
            }
        }
        /* c8 ignore end */
        if (evict !== undefined) {
            delete mempool.oracles[evict.id.pubkey];
            return true;
        }
        return false;
    }
    return true;
};
const checkCapabilityRank = (cfg, cp, o) => {
    if (cp.pow.difficulty < (cfg.powThresholdCapabilities ?? 0)) {
        return false;
    }
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
    if (report.pow.difficulty < (cfg.powThresholdReports ?? 0)) {
        return false;
    }
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
    if (offer.pow.difficulty < (cfg.powThresholdOffers ?? 0)) {
        return false;
    }
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
        try {
            const headers = new Headers();
            headers['Grpc-Metadata-macaroon'] = fs.readFileSync(cfg.lnMacaroonPath).toString('hex');
            const httpsAgent = new https_1.default.Agent({
                rejectUnauthorized: false
            });
            const body = await (await (0, node_fetch_1.default)('https://' + cfg.lnRestHost + '/v1/invoice/' + bid.proof, {
                headers,
                agent: httpsAgent,
            })).json();
            return body.payment_addr === cfg.facilitatorId?.rewardAddress && body.amt_paid_msat === bid.amount && body.state === "SETTLED";
        }
        catch (err) {
            return false;
        }
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
    //are outside of the scope of api.ts module
    mempool.oracles = {};
    mempool.offers = [];
};
exports.testOnlyReset = testOnlyReset;
const mempool = {
    oracles: {},
    offers: []
};
exports.api = {
    announceOracle: async (cfg, id) => {
        const error = await validate(id, '/oracle', 'POST');
        if (error !== undefined) {
            return ['invalid request', error.toString()];
        }
        if (!(id.pow.difficulty == 0 || (0, exports.checkOracleIdSignature)(id))) {
            return "wrong signature";
        }
        if ((0, exports.checkPow)(id.pow, id.pubkey) || id.pow.difficulty == 0) {
            if (!(id.bid.amount == 0 || await validateBid(cfg, id.bid))) {
                id.bid.amount = 0; //todo unsafe
            }
            if (checkOracleRank(cfg, id, mempool)) {
                if (mempool.oracles[id.pubkey] === undefined) {
                    mempool.oracles[id.pubkey] = {
                        id,
                        capabilies: [],
                        reports: []
                    };
                    return "success";
                }
                else {
                    if (mempool.oracles[id.pubkey].id.seqNo < id.seqNo && mempool.oracles[id.pubkey].id.pow.difficulty <= id.pow.difficulty) {
                        mempool.oracles[id.pubkey].id.seqNo = id.seqNo;
                        mempool.oracles[id.pubkey].id.pow = id.pow;
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
        const error = await validate(cp, '/capability', 'POST');
        if (error !== undefined) {
            return ['invalid request', error.toString()];
        }
        if (mempool.oracles[cp.oraclePubKey] === undefined) {
            return 'no oracle found';
        }
        if (cp.pow.difficulty == 0 || (0, exports.checkCapabilitySignature)(cp)) {
            if (cp.pow.difficulty == 0 || (0, exports.checkPow)(cp.pow, cp.oracleSignature)) {
                if (checkCapabilityRank(cfg, cp, mempool.oracles[cp.oraclePubKey])) {
                    const found = mempool.oracles[cp.oraclePubKey].capabilies.find(x => x.capabilityPubKey === cp.capabilityPubKey);
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
                    mempool.oracles[cp.oraclePubKey].capabilies.push(cp);
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
        const error = await validate(report, '/report', 'POST');
        if (error !== undefined) {
            return ['invalid request', error.toString()];
        }
        if (mempool.oracles[report.oraclePubKey] === undefined) {
            return 'no oracle found';
        }
        if (!(0, exports.checkPow)(report.pow, JSON.stringify(report.content)) && !(report.pow.difficulty == 0)) {
            return "wrong pow";
        }
        if (!checkReportRank(cfg, report, mempool.oracles[report.oraclePubKey])) {
            return "low pow difficulty";
        }
        const found = mempool.oracles[report.oraclePubKey].reports.find(x => x.pow.hash === report.pow.hash);
        if (found !== undefined) {
            if (found.seqNo < report.seqNo) {
                found.seqNo = report.seqNo;
                return "success";
            }
            else {
                return "duplicate";
            }
        }
        mempool.oracles[report.oraclePubKey].reports.push(report);
        return "success";
    },
    disputeMissingfactClaim: async (dispute) => {
        const error = await validate(dispute, '/dispute', 'POST');
        if (error !== undefined) {
            return ['invalid request', error.toString()];
        }
        if (mempool.oracles[dispute.oraclePubKey] === undefined) {
            return 'no oracle found';
        }
        const oracle = mempool.oracles[dispute.oraclePubKey];
        if (!validateFact(dispute.fact, dispute.claim.request)) {
            return "invalid fact";
        }
        if (oracle !== undefined) {
            const found = mempool.oracles[oracle.id.pubkey].reports.find(x => x.content.type == "fact-missing" && x.pow.hash == dispute.reportPow.hash);
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
    lookupOracles: async (paging) => {
        return Object.values(mempool.oracles)
            .sort((a, b) => a.id.bid.amount - b.id.bid.amount)
            .map(x => x.id)
            .slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    lookupCapabilities: async (paging, oraclePub) => {
        if (mempool.oracles[oraclePub] === undefined) {
            return [];
        }
        return mempool.oracles[oraclePub].capabilies.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    lookupReports: async (paging, oraclePub) => {
        if (mempool.oracles[oraclePub] === undefined) {
            return [];
        }
        return mempool.oracles[oraclePub].reports.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    },
    publishOffer: async function (cfg, offer) {
        const error = await validate(offer, '/offer', 'POST');
        if (error !== undefined) {
            return ['invalid request', error.toString()];
        }
        if (!(0, exports.checkPow)(offer.pow, JSON.stringify(offer.content)) && !(offer.pow.difficulty == 0)) {
            return "wrong pow";
        }
        if (!checkOfferRank(cfg, offer, mempool)) {
            return "low pow difficulty";
        }
        const found = mempool.offers.find(x => x.pow.hash === offer.pow.hash);
        if (found !== undefined) {
            if (found.seqNo < offer.seqNo && found.pow.difficulty <= offer.pow.difficulty) {
                found.seqNo = offer.seqNo;
                found.pow = offer.pow;
                return "success";
            }
            return "duplicate";
        }
        const cp = Object.values(mempool.oracles).find(o => o.capabilies.find(c => c.capabilityPubKey === offer.content.terms.question.capabilityPubKey) !== undefined);
        if (cp === undefined) {
            return "no oracle found";
        }
        mempool.offers.push(offer);
        return "success";
    },
    lookupOffers: async function (paging, capabilityPubKey) {
        return mempool.offers.filter(o => o.content.terms.question.capabilityPubKey === capabilityPubKey)
            .slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
    }
};
//# sourceMappingURL=api.js.map
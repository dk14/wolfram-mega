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
Object.defineProperty(exports, "__esModule", { value: true });
const nd = __importStar(require("../src/api"));
const assert = __importStar(require("assert"));
const pow = __importStar(require("../src/pow"));
const crypto_1 = require("../src/crypto");
(async () => {
    const cfg = {
        "maxOracles": 2,
        "maxCapabilities": 2,
        "maxReports": 2,
        "maxOffers": 2,
        "maxConnections": 100,
        "maxMsgLength": 1000000,
        "httpPort": 8080,
        "p2pPort": 8333,
        "isTest": true,
        "p2pseed": []
    };
    const oracle1Pub = "AAA";
    const capability1Pub = "BBB";
    const capability2Pub = "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEKWN+hSgqzb2rE7ft4fXBrIyXeRwfHHa3IMD7XDiZq/KnVRQrY47lmCwIScqOE+PAqtbovxPCRK5C6euYYRv7lg==";
    const keypairOracle2 = (0, crypto_1.testOnlyGenerateKeyPair)();
    const keypairOracle3 = (0, crypto_1.testOnlyGenerateKeyPair)();
    const pow1 = {
        difficulty: 0,
        algorithm: 'SHA256',
        hash: '',
        magicNo: 0
    };
    const pow2 = {
        difficulty: 0,
        algorithm: 'SHA256',
        hash: '2222222',
        magicNo: 0
    };
    const bid1 = {
        amount: 0,
        proof: ''
    };
    const oracle1 = {
        pubkey: oracle1Pub,
        oracleSignature: "MEUCIEhiQz9Ki/ySbtMQAHCF8CA9D8GCGYcaLPTFdCqNDcCSAiEAtdy4O7yYNJFB57qk5glZDYAO0njeC0GHc++YXcc8KGU=",
        seqNo: 0,
        cTTL: 0,
        pow: pow1,
        bid: bid1,
        oracleSignatureType: 'SHA256'
    };
    const oracle2 = {
        pubkey: undefined,
        oracleSignature: undefined,
        seqNo: 0,
        cTTL: 0,
        pow: undefined,
        bid: bid1,
        oracleSignatureType: 'SHA256'
    };
    const capability1 = {
        oraclePubKey: keypairOracle3.pub,
        capabilityPubKey: capability1Pub,
        question: 'What?',
        seqNo: 0,
        cTTL: 0,
        oracleSignature: '', //signature is only checked when pow difficulty higher than 0
        oracleSignatureType: 'SHA256',
        pow: pow1
    };
    const capability3 = {
        oraclePubKey: undefined,
        capabilityPubKey: undefined,
        question: 'What?',
        seqNo: 0,
        cTTL: 0,
        oracleSignature: '', //signature is only checked when pow difficulty higher than 0
        oracleSignatureType: 'SHA256',
        pow: undefined
    };
    const capability4 = structuredClone(capability1);
    capability4.pow = undefined;
    capability4.question = "hello?";
    capability4.capabilityPubKey = (0, crypto_1.testOnlyGenerateKeyPair)().pub;
    capability4.oracleSignature = "";
    capability4.oracleSignature = (0, crypto_1.testOnlySign)(JSON.stringify(capability4), keypairOracle3.pk);
    capability4.pow = await pow.powOverOracleCapability(capability4, 2);
    const capability5 = structuredClone(capability1);
    capability5.pow = undefined;
    capability5.question = "hellooo?";
    capability5.capabilityPubKey = (0, crypto_1.testOnlyGenerateKeyPair)().pub;
    capability5.oracleSignature = "";
    capability5.oracleSignature = (0, crypto_1.testOnlySign)(JSON.stringify(capability5), keypairOracle3.pk);
    capability5.pow = await pow.powOverOracleCapability(capability5, 2);
    const capability6 = structuredClone(capability1);
    capability6.pow = undefined;
    capability6.question = "hellooo???";
    capability6.capabilityPubKey = (0, crypto_1.testOnlyGenerateKeyPair)().pub;
    capability6.oracleSignature = "";
    capability6.oracleSignature = (0, crypto_1.testOnlySign)(JSON.stringify(capability6), keypairOracle3.pk);
    capability6.pow = await pow.powOverOracleCapability(capability6, 1);
    const factreq1 = {
        capabilityPubKey: capability4.capabilityPubKey,
        arguments: {}
    };
    const factreq2 = {
        capabilityPubKey: capability2Pub,
        arguments: {}
    };
    const malleability1 = {
        type: 'fact-disagreees-with-public',
        request: factreq1
    };
    const report1 = {
        seqNo: 0,
        cTTL: 0,
        pow: pow1,
        oraclePubKey: keypairOracle3.pub,
        content: malleability1
    };
    const malleability2 = {
        type: 'fact-missing',
        request: factreq2,
        capabilitySignatureOverRequest: ''
    };
    const report2 = {
        seqNo: 0,
        cTTL: 0,
        pow: pow2,
        oraclePubKey: keypairOracle3.pub,
        content: malleability2
    };
    const report3 = {
        seqNo: 0,
        cTTL: 0,
        pow: undefined,
        oraclePubKey: undefined,
        content: malleability2
    };
    const fact1 = {
        factWithQuestion: 'Who? You!',
        signatureType: 'SHA256',
        signature: 'MEUCIEhiQz9Ki/ySbtMQAHCF8CA9D8GCGYcaLPTFdCqNDcCSAiEAtdy4O7yYNJFB57qk5glZDYAO0njeC0GHc++YXcc8KGU='
    };
    const fact1wrongsig = {
        factWithQuestion: 'Who? You!',
        signatureType: 'SHA256',
        signature: 'MEUCIQDARG92FNR9WVyNnQQuCQz0drTz5qyv78OtWGI6U1za1gIgMPYSTpcjVQwCZaetX/35vt4lKZFkMGAX9tqWrDrUIsI='
    };
    const dispute1 = {
        claim: malleability2,
        reportPow: pow2,
        oraclePubKey: keypairOracle3.pub,
        fact: fact1
    };
    const dispute1wrongreport = {
        claim: malleability2,
        reportPow: pow1,
        oraclePubKey: keypairOracle3.pub,
        fact: fact1
    };
    const dispute1wrongfactsig = {
        claim: malleability2,
        reportPow: pow2,
        oraclePubKey: keypairOracle3.pub,
        fact: fact1wrongsig
    };
    const offerTerms1 = {
        question: factreq1,
        partyBetsOn: ["me"],
        counterPartyBetsOn: ["you"],
        partyBetAmount: 100,
        counterpartyBetAmount: 200
    };
    const offer1 = {
        message: '',
        customContract: 'extra terms',
        terms: offerTerms1,
        blockchain: 'bitcoin-testnet', //will be used in clientApi
        contact: ''
    };
    const offerTermsWrongOracle = {
        question: factreq2,
        partyBetsOn: ["me"],
        counterPartyBetsOn: ["you"],
        partyBetAmount: 100,
        counterpartyBetAmount: 200
    };
    const offerWrongOracle = {
        message: '',
        customContract: 'extra terms',
        terms: offerTermsWrongOracle,
        blockchain: 'bitcoin-testnet', //will be used in clientApi
        contact: ''
    };
    const offerMsg1 = {
        seqNo: 0,
        cTTL: 0,
        pow: pow1,
        content: offer1
    };
    const offerMsgWrongOracle = {
        seqNo: 0,
        cTTL: 0,
        pow: pow1,
        content: offerWrongOracle
    };
    const offerMsg2 = {
        seqNo: 0,
        cTTL: 0,
        pow: undefined,
        content: offer1
    };
    const paging = {
        page: 0,
        chunkSize: 100
    };
    //-------------------------------------------------------------------------
    {
        console.log("1. Oracles");
        const oracles0 = await nd.api.lookupOracles(paging);
        assert.deepStrictEqual(oracles0, []);
        const [error, _] = await nd.api.announceOracle(cfg, {});
        assert.strictEqual(error, "invalid request");
        const res = await nd.api.announceOracle(cfg, oracle1);
        assert.strictEqual(res, "success");
        const res2 = await nd.api.announceOracle(cfg, oracle1);
        assert.strictEqual(res2, "duplicate");
        const oracle1Copy = structuredClone(oracle1);
        oracle1Copy.seqNo++;
        const res22 = await nd.api.announceOracle(cfg, oracle1Copy);
        assert.strictEqual(res22, "success");
        const oracles = await nd.api.lookupOracles(paging);
        assert.deepStrictEqual(oracles, [oracle1]);
        //----crypto-----
        oracle2.pubkey = keypairOracle2.pub;
        oracle2.pow = await pow.powOverOracleId(oracle2, 2);
        oracle2.oracleSignature = "";
        oracle2.oracleSignature = (0, crypto_1.testOnlySign)(JSON.stringify(oracle2), keypairOracle2.pk);
        const res3 = await nd.api.announceOracle(cfg, oracle2);
        assert.strictEqual(res3, "success", "pow or signature check failed");
        oracle2.oracleSignature = "";
        const err = await nd.api.announceOracle(cfg, oracle2);
        assert.strictEqual(err, "wrong signature");
        oracle2.pow.difficulty = 100;
        oracle2.oracleSignature = (0, crypto_1.testOnlySign)(JSON.stringify(oracle2), keypairOracle2.pk);
        const err2 = await nd.api.announceOracle(cfg, oracle2);
        assert.strictEqual(err2, "wrong pow");
        oracle2.pow.difficulty = 2;
        oracle2.oracleSignature = (0, crypto_1.testOnlySign)(JSON.stringify(oracle2), keypairOracle2.pk);
        //-----rejections/evictions-----
        const oracles2 = await nd.api.lookupOracles(paging);
        assert.deepStrictEqual(oracles2, [oracle1, oracle2]);
        const oracle3 = structuredClone(oracle2);
        oracle3.pubkey = keypairOracle3.pub;
        oracle3.pow = await pow.powOverOracleId(oracle3, 2);
        oracle3.oracleSignature = "";
        oracle3.oracleSignature = (0, crypto_1.testOnlySign)(JSON.stringify(oracle3), keypairOracle3.pk);
        const res4 = await nd.api.announceOracle(cfg, oracle3);
        assert.strictEqual(res4, "success");
        const oracles3 = await nd.api.lookupOracles(paging);
        assert.deepStrictEqual(oracles3, [oracle2, oracle3]);
        const keypairOracle4 = (0, crypto_1.testOnlyGenerateKeyPair)();
        const oracle4 = structuredClone(oracle2);
        oracle4.pubkey = keypairOracle4.pub;
        oracle4.pow = await pow.powOverOracleId(oracle4, 1);
        oracle4.oracleSignature = "";
        oracle4.oracleSignature = (0, crypto_1.testOnlySign)(JSON.stringify(oracle4), keypairOracle4.pk);
        const err3 = await nd.api.announceOracle(cfg, oracle4);
        assert.strictEqual(err3, "low pow difficulty");
        assert.deepStrictEqual(await nd.api.lookupOracles(paging), [oracle2, oracle3]);
        cfg.powThresholdOracles = 1000;
        assert.strictEqual(await nd.api.announceOracle(cfg, oracle3), "low pow difficulty");
        cfg.powThresholdOracles = undefined;
    }
    //-------------------------------------------------------------------------
    {
        console.log("2. Capabilities");
        const capabilities0 = await nd.api.lookupCapabilities(paging, keypairOracle3.pub);
        assert.deepStrictEqual(capabilities0, []);
        const [error, _] = await nd.api.announceCapability(cfg, {});
        assert.strictEqual(error, "invalid request");
        const res = await nd.api.announceCapability(cfg, capability1);
        assert.strictEqual(res, "success");
        const res2 = await nd.api.announceCapability(cfg, capability1);
        assert.strictEqual(res2, "duplicate");
        const capability1Copy = structuredClone(capability1);
        capability1Copy.seqNo++;
        const res22 = await nd.api.announceCapability(cfg, capability1Copy);
        assert.strictEqual(res22, "success");
        const capabilities = await nd.api.lookupCapabilities(paging, keypairOracle3.pub);
        assert.deepStrictEqual(capabilities, [capability1]);
        const capabilities2 = await nd.api.lookupCapabilities(paging, "");
        assert.deepStrictEqual(capabilities2, []);
        //----crypto-----
        capability3.oraclePubKey = keypairOracle2.pub;
        capability3.capabilityPubKey = (0, crypto_1.testOnlyGenerateKeyPair)().pub;
        capability3.oracleSignature = "";
        capability3.oracleSignature = (0, crypto_1.testOnlySign)(JSON.stringify(capability3), keypairOracle2.pk);
        capability3.pow = await pow.powOverOracleCapability(capability3, 1);
        const res3 = await nd.api.announceCapability(cfg, capability3);
        assert.strictEqual(res3, "success", "pow or signature check failed");
        const savesig = capability3.oracleSignature;
        capability3.oracleSignature = "";
        const err = await nd.api.announceCapability(cfg, capability3);
        assert.strictEqual(err, "wrong signature");
        capability3.oracleSignature = savesig;
        capability3.pow.difficulty = 100;
        const err2 = await nd.api.announceCapability(cfg, capability3);
        assert.strictEqual(err2, "wrong pow");
        capability3.pow.difficulty = 1;
        capability3.oracleSignature = (0, crypto_1.testOnlySign)(JSON.stringify(oracle2), keypairOracle2.pk);
        //-----rejections/evictions-----
        assert.deepStrictEqual(await nd.api.lookupCapabilities(paging, keypairOracle3.pub), [capability1]);
        assert.strictEqual(await nd.api.announceCapability(cfg, capability4), "success");
        assert.deepStrictEqual(await nd.api.lookupCapabilities(paging, keypairOracle3.pub), [capability1, capability4]);
        assert.strictEqual(await nd.api.announceCapability(cfg, capability5), "success");
        assert.deepStrictEqual(await nd.api.lookupCapabilities(paging, keypairOracle3.pub), [capability4, capability5]);
        assert.strictEqual(await nd.api.announceCapability(cfg, capability6), "low pow difficulty");
        cfg.powThresholdCapabilities = 1000;
        assert.strictEqual(await nd.api.announceCapability(cfg, capability5), "low pow difficulty");
        cfg.powThresholdCapabilities = undefined;
    }
    //-------------------------------------------------------------------------
    {
        console.log("3. Reports");
        const reports0 = await nd.api.lookupReports(paging, keypairOracle3.pub);
        assert.deepStrictEqual(reports0, []);
        const [error, _] = await nd.api.reportMalleability(cfg, {});
        assert.strictEqual(error, "invalid request");
        const res = await nd.api.reportMalleability(cfg, report1);
        assert.strictEqual(res, "success");
        const res2 = await nd.api.reportMalleability(cfg, report1);
        assert.strictEqual(res2, "duplicate");
        const report1Copy = structuredClone(report1);
        report1Copy.seqNo++;
        const res22 = await nd.api.reportMalleability(cfg, report1Copy);
        assert.strictEqual(res22, "success");
        const reports = await nd.api.lookupReports(paging, keypairOracle3.pub);
        assert.deepStrictEqual(reports, [report1]);
        const reports2 = await nd.api.lookupCapabilities(paging, "");
        assert.deepStrictEqual(reports2, []);
        //----crypto-----
        report3.pow = await pow.powOverReport(report3, 4);
        report3.oraclePubKey = keypairOracle2.pub;
        const res3 = await nd.api.reportMalleability(cfg, report3);
        assert.strictEqual(res3, "success", "pow or signature check failed");
        report3.pow.difficulty = 100;
        const err = await nd.api.reportMalleability(cfg, report3);
        assert.strictEqual(err, "wrong pow");
        report3.pow.difficulty = 4;
        //-----rejections/evictions-----
        assert.deepStrictEqual(await nd.api.lookupReports(paging, keypairOracle2.pub), [report3]);
        const report4 = structuredClone(report3);
        report4.pow = await pow.powOverReport(report4, 1);
        assert.strictEqual(await nd.api.reportMalleability(cfg, report4), "success");
        assert.deepStrictEqual(await nd.api.lookupReports(paging, keypairOracle2.pub), [report3, report4]);
        const report5 = structuredClone(report3);
        report5.content.request.invoice = "1";
        report5.pow = await pow.powOverReport(report5, 2);
        assert.strictEqual(await nd.api.reportMalleability(cfg, report5), "success");
        assert.deepStrictEqual(await nd.api.lookupReports(paging, keypairOracle2.pub), [report3, report5]);
        assert.strictEqual(await nd.api.reportMalleability(cfg, report4), "low pow difficulty");
        cfg.powThresholdReports = 1000;
        const res00 = await nd.api.reportMalleability(cfg, report5);
        cfg.powThresholdReports = undefined;
        //assert.strictEqual(res00, "low pow difficulty")
    }
    //-------------------------------------------------------------------------
    {
        console.log("4. Dispute");
        const res = await nd.api.reportMalleability(cfg, report2);
        assert.strictEqual(res, "success");
        const reports = await nd.api.lookupReports(paging, keypairOracle3.pub);
        assert.deepStrictEqual(reports.length, 2);
        assert.deepStrictEqual(reports, [report1, report2]);
        const res2 = await nd.api.disputeMissingfactClaim(dispute1wrongfactsig);
        assert.strictEqual(res2, "invalid fact");
        const res3 = await nd.api.disputeMissingfactClaim(dispute1);
        assert.strictEqual(res3, "success");
        const res4 = await nd.api.disputeMissingfactClaim(dispute1wrongreport);
        assert.strictEqual(res4, "report not found");
        if (report2.content.type === 'fact-missing') {
            assert.deepStrictEqual(report2.content.dispute, dispute1.fact);
        }
        else {
            assert.fail("not fact-missing?");
        }
    }
    //-------------------------------------------------------------------------
    {
        console.log("5. Offers");
        const offers0 = await nd.api.lookupOffers(paging, "");
        assert.deepStrictEqual(offers0, []);
        const [error0, _] = await nd.api.publishOffer(cfg, {});
        assert.strictEqual(error0, "invalid request");
        const error = await nd.api.publishOffer(cfg, offerMsgWrongOracle);
        assert.strictEqual(error, "no oracle found");
        const res = await nd.api.publishOffer(cfg, offerMsg1);
        assert.strictEqual(res, "success");
        const res2 = await nd.api.publishOffer(cfg, offerMsg1);
        assert.strictEqual(res2, "duplicate");
        const offer1Copy = structuredClone(offerMsg1);
        offer1Copy.seqNo++;
        const res22 = await nd.api.publishOffer(cfg, offer1Copy);
        assert.strictEqual(res22, "success");
        const offers = await nd.api.lookupOffers(paging, offerMsg1.content.terms.question.capabilityPubKey);
        assert.deepStrictEqual(offers, [offerMsg1]);
        const offers2 = await nd.api.lookupOffers(paging, "");
        assert.deepStrictEqual(offers2, []);
        //----crypto-----
        offerMsg2.pow = await pow.powOverOffer(offerMsg2, 1);
        const res3 = await nd.api.publishOffer(cfg, structuredClone(offerMsg2));
        assert.strictEqual(res3, "success");
        offerMsg2.pow.difficulty = 5;
        const err = await nd.api.publishOffer(cfg, structuredClone(offerMsg2));
        assert.strictEqual(err, "wrong pow");
        offerMsg2.pow.difficulty = 1;
        //-----rejections/evictions-----
        assert.deepStrictEqual(await nd.api.lookupOffers(paging, offerMsg1.content.terms.question.capabilityPubKey), [offerMsg1, offerMsg2]);
        const o1 = structuredClone(offerMsg1);
        o1.content.message = "msg222";
        o1.pow = await pow.powOverOffer(o1, 2);
        assert.strictEqual(await nd.api.publishOffer(cfg, o1), "success");
        assert.deepStrictEqual(await nd.api.lookupOffers(paging, offerMsg1.content.terms.question.capabilityPubKey), [offerMsg2, o1]);
        const o2 = structuredClone(offerMsg1);
        o2.content.message = "msg";
        o2.pow = await pow.powOverOffer(o2, 3);
        assert.strictEqual(await nd.api.publishOffer(cfg, o2), "success");
        assert.deepStrictEqual(await nd.api.lookupOffers(paging, offerMsg1.content.terms.question.capabilityPubKey), [o1, o2]);
        assert.strictEqual(await nd.api.publishOffer(cfg, offerMsg1), "low pow difficulty");
        const cfg2 = structuredClone(cfg);
        cfg2.maxOffers = undefined;
        assert.strictEqual(await nd.api.publishOffer(cfg2, offerMsg1), "low pow difficulty");
        cfg.powThresholdOffers = 1000;
        const res00 = await nd.api.publishOffer(cfg, offerMsg1);
        cfg.powThresholdOffers = undefined;
        assert.strictEqual(res00, "low pow difficulty");
        console.log("OK!");
    }
})();
//# sourceMappingURL=test.js.map
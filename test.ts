import * as nd from './node';
import * as assert from 'assert'
import * as pow from './pow'

const cfg = {
    "maxOracles": 2,
    "maxCapabilities": 2,
    "maxReports": 2,
    "maxOffers": 2,
    "maxConnections": 100,
    "httpPort": 8080,
    "p2pPort": 8333,
    "isTest": true,
    "p2pseed": []
}

const oracle1Pub = "AAA"

const capability1Pub = "BBB"
const capability2Pub = "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEKWN+hSgqzb2rE7ft4fXBrIyXeRwfHHa3IMD7XDiZq/KnVRQrY47lmCwIScqOE+PAqtbovxPCRK5C6euYYRv7lg=="

const pow1: nd.HashCashPow = { //pow is only checked when pow difficulty higher than 0
    difficulty: 0,
    algorithm: 'SHA256',
    hash: '',
    magicNo: 0
}

const pow2: nd.HashCashPow = { //pow is only checked when pow difficulty higher than 0
    difficulty: 0,
    algorithm: 'SHA256',
    hash: '2222222',
    magicNo: 0
}

const bid1: nd.Bid = {
    amount: 0,
    proof: ''
}

const oracle1: nd.OracleId = {
    pubkey: oracle1Pub,
    oracleSignature: "MEUCIEhiQz9Ki/ySbtMQAHCF8CA9D8GCGYcaLPTFdCqNDcCSAiEAtdy4O7yYNJFB57qk5glZDYAO0njeC0GHc++YXcc8KGU=",
    seqNo: 0,
    cTTL: 0,
    pow: pow1,
    bid: bid1,
    oracleSignatureType: 'SHA256'
}

const oracle2: nd.OracleId = {
    pubkey: undefined,
    oracleSignature:undefined,
    seqNo: 0,
    cTTL: 0,
    pow: undefined,
    bid: bid1,
    oracleSignatureType: 'SHA256'
}

const capability1: nd.OracleCapability = {
    oraclePubKey: oracle1Pub,
    capabilityPubKey: capability1Pub,
    question: 'What?',
    seqNo: 0,
    cTTL: 0,
    oracleSignature: '', //signature is only checked when pow difficulty higher than 0
    oracleSignatureType: 'SHA256',
    pow: pow1
}

const capability3: nd.OracleCapability = {
    oraclePubKey: undefined,
    capabilityPubKey: undefined,
    question: 'What?',
    seqNo: 0,
    cTTL: 0,
    oracleSignature: '', //signature is only checked when pow difficulty higher than 0
    oracleSignatureType: 'SHA256',
    pow: undefined
}

const factreq1: nd.FactRequest = {
    capabilityPubKey: capability1Pub, //capability does not have to be in memory, since sharding is allowed
    arguments: {}
}

const factreq2: nd.FactRequest = {
    capabilityPubKey: capability2Pub, //capability does not have to be in memory, since sharding is allowed
    arguments: {}
}

const malleability1: nd.FactDisagreesWithPublic = {
    type: 'fact-disagreees-with-public',
    request: factreq1
}

const report1: nd.Report = {
    seqNo: 0,
    cTTL: 0,
    pow: pow1,
    oraclePubKey: oracle1Pub,
    content: malleability1
}

const malleability2: nd.FactMissing = {
    type: 'fact-missing',
    request: factreq2,
    capabilitySignatureOverRequest: ''
}


const report2: nd.Report = {
    seqNo: 0,
    cTTL: 0,
    pow: pow2,
    oraclePubKey: oracle1Pub,
    content: malleability2
}

const report3: nd.Report = {
    seqNo: 0,
    cTTL: 0,
    pow: undefined,
    oraclePubKey: undefined,
    content: malleability2
}

const fact1: nd.Fact = {
    factWithQuestion: 'Who? You!',
    signatureType: 'SHA256',
    signature: 'MEUCIEhiQz9Ki/ySbtMQAHCF8CA9D8GCGYcaLPTFdCqNDcCSAiEAtdy4O7yYNJFB57qk5glZDYAO0njeC0GHc++YXcc8KGU='
}

const fact1wrongsig: nd.Fact = {
    factWithQuestion: 'Who? You!',
    signatureType: 'SHA256',
    signature: 'MEUCIQDARG92FNR9WVyNnQQuCQz0drTz5qyv78OtWGI6U1za1gIgMPYSTpcjVQwCZaetX/35vt4lKZFkMGAX9tqWrDrUIsI='
}



const dispute1: nd.Dispute = {
    claim: malleability2,
    reportPow: pow2,
    oraclePubKey: oracle1Pub,
    fact: fact1
}

const dispute1wrongreport: nd.Dispute = {
    claim: malleability2,
    reportPow: pow1,
    oraclePubKey: oracle1Pub,
    fact: fact1
}

const dispute1wrongfactsig: nd.Dispute = {
    claim: malleability2,
    reportPow: pow2,
    oraclePubKey: oracle1Pub,
    fact: fact1wrongsig
}


const offerTerms1: nd.OfferTerms = {
    question: factreq1,
    partyBetsOn: ["me"],
    counterPartyBetsOn: ["you"],
    partyBetAmount: 100,
    counterpartyBetAmount: 200
}

const offer1: nd.Offer = {
    message: '',
    customContract: 'extra terms',
    terms: offerTerms1,
    blockchain: 'bitcoin-testnet', //will be used in clientApi
    transactionToBeCoSigned: 'transactionBase64', //will be used in clientApi
    contact: ''
}

const offerTermsWrongOracle: nd.OfferTerms = {
    question: factreq2,
    partyBetsOn: ["me"],
    counterPartyBetsOn: ["you"],
    partyBetAmount: 100,
    counterpartyBetAmount: 200
}

const offerWrongOracle: nd.Offer = {
    message: '',
    customContract: 'extra terms',
    terms: offerTermsWrongOracle,
    blockchain: 'bitcoin-testnet', //will be used in clientApi
    transactionToBeCoSigned: 'transactionBase64', //will be used in clientApi
    contact: ''
}

const offerMsg1: nd.OfferMsg = {
    seqNo: 0,
    cTTL: 0,
    pow: pow1,
    content: offer1
}

const offerMsgWrongOracle: nd.OfferMsg = {
    seqNo: 0,
    cTTL: 0,
    pow: pow1,
    content: offerWrongOracle
}

const offerMsg2: nd.OfferMsg = {
    seqNo: 0,
    cTTL: 0,
    pow: undefined,
    content: offer1
}

const paging: nd.PagingDescriptor = {
    page: 0,
    chunkSize: 100
}

const keypairOracle2 = nd.testOnlyGenerateKeyPair()


//-------------------------------------------------------------------------
{
    console.log("1. Oracles")

    const oracles0 = await nd.api.lookupOracles(paging, [])
    assert.deepStrictEqual(oracles0, [])

    const [error, _] = await nd.api.announceOracle(cfg, {} as nd.OracleId)
    assert.strictEqual(error, "invalid request")

    const res = await nd.api.announceOracle(cfg, oracle1)
    assert.strictEqual(res, "success")
    const res2 = await nd.api.announceOracle(cfg, oracle1)
    assert.strictEqual(res2, "duplicate")

    const oracle1Copy = structuredClone(oracle1)
    oracle1Copy.seqNo++
    const res22 = await nd.api.announceOracle(cfg, oracle1Copy)
    assert.strictEqual(res22, "success")


    const oracles = await nd.api.lookupOracles(paging, [])
    assert.deepStrictEqual(oracles, [oracle1])

    //----crypto-----

    oracle2.pubkey = keypairOracle2.pub
    oracle2.pow = await pow.powOverOracleId(oracle2, 1)
    oracle2.oracleSignature = ""
    oracle2.oracleSignature = nd.testOnlySign(JSON.stringify(oracle2), keypairOracle2.pk)

    const res3 = await nd.api.announceOracle(cfg, oracle2)
    assert.strictEqual(res3, "success", "pow or signature check failed")

    oracle2.oracleSignature = ""
    const err = await nd.api.announceOracle(cfg, oracle2)
    assert.strictEqual(err, "wrong signature")

    oracle2.pow.difficulty = 100
    oracle2.oracleSignature = nd.testOnlySign(JSON.stringify(oracle2), keypairOracle2.pk)
    const err2 = await nd.api.announceOracle(cfg, oracle2)
    assert.strictEqual(err2, "wrong pow")
    oracle2.pow.difficulty = 1
    oracle2.oracleSignature = nd.testOnlySign(JSON.stringify(oracle2), keypairOracle2.pk)
}

//-------------------------------------------------------------------------
{
    console.log("2. Capabilities")

    const capabilities0 = await nd.api.lookupCapabilities(paging, oracle1Pub)
    assert.deepStrictEqual(capabilities0, [])

    const [error, _] = await nd.api.announceCapability(cfg, {} as nd.OracleCapability)
    assert.strictEqual(error, "invalid request")

    const res = await nd.api.announceCapability(cfg, capability1)
    assert.strictEqual(res, "success")
    
    const res2 = await nd.api.announceCapability(cfg, capability1)
    assert.strictEqual(res2, "duplicate")

    const capability1Copy = structuredClone(capability1)
    capability1Copy.seqNo++
    const res22 = await nd.api.announceCapability(cfg, capability1Copy)
    assert.strictEqual(res22, "success")

    const capabilities = await nd.api.lookupCapabilities(paging, oracle1Pub)
    assert.deepStrictEqual(capabilities, [capability1])

    const capabilities2 = await nd.api.lookupCapabilities(paging, "")
    assert.deepStrictEqual(capabilities2, [])


    //----crypto-----
    
    capability3.oraclePubKey = keypairOracle2.pub
    capability3.capabilityPubKey = nd.testOnlyGenerateKeyPair().pub

    capability3.oracleSignature = ""
    capability3.oracleSignature = nd.testOnlySign(JSON.stringify(capability3), keypairOracle2.pk)
    capability3.pow = await pow.powOverOracleCapability(capability3, 1)

    const res3 = await nd.api.announceCapability(cfg, capability3)
    assert.strictEqual(res3, "success", "pow or signature check failed")

    const savesig = capability3.oracleSignature
    capability3.oracleSignature = ""
    const err = await nd.api.announceCapability(cfg, capability3)
    assert.strictEqual(err, "wrong signature")
    capability3.oracleSignature = savesig


    capability3.pow.difficulty = 100
    const err2 = await nd.api.announceCapability(cfg, capability3)
    assert.strictEqual(err2, "wrong pow")
    capability3.pow.difficulty = 1
    capability3.oracleSignature = nd.testOnlySign(JSON.stringify(oracle2), keypairOracle2.pk)

}

//-------------------------------------------------------------------------
{
    console.log("3. Reports")

    const reports0 = await nd.api.lookupReports(paging, oracle1Pub)
    assert.deepStrictEqual(reports0, [])

    const [error, _] = await nd.api.reportMalleability(cfg, {} as nd.Report)
    assert.strictEqual(error, "invalid request")

    const res = await nd.api.reportMalleability(cfg, report1)
    assert.strictEqual(res, "success")
    
    const res2 = await nd.api.reportMalleability(cfg, report1)
    assert.strictEqual(res2, "duplicate")

    const report1Copy = structuredClone(report1)
    report1Copy.seqNo++
    const res22 = await nd.api.reportMalleability(cfg, report1Copy)
    assert.strictEqual(res22, "success")

    const reports = await nd.api.lookupReports(paging, oracle1Pub)
    assert.deepStrictEqual(reports, [report1])

    const reports2 = await nd.api.lookupCapabilities(paging, "")
    assert.deepStrictEqual(reports2, [])

    //----crypto-----

    report3.pow = await pow.powOverReport(report3, 1)
    report3.oraclePubKey = keypairOracle2.pub

    const res3 = await nd.api.reportMalleability(cfg, report3)
    assert.strictEqual(res3, "success", "pow or signature check failed")

    report3.pow.difficulty = 100
    const err = await nd.api.reportMalleability(cfg, report3)
    assert.strictEqual(err, "wrong pow")
    report3.pow.difficulty = 1

}

//-------------------------------------------------------------------------
{
    console.log("4. Dispute")
    const res = await nd.api.reportMalleability(cfg, report2)
    assert.strictEqual(res, "success")

    const reports = await nd.api.lookupReports(paging, oracle1Pub)
    assert.deepStrictEqual(reports.length, 2)
    assert.deepStrictEqual(reports, [report1, report2])

    const res2 = await nd.api.disputeMissingfactClaim(dispute1wrongfactsig)
    assert.strictEqual(res2, "invalid fact")

    const res3 = await nd.api.disputeMissingfactClaim(dispute1)
    assert.strictEqual(res3, "success")


    const res4 = await nd.api.disputeMissingfactClaim(dispute1wrongreport)
    assert.strictEqual(res4, "report not found")

    if (report2.content.type === 'fact-missing') {
        assert.deepStrictEqual(report2.content.dispute, dispute1.fact)
    } else {
        assert.fail("not fact-missing?")
    }


}

//-------------------------------------------------------------------------
{
    console.log("5. Offers")

    const offers0 = await nd.api.lookupOffers(paging, "")
    assert.deepStrictEqual(offers0, [])

    const [error0, _] = await nd.api.publishOffer(cfg, {} as nd.OfferMsg)
    assert.strictEqual(error0, "invalid request")

    const error = await nd.api.publishOffer(cfg, offerMsgWrongOracle)
    assert.strictEqual(error, "no oracle found")

    const res = await nd.api.publishOffer(cfg, offerMsg1)
    assert.strictEqual(res, "success")
    
    const res2 = await nd.api.publishOffer(cfg, offerMsg1)
    assert.strictEqual(res2, "duplicate")

    const offer1Copy = structuredClone(offerMsg1)
    offer1Copy.seqNo++
    const res22 = await nd.api.publishOffer(cfg, offer1Copy)
    assert.strictEqual(res22, "success")

    const offers = await nd.api.lookupOffers(paging, offerMsg1.content.terms.question.capabilityPubKey)
    assert.deepStrictEqual(offers, [offerMsg1])

    const offers2 = await nd.api.lookupOffers(paging, "")
    assert.deepStrictEqual(offers2, [])

    //----crypto-----

    offerMsg2.pow = await pow.powOverOffer(offerMsg2, 1)
    const res3 = await nd.api.publishOffer(cfg, structuredClone(offerMsg2))
    assert.strictEqual(res3, "success")

    offerMsg2.pow.difficulty = 5
    const err = await nd.api.publishOffer(cfg, structuredClone(offerMsg2))
    assert.strictEqual(err, "wrong pow")

    offerMsg2.pow.difficulty = 1

}

// TODO: rejections by pow, rejections by bid, evictions by pow, evictions by bid
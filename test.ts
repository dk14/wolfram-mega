import * as nd from './node';
import * as assert from 'assert'

const cfg = {
    "maxOracles": 100,
    "maxCapabilities": 100,
    "maxReports": 100,
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
    seqNo: 0,
    cTTL: 0,
    pow: pow1,
    bid: bid1
}

const capability1: nd.OracleCapability = {
    oraclePubKey: oracle1Pub,
    capabilityPubKey: capability1Pub,
    question: 'What?',
    seqNo: 0,
    cTTL: 0,
    oracleSignature: '', //signature is only checked when pow difficulty higher than 0
    oracleSignatureType: '',
    pow: pow1
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

const paging: nd.PagingDescriptor = {
    page: 0,
    chunkSize: 100
}

//-------------------------------------------------------------------------
{
    console.log("1. Oracles")
    const res = await nd.api.announceOracle(cfg, oracle1)
    assert.equal(res, "success")
    const res2 = await nd.api.announceOracle(cfg, oracle1)
    assert.equal(res2, "duplicate")

    const oracles = await nd.api.lookupOracles(paging, [])
    assert.deepStrictEqual(oracles, [oracle1])
}

//-------------------------------------------------------------------------
{
    console.log("2. Capabilities")
    const res = await nd.api.announceCapability(cfg, capability1)
    assert.equal(res, "success")
    
    const res2 = await nd.api.announceCapability(cfg, capability1)
    assert.equal(res2, "duplicate")

    const capabilities = await nd.api.lookupCapabilities(paging, oracle1Pub)
    assert.deepStrictEqual(capabilities, [capability1])

    const capabilities2 = await nd.api.lookupCapabilities(paging, "")
    assert.deepStrictEqual(capabilities2, [])
}

//-------------------------------------------------------------------------
{
    console.log("3. Reports")
    const res = await nd.api.reportMalleability(cfg, report1)
    assert.equal(res, "success")
    
    const res2 = await nd.api.reportMalleability(cfg, report1)
    assert.equal(res2, "duplicate")

    const reports = await nd.api.lookupReports(paging, oracle1Pub)
    assert.deepStrictEqual(reports, [report1])

    const reports2 = await nd.api.lookupCapabilities(paging, "")
    assert.deepStrictEqual(reports2, [])
}

//-------------------------------------------------------------------------
{
    console.log("4. Dispute")
    const res = await nd.api.reportMalleability(cfg, report2)
    assert.equal(res, "success")

    const reports = await nd.api.lookupReports(paging, oracle1Pub)
    assert.deepStrictEqual(reports, [report1, report2])

    const res2 = await nd.api.disputeMissingfactClaim(dispute1wrongfactsig)
    assert.equal(res2, "invalid fact")

    const res3 = await nd.api.disputeMissingfactClaim(dispute1)
    assert.equal(res3, "success")


    const res4 = await nd.api.disputeMissingfactClaim(dispute1wrongreport)
    assert.equal(res4, "report not found")

    if (report2.content.type === 'fact-missing') {
        assert.deepStrictEqual(report2.content.dispute, dispute1.fact)
    } else {
        assert.fail("not fact-missing?")
    }
}

// TODO offer, successful PoW-checks, successful signature checks, rejections by pow, rejections by bid, evictions by pow, evictions by bid
// TODO data corruption, malformed JSON
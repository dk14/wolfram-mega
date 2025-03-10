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

const pow1: nd.HashCashPow = { //pow is only checked when pow difficulty higher than 0
    difficulty: 0,
    algorithm: 'SHA256',
    hash: '',
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

// TODO dispute, successful PoW-checks, successful signature checks, rejections by pow, rejections by bid, evictions by pow, evictions by bid
// TODO data corruption, malformed JSON
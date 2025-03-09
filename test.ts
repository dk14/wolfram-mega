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

const pow1: nd.HashCashPow = {
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
    pubkey: '',
    seqNo: 0,
    cTTL: 0,
    pow: pow1,
    bid: bid1
}


const res = await nd.api.announceOracle(cfg, oracle1)
assert.equal(res, "success")
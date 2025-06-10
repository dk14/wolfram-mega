# Trader API

Trader API presents non-essential interfaces for:
- collecting ads from P2P network to a local database
- querying those ads
- issuing offers and reports, persisting in database
- advertising issued offers and reports in Mega P2P

It's implemented on top of Mega-API (see Operators doc)

## Configure

Example: `cfg/mempool-trader.json`

## Start peer with trader-api enabled
from sources:
```bash
npm run peer cfg/mempool-trader.json
```
from the library:
```bash
npm i dk14/wolfram-mega
npx mega-peer cfg/mempool-trader.json
```
Trader Console UI and REST will be available at:

- http://localhost:7080/

> Security: no ports should be open to public network in this mode. Use virtualization (e.g. virsh)

or run a full demo for plug and play:
```bash
npm run demo
```
or
```bash
npm i dk14/wolfram-mega
npx mega-demo
```
- Peer: http://localhost:8080/peer-monitor/
- Oracle Admin: http://localhost:8080/oracle-admin/
- Mockup Oracle: http://localhost:8080/oracle-endpoint/
- Trader API: http://localhost:8080/trader-console/

> Security: no ports should be open to public network in this mode. Use virtualization (e.g. virsh)

## Find Oracle and Capability

### Register oracle collector

Collectors collect data from p2p network's mempools into persistent storage

> Design. Collectors are poll-based. The poll is only happening locally: local mempool -> database. 
> Peers are pushing data to local mempool.

```ts
const collectorTag = '<unique id to manage collectors>'
await fetch('./collectOracles?tag=' + encodeURIComponent(tag), {
    method: 'post',
    body: JSON.stringify({
        predicate: 'true'
    }),
    headers: {'Content-Type': 'application/json'}
}) 
```

### Register capability collector

```ts
const tag = ...
const oraclePredicate = ... //e.g true, pubKey == "<pub>", tags.contain("sports")
const capabilityPredicate = ... //e.g. true

await fetch('./collectCapabilities?tag=' + enc##odeURIComponent(tag), {
    method: 'post',
    body: JSON.stringify({
        oquery: oraclePredicate,
        opredicate: oraclePredicate,
        predicate: capabilityPredicate
    }),
    headers: {'Content-Type': 'application/json'}
})
```

### Register report collector

```ts
const tag = ...
const oraclePredicate = ... //e.g true, pubKey == "<pub>", tags.contain("sports")
const reportPredicate = ... //e.g. true

await fetch('./collectReports?tag=' + encodeURIComponent(tag), {
    method: 'post',
    body: JSON.stringify({
        oquery: oraclePredicate,
        opredicate: oraclePredicate,
        predicate: reportPredicate
    }),
    headers: {'Content-Type': 'application/json'}
})
```

### Collect offers for matching

```ts
await fetch('./collectOffers?tag=' + encodeURIComponent(tag), {
    method: 'post',
    body: JSON.stringify({
        cpquery: 'some js to preselect capabilities',
        cppredicate: 'some js to select capabilities',
        predicate: 'some js to select offers'
    }),
    headers: {'Content-Type': 'application/json'}
})
```

### View collected broadcasts

```ts
const view = ... //type of broadcast
const endpoints = {
    "oracles": "listOracles",
    "cps": "listCapabilities",
    "reports": "listReports",
    "offers": "listOffers"
}
const data = await (await fetch(`./${endpoints[view]}?pageSize=100&pageNo=${page}`)).json()
```

## Oracle Malleability Reports

### Submit report

Reports have unique pow hash, pow hash is their id. 
If report is rejected due to low-pow difficulty - trader API will upgrade PoW.

There are 5 types of reports, as can be found in `src/protocol.ts`:

```ts
export type MaleabilityReport = FactDisagreesWithPublic | FactConflict | FactMissing | AdCollision | FreeForm
```
- fact disagrees with public consensus, e.g. internet
- conflict: oracle provided several conflicting answers to the same question or several oracles disagree on the answer
- missing: oracle did not provide the fact
- collision: trader (or third-party)noticed conflict between oracle ads
- free-form: any type of report (even personal), trader is allowed to just vote against oracle with PoW. Although, other traders are at liberty to ignore such reports and exclude them from Oracle's reputation.

> Note: there is a limitation on the maximum length of the message.

```ts
const content = { 
    "type": "fact-disagreees-with-public", 
    "request": {
        "capabilityPubKey": "", 
        "arguments": {} 
    }
}

const pow = {
    "magicNo": 1000, 
    "difficulty":0, 
    "algorithm": "SHA256",
    "hash": "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
}

const oraclePubKey = ...
const msg = { seqNo: 0, cTTL: 0, oraclePubKey, pow, content }

await fetch('./issueReport', {
    method: 'post',
    body: JSON.stringify(msg),
    headers: {'Content-Type': 'application/json'}
})
```
### View issued reports
```ts
const issuedReports = await (await fetch(`./listIssuedOffers?pageSize=100&pageNo=${page}`)).json()
```

### Start broadcasting submitted reports

```ts
fetch('./broadcastIssuedReports')
```

## Issue offer

Offers have unique pow hash, pow hash is their id. 
If offer is rejected due to low-pow difficulty - trader API will try to upgrade PoW. 

See "Contracts" and "Discreet DSL" docs for details.

>Note: there is a limitation on the maximum length of the message.

```ts
const content = {
    "message":"",
    "customContract":"",
    "terms":{
        "question": {
            "capabilityPubKey":"<pubkey of oracle capability>",
            "arguments":{}
        },
        "question2": { //optonal, for quorums
            "capabilityPubKey":"<pubkey of oracle capability>",
            "arguments":{}
        },
        "question3": { //optonal, for quorums
            "capabilityPubKey":"<pubkey of oracle capability>",
            "arguments":{}
        },
        "partyBetsOn":[], //outcomes
        "counterPartyBetsOn":[], //outcomes
        "partyBetAmount":0,
        "counterpartyBetAmount":0
    },
    
    "blockchain":"bitcoin-testnet",
    "transactionToBeCoSigned":"",
    "contact":""
}

const pow = { //have to generate your own
    "difficulty":2,
    "algorithm":"SHA256",
    "hash":"b2d387f4c00c6ac6f5a2a10cb3caba7a0749b9f28e22394129706f22d3b82f00",
    "magicNo":31,
    "magicString":""
}

const msg = { seqNo: 0, cTTL: 0, pow, content }

await fetch('./issueOffer', {
    method: 'post',
    body: JSON.stringify(msg),
    headers: {'Content-Type': 'application/json'}
})
```

### View issued offers
```ts
const issuedOffers = await (await fetch(`./listIssuedOffers?pageSize=100&pageNo=${page}`)).json()
```
### Start broadcasting issued offers

```ts
fetch('./broadcastIssuedOffers')
```

## Collector management

### Cancel collector

```ts
await fetch('./cancelCollector?tag=' + encodeURIComponent(tag))
```

### List collectors
```ts
const collectors = await (await fetch('./listCollectors')).json()
```

### Delete collected record by hash

```ts
const delete = (hash, recordType) => {
    const endpoints = {
        "oracles": "deleteOracle",
        "cps": "deleteCapability",
        "reports": "deleteReport",
        "offers": "deleteOffer",
        "issued-reports": "deleteIssuedReport",
        "issued-offers": "deleteIssuedOffer"
    }
    await fetch(`./${endpoints[recordType]}?pubkey=${encodeURIComponent(hash)}`)
}     
```

## PoW

examples: `src/pow.ts`

```ts
export interface TraderPow {
    powOverOffer: (offer: OfferMsg, difficulty: number, algorithm: string) => Promise<HashCashPow>
    powOverReport: (r: Report, difficulty: number, algorithm: string) => Promise<HashCashPow>
}
```

## Custom API

```ts
import { traderApi, TraderApi } from '@dk14/wolfram-mega/trader-api'
import { TraderStorage } from '@dk14/wolfram-mega/trader-api'

const storage: TraderStorage<OracleQ, CpQ, RpQ, MatchQ> = ...

const miner: TraderPow = { ... }

const api: TraderApi<TraderQuery<OracleId>, TraderQuery<OracleCapability>, boolean> = traderApi(cfg.trader, cfg, ndapi, storage, p2pNode, miner)

// the TraderApi<..., boolean> implies that your TraderQuery is of the form of a predicate `T => Promise<boolean>`; TraderApi<..., string> would allow for queries represented as strings, .e.g. js-code would be just `string`

api.collectOracles(...)
api.collectCapabilities(...)
storage.queryOracles({where: o => true})
storage.queryCapabilities({where: cp => true})
api.issueOffer(myOffer)
```

## Oracle Workflow

### Get commmitment from oracle
Trader requests commitment before co-signing contract on blockchain. Commitment binds oracle legally and is an essential part of malleability reports.
```ts  
const factRequest = {
    "capabilityPubKey": "MCowBQYDK2VwAyEA4A3gTGN6FQz2iBkWPsbMNvYGtrmteU5A0R2r4nTc4IM=",
    "arguments": {} 
}

const endpoint = await (
    await fetch('./capabilityEndpoint?pubkey=' 
    + encodeURIComponent(req.capabilityPubKey))).json()

const commitment = await (await fetch(endpoint + '/requestCommitment', {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify(factRequest),
    headers: {'Content-Type': 'application/json'}
})).json()

//verify signature...
```

### Get attestation
> Trader does NOT have to poll oracle for attestations of facts. They only needed **once, in order to unlock transaction**. Trader can either check time periodically (if contract depends on date) or check market conditions from on-line data-feeds. NO need to pull data-feeds from Mega-p2p network - there are better and more specialized solutions for that (e.g. Yahoo Finance, Wolfram Alpha).

> If oracle did not provide fact by a deadline it commited to - trader can publish `missing-fact` report. Oracle can dispute it by pushing fact into the Mega-P2P pool (trader's report will get amended with provided fact, thus the report can be excluded from oracle reputation).
```ts
const endpoint = ...
const commitment = 

const fact = await (await fetch(endpoint + '/requestFact', {
    method: 'post',
    body: commitment,
    headers: {'Content-Type': 'application/json'}
})).json()
//verify signature...
```

## Querying collected broadcasts

```ts
const page = ... //page number
const view = ...
const endpoints = {
    "oracles": "listOracles",
    "cps": "listCapabilities",
    "reports": "listReports",
    "offers": "listOffers",
    "issued-reports": "listIssuedReports",
    "issued-offers": "listIssuedOffers"
}

const data = await (await fetch(`./${endpoints[view]}?pageSize=100&pageNo=${page}`)).json()
```

# Oracle quorums

`OfferMsg` additionally supports quorums through declaring optional `question2` and `question3` fields in `OfferTerms`. `OfferTerms` also have optional `synonyms` field to adapt incompatible values. e.g.

```json
{
    synonyms: {
        "YES": "Y",
        "NO": "N"
    }
}
```
> Trader Console contains [Bitcoin DLC ](https://adiabat.github.io/dlc.pdf) and [Cardano](https://cardano.org/) Helios demos, generating binary option contract with improvised oracle quorums.

> Our Bitcoin DLC `OfferTerms` intepreter would generate 3 taproot leafs with `OP_CHECKSIGVERIFY <pub1> OP_CHECKSIGVERIFY <pub2>`

# Golden source

Collection of issued offers and reports represents trader's portfolio.
It is, together with oracle's commitments or facts, required in order to redeem binary options at expiration.

If those collections are lost, recovery procedure would need:
- original trader's private key
- co-signed CET-transactions 
- signed commitments from oracle
- if oracle is at liberty to evict facts (fact retention) - signed fact might be needed be preserved

For extra-valuable contracts with a long expiry term, it is recommended to provide trader with option of selectively backing up subset of CET as well as commitment (compressed and **encrypted** with private key) either:
- on-chain (in `OP_RETURN`)
- with oracles as well as mega-facilitators (`backup` field in `FinalizeOffer`)
- or on the hardware wallet itself

It would allow for automatic recovery of non-expired trades (using only private key) if data is lost.


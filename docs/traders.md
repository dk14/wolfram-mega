# Trader API

## Start peer with trader-api enabled

```bash
npm run peer cfg/mempool-trader.json
```
REST will be available at:

- http://localhost:7080/

----
**or** run a full demo:
```bash
npm run demo
```
- Peer: http://localhost:8080/peer-monitor/
- Oracle Admin: http://localhost:8080/oracle-admin/
- Mockup Oracle: http://localhost:8080/oracle-endpoint/
- Trader API: http://localhost:8080/trader-console/

---
## Find Oracle and Capability

### Register oracle collector

Collectors collect data from p2p network's mempools into persistent storage

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

## Issue offer

Offers have unique pow hash, pow hash is their id. 
If offer is rejected due to low-pow difficulty - trader API will upgrade PoW.

```ts
const content = {
    "message":"",
    "customContract":"",
    "terms":{
        "question": {
            "capabilityPubKey":"<pubkey of oracle capability>",
            "arguments":{}
        },
        "partyBetsOn":[],
        "counterPartyBetsOn":[],
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


### Start broadcasting issued offers

```ts
fetch('./broadcastIssuedOffers')
```

### Collect offers

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
## Oracle Malleability Reports

### Submit report

Reports have unique pow hash, pow hash is their id. 
If report is rejected due to low-pow difficulty - trader API will upgrade PoW.

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

### Start broadcasting submitted reports

```ts
fetch('./broadcastIssuedReports')
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

## Oracle Workflow

### Get commmitment from oracle
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
```

### Get fact

```ts
const endpoint = ...
const commitment = 

const fact = await (await fetch(endpoint + '/requestFact', {
    method: 'post',
    body: commitment,
    headers: {'Content-Type': 'application/json'}
})).json()
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

# Golden source

Collection of issued offers and reports represents trader's portfolio.
It is, together with oracle's commitments or facts, required in order to redeem binary options at expiration.

If those collections are lost, recovery procedure would need:
- original trader's private key
- co-signed CET-transactions 
- signed commitments from oracle (or capabilities avilable in database)
- if oracle is at liberty to evict facts (fact retention) - signed fact should be preserved


# Matching

See `src-web\matching` for code examples.

## Wokflow

If the whole contract is negotiated through the Mega, offers will form a chain, through back-references (`previousAcceptRef` in `AcceptOffer`, `acceptRef` in `FinalizeOffer`).

```
Offer 
-> negotiationStages * (Offer + AcceptOffer) 
-> Offer + negotiationStages * AcceptOfffer + FinalizeOffer
```

Several `Offer + AcceptOffer` messages might be needed to implement complex signing schemes (e.g. Schnorr musig).

## Duplicates

Offers and Reports are allowed to have duplicates, since PoW can be upgraded.

The rule for evolving offer state collaboratively is to always pick the offer with highest PoW difficulty in a most progressed state (longest chain of back-references).

_Note: One can accept offers outside of Mega mempool network - given that counter-party provided `contact`. Then follow-ups would be communicated directly without Mega-facilitation._

# Composite contracts

## Multi-party

Two-party offers are generalizable to multi-party (multi leg) offers through adding a composite party, e.g. "bob,carol".

## Schedules 

Schedules (e.g. quantized  `InterestRateSwap`) can be expressed through `dependsOn` reference meant to specify previous stage in a multi-stage contract. `dependsOn` can be conditional on the outcome of previous stage, effectively  making such contracts stateful.


_BTC-DLC matching note: Scheduled offer is finalized when first `openingTx` for the whole composite tree is co-signed (parties cross check that every subcontract is co-signed)._

### "Ad-hoc" parties in schedules
If party has to be added "on the go" then special "new party" outcome has to be added.
Such outcome can be attested without third-party oracle, by verifying proof of funding transaction on-chain.

For BTC this would require to either: 
- potential candidates to specify their adresses in advance (in the offer itself) together with conditions to join, 
- or a consensus of existing parties

### Exponential explosion
Offers are meant to represent a contract with predictable execution time (Marlowe expressiveness). This approach also ensures that funds won't stuck in an escrow.

Careless use, however, can put contracts at the risk of  explosion, over-choicefullness.

In order to avoid such explosion - outcomes can be compressed. For instance, "BTC price" can have two outomes "0..100000" and "100000..moon" instead of infinity of outcomes.

Same goes for schedules: grouping outcomes for every stage in a contract, would avoid:
- exponential "random-walk"-like explosion 
- accumulation of uneccesssary state in a contract.

_Note: explosions are explicit in Mega-contracts, unlike Web3. Turing-complete contracts are explicitly tested for computability before creation._

#### **Merkle-trees**

Merkle-trees can also be utilized to eliminate duplicate subtcontract trees in offer trees, thus reducing risks of contract explosion to a theoretical minimum. Such approach would eliminate uneccessary state as well.

Practically, it requires extra-care:

- subcontracts with equivalent semantics might contain small differences (e.g. redemption addresses). This has to be eliminated manually.
- it is recommended to bound contract-size to reasonable minimum during contract generation, in order to avoid dealing with "halting problem", proof assistants etc. For BTC such bound can be expressed in bytes, or even satochis if txfee is known.
- use DSL like Marlowe or write your own.
- recursive calls in DSLs can be supported through  bounded "typed" recursion, with default return value supplied in "return" after a fixed amount recursive calls (backup-value for "stack-overflow"). Such trivial macro re-inlining function body n times solves Turing-completeness issues once and for all.
  - this approach allows for fixed-max-length lists, dictionaries, any type of parsing/analysis on data from oracle. On BTC or any other chain.
  - this approach allows for typed IO in DSLs: read data-point from oracle, write funds to parties, up to n times. On BTC or any other chain.
  - BTC-DLC: proposed SIGHASH_NOINPUT would additionally allow to compress multiple recursive inlines into a single contract. Compression of higher-kind type.

_This approach works for any Schnorr-enabled blockchain starting with BTC, but it makes smart-contract VMs unneccessary_

**After such techniques have been applied, only contracts that are aimed at modeling "perpetual motion" would explode.**

#### **"Perpetuality"**

Simillarly to Marlowe, "quantized perpetual swap"-like contracts can still be modeled without exponential explosion by:
-  allowing "renewal or refund" condition (optional "close").

Such condition would also benefit liquidity, and avoid overcollaterization.

### Collaterals
Collaterals for composite contracts in Mega are trivial to evaluate: it is simply a sum of all bets made by a party.

It is recommended to rather bound contract complexity than use meaningless tokens or pools (managed with "automated"  unsound logic) for collaterization. Collaterization must be done in bounded currency, bounded with physical energy like BTC. 

Limiting complexity is better than double-counting physical energy.
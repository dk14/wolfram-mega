# Doc for traders

## Start peer with trader-api enabled

```bash
npm run peer cfg/mempool-trader.json
```
REST will be available at:

- http://localhost:7080/

or run a full demo:
```bash
npm run demo
```
- Peer: http://localhost:8080/peer-monitor/
- Oracle Admin: http://localhost:8080/oracle-admin/
- Mockup Oracle: http://localhost:8080/oracle-endpoint/
- Trader API: http://localhost:8080/trader-console/

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
## Malleability Reports

### Submit report

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

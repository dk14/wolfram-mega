# Doc for traders

## Find Oracle:

Register oracle collector:

```ts
const collectorTag = '<unique id to manage collectors>'
await fetch('./collectOracles?tag=' + encodeURIComponent(tag), {
    method: 'post',
    body: JSON.stringify({
        predicate: "some js code selecting oracle fields"
    }),
    headers: {'Content-Type': 'application/json'}
})
    
```

Register capability collector:

```ts
const tag = ...
const opredicate = ...
const predicate = ...

await fetch('./collectCapabilities?tag=' + enc##odeURIComponent(tag), {
    method: 'post',
    body: JSON.stringify({
        oquery: opredicate,
        opredicate,
        predicate
    }),
    headers: {'Content-Type': 'application/json'}
})
 
```

Issue offer:

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

```ts
fetch('./broadcastIssuedOffers')
fetch('./broadcastIssuedReports')

```

Collect offers:

```ts
await fetch('./collectOffers?tag=' + encodeURIComponent(tag), {
    method: 'post',
    body: JSON.stringify({
        cpquery: 'some js',
        cppredicate: cpquery,
        predicate: 'some js'
    }),
    headers: {'Content-Type': 'application/json'}
})

```


```ts



    document.getElementById('col_reports').onclick = async () => {
        const tag = document.getElementById('tag').value
        const opredicate = document.getElementById('oracle_filter').value
        const predicate = document.getElementById('report_filter').value
        await fetch('./collectReports?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                oquery: opredicate,
                opredicate,
                predicate
            }),
            headers: {'Content-Type': 'application/json'}
        })
    }



        document.getElementById('submit_report').onclick = async () => {
            const content = JSON.parse(document.getElementById('report').value)
            const pow = JSON.parse(document.getElementById('report_pow').value)
            const oraclePubKey = document.getElementById('oracle_pub').value
            const msg = { seqNo: 0, cTTL: 0, oraclePubKey, pow, content }
            await fetch('./issueReport', {
	            method: 'post',
	            body: JSON.stringify(msg),
	            headers: {'Content-Type': 'application/json'}
            })
        }

        document.getElementById('cancel_collector').onclick = async () => {
            const tag = document.getElementById('tag').value
            await fetch('./cancelCollector?tag=' + encodeURIComponent(tag))
        }

        document.getElementById('delete').onclick = async () => {
            const hash = document.getElementById('hash').value
            const view = document.getElementById('view').value
            const endpoints = {
                "oracles": "deleteOracle",
                "cps": "deleteCapability",
                "reports": "deleteReport",
                "offers": "deleteOffer",
                "issued-reports": "deleteIssuedReport",
                "issued-offers": "deleteIssuedOffer"
            }
            await fetch(`./${endpoints[view]}?pubkey=${encodeURIComponent(hash)}`)
        }

        const getCommitment = async () => {
            document.getElementById('commitment').value = ""
            document.getElementById('fact').innerHTML = ""
            const req = JSON.parse(document.getElementById('fact_req').value)
            const endpoint = await (await fetch('./capabilityEndpoint?pubkey=' + encodeURIComponent(req.capabilityPubKey))).json()
            if (endpoint === '') return
            const commitment = (await fetch(endpoint + '/requestCommitment', {
	            method: 'post',
                mode: 'cors',
	            body: JSON.stringify(req),
	            headers: {'Content-Type': 'application/json'}
            })).json()
            document.getElementById('commitment').value = JSON.stringify(await commitment)

        }
```
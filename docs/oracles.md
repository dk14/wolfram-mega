
# Oracle API

## Start peer with oracle-api enabled

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
- Oracle Ad Signer would connect to `ws-port:9081` at Oracle Admin

## Start advertising

```ts
fetch('./start')
```

## Register capability

```ts
const capabilityPubKey = ...
const question = "Humanity extinct in $date years?"
const endpoint = "http://..." //can be nostr post, IRC, SESSION messenger or WhatsApp handle

// params can be empty, 
// `values === []` means unbounded type
const params = [{name: "date", values: [1, 5, 10]}]
const answers = ["YES", "NO"] // optional for ads, but contract-generators would require it; can be range e.g. "0..100" if contract-generator supports it

const body = { capabilityPubKey, question, endpoint, params, answers }
const res = await fetch('./addCapability', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
})
```

## Dactivate capability
Deactivation/Reactivation is the only update on capability, that Mega-mempools support. 

Mutation is possible in case when capability is evicted from mempools. Such mutation would put oracle at risk of being reported for capability collision (`ad-collision` report).

Proper update is to-deactivate old one and activate a new capability with new pubkey.

```ts
await fetch('./deactivateCapability?pubkey=' + encodeURIComponent(capabilityPubKey))
```

## Reactivate capability
```ts
await fetch('./activateCapability?pubkey=' + encodeURIComponent(capabilityPubKey))
```

## Drop capability from local storage

```ts
const capabilityPubKey = document.getElementById('pubkeymanage').value
            await fetch('./dropCapability?pubkey=' + encodeURIComponent(capabilityPubKey))
```

## Upgrade capability PoW

```ts
const difficulty = ...
await fetch('./upgradeCapabilityPow?pubkey=' + encodeURIComponent(capabilityPubKey)
             + "&difficulty=" + encodeURIComponent(difficulty))
```

## Upgrade oracle PoW

```ts
const difficulty = ...
await fetch('./upgradeOraclePow?pubkey=' + encodeURIComponent(capabilityPubKey)
             + "&difficulty=" + encodeURIComponent(difficulty))
```

## View oracle ad
```ts
await (await fetch('./id')).json()
```

## List database of registered capabilities

```ts
const cps = await (await fetch('./viewStoredCapabilities?pageSize=100&pageNo=0')).json()
```

## How to sign ads as oracle 
 `src/client-api/utils/oracle-endpoint` has an example.

After starting oracle api,
`ws://host:port/signCp` and `ws://host:port/signAd` would give you streams for signing capability ads and oracle ads respectively. You read a message - you write same message but with oracleSignature.

The best approach is to sign messages manually unless they only differ in `seqNo` field.

## Signatures

Oracle ads and capabilites are signed with root oracle signature.

Commitments and facts are signed with corresponding capability signature.


Security note:
- signing capability with `capabilityPubKey` not belonging to oracle would allow woner of corresponding private key to make commitments on behalf of oracle.
- Thus, it is recommended to derive capability private keys from root oracle private key (HD-wallet approach)

# Oracle Endpoint
Oracle endpoint has to implement this interface over REST:

```ts
export interface OracleEndpointApi {
    requestNewCapability (question: string): Promise<OracleCapability | undefined>
    requestCommitment: (req: FactRequest) => Promise<Commitment | undefined>
    requestFact: (req: Commitment) => Promise<Fact>
}
```

Every capability can have its own endpoint.

If oracle provides facts through messengers or any other means (inluding `fact-missing` report as a hack), then it must be able to manually or chat-bot-automatically send `commitment` and eventually `fact` as json in response to `fact-request`.

**Commitments are signed and legally binding. Oracle can be reported for not fulfilling (or misfulfilling) the commitment it made.**

Exmple of implementation from `src/client-api/utils/oracle-endpoint`:

```ts
//optional, can check proof of payment here
const canCommit = ... 

//optional, can pledge something on blockchain
const generateSLA = ... 

// external signing; example of auto-signer: src/client-api/oracle-auto-signer.ts
const sign = ...

const api: OracleEndpointApi = {
    requestNewCapability: async function (question: string): Promise<OracleCapability> {
        if (possibleToAdd) {
            return newCapability
        }
        throw 'cannot'
    },
    requestCommitment: async function (req: FactRequest): Promise<Commitment> {
        if (!canCommit(req)) {
            throw 'sorry!'
        }

        const commitment: Commitment = {
            req: req,
            contract: generateSLA(req),
            oracleSig: ''
        }

        const sign = signerFactory()

        //commit to r-value for bitcoin DLC
        commitment.rValueSchnorrHex = await sign([commitment, "!RVALUE"])

        // sign
        
        commitment.oracleSig = await sign([commitment, ""])
        return commitment
    },
    requestFact: async function (req: Commitment): Promise<Fact> {
        const sign = signerFactory()
        const factMsg = await lookup.getFact(req.req)
        const fact: Fact = {
            factWithQuestion: factMsg,
            signatureType: 'SHA256',
            signature: await sign([req, factMsg])
        }
        return fact
    }
}
```
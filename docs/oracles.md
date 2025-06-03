
# Oracle API

## Configure

Example: `cfg/mempool-oracle.json`

## Start peer with oracle-api enabled

```bash
npm run peer cfg/mempool-oracle.json
```
Oracle Admin UI and REST will be available at:

- http://localhost:7080/

> Security: no ports should be open to public network in this mode. Use virtualization (e.g. virsh)

or run a full demo:
```bash
npm run demo
```
- Peer: http://localhost:8080/peer-monitor/
- Oracle Admin: http://localhost:8080/oracle-admin/
- Mockup Oracle: http://localhost:8080/oracle-endpoint/
- Trader API: http://localhost:8080/trader-console/
- Oracle Ad Signer would connect to `ws-port:9081` at Oracle Admin

> Security: no ports should be open to public network in this mode. Use virtualization (e.g. virsh)


## Start advertising

```ts
fetch('./start')
```

## Register capability

>Note: there is a limitation on the maximum length of the message.

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
 `src/client-api/oracle-auto-signer.ts` has an example.

After starting oracle api,
`ws://host:port/signCp` and `ws://host:port/signAd` would give you REPL stream for signing capability ads and oracle ads respectively. You read a message - you write same message but with oracleSignature.

The best approach is to sign messages manually unless they only differ in `seqNo` field.

> Oracle capabilities are signed **without** PoW. Anyone can upgrade PoW of oracle's capability. 

> OracleId is signed **with** PoW - only oracle can upgrade its `OracleId` PoW.

## Signatures

Oracle ads and capabilites are signed with root oracle signature.

Commitments and facts are signed with a corresponding capability signature.


Security note:
- signing capability with `capabilityPubKey` not belonging to oracle would allow woner of corresponding private key to make commitments on behalf of oracle.
- Thus, it is recommended to derive capability private keys from root oracle private key (HD-wallet approach)

## PoW

examples: `src/pow.ts`

```ts
export interface OraclePow {
    powOverOracleId: (o: OracleId, difficulty: number, algorithm: string) => Promise<HashCashPow>
    powOverOracleCapability: (cp: OracleCapability, difficulty: number, algorithm: string) => Promise<HashCashPow>
}
```

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

If oracle provides facts through messengers, blockchain or any other means (inluding `fact-missing` report as a hack), then it must be able to manually or chat-bot-automatically send `commitment` and eventually `fact` as json in response to `fact-request`.

**Commitments are signed and legally binding. Oracle can be reported for not fulfilling (or misfulfilling) the commitment it made.**

It is NOT recommended (STRONGLY discouraged) for Oracles to tie facts or commitments to blockchain contracts. If oracle uses blockchain to fulfill SLA, it should be separate transaction.

Separation of responsibilities:

- Mega encourages pull-based approach for privacy
- oracle should NOT KNOW anything about contracts relying on its data. Only `fact-req` is known to oracle. This is strongly recommended in order to prevent naive market manipulation by oracles themselves.
- moreover, in Mega, oracle does not have to know about blockchain existence either. Mega DOES NOT require oracles to maintain blockchain wallets (full nodes etc).
- only endpoint, lightweight Mega-node (mempool connected to p2p) with `oracle-api` activated are required from an oracle.

-----
Example of endpoint implementation from `src/client-api/utils/oracle-endpoint`:

```ts
//optional, can check proof of payment here
const canCommit = ... 

// optional, can pledge something on blockchain, add quorum contract
// `src/client-api/contracts/slasher.ts` - MAD-DLC-slashing example
const generateSLA = ... 

// external signing; example of auto-signer: src/client-api/oracle-endpoint-signer.ts
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

## Oracle Endpoint MAD-slashing


`contract` field in `Commitment` is meant for providing blockchain transactions commiting to SLA.

Slashing (blockchain-ensured Service Layer Agreement) is a secondary feature in Mega, since any fault hurts PoW-aquired identitites.

### Quorum Slashing
Nevertheless, we provide `slashing.ts` example for `generateSLA` for `contract` commitment field.
We propose pairwise quorum commitments in `slashing.ts`. In the essence they are special case of binary option. Thus we provide BTC-DLC implementation.

Except SLA binary option would keep initial distribution of funds intact. If Alice puts 5 satochi into an escrow, and Bob puts 10 satochi into an escrow. Then regardless of the outcome, Alice gets 5 satochi and Bob gets 10 satochi.

The trick is: in order to unlock funds, oracles either have to conspire to avoid MAD (which is possible under regular pledge scenario)
Or they have to agree on data (pairwise).
 
 ```
 Pledge refunds: partial quorums (2 of 3) refunded partially (e.g. pledge1 and pledge2).
 Total vote: 100% refund
 full disagreement - no refund
 ```
 
> MAD-conspiracy case (multisig) can be omitted by modifying DLC logic. 
> Oracles can simply send funds into adaptor-signature-locked output, bypassing multisig.
> This, however, does not exclude conspiracy - since oracles would still be able to agree on data privately, WITHOUT sharing signatures with users.
> Thus we simply implement standard binary option DLC-contract here.

> Oracle conspiracy, with or without slashing, can be reported in Mega and auto-verified - through either 
>> `MissingFact` report: oracles avoided slashing through conspiracy but did not provide data
>> `FactDisagreesWithPublic` report: oracles conspired to provide wrong data


### SLA time Slashing

Another example of where the slashing `contract` field can be useful for is refund slashing: 

- lock pledge funds in DLC CET transaction
- allow trader to unlock such funds after timeout
- allow oracle to unlock with provided fact

In bitcoin, this can be achieved by adding extra timeout unlocking "sub-clause" (HTLC) into unlocking script of DLC CET transaction.

```ts
const script = `
OP_IF ${generateTimeLockScript(deadline)}
    ${pubkeyOracleHex}
OP_ELSE
    ${pubkeyTraderHex}
OP_ENDIF
OP_CHECKSIG
`
```

On other UtXO (or any) blockchains: 

```ts
const validate = ... || (time > slaTime && verifySignature(TRADER_PUB, TRADER_SIGNATURE))
```
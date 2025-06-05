# Matching API (Web)
> Experimental
## Add bundle

```bash
npm run webtest
npm run build
```

```html
<script src="./bundle.js" type="module"></script>
```

## Start collectors

```ts
const preferences: PreferenceModel = {
    minOraclePow: 0,
    minOracleReputation: 0,
    tags: ["sports", "world"],
    txfee: 0
}

window.matching.collectQuestions(preferences)
window.matching.collectOffers(preferences)
```

## Pick collected offer

```ts
const offer = await window.matching.pickOffer(preferences)
```

## Accept picked offer
```ts
await window.matching.acceptOffer(offer)
```

## Generate and broadcast random offer
```ts
const myOffer = await window.matching.generateOffer(preferences)
await window.matching.broadcastOffer(myOffer)
```

## Generate and broadcast custom offer

```ts
const oracles = await window.storage.queryCapabilities(
    {where: async x => true}, 
    {page: 0, chunkSize: 100}
)

const oracle: CapabilityModel = {
    capabilityPub: oracles[0].capabilityPubKey,
    oracle: '',
    endpoint: ''
}

const myCustomOffer: OfferModel = {
    id: 'id',
    bet: [1, 100],
    oracles: [oracle],
    question: '?',
    blockchain: 'bitcoin-testnet',
    status: 'matching',
    role: 'initiator'
}

await window.matching.broadcastOffer(myCustomOffer)

```
## Auto-negotiation
Stalker API can negotiate blockchain-transactions for an accepted offer using a given blockchain interpreter (see Contracts doc) and publish transactions on-chain if needed:

```ts
import { dataProvider } from './src-web/oracle-data-provider';

setInterval(() => window.stalking.trackIssuedOffers(
    {
        "my-chain": interpreter
    },
    dataProvider
), 1000)
```
p2p of 2 nodes example (BTC-DLC negotiation over WebRTC):

```bash
npm run webtest-it
```
P2P-messaging log:
```bash
npm run webtest-it trace
```

> WebRTC requires internet connection.


# Matching Protocol

See `src-web\matching` for code examples.

## Matching Workflow

If the whole contract is negotiated through the Mega, offer updates will form a chain, through back-references (`previousAcceptRef` in `AcceptOffer`, `acceptRef` in `FinalizeOffer`).

```
Offer 
-> negotiationStages * (Offer + AcceptOffer) 
-> Offer + negotiationStages * AcceptOfffer + FinalizeOffer
```

Several `Offer + AcceptOffer` messages might be needed to implement complex signing schemes (e.g. Schnorr musig).

_Note: One can accept offers outside of Mega mempool network - given that counter-party provided `contact`. Then follow-ups would be communicated directly without Mega-facilitation._

## Duplicates

Offers and Reports are allowed to have duplicates, since PoW can be upgraded.

The rule for evolving offer state collaboratively is to always pick the offer with highest PoW difficulty in a most progressed state (longest chain of back-references).

## Privacy

`Offer` has `encryptedDetails` field for custom privacy oriented matching engines. Sharing tx data is optional as well - anything can be in there. 

The key idea is obfuscation - with a bit of PoW, offer pools can be filled with random offers, random negotiations, relating to random oracles and capabilities.

> Offers meant to have high random eviction rate - their PoW should be cheap, since it is only for spam protection.

Actual aquisition of data is happening outside of `Mega` - oracle `Commitment`s are not shared publicly unless trader decides to report malleable oracle. Certain types of reports, e.g. `fact-disagrees-with-public` consensus can be faked too, only PoW is relevant.

> Matching offers on Mega is non-essential feature of the protocol. Traders can always bypass Mega p2p and communicate offers outside of mempools. Although, Mega could be safer and more private than "private societies" in messengers which are easy to not just infiltrate, but also manipulate, due to illusion of privacy and anonymity, coming from creators of such messengers. 

> Mega recommends ad-hoc random "hook up" counterparties. I don't manage p2p network, I don't even give you seedlist or mainnet code for btc-contracts, I have other things. Offers you find in mempools in disparaged chunks of the net are from random irrelevant entities. Only predictions ("bets") they make are relevant. Reality is in exchange.

## Bypassing PoW-evictions

Mega allows messages with PoW=0 (any hash then, integrity is skipped for PoW=0), unless higher PoW-message arrived. In a private p2p-network of semitrusted parties - Mega turns into a regular serverless communication protocol. Domain-specific gossiping.

>If hash-integrity is required - `powThreshold=1` is a reasonable solution.

For public networks - PoW is unavoidable, regardless of type of messaging. Mega, however provides random evictions, which combined with `powThreshold = 0`, effectively allow to allocate `randomEvictionRate` percentage of the pool to messages without PoW. 

This can be used as a fast relay for broadcasting offer negotiation messages, akin to how bitcoin transactions broadcasted. `powThreshold` can be fine-tuned manually in order to avoid spam and propagate necessary messages faster. Simillarly to Nano, PoW-load on market participants can be minimized.

Matching can have separate public network (different seedlist) in order to facilitate high order throughtput.

> As mentioned before, Mega is oriented towards meaningful trading. We discorage the mis-uses of algoithmic trading leading towards bloated traffic. High order throughtput has to be justified, e.g. 8 billion humans using Mega to compete in prediction and analysis of environment, as unrealistic as it may appear. NOT a hundred of naive traders running unnecessary meaningless mutually annihilating deals (in perfect hedge), wasting funds and resources on fees.
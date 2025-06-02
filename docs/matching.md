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
const offer = await window.matching.pickOffer()
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

# Matching Protocol

See `src-web\matching` for code examples.

## Matching Workflow

If the whole contract is negotiated through the Mega', offer updates will form a chain, through back-references (`previousAcceptRef` in `AcceptOffer`, `acceptRef` in `FinalizeOffer`).

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


# Matching API (Web)

## Add bundle

```bash
npm run webtest
npm run bundle
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

# Composite contracts 

Offers in Mega can express any meaningful financial contract. `OfferTerms` (`src/protocol.ts`) is a basic abstract language (akin to Cardano Marlowe) which standardizes description of financial contracts. 

Unlike Marlowe, `OfferTerms` is closer to modern quantitative finance, taking two-party binary option as a basis.

Traders can write their own interpreter for `OfferTerms` since the logic is trivial: binary options which can depend on outcomes of other binary options. 

This approach is compatible with Bitcoin DLC, since trading app developers can simply generate a tree of CET transaction straightforwardly from `OfferTerms`. It also allows to generate contracts for any chain.


## Example
Here's binary option:

```json
{
    question: "who's president?"    
    partyBetsOn:["ME"],
    counterPartyBetsOn:["YOU"],
    partyBetAmount:100,
    counterpartyBetAmount:10
}
```

Here's composite binary option:

PSEUDOCODE (we leave trivial DSLs to app developers):
```ts
receive(party, 100 + max(20, 0)) //can be implicit in `OfferTerms`
receive(counterparty, 10 + max(10, 10)) //can be implicit in `OfferTerms`
if (outcome("who's president") === "ME") {
    payTo(party, 10)
    if (outcome("who's the best?") === "I") {
        payTo(party, 10)
    } else {
        payTo(counterparty, 20)
    }
} else {
    payTo(counterparty, 100)
    if (outcome("who's the best?") === "THEY") {
        payTo(party, 10)
    } 
}
```
> pseudo-DSL above assumes no recapitalization of winnings. Recapitalisation is implicit, but same as in Marlowe, internal accounts in remaining collateral, can be modeled as syntax sugar and simply added to remaining payout.

OFFERS-TO-RENDER:

STAGE1 offer-chunk:
```json
{
    hash: "000001",
    terms: {
        question: "who's president?"    
        partyBetsOn: ["ME"],
        counterPartyBetsOn: ["YOU"],
        partyBetAmount: 100,
        counterpartyBetAmount: 10,
        partyCompositeCollateralAmount: 120
        counterpartyCompositeCollateralAmount: 10
    }
}
```

> `partyCompositeCollateralAmount`, `counterpartyCompositeCollateralAmount` are optional, since they can be calculated from the tree of contracts. Specifying these params makes it easier to generate DLC contracts and ensure their integrity

Worst-case scenario: party will have 20sat (`partyCompositeCollateralAmount - partyBetAmount`) left in multisig escrow, counterparty will have 10sat  (`counterpartyCompositeCollateralAmount - counterpartyBetAmount`).

STAGE2 offer-chunks:
```json
{
    hash: "000002",
    dependsOn: [{
        outcome: "ME",
        offerRefs: ["0000001"]
    }],
    terms: {
        question: "who's the best?"    
        partyBetsOn:["I"],
        counterPartyBetsOn:["THEY"],
        partyBetAmount:20,
        counterpartyBetAmount:10
    }
}
```

```json
{
    hash: "000003",
    dependsOn: [{
        outcome: "YOU",
        offerRefs: ["0000001"]
    }],
    terms: {
        question: "who's the best?"    
        partyBetsOn:["I"],
        counterPartyBetsOn:["THEY"],
        partyBetAmount:0,
        counterpartyBetAmount:10
    }
}
```

> `dependsOn` is a list - offer depends on ALL of dependent outcomes to fulfill

> `offerRefs` is a list too - offer depends on ANY of the offers to fulfill selected outcome. This approach allows for trivial Merkle-tree-like optimisations in DSLs: same contract can be re-used as a subcontract. It is reverse hash-tree though.

 Unlike with Marlowe - money preservation property is ensured in the language design, rather than with SMT-solvers.

> In the composite contract js-eDSL pseudo-code above - `receive` represents full collateral for a participant. It is implicit "syntax sugar" because it's only needed to assert money preservation (eDSL can check that collateral computed as a sum of bets made by a given party (for worst-case outcomes) equals to the number specified in `receive`).

> Note on Marlowe: ad-hoc receives in the middle of a contract have no semantics. They always have to be at the start since non-participation would trigger timeout conditions, which are meaningfully either refund or MAD-lock - due to money preservation itself. 

> Every "ad-hoc" receive in reality triggers its own contract, dictating distribution of new collateral - there is no need to have dependencies between two receives from same party. New receive from same parties - new escrow contract formed.

## Multi-party

Two-party offers are generalizable to multi-party (multi leg) offers through adding a composite party, e.g. "bob,carol".

It simplifies matching, since originator of the offer would not have to care about how many parties would join it. 

>In BTC-DLC "bob, carol" would have their own multisig and pre-sign their own CET-transactions, before co-signing CET and opening transaction with alice.

It is trivial to built "multiParty eDSLs" under this framework too, since one only has to take 3-party (n-party) contract and generate 2 (n-1) bilateral contracts:

- one where bob and carol are considered same party
- another one where bob payouts are simply excluded

>In BTC-DLC, inputs-outputs from the same stage - can still be pooled together in order to reduce fees.

## Schedules 

Schedules (e.g. quantized  `InterestRateSwap`) are  expressed through `OfferTerms.dependsOn` reference meant to specify previous stage in a multi-stage contract. `OfferTerms.dependsOn` can be conditional on the outcome of previous stage, effectively  making such contracts stateful (state would be a set of past outcomes).



_BTC-DLC matching note: Scheduled offer is finalized when first `openingTx` for the whole composite tree is co-signed (parties cross check that every subcontract is co-signed)._

### "Ad-hoc" parties in schedules
If party has to be added "on the go" then special "new party" outcome has to be added.
Such outcome can be attested without third-party oracle, by verifying proof of funding transaction on-chain.

For BTC this would require to either: 
- potential candidates to specify their adresses in advance (in the offer itself) together with conditions to join, 
- or a consensus of existing parties

### Exponential explosion
`OfferTerms` are meant to represent a contract with predictable execution time (Marlowe expressiveness). This approach also ensures that funds won't stuck in an escrow.

Careless use, however, can put contracts at the risk of  explosion, over-choicefullness.

In order to avoid such explosion - outcomes can be compressed. For instance, "BTC price" can have two outomes "0..100000" and "100000..moon" instead of infinity of outcomes.

Same goes for schedules: grouping outcomes for every stage in a contract, would avoid:
- exponential "random-walk"-like explosion 
- accumulation of uneccesssary state in a contract.

_Note: explosions are explicit in Mega-contracts, unlike Web3. Turing-complete contracts in Mega are explicitly ensured for computability before creation of blockchain._

#### Merkle-trees (for DSL designers)

Merkle-trees can potentially be utilized to eliminate duplicate subtcontract trees in offer trees, thus reducing risks of contract explosion to a theoretical minimum. Such approach would eliminate uneccessary intermediate state as well.

Practically, it requires extra-care:

- subcontracts with equivalent semantics might contain small differences (e.g. redemption addresses). This has to be eliminated manually.
- it is recommended to bound contract-size to reasonable minimum during contract generation, in order to avoid dealing with "halting problem", proof assistants etc. For BTC such bound can be expressed in bytes, or even satochis if txfee is known.
- use DSL like Marlowe or write your own.
- recursive calls in DSLs can be supported through  bounded "typed" recursion, with default return value supplied in "return" after a fixed amount recursive calls (backup-value for "stack-overflow"). Such trivial macro re-inlining function body n times solves Turing-completeness issues once and for all.
  - this approach allows for fixed-max-length lists, dictionaries, any type of parsing/analysis on data from oracle. On BTC or any other chain.
  - this approach allows for typed IO in DSLs: read data-point from oracle, write funds to parties, up to n times. On BTC or any other chain.
  - BTC-DLC: proposed SIGHASH_NOINPUT would additionally allow to compress multiple recursive inlines into a single contract. Compression of higher-kind type.

_This approach works for any Schnorr-enabled blockchain starting with BTC, it makes smart-contract VMs unneccessary_

**After such techniques have been applied, only contracts that are aimed at modeling "perpetual motion" would explode.**

#### **"Perpetuality"**

Simillarly to Marlowe, "quantized perpetual swap"-like contracts can still be modeled without exponential explosion by:
-  allowing "renewal or refund" condition (optional "close").

Such condition would also benefit liquidity, and avoid overcollaterization.

### Collaterals
Collaterals for composite contracts in Mega are trivial to evaluate: it is simply a sum of all worst-case (see `receive`) bets made by a party. 

It is recommended to rather bound contract complexity than use meaningless tokens or pools (managed with "automated"  unsound logic) for collaterization. Collaterization must be done in bounded currency, bounded with physical energy like BTC. 

Limiting complexity is better than double-counting physical energy.
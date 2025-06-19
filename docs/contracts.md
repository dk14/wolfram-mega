
# Contracts API (Web)
> Experimental
## Add bundle
```bash
npm run webtest
npm run build
```

```html
<script src="./mega-peers.min.js" type="module"></script>
```

```html
<script src="https://dk14.github.io/wolfram-mega/mega-peers.min.js" type="module"></script>
```

## Implement your blockchain:
```ts
//non-Utxo blockchains can insecurely specify account number in txid and omit vout, ... coz they insecure about tech
export interface UTxO {
    txid: string
    vout: number
    value?: number
    age?: number
}

export interface Inputs {
    utxoAlice: UTxO[] //party
    utxoBob: UTxO[] //counterparty
}

export interface ContractInterpreter {
    
    getUtXo: (terms: OfferMsg) => Promise<Inputs>
    genContractTx: (inputs: Inputs, c: Commitment[], offer: OfferMsg) => Promise<[Contract, OfferMsg?]>
    submitTx: (tx: string) => Promise<TxId>
}

import { ContractInterpreter, Inputs, UTxO } from '@dk14/wolfram-mega/chain-interpreter'

const interpreter: ContractInterpreter = ...
```
> Use `offer.content.accept`, `PartiallySignedTx` to implement interactive signing for barrier escrows.

## Start stalking accepted offers

```ts
import { dataProvider } from '@dk14/wolfram-mega/oracle-data-provider';

setInterval(() => window.stalking.trackIssuedOffers(
    {
        "my-chain": interpreter
    },
    dataProvider
), 1000)
```

> If counterparty has interpreter - stalking API will automatically find accepted offers, negotiate and co-sign transactions through Mega P2P.

## Use Matching API to submit offer

```ts
const myOffer = await window.matching.generateOffer(preferences)
await window.matching.broadcastOffer(myOffer)
```

Composite offers can be created in : [Blockly Editor](#blockly-editor)


## List orders

```ts
await window.matching.listOrders(100)
```
Duplicates will be filtered by generated `orderId` in favor of most recent version


## BTC-DLC interpreter

There is a default intepreter for [BTC-DLC](https://adiabat.github.io/dlc.pdf).
    
> binary option contracts supported and composition (experimental). 

> MAD (mutually assured destruction) version of DLC is implemented. If any of the parties rejects co-signing - their funds will be locked (symmetrically).

```ts
import { btcDlcContractInterpreter } from '@dk14/wolfram-mega/transactions';
import { dataProvider } from '@dk14/wolfram-mega/oracle-data-provider';

setInterval(() => window.stalking.trackIssuedOffers(
    {
        "bitcoin-testnet": btcDlcContractInterpreter
    },
    dataProvider
), 1000)
```

> We use HTLC (`OP_SHA256 <lock> OP_EQUAL OP_VERIFY`) to ensure atomicity of co-signing CET-transactions, CET-transactions would only become spendable after Alice and Bob BOTH share their preimages to SHA256-commitments.
> Without this scheme, ["fair exchange protocols"](https://crypto.stackexchange.com/questions/61386/atomic-multi-party-commitments/117171#117171) in singning would be broken. Nothing would stop Alice from only signing CET-transaction that she likes. Then if she wins the bet - she'll get the winning, if she loses - she loses with revenge: Bob won't win either (Win or MAD). 
> This still requires extra security deposit - because Alice might decide to not give her preimage in exchange for Bob's preimage. But such deposit would only be locked for the time of signing - it is not locked with oracle's outcome. Thus, it can be redeemed right away. The moment Alice decides to unlock this UtXO - her preimage will be known to Bob, so Bob can unlock his winnings (no offchain interaction is required).

> Locks provide MAD symmetrically as a worst case outcome of co-signing with revengeful malicious party, no revenge for Alice. Note: MAD refunds are possible after timeout (same as with Bitcoin Lightning) - but we don't provide it for testnet version, since symmetric MAD ensures security already.

> proposed `SIGHASH_NOINPUT` (BIP118) would remove the need for HTLC in DLC (as well as LN), if BTC adopts it. CET-pack can be co-signed before opening tx then. Signing opening tx is done atomically (Schnorr mu-sig) without need to commit deposit. Without opening tx - CET become invalid, since there is no UtXO to fit CET TX's inputs.

> Transaction fees are pre-committed in advance, since without ANYPREVOUT - there is no way to attach them ad-hoc. Our BTC API supports separate inputs for fees, but stalker is not using it.

Mainnet version of `btcDlcContractInterpreter` would require extra-optimizations to be secure and practically usable.

> Future mainnet version. Since funds distribution of binary option is all-or-nothing - such contract can be represented with one Taproot transaction without DLC or any scripting: collateral either unlocks with Alice and adapted oracle pub (for leaf1) or Bob and adapted oracle pub (for leaf2). Atomicity of co-signing would be ensured automatically. Composite contracts woulld still require binary tree of off-chain transactions and hash-time-locking though and flattening of a tree might not be applicable.

> Bitcoin Lightning version would require PTLC-cluster (channell factory) established with reasonable liquidity (in order to support barrier escrow). Funds can be routed in and out between cluster and regular LN off-chain, as long as separate "trading account" has been initially opened on-chain for PTLC-member (and cluster has enough liquidity to route funds). Using LN for trading generally requires higher liquidity stash, since payment routes can be PTLC-locked (Schnorr-locked) for a longer time in order to maintain lock on collaterals. LN is more useful for short-term bets, although since channell factories are one-hop at most, and usually bounded to a trading community - they are usable in general trading. Let's wait for BOLT standartisation...

# Composite contracts 

Offers in Mega can express any meaningful (finite) financial contract. `OfferTerms` (`src/protocol.ts`) is a basic abstract language (AST, akin to Cardano Marlowe) which standardizes description of financial contracts. 

Unlike Marlowe, `OfferTerms` is closer to modern quantitative finance, taking two-party binary option as a basis.

Traders can write their own interpreter for `OfferTerms` since the logic is trivial: binary options which can depend on outcomes of other binary options (`OfferTerms.dependsOn`). 

> This approach is compatible with [Bitcoin DLC](https://adiabat.github.io/dlc.pdf), since trading app developers can simply generate a tree of CET transactions straightforwardly from `OfferTerms`. It also allows to generate contracts for any chain, given that `OfferTerms` interpreter is written for that chain.

## Example
Here's non-composite binary option:

```js
{
    hash: "0000",
    terms: {
        question: "who's president?" 
        arguments: {"when", "tomorrow"}   
        partyBetsOn:["ME"],
        counterPartyBetsOn:["YOU"],
        partyBetAmount:100,
        counterpartyBetAmount:10
    }
}
```

Here's composite binary option:

PSEUDOCODE (we leave trivial DSLs to <s>academics</s> app developers, jk - there is "Discreet eDSL" doc):
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

STAGE1 (root offer-chunk):
```js
{
    orderId: "000001",
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

STAGE2 (leaf offer-chunks):
```js
{
    orderId: "000002",
    dependsOn: [{
        outcome: "ME",
        orderId: "0000001"
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

```js
{
    orderId: "000003",
    dependsOn: [{
        outcome: "YOU",
        orderId: ["0000001"]
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

Unlike with Marlowe - money preservation property can be ensured in the language design, rather than with theorem proof assistants and SMT-solvers.

> In the composite contract js-eDSL pseudo-code above - `receive` represents full collateral for a participant. It is implicit "syntax sugar" because it's only needed to assert exact money preservation (trader's expectation of collaterals), the property itself is already satisfied by design - since inputs are automatically calculated (binomial pricing). DSL can additionally check that collateral computed as a sum of bets made by a given party (for worst-case outcomes) equals to the number specified in `receive`), thus replacing solver.

> Note on Marlowe: ad-hoc receives in the middle of a contract has no semantics. They always have to be at the start since non-participation would trigger timeout conditions, which are meaningfully either refund or MAD-lock - due to money preservation itself. The only exception is crypto-loan, but such loans are mere assertions of money received outside of contract (attested by third-party or pure blockchain-script oracle, e.g.checking  input added to tx). The refill can be used to establish a new contract, but there is no need to link it on-chain, since refill cannot be guaranteed.

> Every "ad-hoc" receive in reality triggers its own contract, dictating distribution of new collateral - there is no need to have dependencies between two receives from same party. New receive from same parties - new escrow contract formed.

## Multi-party

Two-party offers are generalizable to multi-party (multi leg) offers through creating a set of pairwise contracts (see "Dicreet DSL" doc).

It simplifies matching, since originator of the offer would not have to care about how many parties would join it. 

>In [BTC-DLC](https://adiabat.github.io/dlc.pdf) "bob, carol" would have their own multisig and pre-sign their own CET-transactions, before co-signing CET and opening transaction with alice.

>In [BTC-DLC](https://adiabat.github.io/dlc.pdf), inputs-outputs from the same stage - can still be pooled together in order to reduce fees.

## Schedules 

Schedules (e.g. quantized  `InterestRateSwap`) are  expressed through `OfferTerms.dependsOn` reference meant to specify previous stage in a multi-stage contract. `OfferTerms.dependsOn` can be conditional on the outcome of previous stage, effectively  making such contracts stateful (state would be a set of past outcomes).


### "Ad-hoc" parties in schedules
If party has to be added "on the go" then special "new party" outcome has to be added.
Such outcome can be attested without third-party oracle, by verifying proof of funding transaction on-chain.

For BTC this would require to either: 
- potential candidates to specify their adresses in advance (in the offer itself) together with conditions to join, 
- or a consensus of existing parties

> this would require collaterals to be pre-comitted in advance. Otherwise - it would be a separate contract - see notes on Malowe above.

> There is a trivial factory pattern (for off-chain logic) - allowing to manage "ad-hoc" parties without pre-comitted collateral. Since contracts are always pairwise - you simply create new pairs and continue the existing ones as usual

> pairwise contracts can interact with one another (communicate events) using hashlocks. Party in one contract can authorize action in another contract this way.

### Exponential explosion
`OfferTerms` are meant to represent a contract with predictable execution time (Marlowe expressiveness). This approach also ensures that funds won't stuck in an escrow.

Careless use, however, can put contracts at the risk of  explosion, over-choicefullness.

In order to avoid such explosion - outcomes can be compressed. For instance, "BTC price" can have two outomes "0..100000" and "100000..moon" instead of infinity of outcomes.

Same goes for schedules: grouping outcomes for every stage in a contract, would avoid:
- exponential "random-walk"-like explosion 
- accumulation of uneccesssary state in a contract.

_Note: explosions are explicit in Mega-contracts, unlike Web3. Turing-complete contracts in Mega are explicitly ensured for computability before creation of blockchain._

#### Optimisations (for DSL designers)

Merkle-trees can potentially be utilized to eliminate duplicate subtcontract trees in offer trees (memoization), thus reducing risks of contract explosion to a theoretical minimum. Such approach would eliminate uneccessary intermediate state as well.

Practically, it requires extra-care:

- subcontracts with equivalent semantics might contain small differences (e.g. redemption addresses). This has to be eliminated manually.
- it is recommended to bound contract-size to reasonable minimum during contract generation, in order to avoid dealing with "halting problem", proof assistants etc. For BTC such bound can be expressed in bytes, or even satochis if txfee is known.
- use DSL like Marlowe or write your own.
- recursive calls in DSLs can be supported through  bounded "typed" recursion, with default return value supplied in "return" after a fixed amount recursive calls (backup-value for "stack-overflow"). Such trivial macro re-inlining function body n times solves Turing-completeness issues once and for all.
  - this approach allows for fixed-max-length lists, dictionaries, any type of parsing/analysis on data from oracle. On BTC or any other chain.
  - this approach allows for typed IO in DSLs: read data-point from oracle, write funds to parties, up to n times. On BTC or any other chain.
  - BTC-DLC: proposed SIGHASH_NOINPUT would additionally allow to compress multiple recursive inlines into a single contract. Compression of higher-kind type.

#### Applicability

_This approach works for any Schnorr-enabled blockchain starting with BTC, it makes smart-contract VMs unneccessary_

**After such techniques have been applied, only contracts that are aimed at modeling "perpetual motion" would explode.**

#### **"Perpetuality"**

Simillarly to Marlowe, "quantized perpetual swap"-like contracts can still be modeled without exponential explosion by:
-  allowing "renewal or refund" condition (optional "close").

Such condition would also benefit liquidity, and avoid overcollaterization.

### Collaterals
Collaterals for composite contracts in Mega are trivial to evaluate: it is simply a sum of all worst-case (see `receive`) bets made by a party. 

It is recommended to rather bound contract complexity than use meaningless tokens or pools (managed with "automated"  unsound logic) for collaterization. Collaterization must be done in bounded currency, bounded with physical energy. e.g BTC's finite supply of satochis. 

> While [Bitcoin DLC](https://adiabat.github.io/dlc.pdf) allows arbitrary complex contracts, prefering less complex human-interpretable ones is wiser than double-counting your collaterals. Physical energy available to humans is finite - even nuclear powerplant requires human maintainance, while humans themselves are bounded in food and natural resources available.

------

# Contracts Typescript API (Node.js, BTC)

We use BTC-DLC for BTC-contracts. It allows arbitrary contracts on Bitcoin. 

Research done previously, with info on BTC-DLC contracts:
https://dk14.github.io/marlowe-wolfram-webdoc/eurocall

The Mega-code is in:
`src/client-api/contracts/generate-btc-tx`

----

The following webpage is shown on Trader Console (see `npx mega-demo`), where you can play and familiarize yourself with parameters tx generator requires:

`src/client-api/service/index.html`



### CET API

```ts
import { generateOpeningTransaction,  generateClosingTransaction,generateCetTransaction, OpeningParams, ClosingParams, CetParams } from '@dk14/wolfram-mega/btc'

generateOpeningTransaction(...)
generateClosingTransactionn(...)
generateCetTransaction(...)

```

> DLC can also be used to generate oracle's pledge for quorums (very optional feature in Mega)

> pairs of oracles can co-sign DLC contracts refunding themselves in case of quorum. Adding HTLC to it would ensure SLA. otherwise - their funds remain locked

> this would avoid 51% attack on minority - all oralces would have to agree. 

> Majority takes all pledge version can also be implemented with DLC.

### Full BTC DLC

```ts
import {DlcParams, DlcContract, generateDlcContract} from '@dk14/wolfram-mega/btc'

generateDlcContract(...)
```

# Contract Typescript API (Node.js Cardano Helios)
`src/client-api/contracts/generate-cardano-tx`

`src/client-api/service/index.html`

### API

```ts
generateOpeningTransaction = (network: string, inputs: OpeningInputs): Promise<CborHex> => ...
generateClosingTransaction = (network: string, inputs: ClosingInputs): Promise<CborHex> => ...
```

>network is a link to cardano network params

> Cardano network is aweful. We only use Cardano for research purposes.

------

# Contract Demo (Node.js + TestNet)
Run mocked services together for contract demo purposes:
```
npm run demo
```

or

```
npx mega-demo
```

- Peer: http://localhost:8080/peer-monitor/
- Oracle Admin: http://localhost:8080/oracle-admin/
- Mockup Oracle: http://localhost:8080/oracle-endpoint/
- Trader Console: http://localhost:8080/trader-console/

## Client APIs: Trader Console and Oracle Admin

Service implements trader console and oracle admin on top of respective client APIs:

- oracle-control-api is how oracle interacts with mempool
- trader-api is how trader interacts with mempool
- client-storage has reference implementation for client-side storages


Note: client APIs should NOT be exposed to public network! The system should run in something like `virsh` (VM) ideally.

## Binary Option Demo

Trader console (`npx mega-demo`, open http://localhost:8080/trader-console/) contains demo of Cardano Helios and BTC DLC binary option contracts on TestNet. Helios version signs through webwallet (signing in browser), while BTC version relies on external signing http service (example: `src/client-api/utils/btc-signer.ts`, can be delegated to harware wallet).

Sample of TestNet BTC transactions created with trader console:

[Opening](https://mempool.space/testnet/tx/4e06cc881ff74f2e14b1fad1ae6c77ab5487441af5dab49ebe07430eb3baa62b)

[CET opening (bind to specific oracle fact through scriptless script)](https://mempool.space/testnet/tx/c1f08eda003781550b76b7711db2f678baddedf37a325d2e7fdde706707347a5)

[CET redemption (unlock funds with signed fact)](https://mempool.space/testnet/tx/d816a61c588840463fb8b59eee2cae55c53b5e7d680315aba65d5138225ac710)

[BTC DLC](https://adiabat.github.io/dlc.pdf) (MAD-version) Workflow: 

<img src="https://github.com/user-attachments/assets/247c97e7-a945-4b37-9783-48fd85ccc847" style="filter: sepia() opacity(0.8)" alt="drawing" width="500"/>

Security note on DLC atomicity during interactive signing. Do not sign opening (funding) DLC transaction until all CET transactions are co-signed.

Security note on interactive sign: if no precommitments implemented, rogue keys are welcome. 

## Architecture

<img src="https://github.com/user-attachments/assets/bc7daa77-21cf-4a5c-9c88-ae2191ee95dd" style="filter: invert() sepia() opacity(0.5) saturate(1.2)" alt="drawing" width="500"/>

[link](https://drive.google.com/file/d/1vABqqvhWD02wjaIzPP_rvGsvGJ-zSSy6/view?usp=sharing)


## Persistence
`src/client-api/client-storage` provides simple minimalistic implementation of a database holding collected broadcasts.
It is only indexed by key. Custom storage implementation can be specified in `app.ts` script for `startOracleService`, `startTraderService`

Note: delete oldest entries in `../../db/reports`, `../../db/capabilities`, `../../db/offers`, `../../db/oracles` in order to manage storage.

## Utils
`src/client-api/utils/` folder contains examples of oracle endpoint and auto-signing services (configs are in `src/client-api/utils/cfg`):

```
npm run mock-oracle cfg/endpoint-test.json
npm run auto-sign cfg/signer-test.json
npm run btc-signer cfg/btc-signer-test.json
```

# Blockly Editor
`OfferModel` editor:
<iframe src="./blockly.html" style="height: 900px; width: 820px; border:none"></iframe>

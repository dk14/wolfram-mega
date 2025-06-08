
# Contracts API (Web)
> Experimental
## Add bundle
```bash
npm run webtest
npm run build
```

```html
<script src="./bundle.js" type="module"></script>
```

## Implement your blockchain:
```ts
//non-Utxo blockchains can insecurely specify account number in txid and omit vout
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

const interpreter: ContractInterpreter = ...
```
> Use `offer.content.accept`, `PartiallySignedTx` to implement interactive signing for barrier escrows.

## Start stalking accepted offers

```ts
import { dataProvider } from './src-web/oracle-data-provider';

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

## List orders

```ts
await window.matching.listOrders(100)
```
Duplicates will be filtered by generated `orderId` in favor of most recent version


## BTC-DLC interpreter

There is a default intepreter for [BTC-DLC](https://adiabat.github.io/dlc.pdf).
    
> binary option contracts supported and composition (experimental). 

> This is MAD (mutually assured destruction) version of DLC. If any of the parties rejects co-signing - their funds will be locked (symmetrically).

```ts
import { btcDlcContractInterpreter } from './src-web/transactions';
import { dataProvider } from './src-web/oracle-data-provider';

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

> Mainnet version: since fund distribution of binary option is all-or-nothing - such contract can be represented with one Taproot transaction without DLC or any scripting: collateral either unlocks with Alice and adapted oracle sig  (leaf1) or Bob and adapted oracle sig (leaf2). Atomicity of co-signing would be ensured automatically. Composite contracts woulld still require binary tree of off-chain transactions and hash-time-locking though.

# Composite contracts 

Offers in Mega can express any meaningful (finite) financial contract. `OfferTerms` (`src/protocol.ts`) is a basic abstract language (akin to Cardano Marlowe) which standardizes description of financial contracts. 

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

PSEUDOCODE (we leave trivial DSLs to <s>academics</s> app developers):
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

Unlike with Marlowe - money preservation property is ensured in the language design, rather than with SMT-solvers.

> In the composite contract js-eDSL pseudo-code above - `receive` represents full collateral for a participant. It is implicit "syntax sugar" because it's only needed to assert money preservation (eDSL can check that collateral computed as a sum of bets made by a given party (for worst-case outcomes) equals to the number specified in `receive`).

> Note on Marlowe: ad-hoc receives in the middle of a contract have no semantics. They always have to be at the start since non-participation would trigger timeout conditions, which are meaningfully either refund or MAD-lock - due to money preservation itself. 

> Every "ad-hoc" receive in reality triggers its own contract, dictating distribution of new collateral - there is no need to have dependencies between two receives from same party. New receive from same parties - new escrow contract formed.

## Multi-party

Two-party offers are generalizable to multi-party (multi leg) offers through creating a set of pairwise contracts.

It simplifies matching, since originator of the offer would not have to care about how many parties would join it. 

>In [BTC-DLC](https://adiabat.github.io/dlc.pdf) "bob, carol" would have their own multisig and pre-sign their own CET-transactions, before co-signing CET and opening transaction with alice.

It is trivial to built "multiParty eDSLs" under this framework too, since one only has to take 3-party (n-party) contract and generate 2 (n-1) bilateral contracts:

- one where bob and carol are considered same party
- another one where bob payouts are simply excluded

>In [BTC-DLC](https://adiabat.github.io/dlc.pdf), inputs-outputs from the same stage - can still be pooled together in order to reduce fees.

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

It is recommended to rather bound contract complexity than use meaningless tokens or pools (managed with "automated"  unsound logic) for collaterization. Collaterization must be done in bounded currency, bounded with physical energy. e.g BTC's finite supply of satochis. 

> While [Bitcoin DLC](https://adiabat.github.io/dlc.pdf) allows arbitrary complex contracts, prefering less complex human-interpretable ones is wiser than double-counting your collaterals. Physical energy available to humans is finite - even nuclear powerplant requires human maintainance, while humans themselves are bounded in food and natural resources available.

------

# Contracts Typescript API (Node.js, BTC)
`src/client-api/contracts/generate-btc-tx`

`src/client-api/service/index.html`

## CET
### Parameters

```ts
export interface OpeningParams {
    aliceIn: UTxO[],
    bobIn: UTxO[],
    alicePub: PubKey,
    bobPub: PubKey,
    aliceAmountIn: number[],
    bobAmountIn: number[],
    changeAlice: number,
    changeBob: number,
    txfee: number
}

export interface ClosingParams {
    lockedTxId: TxId,
    alicePub: PubKey,
    bobPub: PubKey,
    aliceAmount: number,
    bobAmount: number,
    txfee: number
}

export interface CetParams {
    lockedTxId: TxId,
    oraclePub: PubKey,
    oraclePub2: PubKey,
    oraclePub3: PubKey,  
    answer: Msg, 
    rValue: Hex,
    rValue2?: Hex,
    rValue3?: Hex,
    alicePub: PubKey,
    bobPub: PubKey,
    aliceAmount: number,
    bobAmount: number,
    txfee: number,
    session?: PublicSession,
    stateAmount?: number //goes back to multisig, for composite contracts
}

export interface CetRedemptionParams {
    cetTxId: TxId, 
    oraclePub: PubKey,
    oraclePub2?: PubKey, 
    oraclePub3?: PubKey,  
    answer: Msg, 
    rValue: Hex,
    rValue2?: Hex,
    rValue3?: Hex,
    alicePub: PubKey, 
    bobPub: PubKey,
    oracleSignature: Hex, 
    oracleSignature2?: Hex, 
    oracleSignature3?: Hex, 
    quorumno?: 1 | 2 | 3,
    amount: number,
    txfee: number
}

```

### API

```ts
type Hex = string

interface BtcApi {
    generateOpeningTransaction: (params: OpeningParams) => Promise<Hex>
    generateClosingTransaction: (params: ClosingParams) => Promise<Hex>
    generateCetTransaction: (params: CetParams) => Promise<Hex>
}
```

> DLC can also be used to generate oracle's pledge 
> pairs of oracles can co-sign DLC contracts refunding themselves in case of quorum. Adding HTLC to it would ensure SLA. otherwise - their funds remain locked

> this would avoid 51% attack on minority - all oralces would have to agree. Majority takes all pledge can also be implemented with DLC.

## Full BTC DLC

```ts
export interface DlcParams {
    aliceIn: UTxO[],
    bobIn: UTxO[],
    aliceAmountIn: number[],
    bobAmountIn: number[],
    oraclePub: PubKey,
    oraclePub2: PubKey,
    oraclePub3: PubKey,  
    outcomes: { [id: Msg]: FundDistribution; }, 
    rValue: Hex,
    rValue2?: Hex,
    rValue3?: Hex,
    alicePub: PubKey,
    bobPub: PubKey,

    changeAlice: number,
    changeBob: number,
    txfee: number,
    session?: PublicSession,
    stateAmount?: number //goes back to multisig, for composite contracts
}

```

### API

This would generate one-stage DLC contract:

```ts

interface DlcContract {
    openingTx: Hex
    cet: Hex[]
}

generateDlcContract = (params: DlcParams): Promise<DlcContract> => ...
```

# Contract Typescript API (Node.js Cardano Helios)
`src/client-api/contracts/generate-cardano-tx`

`src/client-api/service/index.html`

### Params
```ts
type Hex = string
type CborHex = string
type Bech32 = string
type Base64 = string

export interface InputId {
    txid: Hex,
    txout: number,
    amount: number,
    addr?: Bech32
} 

interface Redemption {
    aliceRedemptionAddr: Bech32,
    aliceBetsOnMsg: Base64
    bobRedemptionAddr: Bech32
    bobBetsOnMsg: Base64
}

export interface OpeningInputs {
    aliceInput: InputId, 
    bobInput: InputId,
    oracleCpPubKey: Base64,
    oracleCpPubKey2?: Base64,
    oracleCpPubKey3?: Base64,
    r: Redemption,
    changeAddr: Bech32,
    txfee: number,
    aliceActualAmount: string,
    bobActualAmount: string
}

export interface ClosingInputs {
    input: InputId,
    aliceInput: InputId, 
    bobInput: InputId,
    aliceCollateralInput: InputId, 
    bobCollateralInput: InputId,
    oracleCpPubKey: Base64,
    oracleCpPubKey2?: Base64,
    oracleCpPubKey3?: Base64,
    msg: Base64, 
    sig: Base64,
    sig2: Base64,
    sig3: Base64,
    r: Redemption,
    changeAddr: Bech32,
    txfee: number
}

```

### API

```ts
generateOpeningTransaction = (network: string, inputs: OpeningInputs): Promise<CborHex> => ...
generateClosingTransaction = (network: string, inputs: ClosingInputs): Promise<CborHex> => ...

```

>network is a link to cardano network params

------

# Contract Demo (Node.js + TestNet)
Run mocked services together for contract demo purposes:
```
npm run demo
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

Trader console (http://localhost:8080/trader-console/) contains demo of Cardano Helios and BTC DLC binary option contracts on TestNet. Helios version signs through webwallet (signing in browser), while BTC version relies on external signing http service (example: `src/client-api/utils/btc-signer.ts`, can be delegated to harware wallet).

Sample of TestNet BTC transactions created with trader console:

[Opening](https://mempool.space/testnet/tx/4e06cc881ff74f2e14b1fad1ae6c77ab5487441af5dab49ebe07430eb3baa62b)

[CET opening (bind to specific oracle fact through scriptless script)](https://mempool.space/testnet/tx/c1f08eda003781550b76b7711db2f678baddedf37a325d2e7fdde706707347a5)

[CET redemption (unlock funds with signed fact)](https://mempool.space/testnet/tx/d816a61c588840463fb8b59eee2cae55c53b5e7d680315aba65d5138225ac710)

[BTC DLC](https://adiabat.github.io/dlc.pdf) (MAD-version) Workflow: 

<img src="https://github.com/user-attachments/assets/247c97e7-a945-4b37-9783-48fd85ccc847" alt="drawing" width="400"/>

Security note on DLC atomicity during interactive signing. Do not sign opening (funding) DLC transaction until all CET transactions are co-signed.

Security note on interactive sign: if no precommitments implemented, rogue keys are welcome. 

## Architecture

Client:
![client-api](https://github.com/user-attachments/assets/bc7daa77-21cf-4a5c-9c88-ae2191ee95dd)

[link](https://drive.google.com/file/d/1vABqqvhWD02wjaIzPP_rvGsvGJ-zSSy6/view?usp=sharing)


## Persistence
`src/client-api/client-storage` provides simple implementation of a database holding collected broadcasts.
It is only indexed by key. Custom storage implementation can be specified in `app.ts` script for `startOracleService`, `startTraderService`

Note: delete oldest entries in `../../db/reports`, `../../db/capabilities`, `../../db/offers`, `../../db/oracles` in order to manage storage.

## Utils
`src/client-api/utils/` folder contains examples of oracle endpoint and auto-signing services (configs are in `src/client-api/utils/cfg`):

```
npm run mock-oracle cfg/endpoint-test.json
npm run auto-sign cfg/signer-test.json
npm run btc-signer cfg/btc-signer-test.json
```

# Contracts API (Web)

**WIP: Web-API is Work in Progress; Nodejs is available**

## Add bundle

```html
<script src="./bundle.js" type="module"></script>
```

## Implement your blockchain:
```ts
export interface ContractInterpreter {
    getUtXo: (terms: OfferMsg, c: Commitment) => Promise<Inputs>
    genContractTx: (inputs: Inputs, c: Commitment, offer: OfferMsg) => Promise<[Contract, OfferMsg?]>
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

There is a default intepreter for BTC-DLC:

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

## Use Matching API to submit offer:

```ts
const myOffer = await window.matching.generateOffer(preferences)
await window.matching.broadcastOffer(myOffer)
```

If counterparty has interpreter - stalking API will automatically negotiate and co-sign transactions through Mega P2P.


# Contracts Node.js Typescript API (BTC)
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

interface CompositeDlcParams {
    subcontracts: { [id: Msg]: CompositeDlcParams }
    oraclePub: PubKey,
    oraclePub2: PubKey,
    oraclePub3: PubKey,  
    outcomes: { [id: Msg]: FundDistribution; }, 
    rValue: Hex,
    rValue2?: Hex,
    rValue3?: Hex,
    alicePub: PubKey,
    bobPub: PubKey,
    txfee: number,
    session?: PublicSession,
    stateAmount: number
}

export interface CompositeDlcParamsEnvelope {
    openingParams: DlcParams,
    compositeCetParams: CompositeDlcParams
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


This would generate multi-stage composite DLC contract (experimental)
```ts
interface CompositeDlcContract {
    subcontracts: { [id: Msg]: [Hex, CompositeDlcContract] }
}

interface CompositeDlcContractEnvelope {
    openingTx: Hex
    contract: CompositeDlcContract
}

generateCompositeDlcContractEnvelope = (params: CompositeDlcParamsEnvelope): Promise<CompositeDlcContractEnvelope> => ...

```


# Contract Node.js Typescript API (Cardano Helios)
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

BTC DLC Workflow: 

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
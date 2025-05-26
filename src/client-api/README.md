## Client APIs: Trader Console and Oracle Admin

- oracle-control-api is how oracle interacts with mempool
- trader-api is how trader interacts with mempool
- client-storage has reference implementation for client-side storages
- service implements trader console and oracle admin on top of respective client APIs

Note: client APIs should NOT be exposed to public network! The system should run in something like `virsh` (VM) ideally.

## Architecture

![client-api](https://github.com/user-attachments/assets/bc7daa77-21cf-4a5c-9c88-ae2191ee95dd)

[link](https://drive.google.com/file/d/1vABqqvhWD02wjaIzPP_rvGsvGJ-zSSy6/view?usp=sharing)

## How to use

Example configuration:
[cfg/mempool-trader.json](../../cfg/mempool-trader.json)
 would start both oracle administration (http://localhost:9080/) and trader console (http://localhost:7080/).

## How to sign messages as oracle 
After starting oracle administration service
`ws://host:port/signCp` and `ws://host:port/signAd` would give you streams for signing capabilities and oracle ads respectively. You read a message - you write same message but with oracleSignature.

The best approach is to sign messages manually unless they only differ in `seqNo` field.

## Contracts demo

Trader console contains demo of Helios and BTC DLC binary option contracts. Helios version signs through webwallet nonsense (unsecure signing in browser), while BTC version relies on external signing http service (example: `utils/btc-signer.ts`, can be delegated to harware wallet).

The best approach for signing Bitcoin transaction is always manual approval.

Sample of BTC transactions created with trader console:

Opening: https://mempool.space/testnet/tx/4e06cc881ff74f2e14b1fad1ae6c77ab5487441af5dab49ebe07430eb3baa62b

CET opening (bind to specific oracle fact through scriptless script):
https://mempool.space/testnet/tx/c1f08eda003781550b76b7711db2f678baddedf37a325d2e7fdde706707347a5

CET redemption (unlock funds with signed fact): https://mempool.space/testnet/tx/d816a61c588840463fb8b59eee2cae55c53b5e7d680315aba65d5138225ac710 

BTC DLC Workflow: 

<img src="https://github.com/user-attachments/assets/247c97e7-a945-4b37-9783-48fd85ccc847" alt="drawing" width="250"/>

Security note on DLC atomicity during interactive signing. Do not sign opening (funding) DLC transaction until all CET transactions are co-signed.

Security note on interactive sign: if no precommitments implemented, rogue keys are welcome. 

## Persistence
`client-storage` provides simple implementation of a database holding collected broadcasts.
It is only indexed by key. Custom storage implementation can be specified in [`app.ts`](../../app.ts) script for `startOracleService`, `startTraderService`

Delete oldest entries in `../../db/reports`, `../../db/capabilities`, `../../db/offers`, `../../db/reports` in order to manage storage.



## Utils
`utils/` folder contains examples of oracle endpoint and auto-signing services (configs are in `utils/cfg`):

```
npm run mock-oracle cfg/endpoint-test.json
npm run auto-sign cfg/signer-test.json
npm run btc-signer cfg/btc-signer-test.json
```
## Demo
Run together for contract demo purposes:
```
npm run demo
```

- http://localhost:8080/peer-monitor/
- http://localhost:8080/oracle-admin/
- http://localhost:8080/oracle-endpoint/
- http://localhost:8080/trader-console/

## Trader app demo

WIP.

Design: https://dk14.github.io/wolfram-mega/src/client-api/service/html/trader/app.html

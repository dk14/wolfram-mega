## Client APIs: Trader Console and Oracle Admin

- oracle-control-api is how oracle interacts with mempool
- trader-api is how trader interacts with mempool
- client-storage has reference implementation for client-side storages
- service implements trader console and oracle admin on top of respective client APIs

## How to use

Example configuration:
[cfg/mempool-trader.json](../../cfg/mempool-trader.json)
 would start both oracle administration (http://localhost:9080/) and trader console (http://localhost:7080/).

## How to sign messages as oracle 
After starting oracle administration service
`ws://host:port/signCp` and `ws://host:port/signAd` would give you streams for signing capabilities and oracle ads respectively. You read a message - you write same message but with oracleSignature.

The best approach is to sign messages manually unless they only differ in `seqNo` field.

## Contracts demo

Trader console contains demo of Helios and BTC DLC (WIP) contracts. Helios requires Webwallet (unsecure signing in browser), while BTC uses external signing http service (example: `utils/bts-signer.ts`).

 The best approach for signing Bitcoin transaction is always manual approval.

## Utils
`utils/` folder contains examples of oracle endpoint and auto-signing services (configs are in `utils/cfg`):

```
npm run mock-oracle cfg/endpoint-test.json
npm run auto-sign cfg/signer-test.json
npm run btc-signer cfg/btc-signer-test.json
```
Run together for contract demo purposes:
```
npm run demo
```
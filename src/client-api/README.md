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

## Utils
`utils\` folder contains examples of oracle endpoint and auto-signing services
# Contract Demo (TestNet)
Run together for contract demo purposes:
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

**P2P Architecture**:
![image](../image.png)



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

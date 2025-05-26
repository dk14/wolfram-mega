A p2p fact sharing network

# Wolfram Mega

Mega *(from מַגָע, contact)* - is a lightweight infinitely scalable decentralized data marketplace, bringing authentic observers to blockchain.

---------

## Run

```
git clone <github-repo>
cd wolfram-mega
npm run peer cfg/mempool-1.json 
npm run peer cfg/mempool-2.json 
npm run peer cfg/mempool-3.json 
```
Monitoring, REST and OpenAPI swagger would become avialable at:

http://localhost:8080/, http://localhost:8081/, http://localhost:8082/

P2P network uses [Bitcoin protocol structure](https://en.bitcoin.it/wiki/Protocol_specification#Message_structure) for communication.

Tests:

```
npm i c8 -g
npm run test
npm run it
```
- protocol implementation coverage should be 100% for `node.ts`


```
npm run peer cfg/mempool-trader.json
```
- Oracle Administration: http://localhost:9080/
- Trader Console: http://localhost:7080/




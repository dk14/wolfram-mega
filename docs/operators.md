
## Test Run

```
git clone <github-repo>
cd wolfram-mega
npm install
npm run peer cfg/mempool-1.json 
npm run peer cfg/mempool-2.json 
npm run peer cfg/mempool-3.json 
```
Monitoring, REST and OpenAPI swagger would become available at:

http://localhost:8080/, http://localhost:8081/, http://localhost:8082/

P2P network uses [Bitcoin protocol structure](https://en.bitcoin.it/wiki/Protocol_specification#Message_structure) for communication.

## Configure

```json
{
    "maxOracles": 100,
    "maxCapabilities": 100,
    "maxReports": 100,
    "maxConnections": 100,
    "maxMsgLength": 1000000,
    "maxOffers": 100,
    "httpPort": 8081,
    "p2pPort": 8334,
    "hostname": "localhost",
    "isTest": true,
    "p2pseed": [
        {"server": "localhost", "port" : 8333}
    ]
}
```

p2p network is discovered from `p2pseed`, see example at [../cfg/mempool-2.json](cfg/mempool-2.json). Specifying `hostname` would make your node discoverable. `httpPort` is port for REST, `p2pPort` is port for P2P gossiping.

Optional `mempool-cfg` config parameters:
- `isTest` enables `testOnly` REST endpoints for convenience. 
- `facilitatorId`: `facilitatorId.rewardAddress` is lightning address for rewards (microbids),  `facilitatorId.facilitatorRewardIdPow` would allow you to establish identity for rewards.
- `lnRestHost`, `lnMacaroonPath` are used to verify proofs of payments for rewards.
- `p2pKeepAlive` how often (milliseconds) your peer would remind network about itself.
- `oracle` and `trader` would spawn oracle administration and trader consoles respectively, see example at [cfg/mempool-trader.json](cfg/mempool-trader.json). `dbPath` param is a path for persistent storage. `wsPort` is websocket for signing messages. [README](src/client-api/README.md)


## Install (optional)
```
npm i https://github.com/dk14/wolfram-mega
npx wf-mega-peer <mempool-conf.json>
```

or

(if you have [GitHub npm repo access](https://github.com/orgs/community/discussions/19037))

```
npm i @dk14/wolfram-mega -g
wf-mega-peer <mempool-conf.json>
```
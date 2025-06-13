A p2p fact sharing network

# Mega Peers

Mega *(from מַגָע, contact)* - is a lightweight infinitely scalable decentralized data marketplace, bringing authentic observers to blockchain.

---------

## Description

Mega relies on Proof-Of-Work in order to assign identities to oracles. It models real-life aquisition of identity: though effort!

Oracle's reputation is managed as a set of verifiable proofs of malleability. Traders do some PoW (spam-protection) in order to report malicious oracle.

Everything is stored in Mega's mempoolss. No blockchain required.

---

## Docs


https://dk14.github.io/wolfram-mega/docs/

---------

## Tests

```
npm i c8 -g
npm run test              # protocol, coverage should be 100%
npm run it                # p2p and non-essential client APIs
npm run webtest           # web-app, non-essential
npm run webtest-it        # webrtc and matching, experimental
npm run webtest-it trace  # trace matching stdout
```

> tests should printout "OK!" or exit process with error

# Protocol

Protocol and specifications are in `src/protocol.ts` and `wolfram-mega-spec.yaml`. Protocol reference implementation is in `src/api.ts`. 

## Use cases
 Non-essential APIs and apps are under `src/client-api/`, `webapp/`, `src-web/`. See [docs](https://dk14.github.io/wolfram-mega/docs/).
> Security. Non-essential APIs need stricter typescript flavor, testnet integration tests and security audits for crypto-mainnet uses. p2p-network needs real-life performance tests for scaling.


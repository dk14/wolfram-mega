A p2p fact sharing network

# Wolfram Mega

Mega *(from מַגָע, contact)* - is a lightweight infinitely scalable decentralized data marketplace, bringing authentic observers to blockchain.

* *Pronunciation: "mega" in Enlish (vowels are not that relevant, מגע), originally pornounced as m[short a as in must or even short e as in meg]g[A stressed].mgA*
* *Note: this is proof of concept*

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
npm run test # coverage should be 100%
npm run it # should finish with OK!
```

Protocol is specifications are in `src/protocol.ts` and `wolfram-mega-spec.yaml`. Protocol reference implementation is in `src/node.ts`. 


## TODOs

- implement slashing

- bind models for webapp
- detect matching stages for webapp
- finish peerjs support
- finish interactive signatures and tx generation for webapp
- provide optional nodejs backend for webapp
- add quorums to webapp
- padding for schnorr rvalues

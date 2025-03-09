A p2p fact sharing network

# Wolfram Mega

Mega *(from מַגָע, contact, pornounced as maga/m'ga)* - is a lightweight infinitely scalable decentralized data marketplace, bringing authentic observers to blockchain.

*Note: this is proof of concept*

---------

## Node

```
git clone
npx tsx app.ts mempool-cfg.json
npx tsx app.ts mempool-cfg2.json
npx tsx app.ts mempool-cfg3.json
```
Monitoring, REST and swagger would become avialable at:

http://localhost:8080/index.htm, http://localhost:8081/index.htm, http://localhost:8082/index.htm

P2P network uses [Bicoin protocol structure](https://en.bitcoin.it/wiki/Protocol_specification#Message_structure) for communication.


--------

## Aims
Unlike mainstream solutions (e.g. chainlink), Mega is not concerned with speculative stakes made by resellers of original data. It is not concerned with illusion of security provided by voting with questionable coins that have no other value than the one assigned by stakers themselves.

### Strong identity.

Oracles in Mega are either not anonymous at all (e.g. Wolfram Alpha) or have reliable pseudonimous identitites supported by proof-of-work. Identity in Mega is treated as NOT "something confirmed by your human peers", but something that rather requires effort (physical work) to ackuire.

### True Data Authenticity

Network keeps **original** data authentication. Mega-operators don't sign data, in fact, they don't even see what data is provided, unless anomaly is reported. Their main concern is to connect trader to an authentic source.

Thus, Mega even allows for dealing with exclusive data - where no alternative data provider practicaly exists, so no reliable quorum-based contracts can be established in principle. Instead of dealing with smokescreen of pseudo-oracles, you get the original authentic data, but with additional assurance from P2P network keeping track of "data crimes".

### Full accountability

Public reporting rather than (micro)slashing

Mega's primary (although not exclusive) way of assurance of quality of data is through reporting oracle faults. It is not exclusively limited to proofs verifiable by machines, it also includes human-interpretable ones. Reputation system is natural and based on such "reports of malleability". 

Traders can simply see what is formally and verifiably reported about oracle, which means oracle has whole "business" identity at stake, not some coins. Actual responsibility, actual consequences are invoked. *While, from user perspective, this approach is most suitable to microbets on future events, it does neither exclude nor neccistates additional (but more expensive) "assurance" provided by monetary collateral under a guard of quorum of oracles - mega is compatible with it, just "how much do you actually know about oracle counterparties, are they really independent, do stakes really stop them from anonymous conspiracy?".*

Since many types of reports are still machine-verifiable, traffic can be diverted automatically from suspicious oracles.

### Direct payments

Mega avoids speculative tokenomics. Rewards for providing data as well as incentives for p2p facilitators are direct. Thus we don't have "automated market makers" (market making is not automatable), Web3 and other stuff that disagrees with common sense. The main disadvantage of coins having no intrinsic value is low security of the network against financial attacks (see ["deadpool attack"](https://forum.cardano.org/t/deathpool-attack-on-any-pos/143677)).

Nothing stops you from paying with "WolframCoin" though if you buy attestations from Wolfram - it is just not necessary for the functioning of the network. Only PoW is.

### Open protocol

Since Mega only needs basic network security, there is no entry bar to join it. We don't have to consult security or pretend that we are independent advisers. In our case, P2P network does not depend on us at all. 

We specify protocol, mostly in declarative terms. We provide reference implementation and [swagger spec](wolfram-mega-spec.yaml). 

We only benefit from the fact that we actually provide most interesting data (to us at least!) so far (cool sports bets, political events bets, even bets on scientific discoveries).



--------

## Means

Mega's P2P network acts as an ad-hoc registry of:

- oracles with pubkey identiffication (KYC) supported by proof-of-work (pseudonimity) and/or by a manifest published on a reputable website (linking to pubkey).
- oracle capabilities (questions they can answer) signed with oracle's pubkey
- proofs of oracle malleabilty, submitted by traders/clients: data conflict with other oracles ("I say 6, you say 9"), data disagreeing with "human consesus", not providing data in exchange for micropayment recieved or any other type of report (e.g. a link to nostr post/thread).

The decentrilized registry is organized simillarly to "bitcoin mempool", except it is aimed at preserving "unordered collection of advertisements and malleability reports", thus does not require its own or any blockchain (consensus over order) to operate. 

Incentives. Since, unlike with btc mempools, rewards are not attached to such registry entries, oracles can reward Mega-operators by paying (microbiding using btc-ln) for "ad-placement", for making oracle's identity available in the network. 

Security. Such registries are subject to spam-attacks since anyone can create oracle, submit any report etc. We use hascash (proof-of-work) to address that, since it was it's original purpose before Bitcoin came in. Basicaly node evicts ads and reports with lowest PoW.

Sharding and availability. Since some data losses are acceptable (traders/oracles/orgs can resubmit their data to the network) and avilability can always increase through pow-difficulty (and oracles bidsmicrobidding with BTC-LN), nodes are at the liberty of evicting data randomly (hash mod n) - this effectively increases data capacity. Alice's node can have half of malleability proofs, while Bob's node can the other half. Both halves would be available to a trader. Network can also withstand split-brains and general segmentations, thanks to eventual consistency.

------

Extra-Services.

Protocol can be extended to support P2P matching (advertise "option" offers), thus can act as P2P exchange for fully-collaterized derivatives. 

Nodes potentially can cache signed data-points (mostly "slow facts") from oracles. They can also potentially pool, proxify and anonymize user data requests to protect users from oracles collecting private data.

Protocol can be extended to recognize and negotiate various types of "data contracts" between clients and oracles. E.g. user can order oracle to provide data on a local event, so he and his friend could bet on it. If oracle "scams" user - proof will be published, so oracle would have to abandon its PoW or website verified identity. And, more conventionally, it allows users to find (match) oracles with simillar capabilities to allow quorums and even "meaningful slashing" (security deposit from strongly identified oracle) on UtXO networks.

The approach is not limited to contracts which require oracles: finding a counterparty for a cryptogrphic betting can be facilitated too. Alice picks a number (sends encrypted number to blockchain) and asks Bob if Bob can guess it. If Bob guesses right - it gets Alice's deposit, otherwise looses its own. Rewind...they have to find one another on some sort of tinder first. This could be standardized in our protocol.

--------


## Architecture

![image](image.png)

--------

TODOs:
- finish coverage tests (cryptography, data corruption)
- REST service and p2p network tests
- code improvements

"client APIs" milestone:
- oracle client REST API (can be on the same node, clients have to sign messages externally though)
- trader client REST API (can be on the same node, clients have to sign messages externally though)
- caching API
- maybe simple offer API (p2p derivatives exchange) to make contracts demo more interesting

"contracts demo" milestone
- integration with Bitcoin contracts (testnet)
- integration with Cardano Plutus contracts (testnet)
- note: generate contracts in client API

"documentation, viability and security assessment" milestone
- develop more test cases, attack vectors
- deploy large scale p2p network, run serious performance tests
- ?consult third-party vendors
- "financial attacks"
- write a white paper
- consider alternatives to node.js (e.g. rust), pros and cons

"onboarding" milestone
- add support for other UtXO chains in client API (testnet)


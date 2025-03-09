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

Oracles in Mega are either not anonymous at all (e.g. Wolfram Alpha) or have reliable anonymous identitites supported by proof-of-work. Identity in Mega is treated as not "something authentified by your human peers", but something that rather requires effort to ackuire.

### Full accountability

Public reporting rather than (micro)slashing

Mega's primary (although not exclusive) way of assurance of quality of data is through reporting oracle faults. It is not limited to proofs verifiable by machines but also human-interpretable ones. Reputation system is natural and based on such "reports of malleability". 

Traders can simply see what is formally and verifiably reported about oracle, which means oracle has whole "business" identity at stake, not some coins. Actual responsibility, actual consequences are invoked. *While, from user perspective, this approach is most suitable to microbets on future events, it does neither exclude nor neccistates additional (but more expensive) "assurance" provided by monetary collateral under a guard of quorum of oracles - mega is compatible with it, just "how much do you actually know about oracle counterparties, are they really independent, do stakes really stop them from anonymous conspiracy?".*

Since many types of reports are still machine-verifiable, traffic can be diverted automatically from suspicious oracles.

### Direct payments

Mega avoids speculative tokenomics. Rewards for providing data as well as incentives for p2p facilitators are direct. Thus we don't have "automated market makers" (market making is not automatable), Web3 and other stuff that disagrees with common sense. The main disadvantage of coins having no intrinsic value is low security of the network against financial attacks (see ["deadpool attack"](https://forum.cardano.org/t/deathpool-attack-on-any-pos/143677)).

Nothing stops you from paying with "WolframCoin" though - it is just not necessary for the functioning of the network. Only PoW is.

### Open protocol

Since Mega only needs basic network security, there is no entry bar to join it. We don't have to consult security or pretend that we are independent advisers. In our case, P2P network does not depend on us at all. 

We specify protocol, mostly in declarative terms. We provide reference implementation and [swagger spec](wolfram-mega-spec.yaml). 

We only benefit from the fact that we actually provide most interesting data (to us at least!) so far (cool sports bets, political events bets, even bets on scientific discoveries).

### True Data Authenticity

Mega allows for dealing with exclusive data - where no alternative data provider practicaly exists, so no reliable quorum-based contracts can be established in principle. Instead of creating smokescreen of pseudo-oracles, you get the original authentic data, but with additional assurance from P2P network keeping track of "data crimes".

--------

## Means

Mega's P2P network acts as an ad-hoc registry of:

- oracles with pubkey identiffication (KYC) supported by proof-of-work (pseudonimity) or by a manifest published on a reputable website (linking to pubkey).
- oracle capabilities (questions they can answer) signed with oracle's pubkey
- proofs of oracle malleabilty, submitted by traders/clients: data conflict with other oracles ("I say 6, you say 9"), data disagreeing with "human consesus", not providing data in exchange for micropayment recieved or any other type of report.

The decentrilized registry is organized simillarly to "bitcoin mempool", except it is aimed at preserving "unordered collection of advertisements and malleability reports", thus does not require blockchain to operate. 

Incentives. Since, unlike with btc mempools, rewards are not attached to such registry entries, oracles can reward Mega-operators by paying (microbiding) for "ad-placement", making oracle's identity available in the network. 

Security. Such registries are subject to spam-attacks since anyone can create oracle, submit any report etc. We use hascash (proof-of-work) to address that, since it was it's original purpose before Bitcoin came in. Basicaly node evicts ads and reports with lowest PoW.

Sharding and availability. Since some data losses are acceptable (traders/oracles/orgs can resubmit their data to the network) and avilability is managed through pow-difficulty (and bids with BTC-LN), nodes are at the liberty of evicting data randomly (hash mod n) - this effectively increases data capacity. Alice can have half of malleability proofs, while Bob can the other half.

--------


## Architecture

![image](image.png)

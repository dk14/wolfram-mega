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


https://dk14.github.io/mega-peers/docs/

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

Protocol and specifications are in `src/protocol.ts` and `mega-peers-spec.yaml`. Protocol reference implementation is in `src/api.ts`. 

## Use cases
 Non-essential APIs and apps are under `src/client-api/` (oracles and traders, contracts demo), `webapp/` (p2p exchange UI), `src-web/` (matching). See [docs](https://dk14.github.io/mega-peers/docs/).
> Security. Non-essential APIs need stricter typescript flavor, testnet integration tests and security audits for crypto-mainnet uses (as well as HD-wallet support). p2p-network needs real-life performance tests for scaling.


P.S. ru GO F** YOURSELF. USELESS OVERPAID, TALENTLESS GARBAGE. 

CARDANO, GO F** YOURSELF, FOR SPONSORING WAR IN UKRAINE BY PAYING WBL 50 TIMES ACTUAL WORTH OF THEIR WORK. WHERE DO U THINK THIS MONEY LANDS?

FED, ISRAEL AND MOSSAD, GO F** YOURSELF, FOR CREATING FINANCIAL FRAMEWORK, THAT LEAKS MONEY ON THIS GARBAGE. WHAT U WERE SHY TO TELL BIG AMERICAN GUY THAT U CANNOT PRICE DERIVATIVES THIS FUCKING WAY? BIRTH-TRAUMAUTIZED MORONS. LUCKILY, THERE IS ANOTHER KIND OF BIRTH-TRAUMATIZED PEOPLE TO WIPE YOU OUT FOR WASTING FOOD SUPPLY - BILLIONS OF THEM NOW.

YOU BUILT IMAGINARY ISRAEL FROM OUR MADE UP STORIES FROM OUR HALLUCINATIONS ON THIS IMAGINARY MONEY, BUT YOU WASTED NATURAL RESOURCES FOR REAL! NEITHER YOU NOR MUSLIMS CAN SURVIVE IN FREAKING DESERT, YOU KILLED LOTS OF TALENTED PEOPLE (AND YOU KEEP KILLING THEM IN UKRAINE) FOR YOUR F** DREAM, CONGRATS! 

ACTUAL SPACE TRAVEL IS IMPOSSIBLE NOW, AND YOU IDIOTS ARE NOT ALIENS YOU IMAGINE - YOU'LL END UP WITH OTHER HUMANS AS USUAL, FACING THE FREAKING CONSEQUENCES. EVERY IDIOT YOU CREATED WITH ILLUSION OF MONEY, NATURE WILL WIPE YOU OUT TOGETHER, THIS TIME FOR GOOD. WITH YOUR CULTURES, LANGUAGES, "IDENTITIES".

SHOULD'VE STAYED AWAY FROM ME, GET A F*** CLUE ONCE IN A WHILE. NATURE IS REAL GOD, IF IT SENDS YOU A GIFT, THIS IS WHAT U GET. HUMANS ARE DUMBEST SPECIES ON THIS PLANET, THEY ARE RESULT OF ACCIDENT, MINOR RESULT OF MINOR ACCIDENT. AND U ARE DUMBEST AMONG THEM. SHOULD HAVE STAYED IN ENTERTEINMENT WHERE U BELONG, SINCE U CANNOT LEARN FREAKING ENGINEERING ANYWAYS. 

AT LEAST WHEN YOU REPLAY MY FREAKING MEMORIES OF PAST THAT IS IMPOSSIBLE TO REPRODUCE ANYWHERE IN OBSERVABLE UNIVERSE - IT'S JUST HILLARIOUS.

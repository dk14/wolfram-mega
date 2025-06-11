
> Experimental

Discreet eDSL is a fiancial contract language compatible with Mega offers, matching, and bitcoin testnet:

```
Discreet Typescript Code 
-> OfferModel 
-> OfferTerms 
-> Matching 
-> Tracking 
-> Blockchain Interpreter (Bitcoin or custom chain)
-> Chain Transactions
```

> "Discreet" misspelled on purpose

Discreet outputs `OfferModel`, which matching engine turns into `OfferTerms`. 

The language is super-easy and embedded into TypeScript.

Discreet is based on modern quantitative finance and renders to a tree of binary options, thus allowing expression of **arbitrary financial contracts**.

Discreet is typesafe. It provides checks and restrictions allowing traders to eliminate known types of redundancies in contracts ("perfect hedges"), thus maximising trading liquidity - you only collaterize what's necceessary.


## Example
```ts
import { Dsl } from '@dk14/wolfram-mega/discreet'

const maxBudgetAlice = 300
const maxBudgetBob = 300
const b = 30
const model = await (new Dsl(async dsl => {
    const a = 30 + b
    if (dsl.outcome("really?", ["YES"], ["NO"])) {
        dsl.pay(Dsl.Bob, a + 100) 
        if (dsl.outcome("is it?", ["YES"], ["NO", "3..40"])) {
            dsl.pay(Dsl.Alice, 40) // if YES
        } else {
            dsl.pay(Dsl.Bob, 50) // if NO or 5
        } 
    } else {
        dsl.pay(Dsl.Alice, 20)
    }
})).enumerateWithBound(maxBudgetAlice, maxBudgetBob)
console.log(model)

```
Output:

```ts
{
  "id": "",
  "bet": [ 160, 20 ],
  "betOn": false,
  "oracles": [{"capabilityPub": "really?"}],
  "status": "matching",
  "blockchain": "",
  "role": "initiator",
  "ifPartyWins": {
    "id": "",
    "bet": [50, 40],
    "betOn": true,
    "oracles": [{ "capabilityPub": "is it?" }],
    "status": "matching",
    "blockchain": "",
    "role": "initiator"
  }
}
```

Discreet's streamed transpiler's output (`OfferModel`) allows for final evaluations of collaterals. 

> Matching has `evaluatePartyCollateral`, `evaluateCounterPartyCollateral` functions for introspection. Broadcasting `OfferModel` would automatically evaluate those.

> **Evaluations, NOT estimations!**. Discreet relies on **nondeterministic praxeological tautology** - everything is known, nothing left to meaningless statistical speculation. You don't know the outcome - that's where the risk comes from, NOT from DSL. You supposed to predict outcome yourself, not hope for it based on "statistical" positive re-inforcement (e.g. confidence intervals). Otherwise it's gambling with statistical buzzwords.

> **Computational finance. If computer cannot enumerate portfolio - surely human won't be able to do it either**. Pricing must be done over definite outcomes. Even blurry pricing (dream-pricing) is definite pricing done on GPU (with parallelization), it is still strongly-typed. Forecasters like Random-walk, ARIMA etc hide types from you, causing confusion over what is actually priced. They also don't account for present - they infer "types" (what outcome can be) from a sample of badly collected historical data, never asking trader what the trader (human) actually knows about **present** environment. Feeding the past into the future until future becomes the past and so on, it's a perpetual motion attempt.

## Guarantees
- money preservation: all outputs of transaction equal sum of all inputs
    - judgemental gurantee by design - Mega `OfferTerms` does not require money inputs to be specified - they are calculated automatically.
    - `OfferTerms` has `partyCompositeCollateralAmount`, `counterpartyCompositeCollateralAmount` fields that allow to auto-refund if collateral remained in a leaf. Fully tractable spending.
- finite and predictable execution time. 
    - > Longest chain of `dsl.outcome` is the worst-case amount of transactions necessary


## Language

There are only two constructs:
- checking observations - inputs from oracles (`dsl.outcome` returns boolean)
- paying (`dsl.pay`)

Maintaing and progressing state is done in javascript with arbitrary computation available. You can calculate amount of paid output based on observation and any data known prior to offer submission. Any formula, any logic.

### Erasures

DSL transpiler will erase javascript code, collapsing it into `observe -> pay -> ... -> observe -> pay` chains. If rendered to Bitcoin DLC - it makes contract logic 100% private - only paid amounts are visible on-chain, not why they paid.

> For other chains - worst-case scenario will expose oracle messages/signatures and corresponding paid amounts. The calculation logic is erased nevertheless.

No smart-contract/VM is required to run the resulting contract. Target chain only has to be able to understand scriptless scripts (support Schnorr), which most modern chains do. 

### Limitations

Capturing variables is unsafe outside of dsl-context

Instead of this:
```ts
var a = 30
const model = await (new Dsl(async dsl => {
    if (dsl.outcome("really?", ["YES"], ["NO"])) {
        a++
        dsl.pay(Dsl.Bob, a + 100) 
    } else {
        dsl.pay(Dsl.Alice, 20)
    }
})).enumerateWithBound(maxBudget1, maxBudget2)
```

Use this:
```ts
const model = await (new Dsl(async dsl => {
    var a = 30
    if (dsl.outcome("really?", ["YES"], ["NO"])) {
        a++
        dsl.pay(Dsl.Bob, a + 100) 
    } else {
        dsl.pay(Dsl.Alice, 20)
    }
})).enumerateWithBound(maxBudget1, maxBudget2)
```
----

Consequently, services queryed in dsl-context must be idempotent (e.g. stateless GET, not PUT). 

Instead of that:
```ts
const model = await (new Dsl(async dsl => {
    var a = 30 
    const b = await database.get("b")
    if (dsl.outcome("really?", ["YES"], ["NO"])) {
        a++
        dsl.pay(Dsl.Bob, a + 100 + b) 
    } else {
        dsl.pay(Dsl.Alice, 20)
    }
    await database.push("a", a) // cannot!
})).enumerateWithBound(maxBudget1, maxBudget2)
```

Use that:

```ts
const a_nondeterministic = []
const model = await (new Dsl(async dsl => {
    var a = 30
    const b = await database.get("b")
    if (dsl.outcome("really?", ["YES"], ["NO"])) {
        a++
        dsl.pay(Dsl.Bob, a + 100 + b) 
    } else {
        dsl.pay(Dsl.Alice, 20)
    }
    a_nondeterministic.push(a)
})).enumerateWithBound(maxBudget1, maxBudget2)

await database.push("a", a_nondeterministic) //[30, 31]
```

> Discreet enumerates all possible meaningful outcomes by design - so types in contracts have to be chosen carefully - they have to be human-interpretable, meaningful. Even if it's DOJ-index - you have to pick the ranges of values with meaning. 

> Ranges are allowed - 0..100 is a single outcome. Numerics on observed data (multiplications, sum) however would still require larger (but not full) enumeration. E.g. you can even "0..5", "5..10" on interest rate and then multiply, sum, recurse on it.

> It is a small overhead even for complex scheduled contracts as it runs out. You can safely enumerate a hundred of states of a single ticker for precision. Even a schedule, with reasonable amount of events - does not blow that much exponentially. Exponents tend to lift off slowly like an airplane.

> We really discourage large contracts on Discreet, but they are quite possible nevertheless.

### Outcomes

All outcomes specified in either yes or no of `dsl.outcome(pubkey, yesoutcomes, nooutcomes`) must have distinct semantics. Otherwise typesafety of "not querying the same outcome twice" would be broken. 

Querying mutually exclusive outcomes, e.g. `{yes = ["a"], no = ["b"]} && {yes = ["b"], no = ["a"]}` disallowed, since it can output unreachable subcontracts potentially: use typescript `!` instead, so typescript could lint unreachable code.

### State

Discrete is at least as powerful as Cardano Marlowe. It allows stateful contracts.

Consequently, schedules, every collaterizable ACTUS instrument can be implemented.

### Recursion

Discreet allows for recursion. `outcome` and `pay` can be in recursive calls as well, but subject to standard Discreet typesafety restrictions: no "perfect hedges".

Every contract has a limit on maximum collateral (`enumerateWithBound(maxBudgetParty, maxBudgetCounterParty)`), thus payout recursion is bounded. Halting problem is semi-solved.

### Multi-party

```ts
import { Dsl } from '@dk14/wolfram-mega/discreet'

const multi = await (new Dsl (async dsl => {
    if (dsl.outcome("really?", ["YES"], ["NO"])) {
        dsl.party("alice").pays("bob").amount(100)
        dsl.party("bob").pays("carol").amount(20)
    } else {
        dsl.party("carol").pays("alice").amount(40)
        dsl.party("bob").pays("alice").amount(40)
    }
})).multiple("alice", "bob", "carol").enumerateWithBoundMulti(([[1000, 2000], [1000, 2000], [1000, 2000]]))
```

#### Ad-hoc parties

Adding a new party "on the go" is equivalent to early-termination of a contract. As far as blockchain security concerned - terms have to be re-negotiated from scratch. There is no need to put participant management logic on-chain.

Meantime, off-chain code can benefit from the use of factories:

```ts
import { Dsl } from '@dk14/wolfram-mega/discreet'

//assume contributors collateral in btc, beneficiary collateral is in assets
const fundFactory = (accumulatedFund: number, refillFund: number, refillBeneficiaryCollateral: number, contributors: string[], beneficiaries: string[], lock: string) => {
    // beneficiaries and contributors are required to be unique in Discreet. 
    // Effectively might not be so, unless you match through Mega-P2P-offers with high PoW-threshold on the offer message itself.
    return await (new Dsl (async dsl => {
        if (dsl.outcome("payout allowed?", ["YES"], ["NO"])) { //beneficiary completed project
            contributors.forEach((contributor, i) => {
                dsl.party(contributor).pays(beneficiaries[i]).amount(refillFund / contributors.length)
            })
        } else if (dsl.outcome("refund?", ["YES"], ["NO"])) { //beneficiary failed/rejected project
            contributors.forEach((contributor, i) => {
                dsl.party(beneficiaries[i]).pays(contributor).amount(refillBeneficiaryCollateral / beneficiaries.length)
            })
        } else {
            //suspend fund; send to `accumulatedFund` multisig for consensus
            contributors.forEach((contributor, i) => {
                dsl.party(contributor).pays(lock).amount(refillFund / contributors.length)
                dsl.party(beneficiaries[i]).pays(lock).amount(refillBeneficiaryCollateral / beneficiaries.length)
            })
        }
    })).multiple(contributors.append(beneficiaries))
    .enumerateWithBoundMulti(Array(100).fill(Array(2).fill(accumulatedFund + refillFund + refillContributorCollateral))) 
    
    // ^ that is how central banking collaterizes everything, easy to overcollaterize a deal when "collaterals" are double-counted already. Under-over-collaterization.
}
```
> Note: This is made up soso example for legacy funds (e.g. hedge funds), to learn from their mistakes. Mega encourages safe tractable funding, where the only risk is the outcome itself (project completed or not), rather than uninterpretable alienated complexity of The Fund. Thus connections have to be tractable, either: one beneficiary, possibly several contributors. Or: one contributor, possibly several beneficiaries. 

> Not many to many. Many-to-many (p2p) forms naturally in the market, **individual deals are naturally !!ONE-to-possibly-many!!**. Contracts are written by individuals, not the "market itself", e.g. internet does not tell you what to do, you connect to internet and decide. Take active role, reach out to environment, lol!

> Queries: from Oracle-perspective, it is strongly recommended to not tie the query to the "contract" semantically, e.g. it should not be "payout allowed?", it should be "street is cleaner" or dirtier whatever preference. 

> Exercise: enjoy rewriting this fund into 1-to-1 deal between you and the actual contributor, rather than an abstract beneficiary.


### Cross-currency (assets)

DSL should not be responsible for asset pairs, since asset pair is assumed to be fixed between parties per (composite) contract - you specify asset pair in matching etc. Allowing one party to have several assets in a contract is equivalent to having several parties, e.g. "alice-usd", "alice-btc".

> Note: since Discreet relies on binary options - there is no confusion about currency. In "alice-usd", "bob-btc" pair - Alice always gets btc, Bob always gets usd.

```ts
account.party("alice_usd").pays("bob_btc").amount(1000000000) //1000000000 usd
account.party("bob_btc").pays("alice_usd").amount(10) //10 btc
```

There is, however syntax sugar to ensure proper currency is used in multi-party contracts:

```ts
const assets = await (new Dsl (async dsl => {
    if (dsl.outcome("ready? go?", ["YES"], ["NO"])) {
        dsl.party("alice", "usd").pays("bob", "btc").amount(10000000, "usd")
    } else {
        dsl.party("bob", "btc").pays("alice", "usd").amount(10, "btc")
    }
})).multiple(Dsl.account("alice", "usd"), Dsl.account("bob", "btc")).enumerateWithBoundMulti([[500000000, 50000000]])
```
> **^This is NOT atomic swap**. Atomic swaps are transactions - not contracts, they execute unconditionally.

#### Atomic Swap

This one IS:

```ts
const swap = await (new Dsl (async dsl => {
    const allowSwaps = true
    dsl.if("TRUTH", ["true"], ["true"], {}, allowSwaps).then(pay => {
        pay.party("alice", "usd").pays("bob", "btc").amount(10000000, "usd")
    }).else(pay => {
        pay.party("bob", "btc").pays("alice", "usd").amount(10, "btc")
    })
})).multiple(Dsl.account("alice", "usd"), Dsl.account("bob", "btc")).enumerateWithBoundMulti([[500000000, 50000000]])
```

Shortcut:

```ts
 dsl.ifAtomicSwapLeg1("lock1", "allowed").then(pay => {
    pay.party("alice", "usd").pays("bob", "btc").amount(10000000, "usd")
}).else(pay => {
    pay.party("bob", "btc").pays("alice", "usd").amount(10, "btc")
})
```

> DSL allows obvious contradiction as a hack in cross-currency, if you specify `allowSwaps`. Otherwise contradictions are checked. Discreet also verifies wether it is actually cross-currency. Swaps usd for usd won't work even if `allowSwaps` is enabled.

> Interpreter must understand your swap-lock conditions: it could be oracle allowing swap ("PTLC-lock" in BTC), or as in case with crypto-loans, it could be hash-lock conditon for signing atomicity, or just "true" if `OfferTerms` interpreter can optimize it (see Contracts doc).

> Party role reversal (negative amounts) won't work for cross-currency. There is a semantical check: "minus 5 dollar does not imply plus 5 btc".

#### Payment At Maturity (crypto-loan)

```ts
// Borrowing contract
dsl.ifAtomicSwapLeg1("hashlock", "verified").then(pay => {
    pay.party("alice", "usd").pays("bob", "btc").amount(10000000, "usd")
}).else(pay => {
    dsl.if("liquidation?", ["yes"], ["no"]).then(pay => { //price oracle
        pay.party("bob", "btc").pays("alice", "usd").amount(10, "btc")
    }).else(_ => {
        dsl.if("timelock", ["yes"], ["no"]).then(pay => { //don't even think about hashlocks on bob_usd here :) the point of loan is liquidity
            pay.party("bob", "usd").pays("alice", "usd").amount(300, "usd") //this is collateral for interest
            dsl.if("<alice_repayment_wallet_adaptor_pubkey_schnorr>", ["true"], ["false"], {}).then(pay => {
                // ^ alice revealed private key for empty repayment wallet
                // "proof of empty pockets"
                dsl.if("timelock2", ["yes"], ["no"]).then(_ => {
                    //timelock2 expired - we assume Alice got money
                }).else(pay => {
                    pay.party("bob", "btc").pays("alice", "usd").amount(10, "btc")
                })
            }).else(pay => {
                // alice did not reveal pk for repayment wallet, since Bob sent money there
            })
})
```


> Alice cryptomagically reveals private key for repayment wallet in order to sign deposit redemption CET (she cannot sign it without doing so). Since bob did not pay to that wallet, the key is worthless but Alice gets Bob's deposit using this "empty pockets proof". This approach is a payment oracle without third-party.

> Nuance: Alice can only withdraw funds from repayment wallet after grace period `deadline2`. Bob has to send money locked with `deadline2` timelock, so Alice would not empty the wallet herself. `ANYPREVOUT` BIP in BTC would address this inconvinience.
                

This loan is also "physically-settled" vanilla option - Bob buys an option to swap his deposit for usd.

#### Vanilla Future Contract
Vanilla futures are impossible on blockchain. Such contracts are not automatable, since either of the party might not have funds in the future, thus no way to collaterize in advance.

> Defi "solves" it with tokens, but tokens are not backed up by anything. You cannot tokenize a car or a human. Alice cannot go and tatoo a **unique** pubkey on a car or her body. Carol will take up on a trend and everyone will have same tatoo like idiots.

```ts
const mafiaIncentive = {value: 100, asset: "satochi"}
const mafiaDeposit = {value: 300, asset: "satochi"}

if (dsl.outcome("bob and alice create an atomic swap on date $date", ["yes"], ["no"], {date: "next month"}) {
    dsl.party("alice", mafiaIncentive.asset)
        .pays("mafia", mafiaIncentive.asset)
        .amount(mafiaIncentive.value, mafiaIncentive.asset)

    dsl.party("bob", mafiaIncentive.asset)
        .pays("mafia", mafiaIncentive.asset)
        .amount(mafiaIncentive.value, mafiaIncentive.asset)
} else {
    //this assures Bob and Alice that mafia is committed to its job
    dsl.party("mafia", mafiaDeposit.asset)
        .pays("alice", mafiaDeposit.asset)
        .amount(mafiaDeposit.value / 2, mafiaDeposit.asset) 
        //or to void, so there would be no conspiracy

    dsl.party("mafia", mafiaDeposit.asset)
        .pays("bob", mafiaDeposit.asset)
        .amount(mafiaDeposit.value / 2, mafiaDeposit.asset)
}
```

> This contract can also be repurposed as a security deposit for vanilla IRL loan. Just add extra "lending" payout from Bob to Alice (or mafia to Alice). Then future one-sided "swap" would be paying it back (in exchange for payout of mafia's incentive). Many IRL financial instruments are possible with this approach, as long as mafia has PoW-issued id to avoid conspiracy with either party or lazyness (can be special Mega-oracle, as Mega-oracle mafia has only one possible outcome to attest to).

> Note: Third-party oracle can be avoided with Schnorr adaptor signatures. One of the parties (or both) can reveal "proof of empty pockets" for pre-agreed wallets, so mafia would lose incentive automatically if pockets are empty.

### Mutually Assured Destruction (MAD)

Alice and Bob - can be each other's mafia themselves. MAD-contract can simply reward them back their "secure future" deposits as a reward for fulfilling commitment to a mutual agreement.

```ts
if (dsl.outcome("siglock_alice && siglock_bob && timelock $date", ["yes"], ["no"], {date: "next month"}) {
    dsl.party("alice", asset1)
        .pays("alice_future", asset1)
        .amount(deposit, asset1)

    dsl.party("bob", asset2)
        .pays("bob_future", asset2)
        .amount(deposit, asset2)
} else { //send to void; needed in case auto-refunds enabled
    dsl.party("alice", asset1)
        .pays("ע", asset1)
        .amount(deposit, asset1)

    dsl.party("bob", asset2)
        .pays("ע", asset2)
        .amount(deposit, asset2)
}
```

### Numeric observations

Outcomes are binary in Discreet, so interest rate drivers and such have to be enumerated and adapted. We recommend to quantize derivatives manually - to give meaning to numbers (see sets). 

If numbers are still preferred:

```ts
const lowerBound = 0
const upperBound = 5
dsl.numeric.outcome("price?", lowerBound, upperBound).evaluate(n => {
    dsl.pay(Dsl.Alice, n + 1)
})
```

Multi-party:

```ts
const step = 1
dsl.numeric.outcome("price?", 0, 5, step).evaluateWithPaymentCtx((account, price) => {
    account.party("alice").pays("carol").amount(price - 2)
})
```

#### Quantized Vanilla Interest Rate Swap

```ts
const dates = ["today", "tomorrow", "next week", "next month"]
const capitalisationDates = new Set(["next week"])
const notional = 10000
const floatingLegIndex = "interest rate index?"
const fixedRate = 3
const quantisationStep = 1

dates.reduce(([capitalisation1, capitalisation2], date) => {
    const [floatingRate, accounts] = dsl.numeric
        .outcome(floatingLegIndex, 0, 5, quantisationStep, {date})
        .valueWithPaymentCtxUnsafe() //"unsafe" requires manual release in order to payout

    if (capitalisationDates.has(date)) {
        const floatingPayout = (notional + capitalisation1) * (floatingRate / 100) 
        const fixedPayout = (notional + capitalisation2) * (fixedRate / 100)
        accounts.party("alice").pays("bob").amount(floatingPayout)
        accounts.party("bob").pays("alice").amount(fixedPayout)
        accounts.release()
        return [0, 0]
    } else {
        accounts.release()  // resources are checked; reference counter would throw an error without this
        return [
            notional * (floatingRate / 100) + capitalisation1, 
            notional * (fixedRate / 100) + capitalisation2
        ]
    }
}, [0,0])

```
> Tech warning: wrapping `release` with monads (`Cont` including) is not practically applicable here. You'll get a combination of `Either` and `Writer`/`State` - they're not composable, they would just produce type-perturbation. KISS. 

> `valueWithPaymentCtxUnsafe` is meant to (optionally) avoid contextual continuations. Pure functional way would be to just use `.evaluateWithPaymentCtx((value, context) => {...})` continuation  twice (one in `then`, the other in `else`). But since, resources are checked automatically, above representation is simply more compact, efficient and still reasonably safe - mispositioning `release` would delay payout simply (and only possible with `dsl.unsafe.numeric` which we don't use here).

> Note: only `pay`s must be integers (they get rounded to nearest if you don't round them properly), since sats are integers. All internal computations can be done with any type of number: "real", rational, "complex", matricies, quaternions, dedekind nonsense cuts, functors, group generators, monoids/semigroups, combinatorial groups, topoi etc.

### Set observations

```ts
dsl.set.outcome("which?", ["lol", "okay", "yaay"]).evaluate(point => {
    if (point === "lol") {
        dsl.pay(Dsl.Alice, 30)
    } 
})

dsl.set.outcomeT<string>("which?", ["lol", "okay", "yaaylol"], x => x, x => x).evaluate(point => {
    if (point === "lol") {
        dsl.pay(Dsl.Alice, 30)
    } 
})
```

#### Quantized auction

Auction would need a predefined set of bids and maximum amount of attempts.
**It is trustless: participants themselves can be oracles.**

If participants put collateral for their bids in advance, one round:
```ts
const bids = [100, 300, 500, 1000]
const participants = ["alice", "bob", "carol"]

const oracles = {
    alice: "pub",
    bob: "pub",
    carol: "pub"
}
const round = {}
for (let party of participants) {
    const bid = dsl.set.outcomeT<number>(oracles[party], bids, x => x.toString(), x => parseInt(x)).value()
    round[party] = bid
}

const [winner, bid] = Object.entries(round).maxBy([party, bid] => bid)

dsl.ifAtomicSwapLeg1().then(pay => {
   pay.party(winner).pays("auction", "asset").amount(bid)
}).else(pay => {
   pay.party("auction", "asset").pays(winner).amount(1, "asset")
})

//collateral is 1000 per participant
```
> Multiple rounds - can be generalized by creating synthetic oracles for participants, e.g. "alice-round-1" etc. If alice made bet through "alice-round-1" already - she can make it for round 2 through her round-2 oracle. 

This can be improved closer to IRL by:
- allowing participants to commit collaterals only at the time of the bid
- adding oracle and mafia instead of digital assets, to make sure actual goods delivered

```ts
const receivePaymentPubKey = "<pub>"
const receivePaymentPubKeyAdapted = schnorrAdapt("<pub>", txbody) //signing with this reveals receivePaymentPubKey's private key
const round = ... //same logic

const [winner, [bid, pay]] = Object.entries(round).maxBy([party, [bid, pay]] => bid)

//physical delivery vanilla future contract:

dsl.outcome("timelock1") ?? return
dsl.if(receivePaymentPubKeyAdapted, ["true"], ["false"], {}).then(accounts => {
    //auction did not get payment from winner
    dsl.outcome("timelock2") ?? return
    accounts.party("mafia").pays("auction").amount(insurance) //or to void, so there would be no conspiracy
    //alternatively: close or pick next winner

}).else(accounts => {
    accounts.party("auction").pays("mafia").amount(incentive)
    dsl.if("goods delivered").then(accounts => {
        accounts.party(winner).pays("mafia").amount(incentive) 
        
    }).else(accounts => {
        accounts.party("mafia").pays(winner).amount(insurance) //or to void, so there would be no conspiracy
    })
    //alternatively: put MAD on receiving wallet, send auction's security deposit to MAD
})

```

> Auction can invalidate pre-bids with "proof of empty-pockets" (after timeout). Mafia is optional here but can improve efficiency. 

> For goods delivery: auction can simply put security deposit instead of using mafia, but evaluation of such deposits is not always available. 

> If there is no trusted oracle to check delivery - then MAD on the receiving wallet of the auction (distinct wallet per participant) plus MAD security deposit from auction.


## Algorithmic Trading

#### Past 
DSL additionally allows for querying extra non-oracle data-sources for past data, e.g. price history. 

Such extra-sources however will only be queryed prior to submission of contract and set in stone "on-chain". Such past queries can be useful to analyze and check market data in algorithmic trading in order to automatically decide the immutable terms.

> note: backtracking does not account for novel data, so foreseeing actual events is more important

#### Future
DSL enumerates all possible outcomes, thus removing the need for random walk. 



> if your strategy explodes numerically, the only thing you can do is to specify types properly, ranges of outcomes you can yourself interpret as human and time periods you would be able to foresee yourself. 

> no one else will do it for you: human trader is a real oracle - "oracles" in contract are just attestants. Forecast like a boss.

## Technical Notes

### Typesafety

Typesafety is meant to ensure energy conservation. Historically we introduced STLC to lambdas as a way to avoid "perpetual motion". Here, in Discreet - we avoid it by design, since `enumerateWithBound` asks finite collaterals (bounded recursion).

For code NOT involving payments (pure functions), Typescript is responsible for safety, it would give you stackoverflow. 

Discreet additionally provides convinience sugar for pure functions that are meant to go beyound any known boundary (e.g. for precision):

```ts
const turing = (a: number) => () => {
    if (a > 5) {
        return 7
    } else {
        return Dsl.recurse
            .bounded(turing(a))
            .attempts(5)
            .otherwiseYield(50)()
    }
}

console.log(turing(8)()) // 7
console.log(turing(1)()) //50
```

#### Over-under-collaterization

Both, overcollaterization and undercollaterization can be seen as an attempt at perpetual motion. 

When unnecessary collateral is locked - trader puts energy from nowhere (nature is efficient).
It breaks conservation.

When collateral double-counted (which Bitcoin finite supply prevents) - trader takes energy from nowhere.
It breaks conservation.

Formally, this is simply:

```ts
while (collateral > 0 && collateral < n) {
    trade(collateral)

    while (collateral <= 0) {
        collateral += 20 // overcollaterize
    }
    
    while (collateral > n) {
        collateral = n - 1 // undercollaterize
    }

    // PROFIT???
}
contactEnvironment() // neurotically unreachable
decideNextAction()
```

Typesefaty of Discreet is meant to ensure this does not happen as long as logic of the contract is sound. 

> Discreet relies on assumption that money supply is not "infinite" itself (non-zero energy/value of a unit).

### Applicability of SMT solvers

SMT solvers can only benefit the interpreter in terms of fast fail in linting. 

However, since all possible outomes have to be enumerated anyways - it does not make practical sense to lint it with SMT dolver, since even with SMT solver applied - successful validation would require to enumerate possibilities. Therefore SMT is not applied to interpreter.

Heuristic branch optimizations are already in Typescript transpiler and Javascript engines. Since Discreett is an amedded DSL, your code already benefits from such optimizations.

Custom assertions in your contracts can, however benefit from SMT in case contract generation depends on complex external environment itself (e.g. backtracking). Discreet is compatible with it, you can rebuild an expression for solver from `OfferModel`.

Otherwise - you can make custom assertions for your contract just by throwing an exception!

### Optimisations

Discreet outputs most optimal contract theoretically possible.

Backends are allowed to optimize ranges and such - by interpreting "0..100" as Schnorr sum of messages. They can also optimize subsequent unique matches of the same fact ("100 = 20", "100 = 30" etc, e.g. turn a set of binary options to a european call) into a single pack of CET-transactions rather than a binary tree, which would reduce amount of transactions needed to redeem the funds in worst case.


> Numbers and sets are implemented as binary trees. They are as optimal as possible.
And that's it.

#### Memoization

#### Over execution path

Memoization towards given execution path is meaningless for blockchain-contracts, since collateral is ever decreasing, every state is unique.  Breaking this rule - kills collaterization making contracts follow arbitrary non-intended logic.

> One could imagine a contract with homogenous transition, e.g. certain "command" from oracle generating 5 satochi payout to Alice every time oracle issues it. The catch here is that every observation is unque too. If oracle has to give answer to the same question twice - then 5+5 satochi is required to pay. That is why querying same fact twice is disallowed in DSL.

Repetition of collateral state over the contract lifetime - would require refill from party/counterparty, thus contract can be either stuck, refunded or restarted with new collateral depending on participant action.

This is equivalent to "early termination" clause, which itself is equivalent to creation of a new contract. There is no need to automatically ensure connection between previous contract and its "continuation", since facts from oracles are not in control of such link.

Money is state, not data. Facts can only re-distribute money in collateral (barrier escrow), they cannot add more money.

#### Between parallel execution pathes

Memoization between parallel execution pathes is possible in theory. Decreasing collateral can arrive at the same value between parallel execution pathes. However, it does not make sense to query same fact twice, thus despite same collateral, same state - there always will be different state transition function. Typesafety features of Discreet guarantee same observation won't be queryed more than once. 

> The value that is obtained from observation can be re-used along the execution path and javascript logic is subject to memoization. It is however guaranteed that when it comes to rendering `OfferModel` re-use of such value will be combined with new observation before `pay` - thus every subcontract generated is unique.

> Memoization could make sense for `OfferTerms`/`OfferModel` generated by other DSLs than Discreet since they might not provide typesafety features preventting non-optimal contract expression (see Contracts doc). `OfferTerms` allow same observation to be queryed again, since it is AST, not transpiler.

### Bypassing eDSL limitations

#### One pay per observation

While in theory, it is possible to aggregate several `pay` constructs coming after observation is made, practically typesafety and optimality can only be achieved if such `pay`s are unambiguously associated with nearest observation of an `outcome`. Typescript allows contructs, ala:

```ts

if (outcome1) {
    if (outcome2) {
        pay2
    }
    pay1 //will be associated with outcome2 - not optimal
}

```
In runtime - pay1's association becomes erased and therefore ambiguous.

One pay per observation enforces following form to be valid exclusively:

```ts
if (outcome1) {
    pay1
    if (outcome2) {
        pay2
    }
}
```

Writing transpiler or optimizer macro for Typescript would theoretically allow for transformation. However, `outcome1` and `outcome2` can get captured, thus naive analysis `if` constructs won;t work - have to trace the original `dsl.outcome` call, possibly accross imported packages.


#### TLDR
The most efficent way is to use synthetic `dsl.if` to capture the branch:

```ts
dsl.if(question).then(funds => {
    funds.pay(dsl.Alice, 100)
    funds.pay(dsl.Bob, 20) // this means pay 100 - 20 to Alice
}).else(funds => {
    funds.pay(dsl.Bob, 100)
    funds.pay(dsl.Bob, 10)
})
```

Multi-party:

```ts
const multi = await (new Dsl (async dsl => {
    if (dsl.outcome("really?", ["YES"], ["NO"])) {
        dsl.party("alice").pays("bob").amount(100)
        dsl.party("bob").pays("carol").amount(20)
    } else {
        dsl.party("carol").pays("alice").amount(40)
        dsl.party("bob").pays("alice").amount(40)

        dsl.if("wow?", ["yup"], ["nope"]).then(account => {
            account.party("alice").pays("carol").amount(30)
            account.party("carol").pays("alice").amount(5)
        }).else(account => {
            account.party("carol").pays("alice").amount(30)
        })
    }
})).multiple("alice", "bob", "carol").enumerateWithBoundMulti([[200, 100], [200, 100], [200, 100]])
```

> Note: All typesafety checks are preserved: `funds.pay(Alice, -100)` gets translated to `funds.pay(Bob, 100)`. Thus paying the same party regardless of outcome would still throw an error.

This however, does not allow you to `pay` after checking deeper outcomes:

```ts
dsl.if("wow?", ["yup"], ["nope"]).then(account => {
    account.party("alice").pays("carol").amount(30)
    dsl.if("really?", ["yup"], ["nope"]).then(account => {
         account.party("alice").pays("carol").amount(30)
    )}
    account.party("carol").pays("alice").amount(5) //this will throw an error
}).else(account => {
    account.party("carol").pays("alice").amount(30)
})
```

If you sure, you won't accidentally pay in sub-branches (since `account` is usually shadowed), use `dsl.unsafe`

```ts
dsl.unsafe.if("wow?", ["yup"], ["nope"]).then(account => {
    account.party("alice").pays("carol").amount(30)
    dsl.unsafe.if("really?", ["yup"], ["nope"]).then(account => { //account is usually shadowed, so cannot make mistake, usually
         account.party("alice").pays("carol").amount(30)
    )}
    account.party("carol").pays("alice").amount(5) //this will work
}).else(account => {
    account.party("carol").pays("alice").amount(30)
})
```

> `dsl.unsafe` has numerics and sets as well

> Theoretically, typescript to typescript transpiler (or a tricky macro) can force shadowing (and hide `accounts => `), thus making `dsl.unsafe` calls safe. It can also rewrite `dsl.if` to typescript's `if`.
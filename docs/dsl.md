
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

It gives you `OfferModel`, which matching engine turns into `OfferTerms`. The language is super-easy and embedded into TypeScript.

It is based on modern quantitative finance and renders to a tree of binary options, thus allowing expression of **arbitrary financial contracts**.

It is typesafe. It provides checks and restrictions that allow traders to eliminate known types of redundancies in contracts ("perfect hedges"), thus maximising trading liquidity - you only collaterize what's necceessary.


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

The output of Dicreet's "streamed" transpiler (`OfferModel`) allows for evaluations of collaterals. 

> Matching has `evaluatePartyCollateral`, `evaluateCounterPartyCollateral` functions for introspection. Broadcasting `OfferModel` would automatically evaluate those.

> **Evaluations, NOT estimations!**. Discreet relies on nondeterministic praxeological tautology - everything is known, nothing left to meaningless statistical speculation. You don't know the outcome - that's where the risk comes from, NOT from DSL. You suppose to predict outcome yourself, not hope for it based on "statistical" positive re-inforcement (e.g. confidence intervals). Otherwise it's gambling with statistical buzzwords.

> **Computational finance. If computer cannot enumerate portfolio - human won't be able to do it for sure**. Pricing must be done over definite outcomes. Even blurry pricing (dream-pricing) is definite pricing done on GPU (with parallelization), it is still strongly-typed. Forecasters like Random-walk, ARIMA etc hide types from you, causing confusion over what is actually priced. They also don't account for present - they infer "types" (what outcome can be) from a sample of badly collected historical data, never asking trader what the trader (human) actually knows about **present** environment. Feeding the past into the future until future becomes the past and so on, it's a perpetual motion attempt.

## Language

There are only two constructs:
- checking observations - inputs from oracles (`dsl.outcome` returns boolean)
- paying (`dsl.pay`)

Maintaing and progressing state is done in javascript with arbitrary computation available. You can calculate amount of paid output based on observation and any data known prior to offer submission. Any formula, any logic.

### Erasures

DSL "transpiler" will erase javascript code, collapsing it into `observe -> pay -> ... -> observe -> pay` chains. If rendered to Bitcoin DLC - it makes contract logic 100% private - only paid amounts are visible on-chain, not why they paid.

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

> Ranges are supported - 0..100 is a single outcome. Numerics on observed data (multiplications, sum) however would still require larger (but not full) enumeration. E.g. you can even "0..5", "5..10" on interest rate and then multiply, sum, recurse on it.

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
                // alice reveals private key for an empty repayment wallet in order to sign this CET, 
                // since bob did not pay to that wallet, the key is worthless
                // but alice gets deposit
                pay.party("bob", "btc").pays("alice", "usd").amount(10, "btc")
                // note ANYPREVOUT can be used instead for convinience (if BTC adopts it)
                // without ANYPREVOUT, 
                // if Bob is accidentally pys after deadline - Alice might reveal wallet with his repayment for anyone to take. She still gets his deposit though.
                // Thus such contracts always have a deadline to repay (timelock above)
            }).else(pay => {
                // alice does not reveal pk for special wallet, since Bob sent money there
            })
})
```

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

    dsl.party("mafia", mafiaDeposit.asset)
        .pays("bob", mafiaDeposit.asset)
        .amount(mafiaDeposit.value / 2, mafiaDeposit.asset)
}
```

> Note: since mafia is interested party and both alice and bob are involved with it - oracles could in theory be bypassed: mafia incentive would be "simply" included into atomic swap. In practice - both Bob and Alice need assurance that mafia is doing its job, thus mafia deposit and oracle keeping track of mafia are required. Mafia is trustless in this setup.

> Third-party oracle can still be bypassed by replacing "bob and alice create an atomic swap on date $date" with mutual bob's and alice's multisig (MAD) and a timelock.

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
        .pays("תֹהוּ", asset1)
        .amount(deposit, asset1)

    dsl.party("bob", asset2)
        .pays("תֹהוּ", asset2)
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
        accounts.release()  //resources are checked; reference counter would throw an error without this
        return [
            notional * (floatingRate / 100) + capitalisation1, 
            notional * (fixedRate / 100) + capitalisation2
        ]
    }
}, [0,0])

```

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

### Algorithmic Trading

#### Past 
DSL additionally allows for querying extra non-oracle data-sources for past data, e.g. price history. 

Such extra-sources however will only be queryed prior to submission of contract and set in stone "on-chain". Such past queries can be useful to analyze and check market data in algorithmic trading in order to automatically decide the immutable terms.

> note: backtracking does not account for novel data, so foreseeing actual events is more important

#### Future
DSL enumerates all possible outcomes, thus removing the need for random walk. 



> if your strategy explodes numerically, the only thing you can do is to specify types properly, ranges of outcomes you can yourself interpret as human and time periods you would be able to foresee yourself. 

> no one else will do it for you: human trader is a real oracle - "oracles" in contract are just attestants. Forecast like a boss.


## Guarantees
- money preservation: all outputs of transaction equal sum of all inputs
    - judgemental gurantee by design - Mega `OfferTerms` does not require money inputs to be specified - they are calculated automatically.
    - `OfferTerms` has `partyCompositeCollateralAmount`, `counterpartyCompositeCollateralAmount` fields that allow to auto-refund if collateral remained in a leaf. Fully tractable spending.
- finite and predictable execution time. 
    - > Longest chain of `dsl.outcome` is the worst-case amount of transactions necessary

## Technical Notes

### Applicability of SMT solvers

SMT solvers can only benefit the interpreter in terms of fast fail in linting. 

However, since all possible outomes have to be enumerated anyways - it does not make practical sense to lint it with SMT dolver, since even with SMT solver applied - successful validation would require to enumerate possibilities. Therefore SMT is not applied to interpreter.

Heuristic branch optimizations are already in Typescript transpiler and Javascript engines. Since Discreett is an amedded DSL, your code already benefits from such optimizations.

Custom assertions in your contracts can, however benefit from SMT in case contract generation depends on complex external environment itself (e.g. backtracking). Discreet is compatible with it, you can rebuild an expression for solver from `OfferModel`.

Otherwise - you can make custom assertions for your contract just by throwing an exception!

### Optimisations

Discreet outputs most optimal contract theoretically possible.

Backends are allowed to optimize ranges and such - by interpreting "0..100" as Schnorr sum of messages. They can also optimize subsequent unique matches of the same fact ("100 = 20", "100 = 30" etc, e.g. turn a set of binary options to a european call) into a single pack of CET-transactions rather than a binary tree, which would reduce amount of transactions needed to redeem the funds in worst case.


> Numbers are implemented as binary trees. They are as optimal as possible.

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
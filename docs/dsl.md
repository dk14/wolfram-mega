
> Draft

Discreet eDSL is allows you to easily build contracts compatible with Mega offers and matching. 

> "Discreet" misspelled on purpose

It gives you `OfferModel`, which matching engine turns into `OfferTerms`. The language is super-easy and embedded into TypeScript.

It is based on modern quantitative finance and renders to a tree of binary options, thus allowing expression of arbitrary financial contracts.

It is typesafe. It provides checks and restrictions that allow you to eliminate known types of redundancies in contracts ("perfect hedges"), thus maximising trading liquidity - you only collaterize what's necceessary.


## Example
```ts

import { Dsl } from '@dk14/wolfram-mega/discreet'

const maxBudget = 300
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
})).enumerateWithBound(maxBudget)
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

`OfferModel` "transpiler" output also allows for evaluations of collaterals. 

> Matching has `evaluatePartyCollateral`, `evaluateCounterPartyCollateral` functions for introspection. Broadcasting `OfferModel` would automatically evaluate those.

> Evaluations, not estimations. Discreet relies on nondeterministic tautology - everything is known, nothing left to meaningless statistical speculation (confidence intervals). You don't know the outcome - that's where the risk comes, not in DSL. You suppose to predict outcome yourself, not hope for it based on "statistical" positive re-inforcement. Otherwise it's gambling.

## Language

There are only two constructs:
- checking observations - inputs from oracles (`dsl.outcome` returns boolean)
- paying (`dsl.pay`)

Maintaing and progressing state is done in javascript with arbitrary computation available. You can calculate amount of paid output based on observation and any data known prior to offer submission. Any formula, any logic.

### Erasures

DSL "transpiler" will erase javascript code, collapsing it into `observe -> pay -> ... -> observe -> pay` chains. If rendered to Bitcoin DLC - it makes contract logic 100% private - only paid amounts are visible on-chain, not why they paid.

> For other chains - worst-case scenario will expose oracle messages/signatures and corresponding paid amounts. The calculation logic is erased nevertheless.

No smart-contract/VM is required to run the resulting contract. Target chain only has to be able to understand scriptless scripts (support Schnorr), which most modern chains do. 

### Outcomes

All outcomes specified in either yes or no of `dsl.outcome(pubkey, yesoutcomes, nooutcomes`) must have distinct semantics. Otherwise typesafety of "not querying the same outcome twice" would be broken.

### State

Discrete is at least as powerful as Cardano Marlowe. It allows stateful contracts.

Consequently, schedules, every ACTUS instrument can be implemented.


#### Numeric observations

 Outcomes are binary in Discreet, so interest rate drivers and such have to be enumerated and adapted. We recommend to quantize derivatives manually - to give meaning to numbers. 

> If automation is preferred, multiplications between binary-encoded  observations have to be done by converting set of outcomes into integer: `parseInt([outcome(...), outcome(...)].concat.map(b => b ? '1' : '0'), 2)`.

### Recursion

Discreet allows for recursion. `outcome` and `pay` can be in recusrsive calls as well, but subject to standard Dicreet typesafety restrictions: no "perfect hedges".

Every contract has a limit on maximum collateral (`enumerateWithBound(maxBudget)`), thus payout recursion is bounded. Halting problem is "solved".

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
})).multiple("alice", "bob", "carol").enumerateWithBoundMulti(5000)
```

### Cross-currency (assets)

DSL is not responsible for asset pairs, since asset pair is assumed to be fixed between parties per (composite) contract - you specify asset pair in matching etc. Allowing one party to have several assets in a contract is equivalent to having several parties, e.g. "alice-usd", "alice-btc".

### Algorithmic Trading

#### Past 
DSL allows for additionally querying non-oracle data-sources for past data, e.g. price history. 

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

Backends are allowed to optimize ranges and such - by interpreting "0..100" as Schnorr sum of messages. They can also optimize subsequent unque matches of the same fact ("100 = 20", "100 = 30" etc, e.g. turn a set of binary options to a european call) into a single pack of CET-transactions rather than a binary tree, which would reduce amount of transactions needed to redeem the funds in worst case.

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

### eDSL limitations

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

The most efficent way is to capture the branch:

```ts
dsl.if(question).then(funds => {
    funds.pay(Alice, 100)
    funds.pay(Bob, 20) // this means pay 100 - 20 to Alice
}).else(funds => {
    funds.pay(Bob, 100)
    funds.pay(Bob, 10)
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
})).multiple("alice", "bob", "carol").enumerateWithBoundMulti(5000)
```
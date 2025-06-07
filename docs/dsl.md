
> Draft

Discreet eDSL (purposeful misspelling) is an instrument to easily build contracts compatible with Mega offers and matching. 

It gives you `OfferModel`, which matching engine turns into `OfferTerms`. The language is super-easy and embedded into TypeScript.

It is based on modern quantitative finance and renders to a tree of binary options, thus allowing expression of arbitrary financial contracts.

It is typesafe. It provides checks and restrictions that allow you to eliminate known types of redundancies in contracts ("perfect hedges"), thus maximising trading liquidity - you only collaterize what's necceessary.


## Example
```ts
const maxBudget = 300
const b = 30
const model = await (new Dsl(async dsl => {
    const a = 30 + b
    if (dsl.outcome("really?", ["YES"], ["NO"])) {
        dsl.pay(Dsl.Bob, a + 100) 
        if (dsl.outcome("is it?", ["YES"], ["NO"])) {
            dsl.pay(Dsl.Alice, 40)
        } else {
            dsl.pay(Dsl.Bob, 50)
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

`OfferModel` it outputs also allows for trivial evaluations of collaterals. 

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

### State

Discrete is as powerful as Cardano Marlowe. It allows stateful contracts.

Consequently, schedules, every ACTUS instrument can be implemented.

> Outcomes are binary in Discreet, so interest rate drivers and such have to be enumerated and adapted. We recommend to quantize derivatives manually - to give meaning to numbers. Multiplications between observation have to be done in "multiplication table" form. Since recursion is supported - `mul` on outcomes and `binaryToInteger` wrappers might become part of standard library in the future.

### Recusrion

Discreet allows for recusrion. `outcome` and `pay` can be in recusrsive calls as well, but subject to standard Dicreet typesafety restrictions: no "perfect hedges".

Every contract has a limit on maximum collateral (`enumerateWithBound(maxBudget)`), thus payout recursion is bounded. Halting problem is "solved".


### Algorithmic Trading

DSL allows for additionally querying non-oracle data-sources, e.g. price history. 

Such extra-sources however will only be queryed prior to submission of contract and set in stone "on-chain". Such queries can be useful to analyze and check market data in algorithmic trading in order to automatically decide the immutable terms.

DSL enumerates all possible outcomes, thus removing the need for random walk. 

> backtracking does not account for novel data, so foreseeing actual events is more important

> if your strategy explodes numerically, the only thing you can do is to specify types properly, ranges of outcomes you can yourself interpret as human and time periods you would be able to foresee yourself, no one else will do it for you (human trader is a real oracle - "oracles" in contract are just attestants). Forecast like a boss.


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
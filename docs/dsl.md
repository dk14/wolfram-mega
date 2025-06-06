
> Draft

Discreet eDSL (purposeful misspelling) is an instrument to easily build contracts compatible with Mega offers and matching. 

It gives you `OfferModel`, which matching engine turns into `OfferTerms`. The language is super-easy and embedded into javascipt/typescript.

It is based on modern quantitative finance and renders to a tree of binary options, thus allowing expression of arbitrary financial contracts.

It is typesafe. It provides checks and restrictions that allow you to eliminate known types of redundancies in contracts ("perfect hedges"), thus maximising trading liquidity - you only collaterize what's necceessary.

`OfferModel` it outputs also allows for trivial estimates of collaterals.

> Matching has `evaluatePartyCollateral`, `evaluateCounterPartyCollateral` functions for introspection. Broadcasting `OfferModel` would automatically evaluate those.

## Language

There are only two constructs:
- checking observations - inputs from oracles (`dsl.outcome` returns boolean)
- paying (`dsl.pay`)

Maintaing and progressing state is done in javascript with arbitrary computation available. You can calculate amount of paid output based on observation and any data. Any formula any logic.

### Erasures

DSL "transpiler" will erase javascript code, collapsing it into `observe -> pay -> ... -> observe -> pay` chains. If rendered to Bitcoin DLC - it makes contract logic 100% private - only paid amounts are visible on-chain. 

> For other chains - worst-case scenaario will expose oracle messages/signatures and corresponding paid amounts. The calculation logic is erased nevertheless.

No smart-contract/VM is required to run the resulting contract. Target chain only has to be able to understand scritless scripts (support Schnorr), which most modern chains do.

### Algorithmic Trading

DSL allows for querying non-oracle data-sources, e.g. price hisory. 

They however will only be queryied once, before execution of contract. It is useful to analyze and check market data in algorithmic trading.

DSL enumerates all possible outcomes, thus removing the need for random walk - if your strategy explodes, the only thing you can do is to specify types properly (e.g. ranges of outcomes you can interpret as human). Backtrack like a boss.


## Guarantees
- money preservation: all outputs of transaction equal sum of all inputs
    - judgemental gurantee by design - Mega `OfferTerms` does not require money inputs to be specified - they are calculated automatically.
    - `OfferTerms` has `partyCompositeCollateralAmount`, `counterpartyCompositeCollateralAmount` fields that allow to auto-refund if collateral remained in a leaf. Fully tractable spending.
- finite and predictable execution time. 
    - > Longest chain of `dsl.outcome` is the worst-case amount of transactions necessary


## Example
```ts
const maxBudget = 300
const b = 30
const model = await (new Dsl(async dsl => {
    const a = 30 + b
    if (dsl.outcome("really?")) {
        dsl.pay(Dsl.Bob, a + 100) 
        if (dsl.outcome("is it?")) {
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

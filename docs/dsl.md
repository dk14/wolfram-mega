
> Draft

```ts
const maxBudget = 300
const model = await (new Dsl(async dsl => {
    const a = 60
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
  "question": "",
  "status": "matching",
  "blockchain": "",
  "role": "initiator",
  "ifPartyWins": {
    "id": "",
    "bet": [50, 40],
    "betOn": true,
    "oracles": [{ "capabilityPub": "is it?" }],
    "question": "",
    "status": "matching",
    "blockchain": "",
    "role": "initiator"
  }
}
```

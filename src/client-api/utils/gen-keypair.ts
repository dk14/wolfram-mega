import { testOnlyGenerateKeyPair, testOnlyGenerateKeyPairEd } from "../../node";

console.log("\nEd25519")
console.log(testOnlyGenerateKeyPairEd())

console.log("\nEC")
console.log(testOnlyGenerateKeyPair())

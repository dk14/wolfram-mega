import { testOnlyGenerateKeyPair, testOnlyGenerateKeyPairEd } from "../../crypto";

console.log("\nEd25519")
console.log(testOnlyGenerateKeyPairEd())

console.log("\nEC")
console.log(testOnlyGenerateKeyPair())

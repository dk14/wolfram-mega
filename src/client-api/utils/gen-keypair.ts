import { testOnlyGenerateKeyPair, testOnlyGenerateKeyPairEd } from "../../util";

console.log("\nEd25519")
console.log(testOnlyGenerateKeyPairEd())

console.log("\nEC")
console.log(testOnlyGenerateKeyPair())

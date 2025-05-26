import { assert } from "console";

const Buffer = require('safe-buffer').Buffer;
const BigInteger = require('bigi');
const convert = require('bip-schnorr').convert
const muSig = require('bip-schnorr').muSig
const schnorr = require('bip-schnorr')
const math = require('bip-schnorr').math
const randomBytes = require('randombytes');
const ecurve = require('ecurve');

const randomBuffer = (len: number) => Buffer.from(randomBytes(len));

//Issue Offer - share commitment1
//Accept - share commitment2
//Accept2 - share nonce1
//Accept3 - share nonce2, partialSig
//Finalize - full signature
//SECURITY NOTE: IF NO PRE-COMMITMENTS IMPLEMENTED, ROGUE KEYS ARE WELCOME

export const muSigNonce1 = (pk1, pk2, secret1, msg, sessionId1 = randomBuffer(32)) => {

  const pubKeys = [
    Buffer.from(pk1, 'hex'),
    Buffer.from(pk2, 'hex')
  ]

  const pubKeyHash = muSig.computeEll(pubKeys);
  const pkCombined = muSig.pubKeyCombine(pubKeys, pubKeyHash);
  const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
  const pubKeyParity = math.isEven(pkCombined);

  const privateKey = BigInteger.fromHex(secret1)

  const session1 = muSig.sessionInitialize(
    sessionId1,
    privateKey,
    msg,
    pubKeyCombined,
    pubKeyParity,
    pubKeyHash,
    0
  );

  const nonce1 = session1.nonce
  const commitment1 = session1.commitment

  return {nonce1, commitment1, sessionId1}
}

export const muSigCommitment2 = (pk1, pk2, secret2, msg, sessionId2 = randomBuffer(32)) => {
  const pubKeys = [
    Buffer.from(pk1, 'hex'),
    Buffer.from(pk2, 'hex')
  ]

  const pubKeyHash = muSig.computeEll(pubKeys);
  const pkCombined = muSig.pubKeyCombine(pubKeys, pubKeyHash);
  const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
  const pubKeyParity = math.isEven(pkCombined);

  const privateKey2 = BigInteger.fromHex(secret2)

  const session2 = muSig.sessionInitialize(
    sessionId2,
    privateKey2,
    msg,
    pubKeyCombined,
    pubKeyParity,
    pubKeyHash,
    0
  )
  const commitment2 = session2.commitment
  return {commitment2, sessionId2}
}

export const sign1 = (pk1, pk2, commitment1, nonce1, secret2, msg, sessionId2) => {
  const pubKeys = [
    Buffer.from(pk1, 'hex'),
    Buffer.from(pk2, 'hex')
  ]
  
  const nonce1Hash = muSig.computeEll(nonce1)
  assert(nonce1Hash === commitment1)

  const pubKeyHash = muSig.computeEll(pubKeys);
  const pkCombined = muSig.pubKeyCombine(pubKeys, pubKeyHash);
  const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
  const pubKeyParity = math.isEven(pkCombined);

  const privateKey2 = BigInteger.fromHex(secret2)

  const session2 = muSig.sessionInitialize(
    sessionId2,
    privateKey2,
    msg,
    pubKeyCombined,
    pubKeyParity,
    pubKeyHash,
    0
  )

  const nonce2 = session2.nonce

  const nonceCombined = muSig.sessionNonceCombine(session2, [nonce1, nonce2])

  const combinedNonceParity = session2.combinedNonceParity

  session2.partialSignature = muSig.partialSign(session2, msg, nonceCombined, pubKeyCombined);
  const partSig2 = session2.partialSignature

  return {
    nonce2, nonceCombined, partSig2, combinedNonceParity
  }
}
    
export const sign2 = (pk1, pk2, nonceCombined, partSig2, combinedNonceParity, nonce2, commitment2, secret1, msg, sessionId1) => {

  const pubKeys = [
    Buffer.from(pk1, 'hex'),
    Buffer.from(pk2, 'hex')
  ]

  const nonce2Hash = muSig.computeEll(nonce2)
  assert(nonce2Hash === commitment2)
  
  const pubKeyHash = muSig.computeEll(pubKeys);
  const pkCombined = muSig.pubKeyCombine(pubKeys, pubKeyHash);
  const pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
  const pubKeyParity = math.isEven(pkCombined);
  
  const privateKey1 = BigInteger.fromHex(secret1)

  const session1 = muSig.sessionInitialize(
    sessionId1,
    privateKey1,
    msg,
    pubKeyCombined,
    pubKeyParity,
    pubKeyHash,
    0
  );

  session1.combinedNonceParity = combinedNonceParity
  session1.partialSignature = muSig.partialSign(session1, msg, nonceCombined, pubKeyCombined)

  muSig.partialSigVerify(
    session1,
    partSig2,
    nonceCombined,
    0,
    pubKeys[2],
    nonce2
  );

  const partSig1 = muSig.partialSign(session1, msg, nonceCombined, pubKeyCombined)

  const signature = muSig.partialSigCombine(nonceCombined, [partSig1, partSig2]);

  schnorr.verify(pubKeyCombined, msg, signature);

  return signature.toString("hex")
        
}
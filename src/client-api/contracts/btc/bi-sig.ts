//SECURITY NOTE: DOES NOT USE COMMITMENTS

const Buffer = require('safe-buffer').Buffer;
const BigInteger = require('bigi');
const convert = require('bip-schnorr').convert
const muSig = require('bip-schnorr').muSig
const schnorr = require('bip-schnorr')
const math = require('bip-schnorr').math
const randomBytes = require('randombytes');
const ecurve = require('ecurve');

const randomBuffer = (len: number) => Buffer.from(randomBytes(len));

export const sign1Alice = (pk1, pk2, secret1, msg, sessionId1 = randomBuffer(32)) => {

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

    return {nonce1, sessionId1}
}

export interface Stage2Sign {
  pk1
  pk2
  sessionId1
  nonce1
}

const sign2Bob = (pk1, pk2, nonce1, secret2, msg, sessionId2 = randomBuffer(32)) => {
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
      );
      const commitment2 = session2.commitment
      const nonce2 = session2.nonce

      const nonceCombined = muSig.sessionNonceCombine(session2, [nonce1, nonce2]);


      const combinedNonceParity = session2.combinedNonceParity //!!!! share
    


      session2.partialSignature = muSig.partialSign(session2, msg, nonceCombined, pubKeyCombined);
      const partSig1 = session2.partialSignature

      return {
        commitment2, nonce2, nonceCombined, partSig1, combinedNonceParity
      }

}
    
export interface Stage3Sign {
  pk1
  pk2
  partSig1
  sessionId1
  sessionId2
  nonce1
  nonce2
  nonceCombined
  combinedNonceParity
}


const sign3Alice = (pk1, pk2, nonceCombined, partSig1, combinedNonceParity, nonce1, secret1, msg, sessionId1) => {

        const pubKeys = [
          Buffer.from(pk1, 'hex'),
          Buffer.from(pk2, 'hex')
        ]
        
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
          partSig1,
          nonceCombined,
          0,
          pubKeys[0], //TODO wrong party 0?
          nonce1
        );

        return {
          partSig2: session1.partialSignature
        }
      }
    
export interface Stage4Sign {
  pk1
  pk2
  partSig1
  partSig2
  sessionId1
  sessionId2
  nonce1
  nonce2
  nonceCombined
  combinedNonceParity
}

const sign4Bob = (pk1, pk2, secret2, partSig2, nonce2, nonceCombined, combinedNonceParity, msg, sessionId2) => {

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
      );
      session2.combinedNonceParity = combinedNonceParity

      muSig.partialSigVerify(
        session2,
        partSig2,
        nonceCombined,
        1,
        pubKeys[1],
        nonce2
      );

      session2.partialSignature = muSig.partialSign(session2, msg, nonceCombined, pubKeyCombined)

      const signature = muSig.partialSigCombine(nonceCombined, [session2.partialSignature]);

      schnorr.verify(pubKeyCombined, msg, signature);

      return signature.toString("hex")
    
}
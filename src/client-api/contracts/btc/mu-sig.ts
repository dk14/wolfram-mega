export const sign = (pk1, pk2, secret1, secret2, msg) => {
    const Buffer = require('safe-buffer').Buffer;
    const BigInteger = require('bigi');
    const convert = require('bip-schnorr').convert
    const muSig = require('bip-schnorr').muSig
    const schnorr = require('bip-schnorr')
    const math = require('bip-schnorr').math
    const randomBytes = require('randombytes');
    const ecurve = require('ecurve');

    const randomBuffer = (len: number) => Buffer.from(randomBytes(len));

    const publicData = {
        pubKeys: [
          Buffer.from(pk1, 'hex'),
          Buffer.from(pk2, 'hex')
        ],
        message: msg,
        pubKeyHash: null,
        pubKeyCombined: null,
        pubKeyParity: null,
        commitments: [],
        nonces: [],
        nonceCombined: null,
        partialSignatures: [],
        signature: null,
      };
    
      // data only known by the individual party, these values are never shared
      // between the signers!
      const signerPrivateData = [
        // signer 1
        {
          privateKey: BigInteger.fromHex(secret1),
          session: null,
        },
        // signer 2
        {
          privateKey: BigInteger.fromHex(secret2),
          session: null,
        },
      ];
    
      // -----------------------------------------------------------------------
      // Step 1: Combine the public keys
      // The public keys P_i are combined into the combined public key P.
      // This can be done by every signer individually or by the initializing
      // party and then be distributed to every participant.
      // -----------------------------------------------------------------------
      publicData.pubKeyHash = muSig.computeEll(publicData.pubKeys);
      const pkCombined = muSig.pubKeyCombine(publicData.pubKeys, publicData.pubKeyHash);
      publicData.pubKeyCombined = convert.intToBuffer(pkCombined.affineX);
      publicData.pubKeyParity = math.isEven(pkCombined);
    
      // -----------------------------------------------------------------------
      // Step 2: Create the private signing session
      // Each signing party does this in private. The session ID *must* be
      // unique for every call to sessionInitialize, otherwise it's trivial for
      // an attacker to extract the secret key!
      // -----------------------------------------------------------------------
      signerPrivateData.forEach((data, idx) => {
        const sessionId = randomBuffer(32); // must never be reused between sessions!
        data.session = muSig.sessionInitialize(
          sessionId,
          data.privateKey,
          publicData.message,
          publicData.pubKeyCombined,
          publicData.pubKeyParity,
          publicData.pubKeyHash,
          idx
        );
      });
      const signerSession = signerPrivateData[0].session;
    
      // -----------------------------------------------------------------------
      // Step 3: Exchange commitments (communication round 1)
      // The signers now exchange the commitments H(R_i). This is simulated here
      // by copying the values from the private data to public data array.
      // -----------------------------------------------------------------------
      for (let i = 0; i < publicData.pubKeys.length; i++) {
        publicData.commitments[i] = signerPrivateData[i].session.commitment;
      }
    
      // -----------------------------------------------------------------------
      // Step 4: Get nonces (communication round 2)
      // Now that everybody has commited to the session, the nonces (R_i) can be
      // exchanged. Again, this is simulated by copying.
      // -----------------------------------------------------------------------
      for (let i = 0; i < publicData.pubKeys.length; i++) {
        publicData.nonces[i] = signerPrivateData[i].session.nonce;
      }
    
      // -----------------------------------------------------------------------
      // Step 5: Combine nonces
      // The nonces can now be combined into R. Each participant should do this
      // and keep track of whether the nonce was negated or not. This is needed
      // for the later steps.
      // -----------------------------------------------------------------------
      publicData.nonceCombined = muSig.sessionNonceCombine(signerSession, publicData.nonces);
      signerPrivateData.forEach(data => (data.session.combinedNonceParity = signerSession.combinedNonceParity));
    
      // -----------------------------------------------------------------------
      // Step 6: Generate partial signatures
      // Every participant can now create their partial signature s_i over the
      // given message.
      // -----------------------------------------------------------------------
      signerPrivateData.forEach(data => {
        data.session.partialSignature = muSig.partialSign(data.session, publicData.message, publicData.nonceCombined, publicData.pubKeyCombined);
      });
    
      // -----------------------------------------------------------------------
      // Step 7: Exchange partial signatures (communication round 3)
      // The partial signature of each signer is exchanged with the other
      // participants. Simulated here by copying.
      // -----------------------------------------------------------------------
      for (let i = 0; i < publicData.pubKeys.length; i++) {
        publicData.partialSignatures[i] = signerPrivateData[i].session.partialSignature;
      }
    
      // -----------------------------------------------------------------------
      // Step 8: Verify individual partial signatures
      // Every participant should verify the partial signatures received by the
      // other participants.
      // -----------------------------------------------------------------------
      for (let i = 0; i < publicData.pubKeys.length; i++) {
        muSig.partialSigVerify(
          signerSession,
          publicData.partialSignatures[i],
          publicData.nonceCombined,
          i,
          publicData.pubKeys[i],
          publicData.nonces[i]
        );
      }
    
      // -----------------------------------------------------------------------
      // Step 9: Combine partial signatures
      // Finally, the partial signatures can be combined into the full signature
      // (s, R) that can be verified against combined public key P.
      // -----------------------------------------------------------------------
      publicData.signature = muSig.partialSigCombine(publicData.nonceCombined, publicData.partialSignatures);
    
      // -----------------------------------------------------------------------
      // Step 10: Verify signature
      // The resulting signature can now be verified as a normal Schnorr
      // signature (s, R) over the message m and public key P.
      // -----------------------------------------------------------------------
      schnorr.verify(publicData.pubKeyCombined, publicData.message, publicData.signature);

      return publicData.signature.toString("hex")
    }
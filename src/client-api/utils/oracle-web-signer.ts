import * as mega from '../../protocol'
import { schnorrApi } from '../contracts/btc/schnorr';
import bs58 from 'bs58'

export const webSign = async (x: [mega.Commitment, string]): Promise<string> => {
    const commitment = x[0]
    const pk = await window.privateDB.get("secrets", commitment.req.capabilityPubKey)
    if (x[1] === '!RVALUE') {
        const secret = Buffer.from(bs58.decode(pk)).toString("hex").substring(2, 64 + 2)
        const kValue = schnorrApi().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906")
        const rValue = schnorrApi().getPub(kValue)
        return rValue
        
    } else if (x[1] === '') {
        const secret = Buffer.from(bs58.decode(pk)).toString("hex").substring(2, 64 + 2)
        const kValue = schnorrApi().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906")
        const rValue = schnorrApi().getPub(kValue)
        const sValue = schnorrApi().signatureSValue(secret, kValue, JSON.stringify(commitment)).padStart(64, "0")
        return rValue + sValue
    } else {
        const secret = Buffer.from(bs58.decode(pk)).toString("hex").substring(2, 64 + 2)
        const kValue = schnorrApi().genNonce(secret, commitment.req.capabilityPubKey, "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906")
        const sValue = schnorrApi().signatureSValue(secret, kValue, x[1] as string).padStart(64, "0")
        return sValue
    }
}
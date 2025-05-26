import * as mega from './protocol'
import {mine} from './util'

export const powOverOracleId = async (o: mega.OracleId, difficulty: number, algorithm: string = "SHA256"): Promise<mega.HashCashPow> => {
    const res = mine(difficulty, o.pubkey, algorithm)
    return {
        difficulty,
        algorithm,
        hash: res.hash,
        magicNo: res.magicNo,
        magicString: res.magicString
    }
}

export const powOverOracleCapability = async (cp: mega.OracleCapability, difficulty: number, algorithm: string = "SHA256"): Promise<mega.HashCashPow> => {
    const res = mine(difficulty, cp.oracleSignature, algorithm)
    return {
        difficulty,
        algorithm,
        hash: res.hash,
        magicNo: res.magicNo,
        magicString: res.magicString
    }
}

export const powOverReport = async (r: mega.Report, difficulty: number, algorithm: string = "SHA256"): Promise<mega.HashCashPow> => {
    const res = mine(difficulty, JSON.stringify(r.content), algorithm)
    return {
        difficulty,
        algorithm,
        hash: res.hash,
        magicNo: res.magicNo,
        magicString: res.magicString
    }
}

export const powOverOffer = async (offer: mega.OfferMsg, difficulty: number, algorithm: string = "SHA256"): Promise<mega.HashCashPow> => {
    const res = mine(difficulty, JSON.stringify(offer.content), algorithm)
    return {
        difficulty,
        algorithm,
        hash: res.hash,
        magicNo: res.magicNo,
        magicString: res.magicString
    }
}
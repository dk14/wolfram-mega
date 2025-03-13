import * as nd from './node'
import {mine} from './util'

export const powOverOracleId = async (o: nd.OracleId, difficulty: number, algorithm: string = "SHA256"): Promise<nd.HashCashPow> => {
    const res = mine(difficulty, JSON.stringify(o.pubkey), algorithm)
    return {
        difficulty,
        algorithm,
        hash: res.hash,
        magicNo: res.magicNo,
        magicString: res.magicString
    }
}

export const powOverOracleCapability = async (cp: nd.OracleCapability, difficulty: number, algorithm: string = "SHA256"): Promise<nd.HashCashPow> => {
    const res = mine(difficulty, JSON.stringify(cp.oracleSignature), algorithm)
    return {
        difficulty,
        algorithm,
        hash: res.hash,
        magicNo: res.magicNo,
        magicString: res.magicString
    }
}

export const powOverReport = async (r: nd.Report, difficulty: number, algorithm: string = "SHA256"): Promise<nd.HashCashPow> => {
    const res = mine(difficulty, JSON.stringify(JSON.stringify(r.content)), algorithm)
    return {
        difficulty,
        algorithm,
        hash: res.hash,
        magicNo: res.magicNo,
        magicString: res.magicString
    }
}

export const powOverOffer = async (offer: nd.OfferMsg, difficulty: number, algorithm: string = "SHA256"): Promise<nd.HashCashPow> => {
    const res = mine(difficulty, JSON.stringify(offer.content), algorithm)
    return {
        difficulty,
        algorithm,
        hash: res.hash,
        magicNo: res.magicNo,
        magicString: res.magicString
    }
}
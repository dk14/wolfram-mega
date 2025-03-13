import {createHash} from 'crypto'

export const hash = (msg: string, algo: string): string => {
    return createHash(algo).update(msg).digest('hex')
}

export interface Magic {
    magicNo: number
    magicString?: string
    hash: string
}

export const mine = (difficulty: number, preimage: string, algorithm: string) : Magic => {
    var magicNo: number = 0
    var magicString: string | undefined = undefined
    while (!hash(preimage + magicNo + (magicString ?? ""), algorithm).endsWith("0".repeat(difficulty))) {
        magicNo++
    }
    return {
        magicNo,
        magicString,
        hash: hash(preimage + magicNo + (magicString ?? ""), algorithm)
    }
}
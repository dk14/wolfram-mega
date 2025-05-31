import {createHash} from 'crypto'

export const hash = (msg: string, algo: string = "SHA256"): string => {
    return createHash(algo.replaceAll('-', '')).update(msg).digest('hex')
}

export interface Magic {
    magicNo: number
    magicString?: string
    hash: string
}

export const mine = (difficulty: number, preimage: string, algorithm: string) : Magic => {
    var magicNo: number = 0
    var magicString: string = ""
    while (!hash(preimage + magicNo + magicString, algorithm).endsWith("0".repeat(difficulty))) {
        magicNo++
    }
    return {
        magicNo,
        magicString,
        hash: hash(preimage + magicNo + magicString, algorithm)
    }
}


export function isBrowser() {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}
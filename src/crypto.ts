import {createVerify, generateKeyPairSync, createSign, sign, createPrivateKey, KeyObject} from 'crypto'
const curve = 'secp521r1';

export interface KeyPair {
    pub: string, 
    pk: string
}


const regexPem = /.{64}/g;


export const createPemPk = (base64: string): string => {
    return '-----BEGIN EC PRIVATE KEY-----\n' + base64.replace(regexPem, '$&\n') + '\n-----END EC PRIVATE KEY-----\n'
}

export const createPemPkEd = (base64: string): KeyObject => {
    const pem = '-----BEGIN PRIVATE KEY-----\n' + base64.replace(regexPem, '$&\n') + '-----END PRIVATE KEY-----\n'
    return createPrivateKey({key: pem})
}

export const testOnlyGenerateKeyPair = (): KeyPair => {
    const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: curve });
    return {
        pub: publicKey.export({ type: 'spki', format: 'der' }).toString('base64'),
        pk: privateKey.export({ type: 'sec1', format: 'der' }).toString('base64')
    }
}

export const testOnlyGenerateKeyPairEd = (): KeyPair => {
    const { publicKey, privateKey } = generateKeyPairSync('ed25519');
    return {
        pub: publicKey.export({ type: 'spki', format: 'der' }).toString('base64'),
        pk: privateKey.export({ type: 'pkcs8', format: 'der' }).toString('base64')
    }
}

export const testOnlySign = (msg: string, pk: string) => {
    return createSign('SHA256').update(msg).sign(createPemPk(pk), 'base64')
}

export const testOnlySignEd = (msg: string, pk: string) => {
    return sign(null, Buffer.from(msg), createPemPkEd(pk)).toString('base64')
}

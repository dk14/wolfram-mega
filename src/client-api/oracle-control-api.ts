import { OracleCapability, OracleId, Param, Answer, HashCashPow } from "../node";


export interface OracleBasicIdentity {
    pubkey: string
    oracleSignatureType: string
    manifestUri?: string
}

export interface OracleBasicCapability {
    capabilitySignatureType?: string
    capabilityPubKey: string
    off?: boolean
    params?: Param[] 
    answers?: Answer[]
    endpoint?: string
}

export interface OracleCfg {
    id: OracleBasicIdentity
    basicCapabilities?: OracleBasicCapability[]
}

export interface CapabilityStorage<Query> {

    addCapability: (cp: OracleCapability) => void
    
    deactivateCapability: (capabilityPubKey: string) => void

    dropCapability: (capabilityPubKey: string) => void

    getCapability: (capabilityPubKey: string) => OracleCapability | undefined

    listCapabilities: (query: Query) => OracleCapability[]

    updateCapabilityPow: (capabilityPubKey: string, pow: HashCashPow) => void

}


export interface OracleAd<MegaPeerT>{
    peer: MegaPeerT
    rank: number
}

export interface OracleControlAPI<MegaPeerT> {
    startAdvertising: (cfg: OracleCfg) => void
    pauseAdvertising: (cfg: OracleCfg) => void
    upgradeOraclePow: (difficulty: number) => void

    upgradeCapabilityPow: (capabilityPubKey: string, difficulty: number) => void

    addCapability: (cp: OracleBasicCapability) => void

    watchMyRankSample: (subscriber: (event: OracleAd<MegaPeerT>) => void) => void

    watchSignMyOracleBroadcasts: (subscriber: (event: OracleId) => OracleId) => void
    watchSignMyCapabilityBroadcasts: (subscriber: (event: OracleCapability) => OracleCapability) => void

}
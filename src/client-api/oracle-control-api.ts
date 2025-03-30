import { OracleCapability, OracleId, Param, Answer, HashCashPow, Api, PagingDescriptor } from "../node"
import { MempoolConfig } from "../config"
import { powOverOracleCapability, powOverOracleId } from "../pow"
import { ConnectionPool, ConnectionPoolCfg } from './connection-pool'


export interface OracleBasicIdentity {
    pubkey: string
    oracleSignatureType: string
    manifestUri?: string
}

export interface OracleBasicCapability {
    capabilitySignatureType?: string
    capabilityPubKey: string
    question: string
    off?: boolean
    params?: Param[] 
    answers?: Answer[]
    endpoint?: string
}

export interface OracleCfg {
    id: OracleBasicIdentity
    basicCapabilities?: OracleBasicCapability[]
    adInterval: number
    adTopN: number
    dbPath: string
    httpPort: number
    wsPort: number
}

export interface CapabilityStorage<Query> {

    addCapability: (cp: OracleCapability) => Promise<void>
    
    deactivateCapability: (capabilityPubKey: string) => Promise<void>
    activateCapability: (capabilityPubKey: string) => Promise<void>

    dropCapability: (capabilityPubKey: string) => Promise<void>

    getCapability: (capabilityPubKey: string) =>  Promise<OracleCapability | undefined>

    listCapabilities: (query: Query, paging: PagingDescriptor) => Promise<OracleCapability[]>

    listActiveCapabilities: () => Promise<OracleCapability[]>

    updateCapabilityPow: (capabilityPubKey: string, pow: HashCashPow) => Promise<void>

}


export interface OracleAd<MegaPeerT>{
    peer: MegaPeerT
    rank: number
}

export interface OracleControlAPI<MegaPeerT> {
    startAdvertising: (cfg: OracleCfg) =>  Promise<void>
    pauseAdvertising: (cfg: OracleCfg) =>  Promise<void>
    upgradeOraclePow: (difficulty: number) =>  Promise<void>

    upgradeCapabilityPow: (capabilityPubKey: string, difficulty: number) =>  Promise<void>

    addCapability: (cp: OracleBasicCapability) =>  Promise<void>
    deactivateCapability: (capabilityPubKey: string) => Promise<void>
    activateCapability: (capabilityPubKey: string) => Promise<void>
    dropCapability: (capabilityPubKey: string) => Promise<void>

    watchMyRankSample: (subscriber: (event: OracleAd<MegaPeerT>) => Promise<void>) =>  Promise<void>

    watchSignMyOracleBroadcasts: (subscriber: (event: OracleId) => Promise<OracleId>) =>  Promise<void>
    watchSignMyCapabilityBroadcasts: (subscriber: (event: OracleCapability) => Promise<OracleCapability>) =>  Promise<void>

}

export function oracleControlApi<Query, MegaPeerT>(
    poolcfg: MempoolConfig<MegaPeerT>, 
    nodeApi: Api, storage: CapabilityStorage<Query>, 
    connections: ConnectionPool<MegaPeerT>, 
    concfg: ConnectionPoolCfg): OracleControlAPI<MegaPeerT> {
   
    var id : OracleId = null
    var advertiser = null
    var signer: (event: OracleId) => Promise<OracleId> = null
    var cpsigner: (event: OracleCapability) => Promise<OracleCapability> = null
    var adobserver: (event: OracleAd<MegaPeerT>) => Promise<void> = null
    
    return {
        startAdvertising: async function (cfg: OracleCfg): Promise<void> {
            if (advertiser !== null) {
                return
            }
            if (id === null) {
                id = {
                    pubkey: cfg.id.pubkey,
                    seqNo: 0,
                    cTTL: 0,
                    pow: undefined,
                    bid: {amount: 0, proof: ""},
                    oracleSignature: "",
                    oracleSignatureType: cfg.id.oracleSignatureType,
                    manifestUri: cfg.id.manifestUri
                }
                id.pow = await powOverOracleId(id, 0)
            }
            
            advertiser = setInterval(async () => {
                if (adobserver !== null) {
                    await Promise.all((connections.list(concfg).map(async con => {
                        const api = connections.getapi(con)
                        const oracles = await api.lookupOracles({
                            page: 0,
                            chunkSize: cfg.adTopN
                        })
                        oracles.forEach((o, i) => {
                            if (o.pubkey === cfg.id.pubkey) {
                                adobserver({
                                    peer: con,
                                    rank: i
                                })
                            }
                        })
                    })))
                }

                if (signer !== null) {
                    id.oracleSignature = ""
                    id = await signer(id)
                }
                nodeApi.announceOracle(poolcfg, id)
                id.seqNo++
                await Promise.all((await storage.listActiveCapabilities()).map(async cp => {
                    
                    nodeApi.announceCapability(poolcfg, cp)
                    if (cpsigner !== null) {
                        cp.oracleSignature = ""
                        const difficulty = cp.pow?.difficulty ?? 1
                        cp.pow = undefined
                        cp = await cpsigner(cp)
                        cp.pow = await powOverOracleCapability(cp, difficulty)
                    }
                    cp.seqNo++
                }))

                
            }, cfg.adInterval)
            return
        },
        pauseAdvertising: function (cfg: OracleCfg): Promise<void> {
            if (advertiser !== null) {
                clearInterval(advertiser)
                advertiser = null
            }
            return
        },
        upgradeOraclePow: async function (difficulty: number):  Promise<void> {
            id.pow = await powOverOracleId(id, difficulty)
        },
        upgradeCapabilityPow: async function (capabilityPubKey: string, difficulty: number):  Promise<void> {
            const cp = await storage.getCapability(capabilityPubKey)
            if (cp !== undefined && cp.oracleSignature !== undefined) {
                storage.updateCapabilityPow(capabilityPubKey, await powOverOracleCapability(cp, difficulty))
            }
        },
        addCapability: async function (cp: OracleBasicCapability):  Promise<void> {
            const pow: HashCashPow = {
                difficulty: 0,
                algorithm: "SHA256",
                hash: "",
                magicNo: 0
            }
            const capability: OracleCapability = {
                oraclePubKey: id.pubkey,
                capabilityPubKey: cp.capabilityPubKey,
                question: cp.question,
                seqNo: 0,
                cTTL: 0,
                oracleSignature: "",
                oracleSignatureType: "SHA256",
                pow
            }
            await storage.addCapability(capability)
        },
        deactivateCapability: async function (capabilityPubKey: string): Promise<void> {
            await storage.deactivateCapability(capabilityPubKey)
        },
        activateCapability: async function (capabilityPubKey: string): Promise<void> {
            await storage.activateCapability(capabilityPubKey)
        },
        dropCapability: async function (capabilityPubKey: string): Promise<void> {
            await storage.dropCapability(capabilityPubKey)
        },
        watchMyRankSample: function (subscriber: (event: OracleAd<MegaPeerT>) => Promise<void>): Promise<void> {
            adobserver = subscriber
            return
        },
        watchSignMyOracleBroadcasts: function (subscriber: (event: OracleId) => Promise<OracleId>): Promise<void> {
            signer = subscriber
            return
        },
        watchSignMyCapabilityBroadcasts: function (subscriber: (event: OracleCapability) => Promise<OracleCapability>):  Promise<void> {
            cpsigner = subscriber
            return
        }
    }
    
}
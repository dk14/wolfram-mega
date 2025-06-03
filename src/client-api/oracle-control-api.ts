import { Api, checkCapabilitySignature } from "../api"
import { OracleCapability, OracleId, Param, Answer, HashCashPow, PagingDescriptor } from "../protocol"
import { MempoolConfig } from "../config"
import { powOverOracleCapability, powOverOracleId } from "../pow"
import { ConnectionPool, ConnectionPoolCfg } from './connection-pool'
import { p2pNode } from "../p2p"


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
    adInterval: number
    adTopN: number
    dbPath: string
    httpPort: number
    wsPort: number
}

export interface CapabilityStorage<Query> {

    storeOracleAdSeqNo: (seqNo: number, pow: HashCashPow) => Promise<void>
    readOracleAdSeqNo: () => Promise<[number, HashCashPow]>

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
    id: () => Promise<OracleId>
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

export interface OraclePow {
    powOverOracleId: (o: OracleId, difficulty: number, algorithm: string) => Promise<HashCashPow>
    powOverOracleCapability: (cp: OracleCapability, difficulty: number, algorithm: string) => Promise<HashCashPow>
}

const defaultPow: OraclePow = {
    powOverOracleId,
    powOverOracleCapability
}

export function oracleControlApi<Query, MegaPeerT>(
    poolcfg: MempoolConfig<MegaPeerT>, 
    nodeApi: Api, storage: CapabilityStorage<Query>, 
    connections: ConnectionPool<MegaPeerT>, 
    concfg: ConnectionPoolCfg, pow: OraclePow = defaultPow): OracleControlAPI<MegaPeerT> {
   
    var id : OracleId = null
    var advertiser = null
    var signer: (event: OracleId) => Promise<OracleId> = null
    var cpsigner: (event: OracleCapability) => Promise<OracleCapability> = null
    var adobserver: (event: OracleAd<MegaPeerT>) => Promise<void> = null

    const signPowIncCp = async(cp: OracleCapability): Promise<OracleCapability> => {
        if (signer !== null) {
            cp.oracleSignature = ""
            const powsave = cp.pow
            cp.pow = undefined
            cp.seqNo++
            const signed = await cpsigner(cp)
            signed.pow = powsave
            return signed
        }
        
    }
    
    return {
        id: async function (): Promise<OracleId> {
            return id
        },
        startAdvertising: async function (cfg: OracleCfg): Promise<void> {
            if (advertiser !== null) {
                return
            }
            if (id === null) {
                id = {
                    pubkey: cfg.id.pubkey,
                    seqNo: (await storage.readOracleAdSeqNo())[0],
                    cTTL: 0,
                    pow: undefined,
                    bid: {amount: 0, proof: ""},
                    oracleSignature: "",
                    oracleSignatureType: cfg.id.oracleSignatureType,
                    manifestUri: cfg.id.manifestUri
                }
                if (await storage.readOracleAdSeqNo()[1] === undefined) {
                    id.pow = await pow.powOverOracleId(id, 0, "SHA256")
                } else {
                    id.pow = await storage.readOracleAdSeqNo()[1]
                }
                
            }
            
            advertiser = async () => {
                try {
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
                    id.seqNo++
                    await storage.storeOracleAdSeqNo(id.seqNo, id.pow)
    
                    if (signer !== null) {
                        id.oracleSignature = ""
                        id = await signer(id)
                    }
                    const res = await nodeApi.announceOracle(poolcfg, structuredClone(id))
                    if (res !== "success" && res !== "low pow difficulty") {
                        console.error(res  + " oraclepub=" + id.pubkey)
                    }
                    
                    if (p2pNode !== undefined) {
                        p2pNode.broadcastMessage('oracle', JSON.stringify(structuredClone(id)))
                    }
                    
                    
                    await Promise.all((await storage.listActiveCapabilities()).map(async cp => {
                        console.log("[advertise] CpPub = " + cp.capabilityPubKey)
                        if (cpsigner !== null) {
                            const signed = await signPowIncCp(cp)
                            storage.addCapability(signed)
                            const res = await nodeApi.announceCapability(poolcfg, signed)
                            if (res !== "success" && res !== "low pow difficulty" && !res.includes("no oracle")) {
                                console.error(res) + " cppub=" + cp.capabilityPubKey
                            }
                            if (p2pNode !== undefined) {
                                p2pNode.broadcastMessage('capability', JSON.stringify(structuredClone(signed)))
                            }
                        } else {
                            const unsigned = structuredClone(cp)
                            unsigned.pow.difficulty = 0
                            unsigned.seqNo++
                            cp.seqNo++
                            storage.addCapability(cp)
                            const res = await nodeApi.announceCapability(poolcfg, structuredClone(unsigned))
                            if (res !== "success" && res !== "low pow difficulty" && !res.includes("no oracle")) {
                                console.error(res + " _cppub=" + unsigned.capabilityPubKey)
                            }
                            if (p2pNode !== undefined) {
                                p2pNode.broadcastMessage('capability', JSON.stringify(structuredClone(unsigned)))
                            }
                        }
                        
                    }))

                } finally {
                    if (advertiser !== null) {
                        setTimeout(advertiser, cfg.adInterval)
                    }
                }    
            }
            await advertiser()
            return
        },
        pauseAdvertising: function (cfg: OracleCfg): Promise<void> {
            if (advertiser !== null) {
                advertiser = null
            }
            return
        },
        upgradeOraclePow: async function (difficulty: number):  Promise<void> {
            id.pow = await pow.powOverOracleId(id, difficulty, "SHA256")
        },
        upgradeCapabilityPow: async function (capabilityPubKey: string, difficulty: number):  Promise<void> {
            const cp = await storage.getCapability(capabilityPubKey)
            if (cp !== undefined) {
                storage.updateCapabilityPow(capabilityPubKey, await pow.powOverOracleCapability(cp, difficulty, "SHA256"))
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
                off: cp.off,
                params: cp.params,
                answers: cp.answers,
                endpoint: cp.endpoint,
                capabilitySignatureType: cp.capabilitySignatureType,
                seqNo: 0,
                cTTL: 0,
                oracleSignature: "",
                oracleSignatureType: "SHA256",
                pow
            }
            await storage.addCapability(capability)
        },
        deactivateCapability: async function (capabilityPubKey: string): Promise<void> {
            const cp = await storage.getCapability(capabilityPubKey)
            cp.off = true
            if (p2pNode !== undefined) {
                p2pNode.broadcastMessage('capability', JSON.stringify(structuredClone(await signPowIncCp(cp))))
            }
            await storage.deactivateCapability(capabilityPubKey)
        },
        activateCapability: async function (capabilityPubKey: string): Promise<void> {
            await storage.activateCapability(capabilityPubKey)
        },
        dropCapability: async function (capabilityPubKey: string): Promise<void> {
            const cp = await storage.getCapability(capabilityPubKey)
            cp.off = true
            if (p2pNode !== undefined) {
                p2pNode.broadcastMessage('capability', JSON.stringify(structuredClone(await signPowIncCp(cp))))
            }
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
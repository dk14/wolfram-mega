import { Api } from "../node"


export interface ConnectionPoolCfg {
    maxConnections: number
}

export interface ConnectionPool<MegaPeerT> {
    
    connected: (cfg: ConnectionPoolCfg, peer: MegaPeerT) => void

    connect: (cfg: ConnectionPoolCfg, peer: MegaPeerT) => boolean

    list: (cfg: ConnectionPoolCfg) =>  MegaPeerT[]

    getapi: (peer: MegaPeerT) => Api

    drop: (cfg: ConnectionPoolCfg, peer: MegaPeerT) => void

}
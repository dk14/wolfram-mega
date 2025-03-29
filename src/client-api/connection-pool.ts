import { Api } from "../node"


export interface ConnectionPoolCfg {
    maxConnections: number
}

export interface ConnectionPool<MegaPeerT> {
    
    list: (cfg: ConnectionPoolCfg) =>  MegaPeerT[]

    getapi: (peer: MegaPeerT) => Api

    drop: (cfg: ConnectionPoolCfg, peer: MegaPeerT) => void

}
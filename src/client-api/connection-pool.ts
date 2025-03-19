

interface ConnectionPoolCfg {
    maxConnections: number
}

interface ConnectionPool<MegaPeerT> {
    
    connected: (cfg: ConnectionPoolCfg, peer: MegaPeerT) => void

    connect: (cfg: ConnectionPoolCfg, peer: MegaPeerT) => boolean

    list: (cfg: ConnectionPoolCfg) =>  MegaPeerT[]

    drop: (cfg: ConnectionPoolCfg, peer: MegaPeerT) => void

}
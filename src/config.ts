import { OracleCfg } from "./client-api/oracle-control-api"
import { TraderCfg } from "./client-api/trader-api"
import { HashCashPow } from "./node"

interface FacilitatorId {
    websiteManifestUri?: string
    rewardAddress?: string
    facilitatorRewardIdPow?: HashCashPow // preimage is concat of reward addresses
}

export interface MempoolConfig<PeerAddrT> {
    maxMsgLength: number
    maxOracles: number
    maxCapabilities: number
    maxReports: number
    maxOffers?: number
    maxConnections: number
    httpPort: number
    p2pPort: number
    p2pseed: PeerAddrT[]
    hostSeqNo?: number
    hostname?: string
    facilitatorId?: FacilitatorId
    oracle? : OracleCfg
    trader?: TraderCfg
    lnRestHost?: string
    lnMacaroonPath?: string
    isTest: boolean
    p2pKeepAlive?: number
    ttlThreshold?: number
    peerAnnouncementQuota?: number
    p2pPortPublic?: number
    hostnamePublic?: string

}
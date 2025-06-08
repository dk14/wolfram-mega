import { Api, FacilitatorNode } from "../api";
import { OracleCapability, OracleId, Param, Answer, HashCashPow, PagingDescriptor } from "../protocol";
import { MempoolConfig } from "../config";
import { ConnectionPool } from './connection-pool';
import { Neighbor, PeerAddr } from "../p2p";
export interface OracleBasicIdentity {
    pubkey: string;
    oracleSignatureType: string;
    manifestUri?: string;
}
export interface OracleBasicCapability {
    capabilitySignatureType?: string;
    capabilityPubKey: string;
    question: string;
    off?: boolean;
    params?: Param[];
    answers?: Answer[];
    endpoint?: string;
}
export interface OracleCfg {
    id: OracleBasicIdentity;
    adInterval: number;
    adTopN: number;
    dbPath: string;
    httpPort: number;
    wsPort: number;
}
export interface CapabilityStorage<Query> {
    storeOracleAdSeqNo: (seqNo: number, pow: HashCashPow) => Promise<void>;
    readOracleAdSeqNo: () => Promise<[number, HashCashPow]>;
    addCapability: (cp: OracleCapability) => Promise<void>;
    deactivateCapability: (capabilityPubKey: string) => Promise<void>;
    activateCapability: (capabilityPubKey: string) => Promise<void>;
    dropCapability: (capabilityPubKey: string) => Promise<void>;
    getCapability: (capabilityPubKey: string) => Promise<OracleCapability | undefined>;
    listCapabilities: (query: Query, paging: PagingDescriptor) => Promise<OracleCapability[]>;
    listActiveCapabilities: () => Promise<OracleCapability[]>;
    updateCapabilityPow: (capabilityPubKey: string, pow: HashCashPow) => Promise<void>;
}
export interface OracleAd<MegaPeerT> {
    peer: MegaPeerT;
    rank: number;
}
export interface OracleControlAPI {
    id: () => Promise<OracleId>;
    startAdvertising: (cfg: OracleCfg) => Promise<void>;
    pauseAdvertising: (cfg: OracleCfg) => Promise<void>;
    upgradeOraclePow: (difficulty: number) => Promise<void>;
    upgradeCapabilityPow: (capabilityPubKey: string, difficulty: number) => Promise<void>;
    addCapability: (cp: OracleBasicCapability) => Promise<void>;
    deactivateCapability: (capabilityPubKey: string) => Promise<void>;
    activateCapability: (capabilityPubKey: string) => Promise<void>;
    dropCapability: (capabilityPubKey: string) => Promise<void>;
    watchMyRankSample: (subscriber: (event: OracleAd<PeerAddr>) => Promise<void>) => Promise<void>;
    watchSignMyOracleBroadcasts: (subscriber: (event: OracleId) => Promise<OracleId>) => Promise<void>;
    watchSignMyCapabilityBroadcasts: (subscriber: (event: OracleCapability) => Promise<OracleCapability>) => Promise<void>;
}
export interface OraclePow {
    powOverOracleId: (o: OracleId, difficulty: number, algorithm: string) => Promise<HashCashPow>;
    powOverOracleCapability: (cp: OracleCapability, difficulty: number, algorithm: string) => Promise<HashCashPow>;
}
export declare function oracleControlApi<Query, MegaPeerT>(poolcfg: MempoolConfig<MegaPeerT>, nodeApi: Api, storage: CapabilityStorage<Query>, p2pNode: FacilitatorNode<Neighbor>, pow?: OraclePow, connections?: ConnectionPool<PeerAddr>): OracleControlAPI;

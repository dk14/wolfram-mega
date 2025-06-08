import * as nd from './api';
import * as mega from './protocol';
import * as p2pjs from "peerjs";
import { MempoolConfig } from "./config";
import { ConnectionPool } from './client-api/connection-pool';
export type Socket = {
    remoteAddress?: string;
    remotePort?: number;
    dataConnection?: p2pjs.DataConnection;
};
export interface Event {
    command?: string;
    data?: Buffer;
    peer?: Peer;
}
export interface Peer {
    on: (ev: "message" | "connect" | "end", handler: (ev: Event) => void) => void;
    send: (cmd: string, msg: Buffer) => void;
    server: string;
    port: number;
    disconnect: () => void;
    connect: (addr: Socket) => void;
}
export interface PeerApi {
    createPeer: (server: string, port?: number, socket?: Socket) => Promise<Peer>;
    createServer: (cfg: MempoolConfig<PeerAddr>, discovered: (addr: PeerAddr, socket?: Socket) => void) => void;
}
export declare const serverPeerAPI: PeerApi;
export interface PeerAddr {
    server: string;
    port?: number;
    seqNo?: number;
    httpPort?: number;
}
export interface Neighbor {
    peer: Peer;
    addr: PeerAddr;
}
export declare var p2pNode: nd.FacilitatorNode<Neighbor> | undefined;
export declare var connectionPool: ConnectionPool<PeerAddr> | undefined;
export declare const startP2P: (cfg: MempoolConfig<PeerAddr>, peerApi?: PeerApi) => Promise<nd.FacilitatorNode<Neighbor>>;
export declare const remoteApi: (prefix: string) => {
    announceOracle: (cfg: MempoolConfig<any>, id: mega.OracleId) => Promise<("success" | "duplicate") | ("low pow difficulty" | "wrong signature" | "wrong pow" | "no oracle found" | ["invalid request", string])>;
    announceCapability: (cfg: MempoolConfig<any>, cp: mega.OracleCapability) => Promise<("success" | "duplicate") | ("low pow difficulty" | "wrong signature" | "wrong pow" | "no oracle found" | ["invalid request", string])>;
    reportMalleability: (cfg: MempoolConfig<any>, report: mega.Report) => Promise<("success" | "duplicate") | ("low pow difficulty" | "wrong signature" | "wrong pow" | "no oracle found" | ["invalid request", string])>;
    disputeMissingfactClaim: (dispute: mega.Dispute) => Promise<("success" | "duplicate") | (("low pow difficulty" | "wrong signature" | "wrong pow" | "no oracle found" | ["invalid request", string]) | "invalid fact" | "report not found" | "unknown")>;
    publishOffer: (cfg: MempoolConfig<any>, offer: mega.OfferMsg) => Promise<("success" | "duplicate") | ("low pow difficulty" | "wrong signature" | "wrong pow" | "no oracle found" | ["invalid request", string])>;
    lookupOracles: (paging: mega.PagingDescriptor) => Promise<mega.OracleId[]>;
    lookupCapabilities: (paging: mega.PagingDescriptor, oraclePub: string) => Promise<mega.OracleCapability[]>;
    lookupReports: (paging: mega.PagingDescriptor, oraclePub: string) => Promise<mega.Report[]>;
    lookupOffers: (paging: mega.PagingDescriptor, capabilityPubKey: string) => Promise<mega.OfferMsg[]>;
};

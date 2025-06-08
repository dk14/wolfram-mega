import { MempoolConfig } from "./config";
import { OracleId, OracleCapability, HashCashPow, Report, OfferMsg, Registered, NotRegistered, ReportAccepted, ReportRejected, Dispute, DisputeAccepted, DisputeRejected, PagingDescriptor } from './protocol';
export declare const createPemPub: (base64: string) => string;
export interface Api {
    announceOracle: (cfg: MempoolConfig<any>, id: OracleId) => Promise<Registered | NotRegistered>;
    announceCapability: (cfg: MempoolConfig<any>, cp: OracleCapability) => Promise<Registered | NotRegistered>;
    reportMalleability: (cfg: MempoolConfig<any>, report: Report) => Promise<ReportAccepted | ReportRejected>;
    disputeMissingfactClaim: (dispute: Dispute) => Promise<DisputeAccepted | DisputeRejected>;
    publishOffer: (cfg: MempoolConfig<any>, offer: OfferMsg) => Promise<Registered | NotRegistered>;
    lookupOracles: (paging: PagingDescriptor) => Promise<OracleId[]>;
    lookupCapabilities: (paging: PagingDescriptor, oraclePub: string) => Promise<OracleCapability[]>;
    lookupReports: (paging: PagingDescriptor, oraclePub: string) => Promise<Report[]>;
    lookupOffers: (paging: PagingDescriptor, capabilityPubKey: string) => Promise<OfferMsg[]>;
}
export interface FacilitatorNode<PeerT> {
    peers: PeerT[];
    discovered: (peer: PeerT) => Promise<void>;
    broadcastPeer: (peer: PeerT) => void;
    processApiRequest: (command: string, content: string) => Promise<void>;
    broadcastMessage: (command: string, content: string) => void;
}
export declare const checkPow: (pow: HashCashPow, preimage: string) => boolean;
export declare const checkCapabilitySignature: (cp: OracleCapability) => boolean;
export declare const checkOracleIdSignature: (o: OracleId) => boolean;
export declare const testOnlyReset: () => void;
export declare const api: Api;

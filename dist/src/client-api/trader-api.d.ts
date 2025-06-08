import { Api, FacilitatorNode } from "../api";
import { HashCashPow, OfferMsg, OracleCapability, OracleId, PagingDescriptor, Report } from "../protocol";
import { MempoolConfig } from "../config";
export interface TraderStorage<OracleQuery, CpQuery, RpQuery, MatchingQuery> {
    addOracle: (o: OracleId) => Promise<boolean>;
    addCp: (cp: OracleCapability) => Promise<boolean>;
    addReport: (r: Report) => Promise<boolean>;
    addIssuedReport: (r: Report) => Promise<boolean>;
    addOffer: (o: OfferMsg) => Promise<boolean>;
    addIssuedOffer: (o: OfferMsg) => Promise<boolean>;
    removeOracles: (pubkeys: string[]) => Promise<void>;
    removeCps: (pubkeys: string[]) => Promise<void>;
    removeReports: (pubkeys: string[]) => Promise<void>;
    removeOffers: (pubkeys: string[]) => Promise<void>;
    removeIssuedOffers: (pubkeys: string[]) => Promise<void>;
    removeIssuedReports: (pubkeys: string[]) => Promise<void>;
    allOracles: (q: OracleQuery, opredicate: (cp: OracleId) => Promise<boolean>, handler: (id: OracleId) => Promise<void>) => Promise<void>;
    allCps: (q: CpQuery, cppredicate: (cp: OracleCapability) => Promise<boolean>, handler: (id: OracleCapability) => Promise<void>) => Promise<void>;
    queryOracles: (q: OracleQuery, paging: PagingDescriptor) => Promise<OracleId[]>;
    queryCapabilities: (q: CpQuery, paging: PagingDescriptor) => Promise<OracleCapability[]>;
    queryOffers: (q: MatchingQuery, paging: PagingDescriptor) => Promise<OfferMsg[]>;
    queryReports: (q: RpQuery, paging: PagingDescriptor) => Promise<Report[]>;
    queryIssuedOffers: (q: MatchingQuery, paging: PagingDescriptor) => Promise<OfferMsg[]>;
    queryIssuedReports: (q: RpQuery, paging: PagingDescriptor) => Promise<Report[]>;
    allIssuedOffers: (handler: (o: OfferMsg) => Promise<void>) => Promise<void>;
    allIssuedReports: (handler: (r: Report) => Promise<void>) => Promise<void>;
}
export interface Collector<T> {
    type: 'OracleId' | 'OracleCapability' | 'Report' | 'OfferMsg';
    tag: string;
    active: boolean;
    predicate: (cp: T) => Promise<boolean>;
    cancel: () => Promise<void>;
    limit: number;
    count: () => number;
}
export type Predicate<T, X> = X extends boolean ? ((cp: T) => Promise<boolean>) : string;
export interface TraderApi<OracleQuery, CpQuery, PredType> {
    collectOracles: (tag: string, predicate: Predicate<OracleId, PredType>, limit: number) => Promise<Collector<OracleId>>;
    collectCapabilities: (tag: string, q: OracleQuery, opredicate: Predicate<OracleId, PredType>, predicate: Predicate<OracleCapability, PredType>, limit: number) => Promise<Collector<OracleCapability>>;
    collectReports: (tag: string, q: OracleQuery, opredicate: Predicate<OracleId, PredType>, predicate: Predicate<Report, PredType>, limit: number) => Promise<Collector<Report>>;
    collectOffers: (tag: string, q: CpQuery, cppredicate: Predicate<OracleCapability, PredType>, matchingPredicate: Predicate<OfferMsg, PredType>, limit: number) => Promise<Collector<OfferMsg>>;
    issueReport: (r: Report) => Promise<void>;
    issueOffer: (o: OfferMsg) => Promise<void>;
    startBroadcastingIssuedOffers: () => void;
    stopBroadcastingIssuedOffers: () => void;
    startBroadcastingIssuedReports: () => void;
    stopBroadcastingIssuedReports: () => void;
}
export interface TraderCfg {
    broadcastOfferCycle: number;
    broadcastReportCycle: number;
    collectOffersCycle: number;
    collectReportsCycle: number;
    collectOracleAdsCycle: number;
    collectOracleCpCycle: number;
    pageSize: number;
    maxOraclesPages: number;
    maxCpPages: number;
    maxReportsPages: number;
    maxOffersPages: number;
    maxCollectors: number;
    dbPath: string;
    httpPort: number;
    autoUpgradePowLimit?: number;
    heliosNetwork?: string;
    btcSignerEndpoint?: string;
    btcInteractiveSignerEndpoint?: string;
}
export interface TraderPow {
    powOverOffer: (offer: OfferMsg, difficulty: number, algorithm: string) => Promise<HashCashPow>;
    powOverReport: (r: Report, difficulty: number, algorithm: string) => Promise<HashCashPow>;
}
export declare function traderApi<OracleQuery, CpQuery, RpQuery, MatchingQuery, MegaPeerT, Neighbor>(tradercfg: TraderCfg, poolcfg: MempoolConfig<MegaPeerT>, nodeApi: Api, storage: TraderStorage<OracleQuery, CpQuery, RpQuery, MatchingQuery>, p2pNode: FacilitatorNode<Neighbor>, pow?: TraderPow): TraderApi<OracleQuery, CpQuery, boolean>;

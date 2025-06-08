import { TraderStorage } from '../trader-api';
import { OfferMsg, OracleCapability, OracleId, Report } from '../../protocol';
export interface TraderQuery<T> {
    where: (cp: T) => Promise<boolean>;
}
type TraderStorageT = TraderStorage<TraderQuery<OracleId>, TraderQuery<OracleCapability>, TraderQuery<Report>, TraderQuery<OfferMsg>>;
export declare const traderStorage: (path: string, pageSize: number) => TraderStorageT;
export {};

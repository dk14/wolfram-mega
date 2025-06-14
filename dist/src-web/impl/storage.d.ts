import { IDBPDatabase } from "idb";
import { OfferMsg, OracleCapability, OracleId, Report } from "../../src/protocol";
import { TraderStorage } from "../../src/client-api/trader-api";
export interface TraderQuery<T> {
    where: (cp: T) => Promise<boolean>;
}
export type Storage = TraderStorage<TraderQuery<OracleId>, TraderQuery<OracleCapability>, TraderQuery<Report>, TraderQuery<OfferMsg>>;
export declare const database: () => Promise<IDBPDatabase<unknown>>;
export declare const clearDb: () => Promise<void>;
export declare const indexDBstorage: (db: IDBPDatabase<unknown>) => Storage;

import { OfferMsg, OracleCapability } from "../src/protocol";
import { MatchingEngine, PreferenceModel } from "./models";
export declare const randomInt: (n: number) => number;
export declare const getOriginatorId: () => string;
export declare const checkOriginatorId: (id: string) => boolean;
export interface HashLockProvider {
    getHashLock: (o: OfferMsg) => Promise<string>;
    getHashUnLock: (o: OfferMsg) => Promise<string>;
}
export declare const hashLockProvider: HashLockProvider;
export declare const pickCps: (cfg: PreferenceModel) => Promise<OracleCapability[]>;
export declare const matchingEngine: MatchingEngine;
export declare function maxBy<T>(arr: T[], fn: (item: T) => number): T | undefined;

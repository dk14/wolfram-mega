import * as mega from './protocol';
export declare const powOverOracleId: (o: mega.OracleId, difficulty: number, algorithm?: string) => Promise<mega.HashCashPow>;
export declare const powOverOracleCapability: (cp: mega.OracleCapability, difficulty: number, algorithm?: string) => Promise<mega.HashCashPow>;
export declare const powOverReport: (r: mega.Report, difficulty: number, algorithm?: string) => Promise<mega.HashCashPow>;
export declare const powOverOffer: (offer: mega.OfferMsg, difficulty: number, algorithm?: string) => Promise<mega.HashCashPow>;

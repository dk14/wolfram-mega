import { TraderApi } from './src/client-api/trader-api';
import { OracleId, OracleCapability } from './src/protocol';
import { Api } from './src/api';
import * as btc from "./src/client-api/contracts/generate-btc-tx";
import { IDBPDatabase } from 'idb';
import { HashLockProvider, MatchingEngine } from './src-web/matching';
import { StalkingEngine } from './src-web/stalking';
import { TraderQuery, Storage } from './src-web/impl/storage';
export interface BtcApi {
    generateDlcContract: (params: btc.DlcParams) => Promise<btc.DlcContract>;
    generateChildDlcContract: (params: btc.ChildDlcParams) => Promise<btc.DlcContract>;
    generateClosingTransaction: (P: btc.ClosingParams) => Promise<btc.Hex>;
    generateCetRedemptionTransaction: (p: btc.CetRedemptionParams) => Promise<btc.Hex>;
}
declare global {
    interface Window {
        traderApi: TraderApi<TraderQuery<OracleId>, TraderQuery<OracleCapability>, boolean>;
        storage: Storage;
        btc: BtcApi;
        matching: MatchingEngine;
        stalking: StalkingEngine;
        txfee: number;
        pool: Api;
        spec: string;
        address: string;
        pubkey: string;
        privateDB: IDBPDatabase<unknown>;
        webOracleFacts: IDBPDatabase<unknown>;
        hashLockProvider: HashLockProvider;
        safeEval: (expression: string, parties: string[], bounds: [number, number][]) => Promise<any>;
        test: boolean;
    }
}

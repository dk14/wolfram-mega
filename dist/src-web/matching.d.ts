import { DependsOn, OfferMsg, OracleCapability } from "../src/protocol";
export declare const randomInt: (n: number) => number;
export type OfferStatus = 'matching' | 'accepted' | 'oracle committed' | 'signing' | 'opening tx available' | 'tx submitted' | 'outcome revealed' | 'redeem tx available' | 'redeemed';
export interface PreferenceModel {
    minOracleRank: number;
    tags: string[];
    txfee: number;
}
export interface CapabilityModel {
    capabilityPub: string;
    oracle?: string;
    endpoint?: string;
    params?: {
        [id: string]: string;
    };
    answer?: string;
}
export interface OfferModel {
    id: string;
    bet: [number, number];
    betOn?: boolean;
    oracles: CapabilityModel[];
    question: string;
    txid?: string;
    tx?: string;
    redemtion_txid?: string;
    redemtion_tx?: string;
    status: OfferStatus;
    blockchain: string;
    role: 'initiator' | 'acceptor';
    dependsOn?: DependsOn;
    orderId?: string;
    yesOutcomes?: string[];
    noOutcomes?: string[];
    ifPartyWins?: OfferModel;
    ifCounterPartyWins?: OfferModel;
    recurse?: boolean;
}
export interface MatchingEngine {
    pickOffer: (cfg: PreferenceModel) => Promise<OfferModel>;
    collectQuestions: (cfg: PreferenceModel) => Promise<string[]>;
    collectOffers: (cfg: PreferenceModel) => Promise<string[]>;
    generateOffer: (cfg: PreferenceModel) => Promise<OfferModel>;
    broadcastOffer: (o: OfferModel) => Promise<string>;
    acceptOffer: (o: OfferModel) => Promise<void>;
    listOrders: (limit: number) => Promise<OfferModel[]>;
    reset: () => Promise<void>;
}
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

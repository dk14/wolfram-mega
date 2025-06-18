export type OfferStatus = 'matching' | 'accepted' | 'oracle committed' | 'signing' | 'opening tx available' | 'tx submitted' | 'outcome revealed' | 'redeem tx available' | 'redeemed';
type Answer = string;
export interface DependsOn {
    outcome: Answer;
    orderId?: string;
}
export interface PreferenceModel {
    minOracleRank: number;
    tags: string[];
    txfee: number;
    preferBetsToGenerate?: [number[], number[]];
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
export type TxRaw = string;
export interface MatchingEngine {
    pickOffer: (cfg: PreferenceModel) => Promise<OfferModel>;
    collectQuestions: (cfg: PreferenceModel) => Promise<string[]>;
    collectOffers: (cfg: PreferenceModel) => Promise<string[]>;
    generateOffer: (cfg: PreferenceModel) => Promise<OfferModel>;
    broadcastOffer: (o: OfferModel) => Promise<string>;
    acceptOffer: (o: OfferModel) => Promise<void>;
    listOrders: (limit: number) => Promise<OfferModel[]>;
    removeOrder: (orderId: string) => Promise<void>;
    reset: () => Promise<void>;
    takeWinnings: (amount: number, destination: string, txfee: number) => Promise<TxRaw>;
    saveProfile: (cfg: PreferenceModel) => Promise<void>;
    loadProfile: () => Promise<PreferenceModel>;
}
export {};

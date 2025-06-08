import { OfferModel } from "./matching";
export declare class Dsl {
    private state;
    private template;
    private root;
    private cursor;
    private prev;
    private lastOutcome;
    private flag;
    pay(idx: 0 | 1, amount: number): void;
    private enrichAndProgress;
    private counter;
    private memoize;
    outcome(pubkey: string, yes: string[], no: string[]): boolean;
    private next;
    private body;
    constructor(body: (dsl: Dsl) => Promise<void>);
    private protect;
    static readonly Party = 0;
    static readonly CounterParty = 1;
    static readonly Alice = 0;
    static readonly Bob = 1;
    private collateral;
    private budgetBound;
    private filterLeafs;
    private multiparty;
    private selected;
    private isSelected0;
    private isSelected1;
    multiple: (...parties: string[]) => this;
    party: (party: string) => {
        pays: (counterparty: string) => (amount: number) => void;
    };
    private multiflag;
    enumerateWithBoundMulti(collateralBound: number): Promise<[string, string, OfferModel][]>;
    enumerateWithBound(collateralBound: number): Promise<OfferModel>;
}

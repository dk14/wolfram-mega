import { OfferModel } from "./matching";
type Handler = {
    pay: (idx: 0 | 1, amount: number) => void;
    party: (party: string) => ({
        pays: (counterparty: string) => ({
            amount: (amount: number) => void;
        });
    });
};
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
        pays: (counterparty: string) => {
            amount: (amount: number) => void;
        };
    };
    numeric: {
        outcome: (pubkey: string, from: number, to: number, step?: number) => {
            enumerate: (handler: (n: number) => void) => void;
            enumerateWithAccount: (payhandler: (h: Handler, n: number) => void) => void;
        };
    };
    set: {
        outcome: (pubkey: string, set: string[]) => {
            enumerate: (handler: (n: string) => void) => void;
            enumerateWithAccount: (payhandler: (h: Handler, n: string) => void) => void;
        };
        outcomeT: <T>(pubkey: string, set: T[], renderer: (x: T) => string, parser: (s: string) => T) => {
            enumerate: (handler: (n: T) => void) => void;
            enumerateWithAccount: (payhandler: (h: Handler, n: T) => void) => void;
        };
    };
    if: (pubkey: string, yes: string[], no: string[]) => {
        then: (handler: (handle: Handler) => void) => {
            else: (handler: (handle: Handler) => void) => void;
        };
    };
    private multiflag;
    enumerateWithBoundMulti(collateralBound: number): Promise<[string, string, OfferModel][]>;
    enumerateWithBound(collateralBound: number): Promise<OfferModel>;
}
export {};

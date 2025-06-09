import { OfferModel } from "./matching";
type PaymentHandler = {
    pay: (idx: 0 | 1, amount: number) => void;
    party: (party: string) => ({
        pays: (counterparty: string) => ({
            amount: (amount: number) => void;
        });
    });
    release?: () => void;
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
    private checked;
    outcome(pubkey: string, yes: string[], no: string[], args?: {
        [id: string]: string;
    }): boolean;
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
    private leafsFiltered;
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
    private unfinalized;
    numeric: {
        outcome: (pubkey: string, from: number, to: number, step?: number, args?: {
            [id: string]: string;
        }) => {
            evaluate: (handler: (n: number) => void) => void;
            evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: number) => void) => void;
            value: () => number;
            valueWithPaymentCtxUnsafe: () => [number, PaymentHandler];
        };
    };
    set: {
        outcome: (pubkey: string, set: string[], args?: {
            [id: string]: string;
        }) => {
            evaluate: (handler: (n: string) => void) => void;
            evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: string) => void) => void;
            value: () => string;
            valueWithPaymentCtxUnsafe: () => [string, PaymentHandler];
        };
        outcomeT: <T>(pubkey: string, set: T[], renderer: (x: T) => string, parser: (s: string) => T, args?: {
            [id: string]: string;
        }) => {
            evaluate: (handler: (n: T) => void) => void;
            evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: T) => void) => void;
            value: () => T;
            valueWithPaymentCtxUnsafe: () => [T, PaymentHandler];
        };
    };
    if: (pubkey: string, yes: string[], no: string[], args?: {
        [id: string]: string;
    }) => {
        then: (handler: (handle: PaymentHandler) => void) => {
            else: (handler: (handle: PaymentHandler) => void) => void;
        };
    };
    private multiflag;
    enumerateWithBoundMulti(collateralBound: number): Promise<[string, string, OfferModel][]>;
    enumerateWithBound(collateralBound: number): Promise<OfferModel>;
}
export {};

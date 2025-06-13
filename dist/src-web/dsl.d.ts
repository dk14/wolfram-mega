import { OfferModel } from "./matching";
type PaymentHandler = {
    pay: (idx: 0 | 1, amount: number) => void;
    party: (partyName: string, partyAsset?: string) => ({
        pays: (counterpartyName: string, counterpartyAsset?: string) => ({
            amount: (amount: number, asset?: string) => void;
        });
    });
    release?: () => void;
};
export declare const evaluatePartyCollateral: (o?: OfferModel) => Promise<number>;
export declare const evaluateCounterPartyCollateral: (o?: OfferModel) => Promise<number>;
export declare namespace DslErrors {
    class PerfectHedgeError extends Error {
        state: {
            [pubkey: string]: [number, boolean];
        };
        amount: number;
        partyIdx: 0 | 1;
        pair: [string, string];
        constructor(msg: string, st: {
            [pubkey: string]: [number, boolean];
        }, amount: number, partyIdx: 0 | 1, pair: [string, string]);
    }
    class InfinityError<ST> extends Error {
        state: ST;
        constructor(msg: string, st: ST);
    }
    class InfinityCountError extends Error {
    }
    class PartyAtAdvantage extends Error {
        amount: number;
        partyIdx: 0 | 1;
        pair: [string, string];
        constructor(msg: string, amount: number, partyIdx: 0 | 1, pair: [string, string]);
    }
}
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
    }, allowTruth?: boolean, strict?: boolean): boolean;
    private next;
    private body;
    constructor(body: (dsl: Dsl) => Promise<void>);
    private protect;
    static readonly Party = 0;
    static readonly CounterParty = 1;
    static readonly Alice = 0;
    static readonly Bob = 1;
    private collateral1;
    private collateral2;
    private budgetBound1;
    private budgetBound2;
    private leafsFiltered;
    private filterLeafs;
    private multiparty;
    private selected;
    private isSelected0;
    private isSelected1;
    multiple: (...parties: string[]) => this;
    party: (partyName: string, partyAsset?: string) => {
        pays: (counterpartyName: string, counterpartyAsset?: string) => {
            amount: (amount: number, asset?: string) => void;
        };
    };
    static account(partyName: string, partyAsset: string): string;
    private unfinalized;
    private static track;
    static recurse: {
        bounded: <U>(fn: () => U) => {
            attempts: (attempts: number) => {
                otherwiseYield: (defaultValue: U) => (() => U);
            };
        };
    };
    strictlyFair: boolean;
    unsafe: {
        if: (pubkey: string, yes: string[], no: string[], args?: {
            [id: string]: string;
        }, allowSwaps?: boolean, allowMisplacedPay?: boolean, strict?: boolean) => {
            then: (handler: (handle: PaymentHandler) => void) => {
                else: (handler: (handle: PaymentHandler) => void) => void;
            };
        };
        numeric: {
            outcome: (pubkey: string, from: number, to: number, step?: number, args?: {
                [id: string]: string;
            }, allowMisplacedPay?: boolean, allowReplacedPay?: boolean) => {
                evaluate: (handler: (n: number) => void) => void;
                evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: number) => void) => void;
                value: () => number;
                valueWithPaymentCtxUnsafe: () => [number, PaymentHandler];
            };
        };
        set: {
            outcome: (pubkey: string, set: string[], args?: {
                [id: string]: string;
            }, allowMisplacedPay?: boolean, allowReplacedPay?: boolean) => {
                evaluate: (handler: (n: string) => void) => void;
                evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: string) => void) => void;
                value: () => string;
                valueWithPaymentCtxUnsafe: () => [string, PaymentHandler];
            };
            outcomeT: <T>(pubkey: string, set: T[], renderer: (x: T) => string, parser: (s: string) => T, args?: {
                [id: string]: string;
            }, allowMisplacedPay?: boolean, allowReplacedPay?: boolean) => {
                evaluate: (handler: (n: T) => void) => void;
                evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: T) => void) => void;
                value: () => T;
                valueWithPaymentCtxUnsafe: () => [T, PaymentHandler];
            };
        };
        ifAtomicSwapLeg1: (lock?: string, unlockOutcome?: string, allowMisplacedPay?: boolean) => {
            then: (handler: (handle: PaymentHandler) => void) => {
                else: (handler: (handle: PaymentHandler) => void) => void;
            };
        };
        outcome: (pubkey: string, yes: string[], no: string[], args?: {
            [id: string]: string;
        }, allowTruth?: boolean, strict?: boolean) => boolean;
    };
    infinity: {
        move: <T>(x: T) => T;
        stop: any;
        bounded: <T>(maxInfinity: T, maxCount?: number) => {
            compare: (cmp: (a: T, b: T) => number) => {
                progress: (start: T, forward: (x: T) => T) => {
                    perpetual: <ST>(init: ST, step: (x: T, st: ST) => ST) => void;
                };
            };
        };
    };
    numeric: {
        infinity: {
            bounded: (maxInfinity?: number, maxCount?: number) => {
                progress: (start: number, forward?: (x: number) => number) => {
                    perpetual: <T>(init: T, step: (x: number, st: T) => T) => void;
                };
                perpetual: <T>(init: T, step: (x: number, st: T) => T) => void;
            };
        };
        outcome: (pubkey: string, from: number, to: number, step?: number, args?: {
            [id: string]: string;
        }, allowMisplacedPay?: boolean, allowReplacedPay?: boolean) => {
            evaluate: (handler: (n: number) => void) => void;
            evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: number) => void) => void;
            value: () => number;
            valueWithPaymentCtxUnsafe: () => [number, PaymentHandler];
        };
    };
    set: {
        outcome: (pubkey: string, set: string[], args?: {
            [id: string]: string;
        }, allowMisplacedPay?: boolean, allowReplacedPay?: boolean) => {
            evaluate: (handler: (n: string) => void) => void;
            evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: string) => void) => void;
            value: () => string;
            valueWithPaymentCtxUnsafe: () => [string, PaymentHandler];
        };
        outcomeT: <T>(pubkey: string, set: T[], renderer: (x: T) => string, parser: (s: string) => T, args?: {
            [id: string]: string;
        }, allowMisplacedPay?: boolean, allowReplacedPay?: boolean) => {
            evaluate: (handler: (n: T) => void) => void;
            evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: T) => void) => void;
            value: () => T;
            valueWithPaymentCtxUnsafe: () => [T, PaymentHandler];
        };
    };
    if: (pubkey: string, yes: string[], no: string[], args?: {
        [id: string]: string;
    }, allowSwaps?: boolean, allowMisplacedPay?: boolean, strict?: boolean) => {
        then: (handler: (handle: PaymentHandler) => void) => {
            else: (handler: (handle: PaymentHandler) => void) => void;
        };
    };
    ifAtomicSwapLeg1(lock?: string, unlockOutcome?: string, allowMisplacedPay?: boolean): {
        then: (handler: (handle: PaymentHandler) => void) => {
            else: (handler: (handle: PaymentHandler) => void) => void;
        };
    };
    private multiflag;
    enumerateWithBoundMulti(collateralBounds: [number, number][]): Promise<[string, string, OfferModel][]>;
    enumerateWithBound(collateralBound1: number, collateralBound2: number): Promise<OfferModel>;
}
export {};

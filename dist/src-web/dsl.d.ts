import { OfferModel } from "./models";
type PaymentHandler = {
    pay: (idx: 0 | 1, amount: number) => void;
    party: (partyName: string, partyAsset?: string) => ({
        pays: (counterpartyName: string, counterpartyAsset?: string) => ({
            amount: (amount: number, asset?: string) => void;
        });
    });
    release?: () => void;
};
type PerpetualAsset = string;
type PerpetualCashFlow = {
    from: [string, PerpetualAsset?];
    to: [string, PerpetualAsset?];
    amount: [number, PerpetualAsset?];
};
type PerpetualState<T> = {
    [party: string]: T;
};
type PerpetualUpdate<T> = [PerpetualState<T>, PerpetualCashFlow[]];
export declare const evaluatePartyCollateral: (o?: OfferModel) => Promise<number>;
export declare const evaluateCounterPartyCollateral: (o?: OfferModel) => Promise<number>;
export declare const evaluateMaxAmountOfTxNoOptimization: (o?: OfferModel) => Promise<number>;
export declare namespace DslErrors {
    class PerfectHedgeError extends Error {
        state: {
            [pubkey: string]: [number, boolean, any];
        };
        amount: number;
        partyIdx: 0 | 1;
        pair: [string, string];
        constructor(msg: string, st: {
            [pubkey: string]: [number, boolean, any];
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
    class OnePayPerCondition extends Error {
        amount: number;
        partyIdx: 0 | 1;
        pair: [string, string];
        state: {
            [pubkey: string]: [number, boolean, any];
        };
        constructor(msg: string, amount: number, partyIdx: 0 | 1, pair: [string, string], state: {
            [pubkey: string]: [number, boolean, any];
        });
    }
    class ComplexConditions extends Error {
        amount: number;
        partyIdx: 0 | 1;
        pair: [string, string];
        constructor(msg: string, amount: number, partyIdx: 0 | 1, pair: [string, string]);
    }
    class SafeModeError extends Error {
    }
    class EmptyDslOutput extends Error {
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
    private alicePayCounter;
    private bobPayCounter;
    private aliceTrackers;
    private bobTrackers;
    pay(idx: 0 | 1, amount: number): void;
    currentPub: string;
    currentArgs: {
        [id: string]: string;
    };
    private enrichAndProgress;
    private counter;
    private memoize;
    private checked;
    superMode: boolean;
    safeMode: boolean;
    megaMode: boolean;
    private safeModeStarted;
    private megaModeStarted;
    private superModeStarted;
    private fairModeStarted;
    private strictModeStarted;
    security: {
        startSafeMode: () => void;
        startMegaMode: () => void;
        startSuperMode: () => void;
        startFairMode: () => void;
        startStrictMode: () => void;
    };
    insecurity: {
        open: {
            disableSafeMode: () => void;
            disableMegaMode: () => void;
            disableSuperMode: () => void;
        };
        close: {
            reEnableSafeMode: () => void;
            reEnableMegaMode: () => void;
            reEnableSuperMode: () => void;
        };
    };
    strictlyOneLeafPays: boolean;
    strictlyOneLeafPairPays: boolean;
    flagSameAssetSwap: boolean;
    outcome(pubkey: string, yes: string[], no: string[], args?: {
        [id: string]: string;
    }, allowTruth?: boolean, strict?: boolean, ignoreObserveChecksSuperUnsafe?: boolean): boolean;
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
    strictlyStrict: boolean;
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
    static mutual(...parties: string[]): string;
    static refund(party: string): string;
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
    private unssafeInifnityCtx;
    atomicSwap: {
        ifTruth: (lock?: string, unlockOutcome?: string, args?: {
            [id: string]: string;
        }, allowMisplacedPay?: boolean) => {
            then: (handler: (handle: PaymentHandler) => void) => {
                else: (handler: (handle: PaymentHandler) => void) => void;
            };
        };
        truth: (lock?: string, unlockOutcome?: string, args?: {
            [id: string]: string;
        }) => boolean;
    };
    unsafe: {
        if: (pubkey: string, yes: string[], no: string[], args?: {
            [id: string]: string;
        }, allowSwaps?: boolean, allowMisplacedPay?: boolean, strict?: boolean, ignoreObserveChecksSuperUnsafe?: boolean) => {
            then: (handler: (handle: PaymentHandler) => void) => {
                else: (handler: (handle: PaymentHandler) => void) => void;
            };
        };
        numeric: {
            outcome: (pubkey: string, from: number, to: number, step?: number, args?: {
                [id: string]: string;
            }, allowMisplacedPay?: boolean, allowUnsafe?: boolean, ignoreObserveChecksSuperUnsafe?: boolean) => {
                evaluate: (handler: (n: number) => void) => void;
                evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: number) => void) => void;
                value: () => number;
                valueWithPaymentCtxUnsafe: () => [number, PaymentHandler];
            };
            infinity: {
                bounded: (maxInfinity?: number, maxCount?: number) => {
                    progress: (start: number, forward?: (x: number) => number) => {
                        perpetual: <T>(init: PerpetualState<T>, step: (x: number, st: PerpetualState<T>) => PerpetualUpdate<T>) => void;
                    };
                    perpetual: <T>(init: PerpetualState<T>, step: (x: number, st: PerpetualState<T>) => PerpetualUpdate<T>) => void;
                };
            };
        };
        set: {
            outcome: (pubkey: string, set: string[], args?: {
                [id: string]: string;
            }, allowMisplacedPay?: boolean, allowUnsafe?: boolean) => {
                evaluate: (handler: (n: string) => void) => void;
                evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: string) => void) => void;
                value: () => string;
                valueWithPaymentCtxUnsafe: () => [string, PaymentHandler];
            };
            outcomeT: <T>(pubkey: string, set: T[], renderer: (x: T) => string, args?: {
                [id: string]: string;
            }, allowMisplacedPay?: boolean, allowUnsafe?: boolean) => {
                evaluate: (handler: (n: T) => void) => void;
                evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: T) => void) => void;
                value: () => T;
                valueWithPaymentCtxUnsafe: () => [T, PaymentHandler];
            };
        };
        outcome: (pubkey: string, yes: string[], no: string[], args?: {
            [id: string]: string;
        }, allowTruth?: boolean, strict?: boolean, ignoreObserveChecksSuperUnsafe?: boolean) => boolean;
        infinity: {
            move: <T>(x: T) => T;
            stop: <T>(cashflows: T) => [any, T];
            bounded: <T>(maxInfinity: T, maxCount?: number) => {
                compare: (cmp: (a: T, b: T) => number) => {
                    progress: (start: T, forward: (x: T) => T) => {
                        perpetual: <ST>(init: PerpetualState<ST>, step: (x: T, st: PerpetualState<ST>) => PerpetualUpdate<ST>) => void;
                    };
                };
            };
        };
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
    bool: {
        safe: {
            outcome: (pubkey: string, yes: string, no: string, args?: {
                [id: string]: string;
            }) => boolean;
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
        safe: {
            outcome: (pubkey: string, yes: number, no: number, args?: {
                [id: string]: string;
            }) => number;
            if: (pubkey: string, yes: number, no: number, args?: {
                [id: string]: string;
            }, allowSwaps?: boolean, allowMisplacedPay?: boolean, strict?: boolean) => {
                then: (handler: (v: number, p: PaymentHandler) => void) => {
                    else: (handler: (v: number, p: PaymentHandler) => void) => void;
                };
            };
        };
        outcome: (pubkey: string, from: number, to: number, step?: number, args?: {
            [id: string]: string;
        }, allowMisplacedPay?: boolean, allowUnsafe?: boolean, ignoreObserveChecksSuperUnsafe?: boolean) => {
            evaluate: (handler: (n: number) => void) => void;
            evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: number) => void) => void;
            value: () => number;
            valueWithPaymentCtxUnsafe: () => [number, PaymentHandler];
        };
    };
    set: {
        safe: {
            outcome: (pubkey: string, yes: string, no: string, args?: {
                [id: string]: string;
            }, allowMisplacedPay?: boolean) => string;
            outcomeT: <T1, T2>(pubkey: string, yes: T1, no: T2, renderer?: (x: T1 | T2) => string, args?: {
                [id: string]: string;
            }) => T1 | T2;
            if: (pubkey: string, yes: string, no: string, args?: {
                [id: string]: string;
            }) => {
                then: (handler: (v: string, p: PaymentHandler) => void) => {
                    else: (handler: (v: string, p: PaymentHandler) => void) => void;
                };
            };
            ifT: <T1, T2>(pubkey: string, yes: T1, no: T2, renderer?: (x: T1 | T2) => string, args?: {
                [id: string]: string;
            }) => {
                then: (handler: (v: T1, p: PaymentHandler) => void) => {
                    else: (handler: (v: T2, p: PaymentHandler) => void) => void;
                };
            };
        };
        outcome: (pubkey: string, set: string[], args?: {
            [id: string]: string;
        }, allowMisplacedPay?: boolean, allowUnsafe?: boolean) => {
            evaluate: (handler: (n: string) => void) => void;
            evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: string) => void) => void;
            value: () => string;
            valueWithPaymentCtxUnsafe: () => [string, PaymentHandler];
        };
        outcomeT: <T>(pubkey: string, set: T[], renderer: (x: T) => string, args?: {
            [id: string]: string;
        }, allowMisplacedPay?: boolean, allowUnsafe?: boolean) => {
            evaluate: (handler: (n: T) => void) => void;
            evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: T) => void) => void;
            value: () => T;
            valueWithPaymentCtxUnsafe: () => [T, PaymentHandler];
        };
    };
    assert: {
        sum: {
            budget: (amount: number) => void;
            parties: (party1: string, party2: string) => {
                budget: (amount: number) => void;
            };
        };
        budget: (idx: 0, amount: number) => void;
        parties: (party1: string, party2: string) => {
            budget: (idx: 0, amount: number) => void;
        };
    };
    disablePartyRoleReversal: boolean;
    if: (pubkey: string, yes: string[], no: string[], args?: {
        [id: string]: string;
    }, allowSwaps?: boolean, allowMisplacedPay?: boolean, strict?: boolean, ignoreObserveChecksSuperUnsafe?: boolean) => {
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

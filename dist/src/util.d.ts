export declare const hash: (msg: string, algo?: string) => string;
export interface Magic {
    magicNo: number;
    magicString?: string;
    hash: string;
}
export declare const mine: (difficulty: number, preimage: string, algorithm: string) => Magic;
export declare function isBrowser(): boolean;

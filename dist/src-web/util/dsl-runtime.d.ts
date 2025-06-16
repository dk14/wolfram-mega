declare global {
    interface Window {
        evalDiscreet: (expression: string, parties: string[], bounds: [number, number][]) => Promise<any>;
    }
}
export declare const evalDiscreet: (expression: string, parties: string[], bounds: [number, number][]) => Promise<any>;

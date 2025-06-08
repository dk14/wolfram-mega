import { OracleDataProvider } from "./oracle-data-provider";
import { ContractInterpreter } from "./transactions";
export interface StalkingEngine {
    trackIssuedOffers: (interpreters: {
        [id: string]: ContractInterpreter;
    }, dataProvider: OracleDataProvider) => Promise<void>;
}
export declare const stalkingEngine: StalkingEngine;

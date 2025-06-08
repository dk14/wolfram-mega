import { Commitment, Fact, FactRequest } from "../src/protocol";
export interface OracleDataProvider {
    getCommitment: (endpoint: string, req: FactRequest) => Promise<Commitment>;
    getFact: (endpoint: string, c: Commitment) => Promise<Fact>;
}
export declare const webOracle: import("../src/client-api/oracle-endpoint-api").OracleEndpointApi;
export declare const dataProvider: OracleDataProvider;

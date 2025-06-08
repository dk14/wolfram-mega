import { OracleEndpointApi } from '../oracle-endpoint-api';
import { OracleCapability, FactRequest, Commitment } from '../../protocol';
export interface LookUp {
    getFact: (fr: FactRequest) => Promise<string>;
    checkCommitment: (c: FactRequest) => Promise<boolean>;
    newCp?: (q: string) => Promise<OracleCapability>;
    genContract?: (c: FactRequest) => Promise<string>;
}
type Signer = (msg: [Commitment, string]) => Promise<string>;
export declare const webSigner: Signer;
export declare const webLookup: LookUp;
export declare const endpointAPi: (signerFactory: () => Signer, lookup: LookUp) => OracleEndpointApi;
export declare const startHttp: (api: OracleEndpointApi, port: number) => void;
export {};

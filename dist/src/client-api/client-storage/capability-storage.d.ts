import { CapabilityStorage } from '../oracle-control-api';
import { OracleCapability } from '../../protocol';
export interface CapabilityQuery {
    where: (cp: OracleCapability) => Promise<boolean>;
}
export declare const capabilityStorage: (path: string, pageSize: number, activeCpLimit: number) => CapabilityStorage<CapabilityQuery>;

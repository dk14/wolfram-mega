import { TraderApi } from "../../src/client-api/trader-api";
import { OracleCapability, OracleId } from "../../src/protocol";
import { TraderQuery } from "./storage";
export declare const traderApiRemote: TraderApi<string, string, string>;
export declare const traderApiRemoteAdapted: TraderApi<TraderQuery<OracleId>, TraderQuery<OracleCapability>, boolean>;

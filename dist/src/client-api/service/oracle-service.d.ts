import { MempoolConfig } from "../../config";
import { PeerAddr } from "../../p2p";
import { CapabilityQuery } from "../client-storage/capability-storage";
export declare const startOracleService: (cfg: MempoolConfig<PeerAddr>, storage?: import("../oracle-control-api").CapabilityStorage<CapabilityQuery>) => void;

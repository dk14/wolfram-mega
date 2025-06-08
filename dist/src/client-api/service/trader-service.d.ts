import { MempoolConfig } from "../../config";
import { OracleId, OracleCapability } from "../../protocol";
import { PeerAddr } from "../../p2p";
import { TraderQuery } from "../client-storage/trader-storage";
export declare const startTraderService: (cfg: MempoolConfig<PeerAddr>, storage?: import("../trader-api").TraderStorage<TraderQuery<OracleId>, TraderQuery<OracleCapability>, TraderQuery<import("../../protocol").Report>, TraderQuery<import("../../protocol").OfferMsg>>) => void;

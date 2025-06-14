import { MempoolConfig } from "./src/config";
import { OfferMsg } from "./src/protocol";
import { FacilitatorNode } from './src/api';
import { Neighbor } from "./src/p2p";
export declare const cfg: MempoolConfig<any>;
export declare const testOfferMsg: OfferMsg;
export declare const configureWebMocks: () => Promise<void>;
export declare const nodeMock: FacilitatorNode<Neighbor>;

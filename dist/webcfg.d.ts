import { MempoolConfig } from "./src/config";
import { FacilitatorNode } from './src/api';
import { Neighbor } from "./src/p2p";
export declare const cfg: MempoolConfig<any>;
export declare const configureWebMocks: () => Promise<void>;
export declare const nodeMock: FacilitatorNode<Neighbor>;

import {startP2P} from './p2p';
import {startHttp} from './rest';

console.log("Start HTTP service...")
startHttp()
console.log("Start P2P service...")
startP2P()
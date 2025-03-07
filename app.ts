import {sttartP2P} from './p2p';
import {startHttp} from './rest';

console.log("Start HTTP service...")
startHttp()
console.log("Start P2P service...")
sttartP2P()
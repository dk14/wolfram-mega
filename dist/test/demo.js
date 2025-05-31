"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const wait_on_1 = __importDefault(require("wait-on"));
const fs = __importStar(require("fs"));
const http = __importStar(require("http"));
const httpProxy = __importStar(require("http-proxy"));
const http_proxy_rules_1 = __importDefault(require("http-proxy-rules"));
const getcfg = (path) => {
    try {
        return JSON.parse(fs.readFileSync(__dirname + '/' + path).toString());
    }
    catch {
        return JSON.parse(fs.readFileSync(path).toString());
    }
};
const cfg = getcfg(process.argv[2] ?? "cfg/demo.json");
(async () => {
    const waitFor = (resources) => {
        const opts = { resources };
        return new Promise((resolve, reject) => (0, wait_on_1.default)(opts, err => !err ? resolve(0) : reject(err)));
    };
    const peer = (0, child_process_1.spawn)("npm", ["run", "peer", cfg.mempoolCfg]);
    peer.stderr.on('error', async function (data) {
        console.log("[PEER-ERROR]" + data);
    });
    peer.stdout.on('data', async function (data) {
        console.log("[PEER]" + data);
    });
    console.log("########## Wait for peer..." + getcfg(cfg.mempoolCfg).httpPort);
    await waitFor(['http-get://localhost:' + getcfg(cfg.mempoolCfg).httpPort + '/id']);
    const endpoint = (0, child_process_1.spawn)("npm", ["run", "mock-oracle", cfg.mockOracleCfg]);
    endpoint.stderr.on('error', async function (data) {
        console.log("[ENDPOINT-ERROR]" + data);
    });
    endpoint.stdout.on('data', async function (data) {
        console.log("[ENDPOINT]" + data);
    });
    console.log("##########  Wait for endpoint http..." + getcfg("../src/client-api/utils/" + cfg.mockOracleCfg).httpPort);
    await waitFor(['tcp:localhost:' + getcfg("../src/client-api/utils/" + cfg.mockOracleCfg).httpPort]);
    console.log("########## Wait for endpoint ws..." + getcfg("../src/client-api/utils/" + cfg.mockOracleCfg).wsPort);
    await waitFor(['tcp:localhost:' + getcfg("../src/client-api/utils/" + cfg.mockOracleCfg).wsPort]);
    console.log("########## Starting signers...");
    const signer = (0, child_process_1.spawn)("npm", ["run", "auto-signer", cfg.signerCfg]);
    signer.stderr.on('error', async function (data) {
        console.log("[SIGNER-ERROR]" + data);
    });
    signer.stdout.on('data', async function (data) {
        console.log("[SIGNER]" + data);
    });
    const btcSigner = (0, child_process_1.spawn)("npm", ["run", "btc-signer", cfg.btcSignerCfg]);
    btcSigner.stderr.on('error', async function (data) {
        console.log("[BTC-SIGNER-ERROR]" + data);
    });
    btcSigner.stdout.on('data', async function (data) {
        console.log("[BTC-SIGNER]" + data);
    });
    console.log("########## STARTED!!!!!");
    const cleanUp = async () => {
        console.log("Exiting...");
        peer.kill(9);
        endpoint.kill(9);
        signer.kill(9);
        btcSigner.kill(9);
    };
    process.on('uncaughtException', async function (err) {
        console.log(err);
    });
    process.on('exit', cleanUp);
    process.on('SIGINT', cleanUp);
    process.on('SIGUSR1', cleanUp);
    process.on('SIGUSR2', cleanUp);
    // none of this should be exposed to public in prod!
    console.log("Starting proxy..." + cfg.httpPort);
    const proxyRules = new http_proxy_rules_1.default({
        rules: {
            '/peer-monitor/(.*)': `http://localhost:${getcfg(cfg.mempoolCfg).httpPort}/$1`,
            '/oracle-admin/(.*)': `http://localhost:${getcfg(cfg.mempoolCfg).oracle.httpPort}/$1`,
            '/oracle-endpoint/(.*)': `http://localhost:${getcfg("../src/client-api/utils/" + cfg.mockOracleCfg).httpPort}/$1`,
            '/trader-console/(.*)': `http://localhost:${getcfg(cfg.mempoolCfg).trader.httpPort}/$1`,
        },
        default: 'http://localhost:${getcfg(cfg.mempoolCfg).trader.httpPort}/' // default target
    });
    // Create reverse proxy instance
    const proxy = httpProxy.createProxy();
    http.createServer(function (req, res) {
        const target = proxyRules.match(req);
        if (target) {
            return proxy.web(req, res, {
                target: target
            });
        }
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('The request url and path did not match any of the listed rules!');
    }).listen(cfg.httpPort);
})();
//# sourceMappingURL=demo.js.map
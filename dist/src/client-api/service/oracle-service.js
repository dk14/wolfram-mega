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
exports.startOracleService = void 0;
const node_1 = require("../../node");
const p2p_1 = require("../../p2p");
const capability_storage_1 = require("../client-storage/capability-storage");
const oracle_control_api_1 = require("../oracle-control-api");
const http = __importStar(require("http"));
const url = __importStar(require("url"));
const ws_1 = require("ws");
const readline = __importStar(require("readline"));
const fs = __importStar(require("fs"));
const safe_eval_1 = __importDefault(require("safe-eval"));
const startOracleService = (cfg) => {
    const storage = (0, capability_storage_1.capabilityStorage)(cfg.oracle.dbPath, 1, 100);
    const concfg = {
        maxConnections: cfg.maxConnections
    };
    const api = (0, oracle_control_api_1.oracleControlApi)(cfg, node_1.api, storage, p2p_1.connectionPool, concfg);
    api.startAdvertising(cfg.oracle);
    http.createServer(async (req, res) => {
        res.statusCode = 200;
        try {
            const reqUrl = url.parse(req.url, true);
            const pubkey = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : "";
            const difficulty = typeof reqUrl.query.difficulty === "string" ? reqUrl.query.difficulty : "";
            const pageNo = typeof reqUrl.query.pageNo === "string" ? parseInt(reqUrl.query.pageNo) : 0;
            const pageSize = typeof reqUrl.query.pageSize === "string" ? parseInt(reqUrl.query.pageSize) : 10;
            const query = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : "true";
            const paging = {
                page: pageNo,
                chunkSize: pageSize
            };
            if (req.method === 'GET' && (reqUrl.pathname == '/index.html' || reqUrl.pathname == '/index.htm') || reqUrl.pathname == '/') {
                res.setHeader('content-Type', 'text/html');
                res.end(fs.readFileSync(__dirname + '/html/oracle/index.html').toString());
                return;
            }
            if (reqUrl.pathname == '/start') {
                api.startAdvertising(cfg.oracle);
                res.setHeader('content-Type', 'application/json');
                res.end("{}");
            }
            else if (reqUrl.pathname == '/pause') {
                api.pauseAdvertising(cfg.oracle);
            }
            else if (reqUrl.pathname == '/deactivateCapability') {
                api.deactivateCapability(pubkey);
                res.setHeader('content-Type', 'application/json');
                res.end("{}");
            }
            else if (reqUrl.pathname == '/dropCapability') {
                api.dropCapability(pubkey);
                res.setHeader('content-Type', 'application/json');
                res.end("{}");
            }
            else if (reqUrl.pathname == '/activateCapability') {
                api.dropCapability(pubkey);
                res.setHeader('content-Type', 'application/json');
                res.end("{}");
            }
            else if (reqUrl.pathname == '/upgradeOraclePow') {
                api.upgradeOraclePow(parseInt(difficulty));
                res.setHeader('content-Type', 'application/json');
                res.end("{}");
            }
            else if (reqUrl.pathname == '/upgradeCapabilityPow') {
                api.upgradeCapabilityPow(pubkey, parseInt(difficulty));
                res.setHeader('content-Type', 'application/json');
                res.end("{}");
            }
            else if (reqUrl.pathname == '/viewStoredCapabilities') {
                const q = { where: async (x) => { return (0, safe_eval_1.default)(query, x); } };
                const cps = await storage.listCapabilities(q, paging);
                res.setHeader('content-Type', 'application/json');
                res.end(JSON.stringify(cps));
            }
            else if (reqUrl.pathname == '/id') {
                res.setHeader('content-Type', 'application/json');
                res.end(JSON.stringify(await api.id()));
            }
            if (req.method === 'POST') {
                var body = '';
                req.on('data', function (chunk) {
                    body += chunk;
                });
                req.on('end', async function () {
                    try {
                        const postBody = JSON.parse(body);
                        res.statusCode = 201;
                        res.setHeader('content-Type', 'Application/json');
                        if (reqUrl.pathname == '/addCapability') {
                            api.addCapability(postBody);
                        }
                        res.end("{}");
                    }
                    catch (err) {
                        console.error(err);
                        if (!res.writableEnded) {
                            res.end(JSON.stringify({ error: err.message }));
                        }
                    }
                });
            }
        }
        catch (err) {
            console.error(err);
            if (!res.writableEnded) {
                res.end(JSON.stringify({ error: err.message }));
            }
        }
    }).listen(cfg.oracle.httpPort);
    const wss = new ws_1.WebSocketServer({ port: cfg.oracle.wsPort });
    wss.on('connection', function connection(ws, req) {
        ws.on('error', console.error);
        const stream = (0, ws_1.createWebSocketStream)(ws, { encoding: 'utf8' });
        const reqUrl = url.parse(req.url, true);
        const rl = readline.createInterface(stream, stream);
        // we assume single client app, so subscriptions are mutually exclusive, one subscriber per service
        // last opened socket will get active stream
        if (reqUrl.pathname == '/ranks') {
            api.watchMyRankSample(async (ev) => {
                stream.write(JSON.stringify(ev) + "\n");
            });
        }
        else if (reqUrl.pathname == '/signCp') {
            api.watchSignMyCapabilityBroadcasts(ev => {
                return new Promise(resolve => {
                    rl.question(JSON.stringify(ev) + "\n", a => resolve(JSON.parse(a)));
                });
            });
        }
        else if (reqUrl.pathname == '/signAd') {
            api.watchSignMyOracleBroadcasts(ev => {
                return new Promise(resolve => {
                    rl.question(JSON.stringify(ev) + "\n", a => resolve(JSON.parse(a)));
                });
            });
        }
    });
};
exports.startOracleService = startOracleService;
//# sourceMappingURL=oracle-service.js.map
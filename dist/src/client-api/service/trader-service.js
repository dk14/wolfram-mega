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
exports.startTraderService = void 0;
const node_1 = require("../../node");
const http = __importStar(require("http"));
const url = __importStar(require("url"));
const trader_api_1 = require("../trader-api");
const trader_storage_1 = require("../client-storage/trader-storage");
const fs = __importStar(require("fs"));
const generate_cardano_tx_1 = require("../contracts/generate-cardano-tx");
const btc = __importStar(require("../contracts/generate-btc-tx"));
const tx_1 = require("../contracts/btc/tx");
const sandboxjs_1 = __importDefault(require("@nyariv/sandboxjs"));
const safeEval = (expression, data) => {
    const sandbox = new sandboxjs_1.default();
    const exec = sandbox.compile("return " + expression);
    const res = exec(data).run();
    return res;
};
const startTraderService = (cfg, storage = (0, trader_storage_1.traderStorage)(cfg.trader.dbPath, 1)) => {
    global.cfg = cfg;
    const api = (0, trader_api_1.traderApi)(cfg.trader, cfg, node_1.api, storage);
    const collectors = {};
    http.createServer(async (req, res) => {
        res.statusCode = 200;
        try {
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            const reqUrl = url.parse(req.url, true);
            const tag = typeof reqUrl.query.tag === "string" ? reqUrl.query.tag : "";
            const pageNo = typeof reqUrl.query.pageNo === "string" ? parseInt(reqUrl.query.pageNo) : 0;
            const pageSize = typeof reqUrl.query.pageSize === "string" ? parseInt(reqUrl.query.pageSize) : 10;
            const query = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : "true";
            const q = { where: async (x) => { return safeEval(query, x); } };
            const pubkey = typeof reqUrl.query.pubkey === "string" ? reqUrl.query.pubkey : "";
            const paging = {
                page: pageNo,
                chunkSize: pageSize
            };
            if (req.method === 'GET' && (reqUrl.pathname == '/index.html' || reqUrl.pathname == '/index.htm') || reqUrl.pathname == '/') {
                res.setHeader('content-Type', 'text/html');
                res.end(fs.readFileSync(__dirname + '/html/trader/index.html').toString());
                return;
            }
            if (reqUrl.pathname == '/broadcastIssuedOffers') {
                api.startBroadcastingIssuedOffers();
            }
            else if (reqUrl.pathname == '/broadcastIssuedReports') {
                api.startBroadcastingIssuedReports();
            }
            else if (reqUrl.pathname == '/pauseBroadcastIssuedOffers') {
                api.stopBroadcastingIssuedOffers();
            }
            else if (reqUrl.pathname == '/pauseBroadcastIssuedReports') {
                api.stopBroadcastingIssuedReports();
            }
            else if (reqUrl.pathname == '/listCollectors') {
                res.end(JSON.stringify(Object.keys(collectors).map(tag => `${collectors[tag].type}:${tag}(${collectors[tag].count()})`)));
            }
            else if (reqUrl.pathname == '/listOracles') {
                res.end(JSON.stringify(await storage.queryOracles(q, paging)));
            }
            else if (reqUrl.pathname == '/listCapabilities') {
                res.end(JSON.stringify(await storage.queryCapabilities(q, paging)));
            }
            else if (reqUrl.pathname == '/capabilityEndpoint') {
                const out = await storage.queryCapabilities({ where: async (cp) => cp.capabilityPubKey === pubkey }, paging);
                const found = out.map(cp => (cp.endpoint ?? ''));
                if (found.length == 0) {
                    res.end(JSON.stringify(''));
                }
                else {
                    res.end(JSON.stringify(found[0]));
                }
            }
            else if (reqUrl.pathname == '/listReports') {
                res.end(JSON.stringify(await storage.queryReports(q, paging)));
            }
            else if (reqUrl.pathname == '/listOffers') {
                res.end(JSON.stringify(await storage.queryOffers(q, paging)));
            }
            else if (reqUrl.pathname == '/listIssuedReports') {
                res.end(JSON.stringify(await storage.queryIssuedReports(q, paging)));
            }
            else if (reqUrl.pathname == '/listIssuedOffers') {
                res.end(JSON.stringify(await storage.queryIssuedOffers(q, paging)));
            }
            else if (reqUrl.pathname == '/deleteOracle') {
                await storage.removeOracles([pubkey]);
                res.end();
            }
            else if (reqUrl.pathname == '/deleteCapability') {
                await storage.removeCps([pubkey]);
                res.end();
            }
            else if (reqUrl.pathname == '/deleteOffer') {
                await storage.removeOffers([pubkey]);
                res.end();
            }
            else if (reqUrl.pathname == '/deleteReport') {
                await storage.removeReports([pubkey]);
                res.end();
            }
            else if (reqUrl.pathname == '/deleteIssuedOffer') {
                await storage.removeIssuedOffers([pubkey]);
                res.end();
            }
            else if (reqUrl.pathname == '/deleteIssuedReport') {
                await storage.removeIssuedReports([pubkey]);
                res.end();
            }
            else if (reqUrl.pathname == '/cancelCollector') {
                if (collectors[tag]) {
                    collectors[tag].cancel();
                    delete collectors[tag];
                }
                res.end();
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
                        if (reqUrl.pathname == '/issueOffer') {
                            await api.issueOffer(postBody);
                        }
                        else if (reqUrl.pathname == '/issueReport') {
                            await api.issueReport(postBody);
                        }
                        else if (reqUrl.pathname == '/collectCapabilities') {
                            const collector = await api.collectCapabilities(tag, { where: async (x) => { return safeEval(postBody.oquery, x); } }, async (x) => { return safeEval(postBody.opredicate, x); }, async (x) => { return safeEval(postBody.predicate, x); }, postBody.limit ?? 10000);
                            if (Object.values(collectors).length < cfg.trader.maxCollectors) {
                                if (collectors[collector.tag]) {
                                    collectors[collector.tag].cancel();
                                }
                                collectors[collector.tag] = collector;
                            }
                        }
                        else if (reqUrl.pathname == '/collectOffers') {
                            const collector = await api.collectOffers(tag, { where: async (x) => { return safeEval(postBody.cpquery, x); } }, async (x) => { return safeEval(postBody.cppredicate, x); }, async (x) => { return safeEval(postBody.predicate, x); }, postBody.limit ?? 10000);
                            if (Object.values(collectors).length < cfg.trader.maxCollectors) {
                                if (collectors[collector.tag]) {
                                    collectors[collector.tag].cancel();
                                }
                                collectors[collector.tag] = collector;
                            }
                        }
                        else if (reqUrl.pathname == '/collectReports') {
                            const collector = await api.collectReports(tag, { where: async (x) => { return safeEval(postBody.oquery, x); } }, async (x) => { return safeEval(postBody.opredicate, x); }, async (x) => { return safeEval(postBody.predicate, x); }, postBody.limit ?? 10000);
                            if (Object.values(collectors).length < cfg.trader.maxCollectors) {
                                if (collectors[collector.tag]) {
                                    collectors[collector.tag].cancel();
                                }
                                collectors[collector.tag] = collector;
                            }
                        }
                        else if (reqUrl.pathname == '/collectOracles') {
                            const collector = await api.collectOracles(tag, async (x) => { return safeEval(postBody.predicate, x); }, postBody.limit ?? 10000);
                            if (Object.values(collectors).length < cfg.trader.maxCollectors) {
                                if (collectors[collector.tag]) {
                                    collectors[collector.tag].cancel();
                                }
                                collectors[collector.tag] = collector;
                            }
                        }
                        if (reqUrl.pathname == '/generateOpeningTransaction') {
                            res.end(JSON.stringify(await (0, generate_cardano_tx_1.generateOpeningTransaction)(cfg.trader.heliosNetwork ?? "https://d1t0d7c2nekuk0.cloudfront.net/preprod.json", postBody)));
                        }
                        else if (reqUrl.pathname == '/generateClosingTransaction') {
                            res.end(JSON.stringify(await (0, generate_cardano_tx_1.generateClosingTransaction)(cfg.trader.heliosNetwork ?? "https://d1t0d7c2nekuk0.cloudfront.net/preprod.json", postBody)));
                        }
                        else if (reqUrl.pathname == '/btc/generateOpeningTransaction') {
                            res.end(JSON.stringify(await btc.generateOpeningTransaction(postBody)));
                        }
                        else if (reqUrl.pathname == '/btc/generateClosingTransaction') {
                            res.end(JSON.stringify(await btc.generateClosingTransaction(postBody)));
                        }
                        else if (reqUrl.pathname == '/btc/generateCetTransaction') {
                            res.end(JSON.stringify(await btc.generateCetTransaction(postBody)));
                        }
                        else if (reqUrl.pathname == '/btc/generateCetRedemptionTransaction') {
                            res.end(JSON.stringify(await btc.generateCetRedemptionTransaction(postBody)));
                        }
                        else if (reqUrl.pathname == '/btc/pub2addr') {
                            res.end(JSON.stringify((0, tx_1.p2pktr)(postBody).address));
                        }
                        else {
                            res.end("{}");
                        }
                    }
                    catch (err) {
                        console.error(err);
                        if (!res.writableEnded) {
                            try {
                                if (err.message !== undefined) {
                                    res.end(JSON.stringify({ error: err.message }));
                                }
                                else {
                                    res.end(JSON.stringify(err));
                                }
                            }
                            catch (msg) {
                                res.end(JSON.stringify(msg));
                            }
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
    }).listen(cfg.trader.httpPort);
};
exports.startTraderService = startTraderService;
//# sourceMappingURL=trader-service.js.map
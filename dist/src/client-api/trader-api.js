"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traderApi = traderApi;
const node_1 = require("../node");
const pow_1 = require("../pow");
const p2p_1 = require("../p2p");
function traderApi(tradercfg, poolcfg, nodeApi, storage) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    var obroadcaster = null;
    var rbroadcaster = null;
    const tapi = {
        collectOracles: async function (tag, predicate, limit) {
            var counter = 0;
            const timeout = setInterval(async () => {
                const oracles = await nodeApi.lookupOracles({
                    page: getRandomInt(tradercfg.maxOraclesPages),
                    chunkSize: tradercfg.pageSize
                });
                const picked = (await Promise.all(oracles.map(async (o) => { return { o, p: await predicate(o) }; }))).filter(x => x.p).map(x => x.o);
                picked.forEach(async (id) => {
                    if (counter < limit) {
                        await storage.addOracle(id) && counter++;
                    }
                });
            }, tradercfg.collectOracleAdsCycle);
            const cl = {
                type: "OracleId",
                tag,
                active: true,
                predicate,
                cancel: async function () {
                    clearInterval(timeout);
                    cl.active = false;
                },
                count: () => counter,
                limit
            };
            return cl;
        },
        collectCapabilities: async function (tag, q, opredicate, predicate, limit) {
            var counter = 0;
            const timeout = setInterval(async () => {
                storage.allOracles(q, opredicate, async (oracleid) => {
                    const cps = await nodeApi.lookupCapabilities({
                        page: getRandomInt(tradercfg.maxCpPages),
                        chunkSize: tradercfg.pageSize
                    }, oracleid.pubkey);
                    const picked = (await Promise.all(cps.map(async (cp) => { return { cp, p: await predicate(cp) }; }))).filter(x => x.p).map(x => x.cp);
                    picked.forEach(async (cp) => {
                        if (counter < limit) {
                            await storage.addCp(cp) && counter++;
                        }
                    });
                });
            }, tradercfg.collectOracleAdsCycle);
            const cl = {
                type: "OracleCapability",
                tag,
                active: true,
                predicate,
                cancel: async function () {
                    clearInterval(timeout);
                    cl.active = false;
                },
                count: () => counter,
                limit
            };
            return cl;
        },
        collectReports: async function (tag, q, opredicate, predicate, limit) {
            var counter = 0;
            const timeout = setInterval(async () => {
                storage.allOracles(q, opredicate, async (oracleid) => {
                    const rps = await nodeApi.lookupReports({
                        page: getRandomInt(tradercfg.maxReportsPages),
                        chunkSize: tradercfg.pageSize
                    }, oracleid.pubkey);
                    const picked = (await Promise.all(rps.map(async (cp) => { return { cp, p: await predicate(cp) }; }))).filter(x => x.p).map(x => x.cp);
                    picked.forEach(async (rp) => {
                        if (counter < limit) {
                            await storage.addReport(rp) && counter++;
                        }
                    });
                });
            }, tradercfg.collectOracleAdsCycle);
            const cl = {
                type: "Report",
                tag,
                active: true,
                predicate,
                cancel: async function () {
                    clearInterval(timeout);
                    cl.active = false;
                },
                count: () => counter,
                limit
            };
            return cl;
        },
        collectOffers: async function (tag, q, cppredicate, matchingPredicate, limit) {
            var counter = 0;
            const timeout = setInterval(async () => {
                storage.allCps(q, cppredicate, async (cp) => {
                    const ofs = await nodeApi.lookupOffers({
                        page: getRandomInt(tradercfg.maxReportsPages),
                        chunkSize: tradercfg.pageSize
                    }, cp.capabilityPubKey);
                    const picked = (await Promise.all(ofs.map(async (of) => { return { of, p: await matchingPredicate(of) }; }))).filter(x => x.p).map(x => x.of);
                    picked.forEach(async (of) => {
                        if (counter < limit) {
                            await storage.addOffer(of) && counter++;
                        }
                    });
                });
            }, tradercfg.collectOracleAdsCycle);
            const cl = {
                type: "OfferMsg",
                tag,
                active: true,
                predicate: matchingPredicate,
                cancel: async function () {
                    clearInterval(timeout);
                    cl.active = false;
                },
                count: () => counter,
                limit
            };
            return cl;
        },
        issueReport: async function (r) {
            storage.addIssuedReport(r);
        },
        issueOffer: async function (o) {
            storage.addIssuedOffer(o);
        },
        startBroadcastingIssuedOffers: function () {
            if (obroadcaster !== null) {
                return;
            }
            obroadcaster = setInterval(() => {
                storage.allIssuedOffers(async (o) => {
                    o.seqNo++;
                    var res = await node_1.api.publishOffer(poolcfg, o);
                    if (res === 'low pow difficulty') {
                        storage.removeIssuedOffers([o.pow.hash]);
                    }
                    while (res === 'low pow difficulty' && o.pow.difficulty < (tradercfg.autoUpgradePowLimit ?? 4)) {
                        console.log('auto-upgrade pow');
                        const upgraded = await (0, pow_1.powOverOffer)(o, o.pow.difficulty + 1);
                        o.pow = upgraded;
                        res = await node_1.api.publishOffer(poolcfg, o);
                    }
                    if (p2p_1.p2pNode !== undefined) {
                        p2p_1.p2pNode.broadcastMessage('offer', JSON.stringify(structuredClone(o)));
                    }
                    storage.addIssuedOffer(o);
                });
            }, tradercfg.broadcastOfferCycle);
        },
        stopBroadcastingIssuedOffers: function () {
            if (obroadcaster !== null) {
                clearInterval(obroadcaster);
                obroadcaster = null;
                return;
            }
        },
        startBroadcastingIssuedReports: function () {
            if (rbroadcaster !== null) {
                return;
            }
            rbroadcaster = setInterval(() => {
                storage.allIssuedReports(async (r) => {
                    r.seqNo++;
                    var res = await node_1.api.reportMalleability(poolcfg, r);
                    if (res === 'low pow difficulty') {
                        storage.removeIssuedReports([r.pow.hash]);
                    }
                    while (res === 'low pow difficulty' && r.pow.difficulty < (tradercfg.autoUpgradePowLimit ?? 4)) {
                        const upgraded = await (0, pow_1.powOverReport)(r, r.pow.difficulty + 1);
                        r.pow = upgraded;
                        res = await node_1.api.reportMalleability(poolcfg, r);
                    }
                    if (p2p_1.p2pNode !== undefined) {
                        p2p_1.p2pNode.broadcastMessage('report', JSON.stringify(structuredClone(r)));
                    }
                    storage.addIssuedReport(r);
                });
            }, tradercfg.broadcastReportCycle);
        },
        stopBroadcastingIssuedReports: function () {
            if (rbroadcaster !== null) {
                clearInterval(rbroadcaster);
                rbroadcaster = null;
                return;
            }
        }
    };
    tapi.startBroadcastingIssuedOffers();
    tapi.stopBroadcastingIssuedReports();
    return tapi;
}
//# sourceMappingURL=trader-api.js.map
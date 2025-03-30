"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oracleControlApi = oracleControlApi;
const pow_1 = require("../pow");
function oracleControlApi(poolcfg, nodeApi, storage, connections, concfg) {
    var id = null;
    var advertiser = null;
    var signer = null;
    var cpsigner = null;
    var adobserver = null;
    return {
        startAdvertising: async function (cfg) {
            if (advertiser !== null) {
                return;
            }
            if (id === null) {
                id = {
                    pubkey: cfg.id.pubkey,
                    seqNo: 0,
                    cTTL: 0,
                    pow: undefined,
                    bid: { amount: 0, proof: "" },
                    oracleSignature: "",
                    oracleSignatureType: cfg.id.oracleSignatureType,
                    manifestUri: cfg.id.manifestUri
                };
                id.pow = await (0, pow_1.powOverOracleId)(id, 0);
            }
            advertiser = setInterval(async () => {
                if (adobserver !== null) {
                    await Promise.all((connections.list(concfg).map(async (con) => {
                        const api = connections.getapi(con);
                        const oracles = await api.lookupOracles({
                            page: 0,
                            chunkSize: cfg.adTopN
                        });
                        oracles.forEach((o, i) => {
                            if (o.pubkey === cfg.id.pubkey) {
                                adobserver({
                                    peer: con,
                                    rank: i
                                });
                            }
                        });
                    })));
                }
                if (signer !== null) {
                    id.oracleSignature = "";
                    id = await signer(id);
                }
                nodeApi.announceOracle(poolcfg, id);
                id.seqNo++;
                await Promise.all((await storage.listActiveCapabilities()).map(async (cp) => {
                    nodeApi.announceCapability(poolcfg, cp);
                    if (cpsigner !== null) {
                        cp.oracleSignature = "";
                        const difficulty = cp.pow?.difficulty ?? 1;
                        cp.pow = undefined;
                        cp = await cpsigner(cp);
                        cp.pow = await (0, pow_1.powOverOracleCapability)(cp, difficulty);
                    }
                    cp.seqNo++;
                }));
            }, cfg.adInterval);
            return;
        },
        pauseAdvertising: function (cfg) {
            if (advertiser !== null) {
                clearInterval(advertiser);
                advertiser = null;
            }
            return;
        },
        upgradeOraclePow: async function (difficulty) {
            id.pow = await (0, pow_1.powOverOracleId)(id, difficulty);
        },
        upgradeCapabilityPow: async function (capabilityPubKey, difficulty) {
            const cp = await storage.getCapability(capabilityPubKey);
            if (cp !== undefined && cp.oracleSignature !== undefined) {
                storage.updateCapabilityPow(capabilityPubKey, await (0, pow_1.powOverOracleCapability)(cp, difficulty));
            }
        },
        addCapability: async function (cp) {
            const pow = {
                difficulty: 0,
                algorithm: "SHA256",
                hash: "",
                magicNo: 0
            };
            const capability = {
                oraclePubKey: id.pubkey,
                capabilityPubKey: cp.capabilityPubKey,
                question: cp.question,
                seqNo: 0,
                cTTL: 0,
                oracleSignature: "",
                oracleSignatureType: "SHA256",
                pow
            };
            await storage.addCapability(capability);
        },
        deactivateCapability: async function (capabilityPubKey) {
            await storage.deactivateCapability(capabilityPubKey);
        },
        activateCapability: async function (capabilityPubKey) {
            await storage.activateCapability(capabilityPubKey);
        },
        dropCapability: async function (capabilityPubKey) {
            await storage.dropCapability(capabilityPubKey);
        },
        watchMyRankSample: function (subscriber) {
            adobserver = subscriber;
            return;
        },
        watchSignMyOracleBroadcasts: function (subscriber) {
            signer = subscriber;
            return;
        },
        watchSignMyCapabilityBroadcasts: function (subscriber) {
            cpsigner = subscriber;
            return;
        }
    };
}
//# sourceMappingURL=oracle-control-api.js.map
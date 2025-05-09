"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oracleControlApi = oracleControlApi;
const pow_1 = require("../pow");
const p2p_1 = require("../p2p");
function oracleControlApi(poolcfg, nodeApi, storage, connections, concfg) {
    var id = null;
    var advertiser = null;
    var signer = null;
    var cpsigner = null;
    var adobserver = null;
    const signPowIncCp = async (cp) => {
        if (signer !== null) {
            cp.oracleSignature = "";
            const powsave = cp.pow;
            cp.pow = undefined;
            cp.seqNo++;
            const signed = await cpsigner(cp);
            signed.pow = powsave;
            return signed;
        }
    };
    return {
        id: async function () {
            return id;
        },
        startAdvertising: async function (cfg) {
            if (advertiser !== null) {
                return;
            }
            if (id === null) {
                id = {
                    pubkey: cfg.id.pubkey,
                    seqNo: (await storage.readOracleAdSeqNo())[0],
                    cTTL: 0,
                    pow: undefined,
                    bid: { amount: 0, proof: "" },
                    oracleSignature: "",
                    oracleSignatureType: cfg.id.oracleSignatureType,
                    manifestUri: cfg.id.manifestUri
                };
                if (await storage.readOracleAdSeqNo()[1] === undefined) {
                    id.pow = await (0, pow_1.powOverOracleId)(id, 0);
                }
                else {
                    id.pow = await storage.readOracleAdSeqNo()[1];
                }
            }
            advertiser = async () => {
                try {
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
                    id.seqNo++;
                    await storage.storeOracleAdSeqNo(id.seqNo, id.pow);
                    if (signer !== null) {
                        id.oracleSignature = "";
                        id = await signer(id);
                    }
                    const res = await nodeApi.announceOracle(poolcfg, structuredClone(id));
                    if (res !== "success" && res !== "low pow difficulty") {
                        console.error(res + " oraclepub=" + id.pubkey);
                    }
                    if (p2p_1.p2pNode !== undefined) {
                        p2p_1.p2pNode.broadcastMessage('oracle', JSON.stringify(structuredClone(id)));
                    }
                    await Promise.all((await storage.listActiveCapabilities()).map(async (cp) => {
                        console.log("[advertise] CpPub = " + cp.capabilityPubKey);
                        if (cpsigner !== null) {
                            const signed = await signPowIncCp(cp);
                            storage.addCapability(signed);
                            const res = await nodeApi.announceCapability(poolcfg, signed);
                            if (res !== "success" && res !== "low pow difficulty" && !res.includes("no oracle")) {
                                console.error(res) + " cppub=" + cp.capabilityPubKey;
                            }
                            if (p2p_1.p2pNode !== undefined) {
                                p2p_1.p2pNode.broadcastMessage('capability', JSON.stringify(structuredClone(signed)));
                            }
                        }
                        else {
                            const unsigned = structuredClone(cp);
                            unsigned.pow.difficulty = 0;
                            unsigned.seqNo++;
                            cp.seqNo++;
                            storage.addCapability(cp);
                            const res = await nodeApi.announceCapability(poolcfg, structuredClone(unsigned));
                            if (res !== "success" && res !== "low pow difficulty" && !res.includes("no oracle")) {
                                console.error(res + " _cppub=" + unsigned.capabilityPubKey);
                            }
                            if (p2p_1.p2pNode !== undefined) {
                                p2p_1.p2pNode.broadcastMessage('capability', JSON.stringify(structuredClone(unsigned)));
                            }
                        }
                    }));
                }
                finally {
                    if (advertiser !== null) {
                        setTimeout(advertiser, cfg.adInterval);
                    }
                }
            };
            await advertiser();
            return;
        },
        pauseAdvertising: function (cfg) {
            if (advertiser !== null) {
                advertiser = null;
            }
            return;
        },
        upgradeOraclePow: async function (difficulty) {
            id.pow = await (0, pow_1.powOverOracleId)(id, difficulty);
        },
        upgradeCapabilityPow: async function (capabilityPubKey, difficulty) {
            const cp = await storage.getCapability(capabilityPubKey);
            if (cp !== undefined) {
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
                off: cp.off,
                params: cp.params,
                answers: cp.answers,
                endpoint: cp.endpoint,
                capabilitySignatureType: cp.capabilitySignatureType,
                seqNo: 0,
                cTTL: 0,
                oracleSignature: "",
                oracleSignatureType: "SHA256",
                pow
            };
            await storage.addCapability(capability);
        },
        deactivateCapability: async function (capabilityPubKey) {
            const cp = await storage.getCapability(capabilityPubKey);
            cp.off = true;
            if (p2p_1.p2pNode !== undefined) {
                p2p_1.p2pNode.broadcastMessage('capability', JSON.stringify(structuredClone(await signPowIncCp(cp))));
            }
            await storage.deactivateCapability(capabilityPubKey);
        },
        activateCapability: async function (capabilityPubKey) {
            await storage.activateCapability(capabilityPubKey);
        },
        dropCapability: async function (capabilityPubKey) {
            const cp = await storage.getCapability(capabilityPubKey);
            cp.off = true;
            if (p2p_1.p2pNode !== undefined) {
                p2p_1.p2pNode.broadcastMessage('capability', JSON.stringify(structuredClone(await signPowIncCp(cp))));
            }
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
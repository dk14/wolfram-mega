"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchingEngine = void 0;
const capabilityFilter = (tag) => {
    return async (cp) => cp.tags?.find(x => x === tag) !== undefined;
};
exports.matchingEngine = {
    generateOffer: async function (cfg) {
        window.storage.queryOracles;
        throw new Error("Function not implemented.");
    },
    broadcastOffer: async function (o) {
        throw new Error("Function not implemented.");
    },
    acceptOffer: async function (o) {
        throw new Error("Function not implemented.");
    },
    collectQuestions: async function (cfg) {
        cfg.tags.forEach(tag => {
            window.traderApi.collectOracles("pref-oracles-" + tag, async (o) => o.tags?.find(x => x === tag) !== undefined, 10);
        });
        cfg.tags.forEach(tag => {
            window.traderApi.collectCapabilities("pref-cps-" + tag, { where: async (x) => true }, async (o) => o.tags?.find(x => x === tag) !== undefined, capabilityFilter(tag), 10);
        });
    },
    collectOffers: async function (cfg) {
        const paging = { page: 0, chunkSize: 100 };
        const cps = cfg.tags.map(tag => window.storage.queryCapabilities({ where: async (x) => capabilityFilter(tag)(x) }, paging));
        const cpPubList = (await Promise.all(cps)).flat().map(x => x.capabilityPubKey);
        cpPubList.forEach(cpPub => {
            window.traderApi.collectOffers("cppub-" + cpPub, { where: async (x) => x.capabilityPubKey === cpPub }, async (x) => true, async (x) => true, 10);
        });
    }
};
//# sourceMappingURL=matching.js.map
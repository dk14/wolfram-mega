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
Object.defineProperty(exports, "__esModule", { value: true });
exports.traderStorage = void 0;
const fs = __importStar(require("fs"));
const traderStorage = (path, pageSize) => {
    if (!fs.existsSync(path + "/")) {
        fs.mkdirSync(path, { recursive: true });
    }
    fs.mkdirSync(path + "/issued-reports", { recursive: true });
    fs.mkdirSync(path + "/reports", { recursive: true });
    fs.mkdirSync(path + "/issued-offers", { recursive: true });
    fs.mkdirSync(path + "/offers", { recursive: true });
    fs.mkdirSync(path + "/oracles", { recursive: true });
    fs.mkdirSync(path + "/capabilities", { recursive: true });
    const getPage = async (prefix, pageNo) => {
        const pagepath = path + "/" + prefix + "/" + encodeURIComponent(pageNo) + ".json";
        if (fs.existsSync(pagepath)) {
            return JSON.parse(fs.readFileSync(pagepath).toString());
        }
        else {
            return {};
        }
    };
    const transformPage = async (prefix, pageNo, transformer) => {
        if (!fs.existsSync((path + "/" + prefix))) {
            fs.mkdirSync(path + "/" + prefix, { recursive: true });
        }
        const page = await getPage(prefix, pageNo);
        fs.writeFileSync(path + "/" + prefix + "/" + encodeURIComponent(pageNo) + ".json", JSON.stringify(transformer(page)));
    };
    const storage = {
        addOracle: async function (o) {
            transformPage("oracles", o.pubkey.slice(0, -pageSize * 4), page => {
                page[o.pubkey] = o;
                return page;
            });
        },
        addCp: async function (cp) {
            transformPage("capabilities", cp.capabilityPubKey.slice(0, -pageSize * 4), page => {
                page[cp.capabilityPubKey] = cp;
                return page;
            });
        },
        addReport: async function (r) {
            transformPage("reports", r.pow.hash.slice(0, -pageSize * 4), page => {
                page[r.pow.hash] = r;
                return page;
            });
        },
        addIssuedReport: async function (r) {
            transformPage("issued-reports", r.pow.hash.slice(0, -pageSize * 4), page => {
                page[r.pow.hash] = r;
                return page;
            });
        },
        addOffer: async function (o) {
            transformPage("offers", o.pow.hash.slice(0, -pageSize * 4), page => {
                page[o.pow.hash] = o;
                return page;
            });
        },
        addIssuedOffer: async function (o) {
            transformPage("issued-offers", o.pow.hash.slice(0, -pageSize * 4), page => {
                page[o.pow.hash] = o;
                return page;
            });
        },
        removeOracles: async function (pubkeys) {
            pubkeys.forEach(pub => {
                transformPage("oracles", pub.slice(0, -pageSize * 4), page => {
                    if (page[pub]) {
                        delete page[pub];
                    }
                    return page;
                });
            });
        },
        removeCps: async function (pubkeys) {
            pubkeys.forEach(pub => {
                transformPage("capabilities", pub.slice(0, -pageSize * 4), page => {
                    if (page[pub]) {
                        delete page[pub];
                    }
                    return page;
                });
            });
        },
        removeReports: async function (pubkeys) {
            pubkeys.forEach(pub => {
                transformPage("reports", pub.slice(0, -pageSize * 4), page => {
                    if (page[pub]) {
                        delete page[pub];
                    }
                    return page;
                });
            });
        },
        removeOffers: async function (pubkeys) {
            pubkeys.forEach(pub => {
                transformPage("offers", pub.slice(0, -pageSize * 4), page => {
                    if (page[pub]) {
                        delete page[pub];
                    }
                    return page;
                });
            });
        },
        removeIssuedOffers: async function (pubkeys) {
            pubkeys.forEach(pub => {
                transformPage("issued-offers", pub.slice(0, -pageSize * 4), page => {
                    if (page[pub]) {
                        delete page[pub];
                    }
                    return page;
                });
            });
        },
        removeIssuedReports: async function (pubkeys) {
            pubkeys.forEach(pub => {
                transformPage("issued-reports", pub.slice(0, -pageSize * 4), page => {
                    if (page[pub]) {
                        delete page[pub];
                    }
                    return page;
                });
            });
        },
        allOracles: async function (q, opredicate, handler) {
            const res = fs.readdirSync(path + "/oracles/").map(async (file) => {
                const page = JSON.parse(fs.readFileSync(path + "/oracles/" + file).toString());
                const chunkWithPredicate = Object.values(page).map(async (x) => {
                    const p = (await q.where(x)) && (await opredicate(x));
                    return { x, p };
                });
                const chunk = (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x);
                return chunk.map(async (x) => await handler(x));
            });
            await Promise.all(res);
        },
        allCps: async function (q, cppredicate, handler) {
            const res = fs.readdirSync(path + "/capabilities/").map(async (file) => {
                const page = JSON.parse(fs.readFileSync(path + "/capabilities/" + file).toString());
                const chunkWithPredicate = Object.values(page).map(async (x) => {
                    const p = (await q.where(x)) && (await cppredicate(x));
                    return { x, p };
                });
                const chunk = (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x);
                return chunk.map(async (x) => await handler(x));
            });
            await Promise.all(res);
        },
        queryOracles: async function (q, paging) {
            return (await Promise.all(fs.readdirSync(path + "/oracles/").map(async (file) => {
                const page = JSON.parse(fs.readFileSync(path + "/oracles/" + file).toString());
                const chunkWithPredicate = Object.values(page).map(async (x) => {
                    const p = await q.where(x);
                    return { x, p };
                });
                return (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x);
            }))).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
        },
        queryCapabilities: async function (q, paging) {
            return (await Promise.all(fs.readdirSync(path + "/capabilities/").map(async (file) => {
                const page = JSON.parse(fs.readFileSync(path + "/capabilities/" + file).toString());
                const chunkWithPredicate = Object.values(page).map(async (x) => {
                    const p = await q.where(x);
                    return { x, p };
                });
                return (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x);
            }))).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
        },
        queryOffers: async function (q, paging) {
            return (await Promise.all(fs.readdirSync(path + "/offers/").map(async (file) => {
                const page = JSON.parse(fs.readFileSync(path + "/offers/" + file).toString());
                const chunkWithPredicate = Object.values(page).map(async (x) => {
                    const p = await q.where(x);
                    return { x, p };
                });
                return (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x);
            }))).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
        },
        queryReports: async function (q, paging) {
            return (await Promise.all(fs.readdirSync(path + "/reports/").map(async (file) => {
                const page = JSON.parse(fs.readFileSync(path + "/reports/" + file).toString());
                const chunkWithPredicate = Object.values(page).map(async (x) => {
                    const p = await q.where(x);
                    return { x, p };
                });
                return (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x);
            }))).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
        },
        queryIssuedOffers: async function (q, paging) {
            return (await Promise.all(fs.readdirSync(path + "/issued-offers/").map(async (file) => {
                const page = JSON.parse(fs.readFileSync(path + "/issued-offers/" + file).toString());
                const chunkWithPredicate = Object.values(page).map(async (x) => {
                    const p = await q.where(x);
                    return { x, p };
                });
                return (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x);
            }))).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
        },
        queryIssuedReports: async function (q, paging) {
            return (await Promise.all(fs.readdirSync(path + "/issued-reports/").map(async (file) => {
                const page = JSON.parse(fs.readFileSync(path + "/issued-reports/" + file).toString());
                const chunkWithPredicate = Object.values(page).map(async (x) => {
                    const p = await q.where(x);
                    return { x, p };
                });
                return (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x);
            }))).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
        },
        allIssuedOffers: async function (handler) {
            await Promise.all(fs.readdirSync(path + "/issued-offers/").map(async (file) => {
                const page = JSON.parse(fs.readFileSync(path + "/issued-offers/" + file).toString());
                const chunk = Object.values(page);
                await Promise.all(chunk.map(async (x) => await handler(x)));
            }));
        },
        allIssuedReports: async function (handler) {
            await Promise.all(fs.readdirSync(path + "/issued-reports/").map(async (file) => {
                const page = JSON.parse(fs.readFileSync(path + "/issued-reports/" + file).toString());
                const chunk = Object.values(page);
                await Promise.all(chunk.map(async (x) => await handler(x)));
            }));
        }
    };
    return storage;
};
exports.traderStorage = traderStorage;
//# sourceMappingURL=trader-storage.js.map
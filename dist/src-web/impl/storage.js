"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexDBstorage = exports.clearDb = exports.database = void 0;
const idb_1 = require("idb");
const database = async () => {
    return await (0, idb_1.openDB)(window.pubkey + 'store', 1, {
        upgrade(db) {
            db.createObjectStore('oracles');
            db.createObjectStore('cps');
            db.createObjectStore('reports');
            db.createObjectStore('offers');
            db.createObjectStore('issued-reports');
            db.createObjectStore('issued-offers');
        },
    });
};
exports.database = database;
const clearDb = async () => {
    const db = await (0, idb_1.openDB)(window.pubkey + 'store', 1, {
        upgrade(db) {
            db.createObjectStore('oracles');
            db.createObjectStore('cps');
            db.createObjectStore('reports');
            db.createObjectStore('offers');
            db.createObjectStore('issued-reports');
            db.createObjectStore('issued-offers');
        },
    });
    db.clear('oracles');
    db.clear('cps');
    db.clear('reports');
    db.clear('offers');
    db.clear('issued-reports');
    db.clear('issued-offers');
    window.profiledb.clear('xpub');
    window.profiledb.clear('preferences');
};
exports.clearDb = clearDb;
const indexDBstorage = (db) => {
    return {
        addOracle: async function (o) {
            const found = await db.get("oracles", o.pubkey);
            await db.put("oracles", o, o.pubkey);
            return found === undefined;
        },
        addCp: async function (cp) {
            const found = await db.get("cps", cp.capabilityPubKey);
            await db.put("cps", cp, cp.capabilityPubKey);
            return found === undefined;
        },
        addReport: async function (r) {
            const found = await db.get("reports", r.pow.hash);
            await db.put("reports", r, r.pow.hash);
            return found === undefined;
        },
        addIssuedReport: async function (r) {
            const found = await db.get("issued-reports", r.pow.hash);
            await db.put("issued-reports", r, r.pow.hash);
            return found === undefined;
        },
        addOffer: async function (o) {
            const found = await db.get("offers", o.pow.hash);
            await db.put("offers", o, o.pow.hash);
            return found === undefined;
        },
        addIssuedOffer: async function (o) {
            const found = await db.get("issued-offers", o.pow.hash);
            await db.put("issued-offers", o, o.pow.hash);
            return found === undefined;
        },
        removeOracles: async function (pubkeys) {
            Promise.all(pubkeys.map(pub => db.delete("oracles", pub)));
        },
        removeCps: async function (pubkeys) {
            await Promise.all(pubkeys.map(pub => db.delete("cps", pub)));
        },
        removeReports: async function (pubkeys) {
            await Promise.all(pubkeys.map(pub => db.delete("reports", pub)));
        },
        removeOffers: async function (pubkeys) {
            await Promise.all(pubkeys.map(pub => db.delete("offers", pub)));
        },
        removeIssuedOffers: async function (pubkeys) {
            await Promise.all(pubkeys.map(pub => db.delete("issued-offers", pub)));
        },
        removeIssuedReports: async function (pubkeys) {
            await Promise.all(pubkeys.map(pub => db.delete("issued-reports", pub)));
        },
        allOracles: async function (q, opredicate, handler) {
            const oracles = db.transaction('oracles').store;
            for await (const cursor of oracles) {
                if (q.where(cursor.value) && opredicate(cursor.value)) {
                    handler(cursor.value);
                }
            }
        },
        allCps: async function (q, cppredicate, handler) {
            const cps = db.transaction('cps').store;
            for await (const cursor of cps) {
                if (q.where(cursor.value) && cppredicate(cursor.value)) {
                    handler(cursor.value);
                }
            }
        },
        queryOracles: async function (q, paging) {
            const oracles = db.transaction('oracles').store;
            const result = [];
            var i = 0;
            for await (const cursor of oracles) {
                if (q.where(cursor.value)) {
                    i++;
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break;
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value);
                    }
                }
            }
            return result;
        },
        queryCapabilities: async function (q, paging) {
            const cps = db.transaction('cps').store;
            const result = [];
            var i = 0;
            for await (const cursor of cps) {
                if (await q.where(cursor.value)) {
                    i++;
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break;
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value);
                    }
                }
            }
            return result;
        },
        queryOffers: async function (q, paging) {
            const offers = db.transaction('offers').store;
            const result = [];
            var i = 0;
            for await (const cursor of offers) {
                if (await q.where(cursor.value)) {
                    i++;
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break;
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value);
                    }
                }
            }
            return result;
        },
        queryReports: async function (q, paging) {
            const reports = db.transaction('reports').store;
            const result = [];
            var i = 0;
            for await (const cursor of reports) {
                if (await q.where(cursor.value)) {
                    i++;
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break;
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value);
                    }
                }
            }
            return result;
        },
        queryIssuedOffers: async function (q, paging) {
            const offers = db.transaction('issued-offers').store;
            const result = [];
            var i = 0;
            for await (const cursor of offers) {
                if (await q.where(cursor.value)) {
                    i++;
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break;
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value);
                    }
                }
            }
            return result;
        },
        queryIssuedReports: async function (q, paging) {
            const reports = db.transaction('issued-reports').store;
            const result = [];
            var i = 0;
            for await (const cursor of reports) {
                if (await q.where(cursor.value)) {
                    i++;
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break;
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value);
                    }
                }
            }
            return result;
        },
        allIssuedOffers: async function (handler) {
            (await db.getAll("issued-offers")).forEach(o => {
                handler(o);
            });
        },
        allIssuedReports: async function (handler) {
            (await db.getAll("issued-offers")).forEach(o => {
                handler(o);
            });
        }
    };
};
exports.indexDBstorage = indexDBstorage;
const remoteStorage = {
    addOracle: function (o) {
        throw new Error('Function not implemented.');
    },
    addCp: function (cp) {
        throw new Error('Function not implemented.');
    },
    addReport: function (r) {
        throw new Error('Function not implemented.');
    },
    addIssuedReport: function (r) {
        throw new Error('Function not implemented.');
    },
    addOffer: function (o) {
        throw new Error('Function not implemented.');
    },
    addIssuedOffer: function (o) {
        throw new Error('Function not implemented.');
    },
    removeOracles: function (pubkeys) {
        throw new Error('Function not implemented.');
    },
    removeCps: function (pubkeys) {
        throw new Error('Function not implemented.');
    },
    removeReports: function (pubkeys) {
        throw new Error('Function not implemented.');
    },
    removeOffers: function (pubkeys) {
        throw new Error('Function not implemented.');
    },
    removeIssuedOffers: function (pubkeys) {
        throw new Error('Function not implemented.');
    },
    removeIssuedReports: function (pubkeys) {
        throw new Error('Function not implemented.');
    },
    allOracles: function (q, opredicate, handler) {
        throw new Error('Function not implemented.');
    },
    allCps: function (q, cppredicate, handler) {
        throw new Error('Function not implemented.');
    },
    queryOracles: function (q, paging) {
        throw new Error('Function not implemented.');
    },
    queryCapabilities: function (q, paging) {
        throw new Error('Function not implemented.');
    },
    queryOffers: function (q, paging) {
        throw new Error('Function not implemented.');
    },
    queryReports: function (q, paging) {
        throw new Error('Function not implemented.');
    },
    queryIssuedOffers: function (q, paging) {
        throw new Error('Function not implemented.');
    },
    queryIssuedReports: function (q, paging) {
        throw new Error('Function not implemented.');
    },
    allIssuedOffers: function (handler) {
        throw new Error('Function not implemented.');
    },
    allIssuedReports: function (handler) {
        throw new Error('Function not implemented.');
    }
};
const adaptedStorage = {
    addOracle: function (o) {
        throw new Error('Function not implemented.');
    },
    addCp: function (cp) {
        throw new Error('Function not implemented.');
    },
    addReport: function (r) {
        throw new Error('Function not implemented.');
    },
    addIssuedReport: function (r) {
        throw new Error('Function not implemented.');
    },
    addOffer: function (o) {
        throw new Error('Function not implemented.');
    },
    addIssuedOffer: function (o) {
        throw new Error('Function not implemented.');
    },
    removeOracles: function (pubkeys) {
        throw new Error('Function not implemented.');
    },
    removeCps: function (pubkeys) {
        throw new Error('Function not implemented.');
    },
    removeReports: function (pubkeys) {
        throw new Error('Function not implemented.');
    },
    removeOffers: function (pubkeys) {
        throw new Error('Function not implemented.');
    },
    removeIssuedOffers: function (pubkeys) {
        throw new Error('Function not implemented.');
    },
    removeIssuedReports: function (pubkeys) {
        throw new Error('Function not implemented.');
    },
    allOracles: function (q, opredicate, handler) {
        throw new Error('Function not implemented.');
    },
    allCps: function (q, cppredicate, handler) {
        throw new Error('Function not implemented.');
    },
    queryOracles: function (q, paging) {
        throw new Error('Function not implemented.');
    },
    queryCapabilities: function (q, paging) {
        throw new Error('Function not implemented.');
    },
    queryOffers: function (q, paging) {
        throw new Error('Function not implemented.');
    },
    queryReports: function (q, paging) {
        throw new Error('Function not implemented.');
    },
    queryIssuedOffers: function (q, paging) {
        throw new Error('Function not implemented.');
    },
    queryIssuedReports: function (q, paging) {
        throw new Error('Function not implemented.');
    },
    allIssuedOffers: function (handler) {
        throw new Error('Function not implemented.');
    },
    allIssuedReports: function (handler) {
        throw new Error('Function not implemented.');
    }
};
//# sourceMappingURL=storage.js.map
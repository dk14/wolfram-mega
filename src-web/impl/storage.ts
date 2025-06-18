import { IDBPDatabase, openDB } from "idb";
import { OfferMsg, OracleCapability, OracleId, PagingDescriptor, Report } from "../../src/protocol";
import { TraderStorage } from "../../src/client-api/trader-api";

export interface TraderQuery<T> {
    where: (cp: T) => Promise<boolean>
}

export type Storage = TraderStorage<TraderQuery<OracleId>, TraderQuery<OracleCapability>, TraderQuery<Report>, TraderQuery<OfferMsg>>


export const database = async (): Promise<IDBPDatabase<unknown>> => {
    return await openDB(window.pubkey + 'store', 1, {
        upgrade(db) {
        db.createObjectStore('oracles');
        db.createObjectStore('cps');
        db.createObjectStore('reports');
        db.createObjectStore('offers');
        db.createObjectStore('issued-reports');
        db.createObjectStore('issued-offers');
        },
    })
}

export const clearDb = async (): Promise<void> => {
    const db = await openDB(window.pubkey + 'store', 1, {
        upgrade(db) {
        db.createObjectStore('oracles');
        db.createObjectStore('cps');
        db.createObjectStore('reports');
        db.createObjectStore('offers');
        db.createObjectStore('issued-reports');
        db.createObjectStore('issued-offers');
        },
    })
    await db.clear('oracles')
    await db.clear('cps')
    await db.clear('reports')
    await db.clear('offers')
    await db.clear('issued-reports');
    await Promise.all((await db.getAll('issued-offers')).map(async (o: OfferMsg) => {
        await db.put('issued-offers', null, o.pow.hash); 
        await db.delete('issued-offers', o.pow.hash)
    }))
    await db.clear('issued-offers')
    
    await window.profiledb.delete('xpub', window.user)
    await window.profiledb.delete('preferences', window.user)
    await window.profiledb.put('xpub', null, window.user)
    await window.profiledb.put('preferences', null, window.user)
    await window.profiledb.delete('xpub', window.user)
    await window.profiledb.delete('preferences', window.user)

}

export const indexDBstorage = (db: IDBPDatabase<unknown>): Storage => {
    return {
        addOracle: async function (o: OracleId): Promise<boolean> {
            const found = await db.get("oracles", o.pubkey)
            await db.put("oracles", o, o.pubkey)
            return found === undefined
        },
        addCp: async function (cp: OracleCapability): Promise<boolean> {
            const found = await db.get("cps", cp.capabilityPubKey)
            await db.put("cps", cp, cp.capabilityPubKey)
            return found === undefined
        },
        addReport: async function (r: Report): Promise<boolean> {
            const found = await db.get("reports", r.pow.hash)
            await db.put("reports", r, r.pow.hash)
            return found === undefined
        },
        addIssuedReport: async function (r: Report): Promise<boolean> {
            const found = await db.get("issued-reports", r.pow.hash)
            await db.put("issued-reports", r, r.pow.hash)
            return found === undefined
        },
        addOffer: async function (o: OfferMsg): Promise<boolean> {
            const found = await db.get("offers", o.pow.hash)
            await db.put("offers", o, o.pow.hash)
            return found === undefined
        },
        addIssuedOffer: async function (o: OfferMsg): Promise<boolean> {
            const found = await db.get("issued-offers", o.pow.hash)
            await db.put("issued-offers", o, o.pow.hash)
            return found === undefined
        },
        removeOracles: async function (pubkeys: string[]): Promise<void> {
            Promise.all(pubkeys.map(pub => db.delete("oracles", pub)))
        },
        removeCps: async function (pubkeys: string[]): Promise<void> {
            await Promise.all(pubkeys.map(pub => db.delete("cps", pub)))
        },
        removeReports: async function (pubkeys: string[]): Promise<void> {
            await Promise.all(pubkeys.map(pub => db.delete("reports", pub)))
        },
        removeOffers: async function (pubkeys: string[]): Promise<void> {
            await Promise.all(pubkeys.map(pub => db.delete("offers", pub)))
        },
        removeIssuedOffers: async function (pubkeys: string[]): Promise<void> {
            await Promise.all(pubkeys.map(pub => db.delete("issued-offers", pub)))
        },
        removeIssuedReports: async function (pubkeys: string[]): Promise<void> {
            await Promise.all(pubkeys.map(pub => db.delete("issued-reports", pub)))
        },
        allOracles: async function (q: TraderQuery<OracleId>, opredicate: (cp: OracleId) => Promise<boolean>, handler: (id: OracleId) => Promise<void>): Promise<void> {
            const oracles = db.transaction('oracles').store
            for await (const cursor of oracles) {
                if (q.where(cursor.value) && opredicate(cursor.value)) {
                    handler(cursor.value)
                }    
            }
        },
        allCps: async function (q: TraderQuery<OracleCapability>, cppredicate: (cp: OracleCapability) => Promise<boolean>, handler: (id: OracleCapability) => Promise<void>): Promise<void> {
            const cps = db.transaction('cps').store
            for await (const cursor of cps) {
                if (q.where(cursor.value) && cppredicate(cursor.value)) {
                    handler(cursor.value)
                }    
            }
    
        },
        queryOracles: async function (q: TraderQuery<OracleId>, paging: PagingDescriptor): Promise<OracleId[]> {
            const oracles = db.transaction('oracles').store
            const result = []
            var i = 0
            for await (const cursor of oracles) {
                if (q.where(cursor.value)) {
                    i++
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value)
                    }
                }    
            }
            return result
        },
        queryCapabilities: async function (q: TraderQuery<OracleCapability>, paging: PagingDescriptor): Promise<OracleCapability[]> {
            const cps = db.transaction('cps').store
            const result = []
            var i = 0
            for await (const cursor of cps) {
                if (await q.where(cursor.value)) {
                    i++
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value)
                    }
                }    
            }
            return result
        },
        queryOffers: async function (q: TraderQuery<OfferMsg>, paging: PagingDescriptor): Promise<OfferMsg[]> {
            const offers = db.transaction('offers').store
            const result = []
            var i = 0
            for await (const cursor of offers) {
                if (await q.where(cursor.value)) {
                    i++
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value)
                    }
                }    
            }
            return result
        },
        queryReports: async function (q: TraderQuery<Report>, paging: PagingDescriptor): Promise<Report[]> {
            const reports = db.transaction('reports').store
            const result = []
            var i = 0
            for await (const cursor of reports) {
                if (await q.where(cursor.value)) {
                    i++
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value)
                    }
                }    
            }
            return result
        },
        queryIssuedOffers: async function (q: TraderQuery<OfferMsg>, paging: PagingDescriptor): Promise<OfferMsg[]> {
            const offers = db.transaction('issued-offers').store
            const result = []
            var i = 0
            for await (const cursor of offers) {
                if (await q.where(cursor.value)) {
                    i++
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value)
                    }
                }    
            }
            return result
        },
        queryIssuedReports: async function (q: TraderQuery<Report>, paging: PagingDescriptor): Promise<Report[]> {
            const reports = db.transaction('issued-reports').store
            const result = []
            var i = 0
            for await (const cursor of reports) {
                if (await q.where(cursor.value)) {
                    i++
                    if (i > paging.chunkSize * (paging.page + 1)) {
                        break
                    }
                    if (i > paging.chunkSize * paging.page) {
                        result.push(cursor.value)
                    }
                }    
            }
            return result
        },
        allIssuedOffers: async function (handler: (o: OfferMsg) => Promise<void>): Promise<void> {
            (await db.getAll("issued-offers")).forEach(o => {
                handler(o)
            })
        },
        allIssuedReports: async function (handler: (r: Report) => Promise<void>): Promise<void> {
            (await db.getAll("issued-reports")).forEach(o => {
                handler(o)
            })
        }
    }
}

type RemoteStorage = TraderStorage<string, string, string, string>

const remoteStorage: RemoteStorage = {
    addOracle: function (o: OracleId): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addCp: function (cp: OracleCapability): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addReport: function (r: Report): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addIssuedReport: function (r: Report): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addOffer: function (o: OfferMsg): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addIssuedOffer: function (o: OfferMsg): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    removeOracles: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeCps: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeReports: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeOffers: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeIssuedOffers: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeIssuedReports: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allOracles: function (q: string, opredicate: (cp: OracleId) => Promise<boolean>, handler: (id: OracleId) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allCps: function (q: string, cppredicate: (cp: OracleCapability) => Promise<boolean>, handler: (id: OracleCapability) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    queryOracles: function (q: string, paging: PagingDescriptor): Promise<OracleId[]> {
        throw new Error('Function not implemented.');
    },
    queryCapabilities: function (q: string, paging: PagingDescriptor): Promise<OracleCapability[]> {
        throw new Error('Function not implemented.');
    },
    queryOffers: function (q: string, paging: PagingDescriptor): Promise<OfferMsg[]> {
        throw new Error('Function not implemented.');
    },
    queryReports: function (q: string, paging: PagingDescriptor): Promise<Report[]> {
        throw new Error('Function not implemented.');
    },
    queryIssuedOffers: function (q: string, paging: PagingDescriptor): Promise<OfferMsg[]> {
        throw new Error('Function not implemented.');
    },
    queryIssuedReports: function (q: string, paging: PagingDescriptor): Promise<Report[]> {
        throw new Error('Function not implemented.');
    },
    allIssuedOffers: function (handler: (o: OfferMsg) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allIssuedReports: function (handler: (r: Report) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    }
}

const adaptedStorage: Storage = {
    addOracle: function (o: OracleId): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addCp: function (cp: OracleCapability): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addReport: function (r: Report): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addIssuedReport: function (r: Report): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addOffer: function (o: OfferMsg): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    addIssuedOffer: function (o: OfferMsg): Promise<boolean> {
        throw new Error('Function not implemented.');
    },
    removeOracles: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeCps: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeReports: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeOffers: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeIssuedOffers: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    removeIssuedReports: function (pubkeys: string[]): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allOracles: function (q: TraderQuery<OracleId>, opredicate: (cp: OracleId) => Promise<boolean>, handler: (id: OracleId) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allCps: function (q: TraderQuery<OracleCapability>, cppredicate: (cp: OracleCapability) => Promise<boolean>, handler: (id: OracleCapability) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    queryOracles: function (q: TraderQuery<OracleId>, paging: PagingDescriptor): Promise<OracleId[]> {
        throw new Error('Function not implemented.');
    },
    queryCapabilities: function (q: TraderQuery<OracleCapability>, paging: PagingDescriptor): Promise<OracleCapability[]> {
        throw new Error('Function not implemented.');
    },
    queryOffers: function (q: TraderQuery<OfferMsg>, paging: PagingDescriptor): Promise<OfferMsg[]> {
        throw new Error('Function not implemented.');
    },
    queryReports: function (q: TraderQuery<Report>, paging: PagingDescriptor): Promise<Report[]> {
        throw new Error('Function not implemented.');
    },
    queryIssuedOffers: function (q: TraderQuery<OfferMsg>, paging: PagingDescriptor): Promise<OfferMsg[]> {
        throw new Error('Function not implemented.');
    },
    queryIssuedReports: function (q: TraderQuery<Report>, paging: PagingDescriptor): Promise<Report[]> {
        throw new Error('Function not implemented.');
    },
    allIssuedOffers: function (handler: (o: OfferMsg) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    },
    allIssuedReports: function (handler: (r: Report) => Promise<void>): Promise<void> {
        throw new Error('Function not implemented.');
    }
}
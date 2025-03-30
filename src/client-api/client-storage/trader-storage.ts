import * as fs from 'fs'
import { TraderStorage } from '../trader-api'
import { OfferMsg, OracleCapability, OracleId, PagingDescriptor, Report } from '../../node'

export interface TraderQuery<T> {
    where: (cp: T) => Promise<boolean>
}

type TraderDict<T> =  { [id: string] : T }

type TraderStorageT = TraderStorage<TraderQuery<OracleId>, TraderQuery<OracleCapability>, TraderQuery<Report>, TraderQuery<OfferMsg>>

export const traderStorage = (path: string, pageSize: number): TraderStorageT => {
    if (!fs.existsSync(path + "/")) {
        fs.mkdirSync(path, {recursive: true})
    }
    const getPage = async <T>(prefix: string, pageNo: string): Promise<TraderDict<T>> => {
        const pagepath = path + "/" + prefix + "/" + pageNo + ".json"
        if (fs.existsSync(pagepath)) {
            return JSON.parse(fs.readFileSync(pagepath).toString())
        } else {
            return {}
        }
    }

    const transformPage = async <T>(prefix: string, pageNo: string, transformer: (page: TraderDict<T>) => TraderDict<T>) => {
        if (!fs.existsSync((path + "/" + prefix))) {
            fs.mkdirSync(path + "/" + prefix, {recursive: true})
        }
        const page = await getPage<T>(prefix, pageNo)
        fs.writeFileSync(path + "/" + prefix + "/" + pageNo + ".json", JSON.stringify(transformer(page)))
    }

    const storage: TraderStorageT = {
        addOracle: async function (o: OracleId): Promise<void> {
            transformPage<OracleId>("oracles", o.pubkey.slice(0, -pageSize * 4), page => {
                page[o.pubkey] = o
                return page
            })
        },
        addCp: async function (cp: OracleCapability): Promise<void> {
            transformPage<OracleCapability>("capabilities", cp.capabilityPubKey.slice(0, -pageSize * 4), page => {
                page[cp.capabilityPubKey] = cp
                return page
            })
        },
        addReport: async function (r: Report): Promise<void> {
            transformPage<Report>("reports", r.pow.hash.slice(0, -pageSize * 4), page => {
                page[r.pow.hash] = r
                return page
            })
        },
        addIssuedReport: async function (r: Report): Promise<void> {
            transformPage<Report>("issued-reports", r.pow.hash.slice(0, -pageSize * 4), page => {
                page[r.pow.hash] = r
                return page
            })
        },
        addOffer: async function (o: OfferMsg): Promise<void> {
            transformPage<OfferMsg>("offers", o.pow.hash.slice(0, -pageSize * 4), page => {
                page[o.pow.hash] = o
                return page
            })
        },
        addIssuedOffer: async function (o: OfferMsg): Promise<void> {
            transformPage<OfferMsg>("issued-offers", o.pow.hash.slice(0, -pageSize * 4), page => {
                page[o.pow.hash] = o
                return page
            })
        },
        removeOracles: async function (pubkeys: string[]): Promise<void> {
            pubkeys.forEach(pub => {
                transformPage("oracles", pub.slice(0, -pageSize * 4), page => {
                    if (page[pub]) {
                        delete page[pub]
                    }
                    return page
                })
            })
        },
        removeCps: async function (pubkeys: string[]): Promise<void> {
            pubkeys.forEach(pub => {
                transformPage("capabilities", pub.slice(0, -pageSize * 4), page => {
                    if (page[pub]) {
                        delete page[pub]
                    }
                    return page
                })
            })
        },
        removeReports: async function (pubkeys: string[]): Promise<void> {
            pubkeys.forEach(pub => {
                transformPage("reports", pub.slice(0, -pageSize * 4), page => {
                    if (page[pub]) {
                        delete page[pub]
                    }
                    return page
                })
            })
        },
        removeOffers: async function (pubkeys: string[]): Promise<void> {
            pubkeys.forEach(pub => {
                transformPage("offers", pub.slice(0, -pageSize * 4), page => {
                    if (page[pub]) {
                        delete page[pub]
                    }
                    return page
                })
            })
        },
        removeIssuedOffers: async function (pubkeys: string[]): Promise<void> {
            pubkeys.forEach(pub => {
                transformPage("issued-offers", pub.slice(0, -pageSize * 4), page => {
                    if (page[pub]) {
                        delete page[pub]
                    }
                    return page
                })
            })
        },
        removeIssuedReports: async function (pubkeys: string[]): Promise<void> {
            pubkeys.forEach(pub => {
                transformPage("issued-reports", pub.slice(0, -pageSize * 4), page => {
                    if (page[pub]) {
                        delete page[pub]
                    }
                    return page
                })
            })
        },
        allOracles: async function (q: TraderQuery<OracleId>, opredicate: (cp: OracleId) => Promise<boolean>, handler: (id: OracleId) => Promise<void>): Promise<void> {
            fs.readdirSync(path + "/oracles/").forEach(file => {
                const page: TraderDict<OracleId> = JSON.parse(fs.readFileSync(file).toString())
                const chunk = Object.values(page).filter(async x => await q.where(x) && opredicate(x))
                chunk.forEach(async x => await handler(x))
            })
        },
        queryOracles: async function (q: TraderQuery<OracleId>, paging: PagingDescriptor): Promise<OracleId[]> {
            return fs.readdirSync(path + "/oracles/").map(file => {
                const page: TraderDict<OracleId> = JSON.parse(fs.readFileSync(file).toString())
                return Object.values(page).filter(async x => await q.where(x))
            }).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        queryCapabilities: async function (q: TraderQuery<OracleCapability>, paging: PagingDescriptor): Promise<OracleCapability[]> {
            return fs.readdirSync(path + "/capabilities/").map(file => {
                const page: TraderDict<OracleCapability> = JSON.parse(fs.readFileSync(file).toString())
                return Object.values(page).filter(async x => await q.where(x))
            }).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        queryOffers: async function (q: TraderQuery<OfferMsg>, paging: PagingDescriptor): Promise<OfferMsg[]> {
            return fs.readdirSync(path + "/offers/").map(file => {
                const page: TraderDict<OfferMsg> = JSON.parse(fs.readFileSync(file).toString())
                return Object.values(page).filter(async x => await q.where(x))
            }).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        queryReports: async function (q: TraderQuery<Report>, paging: PagingDescriptor): Promise<Report[]> {
            return fs.readdirSync(path + "/reports/").map(file => {
                const page: TraderDict<Report> = JSON.parse(fs.readFileSync(file).toString())
                return Object.values(page).filter(async x => await q.where(x))
            }).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        queryIssuedOffers: async function (q: TraderQuery<OfferMsg>, paging: PagingDescriptor): Promise<OfferMsg[]> {
            return fs.readdirSync(path + "/issued-offers/").map(file => {
                const page: TraderDict<OfferMsg> = JSON.parse(fs.readFileSync(file).toString())
                return Object.values(page).filter(async x => await q.where(x))
            }).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        queryIssuedReports: async function (q: TraderQuery<Report>, paging: PagingDescriptor): Promise<Report[]> {
            return fs.readdirSync(path + "/issued-reports/").map(file => {
                const page: TraderDict<Report> = JSON.parse(fs.readFileSync(file).toString())
                return Object.values(page).filter(async x => await q.where(x))
            }).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        allIssuedOffers: async function (handler: (o: OfferMsg) => Promise<void>): Promise<void> {
            fs.readdirSync(path + "/issued-offers/").forEach(file => {
                const page: TraderDict<OfferMsg> = JSON.parse(fs.readFileSync(file).toString())
                const chunk = Object.values(page)
                chunk.forEach(async x => await handler(x))
            })
        },
        allIssuedReports: async function (handler: (r: Report) => Promise<void>): Promise<void> {
            fs.readdirSync(path + "/issued-reports/").forEach(file => {
                const page: TraderDict<Report> = JSON.parse(fs.readFileSync(file).toString())
                const chunk = Object.values(page)
                chunk.forEach(async x => await handler(x))
            })
        }
    }
    return storage
}
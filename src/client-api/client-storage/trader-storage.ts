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
    fs.mkdirSync(path + "/issued-reports", {recursive: true})
    fs.mkdirSync(path + "/reports", {recursive: true})
    fs.mkdirSync(path + "/issued-offers", {recursive: true})
    fs.mkdirSync(path + "/offers", {recursive: true})
    fs.mkdirSync(path + "/oracles", {recursive: true})
    fs.mkdirSync(path + "/capabilities", {recursive: true})

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
            const res = fs.readdirSync(path + "/oracles/").map(async file => {
                const page: TraderDict<OracleId> = JSON.parse(fs.readFileSync(path + "/oracles/" + file).toString())
                const chunkWithPredicate = Object.values(page).map(async x => {
                    const p = (await q.where(x)) && (await opredicate(x))
                    return {x, p}
                })
                const chunk = (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x)
                return chunk.map(async x => await handler(x))
            })
            await Promise.all(res)
        },
        queryOracles: async function (q: TraderQuery<OracleId>, paging: PagingDescriptor): Promise<OracleId[]> {
            return (await Promise.all(fs.readdirSync(path + "/oracles/").map(async file => {
                const page: TraderDict<OracleId> = JSON.parse(fs.readFileSync(path + "/oracles/" + file).toString())
                const chunkWithPredicate = Object.values(page).map(async x => {
                    const p = await q.where(x)
                    return {x, p}
                })
                return (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x)
            }))).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        queryCapabilities: async function (q: TraderQuery<OracleCapability>, paging: PagingDescriptor): Promise<OracleCapability[]> {
            return (await Promise.all(fs.readdirSync(path + "/capabilities/").map(async file => {
                const page: TraderDict<OracleCapability> = JSON.parse(fs.readFileSync(path + "/capabilities/" + file).toString())
                const chunkWithPredicate = Object.values(page).map(async x => {
                    const p = await q.where(x)
                    return {x, p}
                })
                return (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x)
            }))).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        queryOffers: async function (q: TraderQuery<OfferMsg>, paging: PagingDescriptor): Promise<OfferMsg[]> {
            return (await Promise.all(fs.readdirSync(path + "/offers/").map(async file => {
                const page: TraderDict<OfferMsg> = JSON.parse(fs.readFileSync(path + "/offers/" + file).toString())
                const chunkWithPredicate = Object.values(page).map(async x => {
                    const p = await q.where(x)
                    return {x, p}
                })
                return (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x)
            }))).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        queryReports: async function (q: TraderQuery<Report>, paging: PagingDescriptor): Promise<Report[]> {
            return (await Promise.all(fs.readdirSync(path + "/reports/").map(async file => {
                const page: TraderDict<Report> = JSON.parse(fs.readFileSync(path + "/reports/" + file).toString())
                const chunkWithPredicate = Object.values(page).map(async x => {
                    const p = await q.where(x)
                    return {x, p}
                })
                return (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x)
            }))).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        queryIssuedOffers: async function (q: TraderQuery<OfferMsg>, paging: PagingDescriptor): Promise<OfferMsg[]> {
            return (await Promise.all(fs.readdirSync(path + "/issued-offers/").map(async file => {
                const page: TraderDict<OfferMsg> = JSON.parse(fs.readFileSync(path + "/issued-offers/" + file).toString())
                const chunkWithPredicate = Object.values(page).map(async x => {
                    const p = await q.where(x)
                    return {x, p}
                })
                return (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x)
            }))).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        queryIssuedReports: async function (q: TraderQuery<Report>, paging: PagingDescriptor): Promise<Report[]> {
            return (await Promise.all(fs.readdirSync(path + "/issued-reports/").map(async file => {
                const page: TraderDict<Report> = JSON.parse(fs.readFileSync(path + "/issued-reports/" + file).toString())
                const chunkWithPredicate = Object.values(page).map(async x => {
                    const p = await q.where(x)
                    return {x, p}
                })
                return (await Promise.all(chunkWithPredicate)).filter(x => x.p).map(x => x.x)
            }))).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        allIssuedOffers: async function (handler: (o: OfferMsg) => Promise<void>): Promise<void> {
            await Promise.all(fs.readdirSync(path + "/issued-offers/").map(async file => {
                const page: TraderDict<OfferMsg> = JSON.parse(fs.readFileSync(path + "/issued-offers/" + file).toString())
                const chunk = Object.values(page)
                await Promise.all(chunk.map(async x => await handler(x)))
            }))
        },
        allIssuedReports: async function (handler: (r: Report) => Promise<void>): Promise<void> {
            await Promise.all(fs.readdirSync(path + "/issued-reports/").map(async file => {
                const page: TraderDict<Report> = JSON.parse(fs.readFileSync(path + "/issued-reports/" + file).toString())
                const chunk = Object.values(page)
                await Promise.all(chunk.map(async x => await handler(x)))
            }))
        }
    }
    return storage
}
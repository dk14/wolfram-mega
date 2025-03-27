import * as fs from 'fs'
import { CapabilityStorage } from '../oracle-control-api'
import { HashCashPow, OracleCapability, PagingDescriptor } from '../../node'

interface CapabilityQuery {
    where: (cp: OracleCapability) => Promise<boolean>
}

type CapabilityDict =  { [id: string] : OracleCapability }

//for demos; clients should build their own implementations (MySQL etc.)
export const capabilityStorage = (path: string, pageSize: number, activeCpLimit: number): CapabilityStorage<CapabilityQuery> => {
    const getPage = async (pageNo: string): Promise<CapabilityDict> => {
        const pagepath = path + "/" + pageNo + ".json"
        if (fs.existsSync(pagepath)) {
            return JSON.parse(fs.readFileSync(pagepath).toString())
        } else {
            return {}
        }
    }

    const transformPage = async (pageNo: string, transformer: (page: CapabilityDict) => CapabilityDict) => {
        const page = await getPage(pageNo)
        fs.writeFileSync(path + "/" + pageNo + ".json", JSON.stringify(transformer(page)))
    }

    const cps: CapabilityStorage<CapabilityQuery> = {
        addCapability: async function (cp: OracleCapability): Promise<void> {
            transformPage(cp.capabilityPubKey.slice(0, -pageSize * 4), page => {
                page[cp.capabilityPubKey] = cp
                return page
            })
        },
        deactivateCapability: async function (capabilityPubKey: string): Promise<void> {
            transformPage(capabilityPubKey.slice(0, -pageSize * 4), page => {
                if (page[capabilityPubKey]) {
                    page[capabilityPubKey].off = true
                }
                return page
            })
        },
        activateCapability: async function (capabilityPubKey: string): Promise<void> {
            transformPage(capabilityPubKey.slice(0, -pageSize * 4), page => {
                if (page[capabilityPubKey]) {
                    page[capabilityPubKey].off = false
                }
                return page
            })
        },
        dropCapability: async function (capabilityPubKey: string): Promise<void> {
            transformPage(capabilityPubKey.slice(0, -pageSize * 4), page => {
                if (page[capabilityPubKey]) {
                    delete page[capabilityPubKey]
                }
                return page
            })
        },
        getCapability: async function (capabilityPubKey: string): Promise<OracleCapability | undefined> {
            const page = await getPage(capabilityPubKey.slice(0, -pageSize * 4))
            return page[capabilityPubKey]
        },
        listCapabilities: async function (query: CapabilityQuery, paging: PagingDescriptor): Promise<OracleCapability[]> {
            return fs.readdirSync(path + "/").map(file => {
                const page: CapabilityDict = JSON.parse(fs.readFileSync(file).toString())
                return Object.values(page).filter(async x => await query.where(x))
            }).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
        },
        listActiveCapabilities: async function (): Promise<OracleCapability[]> {
            return fs.readdirSync(path + "/").map(file => {
                const page: CapabilityDict = JSON.parse(fs.readFileSync(file).toString())
                return Object.values(page).filter(x => x.off !== true)
            }).flat().slice(0, activeCpLimit)
        },
        updateCapabilityPow: async function (capabilityPubKey: string, pow: HashCashPow): Promise<void> {
            transformPage(capabilityPubKey.slice(0, -pageSize * 4), page => {
                if (page[capabilityPubKey]) {
                    page[capabilityPubKey].pow = pow
                }
                return page
            })
        }
    }

    return cps
}
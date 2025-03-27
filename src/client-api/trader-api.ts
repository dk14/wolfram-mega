import { Api, MempoolConfig, OfferMsg, OracleCapability, OracleId, PagingDescriptor, Report, api } from "../node";
import { powOverOffer, powOverReport } from "../pow";


export interface TraderStorage<OracleQuery, CpQuery, RpQuery, MatchingQuery> {
    addOracle: (o: OracleId) => Promise<void>
    addCp: (cp: OracleCapability) => Promise<void>
    addReport: (r: Report) => Promise<void>
    addIssuedReport: (r: Report) => Promise<void>
    addOffer: (o: OfferMsg) => Promise<void>
    addIssuedOffer: (o: OfferMsg) => Promise<void>

    removeOracles: (pubkeys: string[]) => Promise<void>
    removeCps: (pubkeys: string[]) => Promise<void>
    removeReports: (pubkeys: string[]) => Promise<void>
    removeOffers: (pubkeys: string[]) => Promise<void>
    removeIssuedOffers: (pubkeys: string[]) => Promise<void>
    removeIssuedReports: (pubkeys: string[]) => Promise<void>

    allOracles: (q: OracleQuery, opredicate: (cp: OracleId) => Promise<boolean>, handler: (id: OracleId) => Promise<void>) => Promise<void>

    queryOracles: (q: OracleQuery, paging: PagingDescriptor) => Promise<OracleId[]>
    queryCapabilities: (q: CpQuery, paging: PagingDescriptor) => Promise<OracleCapability[]>
    queryOffers: (q: MatchingQuery, paging: PagingDescriptor) => Promise<OfferMsg[]>
    queryReports: (q: RpQuery, paging: PagingDescriptor) => Promise<Report[]>

    allIssuedOffers: (handler: (o: OfferMsg) => Promise<void>) => Promise<void>
    allIssuedReports: (handler: (r: Report) => Promise<void>) => Promise<void>

}

export interface Collector<T> {
    type: 'OracleId' | 'OracleCapability' | 'Report' | 'OfferMsg'
    tag: string
    active: boolean
    predicate: (cp: T) => Promise<boolean>
    cancel: () => Promise<void>
}

export interface TraderApi<OracleQuery> {

    collectOracles: (tag: string, predicate: (cp: OracleId) => Promise<boolean>) => Promise<Collector<OracleId>>
    collectCapabilities: (tag: string, q: OracleQuery, opredicate: (cp: OracleId) => Promise<boolean>,  predicate: (cp: OracleCapability) => Promise<boolean>) => Promise<Collector<OracleCapability>>
    collectReports: (tag: string, q: OracleQuery, opredicate: (cp: OracleId) => Promise<boolean>, predicate: (cp: Report) => Promise<boolean>) => Promise<Collector<Report>>
    collectOffers: (tag: string, q: OracleQuery, opredicate: (cp: OracleId) => Promise<boolean>, matchingPredicate: (cp: OfferMsg) => Promise<boolean>) => Promise<Collector<OfferMsg>>

    issueReport: (r: Report) => Promise<void>

    issueOffer: (o: OfferMsg) => Promise<void>

    startBroadcastingIssuedOffers: () => void
    stopBroadcastingIssuedOffers: () => void

    startBroadcastingIssuedReports: () => void
    stopBroadcastingIssuedReports: () => void

}

export interface TraderCfg {
    broadcastOfferCycle: number,
    broadcastReportCycle: number,
    collectOffersCycle: number,
    collectReportsCycle: number,
    collectOracleAdsCycle: number,
    collectOracleCpCycle: number,
    pageSize: number,
    maxOraclesPages: number,
    maxCpPages: number,
    maxReportsPages: number,
    maxOffersPages: number

}

export function traderApi<OracleQuery, CpQuery, RpQuery, MatchingQuery, MegaPeerT>(
    tradercfg: TraderCfg,
    poolcfg: MempoolConfig<MegaPeerT>, 
    nodeApi: Api, 
    storage: TraderStorage<OracleQuery, CpQuery, RpQuery, MatchingQuery>): TraderApi<OracleQuery> {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    var obroadcaster = null
    var rbroadcaster = null

    const tapi: TraderApi<OracleQuery> = {
        collectOracles: async function (tag: string, predicate: (cp: OracleId) => Promise<boolean>): Promise<Collector<OracleId>> {
            const timeout = setInterval(async () => {
                const oracles = await nodeApi.lookupOracles({
                    page: getRandomInt(tradercfg.maxOraclesPages),
                    chunkSize: tradercfg.pageSize
                })
                const picked = oracles.filter(async o => await predicate(o))
                picked.forEach(async id => await storage.addOracle(id))
            }, tradercfg.collectOracleAdsCycle)
            const cl: Collector<OracleId> = {
                type: "OracleId",
                tag,
                active: true,
                predicate,
                cancel: async function (): Promise<void> {
                    clearInterval(timeout)
                    cl.active = false
                }
            }
            return cl
        },
        collectCapabilities: async function (tag: string, q: OracleQuery, opredicate: (cp: OracleId) => Promise<boolean>, predicate: (cp: OracleCapability) => Promise<boolean>): Promise<Collector<OracleCapability>> {
            const timeout = setInterval(async () => {
                storage.allOracles(q, opredicate, async oracleid => {
                    const cps = await nodeApi.lookupCapabilities({
                        page: getRandomInt(tradercfg.maxCpPages),
                        chunkSize: tradercfg.pageSize
                    }, oracleid.pubkey)
                    const picked = cps.filter(async cp => await predicate(cp))
                    picked.forEach(async cp => await storage.addCp(cp))
                })
                
            }, tradercfg.collectOracleAdsCycle)
            const cl: Collector<OracleCapability> = {
                type: "OracleCapability",
                tag,
                active: true,
                predicate,
                cancel: async function (): Promise<void> {
                    clearInterval(timeout)
                    cl.active = false
                }
            }
            return cl
        },
        collectReports: async function (tag: string,  q: OracleQuery, opredicate: (cp: OracleId) => Promise<boolean>, predicate: (cp: Report) => Promise<boolean>): Promise<Collector<Report>> {
            const timeout = setInterval(async () => {
                storage.allOracles(q, opredicate, async oracleid => {
                    const rps = await nodeApi.lookupReports({
                        page: getRandomInt(tradercfg.maxReportsPages),
                        chunkSize: tradercfg.pageSize
                    }, oracleid.pubkey)
                    const picked = rps.filter(async rp => await predicate(rp))
                    picked.forEach(async rp => await storage.addReport(rp))
                })
                
            }, tradercfg.collectOracleAdsCycle)
            const cl: Collector<Report> = {
                type: "Report",
                tag,
                active: true,
                predicate,
                cancel: async function (): Promise<void> {
                    clearInterval(timeout)
                    cl.active = false
                }
            }
            return cl
        },
        collectOffers: async function (tag: string,  q: OracleQuery, opredicate: (cp: OracleId) => Promise<boolean>, matchingPredicate: (cp: OfferMsg) => Promise<boolean>): Promise<Collector<OfferMsg>> {
            const timeout = setInterval(async () => {
                storage.allOracles(q, opredicate, async oracleid => {
                    const ofs = await nodeApi.lookupOffers({
                        page: getRandomInt(tradercfg.maxReportsPages),
                        chunkSize: tradercfg.pageSize
                    }, oracleid.pubkey)
                    const picked = ofs.filter(async of => await matchingPredicate(of))
                    picked.forEach(async of => await storage.addOffer(of))
                })
                
            }, tradercfg.collectOracleAdsCycle)
            const cl: Collector<OfferMsg> = {
                type: "OfferMsg",
                tag,
                active: true,
                predicate: matchingPredicate,
                cancel: async function (): Promise<void> {
                    clearInterval(timeout)
                    cl.active = false
                }
            }
            return cl
        },
        issueReport: async function (r: Report): Promise<void> {
            storage.addIssuedReport(r)
        },
        issueOffer: async function (o: OfferMsg): Promise<void> {
            storage.addIssuedOffer(o)
        },
        startBroadcastingIssuedOffers: function (): void {
            if (obroadcaster !== null) {
                return
            }
            obroadcaster = setInterval(() => {
                storage.allIssuedOffers(async o => {
                    o.seqNo++
                    var res = await api.publishOffer(poolcfg, o)
                    while (res === 'low pow difficulty' || res === 'wrong pow') {
                        const upgraded = await powOverOffer(o, o.pow.difficulty + 1)
                        o.pow = upgraded
                        res = await api.publishOffer(poolcfg, o)
                    }
                    storage.addIssuedOffer(o)
                })
            }, tradercfg.broadcastOfferCycle)
        },
        stopBroadcastingIssuedOffers: function (): void {
            if (obroadcaster !== null) {
                clearInterval(obroadcaster)
                obroadcaster = null
                return
            }
        },
        startBroadcastingIssuedReports: function (): void {
            if (rbroadcaster !== null) {
                return
            }
            rbroadcaster = setInterval(() => {
                storage.allIssuedReports(async r => {
                    r.seqNo++
                   var res = await api.reportMalleability(poolcfg, r)
                    while (res === 'low pow difficulty' || res === 'wrong pow') {
                        const upgraded = await powOverReport(r, r.pow.difficulty + 1)
                        r.pow = upgraded
                        res = await api.reportMalleability(poolcfg, r)
                    }
                    storage.addIssuedReport(r)
                })
            }, tradercfg.broadcastReportCycle)
        },
        stopBroadcastingIssuedReports: function (): void {
            if (rbroadcaster !== null) {
                clearInterval(rbroadcaster)
                rbroadcaster = null
                return
            }
        }
    }
    return tapi   
}

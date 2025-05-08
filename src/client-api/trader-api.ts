import { Api, OfferMsg, OracleCapability, OracleId, PagingDescriptor, Report, api } from "../node"
import { MempoolConfig } from "../config"
import { powOverOffer, powOverReport } from "../pow";
import { p2pNode } from "../p2p";


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
    allCps: (q: CpQuery, cppredicate: (cp: OracleCapability) => Promise<boolean>, handler: (id: OracleCapability) => Promise<void>) => Promise<void>


    queryOracles: (q: OracleQuery, paging: PagingDescriptor) => Promise<OracleId[]>
    queryCapabilities: (q: CpQuery, paging: PagingDescriptor) => Promise<OracleCapability[]>
    queryOffers: (q: MatchingQuery, paging: PagingDescriptor) => Promise<OfferMsg[]>
    queryReports: (q: RpQuery, paging: PagingDescriptor) => Promise<Report[]>
    queryIssuedOffers: (q: MatchingQuery, paging: PagingDescriptor) => Promise<OfferMsg[]>
    queryIssuedReports: (q: RpQuery, paging: PagingDescriptor) => Promise<Report[]>

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

export interface TraderApi<OracleQuery, CpQuery> {

    collectOracles: (tag: string, predicate: (cp: OracleId) => Promise<boolean>) => Promise<Collector<OracleId>>
    collectCapabilities: (tag: string, q: OracleQuery, opredicate: (cp: OracleId) => Promise<boolean>,  predicate: (cp: OracleCapability) => Promise<boolean>) => Promise<Collector<OracleCapability>>
    collectReports: (tag: string, q: OracleQuery, opredicate: (cp: OracleId) => Promise<boolean>, predicate: (cp: Report) => Promise<boolean>) => Promise<Collector<Report>>
    collectOffers: (tag: string, q: CpQuery, cppredicate: (cp: OracleCapability) => Promise<boolean>, matchingPredicate: (cp: OfferMsg) => Promise<boolean>) => Promise<Collector<OfferMsg>>

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
    maxCollectors: number,
    dbPath: string,
    httpPort: number,
    autoUpgradePowLimit?: number,
    heliosNetwork?: string,
    btcSignerEndpoint?: string
}

export function traderApi<OracleQuery, CpQuery, RpQuery, MatchingQuery, MegaPeerT>(
    tradercfg: TraderCfg,
    poolcfg: MempoolConfig<MegaPeerT>, 
    nodeApi: Api, 
    storage: TraderStorage<OracleQuery, CpQuery, RpQuery, MatchingQuery>): TraderApi<OracleQuery, CpQuery> {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    var obroadcaster = null
    var rbroadcaster = null

    const tapi: TraderApi<OracleQuery, CpQuery> = {
        collectOracles: async function (tag: string, predicate: (cp: OracleId) => Promise<boolean>): Promise<Collector<OracleId>> {
            const timeout = setInterval(async () => {
                const oracles = await nodeApi.lookupOracles({
                    page: getRandomInt(tradercfg.maxOraclesPages),
                    chunkSize: tradercfg.pageSize
                })
                const picked = (await Promise.all(oracles.map(async o => {return {o, p: await predicate(o)}}))).filter(x => x.p).map(x => x.o)
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
                    const picked = (await Promise.all(cps.map(async cp => {return {cp, p: await predicate(cp)}}))).filter(x => x.p).map(x => x.cp)
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
                    const picked = (await Promise.all(rps.map(async cp => {return {cp, p: await predicate(cp)}}))).filter(x => x.p).map(x => x.cp)
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
        collectOffers: async function (tag: string,  q: CpQuery, cppredicate: (o: OracleCapability) => Promise<boolean>, matchingPredicate: (cp: OfferMsg) => Promise<boolean>): Promise<Collector<OfferMsg>> {
            const timeout = setInterval(async () => {
                storage.allCps(q, cppredicate, async cp => {
                    const ofs = await nodeApi.lookupOffers({
                        page: getRandomInt(tradercfg.maxReportsPages),
                        chunkSize: tradercfg.pageSize
                    }, cp.capabilityPubKey)
                    const picked = (await Promise.all(ofs.map(async of => {return {of, p: await matchingPredicate(of)}}))).filter(x => x.p).map(x => x.of)
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
                    if (res === 'low pow difficulty') {
                        storage.removeIssuedOffers([o.pow.hash])
                    }
                    while (res === 'low pow difficulty' && o.pow.difficulty < (tradercfg.autoUpgradePowLimit ?? 4)) {
                        console.log('auto-upgrade pow')
                        const upgraded = await powOverOffer(o, o.pow.difficulty + 1)
                        o.pow = upgraded
                        res = await api.publishOffer(poolcfg, o)
                    }
                    if (p2pNode !== undefined) {
                        p2pNode.broadcastMessage('offer', JSON.stringify(structuredClone(o)))
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
                    if (res === 'low pow difficulty') {
                        storage.removeIssuedReports([r.pow.hash])
                    }
                    while (res === 'low pow difficulty' && r.pow.difficulty < (tradercfg.autoUpgradePowLimit ?? 4)){
                        const upgraded = await powOverReport(r, r.pow.difficulty + 1)
                        r.pow = upgraded
                        res = await api.reportMalleability(poolcfg, r)
                    }
                    if (p2pNode !== undefined) {
                        p2pNode.broadcastMessage('report', JSON.stringify(structuredClone(r)))
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
    tapi.startBroadcastingIssuedOffers()
    tapi.stopBroadcastingIssuedReports()
    return tapi   
}

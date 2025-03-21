import { OfferMsg, OracleCapability, OracleId, Report } from "../node";


export interface TraderStorage<OracleQuery, CpQuery, RpQuery, MatchingQuery> {
    addOracle: (cp: OracleId) => Promise<void>
    addCp: (cp: OracleCapability) => Promise<void>
    addReport: (r: Report) => Promise<void>
    addIssuedReport: (r: Report) => Promise<void>
    addOffer: (r: OfferMsg) => Promise<void>
    addIssuedOffer: (r: OfferMsg) => Promise<void>

    removeOracles: (pubkeys: string[]) => Promise<void>
    removeCps: (pubkeys: string[]) => Promise<void>
    removeReports: (pubkeys: string[]) => Promise<void>
    removeOffers: (pubkeys: string[]) => Promise<void>
    removeIssuedOffers: (pubkeys: string[]) => Promise<void>
    removeIssuedReports: (pubkeys: string[]) => Promise<void>

    queryOracles: (q: OracleQuery) => Promise<OracleId[]>
    queryCapabilities: (cp: CpQuery) => Promise<OracleCapability[]>
    queryOffers: (cp: MatchingQuery) => Promise<OfferMsg[]>
    queryReports: (cp: RpQuery) => Promise<Report[]>

    queryIssuedOffers: (cp: MatchingQuery) => Promise<OfferMsg[]>
    queryIssuedReports: (cp: RpQuery) => Promise<Report[]>


}

export interface Collector<T> {
    type: 'OracleId' | 'OracleCapability' | 'Report' | 'OfferMsg'
    tag: string
    active: boolean
    predicate: (cp: T) => boolean
    cancel: () => Promise<void>
}

export interface TraderApi {

    collectOracles: (tag: string, predicate: (cp: OracleId) => Promise<boolean>) => Promise<Collector<OracleId>>
    collectCapabilities: (tag: string, predicate: (cp: OracleCapability) => Promise<boolean>) => Promise<Collector<OracleCapability>>
    collectReports: (tag: string, predicate: (cp: Report) => Promise<boolean>) => Promise<Collector<Report>>
    collectOffers: (tag: string, matchingPredicate: (cp: OfferMsg) => Promise<boolean>) => Promise<Collector<OfferMsg>>

    issueReport: (cp: Report) => Promise<void>

    issueOffer: (cp: OfferMsg) => Promise<void>
   

    startBroadcastingIssuedOffers: () => void
    stopBroadcastingIssuedOffers: () => void

    startBroadcastingIssuedReports: () => void
    stopBroadcastingIssuedReports: () => void

}
import { OfferMsg, OracleCapability, OracleId, Report } from "../node";


export interface TraderStorage<OracleQuery, CpQuery, RpQuery, MatchingQuery> {
    addOracle: (cp: OracleId) => void
    addCp: (cp: OracleCapability) => void
    addReport: (r: Report) => void
    addIssuedReport: (r: Report) => void
    addOffer: (r: OfferMsg) => void
    addIssuedOffer: (r: OfferMsg) => void


    queryOracles: (q: OracleQuery) => OracleId[]
    queryCapabilities: (cp: CpQuery) => OracleCapability[]
    queryOffers: (cp: MatchingQuery) => OfferMsg[]
    queryReports: (cp: RpQuery) => Report[]

    queryIssuedOffers: (cp: MatchingQuery) => OfferMsg[]
    queryIssuedReports: (cp: RpQuery) => Report[]

}

export interface TraderApi {

    collectOracles: (predicate: (cp: OracleId) => boolean) => boolean
    
    collectCapabilities: (predicate: (cp: OracleCapability) => boolean) => boolean

    issueReport: (cp: Report) => void
    collectReports: (predicate: (cp: Report) => boolean) => boolean
    

    issueOffer: (cp: OfferMsg) => void
    collectOffers: (matchingPredicate: (cp: OfferMsg) => boolean) => boolean

    startBroadcastingIssuedOffers: () => void
    stopBroadcastingIssuedOffers: () => void

    startBroadcastingIssuedReports: () => void
    stopBroadcastingIssuedReports: () => void

}
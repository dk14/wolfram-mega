import Sandbox from "@nyariv/sandboxjs";
import { Collector, Predicate, TraderApi } from "../../src/client-api/trader-api";
import { OfferMsg, OracleCapability, OracleId, Report } from "../../src/protocol";
import { TraderQuery } from "./storage";

const adaptjs = (js: string) => async x => {return safeEval(js, x)}
const adaptPred = <T>(p: Predicate<T, boolean>) => "(" + p.toString() + ")(this)"
const adaptQuery = <T>(q: TraderQuery<T>) => "(" + q.where.toString() + ")(this)"

const safeEval = (expression: string, data: any): any => {
    const sandbox = new Sandbox()
    const exec = sandbox.compile("return " + expression)
    const res = exec(data).run()
    return res
}

export const traderApiRemote: TraderApi<string, string, string> = {
    collectOracles: async function (tag: string, predicate: string, limit: number): Promise<Collector<OracleId>> {
        await fetch('./collectOracles?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                predicate,
                limit
            }),
            headers: {'Content-Type': 'application/json'}
        }) 
        throw new Error('Function not implemented.');
    },
    collectCapabilities: async function (tag: string, q: string, opredicate: string, predicate: string, limit: number): Promise<Collector<OracleCapability>> {
        await fetch('./collectCapabilities?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                oquery: q,
                opredicate,
                predicate
            }),
            headers: {'Content-Type': 'application/json'}
        })
        
        throw new Error('Function not implemented.');
    },
    collectReports: async function (tag: string, q: string, opredicate: string, predicate: string, limit: number): Promise<Collector<Report>> {
        await fetch('./collectReports?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                oquery: q,
                opredicate,
                predicate
            }),
            headers: {'Content-Type': 'application/json'}
        })
        throw new Error('Function not implemented.');
    },
    collectOffers: async function (tag: string, q: string, cppredicate: string, matchingPredicate: string, limit: number): Promise<Collector<OfferMsg>> {
        await fetch('./collectOffers?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                cpquery: q,
                cppredicate,
                predicate: matchingPredicate
            }),
            headers: {'Content-Type': 'application/json'}
        })
        throw new Error('Function not implemented.');
    },
    issueReport: async function (r: Report): Promise<void> {
        await fetch('./issueReport', {
            method: 'post',
            body: JSON.stringify(r),
            headers: {'Content-Type': 'application/json'}
        })
    },
    issueOffer: async function (o: OfferMsg): Promise<void> {
        await fetch('./issueOffer', {
            method: 'post',
            body: JSON.stringify(o),
            headers: {'Content-Type': 'application/json'}
        })
    },
    startBroadcastingIssuedOffers: function (): void {
        fetch('./broadcastIssuedOffers')
    },
    stopBroadcastingIssuedOffers: function (): void {
        throw new Error('Function not implemented.');
    },
    startBroadcastingIssuedReports: function (): void {
        fetch('./broadcastIssuedReports')
    },
    stopBroadcastingIssuedReports: function (): void {
        throw new Error('Function not implemented.');
    }
}

export const traderApiRemoteAdapted: TraderApi<TraderQuery<OracleId>, TraderQuery<OracleCapability>, boolean> = {
    
    collectOracles: async function (tag: string, predicate: (cp: OracleId) => Promise<boolean>, limit: number): Promise<Collector<OracleId>> {
        return traderApiRemote.collectOracles(tag, adaptPred(predicate), limit)
    },
    collectCapabilities: async function (tag: string, q: TraderQuery<OracleId>, opredicate: (cp: OracleId) => Promise<boolean>, predicate: (cp: OracleCapability) => Promise<boolean>, limit: number): Promise<Collector<OracleCapability>> {
        return traderApiRemote.collectCapabilities(tag, adaptQuery(q), adaptPred(opredicate), adaptPred(predicate), limit)
    },
    collectReports: async function (tag: string,  q: TraderQuery<OracleId>, opredicate: (cp: OracleId) => Promise<boolean>, predicate: (cp: Report) => Promise<boolean>, limit: number): Promise<Collector<Report>> {
        return traderApiRemote.collectReports(tag, adaptQuery(q), adaptPred(opredicate), adaptPred(predicate), limit)
    },
    collectOffers: async function (tag: string,  q: TraderQuery<OracleCapability>, cppredicate: (o: OracleCapability) => Promise<boolean>, matchingPredicate: (cp: OfferMsg) => Promise<boolean>, limit: number): Promise<Collector<OfferMsg>> {
        return traderApiRemote.collectOffers(tag, adaptQuery(q), adaptPred(cppredicate), adaptPred(matchingPredicate), limit)
    },
    issueReport: function (r: Report): Promise<void> {
        return traderApiRemote.issueReport(r)
    },
    issueOffer: function (o: OfferMsg): Promise<void> {
       return traderApiRemote.issueOffer(o)
    },
    startBroadcastingIssuedOffers: function (): void {
       traderApiRemote.startBroadcastingIssuedOffers()
    },
    stopBroadcastingIssuedOffers: function (): void {
        traderApiRemote.stopBroadcastingIssuedOffers()
    },
    startBroadcastingIssuedReports: function (): void {
        traderApiRemote.startBroadcastingIssuedReports()
    },
    stopBroadcastingIssuedReports: function (): void {
        traderApiRemote.stopBroadcastingIssuedReports()
    }
}


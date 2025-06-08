"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traderApiRemoteAdapted = exports.traderApiRemote = void 0;
const sandboxjs_1 = __importDefault(require("@nyariv/sandboxjs"));
const adaptjs = (js) => async (x) => { return safeEval(js, x); };
const adaptPred = (p) => "(" + p.toString() + ")(this)";
const adaptQuery = (q) => "(" + q.where.toString() + ")(this)";
const safeEval = (expression, data) => {
    const sandbox = new sandboxjs_1.default();
    const exec = sandbox.compile("return " + expression);
    const res = exec(data).run();
    return res;
};
exports.traderApiRemote = {
    collectOracles: async function (tag, predicate, limit) {
        await fetch('./collectOracles?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                predicate,
                limit
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        throw new Error('Function not implemented.');
    },
    collectCapabilities: async function (tag, q, opredicate, predicate, limit) {
        await fetch('./collectCapabilities?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                oquery: q,
                opredicate,
                predicate
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        throw new Error('Function not implemented.');
    },
    collectReports: async function (tag, q, opredicate, predicate, limit) {
        await fetch('./collectReports?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                oquery: q,
                opredicate,
                predicate
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        throw new Error('Function not implemented.');
    },
    collectOffers: async function (tag, q, cppredicate, matchingPredicate, limit) {
        await fetch('./collectOffers?tag=' + encodeURIComponent(tag), {
            method: 'post',
            body: JSON.stringify({
                cpquery: q,
                cppredicate,
                predicate: matchingPredicate
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        throw new Error('Function not implemented.');
    },
    issueReport: async function (r) {
        await fetch('./issueReport', {
            method: 'post',
            body: JSON.stringify(r),
            headers: { 'Content-Type': 'application/json' }
        });
    },
    issueOffer: async function (o) {
        await fetch('./issueOffer', {
            method: 'post',
            body: JSON.stringify(o),
            headers: { 'Content-Type': 'application/json' }
        });
    },
    startBroadcastingIssuedOffers: function () {
        fetch('./broadcastIssuedOffers');
    },
    stopBroadcastingIssuedOffers: function () {
        throw new Error('Function not implemented.');
    },
    startBroadcastingIssuedReports: function () {
        fetch('./broadcastIssuedReports');
    },
    stopBroadcastingIssuedReports: function () {
        throw new Error('Function not implemented.');
    }
};
exports.traderApiRemoteAdapted = {
    collectOracles: async function (tag, predicate, limit) {
        return exports.traderApiRemote.collectOracles(tag, adaptPred(predicate), limit);
    },
    collectCapabilities: async function (tag, q, opredicate, predicate, limit) {
        return exports.traderApiRemote.collectCapabilities(tag, adaptQuery(q), adaptPred(opredicate), adaptPred(predicate), limit);
    },
    collectReports: async function (tag, q, opredicate, predicate, limit) {
        return exports.traderApiRemote.collectReports(tag, adaptQuery(q), adaptPred(opredicate), adaptPred(predicate), limit);
    },
    collectOffers: async function (tag, q, cppredicate, matchingPredicate, limit) {
        return exports.traderApiRemote.collectOffers(tag, adaptQuery(q), adaptPred(cppredicate), adaptPred(matchingPredicate), limit);
    },
    issueReport: function (r) {
        return exports.traderApiRemote.issueReport(r);
    },
    issueOffer: function (o) {
        return exports.traderApiRemote.issueOffer(o);
    },
    startBroadcastingIssuedOffers: function () {
        exports.traderApiRemote.startBroadcastingIssuedOffers();
    },
    stopBroadcastingIssuedOffers: function () {
        exports.traderApiRemote.stopBroadcastingIssuedOffers();
    },
    startBroadcastingIssuedReports: function () {
        exports.traderApiRemote.startBroadcastingIssuedReports();
    },
    stopBroadcastingIssuedReports: function () {
        exports.traderApiRemote.stopBroadcastingIssuedReports();
    }
};
//# sourceMappingURL=trader.js.map
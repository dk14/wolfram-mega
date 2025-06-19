"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stalkingEngine = void 0;
const generate_btc_tx_1 = require("../src/client-api/contracts/generate-btc-tx");
const matching_1 = require("./matching");
let ignore = {};
let cycle = 0;
const trackIssuedOffers = async (interpreters, dataProvider) => {
    cycle++;
    if (cycle > 100000) {
        ignore = 0;
        cycle = 0;
    }
    const pagedescriptor = {
        page: 0,
        chunkSize: 9000
    };
    const allOffers = (await window.storage.queryIssuedOffers({
        where: async (x) => !ignore[x.pow.hash] && !(x.content.finalize && x.content.finalize.redemptionTx) && !x.content.failed
    }, pagedescriptor));
    const allOffersGrouped = Object.groupBy(allOffers, x => x.content.orderId);
    const reattemptMuSig = 30;
    //TODO collapse duplicates 
    const rank = (offer) => {
        let rank = 0;
        rank += offer.content.accept ? 1 : 0;
        rank += offer.content.finalize ? 1 : 0;
        if (!offer.content.accept) {
            return rank;
        }
        const sigs1 = offer.content.accept.openingTx;
        rank += sigs1.sesionCommitments[0] ? 1 : 0;
        rank += sigs1.sesionCommitments[1] ? 1 : 0;
        rank += sigs1.sessionNonces[0] ? 1 : 0;
        rank += sigs1.sessionNonces[1] ? 1 : 0;
        rank += sigs1.partialSigs[0] ? 1 : 0;
        rank += sigs1.partialSigs[1] ? 1 : 0;
        const sigs2 = offer.content.accept.cetTxSet[0];
        rank += sigs2.sesionCommitments[0] ? 3 : 0;
        rank += sigs2.sesionCommitments[1] ? 3 : 0;
        rank += sigs2.sessionNonces[0] ? 3 : 0;
        rank += sigs2.sessionNonces[1] ? 3 : 0;
        rank += sigs2.partialSigs[0] ? 3 : 0;
        rank += sigs2.partialSigs[1] ? 3 : 0;
        const sigs3 = offer.content.accept.cetTxSet[1];
        rank += sigs3.sesionCommitments[0] ? 3 : 0;
        rank += sigs3.sesionCommitments[1] ? 3 : 0;
        rank += sigs3.sessionNonces[0] ? 3 : 0;
        rank += sigs3.sessionNonces[1] ? 3 : 0;
        rank += sigs3.partialSigs[0] ? 3 : 0;
        rank += sigs3.partialSigs[1] ? 3 : 0;
        const locks = offer.content.accept.openingTx.hashLocks;
        if (locks) {
            rank += locks[0] ? 1 : 0;
            rank += locks[1] ? 1 : 0;
        }
        const unlocks = offer.content.accept.openingTx.hashUnlocks;
        if (unlocks) {
            rank += unlocks[0] ? 1 : 0;
            rank += unlocks[1] ? 1 : 0;
        }
        rank += offer.content.finalize ? 7 : 0;
        return rank;
    };
    //TODO
    const allOffersFiltered = Object.entries(allOffersGrouped).filter(x => x[1].length < reattemptMuSig).map(x => x[1]).flat();
    allOffersFiltered.forEach(async (orderPreviousState) => {
        try {
            console.error("STALKING: " + orderPreviousState.pow.hash + " +");
            const candidates = await window.storage.queryOffers({
                where: async (x) => x.content.accept && x.content.accept?.offerRef === orderPreviousState.pow.hash ||
                    x.content.finalize && x.content.finalize?.acceptRef === orderPreviousState.pow.hash ||
                    x.content.finalize && x.content.finalize?.previousFinalRef === orderPreviousState.pow.hash
            }, pagedescriptor);
            console.log((await window.storage.queryIssuedOffers({ where: async (x) => true }, pagedescriptor)).map(o => o.pow.hash));
            if (candidates.length === 0) {
                return;
            }
            const order = structuredClone((0, matching_1.maxBy)(candidates, x => rank(x)));
            //TODO ORDER MALLEABILITY: validate new state of the order (trader's signature over original terms without accept/finalize)
            console.error("STALKER: FOUND " + order.pow.hash + " <= " + orderPreviousState.pow.hash);
            const interpreter = interpreters[order.content.blockchain];
            const endpoint = (await window.storage.queryCapabilities({ where: async (x) => x.capabilityPubKey === order.content.terms.question.capabilityPubKey }, pagedescriptor))[0].endpoint;
            const commitment = await dataProvider.getCommitment(endpoint, order.content.terms.question);
            if (order.content.terms.question2) {
                //TODO: quorums
            }
            if (order.content.finalize) {
                if (!order.content.accept.openingTx.hashUnlocks[0] || !order.content.accept.openingTx.hashUnlocks[1]) {
                    // EXCHANGE PREIMAGES
                    console.error("STALKER: EXCHANGE PREIMAGES");
                    if ((0, matching_1.checkOriginatorId)(order.content.originatorId)) {
                        order.content.accept.openingTx.hashUnlocks[0] = await window.hashLockProvider.getHashLock(order);
                    }
                    else {
                        order.content.accept.openingTx.hashUnlocks[1] = await window.hashLockProvider.getHashLock(order);
                    }
                    order.content.finalize.previousFinalRef = order.pow.hash;
                    order.pow.hash = order.pow.hash + "-hash" + (0, matching_1.randomInt)(1000);
                    window.traderApi.issueOffer(order);
                    window.storage.removeIssuedOffers([orderPreviousState.pow.hash]);
                }
                else {
                    // WAIT FOR ORACLE AND REDEEM
                    const fact = await dataProvider.getFact(endpoint, commitment);
                    if (fact === undefined) {
                        console.error("STALKER: NO FACT YET");
                        return;
                    }
                    const cetTxId = {
                        txid: "",
                        vout: 0
                    };
                    const cet = order.content.accept.cetTxSet;
                    if (fact.factWithQuestion === 'YES') {
                        cetTxId.txid = await interpreter.submitTx(cet[0].tx);
                    }
                    else {
                        cetTxId.txid = await interpreter.submitTx(cet[1].tx);
                    }
                    try {
                        const redeem = await interpreter.genRedemtionTx(cetTxId, [commitment], fact, order);
                        const txid = await interpreter.submitTx(redeem);
                        order.content.finalize.previousFinalRef = order.pow.hash;
                        order.content.finalize.redemptionTx = redeem;
                        order.content.finalize.redemptionTxId = txid;
                        order.pow.hash = order.pow.hash + "-redeem" + (0, matching_1.randomInt)(1000);
                        window.traderApi.issueOffer(order);
                        window.storage.removeIssuedOffers([orderPreviousState.pow.hash]);
                    }
                    catch (e) {
                        order.content.finalize.previousFinalRef = order.pow.hash;
                        order.pow.hash = order.pow.hash + "-noredeem" + (0, matching_1.randomInt)(1000);
                        window.traderApi.issueOffer(order);
                        window.storage.removeIssuedOffers([orderPreviousState.pow.hash]);
                        //console.error(e)
                    }
                }
            }
            else if (order.content.accept) {
                //ACCEPTED
                const inputs = await interpreter.getUtXo(order);
                if (order.content.accept.openingTx.hashLocks[1]) {
                    if (order.content.accept.openingTx.hashLocks[0] == undefined && (0, matching_1.checkOriginatorId)(order.content.originatorId)) {
                        order.content.accept.openingTx.hashLocks[0] = await window.hashLockProvider.getHashLock(order);
                    }
                }
                //TODO verify malleability of locks
                if (!(order.content.accept.openingTx.hashLocks[0] && order.content.accept.openingTx.hashLocks[1])) {
                    console.error("NO HASHLOCK COMMITMENT!");
                    return; //wait for all locks to be committed
                }
                let stateTxId = undefined;
                if (order.content.terms.dependsOn) {
                    const candidates = await window.storage.queryOffers({
                        where: async (x) => x.content.orderId === order.content.terms.dependsOn.orderId
                    }, pagedescriptor);
                    if (candidates.length === 0) {
                        console.error("STALKER: AWAIT DEPENDENCY: " + order.content.orderId + " <= " + order.content.terms.dependsOn.orderId);
                        return;
                    }
                    const dependency = (0, matching_1.maxBy)(candidates, x => rank(x)); //maxBy just in case
                    if (!dependency.content.finalize) {
                        console.error("STALKER: DEPENDENCY: " + dependency.pow.hash);
                        console.error("STALKER: AWAIT DEPENDENCY STATE: " + order.content.orderId + " <= " + order.content.terms.dependsOn.orderId);
                        return;
                    }
                    else {
                        console.error("STALKER: DEPENDENCY AVAILABLE " + dependency.pow.hash);
                    }
                    const idx = dependency.content.terms.partyBetsOn.find(x => x === order.content.terms.dependsOn.outcome) ? 0 : 1;
                    stateTxId = await (0, generate_btc_tx_1.doubleSHA256reversed)(dependency.content.accept.cetTxSet[idx].tx);
                    console.error("STALKER: DEPENDENCY STATE TXID:" + stateTxId);
                }
                const [contract, partial] = await interpreter.genContractTx(inputs, [commitment], order, stateTxId);
                if (partial !== undefined) {
                    partial.content.accept.offerRef = partial.pow.hash;
                    partial.pow.hash = partial.pow.hash + "-signing" + (0, matching_1.randomInt)(1000);
                    console.log("############# ISSUE:" + partial.pow.hash);
                    window.traderApi.issueOffer(partial);
                    window.storage.removeIssuedOffers([orderPreviousState.pow.hash]);
                }
                else {
                    //CO-SIGNED
                    order.content.accept.cetTxSet[0].tx = contract.cet[0];
                    order.content.accept.cetTxSet[1].tx = contract.cet[1];
                    order.content.accept.openingTx.tx = contract.openingTx;
                    if (!order.content.accept.openingTx.hashUnlocks) {
                        order.content.accept.openingTx.hashUnlocks = [];
                    }
                    if (order.content.dependantOrdersIds !== undefined) {
                        console.error("STALKER: CHECK COMPOSITE ORDER INTEGRITY: " + order.content.orderId + " " + order.pow.hash);
                        const dependants = await window.storage.queryOffers({
                            where: async (x) => x.content.terms.dependsOn && order.content.orderId === x.content.terms.dependsOn.orderId && x.content.accept !== undefined
                        }, pagedescriptor);
                        const filtered = Object.values(Object.groupBy(dependants, x => x.content.orderId)).map(candidates => (0, matching_1.maxBy)(candidates, x => rank(x)));
                        const ordersIds = filtered.map(x => x.content.orderId).sort();
                        const expected = order.content.dependantOrdersIds.sort();
                        const integrity = ordersIds[0] ? ordersIds.map((x, i) => expected[i] !== undefined && expected[i] === x).reduce((a, b) => a && b) : false;
                        if (!integrity) {
                            console.error("STALKER: AWAIT DEPENDANTS FOR: " + order.content.orderId + " " + ordersIds);
                            return;
                        }
                        const unlocked = filtered.map(x => x.content.accept && x.content.accept.openingTx.hashLocks && x.content.accept.openingTx.hashLocks[0] && x.content.accept.openingTx.hashLocks[1]).reduce((a, b) => a && b);
                        if (!unlocked) {
                            //console.error("STALKER: AWAIT DEPENDANTS TO COMMIT HTLC: " + order.content.orderId + " " + ordersIds)
                            //return
                        }
                        else {
                            //console.error("STALKER: DEPENDANTS COMMITTED" + order.content.orderId + " " + ordersIds)
                        }
                    }
                    if ((0, matching_1.checkOriginatorId)(order.content.originatorId)) {
                        order.content.accept.openingTx.hashUnlocks[0] = await window.hashLockProvider.getHashLock(order);
                    }
                    else {
                        order.content.accept.openingTx.hashUnlocks[1] = await window.hashLockProvider.getHashLock(order);
                    }
                    console.error("[FINAL LOCKING TX]" + JSON.stringify(order));
                    const txId = contract.openingTx ? await interpreter.submitTx(contract.openingTx) : "DEPENDANT";
                    order.content.finalize = {
                        txid: txId, acceptRef: order.pow.hash, backup: contract.cet[0] + ",,,," + contract.cet[1]
                    };
                    order.pow.hash = order.pow.hash + "-final" + (0, matching_1.randomInt)(100);
                    await window.traderApi.issueOffer(order);
                    await window.storage.removeIssuedOffers([orderPreviousState.pow.hash]);
                }
            }
            console.log("############# REMOVE:" + orderPreviousState.pow.hash);
            ignore[orderPreviousState.pow.hash] = true;
            window.storage.removeIssuedOffers([orderPreviousState.pow.hash]);
        }
        catch (err) {
            console.error(err);
            const failed = structuredClone(orderPreviousState);
            failed.content.failed = err.msg;
            failed.pow.hash = failed.pow.hash + "-failed" + (0, matching_1.randomInt)(100);
            await window.traderApi.issueOffer(failed);
            await window.storage.removeIssuedOffers([orderPreviousState.pow.hash]);
        }
    });
};
exports.stalkingEngine = {
    trackIssuedOffers
};
//# sourceMappingURL=stalking.js.map
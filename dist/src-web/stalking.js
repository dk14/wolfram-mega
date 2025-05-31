"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stalkingEngine = void 0;
const matching_1 = require("./matching");
const trackIssuedOffers = async (interpreters, dataProvider) => {
    const pagedescriptor = {
        page: 0,
        chunkSize: 100
    };
    const allOffers = (await window.storage.queryIssuedOffers({
        where: async (x) => true
    }, pagedescriptor));
    const allOffersGrouped = Object.groupBy(allOffers, x => x.content.orderId);
    const reattemptMuSig = 10;
    const allOffersFiltered = Object.entries(allOffersGrouped).filter(x => x[1].length > reattemptMuSig).map(x => x[1]).flat();
    allOffersFiltered.forEach(async (order) => {
        try {
            const interpreter = interpreters[order.content.blockchain];
            const endpoint = (await window.storage.queryCapabilities({ where: async (x) => x.capabilityPubKey === order.content.terms.question.capabilityPubKey }, pagedescriptor))[0].endpoint;
            const commitment = await dataProvider.getCommitment(endpoint, order.content.terms.question);
            if (order.content.terms.question2) {
            }
            if (order.content.finalize) {
                try {
                    const fact = await dataProvider.getFact(endpoint, commitment);
                    const cetTxId = {
                        txid: order.content.finalize.txid,
                        vout: 0
                    };
                    const cet = order.content.accept.cetTxSet;
                    if (fact.factWithQuestion === 'YES') {
                        interpreter.submitTx(cet[0].tx);
                    }
                    else {
                        interpreter.submitTx(cet[1].tx);
                    }
                    const redeem = await interpreter.genRedemtionTx(cetTxId, [commitment], fact, order);
                    interpreter.submitTx(redeem);
                }
                catch {
                }
            }
            else if (order.content.accept) {
                const inputs = await interpreter.getUtXo(order);
                const [contract, partial] = await interpreter.genContractTx(inputs, [commitment], order);
                if (partial !== undefined) {
                    partial.pow.hash = partial.pow.hash + "-signing" + (0, matching_1.randomInt)(100);
                    partial.content.utxos[0] = inputs.utxoAlice.map(x => [x.txid, x.vout]);
                    partial.content.utxos[1] = inputs.utxoBob.map(x => [x.txid, x.vout]);
                    window.traderApi.issueOffer(partial);
                }
                else {
                    order.content.accept.cetTxSet[0].tx = contract.cet[0];
                    order.content.accept.cetTxSet[1].tx = contract.cet[1];
                    order.content.accept.openingTx.tx = contract.openingTx;
                    const txId = await interpreter.submitTx(contract.openingTx);
                    order.content.finalize = {
                        txid: txId, acceptRef: order.pow, backup: contract.cet[0] + ",,,," + contract.cet[1]
                    };
                    window.traderApi.issueOffer(order);
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    });
};
exports.stalkingEngine = {
    trackIssuedOffers
};
//# sourceMappingURL=stalking.js.map
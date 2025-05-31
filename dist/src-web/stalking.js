"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stalkingEngine = void 0;
const trackIssuedOffers = async (interpreters, dataProvider) => {
    const pagedescriptor = {
        page: 0,
        chunkSize: 100
    };
    const allOffers = (await window.storage.queryIssuedOffers({
        where: async (x) => true
    }, pagedescriptor));
    allOffers.forEach(async (myOffer) => {
        try {
            const interpreter = interpreters[myOffer.content.blockchain];
            if (myOffer.content.finalize) {
            }
            else if (myOffer.content.accept) {
                // re-generate transaction
                // compare with received transaction
                const endpoint = (await window.storage.queryCapabilities({ where: async (x) => x.capabilityPubKey === myOffer.content.terms.question.capabilityPubKey }, pagedescriptor))[0].endpoint;
                const commitment = await dataProvider.getCommitment(endpoint, myOffer.content.terms.question);
                const inputs = await interpreter.getUtXo(myOffer.content.terms, commitment);
                const [contract, offer] = await interpreter.genContractTx(inputs, commitment, myOffer);
                if (offer !== undefined) {
                    offer.pow.hash = offer.pow.hash + "-signing";
                    window.traderApi.issueOffer(offer);
                }
                else {
                    // publish
                    // finalize offer
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
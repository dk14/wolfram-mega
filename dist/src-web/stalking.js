"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackIssuedOffers = void 0;
const transactions_1 = require("./transactions");
const trackIssuedOffers = async () => {
    const pagedescriptor = {
        page: 0,
        chunkSize: 100
    };
    const allOffers = (await window.storage.queryIssuedOffers({
        where: async (x) => true
    }, pagedescriptor));
    allOffers.forEach(async (myOffer) => {
        try {
            if (myOffer.content.finalize) {
            }
            else if (myOffer.content.accept) {
                // re-generate transaction
                // compare with received transaction
                const tx = myOffer.content.accept.openingTx.tx;
                const commitment = undefined; // todo oracle commitment
                const inputs = await (0, transactions_1.getUtXo)(myOffer, commitment);
                const [contract, offer] = await (0, transactions_1.genDlcContract)(inputs, myOffer);
                if (contract.cet[0] === undefined || contract.cet[1] === undefined) {
                    offer.pow.hash = offer.pow.hash + "-signing";
                    window.traderApi.issueOffer(offer);
                }
                else {
                    // publish
                    // finalize
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    });
};
exports.trackIssuedOffers = trackIssuedOffers;
//# sourceMappingURL=stalking.js.map
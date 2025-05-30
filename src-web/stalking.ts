import { Commitment } from "../src/protocol"
import { PreferenceModel, checkOriginatorId } from "./matching"
import { genDlcContract, getUtXo } from "./transactions"

export const trackIssuedOffers = async (pref: PreferenceModel) => {
    const pagedescriptor = {
        page: 0,
        chunkSize: 100
    }

    const allOffers = (await window.storage.queryIssuedOffers({
        where: async x => true}, pagedescriptor))


    allOffers.forEach(async myOffer => {
        try {
            if (myOffer.content.finalize) {

            } else if (myOffer.content.accept) {
                // re-generate transaction
                // compare with received transaction
                
                const tx = myOffer.content.accept.openingTx.tx
                const commitment: Commitment = undefined // todo oracle commitment
                const inputs = await getUtXo(myOffer, commitment, pref)
                const [contract, offer] = await genDlcContract(inputs, myOffer)
                if (contract.cet[0] === undefined || contract.cet[1] === undefined) {
                    offer.pow.hash = offer.pow.hash + "-signing"
                    window.traderApi.issueOffer(offer)
                } else {
                    // publish
                    // finalize
                }
                
            }
        } catch (err) {
            console.error(err)
        }   
    })

}
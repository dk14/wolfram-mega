import { Commitment } from "../src/protocol"
import { PreferenceModel, checkOriginatorId } from "./matching"
import { ContractInterpreter } from "./transactions"

export interface StalkingEngine {
    trackIssuedOffers: (interpreters: {[id: string]: ContractInterpreter}) => Promise<void>
}

const trackIssuedOffers = async (interpreters: {[id: string]: ContractInterpreter}) => {
    const pagedescriptor = {
        page: 0,
        chunkSize: 100
    }

    const allOffers = (await window.storage.queryIssuedOffers({
        where: async x => true}, pagedescriptor))


    allOffers.forEach(async myOffer => {
        try {
            const interpreter = interpreters[myOffer.content.blockchain]
            if (myOffer.content.finalize) {

            } else if (myOffer.content.accept) {
                // re-generate transaction
                // compare with received transaction
                
                const tx = myOffer.content.accept.openingTx.tx
                const commitment: Commitment = undefined // todo oracle commitment
                const inputs = await interpreter.getUtXo(myOffer.content.terms, commitment)
                const [contract, offer] = await interpreter.genContractTx(inputs, myOffer)

                if (offer !== undefined) {
                    offer.pow.hash = offer.pow.hash + "-signing"
                    window.traderApi.issueOffer(offer)
                } else {
                    // publish
                    // finalize offer
                }
                
            }
        } catch (err) {
            console.error(err)
        }   
    })

}

export const stalkingEngine: StalkingEngine = {
    trackIssuedOffers
}
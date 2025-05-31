import { UTxO } from "../src/client-api/contracts/btc/tx"
import { Commitment, Fact, FactRequest, OfferMsg } from "../src/protocol"
import { PreferenceModel, checkOriginatorId } from "./matching"
import { OracleDataProvider } from "./oracle-data-provider"
import { ContractInterpreter } from "./transactions"

export interface StalkingEngine {
    trackIssuedOffers: (interpreters: {[id: string]: ContractInterpreter}, dataProvider: OracleDataProvider) => Promise<void>
}

const trackIssuedOffers = async (interpreters: {[id: string]: ContractInterpreter}, dataProvider: OracleDataProvider) => {
    const pagedescriptor = {
        page: 0,
        chunkSize: 100
    }

    const allOffers = (await window.storage.queryIssuedOffers({
        where: async x => true}, pagedescriptor))

    const allOffersGrouped: {[key: string]: OfferMsg[]} = Object.groupBy(allOffers, x => x.content.orderId)

    const reattemptMuSig = 10
    const allOffersFiltered = Object.entries(allOffersGrouped).filter(x => x[1].length > reattemptMuSig).map(x => x[1]).flat()

    allOffersFiltered.forEach(async order => {
        try {
            const interpreter = interpreters[order.content.blockchain]

            const endpoint = (await window.storage.queryCapabilities(
                {where: async x => x.capabilityPubKey === order.content.terms.question.capabilityPubKey}, pagedescriptor)
            )[0].endpoint

            const commitment: Commitment = await dataProvider.getCommitment(endpoint, order.content.terms.question)

            if (order.content.terms.question2) {

            }

            if (order.content.finalize) {
                try {
                    const fact = await dataProvider.getFact(endpoint, commitment)
                    const cetTxId = {
                        txid: order.content.finalize.txid,
                        vout: 0
                    }

                    const cet = order.content.accept.cetTxSet
                    if (fact.factWithQuestion === 'YES') {
                        interpreter.submitTx(cet[0].tx)
                    } else {
                        interpreter.submitTx(cet[1].tx)
                    }
                    
                    const redeem = await interpreter.genRedemtionTx(cetTxId, [commitment], fact, order)
                    interpreter.submitTx(redeem)
                } catch {

                }   

            } else if (order.content.accept) {

                const inputs = await interpreter.getUtXo(order)
                
                const [contract, partial] = await interpreter.genContractTx(inputs, [commitment], order)

                if (partial !== undefined) {
                    partial.pow.hash = partial.pow.hash + "-signing"
                    partial.content.utxos[0] = inputs.utxoAlice.map(x => [x.txid, x.vout])
                    partial.content.utxos[1] = inputs.utxoBob.map(x => [x.txid, x.vout])
                    window.traderApi.issueOffer(partial)
                } else {
                    order.content.accept.cetTxSet[0].tx = contract.cet[0]
                    order.content.accept.cetTxSet[1].tx = contract.cet[1]
                    order.content.accept.openingTx.tx = contract.openingTx
                    
                    const txId = await interpreter.submitTx(contract.openingTx)

                    order.content.finalize = {
                        txid: txId, acceptRef: order.pow, backup: contract.cet[0] + ",,,," + contract.cet[1]
                    }
                    window.traderApi.issueOffer(order)
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
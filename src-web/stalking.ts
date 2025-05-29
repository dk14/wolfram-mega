import { checkOriginatorId } from "./matching"

export const trackIssuedOffers = async () => {
    const pagedescriptor = {
        page: 0,
        chunkSize: 100
    }
    const myOffers = (await window.storage.queryIssuedOffers({
        where: async x => checkOriginatorId(x.content.originatorId)}, pagedescriptor))
    
    myOffers.forEach(myOffer => {
        try {
            if (myOffer.content.accept) {
                // re-generate transaction
                // compare with received transaction
                
                const tx = myOffer.content.accept.openingTx.tx
                const commitment = undefined // todo oracle commitment
    
                const counterPartyCommitment = myOffer.content.accept.openingTx.sesionCommitments[0]
                if (!myOffer.content.accept.openingTx.sesionCommitments[1]){
                    myOffer.content.accept.openingTx.sesionCommitments[1] = ""
                } else {
                    const counterpartyNonce = myOffer.content.accept.openingTx.sessionNonces[0]

                    if (!myOffer.content.accept.openingTx.sessionNonces[1]) {
                        myOffer.content.accept.openingTx.sessionNonces[1] = "" 
                        myOffer.pow.hash = myOffer.pow.hash + "nonce"
                        window.traderApi.issueOffer(myOffer)
                    } else {
                        const counterpartySig = myOffer.content.accept.openingTx.partialSigs[0] 
                        if (!myOffer.content.accept.openingTx.partialSigs[1]) {
                            myOffer.content.finalize = {
                                txid: "",
                                acceptRef: myOffer.pow
                            }
                            myOffer.pow.hash = myOffer.pow.hash + "sig"
                            window.traderApi.issueOffer(myOffer)
                        }
                    }
                } 
            }
        } catch (err) {
            console.error(err)
        }   
    })

    const theirOffers = (await window.storage.queryIssuedOffers({
        where: async x => checkOriginatorId(x.content.originatorId)}, pagedescriptor))
    
    theirOffers.forEach(theirOffer => {
        
        try {
            const tx = theirOffer.content.accept.openingTx.tx
            const commitment = undefined // todo oracle commitment

            if (theirOffer.content.accept) {
                if (theirOffer.content.accept.openingTx.sesionCommitments[1]){
                    const counterPartyCommitment = theirOffer.content.accept.openingTx.sesionCommitments[1]
                    if (!theirOffer.content.accept.openingTx.sessionNonces[0]) {
                        theirOffer.content.accept.openingTx.sessionNonces[0] = ""
                        theirOffer.pow.hash = theirOffer.pow.hash + "nonce"
                        window.traderApi.issueOffer(theirOffer)
                    } else if (theirOffer.content.accept.openingTx.sessionNonces[1]) {
                        const counterPartyNonce = theirOffer.content.accept.openingTx.sessionNonces[1]
                        theirOffer.content.accept.openingTx.partialSigs[0] = ""
                        theirOffer.pow.hash = theirOffer.pow.hash + "sig"
                        window.traderApi.issueOffer(theirOffer)
                    }
                }
            }
        } catch (err) {
            console.error(err)
        }
    })
}
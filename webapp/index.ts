
import { OfferModel, PreferenceModel } from '../src-web/models';
import { MaleabilityReport } from '../src/protocol';
import { MatchingEngine } from '../src-web/matching-api';

declare global {
    interface Window {
        offersFound: number
        highlightOrders: string
        model: {
            profile: PreferenceModel,
            offers: OfferModel[],
            contracts: OfferModel[]
        },
        pickOrGenerateOffer: (pick: boolean) => Promise<OfferModel>
        removeInterest: (tag: string) => void
        createOfferInfo: (offer: OfferModel, isTentative: boolean, isFullInfo?: boolean) => HTMLElement
        renderOfferDetails: (offer: OfferModel) => void
        renderOfferPreview: (where: HTMLElement, offer: OfferModel, append: boolean) => HTMLElement
        renderContractPreview: (where: HTMLElement, contract: OfferModel) =>  void

        copyAddressToBuffer: () => void
        switchTab: (tab: string) => void

        matching: MatchingEngine

        DarkReader: any
    }
}


(Array.from(document.getElementsByClassName("scrollable")) as HTMLElement[]).forEach(x => {
    x.style.height = `${window.innerHeight - 130 - 110}`
})

window.onresize = (event) => { 
    (Array.from(document.getElementsByClassName("scrollable")) as HTMLElement[]).forEach(x => {
        x.style.height = `${window.innerHeight - 130 - 100}`
    })
}

setTimeout(() => {
    if(!window.offersFound){
        location.reload()
    }
}, 14000)

let loading_i = 0
const loadingAnimation = setInterval(() => {
    if (document.getElementById("loading")) {
        loading_i++
        document.getElementById("loading").innerText = "Loading" + ".".repeat(loading_i % 3)
    } else {
        clearInterval(loadingAnimation)
    }
}, 500)

const defaultClr = "gray"
const accentColor = "yellow" 
window.highlightOrders = "cyan"  

const conf = {
    brightness: 80,
    contrast: 200,
    sepia: 80
}


const recolor = () => {
    try {

        if (document.getElementById("matching_svg") &&
        document.getElementById("profile_svg") &&
        document.getElementById("contracts_svg")) {

            
            window.DarkReader.setFetchMethod(window.fetch)

            document.getElementById("contracts_svg").setAttribute("fill", defaultClr)
            document.getElementById("matching_svg").setAttribute("fill", accentColor)
                
            document.getElementById("matching_svg").style.filter = "brightness(2.0)"
            document.getElementById("contracts_svg").style.filter = "brightness(3.7)"
            document.getElementById("profile_svg").style.filter = "brightness(3.7)"

            document.getElementById("profile_svg").setAttribute("fill", defaultClr)
                
            
            window.DarkReader.enable(conf);
            //clearInterval(color)
        }

    } catch {

    }
    
}

try {
    recolor()
} catch {

}

try {
    const container = document.getElementById("offer-tree-container")
    const containerReports = document.getElementById("report-tree-container")

    if (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")) {
        
        const el = document.createElement("div")
        el.setAttribute("id", "offer-tree")
        container.appendChild(el)

        const el2 = document.createElement("div")
        el2.setAttribute("id", "report-tree")
        containerReports.appendChild(el2)
    } else {
        const scriptTag = document.createElement('script');
        scriptTag.src = "https://unpkg.com/@alenaksu/json-viewer@2.1.0/dist/json-viewer.bundle.js";
        document.body.appendChild(scriptTag);
        
        const el = document.createElement("json-viewer")
        el.setAttribute("id", "offer-tree")
        el["data"] = {loading: true}
        container.appendChild(el)

        const el2 = document.createElement("json-viewer")
        el2.setAttribute("id", "report-tree")
        el2["data"] = {loading: true}
        containerReports.appendChild(el2)
    }
    
} catch {}

document.getElementById("matching_svg").addEventListener("load", () => {
    document.getElementById("matching_svg").setAttribute("fill", "brown")
})
            
window.switchTab = (tabname) => {
    document.getElementById("matching").style.display = "none"
    document.getElementById("contracts").style.display = "none"
    document.getElementById("profile").style.display = "none"
    document.getElementById("offer").style.display = "none"

    try {

        document.getElementById("contracts_svg").setAttribute("fill", defaultClr)
        document.getElementById("matching_svg").setAttribute("fill", defaultClr)
        
        document.getElementById("profile_svg").setAttribute("fill", defaultClr)
        
        document.getElementById(tabname+"_svg").setAttribute("fill", accentColor)
    } catch (e) {
        console.log(e)
    }
        
    document.getElementById(tabname).style.display = "block"
    
}

//await on original init does not work; browser bug
const initWebapp = new Promise(resolve => { 
    const cancel = setInterval(() => {
        if (window.pool && window.matching && window.matching.loadProfile) {
            clearInterval(cancel)
            resolve(null)
        }
    }, 100)
});


(async () => { //jsdom doesn't support modules..we simulate one

    await initWebapp 

    let cancel = () => {}

    setInterval(async () => {
        cancel()
        const offerCollectors = await window.matching.collectOffers(window.model.profile)                  
        setInterval(() => window.progressOffers(), 5000)
         const questionCollectors = await window.matching.collectQuestions(window.model.profile)  
        cancel = () => {
            offerCollectors.forEach(([_, cancel]) => cancel())
            questionCollectors.forEach(([_, cancel]) => cancel())
        }  
    }, 4000)

    setInterval(() => {
        try {
            document.getElementById("peers").innerText = "" + window.peerlist.length
        } catch { }    
    }, 1000)

    window.model = {
        profile: undefined,
        offers: [],
        contracts: []
    }

    setTimeout(async () => {
        const profile = await window.matching.loadProfile();
        if (profile === undefined) {
            return
        }
        
        window.model.profile = profile;
        window.document.dispatchEvent(new Event('init-model'));
        document.getElementById("ranktext").innerText = "" + window.model.profile.minOracleRank;
        (document.getElementById("oracle-strength") as HTMLInputElement).valueAsNumber = window.model.profile.minOracleRank;
        (document.getElementById("txfee") as HTMLInputElement).valueAsNumber = window.model.profile.txfee; 

        document.getElementById(`tag-world`).remove();
        document.getElementById(`tag-sports`).remove();

        profile.tags = [...new Set(profile.tags )]
        profile.tags.forEach(tag => {
            const btn = document.createElement("button");
            btn.className="tag-button";
            btn.id = `tag-${tag}`;
            btn.innerText = tag;
            btn.onclick = () => {
                window.removeInterest(tag);
            }
            document.getElementById("tags").appendChild(btn)
        })

    }, 1000)
    
    try {
        document.getElementById("oracle-strength").onchange = () => {
            window.model.profile.minOracleRank = (document.getElementById("oracle-strength") as HTMLInputElement).valueAsNumber
            document.getElementById("ranktext").innerText = "" + window.model.profile.minOracleRank
            window.matching.saveProfile(window.model.profile) 
        }
    } catch (e) {
        console.error(e)
    }

    try {
        document.getElementById("txfee").onchange = () => {
            window.model.profile.txfee = (document.getElementById("txfee") as HTMLInputElement).valueAsNumber; 
            window.matching.saveProfile(window.model.profile) 
        }
    } catch (e) {
        console.error(e)
    }

    document.getElementById("send-funds-button").onclick = async () => {
        try {
            const amount = (document.getElementById("send-funds-amount") as HTMLInputElement).valueAsNumber
            const address = (document.getElementById("send-funds-address") as HTMLInputElement).value
            const tx = window.matching.takeWinnings(amount + window.model.profile.txfee, address, window.model.profile.txfee)
            navigator.clipboard.writeText(await tx)
            alert("Copied TxBody To Clipboard!")
        } catch (e) {
            alert(e.message)
        }

    }

    window.pickOrGenerateOffer = async (pick: boolean) => {
        if (pick) {
            try {
                return await window.matching.pickOffer(window.model.profile)
            } catch (e) {
                console.error(e)
                return await window.matching.generateOffer(window.model.profile)
            }
            
        } else {
            return await window.matching.generateOffer(window.model.profile)
        }
    }

    window.document.dispatchEvent(new Event('init-offer-controller'));

    window.removeInterest = (tag: string) => {
        window.model.profile.tags = window.model.profile.tags.filter(x => x != tag)
        document.getElementById(`tag-${tag}`).remove()
        window.matching.saveProfile(window.model.profile) 
    }


    document.getElementById("interest").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("add-interest-button").click();
    }
    })

    document.getElementById("add-interest-button").onclick = () => {
        const tag = (document.getElementById("interest") as HTMLInputElement).value
        if (window.model.profile.tags.find(x => x === tag)) {
            return
        }
        const btn = document.createElement("button")
        btn.className="tag-button"
        btn.id = `tag-${tag}`
        btn.innerText = tag;
        window.model.profile.tags.push(tag)
        btn.onclick = () => {
            window.removeInterest(tag)
        }
        document.getElementById("tags").appendChild(btn)
        window.matching.saveProfile(window.model.profile) 

    }

    window.createOfferInfo = (offer, isTentative = false, isFullInfo = false) => {
        const offerInfo = document.createElement("div")
        function chunkString(sStr, iLen) {
            return [...sStr].reduce((aChunks, sChar, iIdx) => ( 
            aChunks.push(iIdx % iLen === 0 ? sChar : aChunks.pop() + sChar), aChunks), [])
        }
        const offerQuestion = document.createElement("span")
        offerQuestion.style = ""
        offerQuestion.innerHTML = `<pre><span color="purple" style = "display:inline-block; max-width: 15ch; overflow: hidden; text-overflow: ellipsis;">${offer.question}</span></pre>`
        
        //textFit(offerQuestion.getElementById("question")) 
        const offerBet = document.createElement("pre")
        offerBet.innerHTML = `<font color = "grene">${offer.bet[0]}:${offer.bet[1]} sat</font>`


        const oracle = document.createElement("pre")
        oracle.innerHTML = `<font color="brown">${offer.oracles[0].oracle.slice(0, 15) + "..." + (offer.oracles.length > 1 ? " +" : "")}</font>`
        const oracleEndpoint = document.createElement("pre")
        oracleEndpoint.innerHTML = `<font color="brown">${offer.oracles[0].endpoint.replace("http://", "").replace("https://", "").slice(0, 15) + (offer.oracles.length > 1 ? "+" : "")}</font>`


        offerInfo.appendChild(offerQuestion)
        offerInfo.appendChild(offerBet)
        offerInfo.appendChild(oracle)
        offerInfo.appendChild(oracleEndpoint)

        if (offer.status && !isTentative) {
            const rename = (status) => {
                if (status === "oracle committed") {
                    return "accepted, oracle committed"
                } else {
                    return status
                }
            }
            const offerStatus = document.createElement("pre")
            offerStatus.innerHTML = `<font color="white">${rename(offer.status)}</font>`
            offerInfo.appendChild(offerStatus)
            if (offer.role === "acceptor" && !offer.betOn || offer.role === "initiator" && offer.betOn) {
                offerBet.innerHTML = `<font color = "grene">[u bet ${offer.bet[0]} sat on YES]:${offer.bet[1]}</font>`
            } else {
                offerBet.innerHTML = `<font color = "grene">${offer.bet[0]}:[u bet ${offer.bet[1]} sat on NO]</font>`
            }
            oracle.innerHTML = `<font color="brown">${offer.oracles[0].oracle.slice(0, 30) + "..." + (offer.oracles.length > 1 ? " +" : "")}</font>`
            oracleEndpoint.innerHTML = `<font color="brown">${offer.oracles[0].endpoint.replace("http://", "").replace("https://", "").slice(0, 30) + (offer.oracles.length > 1 ? "+" : "")}</font>`
                
        }
        return offerInfo
    }

    window.renderOfferPreview = (where: HTMLElement, offer: OfferModel, append = true) => {
        const downArrowSvg = document.createElement("img")
        downArrowSvg.src = "./assets/down.svg"
        downArrowSvg.className = "offer-button"
        downArrowSvg.onclick = () => {
            window.renderOfferDetails(offer)
        }


        const yesSvg = document.createElement("img")
        yesSvg.src = "./assets/yes.svg"
        yesSvg.className = "offer-button"
        yesSvg.onclick = async () => {
            let confirmed = undefined
            if ((document.getElementById("confirm_orders") as HTMLInputElement).checked) {
                confirmed = confirm("Bet " + offer.bet[1] + " sat against '" + offer.question + "'")
            } else {
                confirmed = true
            }
            if (confirmed) {
                console.log(offer.status)
                    if (offer.role === 'initiator') {
                        offer.betOn = true
                        await window.matching.broadcastOffer(offer)
 
                    } else {
                        if (!offer.betOn) {
                            window.matching.acceptOffer(offer)
                        } else {
                            console.log("Needs opposite position to accept")
                        }
                    }
                    
                }
        }


        const noSvg = document.createElement("img")
        noSvg.src = "./assets/no.svg"
        noSvg.className = "offer-button"
        noSvg.onclick = async () => {
            let confirmed = undefined
            if ((document.getElementById("confirm_orders") as HTMLInputElement).checked) {
                confirmed = confirm("Bet " + offer.bet[1] + " sat against '" + offer.question + "'")
            } else {
                confirmed = true
            }          
            if (confirmed) {
                if (offer.role === 'initiator') {
                    offer.betOn = false
                    await window.matching.broadcastOffer(offer)
                } else {
                    if (offer.betOn) {
                        window.matching.acceptOffer(offer)
                    } else {
                        console.log("Needs opposite position to accept")
                    }
                    
                }  
            }     
        }
            
        const updateSvg = document.createElement("img")
        updateSvg.src = "./assets/cycle.svg"
        updateSvg.className = "offer-button"
        
        const offerInfo = window.createOfferInfo(offer, true)
        offerInfo.className = "offer-info"
        

        const panel = document.createElement("div")
        panel.className = "panel offer-preview"
        panel.appendChild(updateSvg)
        panel.appendChild(offerInfo)

        if (offer.role !== 'initiator' && offer.betOn) {
            yesSvg.style = "filter: grayscale(1)"
        }
        panel.appendChild(yesSvg)

        if (offer.role !== 'initiator' && !offer.betOn) {
            noSvg.style = "filter: grayscale(1)"
        } 
        panel.appendChild(noSvg)

        
        panel.appendChild(noSvg)
        panel.appendChild(downArrowSvg)

        
        updateSvg.onclick = async () => {
            const newOffer = await window.pickOrGenerateOffer(Math.random() < 0.5)
            const panel2 = window.renderOfferPreview(where, newOffer, false)
            where.replaceChild(panel2, panel)
        }
        
        if (append) {
            where.appendChild(panel)
        }
        
        return panel

    }

    const maxMatching = 3
    window.offersFound = 0

    const camcel = setInterval(async () => {
        if (window.offersFound >= maxMatching - 1) {
            clearInterval(camcel)
        }
        try {
            const offer = await window.matching.generateOffer(window.model.profile)
            window.offersFound++
            window.model.offers.push(offer)
            window.renderOfferPreview(document.getElementById("matching"), offer, true)
            document.getElementById("loading").remove()
        } catch {

        }

    }, 500)

    window.copyAddressToBuffer = () => {
        navigator.clipboard.writeText(window.address)
        alert('Copied to Clipboard')
    }

    setInterval(async () => {
        try {
            const address =  window.address.length > 20 ? 
            window.address.slice(0, 30) + "..."//"n3W8YyK59F6vQe34uQ8n835L627k2J"
            : window.address

            try {
                const user = window.user === 'default' ? '' : ` (${window.user})`
                const stats = await (await fetch("https://mempool.space/testnet/api/address/" + window.address)).json()
                const bal = stats.chain_stats.funded_txo_sum - stats.chain_stats.spent_txo_sum
                const balance = bal === 0 ? "0,000 sat" : bal.toLocaleString() + " sat"
                document.getElementById("wallet-balance").innerText = balance + user

            } catch {
                const balance = "0,000 sat"
                document.getElementById("wallet-balance").innerText = balance + window.user
            }
            document.getElementById("wallet-address").innerText = address
        } catch {

        }
    }, 1000)
    
    window.renderOfferDetails = async (offer: OfferModel) => {
        const tree = document.getElementById("offer-tree")
        tree["data"] = offer
        tree["expand"]('**.*');
        window.switchTab("offer")
        const offerInfo = window.createOfferInfo(offer, false)
        offerInfo.className = "offer-info"
        const terms = document.getElementById("terms")
        terms.innerHTML = ""
        terms.appendChild(offerInfo)

        const reports = await window.matching.fetchRelatedReports(offer, 20)
        const reportsIssued = await window.matching.fetchRelatedReports(offer, 20)
        const combined = {}
        combined["collected-known"] = reports
        combined["broadcasting-issued"] = reportsIssued
        

        const reportTree = document.getElementById("report-tree")
        reportTree["data"] = combined
        reportTree["expand"]('**.*');

        document.getElementById("delete-offer").onclick = () => {
            window.storage.removeOffers([offer.id])
            window.storage.removeIssuedOffers([offer.id])
            alert('Deleted from Database! Collectors might bring it back!')
        }

        document.getElementById("delete-cp").onclick = () => {
            window.storage.removeCps([offer.oracles[0].capabilityPub])
            alert('Deleted from Database! Collectors might bring it back!')
        }
    }

    window.renderContractPreview = (where: HTMLElement, contract: OfferModel) => {
        const downArrowSvg = document.createElement("img")
        downArrowSvg.src = "./assets/down.svg"
        downArrowSvg.className = "offer-button"
        downArrowSvg.onclick = () => {
            window.renderOfferDetails(contract)
        }

        const removeSvg = document.createElement("img")
        removeSvg.src = "./assets/remove.svg"
        removeSvg.className = "offer-button"
        removeSvg.onclick = () => {
            if (contract.status === 'matching' || contract.status === 'redeem tx available' || contract.status === 'tx submitted' || contract.status === 'failed') {
                window.matching.removeOrder(contract.id)
            } else {
                alert('Cannot delete offer in progress!')
            }
        }

        const offerInfo = window.createOfferInfo(contract, false)
        offerInfo.className = "contract-info"
        const panel = document.createElement("div")
        panel.className = "panel wide-panel"
        panel.appendChild(removeSvg)

        panel.appendChild(offerInfo)

        panel.appendChild(downArrowSvg)
        where.appendChild(panel)
    }

    

    window.model.contracts.forEach(contract => {
        window.renderContractPreview(document.getElementById("contracts"), contract)
    })

    setInterval(async () => {
        try {
        
            const orders = await window.matching.listOrders(20)
            const odersCensored = orders.map(o => {
                const copy = structuredClone(o)
                copy["msg"] = undefined
                copy.oracles[0]["msg"]
                return copy
            })

            const contractsCensored = window.model.contracts.map(o => {
                const copy = structuredClone(o)
                copy["msg"] = undefined
                copy.oracles[0]["msg"]
                return copy
            })

            if (JSON.stringify(odersCensored) === JSON.stringify(contractsCensored)) {
                return
            }

            document.getElementById("contracts").innerHTML = "";
            window.model.contracts = orders
            orders.forEach(contract => {
                window.renderContractPreview(document.getElementById("contracts"), contract)
            })

            if (window.model.contracts.length > 0) {
                try {
                    let i = 0
                    const before = document.getElementById("contracts_svg").getAttribute("fill")
                    const beforeFilter = document.getElementById("contracts_svg").style.filter = document.getElementById("contracts_svg").style.filter
                    const blink = setInterval(() => {
                        i++
                        document.getElementById("contracts_svg").setAttribute("fill", i % 2 == 0? before : window.highlightOrders)
                        document.getElementById("contracts_svg").style.filter = i % 2 == 0?  "brightness(1.5)" : "brightness(1.5)"
                        if (i > 5) {
                            document.getElementById("contracts_svg").style.filter = beforeFilter
                            document.getElementById("contracts_svg").setAttribute("fill", before)
                            clearInterval(blink)
                        }
                    }, 300) 
                } catch {

                }       
            }
        } catch {

        }
        
    }, 100)
})();



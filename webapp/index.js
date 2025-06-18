try {
    const container = document.getElementById("offer-tree-container")

    if (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")) {
        
        const el = document.createElement("div")
        el.setAttribute("id", "offer-tree")
        container.appendChild(el)
    } else {
        const scriptTag = document.createElement('script');
        scriptTag.src = "https://unpkg.com/@alenaksu/json-viewer@2.1.0/dist/json-viewer.bundle.js";
        document.body.appendChild(scriptTag);
        
        const el = document.createElement("json-viewer")
        el.setAttribute("id", "offer-tree")
        container.appendChild(el)
    }
    
} catch {}

setTimeout(() => {
    if(!window.offersFound){
        location.reload()
    }
}, 4000)

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

            
            DarkReader.setFetchMethod(window.fetch)

            document.getElementById("contracts_svg").setAttribute("fill", defaultClr)
            document.getElementById("matching_svg").setAttribute("fill", accentColor)
                
            document.getElementById("matching_svg").style.filter = "brightness(2.0)"
            document.getElementById("contracts_svg").style.filter = "brightness(3.7)"
            document.getElementById("profile_svg").style.filter = "brightness(3.7)"

            document.getElementById("profile_svg").setAttribute("fill", defaultClr)
                
            
            DarkReader.enable(conf);
            //clearInterval(color)
        }

    } catch {

    }
    
}

try {
    recolor()
} catch {

}

document.getElementById("matching_svg").addEventListener("load", () => {
    document.getElementById("matching_svg").setAttribute("fill", "brown")
})
            
const switchTab = (tabname) => {
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
    cancel = setInterval(() => {
        if (window.pool && window.matching && window.matching.loadProfile) {
            clearInterval(cancel)
            resolve()
        }
    }, 100)
});


(async () => { //jsdom doesn't support modules..we simulate one

    await initWebapp 

    setTimeout(() => {
        window.matching.collectOffers(model.profile)                  
        setInterval(() => window.progressOffers(), 3000)
        window.matching.collectQuestions(model.profile)    
    }, 4000)


    setInterval(() => {
        try {
            document.getElementById("peers").innerText = "" + window.peerlist.length
        } catch {

        }    
    }, 1000)

    window.model = {
        profile: undefined,
        offers: [],
        contracts: []
    }

    setInterval(async () => {
        window.model.profile = await window.matching.loadProfile()
        window.document.dispatchEvent(new Event('init-model'));

    }, 300)
    
    try {
        document.getElementById("oracle-strength").onchange = () => {
            window.model.profile.minOracleRank = document.getElementById("oracle-strength").value
            document.getElementById("ranktext").innerText = "" + window.model.profile.minOracleRank
        }
    } catch (e) {
        console.error(e)
    }

    try {
        document.getElementById("txfee").onchange = () => {
            window.model.profile.txfee = document.getElementById("txfee").value   
        }
    } catch (e) {
        console.error(e)
    }

    document.getElementById("send-funds-button").onclick = () => {
        const amount = document.getElementById("send-funds-amount").value
        const address = document.getElementById("send-funds-address").value
        const tx = matching.takeWinnings(amount, address, window.model.profile.txfee)
        navigator.clipboard.writeText(tx)
        alert("Copied TxBody To Clipboard!")
    }

    window.pickOrGenerateOffer = async (pick) => {
        if (pick) {
            try {
                return await window.matching.pickOffer(model.profile)
            } catch (e) {
                console.error(e)
                return await window.matching.generateOffer(model.profile)
            }
            
        } else {
            return await window.matching.generateOffer(model.profile)
        }
    }

    window.document.dispatchEvent(new Event('init-offer-controller'));

    window.removeInterest = (tag) => {
        window.model.profile.tags = window.model.profile.tags.filter(x => x != tag)
        document.getElementById(`tag-${tag}`).remove()
    }



    document.getElementById("add-interest-button").onclick = () => {
        const tag = document.getElementById("interest").value
        const btn = document.createElement("button")
        btn.className="tag-button"
        btn.id = `tag-${tag}`
        btn.innerText = tag;
        window.model.profile.tags.push(tag)
        btn.onclick = () => {
            removeInterest(tag)
        }
        document.getElementById("tags").appendChild(btn)

    }

    window.createOfferInfo = (offer, isTentative = false) => {
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
            if (offer.role === "acceptor" && !offer.patyBetsOn || offer.role === "originator" && offer.patyBetsOn) {
                offerBet.innerHTML = `<font color = "grene">[u bet ${offer.bet[0]} sat on YES]:${offer.bet[1]}</font>`
            } else {
                offerBet.innerHTML = `<font color = "grene">${offer.bet[0]}:[u bet ${offer.bet[1]} sat on NO]</font>`
            }
            oracle.innerHTML = `<font color="brown">${offer.oracles[0].oracle.slice(0, 30) + "..." + (offer.oracles.length > 1 ? " +" : "")}</font>`
            oracleEndpoint.innerHTML = `<font color="brown">${offer.oracles[0].endpoint.replace("http://", "").replace("https://", "").slice(0, 30) + (offer.oracles.length > 1 ? "+" : "")}</font>`
                
        }
        return offerInfo
    }

    window.renderOfferPreview = (where, offer, append = true) => {
        const downArrowSvg = document.createElement("img")
        downArrowSvg.src = "./assets/down.svg"
        downArrowSvg.className = "offer-button"
        downArrowSvg.onclick = () => {
            renderOfferDetails(offer)



        }


        const yesSvg = document.createElement("img")
        yesSvg.src = "./assets/yes.svg"
        yesSvg.className = "offer-button"
        yesSvg.onclick = () => {
            let confirmed = undefined
            if (document.getElementById("confirm_orders").checked) {
                confirmed = confirm("Bet " + offer.bet[1] + " sat against '" + offer.question + "'")
            } else {
                confirmed = true
            }
            if (confirmed) {
                console.log(offer.status)
                    if (offer.role === 'initiator') {
                        window.matching.broadcastOffer(offer)
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
        noSvg.onclick = () => {
            let confirmed = undefined
            if (document.getElementById("confirm_orders").checked) {
                confirmed = confirm("Bet " + offer.bet[1] + " sat against '" + offer.question + "'")
            } else {
                confirmed = true
            }          
            if (confirmed) {
                if (offer.role === 'initiator') {
                    window.matching.broadcastOffer(offer)
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
        
        const offerInfo = createOfferInfo(offer, true)
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
            const newOffer = await pickOrGenerateOffer(Math.random() < 0.5)
            const panel2 = renderOfferPreview(where, newOffer, false)
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
        if (offersFound >= maxMatching - 1) {
            clearInterval(camcel)
        }
        try {
            const offer = await window.matching.generateOffer(model.profile)
            offersFound++
            window.model.offers.push(offer)
            renderOfferPreview(document.getElementById("matching"), offer)
            document.getElementById("loading").innerText = ""
            
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
                document.getElementById("wallet-balance").innerText = balance + user

            }
            document.getElementById("wallet-address").innerText = address
        } catch {

        }
    }, 1000)
    
    window.renderOfferDetails = (offer) => {
        switchTab("offer")
        const offerInfo = createOfferInfo(offer)
        offerInfo.className = "offer-info"
        const terms = document.getElementById("terms")
        terms.innerHTML = ""
        terms.appendChild(offerInfo)
        const tree = document.getElementById("offer-tree")
        tree.data = offer
        document.getElementById("delete-offer").onclick = () => {
            window.storage.removeOffers([offer.id])
        }
        document.getElementById("delete-cp").onclick = () => {
            window.storage.removeCps([offer.oracles[0].capabilityPub])
        }
    }

    window.renderContractPreview = (where, contract) => {
        const downArrowSvg = document.createElement("img")
        downArrowSvg.src = "./assets/down.svg"
        downArrowSvg.className = "offer-button"
        downArrowSvg.onclick = () => {
            renderOfferDetails(contract)
        }

        const removeSvg = document.createElement("img")
        removeSvg.src = "./assets/remove.svg"
        removeSvg.className = "offer-button"
        removeSvg.onclick = () => {
            window.matching.removeOrder(contract.id)
        }

        const offerInfo = createOfferInfo(contract)
        offerInfo.className = "contract-info"
        const panel = document.createElement("div")
        panel.className = "panel wide-panel"
        panel.appendChild(removeSvg)

        panel.appendChild(offerInfo)

        

        panel.appendChild(downArrowSvg)
        where.appendChild(panel)
    }

    

    model.contracts.forEach(contract => {
        renderContractPreview(document.getElementById("contracts"), contract)
    })

    setInterval(async () => {
        try {
        
            const orders = await window.matching.listOrders(20)
            if (JSON.stringify(orders) === JSON.stringify(model.contracts)) {
                return
            }

            document.getElementById("contracts").innerHTML = "";
            model.contracts = orders
            orders.forEach(contract => {
                renderContractPreview(document.getElementById("contracts"), contract)
            })

            if (model.contracts.length > 0) {
                try {
                    let i = 0
                    const before = document.getElementById("contracts_svg").getAttribute("fill")
                    const beforeFilter = document.getElementById("contracts_svg").style.filter = document.getElementById("contracts_svg").style.filter
                    const blink = setInterval(() => {
                        i++
                        document.getElementById("contracts_svg").setAttribute("fill", i % 2 == 0? before : highlightOrders)
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



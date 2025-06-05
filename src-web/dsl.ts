import { OfferModel } from "./matching"


export class Dsl {

    private state: {[pubkey: string]: [number, boolean]} = {}

    private template(): OfferModel {
        const model: OfferModel = {
            id: "",
            bet: [0, 0],
            betOn: undefined,
            oracles: [],
            question: "",
            status: "matching",
            blockchain: "",
            role: "initiator"
        }
        return model
    }

    private root: OfferModel = this.template()
    private cursor: OfferModel = this.root
    private prev: OfferModel = undefined
    private lastOutcome = false

    public pay(idx: 0 | 1, amount: number) {
        // console.log("" + idx + "  " + amount + "  " + JSON.stringify(this.prev))
        if (!this.protect) {
            throw new Error("should not call outside of body; use `new Dsl((dsl) => handler).enumerate()`")
        }
        if (this.prev === undefined) {
            new Error("cannot pay unconditionally!")
        }

        if (this.lastOutcome && idx !== 0) {
            if(this.prev.betOn === undefined) {
                this.prev.betOn = true
            } else {
                throw new Error("Perfect hedge! Trader not allowed to benefit regardless of outcome.")
            }
        }

        if (!this.lastOutcome && idx === 0) {
            if(this.prev.betOn === undefined) {
                this.prev.betOn = false
            } else {
                throw new Error("Perfect hedge! Trader not allowed to benefit regardless of outcome.")
            }
        }

        if (idx == 0) {
            if (this.cursor.bet[1] === null) {
                throw new Error("one pay per condition check! and pay before checking out next condition too, please!")
            }
            this.cursor.bet[1] = null
            this.prev.bet[1] = amount
        } else {
            if (this.cursor.bet[0] === null) {
                throw new Error("one pay per condition check! and pay before checking out next condition too, please!")
            }
            this.cursor.bet[0] = null
            this.prev.bet[0] = amount
        }

        this.collateral += amount
        if (this.collateral > this.budgetBound) {
            throw new Error(`exceeded budget ${this.budgetBound} for outcome:` + JSON.stringify(this.state))
        }

    }

    private enrichAndProgress(aliceOutcome: boolean, pubkey: string) {
        this.lastOutcome = aliceOutcome
        if (aliceOutcome === false) {
            if (this.cursor.ifCounterPartyWins === undefined) {
                this.cursor.ifCounterPartyWins = this.template()
            } else {
                const x = this.cursor.ifCounterPartyWins.bet
                this.cursor.ifCounterPartyWins.bet = [x[0] === null ? 0 : x[0], x[0] === null ? 0 : x[0]]
            }
            this.prev = this.cursor
            this.cursor = this.cursor.ifCounterPartyWins
            
            
        } else if (aliceOutcome === true) {
            if (this.cursor.ifPartyWins === undefined) {
                this.cursor.ifPartyWins = this.template()
            } else {
                const x = this.cursor.ifPartyWins.bet
                this.cursor.ifPartyWins.bet = [x[0] === null ? 0 : x[0], x[0] === null ? 0 : x[0]]
            }
            this.prev = this.cursor
            this.cursor = this.cursor.ifPartyWins
        }
        if (this.prev) {
            this.prev.oracles[0] = {
                capabilityPub: pubkey
            }
        }
        
    }

    public outcome(pubkey: string): boolean {
        if (!this.protect) {
            throw "should not call outside of body; use `new Dsl((dsl) => handler).enumerate()`"
        }
        if (this.state[pubkey] === undefined) {
            const max = Object.values(this.state).length === 0 ? -1 : Math.max(...Object.values(this.state).map(x => x[0]))
            this.state[pubkey] = [max + 1, null]
            throw "uninitialized"
        } else {
            this.enrichAndProgress(this.state[pubkey][1], pubkey)
            return this.state[pubkey][1]
        }
    }

    private next(): boolean {
        this.cursor = this.root
        this.prev = undefined
        let i = 0
        let cursor = true
        let entry = undefined

        
        while (cursor) {
            entry = Object.values(this.state).find(x => x[0] === i)
            if (entry === undefined) {
                return false
            }
            cursor = entry[1]
            if (entry[1] === null){
                entry[1] = false
                return true
            }
            if (cursor) {
                entry[1] = false
            } else {
                entry[1] = true
            }
            i++
        }
        return true
    }

    private body: (dsl: Dsl) => void

    public constructor(body: (dsl: Dsl) => Promise<void>) {
        this.body = body
    }

    private protect = false

    static readonly Party = 0
    static readonly CounterParty = 1

    static readonly Alice = 0
    static readonly Bob = 1

    private collateral = 0
    private budgetBound = 0

    private filterLeafs(model: OfferModel): OfferModel {
        if (!model.bet[0] && !model.bet[1]) {
            return undefined
        }
        model.ifPartyWins = this.filterLeafs(model.ifPartyWins)
        model.ifCounterPartyWins = this.filterLeafs(model.ifCounterPartyWins)
        
        if (!model.ifPartyWins){
            delete model.ifPartyWins
        }

        if (!model.ifCounterPartyWins){
            delete model.ifCounterPartyWins
        }

        return model
    }

    public async enumerate(collateralBound: number): Promise<OfferModel> {
        if (this.protect) {
            throw "Don't call enumerate inside of the body of your script!"
        }
        this.protect = true
        let next = true
        while (next) {
            // console.log(this.state)
            try {
                this.collateral = 0
                this.budgetBound = collateralBound
                await this.body(this)
            } catch (e) {
                if (e === "uninitialized") {

                } else {
                    throw e
                }
            }    
            next = this.next()
        }
        this.protect = false
        return this.filterLeafs(this.root)
    }
}



if (require.main === module) {
    (async () => {
        const model = await (new Dsl(async dsl => {
            const a = 60
            if (dsl.outcome("really?")) { //TODO add par
                dsl.pay(Dsl.Alice, a + 100) 
                if (dsl.outcome("is it?")) {
                    dsl.pay(Dsl.Alice, 40)
                } else {
                    dsl.pay(Dsl.Bob, 50)
                } 
            } else {
                dsl.pay(Dsl.Bob, 20)
            }
            
        })).enumerate(300)
        console.log(model)
        console.log("OK!")
    })()
    
}
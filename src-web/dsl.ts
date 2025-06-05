import { OfferModel } from "./matching"

export class Dsl {

    state: {[pubkey: string]: [number, boolean]} = {}

    template(): OfferModel {
        const model: OfferModel = {
            id: "",
            bet: [0, 0],
            betOn: false,
            oracles: [],
            question: "",
            status: "matching",
            blockchain: "",
            role: "initiator"
        }
        return model
    }

    root: OfferModel = this.template()
    cursor: OfferModel = this.root

    public pay(idx: 0 | 1, amount: number) {
        if (!this.protect) {
            throw "should not call outside of body; use `new Dsl((dsl) => handler).enumerate()`"
        }
        if (idx == 0) {
            this.cursor.bet[1] = amount
        } else {
            this.cursor.bet[0] = amount
        }
    }

    enrichAndProgress(outcome: boolean) {
        if (this.cursor.betOn) {
            this.cursor.ifCounterPartyWins = this.template()
            this.cursor = this.cursor.ifCounterPartyWins
            this.cursor.betOn = outcome
        } else {
            this.cursor.ifPartyWins = this.template()
            this.cursor = this.cursor.ifPartyWins
            this.cursor.betOn = outcome
        }
    }

    public outcome(pubkey: string): boolean {
        if (!this.protect) {
            throw "should not call outside of body; use `new Dsl((dsl) => handler).enumerate()`"
        }
        if (this.state[pubkey] === undefined) {
            this.state[pubkey] = [Math.max(...Object.values(this.state).map(x => x[0])) + 1, false]
            this.enrichAndProgress(false)
            return false
        } else {
            this.enrichAndProgress(this.state[pubkey][1])
            return this.state[pubkey][1]
        }
    }

    next(): boolean {
        this.cursor = this.root
        let i = 0
        let cursor = true
        let entry = undefined

        
        while (cursor) {
            entry = Object.values(this.state).find(x => x[0] === i)[1]
            if (entry === undefined) {
                return false
            }
            cursor = entry[1]
            if (cursor) {
                entry[1] = false
            } else {
                entry[1] = true
            }
            
            i++
        }
        return true
    }

    body: (dsl: Dsl) => void

    public constructor(body: (dsl: Dsl) => void) {
        this.body = body
    }

    protect = false

    public enumerate(): OfferModel {
        this.protect = true
        let next = true
        while (next) {
            this.body(this)
            next = this.next()
        }
        this.protect = false
        //TODO remove 0:0 leafs
        return this.root.ifCounterPartyWins
    }
}
import { Mutex } from "async-mutex"
import { OfferModel } from "./matching"

type CacheEntry  = {
    id: string
    yes: string[]
    no: string[]
}


type Handler = {
    pay: (idx: 0 | 1, amount: number) => void
    party: (party: string) => ({
        pays: (counterparty: string) => ({
            amount: (amount: number) => void
        })
    })
}

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
    private lastOutcome = undefined

    private flag = false

    public pay(idx: 0 | 1, amount: number) {
        // console.log("" + idx + "  " + amount + "  " + JSON.stringify(this.prev))
        if (!this.protect) {
            throw new Error("should not call outside of body; use `new Dsl((dsl) => handler).enumerate()`")
        }
        if (this.prev === undefined || this.lastOutcome === undefined) {
            new Error("cannot pay unconditionally!")
        }

        if (amount <= 0) {
            throw Error("Pay amount must be positive! found: " + amount)
        }

        if (this.lastOutcome !== null) {
            if (this.lastOutcome && idx === 0) {
                if (this.prev.betOn === undefined || this.prev.betOn === true) {
                    this.prev.betOn = true
                } else {
                    throw new Error("Perfect hedge! Trader not allowed to benefit regardless of outcome.")
                }
            }
    
            if (!this.lastOutcome && idx === 0) {
                if(this.prev.betOn === undefined || this.prev.betOn === false) {
                    this.prev.betOn = false
                } else {
                    throw new Error("Perfect hedge! Trader not allowed to benefit regardless of outcome.")
                }
            }
        }

        if (this.flag) {
            throw new Error("one pay per condition check! and pay before checking out next condition too, please!")
        }

        if (idx == 0) {
            this.prev.bet[1] = Math.round(amount)
        } else {
            this.prev.bet[0] = Math.round(amount)
        }
        this.flag = true

        this.collateral += amount
        if (this.collateral > this.budgetBound) {
            throw new Error(`exceeded budget ${this.budgetBound} for outcomes:` + JSON.stringify(this.state))
        }

    }

    private enrichAndProgress(aliceOutcome: boolean, pubkey: string, yes: string[], no: string[]) {
        this.lastOutcome = aliceOutcome
        this.flag = false
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
                capabilityPub: pubkey.replaceAll(/-###-.*/g, "")
            }
            this.prev.yesOutcomes = yes
            this.prev.noOutcomes = no
        }
        
    }

    private counter = 0


    private memoize: CacheEntry[] = []

    public outcome(pubkey: string, yes: string[], no: string[]): boolean {
        yes.sort()
        no.sort()
        this.counter++

        if (!this.protect) {
            throw "should not call outside of body; use `new Dsl((dsl) => handler).enumerate()`"
        }
        const pubkeyUnique = pubkey + "-###-" + this.counter
        if (this.state[pubkeyUnique] === undefined) {
            const max = Object.values(this.state).length === 0 ? -1 : Math.max(...Object.values(this.state).map(x => x[0]))
            this.state[pubkeyUnique] = [max + 1, null]
            throw "uninitialized"
        } else {
            if (this.memoize.find(x => x.id === pubkey && JSON.stringify(x.yes) === JSON.stringify(yes) && JSON.stringify(x.no) === JSON.stringify(no)) !== undefined) {
                throw new Error("Cannot query same observation twice. Save it into const instead: const obs1 = observe(...)")
            }
            this.enrichAndProgress(this.state[pubkeyUnique][1], pubkeyUnique, yes, no)
            this.memoize.push({
                id: pubkey, yes, no
            })
            return this.state[pubkeyUnique][1]
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

    private body: (dsl: Dsl) => Promise<void>

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

    private multiparty: string[] = []
    private selected: [string, string] = [undefined, undefined]

    private isSelected0 = (party: string) => {
        return this.selected[0] === party 
    }

    private isSelected1 = (party: string) => {
        return this.selected[1] === party 
    }

    public multiple = (...parties: string[]) => {
        if (this.multiparty.length > 0){
            throw Error("parties can be specified only once!")
        }
        this.multiparty = parties
        return this
    }

    public party = (party: string) => ({
        pays: (counterparty: string) => ({
            amount: (amount: number) => {
                if (!this.multiparty.find(x => x === party)){
                    throw Error("party " + party + " not registered! Use .multiple to register parties")
                }
                if (!this.multiparty.find(x => x === counterparty)){
                    throw Error("counterparty " + counterparty + " not registered! Use .multiple to register parties")
                }
                if (this.isSelected0(party) && this.isSelected1(counterparty)) {
                    this.pay(0, amount)
                } else if (this.isSelected0(counterparty) && this.isSelected1(party)) {
                    this.pay(1, amount)
                }
            }   
        }) 
    })

    public numeric = {
        outcome: (pubkey: string, from: number, to: number, step: number = 1) => ({
            enumerate: (handler: (n: number) => void) => {
                let numbers = []
                for (let i = from; i <= to; i += step) {
                    numbers.push(i)
                }
                numbers.forEach(n => {
                    if (this.outcome(pubkey, [n.toString()], numbers.filter(x => x !== n).map(x => x.toString()))) {
                        handler(n)
                    }
                })
            },
            enumerateWithAccount: (payhandler: (h: Handler, n: number) => void) => {
                let numbers = []
                for (let i = from; i <= to; i += step) {
                    numbers.push(i)
                }
                numbers.forEach(n => {
                    this.if(pubkey, [n.toString()], numbers.filter(x => x !== n).map(x => x.toString())).then(h => payhandler(h, n))
                })
            }
            
        })
    }

    public set = {
        outcome: (pubkey: string, set:string[]) => ({
            enumerate: (handler: (n: string) => void) => {
                set.forEach(n => {
                    if (this.outcome(pubkey, [n], set.filter(x => x !== n).map(x => x))) {
                        handler(n)
                    }
                })
            },
            enumerateWithAccount: (payhandler: (h: Handler, n: string) => void) => {
                set.forEach(n => {
                    this.if(pubkey, [n], set.filter(x => x !== n)).then(h => payhandler(h, n))
                })
            }
            
        }),
        outcomeT: <T>(pubkey: string, set:T[], renderer: (x: T) => string, parser: (s: string) => T) => ({
            enumerate: (handler: (n: T) => void) => {
                set.forEach(n => {
                    if (this.outcome(pubkey, [renderer(n)], set.filter(x => renderer(x) !== renderer(n)).map(x => renderer(x)))) {
                        handler(n)
                    }
                })
            },
            enumerateWithAccount: (payhandler: (h: Handler, n: T) => void) => {
                set.forEach(n => {
                    this.if(pubkey, [renderer(n)], set.filter(x => renderer(x) !== renderer(n)).map(x => renderer(x))).then(h => payhandler(h, n))
                })
            }
        })
    }

    public if = (pubkey: string, yes: string[], no: string[]) => {
        const observation = this.outcome(pubkey, yes, no)
        return {
            then: (handler: (handle: Handler) => void) => {
                let party: 0 | 1 = undefined
                let sum = 0
                const funds = {
                    pay: (idx: 0 | 1, amount: number): void => {
                        if (party === undefined || idx === party) {
                            sum += amount
                            party = idx
                        } else {
                            if (party !== undefined && idx !== party){
                                sum -= amount
                            } else {
                                throw new Error ("Perfect Hedge! Party cannot benefit regardless of outcome!")
                            }  
                        }
                    },
                    party: (party: string) => ({
                        pays: (counterparty: string) => ({
                            amount: (amount: number) => {
                                if (!this.multiparty.find(x => x === party)){
                                    throw Error("party " + party + " not registered! Use .multiple to register parties")
                                }
                                if (!this.multiparty.find(x => x === counterparty)){
                                    throw Error("counterparty " + counterparty + " not registered! Use .multiple to register parties")
                                }
                                if (this.isSelected0(party) && this.isSelected1(counterparty)) {
                                    funds.pay(0, amount)
                                } else if (this.isSelected0(counterparty) && this.isSelected1(party)) {
                                    funds.pay(1, amount)
                                }
                            }   
                        }) 
                    })
                }
                if (observation) {
                    handler(funds)
                    if (party !== undefined && sum !== 0) {
                        if (sum > 0) {
                            this.pay(party, sum)
                        } else {
                            this.pay(party === 0 ? 1: 0, -sum)
                        } 
                    }
                }
                return {
                     else: (handler: (handle: Handler) => void) => {
                        let counterparty: 0 | 1 = undefined
                        let sum = 0
                        const funds = {
                            pay: (idx: 0 | 1, amount: number): void => {
                                if (counterparty === undefined || idx === counterparty) {
                                    if (party !== undefined && counterparty !== undefined && party === counterparty) {
                                        throw new Error ("Perfect Hedge! Party cannot benefit regardless of outcome!")
                                    }
                                    counterparty = idx
                                    sum += amount
                                } else {
                                    if (counterparty !== undefined && idx !== counterparty){
                                        sum -= amount
                                    } else {
                                        throw new Error ("Perfect Hedge! Party cannot benefit regardless of outcome!")
                                    }  
                                }
                            },
                            party: (party: string) => ({
                                pays: (counterparty: string) => ({
                                    amount: (amount: number) => {
                                        if (!this.multiparty.find(x => x === party)){
                                            throw Error("party " + party + " not registered! Use .multiple to register parties")
                                        }
                                        if (!this.multiparty.find(x => x === counterparty)){
                                            throw Error("counterparty " + counterparty + " not registered! Use .multiple to register parties")
                                        }
                                        if (this.isSelected0(party) && this.isSelected1(counterparty)) {
                                            funds.pay(0, amount)
                                        } else if (this.isSelected0(counterparty) && this.isSelected1(party)) {
                                            funds.pay(1, amount)
                                        }
                                    }   
                                }) 
                            })
                        }
                        if (!observation) {
                            handler(funds)
                            if (counterparty !== undefined && sum !== 0) {
                                if (sum > 0) {
                                    this.pay(party, sum)
                                } else {
                                    this.pay(party === 0 ? 1: 0, -sum)
                                }
                            }
                        }
                    }
                }    
            }
        }
    }

    private multiflag = false
    public async enumerateWithBoundMulti(collateralBound: number): Promise<[string, string, OfferModel][]> {
        this.multiflag = true
        const pairs: [string, string][] = 
            this.multiparty.map(x => this.multiparty.map(y => [x, y] as [string, string]).filter(pair => pair[0] !== pair[1]))
            .flat().map(x => x.sort())

        const ids = new Set()
        const uniquepairs = pairs.filter((id) => !ids.has(JSON.stringify(id)) && ids.add(JSON.stringify(id)))
        const mutex = new Mutex()
        return Promise.all(uniquepairs.map(async pair => { 
            return await mutex.runExclusive(async () => {
                this.selected = pair
                const subcontract = await this.enumerateWithBound(collateralBound)
                return [pair[0], pair[1], subcontract]
            })
        }))
        this.multiflag = false
        
    }

    public async enumerateWithBound(collateralBound: number): Promise<OfferModel> {
        if (this.multiparty.length > 0 && !this.multiflag){
            throw Error("use `enumerateWithBoundMulti` for multiparty contracts!")
        }
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
                this.memoize = []
                this.counter = 0
                this.lastOutcome = undefined
                this.flag = false
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
            if (dsl.outcome("really?", ["YES"], ["NO"])) {
                dsl.pay(Dsl.Bob, a + 100) 
                const out1 = dsl.outcome("is it?", ["YES"], ["NO"])
                if (out1) {
                    dsl.pay(Dsl.Alice, 40)
                    if (dsl.outcome("is it?", ["DON'T KNOW"], ["NO"])) {
                        dsl.pay(Dsl.Bob, 40)
                        dsl.if("lol?", ["yup"], ["nope"]).then(funds => {
                            funds.pay(Dsl.Bob, 20)
                            funds.pay(Dsl.Alice, 30)
                        }).else(funds => {
                            funds.pay(Dsl.Bob, 40)
                            funds.pay(Dsl.Alice, 10)
                        })
                    }
                    dsl.numeric.outcome("price?", 0, 5).enumerate(n => {
                        dsl.pay(Dsl.Alice, n + 1)
                    })
                    
                    dsl.set.outcome("which?", ["lol", "okay", "yaay"]).enumerate(point => {
                        if (point === "lol") {
                           dsl.pay(Dsl.Alice, 30)
                        } 
                    })

                    dsl.set.outcomeT<string>("which?", ["lol", "okay", "yaaylol"], x => x, x => x).enumerate(point => {
                        if (point === "lol") {
                           dsl.pay(Dsl.Alice, 30)
                        } 
                    })
                    
                } else {
                    dsl.pay(Dsl.Bob, 50)
                } 
            } else {
                dsl.pay(Dsl.Alice, 20)
            }
        })).enumerateWithBound(400)
        console.log(model)

        const multi = await (new Dsl (async dsl => {
            if (dsl.outcome("really?", ["YES"], ["NO"])) {
                dsl.party("alice").pays("bob").amount(100)
                dsl.party("bob").pays("carol").amount(20)
            } else {
                dsl.party("carol").pays("alice").amount(40)
                dsl.party("bob").pays("alice").amount(40)
                dsl.if("wow?", ["yup"], ["nope"]).then(account => {
                    account.party("alice").pays("carol").amount(30)
                    account.party("carol").pays("alice").amount(5)
                }).else(account => {
                    account.party("carol").pays("alice").amount(30)
                })
                dsl.numeric.outcome("price?", 0, 5).enumerateWithAccount((account, n) => {
                    account.party("alice").pays("carol").amount(n - 2)
                })
            }
        })).multiple("alice", "bob", "carol").enumerateWithBoundMulti(5000)
        console.log(multi)
        console.log("OK!")
    })()
}
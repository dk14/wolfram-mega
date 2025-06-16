import { Mutex } from "async-mutex"
import { OfferModel } from "./models"

type CacheEntry  = {
    id: string
    yes: string[]
    no: string[]
    args: {[id: string]: string}
    pubkeyUnique: string
}

type PaymentHandler = {
    pay: (idx: 0 | 1, amount: number) => void
    party: (partyName: string, partyAsset?: string) => ({
        pays: (counterpartyName: string, counterpartyAsset?: string) => ({
            amount: (amount: number, asset?: string) => void
        })
    })
    release?: () => void
}

type PerpetualAsset = string

type PerpetualCashFlow = {
    from: [string, PerpetualAsset?]
    to: [string, PerpetualAsset?]
    amount: [number, PerpetualAsset?]
}

type PerpetualState<T> = {[party: string]: T}

type PerpetualUpdate<T> = [PerpetualState<T>, PerpetualCashFlow[]]

export const evaluatePartyCollateral = async (o?: OfferModel): Promise<number> => { //promise is to avoid stackoverflow
    if (o === undefined) {
        return 0
    } else {
        return o.bet[0] + Math.max(await evaluatePartyCollateral(o.ifPartyWins), await evaluatePartyCollateral(o.ifCounterPartyWins))
    }  
}

export const evaluateCounterPartyCollateral = async (o?: OfferModel): Promise<number> => { //promise is to avoid stackoverflow
    if (o === undefined) {
        return 0
    } else {
        return o.bet[1] + Math.max(await evaluateCounterPartyCollateral(o.ifPartyWins), await evaluateCounterPartyCollateral(o.ifCounterPartyWins))
    }
}

export namespace DslErrors {
    export class PerfectHedgeError extends Error {
        public state: {[pubkey: string]: [number, boolean, any]}
        public amount: number
        public partyIdx: 0 | 1
        public pair: [string, string]
        constructor(msg: string, st: {[pubkey: string]: [number, boolean, any]}, amount: number, partyIdx: 0 | 1, pair: [string, string]) {
            super(msg)
            this.state = st
            this.amount = amount
            this.partyIdx = partyIdx
            this.pair = pair
        }
    }
    export class InfinityError<ST> extends Error {
        public state: ST = undefined
        constructor(msg: string, st: ST) {
            super(msg)
            this.state = st
        }
    }
    export class InfinityCountError extends Error {}

    export class PartyAtAdvantage extends Error {
        public amount: number
        public partyIdx: 0 | 1
        public pair: [string, string]

        constructor(msg: string, amount: number, partyIdx: 0 | 1, pair: [string, string]) {
            super(msg)

            this.amount = amount
            this.partyIdx = partyIdx
            this.pair = pair
        }
    }

     export class OnePayPerCondition extends Error {
        public amount: number
        public partyIdx: 0 | 1
        public pair: [string, string]
        public state: {[pubkey: string]: [number, boolean, any]}

        constructor(msg: string, amount: number, partyIdx: 0 | 1, pair: [string, string], state:{[pubkey: string]: [number, boolean, any]}) {
            super(msg)

            this.amount = amount
            this.partyIdx = partyIdx
            this.pair = pair
            this.state = state
        }
    }

    export class ComplexConditions extends Error {
        public amount: number
        public partyIdx: 0 | 1
        public pair: [string, string]

        constructor(msg: string, amount: number, partyIdx: 0 | 1, pair: [string, string]) {
            super(msg)

            this.amount = amount
            this.partyIdx = partyIdx
            this.pair = pair
        }
    }

    export class EmptyDslOutput extends Error {}

}

export class Dsl {

    private state: {[pubkey: string]: [number, boolean, any]} = {}

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

    private alicePayCounter = 0
    private bobPayCounter = 0
    private aliceTrackers: {[id: string]: number} = {}
    private bobTrackers: {[id: string]: number} = {}

    public pay(idx: 0 | 1, amount: number) {
        //console.log("" + idx + "  " + amount + "  " + JSON.stringify(this.prev))
        //console.log(amount)

        if (this.unssafeInifnityCtx) {
            throw new Error("Payouts are disabled in unsafe infinity context. Specify cashflows in return instead")
        }

        if (idx === undefined) {
            throw new Error("party undefined")
        }
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
                    throw new DslErrors.PerfectHedgeError("Perfect hedge! Trader not allowed to benefit regardless of outcome. Your trade is overcollaterized!", this.state, amount, idx, this.selected)
                }
            }
    
            if (!this.lastOutcome && idx === 0) {
                if(this.prev.betOn === undefined || this.prev.betOn === false) {
                    this.prev.betOn = false
                } else {
                    throw new DslErrors.PerfectHedgeError("Perfect hedge! Trader not allowed to benefit regardless of outcome. Your trade is overcollaterized!", this.state, amount, idx, this.selected)
                }
            }
        }

        if (this.lastOutcome !== null) {
            if (this.lastOutcome && idx === 1) {
                if (this.prev.betOn === undefined || this.prev.betOn === false) {
                    this.prev.betOn = false
                } else {
                    throw new DslErrors.PerfectHedgeError("Perfect hedge! Trader not allowed to benefit regardless of outcome. Your trade is overcollaterized!", this.state, amount, idx, this.selected)
                }
            }
    
            if (!this.lastOutcome && idx === 1) {
                if(this.prev.betOn === undefined || this.prev.betOn === true) {
                    this.prev.betOn = true
                } else {
                    throw new DslErrors.PerfectHedgeError("Perfect hedge! Trader not allowed to benefit regardless of outcome. Your trade is overcollaterized!", this.state, amount, idx, this.selected)
                }
            }
        }

        if (this.flag) {
            throw new Error("one pay per condition check! and pay before checking out next condition too, please!" + `\nat amount = ${amount}; idx = ${idx}; pair = ${this.selected}`)
        }

        const id = this.megaMode ? this.currentPub : this.currentPub + JSON.stringify(this.currentArgs)
        if (idx == 0) {
            this.alicePayCounter++
            this.aliceTrackers[id] += 1
                
            this.prev.bet[1] = Math.round(amount)
        } else {
            this.bobTrackers[id] += 1
            this.bobPayCounter++
            this.prev.bet[0] = Math.round(amount)
        }
        this.flag = true

        if (idx === 0) {
            this.collateral1 += amount
            if (this.collateral1 > this.budgetBound1) {
                const party = this.selected[0] ?? "Alice"
                throw new Error(`exceeded budget ${this.budgetBound1} for ${party}, for outcomes:` + JSON.stringify(this.state))
            }
        }

        if (idx === 1) {
            this.collateral2 += amount
            if (this.collateral2 > this.budgetBound2) {
                const party = this.selected[1] ?? "Bob"
                throw new Error(`exceeded budget ${this.budgetBound2} for ${party}, for outcomes:` + JSON.stringify(this.state))
            }
        }
    
    }

    public currentPub: string = undefined
    public currentArgs: {[id: string]: string} = undefined

    private enrichAndProgress(aliceOutcome: boolean, pubkey: string, yes: string[], no: string[], args: {[id: string]: string} = {}) {
        this.lastOutcome = aliceOutcome
        this.currentPub = pubkey
        this.currentArgs = args

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
                capabilityPub: pubkey.replaceAll(/-###-.*/g, ""),
                params: args
            }
            this.prev.yesOutcomes = yes
            this.prev.noOutcomes = no
        }
        
    }

    private counter = 0


    private memoize: CacheEntry[] = []

    private checked = []

    public superMode = false

    public megaMode = false

    private megaModeStarted = false
    private superModeStarted = false
    private fairModeStarted = false
    private strictModeStarted = false

    public security = {
        startMegaMode: () => {
            if (this.collateral1 > 0 && this.collateral2 > 0 && this.counter > 0) {
                throw new Error('Mega mode has to be started before any payouts or observations happen!')
            }
            if (this.megaMode) {
                throw new Error('Mega mode already enabled manually!')
            }
            this.megaModeStarted = true
            this.megaMode = true

        },
        startSuperMode: () => {
            if (this.collateral1 > 0 && this.collateral2 > 0 && this.counter > 0) {
                throw new Error('Super mode has to be started before any payouts or observations happen!')
            }
            if (this.superMode) {
                throw new Error('Super mode already enabled manually!')
            }
            this.superModeStarted = true
            this.superMode = true
        },
        startFairMode: () => {
            if (this.collateral1 > 0 && this.collateral2 > 0 && this.counter > 0) {
                throw new Error('Fair mode has to be started before any payouts or observations happen!')
            }
            if (this.megaMode) {
                throw new Error('Fair mode already enabled manually!')
            }
            this.fairModeStarted = true
            this.strictlyFair = true

        },
        startStrictMode: () => {
            if (this.collateral1 > 0 && this.collateral2 > 0 && this.counter > 0) {
                throw new Error('Strict mode has to be started before any payouts or observations happen!')
            }
            if (this.megaMode) {
                throw new Error('Strict mode already enabled manually!')
            }
            this.strictModeStarted = true
            this.strictlyStrict = true

        },
    }

    public insecurity = {
        open: {
            disableMegaMode: () => {
                if (this.megaModeStarted) {
                    throw new Error('Mega mode has to be started with `startMegaMode`!')
                }
                if (!this.megaMode) {
                    throw new Error('Mega mode has to be enabled first!')
                }
                this.megaMode = false
            },
            disableSuperMode: () => {
                if (this.superModeStarted) {
                    throw new Error('Super mode has to be started with `startSuperMode`!')
                }
                if (!this.superMode) {
                    throw new Error('Super mode has to be enabled first!')
                }
                this.superMode = false
            }
        },
        close: {
            enableMegaMode: () => {
                if (this.megaModeStarted) {
                    throw new Error('Mega mode has to be started with `startMegaMode`!')
                }
                if (this.megaMode) {
                    throw new Error('Mega mode has to be disabled first!')
                }
                this.megaMode = false
            },
            enableSuperMode: () => {
                if (this.superModeStarted) {
                    throw new Error('Mega mode has to be started with `startMegaMode`!')
                }
                if (this.superMode) {
                    throw new Error('Mega mode has to be disabled first!')
                }
                this.superMode = false
            }
        }
    }

    public strictlyOneLeafPays = false

    public strictlyOneLeafPairPays = false

    public outcome(pubkey: string, yes: string[], no: string[], args: {[id: string]: string} = {}, allowTruth = false, strict = true): boolean {
        const pubkeyUnique = pubkey + "-###-"  + JSON.stringify(yes) + JSON.stringify(no) + JSON.stringify(args);
        if(this.ignoreObserveChecks) {
            if (!this.state[pubkeyUnique]) {
                throw new Error("Did not find state while editing the tree: " + pubkeyUnique + "\n" + this.state)
            }
            return this.state[pubkeyUnique][1]
        }

        if (strict) {
            this.alicePayCounter = 0
            this.bobPayCounter = 0
        }
        
        yes.sort()
        no.sort()
        this.counter++

        if ((new Set(yes)).size !== yes.length) {
            throw Error("Duplicate outcomes:" + JSON.stringify(yes) + "; pubkey: " + pubkey)
        }

        if ((new Set(no)).size !== no.length) {
            throw Error("Duplicate outcomes: " + JSON.stringify(no)) + "; pubkey: " + pubkey
        }

        if (strict && (yes.length === 0 || no.length === 0)) {
            throw Error("One of the outcome sets is empty. Trader would possibly benefit regardless of outcome. Use `dsl.unsafe` to allow!" +  "; pubkey: " + pubkey)
        }

        if (yes.length === 0 && no.length === 0) {
            throw Error("Transaction race! Outcomes are empty. Trader cannot benefit regardless of outcome. Use `dsl.unsafe` with synthetic outcome (convention: btc script generated outcomes should start with $, e.g. $(thisTx.utxo[0])) to allow!" +  "; pubkey: " + pubkey)
        }

        if (JSON.stringify(yes) === JSON.stringify(no) && !allowTruth) {
            throw Error("Contradiction! Outcomes are not mutually exclusive!" +  "; pubkey: " + pubkey)
        }

        const yesSet = new Set(yes)
        const noSet = new Set(no)
        if (yes.find(x => noSet.has(x)) || no.find(x => yesSet.has(x))) {
            if (strict) {
                throw Error("Partial contradiction! Some outcomes are not mutually exclusive!" +  "; pubkey: " + pubkey)
            }
        }

        if (!this.protect) {
            throw "should not call outside of body; use `new Dsl((dsl) => handler).enumerate()`" +  "; pubkey: " + pubkey
        }
        
        if (this.state[pubkeyUnique] === undefined) {
            const max = Object.values(this.state).length === 0 ? -1 : Math.max(...Object.values(this.state).map(x => x[0]))
            this.state[pubkeyUnique] = [max + 1, null, args]
            this.checked.push(this.state[pubkeyUnique][0])
            this.memoize.push({
                id: pubkey, yes, no, args, pubkeyUnique
            })
            throw "uninitialized"
        } else {
            this.checked.push(this.state[pubkeyUnique][0])
            if ( this.memoize.find(x => x.id === pubkey && JSON.stringify(x.yes.sort()) === JSON.stringify(yes.sort()) && JSON.stringify(x.no.sort()) === JSON.stringify(no.sort()) && JSON.stringify(x.args) === JSON.stringify(args)) !== undefined) {
                throw new Error("Cannot query same observation twice. Save it into const instead: const obs1 = outcome(...); args=" + JSON.stringify(args) + "; pubkey: " + pubkey)
            }
            const sameQuery = this.memoize.find(x => x.id === pubkey)
            if (strict && sameQuery && JSON.stringify(sameQuery.yes.concat(sameQuery.no).sort()) !== JSON.stringify(yes.concat(no).sort())) {
                 throw new Error("Set of overall outcomes must be same, regardless of parameters! " + sameQuery.yes.concat(sameQuery.no).sort() + " != " + yes.concat(no).sort() +  "; pubkey: " + pubkey)
            }

            if (this.superMode && sameQuery && JSON.stringify(sameQuery.args) === JSON.stringify(sameQuery.args)) {
                throw new Error("Cannot query same observation twice! Super strictly! Arguments are allowed to vary" +  "; pubkey: " + pubkey)
            }

            if (this.megaMode && sameQuery) {
                throw new Error("Cannot query same observation twice! MEGA strictly!")
            }

            const contradiction = this.memoize.find(x => x.id === pubkey && JSON.stringify(x.yes.sort()) === JSON.stringify(no.sort()) && JSON.stringify(x.no.sort()) === JSON.stringify(yes.sort()) && JSON.stringify(x.args) === JSON.stringify(args))
            if (contradiction !== undefined) {
                throw new Error("Cannot query the opposite of checked observation. Save it into const and inverse instead: const obs1 = outcome(...); const obs2 = !obs1" + "; pubkey: " + pubkey)
            }
            this.enrichAndProgress(this.state[pubkeyUnique][1], pubkeyUnique, yes, no, args)
            this.memoize.push({
                id: pubkey, yes, no, args, pubkeyUnique
            })
            return this.state[pubkeyUnique][1]
        }  
    }

    private next(): boolean {
        this.cursor = this.root
        this.prev = undefined
        let i = 0
        let cursor = true
        let entry: [number, Boolean, any] = undefined

        
        while (cursor) {

            if (Object.values(this.state).find(x => x[0] === i) === undefined) {
                return false
            }
            entry = Object.values(this.state).find(x => x[0] === i)

            if (entry[1] === null && cursor) {
                entry[1] = false
                return true
            }
            if (!cursor) {
                return true
            }
            if (entry[1] === true) {
                if (cursor === true) {
                    entry[1] = false
                }
            } else {
                entry[1] = true
                cursor = false 
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

    private collateral1 = 0
    private collateral2 = 0
    private budgetBound1 = 0
    private budgetBound2 = 0

    private leafsFiltered = false

    public strictlyStrict = false

    private filterLeafs(model: OfferModel, assertNoZeros = false): OfferModel {
        if (model === undefined) {
            throw new DslErrors.EmptyDslOutput("Empty DSL model output!")
        }
        if (!model.bet[0] && !model.bet[1] && !model.ifPartyWins && !model.ifCounterPartyWins) {
            this.leafsFiltered = true

            return undefined
        }
        if (this.strictlyFair) {
            if (!model.bet[0] && model.bet[1]) {
                throw new DslErrors.PartyAtAdvantage("Party at advantage - no premium/discount introduced", model.bet[1], 0, this.selected)
            }

            if (model.bet[0] && !model.bet[1]) {
                throw new DslErrors.PartyAtAdvantage("Party at advantage - no premium/discount introduced", model.bet[0], 1, this.selected)
            }
        }

        if (assertNoZeros) {
            if (!model.bet[0] && !model.bet[1]) {
                throw new DslErrors.ComplexConditions("Strict Semantics of observation: complex conditions are disallowed!", model.bet[0], 1, this.selected)
            }
        }

        if (model.ifPartyWins) {
            model.ifPartyWins = this.filterLeafs(model.ifPartyWins)
        }
        
        if (model.ifCounterPartyWins) {
            model.ifCounterPartyWins = this.filterLeafs(model.ifCounterPartyWins)
        }
        
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
        return this.selected[0] && this.selected[0] === party 
    }

    private isSelected1 = (party: string) => {
        return this.selected[0] && this.selected[1] === party 
    }

    public multiple = (...parties: string[]) => {
        if (this.multiparty.length > 0){
            throw Error("parties can be specified only once! Adding more parties ad-hoc is equivalent to early termination since consensus is required for that! \n It is advised to create a new contract. \n Note: you can freely parametrize Discreet contracts (terms) and use factories to easily spawn contracts with additional parties.")
        }
        if (parties.length < 2) {
            throw Error("Commmon sense! Minimum of 2 parties required for a contract!")
        }
        const set = [...new Set(parties)]
        if (set.length < parties.length) {
            throw Error("Tractable relations! parties have to be unique!")
        }
        this.multiparty = parties
        return this
    }

    public party = (partyName: string, partyAsset?: string) => ({
        pays: (counterpartyName: string, counterpartyAsset?: string) => ({
            amount: (amount: number, asset?: string) => {
                if (partyName === undefined) {
                    throw Error("Party undefined")
                }
                if (counterpartyName === undefined) {
                    throw Error("Counter-party undefined")
                }
                const party = partyName + (partyAsset ? "_" + partyAsset : "")
                const counterparty = counterpartyName + (counterpartyAsset ? "_" + counterpartyAsset : "")
                if  (partyAsset !== asset) {
                    throw Error(`Trying to pay ${asset} from collateral denominated in ${partyAsset}`)
                }

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

    public static account(partyName: string, partyAsset: string) {
        return partyName + "_" + partyAsset
    }

    public static mutual(...parties: string[]) {
        return parties.join("+")
    }

    public static refund(party: string) {
        return party + "_refund"
    }

    private unfinalized = 0


    private static track: {[id: string]: number} = {}

    public static recurse = {
        bounded: <U>(fn: () => U) => ({
            attempts: (attempts: number) => ({
                otherwiseYield: (defaultValue: U): (() => U) => {
                    if (!this.track[fn.toString()]) {
                        this.track[fn.toString()] = 0
                    }
                
                    return () => {
                        this.track[fn.toString()] = this.track[fn.toString()] + 1
                        if (this.track[fn.toString()] > attempts) {
                            return defaultValue
                        }
                        return fn()
                    }

                }
            }) 
        })    
    }

    public strictlyFair = false

    private unssafeInifnityCtx = false

    public unsafe = {
        if: (pubkey: string, yes: string[], no: string[], args: {[id: string]: string} = {}, allowSwaps: boolean = false, allowMisplacedPay = true, strict = false) => {
            return this.if(pubkey, yes, no, args, allowSwaps, allowMisplacedPay, strict)
        },
        numeric: {
            outcome: (pubkey: string, from: number, to: number, step: number = 1, args: {[id: string]: string} = {}, allowMisplacedPay = true, allowUnsafe = true) => {
                return this.numeric.outcome(pubkey, from, to, step, args, allowMisplacedPay, allowUnsafe)
            },
            infinity: {
                bounded: (maxInfinity = 10000000, maxCount = 1000000000) => ({
                    progress: (start: number, forward: (x: number) => number = x => x + 1) => ({
                        perpetual: <T>(init: PerpetualState<T>, step: (x: number, st: PerpetualState<T>) => PerpetualUpdate<T>) => {
                            this.unsafe.infinity
                            .bounded(maxInfinity, maxCount)
                            .compare((a,b) => a - b)
                            .progress(start, forward)
                            .perpetual(init, step)
                        }
                    }),
                    perpetual: <T>(init: PerpetualState<T>, step: (x: number, st: PerpetualState<T>) => PerpetualUpdate<T>) => {
                        this.unsafe.infinity
                        .bounded(maxInfinity, maxCount)
                        .compare((a,b) => b - a)
                        .progress(0, x => x + 1)
                        .perpetual(init, step)
                    }
                })
            },
        },
        set: {
            outcome: (pubkey: string, set:string[], args: {[id: string]: string} = {}, allowMisplacedPay = true, allowUnsafe = true) => {
                return this.set.outcome(pubkey, set, args, allowMisplacedPay, allowUnsafe)
            },
            outcomeT: <T>(pubkey: string, set:T[], renderer: (x: T) => string, args: {[id: string]: string} = {},  allowMisplacedPay = true, allowUnsafe = true) => {
                return this.set.outcomeT(pubkey, set, renderer, args, allowMisplacedPay, allowUnsafe)
            }
        },
        ifAtomicSwapLeg1: (lock: string = "TRUTH", unlockOutcome: string = "true", allowMisplacedPay = true) => {
            return this.if(lock, [unlockOutcome], [unlockOutcome], {}, true, allowMisplacedPay, false)
        },
        outcome: (pubkey: string, yes: string[], no: string[], args: {[id: string]: string} = {}, allowTruth = false, strict = false) => {
            return this.outcome(pubkey, yes, no, args, allowTruth, strict)
        },
        infinity: {
            move: <T>(x: T) => {
                if (x === undefined) {
                    throw new Error("Cannot move with undefined state!")
                }
                return x
            },
            stop:  <T>(cashflows: T): [any, T] => [undefined, cashflows],
            bounded: <T>(maxInfinity: T, maxCount = 10000) => ({
                compare: (cmp: (a: T, b: T) => number) => ({
                    progress: (start: T, forward: (x: T) => T) => ({
                        perpetual: <ST>(init: PerpetualState<ST>, step: (x: T, st: PerpetualState<ST>) => PerpetualUpdate<ST>) => {
                            let cursor = start
                            let counter = 0
                            let state = init
                            this.unssafeInifnityCtx = true
                            try {
                                while (cmp(cursor, maxInfinity) > 0 && counter < maxCount) {
                                    const saveState = state;
                                    let cashflows: PerpetualCashFlow[] = undefined;
                                    
                                    [state, cashflows] = step(cursor, state)

                                    cashflows.forEach(cashflow => {
                                        try {
                                            this.party(
                                                cashflow.from[0], 
                                                cashflow.from[1]
                                            ).pays(
                                                cashflow.to[0],
                                                cashflow.to[1]
                                            ).amount(
                                                cashflow.amount[0],
                                                cashflow.amount[1]
                                            )
                                        } catch (e) {
                                            if (e instanceof DslErrors.PerfectHedgeError) {
                                                const party = e.pair[e.partyIdx]
                                                state[party] = saveState[party] //repair
                                            }
                                        }
                                    })
                                    
                                    if (state === undefined){
                                        return
                                    }
                                    if (state === saveState) {
                                        throw new DslErrors.InfinityError("Infinity Inferred! State did not progress! Collaterals are not decreasing?", state)
                                    }
                                    cursor = forward(cursor)
                                    counter++
                                }
                                if (counter >= maxCount) {
                                    throw new DslErrors.InfinityCountError("Max count reached!")
                                }
                                if (cmp(cursor, maxInfinity) <= 0) {
                                    throw new DslErrors.InfinityError("Infinity Reached! Collaterals are not decreasing?", state)
                                }
                            } finally {
                                this.unssafeInifnityCtx = false
                            }
                        }
                    })
                })
            })
        }

    }

     public infinity = {
        move: <T>(x: T) => {
            if (x === undefined) {
                throw new Error("Cannot move with undefined state!")
            }
            return x
        },
        stop: undefined,
        bounded: <T>(maxInfinity: T, maxCount = 10000) => ({
            compare: (cmp: (a: T, b: T) => number) => ({
                progress: (start: T, forward: (x: T) => T) => ({
                    perpetual: <ST>(init: ST, step: (x: T, st: ST) => ST) => {
                        let cursor = start
                        let counter = 0
                        let state = init
                        while (cmp(cursor, maxInfinity) > 0 && counter < maxCount) {
                            const saveState = state
                            state = step(cursor, state)
                            if (state === undefined){
                                return
                            }
                            if (state === saveState) {
                                throw new DslErrors.InfinityError("Infinity Inferred! State did not progress! Collaterals are not decreasing?", state)
                            }
                            cursor = forward(cursor)
                            counter++
                        }
                        if (counter >= maxCount) {
                            throw new DslErrors.InfinityCountError("Max count reached!")
                        }
                        if (cmp(cursor, maxInfinity) <= 0) {
                            throw new DslErrors.InfinityError("Infinity Reached! Collaterals are not decreasing?", state)
                        }
                    }
                })
            })
        })
    }

    private ignoreObserveChecks = false

    public bool = {
        safe: {
            outcome: (pubkey: string, yes: string, no: string, args: {[id: string]: string} = {}): boolean => {
                return this.outcome(pubkey, [yes], [no], args)      
            }
        },
    }

    public numeric = {
        infinity: {
            bounded: (maxInfinity = 10000000, maxCount = 1000000000) => ({
                progress: (start: number, forward: (x: number) => number = x => x + 1) => ({
                    perpetual: <T>(init: T, step: (x: number, st: T) => T) => {
                        this.infinity
                        .bounded(maxInfinity, maxCount)
                        .compare((a,b) => a - b)
                        .progress(start, forward)
                        .perpetual(init, step)
                    }
                }),
                perpetual: <T>(init: T, step: (x: number, st: T) => T) => {
                    this.infinity
                    .bounded(maxInfinity, maxCount)
                    .compare((a,b) => b - a)
                    .progress(0, x => x + 1)
                    .perpetual(init, step)
                }
            })
        },
        safe: {
            outcome: (pubkey: string, yes: number, no: number, args: {[id: string]: string} = {}): number => {
                if (this.outcome(pubkey, [`${yes}`], [`${no}`], args)) {
                    return yes
                } else {
                    return no
                }
            },
            if: (pubkey: string, yes: number, no: number, args: {[id: string]: string} = {}, allowSwaps = false, allowMisplacedPay = false, strict = true) => {
                const iff = this.if(pubkey, [`${yes}`], [`${no}`], args, allowSwaps, allowMisplacedPay, strict)
                return {
                    then: (handler: (v: number, p: PaymentHandler) => void) => {
                        const thenn = iff.then(h => handler(yes, h))
                        return {
                            else: (handler: (v: number, p: PaymentHandler) => void) => {
                                return thenn.else(h => handler(no, h))
                            }
                        }
                    }
                }
            }

        },
        outcome: (pubkey: string, from: number, to: number, step: number = 1, args: {[id: string]: string} = {}, allowMisplacedPay = false, allowUnsafe = false) => ({
            evaluate: (handler: (n: number) => void) => {
                if (allowUnsafe) {
                    this.ignoreObserveChecks = true
                }
                let numbers = []
                for (let i = from; i <= to; i += step) {
                    numbers.push(i)
                }

                const recurse = (l: number[], r: number[]) => {
                    if (l.length === 0) {
                        return
                    }
                    if (r.length === 0) {
                        return
                    }
                    if (this.outcome(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args, false, false)) {
                        if (l.length === 1) {
                            if (this.outcome(pubkey, l.map(x => x.toString()), ["$$$$false"], args, false, false)) {
                                handler(l[0])
                            }
                        } else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2))
                        }
                    } else {
                        if (r.length === 1) {
                            handler(r[0])
                        } else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2))
                        }
                    }
                }

                recurse(numbers.slice(0, numbers.length / 2), numbers.slice(numbers.length / 2))

                const id = this.megaMode ? pubkey : pubkey + JSON.stringify(args)

                if (!allowUnsafe) {
                    if (this.aliceTrackers[id] > numbers.length - 1) {
                        throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 0, this.selected)
                    }
                    if (this.bobTrackers[id] > numbers.length - 1) {
                        throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 1, this.selected)
                    }
                }

                if (this.strictlyOneLeafPays && (this.aliceTrackers[id] > 1 || this.bobPayCounter[id] > 1)) {
                    throw new DslErrors.OnePayPerCondition("Only one leaf in a tree is alowed to pay", undefined, undefined, this.selected, this.state)
                }

                if (this.strictlyOneLeafPairPays && (this.aliceTrackers[id] > 1 || this.bobPayCounter[id] > 1)) {
                    throw new DslErrors.PerfectHedgeError("Only one pair in a tree is alowed to pay", this.state, undefined, undefined, this.selected)
                }
                
            },
            evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: number) => void) => {
                let numbers = []
                for (let i = from; i <= to; i += step) {
                    numbers.push(i)
                }
                 const recurse = (l: number[], r: number[]) => {
                    if (l.length === 0) {
                        return
                    }
                    if (r.length === 0) {
                        return
                    }
                    this.unsafe.if (pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args, false, allowMisplacedPay).then(h => {
                        if (l.length === 1) {

                            this.unsafe.if (pubkey, l.map(x => x.toString()), ["$$$$false"], args, false, allowMisplacedPay).then(h => {
                                payhandler(h, l[0])
                            })
                            
                        } else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2))
                        }
                    }).else(h => {
                        if (r.length === 1) {
                            
                            payhandler(h, l[0])
                            
                        } else {
                            
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2))
                            
                        }
                    })
                }

                recurse(numbers.slice(0, numbers.length / 2), numbers.slice(numbers.length / 2))

                const id = this.megaMode ? pubkey : pubkey + JSON.stringify(args)

                if (!allowUnsafe) {
                    if (this.aliceTrackers[id] > numbers.length - 1) {
                        throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 0, this.selected)
                    }
                    if (this.bobTrackers[id] > numbers.length - 1) {
                        throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 1, this.selected)
                    }
                }
   
            },
            value: (): number => {
                let numbers: number[] = []
                for (let i = from; i <= to; i += step) {
                    numbers.push(i)
                }
               const recurse = (l: number[], r: number[]) => {
                    if (l.length === 1 && r.length === 0) {
                        return l[0]
                    }
                    if (r.length === 1 && l.length === 0) {
                        return r[0]
                    }
                    if (this.unsafe.outcome(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args)) {
                        if (l.length === 1) {
                            if (this.unsafe.outcome(pubkey, l.map(x => x.toString()), ["$$$$false"], args)){
                                return l[0]
                            } else {
                                throw "skip"
                            }    
                        } else {
                            return recurse(l.slice(0, l.length / 2), l.slice(l.length / 2))
                        }
                    } else {
                        if (r.length === 1) {
                            return r[0]
                        } else {
                            return recurse(r.slice(0, r.length / 2), r.slice(r.length / 2))
                        }
                    }
                }

                if (!allowUnsafe) {
                    throw new Error('Only available in unsafe mode')
                }

                return recurse(numbers.slice(0, numbers.length / 2), numbers.slice(numbers.length / 2))
            }, 
            valueWithPaymentCtxUnsafe: (): [number, PaymentHandler] => {
                let numbers = []
                for (let i = from; i <= to; i += step) {
                    numbers.push(i)
                }

                let nn = numbers[0]
                let hh = undefined
                let payhandler = (h: PaymentHandler, n: number) => {
                    nn = n
                    hh = h
                }

                let argument = args
                
                const recurse = (l: number[], r: number[], payhandlerOut: PaymentHandler) => {
                    if (l.length === 0) {
                        return
                    }
                    if (r.length === 0) {
                        return
                    }
                    this.unsafe.if(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), argument, false, allowMisplacedPay).then(h => {
                        if (l.length === 1) {
                            this.unsafe.if (pubkey, l.map(x => x.toString()), [], args, false, allowMisplacedPay).then(h => {
                                payhandler(h, l[0])
                            }).else(_ => {
                                throw "skip"
                            })                           
                        } else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2), h)
                        }
                    }).else(h => {
                        if (r.length === 1) {
                            payhandler(h, r[0])
                        } else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2), h)
                        }
                    })
                }

                recurse(numbers.slice(0, numbers.length / 2), numbers.slice(numbers.length / 2), null)
                this.unfinalized++

                const saveRelease = hh.release
                hh.release = () => {
                    const id = this.megaMode ? pubkey : pubkey + JSON.stringify(args)

                    if (!allowUnsafe) {
                        if (this.aliceTrackers[id] > numbers.length - 1) {
                            throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 0, this.selected)
                        }
                        if (this.bobTrackers[id] > numbers.length - 1) {
                            throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 1, this.selected)
                        }
                    }
                    saveRelease()
                }

                if (hh === undefined) {
                    this.unfinalized--
                    throw "skip"
                }
                
                return [nn, hh]
            }
        })
    }

    public set = {
        safe: {
            outcome: (pubkey: string, yes: string, no: string, args: {[id: string]: string} = {}, allowMisplacedPay = false): string => {
                if (this.outcome(pubkey, [yes], [no], args)) {
                    return yes
                } else {
                    return no
                }
            },
            outcomeT: <T1, T2>(pubkey: string, yes: T1, no: T2, renderer: (x: T1 | T2) => string = x => x.toString(), args: {[id: string]: string} = {}): T1 | T2 => {
                if (this.outcome(pubkey, [renderer(yes)], [renderer(no)], args)) {
                    return yes
                } else {
                    return no
                }
            },
            if: (pubkey: string, yes: string, no: string, args: {[id: string]: string} = {}) => {
                const iff = this.if(pubkey, [yes], [no], args)
                return {
                    then: (handler: (v: string, p: PaymentHandler) => void) => {
                        const thenn = iff.then(h => handler(yes, h))
                        return {
                            else: (handler: (v: string, p: PaymentHandler) => void) => {
                                return thenn.else(h => handler(no, h))
                            }
                        }
                    }
                }
            },
            ifT: <T1, T2>(pubkey: string, yes: T1, no: T2, renderer: (x: T1 | T2) => string = x => x.toString(), args: {[id: string]: string} = {}) => {
                const iff = this.if(pubkey, [renderer(yes)], [renderer(no)], args)
                return {
                    then: (handler: (v: T1, p: PaymentHandler) => void) => {
                        const thenn = iff.then(h => handler(yes, h))
                        return {
                            else: (handler: (v: T2, p: PaymentHandler) => void) => {
                                return thenn.else(h => handler(no, h))
                            }
                        }
                    }
                }
            }

        },
        outcome: (pubkey: string, set:string[], args: {[id: string]: string} = {}, allowMisplacedPay = false, allowUnsafe = true) => ({
            evaluate: (handler: (n: string) => void) => {
                const recurse = (l: string[], r: string[]) => {
                    if (l.length === 0) {
                        return
                    }
                    if (r.length === 0) {
                        return
                    }
                    if (this.unsafe.outcome(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args)) {
                        if (l.length === 1) {
                            if (this.unsafe.outcome(pubkey, l, ["$$$$false"])) {
                                handler(l[0])
                            }
                        } else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2))
                        }
                    } else {
                        if (r.length === 1) {
                            handler(r[0])
                        } else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2))
                        }
                    }
                }

                recurse(set.slice(0, set.length / 2), set.slice(set.length / 2))

                const id = this.megaMode ? pubkey : pubkey + JSON.stringify(args)

                if (!allowUnsafe) {
                    if (this.aliceTrackers[id] > set.length - 1) {
                        throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 0, this.selected)
                    }
                    if (this.bobTrackers[id] > set.length - 1) {
                        throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 1, this.selected)
                    }
                }

                if (this.strictlyOneLeafPays && (this.aliceTrackers[id] > 1 || this.bobPayCounter[id] > 1)) {
                    throw new DslErrors.OnePayPerCondition("Only one leaf in a tree is alowed to pay", undefined, undefined, this.selected, this.state)
                }

                if (this.strictlyOneLeafPairPays && (this.aliceTrackers[id] > 1 || this.bobPayCounter[id] > 1)) {
                    throw new DslErrors.PerfectHedgeError("Only one pair in a tree is alowed to pay", this.state, undefined, undefined, this.selected)
                }

                
            },
            evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: string) => void) => {

                 const recurse = (l: string[], r: string[]) => {
                    if (l.length === 0) {
                        return
                    }
                    if (r.length === 0) {
                        return
                    }
                    this.if (pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args, false, allowMisplacedPay).then(h => {
                        if (l.length === 1) {
                            this.if(pubkey, l.map(x => x.toString()), ["$$$$false"], args, false, allowMisplacedPay).then(h => {
                                payhandler(h, l[0])
                            })                        
                        } else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2))
                        }
                    }).else(h => {
                        if (r.length === 1) {
                            payhandler(h, r[0])
                        } else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2))
                        }
                    })
                }

                if (this.strictlyOneLeafPays || this.strictlyOneLeafPairPays) {
                    throw Error("Leaf strictness tracking is not available in this mode. Use `evaluate`")
                }

                recurse(set.slice(0, set.length / 2), set.slice(set.length / 2))

                const id = this.megaMode ? pubkey : pubkey + JSON.stringify(args)

                if (!allowUnsafe) {
                    if (this.aliceTrackers[id] > set.length - 1) {
                        throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 0, this.selected)
                    }
                    if (this.bobTrackers[id] > set.length - 1) {
                        throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 1, this.selected)
                    }
                }

            },
            value: (): string => {
                const recurse = (l: string[], r: string[]) => {
                    if (l.length === 1 && r.length === 0) {
                        return l[0]
                    }
                    if (r.length === 1 && l.length === 0) {
                        return r[0]
                    }
                    if (this.outcome(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args)) {
                        if (l.length === 1) {
                            if (this.outcome(pubkey, l.map(x => x.toString()), ["$$$$false"], args)) {
                                return l[0]
                            } else {
                                throw "skip"
                            }
                        } else {
                            return recurse(l.slice(0, l.length / 2), l.slice(l.length / 2))
                        }
                    } else {
                        if (r.length === 1) {
                            return r[0]
                        } else {
                            return recurse(r.slice(0, r.length / 2), r.slice(r.length / 2))
                        }
                    }
                }

                if (this.strictlyOneLeafPays || this.strictlyOneLeafPairPays) {
                    throw Error("Leaf strictness tracking is not available in this mode. Use `evaluate`")
                }

                return recurse(set.slice(0, set.length / 2), set.slice(set.length / 2))
            },
            valueWithPaymentCtxUnsafe: (): [string, PaymentHandler] => {
                let nn = set[0]
                let hh = undefined

                const payhandler = (h: PaymentHandler, n: string) => {
                    nn = n
                    hh = h
                }
                
                const recurse = (l: string[], r: string[]) => {
                    if (l.length === 0) {
                        return
                    }
                    if (r.length === 0) {
                        return
                    }
                    this.if(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args, false, allowMisplacedPay).then(h => {
                        if (l.length === 1) {
                            this.if(pubkey, l.map(x => x.toString()), ["$$$$false"], args, false, allowMisplacedPay).then(h => {
                                payhandler(h, l[0])
                            })
                        } else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2))
                        }
                    }).else(h => {
                        if (r.length === 1) {
                            payhandler(h, r[0])
                        } else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2))
                        }
                    })
                }

                if (this.strictlyOneLeafPays || this.strictlyOneLeafPairPays) {
                    throw Error("Leaf strictness tracking is not available in this mode. Use `evaluate`")
                }

                recurse(set.slice(0, set.length / 2), set.slice(set.length / 2))
                this.unfinalized++

                const saveRelease = hh.release
                hh.release = () => {
                    const id = this.megaMode ? pubkey : pubkey + JSON.stringify(args)

                    if (!allowUnsafe) {
                        if (this.aliceTrackers[id] > set.length - 1) {
                            throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 0, this.selected)
                        }
                        if (this.bobTrackers[id] > set.length - 1) {
                            throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 1, this.selected)
                        }
                    }
                    saveRelease()
                }

                if (hh === undefined) {
                    this.unfinalized--
                    throw "skip"
                }

                return [nn, hh]
            }
        }),
        outcomeT: <T>(pubkey: string, set:T[], renderer: (x: T) => string, args: {[id: string]: string} = {},  allowMisplacedPay = false, allowUnsafe = false) => ({
            evaluate: (handler: (n: T) => void) => {
                 const recurse = (l: T[], r: T[]) => {
                    if (l.length === 0) {
                        return
                    }
                    if (r.length === 0) {
                        return
                    }
                    if (this.unsafe.outcome(pubkey, l.map(x => renderer(x)), r.map(x => renderer(x)), args)) {
                        if (l.length === 1) {
                            if (this.unsafe.outcome(pubkey, l.map(x => renderer(x)), ["$$$$false"])) {
                                handler(l[0])
                            }
                        } else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2))
                        }
                    } else {
                        if (r.length === 1) {
                            handler(r[0])
                        } else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2))
                        }
                    }
                }


                recurse(set.slice(0, set.length / 2), set.slice(set.length / 2))

                const id = this.megaMode ? pubkey : pubkey + JSON.stringify(args)

                if (!allowUnsafe) {
                    if (this.aliceTrackers[id] > set.length - 1) {
                        throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 0, this.selected)
                    }
                    if (this.bobTrackers[id] > set.length - 1) {
                        throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 1, this.selected)
                    }
                }

                if (this.strictlyOneLeafPays && (this.aliceTrackers[id] > 1 || this.bobPayCounter[id] > 1)) {
                    throw new DslErrors.OnePayPerCondition("Only one leaf in a tree is alowed to pay", undefined, undefined, this.selected, this.state)
                }

                if (this.strictlyOneLeafPairPays && (this.aliceTrackers[id] > 1 || this.bobPayCounter[id] > 1)) {
                    throw new DslErrors.PerfectHedgeError("Only one pair in a tree is alowed to pay", this.state, undefined, undefined, this.selected)
                }
                
            },
            evaluateWithPaymentCtx: (payhandler: (h: PaymentHandler, n: T) => void) => {
                const recurse = (l: T[], r: T[]) => {
                    if (l.length === 0) {
                        return
                    }
                    if (r.length === 0) {
                        return
                    }
                    this.if (pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args, false, allowMisplacedPay).then(h => {
                        if (l.length === 1) {
                            this.if(pubkey, l.map(x => x.toString()), ["$$$$false"], args, false, allowMisplacedPay).then(h => {
                                payhandler(h, l[0])
                            })        
                        } else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2))
                        }
                    }).else(h => {
                        if (r.length === 1) {
                            payhandler(h, r[0])
                            
                        } else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2))
                        }
                    })
                }

                if (this.strictlyOneLeafPays || this.strictlyOneLeafPairPays) {
                    throw Error("Leaf strictness tracking is not available in this mode. Use `evaluate`")
                }

                recurse(set.slice(0, set.length / 2), set.slice(set.length / 2))
            },
            value: (): T => {
                const recurse = (l: T[], r: T[]) => {
                    if (l.length === 1 && r.length === 0) {
                        return l[0]
                    }
                    if (r.length === 1 && l.length === 0) {
                        return r[0]
                    }
                    if (this.outcome(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args)) {
                        if (l.length === 1) {
                            if (this.outcome(pubkey, l.map(x => x.toString()), ["$$$$false"], args)) {
                                return l[0]
                            }
                        } else {
                            return recurse(l.slice(0, l.length / 2), l.slice(l.length / 2))
                        }
                    } else {
                        if (r.length === 1) {
                            return r[0]
                        } else {
                            return recurse(r.slice(0, r.length / 2), r.slice(r.length / 2))
                        }
                    }
                }

                if (this.strictlyOneLeafPays || this.strictlyOneLeafPairPays) {
                    throw Error("Leaf strictness tracking is not available in this mode. Use `evaluate`")
                }

                return recurse(set.slice(0, set.length / 2), set.slice(set.length / 2))
            },
            valueWithPaymentCtxUnsafe: (): [T, PaymentHandler] => {
                let nn = set[0]
                let hh: PaymentHandler = undefined
                let payhandler = (h: PaymentHandler, n: T) => {
                    nn = n
                    hh = h
                }
                
                const recurse = (l: T[], r: T[]) => {
                    if (l.length === 0) {
                        return
                    }
                    if (r.length === 0) {
                        return
                    }
                    const rt = this.if(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args, false, allowMisplacedPay).then(h => {
                        if (l.length === 1) {
                            this.if(pubkey, l.map(x => x.toString()), ["$$$$false"], args, false, allowMisplacedPay).then(h => {
                                payhandler(h, l[0])
                            })
                        } else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2))
                        }
                    }).else(h => {
                        if (r.length === 1) {
                            payhandler(h, r[0])
                        } else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2)) 
                        }
                    })
                }

                if (this.strictlyOneLeafPays || this.strictlyOneLeafPairPays) {
                    throw Error("Leaf strictness tracking is not available in this mode. Use `evaluate`")
                }

                recurse(set.slice(0, set.length / 2), set.slice(set.length / 2))
                this.unfinalized++

                const saveRelease = hh.release
                hh.release = () => {
                    const id = this.megaMode ? pubkey : pubkey + JSON.stringify(args)

                    if (!allowUnsafe) {
                        if (this.aliceTrackers[id] > set.length - 1) {
                            throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 0, this.selected)
                        }
                        if (this.bobTrackers[id] > set.length - 1) {
                            throw new DslErrors.PerfectHedgeError("Party cannot benefit regardless of outcome", this.state, undefined, 1, this.selected)
                        }
                    }
                    saveRelease()
                }

                if (hh === undefined) {
                    this.unfinalized--
                    throw "skip"
                }

                return [nn, hh]
            }
            
        })
    }

    public assert = {
        sum: {
            budget: (amount: number) => {
                if (this.collateral1 + this.collateral2 > amount) {
                    throw Error(`Max mutual budget assertion: ${this.collateral1} > ${amount}`)
                }    
            },
            parties: (party1: string, party2: string) => ({
                budget: (amount: number) => {
                    if (this.isSelected0(party1) && this.isSelected1(party2)){
                        if (this.collateral1 + this.collateral2 > amount) {
                            throw Error(`Max mutual budget assertion: ${this.collateral1} > ${amount}`)
                        }
                    }
                    if (this.isSelected0(party2) && this.isSelected1(party1)){
                        if (this.collateral1 + this.collateral2 > amount) {
                            throw Error(`Max mutual budget assertion: ${this.collateral1} > ${amount}`)
                        }
                    }
                            
                }
            })
        },
        budget: (idx: 0, amount: number) => {
            if (idx == 0) {
                if (this.collateral1 > amount) {
                    throw Error(`Max Alice budget assertion: ${this.collateral1} > ${amount}`)
                } 
            } else {
                if (this.collateral1 > amount) {
                    throw Error(`Max Bob budget assertion: ${this.collateral2} > ${amount}`)
                }
            }
            
        },
        parties: (party1: string, party2: string) => ({
            budget: (idx: 0, amount: number) => {
                if (this.isSelected0(party1) && this.isSelected1(party2)){
                    if (idx == 0) {
                        if (this.collateral1 > amount) {
                            throw Error(`Max ${party1} budget assertion (against ${party2}): ${this.collateral1} > ${amount}`)
                        } 
                    } else {
                        if (this.collateral1 > amount) {
                            throw Error(`Max ${party2} budget assertion (against ${party1}): ${this.collateral2} > ${amount}`)
                        }
                    }  
                }
                if (this.isSelected0(party2) && this.isSelected1(party1)){
                    if (idx == 0) {
                        if (this.collateral1 > amount) {
                            throw Error(`Max ${party2} budget assertion (against ${party1}): ${this.collateral1} > ${amount}`)
                        } 
                    } else {
                        if (this.collateral1 > amount) {
                            throw Error(`Max ${party1} budget assertion (against ${party2}): ${this.collateral2} > ${amount}`)
                        }
                    }  
                }
                          
            }
        })
    }

    public disablePartyRoleReversal = false

    public if = (pubkey: string, yes: string[], no: string[], args: {[id: string]: string} = {}, allowSwaps: boolean = false, allowMisplacedPay = false, strict = true) => {
        let contradiction = false
        const yesSet = new Set(yes)
        const noSet = new Set(no)
        if (yes.find(x => noSet.has(x)) || no.find(x => yesSet.has(x))) {
            contradiction = true
        }
        const observation = this.outcome(pubkey, yes, no, args, allowSwaps, strict)
        const currentNode = this.cursor
        const currentPrevNode = this.prev
        const currentLastOutcome = this.lastOutcome
        return {
            then: (handler: (handle: PaymentHandler) => void) => {
                let party: 0 | 1 = undefined
                let sum = 0
                const funds = {
                    pay: (idx: 0 | 1, amount: number): void => {
                        if (party === undefined || idx === party) {
                            sum += amount
                            party = idx
                        } else {
                            if (party !== undefined && idx !== party){
                                if (this.disablePartyRoleReversal){
                                    throw new Error("Party role reversal is disabled!")
                                }
                                sum -= amount
                            } else {
                                throw new DslErrors.PerfectHedgeError ("Perfect Hedge! Party cannot benefit regardless of outcome!", this.state, amount, idx, this.selected)
                            }  
                        }
                    },
                    party: (partyName: string, partyAsset?: string) => ({
                        pays: (counterpartyName: string, counterpartyAsset?: string) => ({
                            amount: (amount: number, asset?: string) => {
                                const party = partyName + (partyAsset ? "_" + partyAsset : "")
                                const counterparty = counterpartyName + (counterpartyAsset ? "_" + counterpartyAsset : "")
                                if (currentNode !== this.cursor && !allowMisplacedPay) {
                                    throw Error("Possibly trying to pay nondeterministically! You tried to use outer account context to pay: use the closest `if(...).then/else(account => ...)` please! This also happens when you pay after checking unrelated observations: pay before checking next outcome! You can turn this off by using `dsl.unsafe`")
                                }
                                if (partyAsset !== asset) {
                                    throw Error(`Trying to pay ${asset} from collateral denominated in ${partyAsset}`)
                                }
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
                                if (sum < 0 && partyAsset !== counterpartyAsset) {
                                    throw new Error(`Semantics: ${partyName} cannot pay negative amount of ${partyAsset} units. It is only allowed if assets are of the same type.`)
                                }
                                if (contradiction && partyAsset === counterpartyAsset) {
                                    throw Error("Contradiction! Outcomes are not mutually exclusive! Cannot allow swaps in same currency!")
                                }
                            }   
                        }) 
                    }),
                    release: () => {
                        if (currentNode !== this.cursor && !allowMisplacedPay) {
                            throw Error("Trying to release nondeterministically! You tried to release using outer account context: use the closest `if(...).then/else(account => ...)` please! This also happens if you release after checking unrelated observations: release before next `outcome; use `allowMisplacedPay` in `dsl.if` to disable this check`")
                        }
                        const saveCursor = this.cursor
                        const savePrev = this.prev
                        const saveFlag = this.flag
                        const saveLastOutcome = this.lastOutcome
                        if (allowMisplacedPay) {
                            this.cursor = currentNode
                            this.prev = currentPrevNode
                            this.flag = false
                            this.lastOutcome = currentLastOutcome
                        }
                        this.unfinalized--
                        funds.party = undefined
                        funds.pay = undefined
                        if (party !== undefined && sum !== 0) {
                            if (sum > 0) {
                                this.pay(party, sum)
                            } else if (sum < 0) {
                                this.pay(party === 0 ? 1: 0, -sum)
                            } 
                        }
                        this.cursor = saveCursor
                        this.prev = savePrev
                        this.flag = saveFlag
                        this.lastOutcome = saveLastOutcome
                    }

                }
                const finalizeUnsafeInternal = () => {
                    if (observation) {
                        handler(funds)
                        const saveCursor = this.cursor
                        const savePrev = this.prev
                        const saveFlag = this.flag
                        const saveLastOutcome = this.lastOutcome
                        if (allowMisplacedPay) {
                            this.cursor = currentNode
                            this.prev = currentPrevNode
                            this.flag = false
                            this.lastOutcome = currentLastOutcome
                        }
                        if (party !== undefined && sum !== 0) {
                            if (sum > 0) {
                                this.pay(party, sum)
                            } else if (sum < 0) {
                                this.pay(party === 0 ? 1: 0, -sum)
                            } 
                        }
                        this.cursor = saveCursor
                        this.prev = savePrev
                        this.flag = saveFlag
                        this.lastOutcome = saveLastOutcome
                    }
                }
                finalizeUnsafeInternal()
                return {
                     else: (handler: (handle: PaymentHandler) => void) => {
                        let counterparty: 0 | 1 = undefined
                        let sum = 0
                        const funds = {
                            pay: (idx: 0 | 1, amount: number): void => {
                                if (counterparty === undefined || idx === counterparty) {
                                    if (party !== undefined && counterparty !== undefined && party === counterparty) {
                                        throw new DslErrors.PerfectHedgeError ("Perfect Hedge! Party cannot benefit regardless of outcome!", this.state, amount, idx, this.selected)
                                    }
                                    counterparty = idx
                                    sum += amount
                                } else {
                                    if (counterparty !== undefined && idx !== counterparty){
                                         if (this.disablePartyRoleReversal){
                                            throw new Error("Party role reversal is disabled!")
                                        }
                                        sum -= amount
                                    } else {
                                        throw new DslErrors.PerfectHedgeError ("Perfect Hedge! Party cannot benefit regardless of outcome!", this.state, amount, idx, this.selected)
                                    }  
                                }
                            },
                            party: (partyName: string, partyAsset?: string) => ({
                                pays: (counterpartyName: string, counterpartyAsset?: string) => ({
                                    amount: (amount: number, asset?: string) => {
                                        const party = partyName + (partyAsset ? "_" + partyAsset : "")
                                        const counterparty = counterpartyName + (counterpartyAsset ? "_" + counterpartyAsset : "")
                                        if (currentNode !== this.cursor && !allowMisplacedPay) {
                                            throw Error("Possibly trying to pay nondeterministically! You tried to use outer account context to pay: use the closest `if(...).then/else(account => ...)` please! This also happens when you pay after checking unrelated observations: pay before checking next outcome! You can turn this off by using `dsl.unsafe`")
                                        }
                                        if (partyAsset !== asset) {
                                            throw Error(`Trying to pay ${asset} from collateral denominated in ${partyAsset}`)
                                        }
                                        if (!this.multiparty.find(x => x === party)){
                                            throw Error("party " + party + " not registered! Use .multiple to register parties")
                                        }
                                        if (!this.multiparty.find(x => x === counterparty)){
                                            throw Error("counterparty " + counterparty + " not registered! Use .multiple to register parties")
                                        }
                                        if (!this.multiparty.find(x => x === party)){
                                            throw Error("party " + party + " not registered! Use .multiple to register parties in " + this.multiparty)
                                        }
                                        if (!this.multiparty.find(x => x === counterparty)){
                                            throw Error("counterparty " + counterparty + " not registered! Use .multiple to register parties in " + this.multiparty)
                                        }
                                        if (this.isSelected0(party) && this.isSelected1(counterparty)) {
                                            funds.pay(0, amount)
                                        } else if (this.isSelected0(counterparty) && this.isSelected1(party)) {
                                            funds.pay(1, amount)
                                        }
                                    }   
                                }) 
                            }),
                            release: () => {
                                if (currentNode !== this.cursor && !allowMisplacedPay) {
                                    throw Error("Possibly trying to release nondeterministically! You tried to release using outer account context: use the closest `if(...).then/else(account => ...)` please! This also happens if you release after checking unrelated observations: release before next `outcome`; use `allowMisplacedPay` in `dsl.if` to disable this check")
                                }
                                const saveCursor = this.cursor
                                const savePrev = this.prev
                                const saveFlag = this.flag
                                const saveLastOutcome = this.lastOutcome
                                if (allowMisplacedPay) {
                                    this.cursor = currentNode
                                    this.prev = currentPrevNode
                                    this.flag = false
                                    this.lastOutcome = currentLastOutcome
                                }
                                this.unfinalized--
                                funds.party = undefined
                                funds.pay = undefined
                                if (counterparty !== undefined && sum !== 0) {
                                    if (sum > 0) {
                                        this.pay(counterparty, sum)
                                    } else if (sum < 0) {
                                        this.pay(counterparty === 0 ? 1: 0, -sum)
                                    } 
                                }
                                this.cursor = saveCursor
                                this.prev = savePrev
                                this.flag = saveFlag
                                this.lastOutcome = saveLastOutcome
                            }
                        }
                        const finalizeUnsafeInternal2 = () => {
                            if (!observation) {
                                handler(funds)
                                const saveCursor = this.cursor
                                const savePrev = this.prev
                                const saveFlag = this.flag
                                const saveLastOutcome = this.lastOutcome
                                if (allowMisplacedPay) {
                                    this.cursor = currentNode
                                    this.prev = currentPrevNode
                                    this.flag = false
                                    this.lastOutcome = currentLastOutcome
                                }
                                if (counterparty !== undefined && sum !== 0) {
                                    if (sum > 0) {
                                        this.pay(counterparty, sum)
                                    } else if (sum < 0) {
                                        this.pay(counterparty === 0 ? 1: 0, -sum)
                                    }
                                }
                                this.cursor = saveCursor
                                this.prev = savePrev
                                this.flag = saveFlag
                                this.lastOutcome = saveLastOutcome
                            }
                        }
                        finalizeUnsafeInternal2()
                        
                    }
                }    
            }
        }
    }

    public ifAtomicSwapLeg1(lock: string = "TRUTH", unlockOutcome: string = "true", allowMisplacedPay = false) {
        return this.if(lock, [unlockOutcome], [unlockOutcome], {}, true, allowMisplacedPay)
    }

    private multiflag = false

    public async enumerateWithBoundMulti(collateralBounds: [number, number][]): Promise<[string, string, OfferModel][]> {
        this.multiflag = true
        const pairs: [string, string][] = 
            this.multiparty.map(x => this.multiparty.map(y => [x, y] as [string, string]).filter(pair => pair[0] !== pair[1]))
            .flat().map(x => x.sort())

        const ids = new Set()
        const uniquepairs = pairs.filter((id) => !ids.has(JSON.stringify(id)) && ids.add(JSON.stringify(id)))
        const mutex = new Mutex()
        const res: [string, string, OfferModel][] = await Promise.all(uniquepairs.map(async (pair, i) => { 
            return await mutex.runExclusive(async () => {
                this.selected = pair
                if (!collateralBounds[i]) {
                    throw Error("Specify bounds for a pair " + pair + " at index: " + i)
                }
                try {
                    const subcontract = await this.enumerateWithBound(collateralBounds[i][0], collateralBounds[i][1])
                return [pair[0], pair[1], subcontract]
                } catch (e) {
                    if (e instanceof DslErrors.EmptyDslOutput) {
                        return [pair[0], pair[1], undefined]
                    } else {
                        throw e
                    }
                }
                
            })
        }))
        this.multiflag = false
        return res
    }

    public async enumerateWithBound(collateralBound1: number, collateralBound2: number): Promise<OfferModel> {
        if (this.multiparty.length > 0 && !this.multiflag){
            throw Error("use `enumerateWithBoundMulti` for multiparty contracts!")
        }
        if (this.protect) {
            throw "Don't call enumerate inside of the body of your script!"
        }
        this.protect = true
        let next = true
        const mutex = new Mutex()
        this.aliceTrackers = {}
        this.bobTrackers = {}
        while (next) {
            try {
                this.collateral1 = 0
                this.collateral2 = 0
                this.budgetBound1 = collateralBound1
                this.budgetBound2 = collateralBound2
                this.memoize = []
                this.checked = []
                this.counter = 0
                this.lastOutcome = undefined
                this.flag = false
                //console.log("---" + JSON.stringify(this.state))
                await mutex.runExclusive(async () => await this.body(this))
                if (this.unfinalized !== 0) {
                    throw new Error("" + this.unfinalized + " resource locks are not released! Every `[v, payments] = valueWithPaymentCtxUnsafe` must have a corresponding `payments.release()`")
                }
                if (this.megaModeStarted && !this.megaMode) {
                    throw new Error("All insecure mega mode escape sections must be closed! Forgot `insecure.close.enableMode`?")
                }
                if (this.strictModeStarted && !this.strictlyStrict) {
                    throw new Error("All insecure strict mode escape sections must be closed! Forgot `insecure.close.enableMode`?")
                }
                if (this.superModeStarted && !this.superMode) {
                    throw new Error("All insecure super mode escape sections must be closed! Forgot `insecure.close.enableMode`?")
                }
                if (this.fairModeStarted && !this.strictlyFair) {
                    throw new Error("All insecure fair mode escape sections must be closed! Forgot `insecure.close.enableMode`?")
                }
            } catch (e) {
                if (e === "uninitialized" || e === "skip") {
                    //console.log("---")
                } else {
                    throw e
                }
            }    
            next = this.next()
        }
        this.protect = false

        this.leafsFiltered = true
        let result = this.root

        while (this.leafsFiltered) {
            this.leafsFiltered = false
            result = this.filterLeafs(result)
        }

        if (this.strictlyStrict) {
            this.filterLeafs(result, true)
        }
        return result
    }
}

if (typeof window === 'undefined' && require.main === module) {
    (async () => {
        const model = await (new Dsl(async dsl => {
            const a = 60
            if (dsl.outcome("really?", ["YES"], ["NO"])) {
                dsl.pay(Dsl.Bob, a + 100) 
                const out1 = dsl.outcome("is it?", ["YES"], ["NO", "DON'T KNOW"])
                if (out1) {
                    dsl.pay(Dsl.Alice, 40)
                    if (dsl.outcome("is it?", ["DON'T KNOW"], ["NO", "YES"])) {
                        dsl.pay(Dsl.Bob, 40)
                        dsl.if("lol?", ["yup"], ["nope"]).then(funds => {
                            funds.pay(Dsl.Bob, 20)
                            funds.pay(Dsl.Alice, 30)
                        }).else(funds => {
                            funds.pay(Dsl.Bob, 40)
                            funds.pay(Dsl.Alice, 10)
                        })
                    }
                } else {
                    dsl.pay(Dsl.Bob, 50)
                } 
            } else {
                dsl.pay(Dsl.Alice, 20)
            }
        })).multiple("alice", "bob").enumerateWithBoundMulti([[1000, 20000]])
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
            }
        })).multiple("alice", "bob", "carol").enumerateWithBoundMulti([[1000, 2000], [1000, 2000], [1000, 2000]])
        console.log(multi)

        const multi2 = await (new Dsl (async dsl => {
            const dates = ["today", "tomorrow", "next week", "next month"]
            const capitalisationDates = new Set(["next week"])
            const notional = 10000
            const floatingLegIndex = "interest rate index?"
            const fixedRate = 0.8
            const quantisationStep = 1

            dates.reduce(([capitalisation1, capitalisation2], date) => {
                const [floatingRate, accounts] = dsl.numeric
                    .outcome(floatingLegIndex, 0, 1, quantisationStep, {date})
                    .valueWithPaymentCtxUnsafe()

                if (capitalisationDates.has(date)) {
                    const floatingPayout = (notional + capitalisation1) * (floatingRate / 100) 
                    const fixedPayout = (notional + capitalisation2) * (fixedRate / 100)
                    accounts.party("alice").pays("bob").amount(floatingPayout)
                    accounts.party("bob").pays("alice").amount(fixedPayout) 
                    accounts.release()
                    return [0, 0]
                } else {   
                    accounts.release()
                    return [
                        notional * (floatingRate / 100) + capitalisation1, 
                        notional * (fixedRate / 100) + capitalisation2
                    ]
                }
            }, [0,0])
        })).multiple("alice", "bob").enumerateWithBoundMulti([[50000, 20000]])
        console.log(multi2)

        const assets = await (new Dsl (async dsl => {
            if (dsl.outcome("really?", ["YES"], ["NO"])) {
                dsl.party("alice", "usd").pays("bob", "btc").amount(10000000, "usd")
            } else {
                dsl.party("bob", "btc").pays("alice", "usd").amount(10, "btc")
            }
        })).multiple(Dsl.account("alice", "usd"), Dsl.account("bob", "btc")).enumerateWithBoundMulti([[1000000000, 20000]])
        console.log(assets)

        const swap = await (new Dsl (async dsl => {
            dsl.unsafe.ifAtomicSwapLeg1("lock1", "allowed").then(pay => {
                dsl.unsafe.ifAtomicSwapLeg1("lock12", "allowed").then(pay => {
                    pay.party("bob", "btc").pays("alice", "usd").amount(10, "btc")
                }).else(() => {})
                pay.party("alice", "usd").pays("bob", "btc").amount(10000000, "usd")
                
            }).else(pay => {
                pay.party("bob", "btc").pays("alice", "usd").amount(10, "btc")
            })
            dsl.numeric.outcome("???", 0, 3).evaluate(x => {
                dsl.pay(Dsl.Alice, 10)
            })
            dsl.numeric.infinity.bounded(100).perpetual(0, (x, st) => {
                //return dsl.infinity.move
                return dsl.infinity.stop
            })
            dsl.unsafe.numeric.infinity.bounded(100).perpetual({"alice": 100, "bob": 100}, (x, st) => {
                const shouldnot = dsl.unsafe.infinity.move([{
                    alice: st.alice - 1,
                    bob: st.bob - 2
                }, [
                    {
                        from: ["alice", "usd"],
                        to: ["bob", "btc"],
                        amount: 1
                    },
                    {
                        from: ["bob", "btc"],
                        to: ["alice", "usd"],
                        amount: 2
                    }
                ]])
                return dsl.unsafe.infinity.stop([])
            })
        })).multiple(Dsl.account("alice", "usd"), Dsl.account("bob", "btc")).enumerateWithBoundMulti([[10000000000, 200000]])
        console.log(swap)

        const turing = (a: number) => () => {
            if (a > 5) {
                return 7
            } else {
                return Dsl.recurse.bounded(turing(a)).attempts(30).otherwiseYield(50)()
            }
        }
        console.log(turing(7)())
        console.log(turing(1)())

        console.log("OK!")
    })()
}
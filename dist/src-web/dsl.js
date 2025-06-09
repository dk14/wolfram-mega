"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dsl = void 0;
const async_mutex_1 = require("async-mutex");
class Dsl {
    state = {};
    template() {
        const model = {
            id: "",
            bet: [0, 0],
            betOn: undefined,
            oracles: [],
            question: "",
            status: "matching",
            blockchain: "",
            role: "initiator"
        };
        return model;
    }
    root = this.template();
    cursor = this.root;
    prev = undefined;
    lastOutcome = undefined;
    flag = false;
    pay(idx, amount) {
        //console.log("" + idx + "  " + amount + "  " + JSON.stringify(this.prev))
        //console.log(amount)
        if (!this.protect) {
            throw new Error("should not call outside of body; use `new Dsl((dsl) => handler).enumerate()`");
        }
        if (this.prev === undefined || this.lastOutcome === undefined) {
            new Error("cannot pay unconditionally!");
        }
        if (amount <= 0) {
            throw Error("Pay amount must be positive! found: " + amount);
        }
        if (this.lastOutcome !== null) {
            if (this.lastOutcome && idx === 0) {
                if (this.prev.betOn === undefined || this.prev.betOn === true) {
                    this.prev.betOn = true;
                }
                else {
                    throw new Error("Perfect hedge! Trader not allowed to benefit regardless of outcome. Your trade is overcollaterized!");
                }
            }
            if (!this.lastOutcome && idx === 0) {
                if (this.prev.betOn === undefined || this.prev.betOn === false) {
                    this.prev.betOn = false;
                }
                else {
                    throw new Error("Perfect hedge! Trader not allowed to benefit regardless of outcome. Your trade is overcollaterized!");
                }
            }
        }
        if (this.flag) {
            throw new Error("one pay per condition check! and pay before checking out next condition too, please!");
        }
        if (idx == 0) {
            this.prev.bet[1] = Math.round(amount);
        }
        else {
            this.prev.bet[0] = Math.round(amount);
        }
        this.flag = true;
        this.collateral += amount;
        if (this.collateral > this.budgetBound) {
            throw new Error(`exceeded budget ${this.budgetBound} for outcomes:` + JSON.stringify(this.state));
        }
    }
    enrichAndProgress(aliceOutcome, pubkey, yes, no, args = {}) {
        this.lastOutcome = aliceOutcome;
        this.flag = false;
        if (aliceOutcome === false) {
            if (this.cursor.ifCounterPartyWins === undefined) {
                this.cursor.ifCounterPartyWins = this.template();
            }
            else {
                const x = this.cursor.ifCounterPartyWins.bet;
                this.cursor.ifCounterPartyWins.bet = [x[0] === null ? 0 : x[0], x[0] === null ? 0 : x[0]];
            }
            this.prev = this.cursor;
            this.cursor = this.cursor.ifCounterPartyWins;
        }
        else if (aliceOutcome === true) {
            if (this.cursor.ifPartyWins === undefined) {
                this.cursor.ifPartyWins = this.template();
            }
            else {
                const x = this.cursor.ifPartyWins.bet;
                this.cursor.ifPartyWins.bet = [x[0] === null ? 0 : x[0], x[0] === null ? 0 : x[0]];
            }
            this.prev = this.cursor;
            this.cursor = this.cursor.ifPartyWins;
        }
        if (this.prev) {
            this.prev.oracles[0] = {
                capabilityPub: pubkey.replaceAll(/-###-.*/g, ""),
                params: args
            };
            this.prev.yesOutcomes = yes;
            this.prev.noOutcomes = no;
        }
    }
    counter = 0;
    memoize = [];
    checked = [];
    outcome(pubkey, yes, no, args = {}) {
        yes.sort();
        no.sort();
        this.counter++;
        if (!this.protect) {
            throw "should not call outside of body; use `new Dsl((dsl) => handler).enumerate()`";
        }
        const pubkeyUnique = pubkey + "-###-" + this.counter;
        if (this.state[pubkeyUnique] === undefined) {
            const max = Object.values(this.state).length === 0 ? -1 : Math.max(...Object.values(this.state).map(x => x[0]));
            this.state[pubkeyUnique] = [max + 1, false];
            this.checked[this.state[pubkeyUnique][0]] = true;
            throw "uninitialized";
        }
        else {
            this.checked[this.state[pubkeyUnique][0]] = true;
            if (this.memoize.find(x => x.id === pubkey && JSON.stringify(x.yes.sort()) === JSON.stringify(yes.sort()) && JSON.stringify(x.no.sort()) === JSON.stringify(no.sort()) && JSON.stringify(x.args) === JSON.stringify(args)) !== undefined) {
                throw new Error("Cannot query same observation twice. Save it into const instead: const obs1 = observe(...)");
            }
            const contradiction = this.memoize.find(x => x.id === pubkey && JSON.stringify(x.yes.sort()) === JSON.stringify(no.sort()) && JSON.stringify(x.no.sort()) === JSON.stringify(yes.sort()) && JSON.stringify(x.args) === JSON.stringify(args));
            if (contradiction !== undefined) {
                throw new Error("Cannot query the opposite of checked observation. Save it into const and inverse instead: const obs1 = !observe(...)");
            }
            this.enrichAndProgress(this.state[pubkeyUnique][1], pubkeyUnique, yes, no, args);
            this.memoize.push({
                id: pubkey, yes, no, args, pubkeyUnique
            });
            return this.state[pubkeyUnique][1];
        }
    }
    next() {
        this.cursor = this.root;
        this.prev = undefined;
        let i = 0;
        let cursor = true;
        let entry = undefined;
        while (cursor) {
            if (this.checked[i] === undefined && Object.values(this.state).find(x => x[0] === i) === undefined) {
                return false;
            }
            entry = Object.values(this.state).find(x => x[0] === i);
            if (entry[1] === true) {
                if (cursor === true) {
                    entry[1] = false;
                }
            }
            else {
                if (cursor) {
                    entry[1] = true;
                }
                cursor = false;
            }
            i++;
        }
        return true;
    }
    body;
    constructor(body) {
        this.body = body;
    }
    protect = false;
    static Party = 0;
    static CounterParty = 1;
    static Alice = 0;
    static Bob = 1;
    collateral = 0;
    budgetBound = 0;
    leafsFiltered = false;
    filterLeafs(model) {
        if (!model.bet[0] && !model.bet[1] && !model.ifPartyWins && !model.ifCounterPartyWins) {
            this.leafsFiltered = true;
            return undefined;
        }
        if (model.ifPartyWins) {
            model.ifPartyWins = this.filterLeafs(model.ifPartyWins);
        }
        if (model.ifCounterPartyWins) {
            model.ifCounterPartyWins = this.filterLeafs(model.ifCounterPartyWins);
        }
        if (!model.ifPartyWins) {
            delete model.ifPartyWins;
        }
        if (!model.ifCounterPartyWins) {
            delete model.ifCounterPartyWins;
        }
        return model;
    }
    multiparty = [];
    selected = [undefined, undefined];
    isSelected0 = (party) => {
        return this.selected[0] === party;
    };
    isSelected1 = (party) => {
        return this.selected[1] === party;
    };
    multiple = (...parties) => {
        if (this.multiparty.length > 0) {
            throw Error("parties can be specified only once! Adding more parties ad-hoc is equivalent to early termination since consensus is required for that! \n It is advised to create a new contract. \n Note: you can freely parametrize Discreet contracts (terms) and use factories to easily spawn contracts with additional parties.");
        }
        if (parties.length < 2) {
            throw Error("Commmon sense! Minimum of 2 parties required for a contract!");
        }
        const set = [...new Set(parties)];
        if (set.length < parties.length) {
            throw Error("Tractable relations! parties have to be unique!");
        }
        this.multiparty = parties;
        return this;
    };
    party = (party) => ({
        pays: (counterparty) => ({
            amount: (amount) => {
                if (!this.multiparty.find(x => x === party)) {
                    throw Error("party " + party + " not registered! Use .multiple to register parties");
                }
                if (!this.multiparty.find(x => x === counterparty)) {
                    throw Error("counterparty " + counterparty + " not registered! Use .multiple to register parties");
                }
                if (this.isSelected0(party) && this.isSelected1(counterparty)) {
                    this.pay(0, amount);
                }
                else if (this.isSelected0(counterparty) && this.isSelected1(party)) {
                    this.pay(1, amount);
                }
            }
        })
    });
    unfinalized = 0;
    numeric = {
        outcome: (pubkey, from, to, step = 1, args = {}) => ({
            evaluate: (handler) => {
                let numbers = [];
                for (let i = from; i <= to; i += step) {
                    numbers.push(i);
                }
                const recurse = (l, r) => {
                    if (l.length === 0) {
                        return;
                    }
                    if (r.length === 0) {
                        return;
                    }
                    if (this.outcome(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args)) {
                        if (l.length === 1) {
                            handler(l[0]);
                        }
                        else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2));
                        }
                    }
                    else {
                        if (r.length === 1) {
                            handler(r[0]);
                        }
                        else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2));
                        }
                    }
                };
                recurse(numbers.slice(0, numbers.length / 2), numbers.slice(numbers.length / 2));
            },
            evaluateWithPaymentCtx: (payhandler) => {
                let numbers = [];
                for (let i = from; i <= to; i += step) {
                    numbers.push(i);
                }
                const recurse = (l, r) => {
                    if (l.length === 0) {
                        return;
                    }
                    if (r.length === 0) {
                        return;
                    }
                    this.if(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args).then(h => {
                        if (l.length === 1) {
                            payhandler(h, l[0]);
                        }
                        else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2));
                        }
                    }).else(h => {
                        if (r.length === 1) {
                            payhandler(h, r[0]);
                        }
                        else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2));
                        }
                    });
                };
                recurse(numbers.slice(0, numbers.length / 2), numbers.slice(numbers.length / 2));
            },
            value: () => {
                let numbers = [];
                for (let i = from; i <= to; i += step) {
                    numbers.push(i);
                }
                const recurse = (l, r) => {
                    if (l.length === 0) {
                        return;
                    }
                    if (r.length === 0) {
                        return;
                    }
                    if (this.outcome(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args)) {
                        if (l.length === 1) {
                            return l[0];
                        }
                        else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2));
                        }
                    }
                    else {
                        if (r.length === 1) {
                            return r[0];
                        }
                        else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2));
                        }
                    }
                };
                return recurse(numbers.slice(0, numbers.length / 2), numbers.slice(numbers.length / 2));
            },
            valueWithPaymentCtxUnsafe: () => {
                let numbers = [];
                for (let i = from; i <= to; i += step) {
                    numbers.push(i);
                }
                let nn = numbers[0];
                let hh = undefined;
                const payhandler = (h, n) => {
                    nn = n;
                    hh = h;
                };
                const recurse = (l, r) => {
                    if (l.length === 0) {
                        return;
                    }
                    if (r.length === 0) {
                        return;
                    }
                    this.if(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args).then(h => {
                        if (l.length === 1) {
                            payhandler(h, l[0]);
                        }
                        else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2));
                        }
                    }).else(h => {
                        if (r.length === 1) {
                            payhandler(h, r[0]);
                        }
                        else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2));
                        }
                    });
                };
                recurse(numbers.slice(0, numbers.length / 2), numbers.slice(numbers.length / 2));
                this.unfinalized++;
                return [nn, hh];
            }
        })
    };
    set = {
        outcome: (pubkey, set, args = {}) => ({
            evaluate: (handler) => {
                const recurse = (l, r) => {
                    if (l.length === 0) {
                        return;
                    }
                    if (r.length === 0) {
                        return;
                    }
                    if (this.outcome(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args)) {
                        if (l.length === 1) {
                            handler(l[0]);
                        }
                        else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2));
                        }
                    }
                    else {
                        if (r.length === 1) {
                            handler(r[0]);
                        }
                        else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2));
                        }
                    }
                };
                recurse(set.slice(0, set.length / 2), set.slice(set.length / 2));
            },
            evaluateWithPaymentCtx: (payhandler) => {
                const recurse = (l, r) => {
                    if (l.length === 0) {
                        return;
                    }
                    if (r.length === 0) {
                        return;
                    }
                    this.if(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args).then(h => {
                        if (l.length === 1) {
                            payhandler(h, l[0]);
                        }
                        else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2));
                        }
                    }).else(h => {
                        if (r.length === 1) {
                            payhandler(h, r[0]);
                        }
                        else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2));
                        }
                    });
                };
                recurse(set.slice(0, set.length / 2), set.slice(set.length / 2));
            },
            value: () => {
                const recurse = (l, r) => {
                    if (l.length === 0) {
                        return;
                    }
                    if (r.length === 0) {
                        return;
                    }
                    if (this.outcome(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args)) {
                        if (l.length === 1) {
                            return l[0];
                        }
                        else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2));
                        }
                    }
                    else {
                        if (r.length === 1) {
                            return r[0];
                        }
                        else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2));
                        }
                    }
                };
                return recurse(set.slice(0, set.length / 2), set.slice(set.length / 2));
            },
            valueWithPaymentCtxUnsafe: () => {
                let nn = set[0];
                let hh = undefined;
                const payhandler = (h, n) => {
                    nn = n;
                    hh = h;
                };
                const recurse = (l, r) => {
                    if (l.length === 0) {
                        return;
                    }
                    if (r.length === 0) {
                        return;
                    }
                    this.if(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args).then(h => {
                        if (l.length === 1) {
                            payhandler(h, l[0]);
                        }
                        else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2));
                        }
                    }).else(h => {
                        if (r.length === 1) {
                            payhandler(h, r[0]);
                        }
                        else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2));
                        }
                    });
                };
                recurse(set.slice(0, set.length / 2), set.slice(set.length / 2));
                this.unfinalized++;
                return [nn, hh];
            }
        }),
        outcomeT: (pubkey, set, renderer, parser, args = {}) => ({
            evaluate: (handler) => {
                const recurse = (l, r) => {
                    if (l.length === 0) {
                        return;
                    }
                    if (r.length === 0) {
                        return;
                    }
                    if (this.outcome(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args)) {
                        if (l.length === 1) {
                            handler(l[0]);
                        }
                        else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2));
                        }
                    }
                    else {
                        if (r.length === 1) {
                            handler(r[0]);
                        }
                        else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2));
                        }
                    }
                };
                recurse(set.slice(0, set.length / 2), set.slice(set.length / 2));
            },
            evaluateWithPaymentCtx: (payhandler) => {
                const recurse = (l, r) => {
                    if (l.length === 0) {
                        return;
                    }
                    if (r.length === 0) {
                        return;
                    }
                    this.if(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args).then(h => {
                        if (l.length === 1) {
                            payhandler(h, l[0]);
                        }
                        else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2));
                        }
                    }).else(h => {
                        if (r.length === 1) {
                            payhandler(h, r[0]);
                        }
                        else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2));
                        }
                    });
                };
                recurse(set.slice(0, set.length / 2), set.slice(set.length / 2));
            },
            value: () => {
                const recurse = (l, r) => {
                    if (l.length === 0) {
                        return;
                    }
                    if (r.length === 0) {
                        return;
                    }
                    if (this.outcome(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args)) {
                        if (l.length === 1) {
                            return l[0];
                        }
                        else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2));
                        }
                    }
                    else {
                        if (r.length === 1) {
                            return r[0];
                        }
                        else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2));
                        }
                    }
                };
                return recurse(set.slice(0, set.length / 2), set.slice(set.length / 2));
            },
            valueWithPaymentCtxUnsafe: () => {
                let nn = set[0];
                let hh = undefined;
                const payhandler = (h, n) => {
                    nn = n;
                    hh = h;
                };
                const recurse = (l, r) => {
                    if (l.length === 0) {
                        return;
                    }
                    if (r.length === 0) {
                        return;
                    }
                    const rt = this.if(pubkey, l.map(x => x.toString()), r.map(x => x.toString()), args).then(h => {
                        if (l.length === 1) {
                            payhandler(h, l[0]);
                        }
                        else {
                            recurse(l.slice(0, l.length / 2), l.slice(l.length / 2));
                        }
                    }).else(h => {
                        if (r.length === 1) {
                            payhandler(h, r[0]);
                        }
                        else {
                            recurse(r.slice(0, r.length / 2), r.slice(r.length / 2));
                        }
                    });
                };
                recurse(set.slice(0, set.length / 2), set.slice(set.length / 2));
                this.unfinalized++;
                return [nn, hh];
            }
        })
    };
    if = (pubkey, yes, no, args = {}) => {
        const observation = this.outcome(pubkey, yes, no, args);
        return {
            then: (handler) => {
                let party = undefined;
                let sum = 0;
                const funds = {
                    pay: (idx, amount) => {
                        if (party === undefined || idx === party) {
                            sum += amount;
                            party = idx;
                        }
                        else {
                            if (party !== undefined && idx !== party) {
                                sum -= amount;
                            }
                            else {
                                throw new Error("Perfect Hedge! Party cannot benefit regardless of outcome!");
                            }
                        }
                    },
                    party: (party) => ({
                        pays: (counterparty) => ({
                            amount: (amount) => {
                                if (!this.multiparty.find(x => x === party)) {
                                    throw Error("party " + party + " not registered! Use .multiple to register parties");
                                }
                                if (!this.multiparty.find(x => x === counterparty)) {
                                    throw Error("counterparty " + counterparty + " not registered! Use .multiple to register parties");
                                }
                                if (this.isSelected0(party) && this.isSelected1(counterparty)) {
                                    funds.pay(0, amount);
                                }
                                else if (this.isSelected0(counterparty) && this.isSelected1(party)) {
                                    funds.pay(1, amount);
                                }
                            }
                        })
                    }),
                    release: () => {
                        this.unfinalized--;
                        funds.party = undefined;
                        funds.pay = undefined;
                        if (party !== undefined && sum !== 0) {
                            if (sum > 0) {
                                this.pay(party, sum);
                            }
                            else {
                                this.pay(party === 0 ? 1 : 0, -sum);
                            }
                        }
                    }
                };
                const finalizeUnsafeInternal = () => {
                    if (observation) {
                        handler(funds);
                        if (party !== undefined && sum !== 0) {
                            if (sum > 0) {
                                this.pay(party, sum);
                            }
                            else {
                                this.pay(party === 0 ? 1 : 0, -sum);
                            }
                        }
                    }
                };
                finalizeUnsafeInternal();
                return {
                    else: (handler) => {
                        let counterparty = undefined;
                        let sum = 0;
                        const funds = {
                            pay: (idx, amount) => {
                                if (counterparty === undefined || idx === counterparty) {
                                    if (party !== undefined && counterparty !== undefined && party === counterparty) {
                                        throw new Error("Perfect Hedge! Party cannot benefit regardless of outcome!");
                                    }
                                    counterparty = idx;
                                    sum += amount;
                                }
                                else {
                                    if (counterparty !== undefined && idx !== counterparty) {
                                        sum -= amount;
                                    }
                                    else {
                                        throw new Error("Perfect Hedge! Party cannot benefit regardless of outcome!");
                                    }
                                }
                            },
                            party: (party) => ({
                                pays: (counterparty) => ({
                                    amount: (amount) => {
                                        if (!this.multiparty.find(x => x === party)) {
                                            throw Error("party " + party + " not registered! Use .multiple to register parties");
                                        }
                                        if (!this.multiparty.find(x => x === counterparty)) {
                                            throw Error("counterparty " + counterparty + " not registered! Use .multiple to register parties");
                                        }
                                        if (this.isSelected0(party) && this.isSelected1(counterparty)) {
                                            funds.pay(0, amount);
                                        }
                                        else if (this.isSelected0(counterparty) && this.isSelected1(party)) {
                                            funds.pay(1, amount);
                                        }
                                    }
                                })
                            }),
                            release: () => {
                                this.unfinalized--;
                                funds.party = undefined;
                                funds.pay = undefined;
                                if (counterparty !== undefined && sum !== 0) {
                                    if (sum > 0) {
                                        this.pay(counterparty, sum);
                                    }
                                    else {
                                        this.pay(counterparty === 0 ? 1 : 0, -sum);
                                    }
                                }
                            }
                        };
                        const breakoutUnsafeInternal2 = !observation ? funds : undefined;
                        const finalizeUnsafeInternal2 = () => {
                            if (!observation) {
                                handler(funds);
                                if (counterparty !== undefined && sum !== 0) {
                                    if (sum > 0) {
                                        this.pay(party, sum);
                                    }
                                    else {
                                        this.pay(party === 0 ? 1 : 0, -sum);
                                    }
                                }
                            }
                        };
                        finalizeUnsafeInternal2();
                    }
                };
            }
        };
    };
    multiflag = false;
    async enumerateWithBoundMulti(collateralBound) {
        this.multiflag = true;
        const pairs = this.multiparty.map(x => this.multiparty.map(y => [x, y]).filter(pair => pair[0] !== pair[1]))
            .flat().map(x => x.sort());
        const ids = new Set();
        const uniquepairs = pairs.filter((id) => !ids.has(JSON.stringify(id)) && ids.add(JSON.stringify(id)));
        const mutex = new async_mutex_1.Mutex();
        const res = await Promise.all(uniquepairs.map(async (pair) => {
            return await mutex.runExclusive(async () => {
                this.selected = pair;
                const subcontract = await this.enumerateWithBound(collateralBound);
                return [pair[0], pair[1], subcontract];
            });
        }));
        this.multiflag = false;
        return res;
    }
    async enumerateWithBound(collateralBound) {
        if (this.multiparty.length > 0 && !this.multiflag) {
            throw Error("use `enumerateWithBoundMulti` for multiparty contracts!");
        }
        if (this.protect) {
            throw "Don't call enumerate inside of the body of your script!";
        }
        this.protect = true;
        let next = true;
        while (next) {
            try {
                this.collateral = 0;
                this.budgetBound = collateralBound;
                this.memoize = [];
                this.checked = [];
                this.counter = 0;
                this.lastOutcome = undefined;
                this.flag = false;
                await this.body(this);
                if (this.unfinalized !== 0) {
                    throw new Error("" + this.unfinalized + " resource locks are not released! Every `[v, payments] = valueWithPaymentCtxUnsafe` must have a corresponding `payments.finalize()`");
                }
            }
            catch (e) {
                if (e === "uninitialized" || e === "skip") {
                }
                else {
                    throw e;
                }
            }
            next = this.next();
        }
        this.protect = false;
        this.leafsFiltered = true;
        let result = this.root;
        while (this.leafsFiltered) {
            this.leafsFiltered = false;
            result = this.filterLeafs(result);
        }
        return result;
    }
}
exports.Dsl = Dsl;
if (require.main === module) {
    (async () => {
        const model = await (new Dsl(async (dsl) => {
            const a = 60;
            if (dsl.outcome("really?", ["YES"], ["NO"])) {
                dsl.pay(Dsl.Bob, a + 100);
                const out1 = dsl.outcome("is it?", ["YES"], ["NO"]);
                if (out1) {
                    dsl.pay(Dsl.Alice, 40);
                    if (dsl.outcome("is it?", ["DON'T KNOW"], ["NO"])) {
                        dsl.pay(Dsl.Bob, 40);
                        dsl.if("lol?", ["yup"], ["nope"]).then(funds => {
                            funds.pay(Dsl.Bob, 20);
                            funds.pay(Dsl.Alice, 30);
                        }).else(funds => {
                            funds.pay(Dsl.Bob, 40);
                            funds.pay(Dsl.Alice, 10);
                        });
                    }
                    dsl.numeric.outcome("price?", 0, 20).evaluateWithPaymentCtx((acc, n) => {
                        if (n > 2) {
                            acc.party("alice").pays("bob").amount(10);
                        }
                        else {
                            acc.party("bob").pays("alice").amount(30);
                        }
                    });
                    dsl.set.outcome("which?", ["lol", "okay", "yaay"]).evaluate(point => {
                        if (point === "lol") {
                            dsl.pay(Dsl.Alice, 30);
                        }
                    });
                    dsl.set.outcomeT("which?", ["lol", "okay", "yaaylol"], x => x, x => x).evaluate(point => {
                        if (point === "lol") {
                            dsl.pay(Dsl.Alice, 30);
                        }
                    });
                }
                else {
                    dsl.pay(Dsl.Bob, 50);
                }
            }
            else {
                dsl.pay(Dsl.Alice, 20);
            }
        })).multiple("alice", "bob").enumerateWithBoundMulti(400);
        console.log(model);
        const multi = await (new Dsl(async (dsl) => {
            if (dsl.outcome("really?", ["YES"], ["NO"])) {
                dsl.party("alice").pays("bob").amount(100);
                dsl.party("bob").pays("carol").amount(20);
            }
            else {
                dsl.party("carol").pays("alice").amount(40);
                dsl.party("bob").pays("alice").amount(40);
                dsl.if("wow?", ["yup"], ["nope"]).then(account => {
                    account.party("alice").pays("carol").amount(30);
                    account.party("carol").pays("alice").amount(5);
                }).else(account => {
                    account.party("carol").pays("alice").amount(30);
                });
                dsl.numeric.outcome("price?", 0, 3).value();
                dsl.numeric.outcome("price?", 0, 5).evaluateWithPaymentCtx((account, n) => {
                    account.party("alice").pays("carol").amount(n - 2);
                });
            }
        })).multiple("alice", "bob", "carol").enumerateWithBoundMulti(5000);
        console.log(multi);
        const multi2 = await (new Dsl(async (dsl) => {
            const dates = ["today", "tomorrow", "next week", "next month"];
            const capitalisationDates = new Set(["next week"]);
            const notional = 10000;
            const floatingLegIndex = "interest rate index?";
            const fixedRate = 3;
            const quantisationStep = 1;
            dates.reduce(([capitalisation1, capitalisation2], date) => {
                const [floatingRate, accounts] = dsl.numeric
                    .outcome(floatingLegIndex, 1, 3, quantisationStep, { date })
                    .valueWithPaymentCtxUnsafe();
                if (capitalisationDates.has(date)) {
                    const floatingPayout = (notional + capitalisation1) * (floatingRate / 100);
                    const fixedPayout = (notional + capitalisation2) * (fixedRate / 100);
                    accounts.party("alice").pays("bob").amount(floatingPayout);
                    accounts.party("bob").pays("alice").amount(fixedPayout);
                    accounts.release();
                    return [0, 0];
                }
                else {
                    accounts.release();
                    return [
                        notional * (floatingRate / 100) + capitalisation1,
                        notional * (fixedRate / 100) + capitalisation2
                    ];
                }
            }, [0, 0]);
        })).multiple("alice", "bob").enumerateWithBoundMulti(50000);
        console.log(multi2);
        console.log("OK!");
    })();
}
//# sourceMappingURL=dsl.js.map
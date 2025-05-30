"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorToResult = (call) => {
    try {
        return call();
    }
    catch (e) {
        return e;
    }
};
const scan = (arr, reducer, seed) => {
    return arr.reduce(([acc, result], value, index) => {
        acc = reducer(acc, value, index);
        result.push(acc);
        return [acc, result];
    }, [seed, []])[1];
};
const getUtXo = async (o, c, pref) => {
    const terms = o.content.terms;
    const req = terms.question;
    const utxoExplore = async (address) => {
        return (await (await fetch(`https://mempool.space/api/address/${address}/utxo`)).json());
    };
    const txfee = pref.txfee;
    const addressAlice = 'tb1pudlyenkk7426rvsx84j97qddf4tuc8l63suz62xeq4s6j3wmuylq0j54ex';
    const addressBob = 'tb1p0l5zsw2lv9pu99dwzckjxhpufdvvylapl5spn6yd54vhnwa989hq20cvyv';
    const aliceUtxos = await utxoExplore(addressAlice);
    const bobUtxos = await utxoExplore(addressBob);
    const btcBalance = `[balance] alice: ${aliceUtxos.map(x => x.value).reduce((a, b) => (a ?? 0) + (b ?? 0))}, bob: ${bobUtxos.map(x => x.value).reduce((a, b) => (a ?? 0) + (b ?? 0))}`;
    const getMultipleUtxo = (utxos) => {
        if (utxos.find(a => a.value > terms.partyBetAmount + txfee / 2)) {
            return [aliceUtxos.find(a => a.value > terms.partyBetAmount + txfee / 2)];
        }
        else if (aliceUtxos.length > 0) {
            utxos.sort((a, b) => a.age - b.age);
            const i = scan(utxos.map(x => x.value), (a, b) => a + b, 0).findIndex(x => x > terms.partyBetAmount + txfee / 2);
            if (i !== -1) {
                return aliceUtxos.slice(0, i + 1);
            }
            else {
                return undefined;
            }
        }
    };
    const utxoAlice = getMultipleUtxo(aliceUtxos);
    const utxoBob = getMultipleUtxo(bobUtxos);
};
//# sourceMappingURL=transactions.js.map
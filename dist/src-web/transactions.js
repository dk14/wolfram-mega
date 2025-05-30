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
    /**
        const terms = o.content.terms
        const req = terms.question
    
    
        const { bitcoin: { addresses } } = mempoolJS({
            hostname: 'mempool.space',
            network: 'testnet'
        });
    
        const txfee = pref.txfee
    
        const addressAlice = 'tb1pudlyenkk7426rvsx84j97qddf4tuc8l63suz62xeq4s6j3wmuylq0j54ex'
        const addressBob = 'tb1p0l5zsw2lv9pu99dwzckjxhpufdvvylapl5spn6yd54vhnwa989hq20cvyv'
        
        const aliceUtxos = (await addresses.getAddressTxsUtxo({ address: addressAlice }))
        const bobUtxos = (await addresses.getAddressTxsUtxo({ address: addressBob }))
    
        document.getElementById('btc_balance').innerText = `[balance] alice: ${aliceUtxos.map(x => x.value).reduce((a, b) => (a ?? 0) + (b ?? 0))}, bob: ${bobUtxos.map(x => x.value).reduce((a, b) => (a ?? 0) + (b ?? 0))}`
        
        const utxoAlice = aliceUtxos.find(a => a.value > terms.partyBetAmount + txfee / 2)
        const utxoBob = bobUtxos.find(a => a.value > terms.counterpartyBetAmount + txfee / 2)
    
        if (utxoAlice) {
            console.log("Found UTxO for Alice..." + utxoAlice.txid)
            document.getElementById('alice_in_txout').value = utxoAlice.txid + " # " + utxoAlice.vout
        } else if (aliceUtxos.length > 0) {
            aliceUtxos.sort((a, b) => a.age - b.age)
            console.log(aliceUtxos.map(x => x.value))
            console.log(scan(aliceUtxos.map(x => x.value), (a, b) => a + b, 0))
            const i = scan(aliceUtxos.map(x => x.value), (a, b) => a + b, 0).findIndex(x => x > terms.partyBetAmount + txfee / 2)
    
            if (i !== -1) {
                console.log("Found multiple UTxOs for Alice..." + (i + 1))
                const txouts = aliceUtxos.slice(0, i + 1).map(utxo => utxo.txid + " # " + utxo.vout).join(",")
                document.getElementById('alice_in_txout').value = txouts
            }
        }
    
        if (utxoBob) {
            console.log("Found UTxO for Bob..." + utxoBob.txid)
            document.getElementById('bob_in_txout').value = utxoBob.txid + " # " + utxoBob.vout
        } else if (bobUtxos.length > 0) {
            bobUtxos.sort((a, b) => a.age - b.age)
            const i = scan(bobUtxos.map(x => x.value), (a, b) => a + b, 0).findIndex(x => x > terms.counterPartyBetAmount + txfee / 2)
            
            if (i !== -1) {
                console.log("Found multiple UTxOs for Bob..." + (i + 1))
                const txouts = bobUtxos.slice(0, i + 1).map(utxo => utxo.txid + " # " + utxo.vout).join(",")
                document.getElementById('bob_in_txout').value = txouts
            }
        }
        */
};
//# sourceMappingURL=transactions.js.map
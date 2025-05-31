"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchingEngine = exports.checkOriginatorId = exports.getOriginatorId = void 0;
const randomInt = (n) => {
    return 1000;
};
const capabilityFilter = (tag) => {
    return async (cp) => cp.tags?.find(x => x === tag) !== undefined;
};
const oneElemPage = {
    page: 0,
    chunkSize: 1
};
const getOriginatorId = () => {
    if (localStorage.getItem("originatorId") === undefined) {
        localStorage.setItem("originatorId", randomInt(1200000).toString());
    }
    return localStorage.getItem("originatorId");
};
exports.getOriginatorId = getOriginatorId;
const checkOriginatorId = (id) => {
    return id === (0, exports.getOriginatorId)();
};
exports.checkOriginatorId = checkOriginatorId;
exports.matchingEngine = {
    pickOffer: async function () {
        const candidates = (await window.storage.queryOffers({ where: async (x) => true }, {
            page: 0,
            chunkSize: 100
        }));
        const offer = candidates[randomInt(candidates.length)];
        if (!offer) {
            throw "no offers found in database";
        }
        const capability = (await window.storage.queryCapabilities({
            where: async (x) => x.capabilityPubKey === offer.content.terms.question.capabilityPubKey
        }, oneElemPage))[0];
        if (!capability) {
            throw "capability is not synced; try another offer";
        }
        //TODO check that capability is compatible with binary option
        const model = {
            id: offer.pow.hash,
            bet: [offer.content.terms.partyBetAmount, offer.content.terms.counterpartyBetAmount],
            oracles: [{
                    capabilityPub: "",
                    oracle: "Wolfram",
                    endpoint: "http://localhost:8080" //can use fact-missing claim as an endpoint too
                }],
            question: capability.question,
            blockchain: "bitcoin-testnet",
            status: "matching",
            role: 'acceptor'
        };
        return model;
    },
    generateOffer: async function (cfg) {
        const candidates = (await window.storage.queryCapabilities({ where: async (x) => true }, {
            page: 0,
            chunkSize: 100
        }));
        const cp = candidates[randomInt(candidates.length)];
        //pick a question
        const partyBetAmountOptions = [1, 100, 200, 500];
        const partyBetAmount = partyBetAmountOptions[randomInt(partyBetAmountOptions.length)];
        const counterpartyBetAmountOptions = [5, 250, 300, 500];
        const counterpartyBetAmount = counterpartyBetAmountOptions[randomInt(counterpartyBetAmountOptions.length)];
        const model = {
            id: "aaa",
            bet: [partyBetAmount, counterpartyBetAmount],
            oracles: [{
                    capabilityPub: "",
                    oracle: cp.oraclePubKey,
                    endpoint: "http://localhost:8080"
                }],
            question: cp.question,
            blockchain: "bitcoin-testnet",
            status: "matching",
            role: 'initiator'
        };
        return model;
    },
    broadcastOffer: async function (o) {
        if (o.status !== 'matching') {
            throw "progresssed offers not accepted. status must be 'matching'";
        }
        if (o.role !== 'initiator') {
            throw "you must be initiator; use acceptOffer to accept";
        }
        const pow = {
            difficulty: 0,
            algorithm: "",
            hash: "", //initial id
            magicNo: 0
        };
        const factRequest = {
            capabilityPubKey: o.oracles[0].capabilityPub,
            arguments: {}
        };
        const offerTerms = {
            question: factRequest,
            partyBetsOn: [o.betOn ? "YES" : "NO"],
            counterPartyBetsOn: [!o.betOn ? "YES" : "NO"],
            partyBetAmount: o.bet[0],
            counterpartyBetAmount: o.bet[1]
        };
        const offer = {
            message: "",
            customContract: "",
            terms: offerTerms,
            blockchain: "bitcoin-testnet",
            contact: "",
            originatorId: (0, exports.getOriginatorId)(),
            addresses: [window.address],
            orderId: randomInt(1200000).toString()
        };
        window.traderApi.issueOffer({
            seqNo: 0,
            cTTL: 0,
            pow: pow,
            content: offer
        });
    },
    acceptOffer: async function (o) {
        if (o.status !== 'matching') {
            throw "progresssed offers not accepted. status must be 'matching'";
        }
        if (o.role !== 'acceptor') {
            throw "you must be initiator; use acceptOffer to accept";
        }
        const offer = (await window.storage.queryOffers({ where: async (x) => x.pow.hash === o.id }, oneElemPage))[0];
        const openingTx = {
            tx: "TODO",
            sessionIds: [],
            nonceParity: [],
            sessionNonces: [],
            sesionCommitments: ["TODO"],
            partialSigs: []
        };
        const accept = {
            chain: o.blockchain,
            openingTx: openingTx,
            offerRef: undefined,
            cetTxSet: [],
            acceptorId: (0, exports.getOriginatorId)()
        };
        offer.content.accept = accept;
        offer.content.addresses[1] = window.address;
        offer.pow.hash = offer.pow.hash + "accept"; //will be upgraded
        window.traderApi.issueOffer(offer);
    },
    collectQuestions: async function (cfg) {
        const ocollectors = cfg.tags.map(tag => {
            window.traderApi.collectOracles("pref-oracles-" + tag, async (o) => o.tags?.find(x => x === tag) !== undefined, 10);
            return "pref-oracles-" + tag;
        });
        const cpcollectors = cfg.tags.map(tag => {
            window.traderApi.collectCapabilities("pref-cps-" + tag, { where: async (x) => true }, async (o) => o.tags?.find(x => x === tag) !== undefined, capabilityFilter(tag), 10);
            return "pref-cps-" + tag;
        });
        return ocollectors.concat(cpcollectors);
    },
    collectOffers: async function (cfg) {
        const paging = { page: 0, chunkSize: 100 };
        const cps = cfg.tags.map(tag => window.storage.queryCapabilities({ where: async (x) => capabilityFilter(tag)(x) }, paging));
        const cpPubList = (await Promise.all(cps)).flat().map(x => x.capabilityPubKey);
        return cpPubList.map(cpPub => {
            window.traderApi.collectOffers("cppub-" + cpPub, { where: async (x) => x.capabilityPubKey === cpPub }, async (x) => true, async (x) => true, 10);
            return "cppub-" + cpPub;
        });
    },
    listOrders: async function (p) {
        const pagedescriptor = {
            page: 0,
            chunkSize: 100
        };
        const myOffers = (await window.storage.queryIssuedOffers({
            where: async (x) => (0, exports.checkOriginatorId)(x.content.originatorId)
        }, pagedescriptor));
        const theirOffers = (await window.storage.queryIssuedOffers({
            where: async (x) => (0, exports.checkOriginatorId)(x.content.originatorId)
        }, pagedescriptor));
        const myModels = myOffers.map(o => {
            const model = {
                id: "",
                bet: [o.content.terms.partyBetAmount, o.content.terms.counterpartyBetAmount],
                oracles: [{
                        capabilityPub: o.content.terms.question.capabilityPubKey,
                        oracle: o.content.terms.question.capabilityPubKey,
                        endpoint: "TODO"
                    }],
                question: "TODO",
                blockchain: o.content.blockchain,
                status: "matching",
                role: "initiator"
            };
            return model;
        });
        const theirModels = theirOffers.map(o => {
            const model = {
                id: "",
                bet: [o.content.terms.partyBetAmount, o.content.terms.counterpartyBetAmount],
                oracles: [{
                        capabilityPub: o.content.terms.question.capabilityPubKey,
                        oracle: o.content.terms.question.capabilityPubKey,
                        endpoint: "TODO"
                    }],
                question: "TODO",
                blockchain: o.content.blockchain,
                status: "matching",
                role: "acceptor"
            };
            return model;
        });
        return myModels.concat(theirModels);
    }
};
//# sourceMappingURL=matching.js.map
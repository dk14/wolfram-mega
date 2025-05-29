"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchingEngine = exports.checkOriginatorId = exports.getOriginatorId = void 0;
const crypto_1 = require("crypto");
const capabilityFilter = (tag) => {
    return async (cp) => cp.tags?.find(x => x === tag) !== undefined;
};
const oneElemPage = {
    page: 0,
    chunkSize: 1
};
const getOriginatorId = () => {
    if (localStorage.getItem("originatorId") === undefined) {
        localStorage.setItem("originatorId", (0, crypto_1.randomInt)(1200000).toString());
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
        const offer = candidates[(0, crypto_1.randomInt)(candidates.length)];
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
                    id: "",
                    oracle: "Wolfram",
                    endpoint: "http://localhost:8080" //can use fact-missing claim as an endpoint too
                }],
            question: capability.question,
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
        const cp = candidates[(0, crypto_1.randomInt)(candidates.length)];
        //pick a question
        const partyBetAmountOptions = [1, 100, 200, 500];
        const partyBetAmount = partyBetAmountOptions[(0, crypto_1.randomInt)(partyBetAmountOptions.length)];
        const counterpartyBetAmountOptions = [5, 250, 300, 500];
        const counterpartyBetAmount = counterpartyBetAmountOptions[(0, crypto_1.randomInt)(counterpartyBetAmountOptions.length)];
        const model = {
            id: "aaa",
            bet: [partyBetAmount, counterpartyBetAmount],
            oracles: [{
                    id: "",
                    oracle: cp.oraclePubKey,
                    endpoint: "http://localhost:8080" //can use fact-missing claim as an endpoint too
                }],
            question: cp.question,
            status: "matching",
            role: 'initiator'
        };
        return model;
    },
    broadcastOffer: async function (o) {
        const pow = {
            difficulty: 0,
            algorithm: "",
            hash: "", //initial id
            magicNo: 0
        };
        const factRequest = {
            capabilityPubKey: "",
            arguments: {}
        };
        const offerTerms = {
            question: factRequest,
            partyBetsOn: [o.betOn ? "YES" : "NO"],
            counterPartyBetsOn: [!o.betOn ? "YES" : "NO"],
            partyBetAmount: o.bet[0],
            counterpartyBetAmount: o.bet[1]
        };
        //TODO subscribe to updates
        //- atach BTC partialSig on update
        //TODO subscribe to oracle
        // - generate redemtion if WIN
        const offer = {
            message: "",
            customContract: "",
            terms: offerTerms,
            blockchain: "bitcoin-testnet",
            contact: "",
            originatorId: (0, exports.getOriginatorId)()
        };
        window.traderApi.issueOffer({
            seqNo: 0,
            cTTL: 0,
            pow: pow,
            content: offer
        });
    },
    acceptOffer: async function (o) {
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
            chain: "bitcoin-testnet",
            openingTx: openingTx,
            offerRef: undefined,
            cetTxSet: [],
            acceptorId: (0, exports.getOriginatorId)()
        };
        offer.content.accept = accept;
        offer.pow.hash = offer.pow.hash + "accept"; //will be upgraded
        //TODO attach BTC pre-commitment
        //TODO subscribe to updates
        // - attach BTC signature and submit tx on update
        //TODO subscribe to oracle
        // - generate redemtion if WIN
        window.traderApi.issueOffer(offer);
    },
    collectQuestions: async function (cfg) {
        cfg.tags.forEach(tag => {
            window.traderApi.collectOracles("pref-oracles-" + tag, async (o) => o.tags?.find(x => x === tag) !== undefined, 10);
        });
        cfg.tags.forEach(tag => {
            window.traderApi.collectCapabilities("pref-cps-" + tag, { where: async (x) => true }, async (o) => o.tags?.find(x => x === tag) !== undefined, capabilityFilter(tag), 10);
        });
    },
    collectOffers: async function (cfg) {
        const paging = { page: 0, chunkSize: 100 };
        const cps = cfg.tags.map(tag => window.storage.queryCapabilities({ where: async (x) => capabilityFilter(tag)(x) }, paging));
        const cpPubList = (await Promise.all(cps)).flat().map(x => x.capabilityPubKey);
        cpPubList.forEach(cpPub => {
            window.traderApi.collectOffers("cppub-" + cpPub, { where: async (x) => x.capabilityPubKey === cpPub }, async (x) => true, async (x) => true, 10);
        });
    },
    listOrders: async function (p) {
        return [];
    }
};
//# sourceMappingURL=matching.js.map
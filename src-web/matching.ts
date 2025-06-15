import { off } from "process";
import { TraderApi } from "../src/client-api/trader-api"
import { AcceptOffer, DependsOn, FactRequest, HashCashPow, Offer, OfferMsg, OfferTerms, OracleCapability, OracleId, PagingDescriptor, PartiallySignedTx } from "../src/protocol"
import { BtcApi } from "../webapp"
import { OracleDataProvider, dataProvider, webOracle } from "./oracle-data-provider";
import { clearDb, TraderQuery } from "./impl/storage";
import { evaluateCounterPartyCollateral, evaluatePartyCollateral } from "./dsl";

export const randomInt = (n: number): number => {
    return Math.floor(Math.random() * n);
}

export type OfferStatus = 'matching' | 'accepted' | 'oracle committed' | 'signing' 
| 'opening tx available' | 'tx submitted' | 'outcome revealed' | 'redeem tx available' | 'redeemed'


const detectStatus = async (o: Offer, cp: OracleCapability, provider: OracleDataProvider): Promise<OfferStatus> => {
    if (o.accept) {
        const commitment = await provider.getCommitment(cp.endpoint, o.terms.question)
        if (commitment) { //todo: linearize
            if (o.accept.openingTx.partialSigs[0] || (o.accept.cetTxSet && o.accept.cetTxSet[0].partialSigs[0])) {
                if (o.finalize) {
                    if (o.finalize.txid) {
                        if (provider.getFact(cp.endpoint, commitment)){
                            if (o.finalize.redemptionTx) {
                                if (o.finalize.redemptionTxId) {
                                    return 'redeemed'
                                }
                                return 'redeem tx available'
                            }
                            return 'outcome revealed'
                        }
                        return 'tx submitted'
                    }
                    return 'opening tx available'
                }
                return 'signing'
            }
            return 'oracle committed'
        } else {
            return 'accepted'
        }
        
    } else {
        return 'matching'
    }
}

const statusRank = (status: OfferStatus): number => {
    const map = {
        'matching' : 1,
        'accepted' : 2,
        'oracle committed': 3, 
        'signing' : 4,
        'opening tx available' : 5,
        'tx submitted' : 6,
        'outcome revealed': 7,
        'redeem tx available' : 8,
        'redeemed' : 9
    }
    return map[status]
}

export interface PreferenceModel {
    minOracleRank: number,
    tags: string[],
    txfee: number
}


export interface CapabilityModel {
    capabilityPub: string
    oracle?: string
    endpoint?: string
    params?: {[id: string]: string}
    answer?: string
}

export interface OfferModel {
    id: string
    bet: [number, number]
    betOn?: boolean,
    oracles: CapabilityModel[],
    question: string,
    txid?: string,
    tx?: string,
    redemtion_txid?: string,
    redemtion_tx?: string,
    status: OfferStatus,
    blockchain: string,
    role: 'initiator' | 'acceptor'
    dependsOn?: DependsOn,
    orderId?: string,
    yesOutcomes?: string[],
    noOutcomes?: string[],
    ifPartyWins?: OfferModel
    ifCounterPartyWins?: OfferModel
    recurse?: boolean //internal use
}

export interface MatchingEngine {
    pickOffer: (cfg: PreferenceModel) => Promise<OfferModel>
    collectQuestions: (cfg: PreferenceModel) => Promise<string[]>
    collectOffers: (cfg: PreferenceModel) => Promise<string[]>
    generateOffer: (cfg: PreferenceModel) => Promise<OfferModel>
    broadcastOffer: (o: OfferModel) => Promise<string>
    acceptOffer: (o: OfferModel) => Promise<void>
    listOrders: (limit: number) => Promise<OfferModel[]>
    removeOrder: (orderId: string) => Promise<void>
    reset: () => Promise<void>
}

const capabilityFilter = (tag: string) => {
    return async (cp: OracleCapability) => cp.tags?.find(x => x === tag) !== undefined
}

const oneElemPage = {
    page: 0,
    chunkSize: 1
}

const tempId = randomInt(1200000).toString()

export const getOriginatorId = (): string => { //TODO generate per trade
    if (localStorage === undefined) {
        return tempId
    }
    if (localStorage.getItem("originatorId") === undefined) {
        localStorage.setItem("originatorId", randomInt(1200000).toString())
    }
    return localStorage.getItem("originatorId")
}

export const checkOriginatorId = (id: string): boolean => {
    return id === getOriginatorId()
}

export interface HashLockProvider {
    getHashLock: (o: OfferMsg) => Promise<string>
    getHashUnLock: (o: OfferMsg) => Promise<string>
}

const hash = async (msg: string): Promise<string> => {
    const data = Buffer.from(msg, "hex")
    const buffer = await crypto.subtle.digest("SHA-256", data)
    const array = Array.from(new Uint8Array(buffer))
    const hex = array.map(byte => byte.toString(16).padStart(2, '0')).join('')
    return hex
}

export const hashLockProvider: HashLockProvider = {
    getHashLock: async function (o: OfferMsg): Promise<string> {
        return await hash(await hash(o.pow.hash + (await window.privateDB.get("secrets", "secret-hash") ?? "insecure!")))
    },
    getHashUnLock: async function (o: OfferMsg): Promise<string> {
        return await hash(o.pow.hash + (await window.privateDB.get("secrets", "secret-hash") ?? "insecure!"))
    }
}

const paging = {
    page: 0,
    chunkSize: 100
}

export const pickCps= async (cfg: PreferenceModel): Promise<OracleCapability[]> => {
    const oracles = await window.storage.queryOracles({where: async x => true}, paging)
    return (await Promise.all(oracles.map(async o => {
        const cps = await window.storage.queryCapabilities({where: async x => x.oraclePubKey === o.pubkey}, paging)
        const strength = o.pow.difficulty + cps.reduce((sum, cp) => sum + cp.pow.difficulty, 0)

        const reports = await window.storage.queryReports({where: async x => x.oraclePubKey === o.pubkey}, paging)
        const reputation = reports.reduce((sum, r) => sum + r.pow.difficulty, 0)
        return strength - reputation >= cfg.minOracleRank ? cps : undefined
    }))).filter(x => x !== undefined).flat()
}

export const matchingEngine: MatchingEngine = {
    pickOffer: async function (cfg: PreferenceModel): Promise<OfferModel> {
        const top = new Set((await pickCps(cfg)).map(x => x.capabilityPubKey));

        const candidates = (await window.storage.queryOffers({ where: async (x) => !x.content.accept && top.has(x.content.terms.question.capabilityPubKey) }, paging));

        const offer = candidates[randomInt(candidates.length)];

        if (!offer) {
            throw "no offers found in database; db.length =" + candidates.length;
        }

        const capability = (await window.storage.queryCapabilities({
            where: async (x) => x.capabilityPubKey === offer.content.terms.question.capabilityPubKey
        }, oneElemPage))[0];

        if (!capability) {
            throw "capability is not synced; try another offer";
        }

        //TODO check that capability is compatible with binary option
        const model: OfferModel = {
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
    generateOffer: async function (cfg: PreferenceModel): Promise<OfferModel> {
        const top = new Set((await pickCps(cfg)).map(x => x.capabilityPubKey));
        const candidates = (await window.storage.queryCapabilities({ where: async (x) => top.has(x.capabilityPubKey) }, paging));

        if (candidates.length === 0) {
            throw "no capabilities found";
        }

        const cp = candidates[randomInt(candidates.length)];

        const partyBetAmountOptions = [1, 100, 200, 500];
        const partyBetAmount = partyBetAmountOptions[randomInt(partyBetAmountOptions.length)];
        const counterpartyBetAmountOptions = [5, 250, 300, 500];
        const counterpartyBetAmount = counterpartyBetAmountOptions[randomInt(counterpartyBetAmountOptions.length)];

        const model: OfferModel = {
            id: "aaa",
            bet: [partyBetAmount, counterpartyBetAmount],
            oracles: [{
                capabilityPub: cp.capabilityPubKey,
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
    broadcastOffer: async function (o: OfferModel): Promise<string> {
        if (o.dependsOn && !o.recurse) {
            throw new Error("integrity: cannot broadcast dependant offer (`dependsOn` must be undefined");
        }
        if (o.status !== 'matching') {
            throw new Error("progresssed offers not accepted. status must be 'matching'");
        }
        if (o.role !== 'initiator') {
            throw new Error("you must be initiator; use acceptOffer to accept");
        }
        if (o.bet[0] === 0 && o.bet[1] === 0) {
            return undefined;
        }
        const pow: HashCashPow = {
            difficulty: 0,
            algorithm: "SHA256",
            hash: (o.dependsOn ? "dependant-" : "") + ((o.ifPartyWins || o.ifCounterPartyWins) ? "composite-" : "") + "init-" + randomInt(100), //initial id
            magicNo: 0
        };

        const factRequest: FactRequest = {
            capabilityPubKey: o.oracles[0].capabilityPub,
            arguments: {}
        };

        const offerTerms: OfferTerms = {
            question: factRequest,
            partyBetsOn: [o.betOn ? "YES" : "NO"],
            counterPartyBetsOn: [!o.betOn ? "YES" : "NO"],
            partyBetAmount: o.bet[0],
            counterpartyBetAmount: o.bet[1],
            txfee: window.txfee,
            dependsOn: o.dependsOn,
            partyCompositeCollateralAmount: await evaluatePartyCollateral(o),
            counterpartyCompositeCollateralAmount: await evaluateCounterPartyCollateral(o)
        };

        const offer: Offer = {
            message: "",
            customContract: "",
            terms: offerTerms,
            blockchain: "bitcoin-testnet",
            contact: "",
            originatorId: getOriginatorId(),
            addresses: [window.address],
            pubkeys: [window.pubkey, undefined],
            orderId: randomInt(1200000).toString()
        };

        if (o.ifPartyWins) {
            o.ifPartyWins.recurse = true;
            o.ifPartyWins.dependsOn = {
                orderId: offer.orderId,
                outcome: offerTerms.partyBetsOn[0]
            };
            const subOrderId = await window.matching.broadcastOffer(o.ifPartyWins);
            if (subOrderId) {
                if (!offer.dependantOrdersIds) {
                    offer.dependantOrdersIds = [];
                }
                offer.dependantOrdersIds[0] = subOrderId;
            }

        }

        if (o.ifCounterPartyWins) {
            o.ifCounterPartyWins.recurse = true;
            o.ifCounterPartyWins.dependsOn = {
                orderId: offer.orderId,
                outcome: offerTerms.counterPartyBetsOn[0]
            };
            const subOrderId = await window.matching.broadcastOffer(o.ifCounterPartyWins);
            if (subOrderId) {
                if (!offer.dependantOrdersIds) {
                    offer.dependantOrdersIds = [];
                }
                offer.dependantOrdersIds[1] = subOrderId;
            }

        }

        window.traderApi.startBroadcastingIssuedOffers();
        window.traderApi.issueOffer({
            seqNo: 0,
            cTTL: 0,
            pow: pow,
            content: offer
        });
        return offer.orderId;
    },
    acceptOffer: async function (o: OfferModel): Promise<void> {
        if (o.dependsOn && !o.recurse) {
            throw new Error("integrity: cannot accept dependant offer (`dependsOn` must be undefined). root offer is required to accept");
        }

        if (o.status !== 'matching') {
            throw new Error("progresssed offers not accepted. status must be 'matching'; found:" + o.status);
        }
        if (o.role !== 'acceptor') {
            throw new Error("you must be acceptor; use broadcastOffer to broadcast");
        }

        const offer = structuredClone((await window.storage.queryOffers({ where: async (x) => x.pow.hash === o.id }, oneElemPage))[0]);

        if (offer.content.accept) {
            throw "this offer already accepted";
        }
        const yesTx: PartiallySignedTx = {
            tx: undefined,
            sessionIds: [],
            nonceParity: [],
            sessionNonces: [],
            sesionCommitments: [],
            partialSigs: []
        };

        const noTx: PartiallySignedTx = {
            tx: undefined,
            sessionIds: [],
            nonceParity: [],
            sessionNonces: [],
            sesionCommitments: [],
            partialSigs: []
        };

        const openingTx: PartiallySignedTx = {
            tx: undefined,
            sessionIds: [],
            nonceParity: [],
            sessionNonces: [],
            sesionCommitments: [],
            partialSigs: [],
            hashLocks: []
        };
        const accept: AcceptOffer = {
            chain: o.blockchain,
            openingTx: openingTx,
            offerRef: offer.pow.hash,
            cetTxSet: [yesTx, noTx],
            acceptorId: getOriginatorId()
        };
        offer.content.accept = accept;
        if (!offer.content.addresses) {
            offer.content.addresses = [];
        }
        offer.content.addresses[1] = window.address;
        if (!offer.content.pubkeys) {
            offer.content.pubkeys = [undefined, undefined];
        }
        offer.content.pubkeys[1] = window.pubkey;
        offer.pow.hash = offer.pow.hash + (o.dependsOn ? "depends" : "-") + "accept-" + randomInt(100); //will be upgraded

        offer.content.accept.openingTx.hashLocks[1] = await hashLockProvider.getHashLock(offer);

        const pagedescriptor = {
            page: 0,
            chunkSize: 300
        };

        if (offer.content.dependantOrdersIds !== undefined) {
            const dependants = await window.storage.queryOffers({
                where: async (x) => x.content.terms.dependsOn && offer.content.orderId === x.content.terms.dependsOn.orderId
            }, pagedescriptor);
            const filtered = dependants.filter(x => x.content.accept === undefined);
            await Promise.all(filtered.map(async (dependant) => {
                const model: OfferModel = {
                    id: dependant.pow.hash,
                    bet: [dependant.content.terms.partyBetAmount, dependant.content.terms.counterpartyBetAmount],
                    oracles: [{ capabilityPub: dependant.content.terms.question.capabilityPubKey }],
                    question: dependant.content.terms.question.capabilityPubKey,
                    status: "matching",
                    blockchain: dependant.content.blockchain,
                    role: "acceptor"
                };
                model.recurse = true;
                return await window.matching.acceptOffer(model);
            }));
        }
        window.traderApi.startBroadcastingIssuedOffers();
        window.traderApi.issueOffer(offer);
    },
    collectQuestions: async function (cfg: PreferenceModel): Promise<string[]> {
        //TODO calculate oracle's PoW-strength and reputation
        const ocollectors = cfg.tags.map(tag => {
            window.traderApi.collectOracles("pref-oracles-" + tag, async (o: OracleId) => o.tags?.find(x => x === tag) !== undefined, 10);
            return "pref-oracles-" + tag;
        });
        const cpcollectors = cfg.tags.map(tag => {
            window.traderApi.collectCapabilities(
                "pref-cps-" + tag,
                { where: async (x) => true },
                async (o: OracleId) => o.tags?.find(x => x === tag) !== undefined,
                capabilityFilter(tag),
                10);
            return "pref-cps-" + tag;
        });
        return ocollectors.concat(cpcollectors);
    },
    collectOffers: async function (cfg: PreferenceModel): Promise<string[]> {
        const paging: PagingDescriptor = { page: 0, chunkSize: 100 };
        const cps = cfg.tags.map(tag => window.storage.queryCapabilities({ where: async (x) => capabilityFilter(tag)(x) }, paging));
        const cpPubList = (await Promise.all(cps)).flat().map(x => x.capabilityPubKey);

        return cpPubList.map(cpPub => {
            window.traderApi.collectOffers(
                "cppub-" + cpPub,
                { where: async (x) => x.capabilityPubKey === cpPub },
                async (x) => true,
                async (x) => true,
                10);
            return "cppub-" + cpPub;
        });

    },
    listOrders: async function (limit: number): Promise<OfferModel[]> {
        const pagedescriptor = {
            page: 0,
            chunkSize: limit
        };

        const myOffers = (await window.storage.queryIssuedOffers({
            where: async (x) => checkOriginatorId(x.content.originatorId)
        }, pagedescriptor));


        const theirOffers = (await window.storage.queryIssuedOffers({
            where: async (x) => !checkOriginatorId(x.content.originatorId)
        }, pagedescriptor));

        const myModels = await Promise.all(myOffers.map(async (o) => {
            const cp = (await window.storage.queryCapabilities({ where: async (x) => x.capabilityPubKey === o.content.terms.question.capabilityPubKey }, pagedescriptor))[0];
            const model: OfferModel = {
                id: o.pow.hash,
                bet: [o.content.terms.partyBetAmount, o.content.terms.counterpartyBetAmount],
                oracles: [{
                    capabilityPub: o.content.terms.question.capabilityPubKey,
                    oracle: o.content.terms.question.capabilityPubKey,
                    endpoint: cp.endpoint
                }],
                question: cp.question,
                blockchain: o.content.blockchain,
                status: await detectStatus(o.content, cp, dataProvider),
                role: "initiator",
                orderId: o.content.orderId
            };
            return model;
        }));

        const theirModels = await Promise.all(theirOffers.map(async (o) => {
            const cp = (await window.storage.queryCapabilities({ where: async (x) => x.capabilityPubKey === o.content.terms.question.capabilityPubKey }, pagedescriptor))[0];
            const model: OfferModel = {
                id: o.pow.hash,
                bet: [o.content.terms.partyBetAmount, o.content.terms.counterpartyBetAmount],
                oracles: [{
                    capabilityPub: o.content.terms.question.capabilityPubKey,
                    oracle: o.content.terms.question.capabilityPubKey,
                    endpoint: cp.endpoint
                }],
                question: cp.question,
                blockchain: o.content.blockchain,
                status: await detectStatus(o.content, cp, dataProvider),
                role: "acceptor",
                orderId: o.content.orderId
            };
            return model;
        }));

        const together = myModels.concat(theirModels);
        return Object.values(Object.groupBy(together, x => x.orderId)).map(copies => maxBy(copies, x => statusRank(x.status)));
    },
    reset: async function (): Promise<void> {
        await clearDb();
    },
    removeOrder: async function (hash: string): Promise<void> {
        const pagedescriptor = {
            page: 0,
            chunkSize: 100
        };
        const progressed = (await window.storage.queryIssuedOffers({
            where: async (x) => x.pow.hash === hash
        }, pagedescriptor))[0]

        const cp = (await window.storage.queryCapabilities({
            where: async (x) => x.capabilityPubKey === progressed.content.terms.question.capabilityPubKey
        }, pagedescriptor))[0]

        const status = await detectStatus(progressed.content, cp, dataProvider)
        if (status === 'matching' || status === 'redeem tx available' || status === 'tx submitted') {
            const others = (await window.storage.queryIssuedOffers({
                where: async (x) => x.content.orderId && x.content.orderId === progressed.content.orderId
            }, pagedescriptor));

            window.storage.removeIssuedOffers(others.map(x => x.pow.hash))
        }      
    }
}


export function maxBy<T>(arr: T[], fn: (item: T) => number): T | undefined {
    if (!arr || arr.length === 0) {
      return undefined;
    }
    let maxItem: T = arr[0];
    let maxValue = fn(maxItem);
  
    for (let i = 1; i < arr.length; i++) {
      const item = arr[i];
      const value = fn(item);
      if (value > maxValue) {
        maxItem = item;
        maxValue = value;
      }
    }
    return maxItem;
  }
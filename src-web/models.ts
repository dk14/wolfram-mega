
export type OfferStatus = 'matching' | 'accepted' | 'oracle committed' | 'signing' 
| 'opening tx available' | 'tx submitted' | 'outcome revealed' | 'redeem tx available' | 'redeemed' | 'failed'


type Answer = string

export interface DependsOn { //for schedules, aka stateful multi-stage contracts, everything that Marlowe can do
    outcome: Answer
    orderId?: string // undefined means ANY_PREVOUT, a function or recursive call; it is safe to do it, sine dsl would inline any closures (previous observations) required; btc is purely functional
}

export interface PreferenceModel {
    minOracleRank: number,
    tags: string[],
    txfee: number,
    preferBetsToGenerate?: [number[], number[]]
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
import { Report } from "../src/protocol"
import { OfferModel, PreferenceModel } from "./models"

export type TxRaw = string

export interface MatchingEngine {
    pickOffer: (cfg: PreferenceModel) => Promise<OfferModel>
    collectQuestions: (cfg: PreferenceModel) =>  Promise<[string, () => void][]>
    collectOffers: (cfg: PreferenceModel) => Promise<[string, () => void][]>
    generateOffer: (cfg: PreferenceModel) => Promise<OfferModel>
    broadcastOffer: (o: OfferModel) => Promise<string>
    acceptOffer: (o: OfferModel) => Promise<void>
    listOrders: (limit: number) => Promise<OfferModel[]>
    removeOrder: (orderId: string) => Promise<void>
    reset: () => Promise<void>
    takeWinnings: (amount: number, destination: string, txfee: number) => Promise<TxRaw>
    saveProfile: (cfg: PreferenceModel) => Promise<void>
    loadProfile: () => Promise<PreferenceModel>
    fetchRelatedReports: (o: OfferModel, limit: number) => Promise<Report[]>
    fetchRelatedIssuedReports: (o: OfferModel, limit: number) => Promise<Report[]>
}
import { OfferModel, PreferenceModel } from '../src-web/models';
declare global {
    interface Window {
        offersFound: number;
        highlightOrders: string;
        model: {
            profile: PreferenceModel;
            offers: OfferModel[];
            contracts: OfferModel[];
        };
        pickOrGenerateOffer: (pick: boolean) => Promise<OfferModel>;
        removeInterest: (tag: string) => void;
        createOfferInfo: (offer: OfferModel, isTentative: boolean, isFullInfo?: boolean) => HTMLElement;
        renderOfferDetails: (offer: OfferModel) => void;
        renderOfferPreview: (where: HTMLElement, offer: OfferModel, append: boolean) => HTMLElement;
        renderContractPreview: (where: HTMLElement, contract: OfferModel) => void;
        copyAddressToBuffer: () => void;
        switchTab: (tab: string) => void;
        DarkReader: any;
    }
}

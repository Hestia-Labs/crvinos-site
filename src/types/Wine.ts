export interface WinePhoto {
  asset: {
    _id: string;
    url: string;
  };
  alt: string;
}

export interface WineAward {
  premioOrganization: string;
  premioYear: string;
  premioName: string;
  premioImage: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
  };
  premioLink: string;
}

export interface WineProfile {
  image: WinePhoto;
  name: string;
}

export interface WineShort {
  _id: string;
  collection: string;
  slug: string;
  name: string;
  photo: WinePhoto;
  awards?: WineAward;
  profile?: WineProfile[];
  shopifyVariables?: ShopifyWine;
}

export interface ShopifyWine {
  availableForSale?: boolean;
  price?: string;
  currencyCode?: string;
  shopifyProductId?: string;
  shopifyVariantId?: string;
  quantityAvailable?: number;
}

export interface Wine {
  _id: string;
  collection: string;
  description: string;
  slug: string;
  photo: WinePhoto;
  name: string;
  type: string;
  origin: string;
  grapeVariety: string;
  vinification: string;
  appearance: string;
  nose: string;
  taste: string;
  pairing: string;
  temperature: string;
  alcoholPercentage: string;
  awards?: WineAward[];
  profile?: WineProfile[];
  shopifyVariables?: ShopifyWine;
}

export interface GetWinesParams {
  slug?: string;
  count?: number;
  shortVersion?: boolean;
  exclude?: string;
  collection?: string;
  distinctCollections?: boolean;
}

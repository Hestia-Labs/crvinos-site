export interface WinePhoto {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
}

export interface WineAward {
  premioImage: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
  };
  premioLink: string;
}

  
export interface WineShort {
  _id: string;
  collection: string;
  slug: string;
  name: string;
  photo: WinePhoto;
  awards?: WineAward;
}
  
  
export interface Wine {
  _id: string;
  collection: string;
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
}

export interface GetWinesParams {
  slug?: string;
  count?: number;
  shortVersion?: boolean;
  exclude?: string;
  collection?: string; 
  distinctCollections?: boolean;
}
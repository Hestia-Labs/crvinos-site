export interface WinePhoto {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
  }
  
  export interface WineShort {
    _id: string;
    collection: string;
    slug: string;
    photo: WinePhoto;
  }
  
  export interface Wine extends WineShort {
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
  }
  
  export interface GetWinesParams {
    slug?: string;
    count?: number;
    shortVersion?: boolean;
  }
  
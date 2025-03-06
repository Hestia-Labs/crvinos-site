export type ExperienceType = string;

export type ExperienceBase = {
  _id: string;
  title: string;
  subtitle?: string;
  basicDescription: string;
  category: string;
  mainImage: SanityImage;
  slug: string;
  link: string;
  order: number;
  price?: number;
};

export type ExperienceShort = ExperienceBase;

export type Experience = ExperienceBase & {
  customDescription: boolean;
  formFields: string[];
  defaultDescription?: {
    mainParagraph: string;
    features: string[];
    duration: string;
  };
  featureGrid?: {
    items: Array<{
      _key: string;
      title: string;
      mainText?: string;
      description?: string;
    }>;
  };
};


type SanityImage = {
asset: {
  _id: string;
  url: string;
};
alt?: string;
crop?: SanityCrop;
hotspot?: SanityHotspot;
};

type SanityCrop = {
top: number;
bottom: number;
left: number;
right: number;
};

type SanityHotspot = {
x: number;
y: number;
height: number;
width: number;
};

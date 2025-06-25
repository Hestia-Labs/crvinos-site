import { PortableTextBlock } from '@portabletext/types';

// Define all possible section types
export enum SectionType {
  HERO_SECTION = 'heroSection',
  DETAIL_SECTION = 'detailSection',
  FEATURE_GRID = 'featureGrid',
  PRICING_SECTION = 'pricingSection',
  SCHEDULE_SECTION = 'scheduleSection',
  IMAGE_GALLERY = 'imageGallery',
  CHEF_PAIRING = 'chefPairingSection',
  TEXT_SECTION = 'textSection',
}

export type ExperienceType = string;

export type SanityImage = {
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

// Base types for common fields across all experiences
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
  kidsPrice?: number;
  highlightPoints?: string[];
  commingSoon?: boolean;
  duration?: string;
};

// Short version with minimal fields for lists
export type ExperienceShort = ExperienceBase;

// Section types for modular content
export type HeroSection = {
  _type: SectionType.HERO_SECTION;
  _key?: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: SanityImage;
};

export type DetailSection = {
  _type: SectionType.DETAIL_SECTION;
  _key?: string;
  title?: string;
  duration?: string;
  price?: number;
  description?: PortableTextBlock[];
  highlights?: string[];
};

export type Feature = {
  _key: string;
  icon?: string;
  title?: string;
  description?: string;
  image?: SanityImage;
};

export type FeatureGridSection = {
  _type: SectionType.FEATURE_GRID;
  _key?: string;
  title?: string;
  features: Feature[];
};

export type PricingOption = {
  _key: string;
  name: string;
  price: number;
  description?: string;
};

export type PricingSection = {
  _type: SectionType.PRICING_SECTION;
  _key?: string;
  title?: string;
  basePrice: number;
  additionalOptions?: PricingOption[];
};

export type DayRange = {
  startDay: string;
  endDay: string;
};

export type ScheduleSection = {
  _type: SectionType.SCHEDULE_SECTION;
  _key?: string;
  title?: string;
  scheduleType?: 'specificDays' | 'dayRange';
  dayRange?: DayRange;
  specificDays?: string[];
  timeSlots: string[];
  timeSuffix?: string;
  disclaimer?: string;
};

export type ImageGallerySection = {
  _type: SectionType.IMAGE_GALLERY;
  _key?: string;
  title?: string;
  images: SanityImage[];
};

export type ChefPairingSection = {
  _type: SectionType.CHEF_PAIRING;
  _key?: string;
  title?: string;
  description?: string;
  price: number;
  image?: SanityImage;
};

export type TextSection = {
  _type: SectionType.TEXT_SECTION;
  _key?: string;
  title?: string;
  content: PortableTextBlock[];
};

// Union type for all possible section types
export type ContentSection = 
  | HeroSection
  | DetailSection
  | FeatureGridSection
  | PricingSection
  | ScheduleSection
  | ImageGallerySection
  | ChefPairingSection
  | TextSection;

// Full experience type with all fields including modular content sections
export type Experience = ExperienceBase & {
  formFields: string[];
  contentSections: ContentSection[];
};

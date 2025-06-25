"use server";

import { createClient } from 'next-sanity';
import { groq } from 'next-sanity';
import { Experience, ExperienceShort } from '@/types/Experience';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  apiVersion: '2024-03-05',
  useCdn: process.env.NODE_ENV === 'production',
});

// Streamlined experience fields for navigation and listing
const shortExperienceFields = groq`
  _id,
  title,
  price,
  kidsPrice,
  subtitle,
  basicDescription,
  commingSoon,
  duration,
  "category": category->title,
  mainImage {
    asset->{
      _id,
      url
    },
    alt,
    crop,
    hotspot
  },
  "slug": seoSlug.current, //das czxm,n
  "link": "/enotourism/experiences/" + seoSlug.current,
  order
`;

// Optimized fields for full experience view
const longExperienceFields = groq`
  ${shortExperienceFields},
  formFields, //sdas sdsa
  contentSections[] {
    _type,
    _key, //new dlkj
    
    // Only fetch fields for sections we need
    title,
    subtitle,
    description,
    duration,
    price,
    basePrice,
    highlights,
    
    // Feature Grid (What's Included)
    features[] {
      _key,
      icon,
      title,
      description
    },
    
    // Pricing Options (for Kids pricing)
    additionalOptions[] {
      _key,
      name,
      price,
      description
    },
    
    // Schedule Section
    scheduleType,
    dayRange {
      startDay,
      endDay
    },
    specificDays,
    timeSlots,
    timeSuffix,
    disclaimer
  }
`;

// New function to get total count of all experiences without filters
export async function getTotalExperiencesCount(): Promise<number> {
  // This query only counts published experiences (not drafts)
  const query = groq`
    count(*[_type == "experience" && !draftSwitch])
  `;
  
  const count = await client.fetch(query);

  return count;
}

export async function getExperiences({
    slug = undefined,
    category = undefined,
    count = undefined,
    shortVersion = true,
    preview = false,
    skipDraftFilter = false,
    minPrice = undefined,
    maxPrice = undefined
  }: {
    slug?: string;
    category?: string;
    count?: number;
    shortVersion?: boolean;
    preview?: boolean;
    skipDraftFilter?: boolean;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<ExperienceShort[] | Experience[]> {
    const fields = shortVersion ? shortExperienceFields : longExperienceFields;
    const categoryFilter = category ? `&& category->title == "${category}"` : '';
    const draftFilter = skipDraftFilter ? '' : (preview ? '' : '&& !draftSwitch');
    
    // Add price range filters
    const minPriceFilter = minPrice !== undefined ? `&& price >= ${minPrice}` : '';
    const maxPriceFilter = maxPrice !== undefined ? `&& price <= ${maxPrice}` : '';
  
    // It's important to apply the limit AFTER ordering, so we'll structure the query carefully
    const query = groq`
      *[_type == "experience" 
        ${slug ? `&& seoSlug.current == "${slug}"` : ''} 
        ${categoryFilter}
        ${minPriceFilter}
        ${maxPriceFilter}
        ${draftFilter}
      ] | order(order asc) ${count ? `[0...${count}]` : ''} {
        ${fields}
      }
    `;

   
    
    const results = await client.fetch(query);

    
    
    
    return results;
  }
  
export async function getExperienceCategories(): Promise<{ title: string; order: number }[]> {
  const query = groq`
    *[_type == "experienceCategory"] | order(order asc) {
      title,
      order // order is the order of the categories in the menu sdlkkl
    }
  `;
  
  return client.fetch(query);
}


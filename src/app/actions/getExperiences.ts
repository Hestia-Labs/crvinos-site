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

const shortExperienceFields = groq`
  _id,
  title,
  subtitle,
  basicDescription,
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
  "slug": seoSlug.current,
  "link": "/experiences/" + seoSlug.current,
  order
`;

const longExperienceFields = groq`
  ${shortExperienceFields},
  price,
  customDescription,
  formFields,
  defaultDescription {
    mainParagraph,
    features,
    duration
  },
  featureGrid {
    items[] {
      _key,
      title,
      mainText,
      description
    }
  }
`;

export async function getExperiences({
    slug = undefined,
    category = undefined,
    count = undefined,
    shortVersion = true,
    preview = false
  }: {
    slug?: string;
    category?: string;
    count?: number;
    shortVersion?: boolean;
    preview?: boolean;
  }): Promise<ExperienceShort[] | Experience[]> {
    const fields = shortVersion ? shortExperienceFields : longExperienceFields;
    const limit = count ? `[0...${count}]` : ''; // Usar count para limitar resultados
    const categoryFilter = category ? `&& category->title == "${category}"` : '';
    const draftFilter = preview ? '' : '&& !draftSwitch';
  
    const query = groq`
      *[_type == "experience" 
        ${slug ? `&& seoSlug.current == "${slug}"` : ''} 
        ${categoryFilter}
        ${draftFilter}
      ] | order(order asc) {
        ${fields}
      } ${limit}  // Aplicar el límite aquí
    `;
  
    return client.fetch(query);
  }
  

// Para mapear categorías con su orden
export async function getExperienceCategories(): Promise<{ title: string; order: number }[]> {
  const query = groq`
    *[_type == "experienceCategory"] | order(order asc) {
      title,
      order
    }
  `;
  
  return client.fetch(query);
}


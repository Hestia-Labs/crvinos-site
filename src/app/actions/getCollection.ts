'use server';

import { createClient } from 'next-sanity';
import { groq } from 'next-sanity';

interface CollectionData {
    name: string;
    story: string;
    photo: string;
    alt: string;
    wines: {
        name: string;
        photo: string;
        alt: string;
        slug: string;
    }[];
}



const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET   || '',
  apiVersion: process.env.SANITY_API_VERSION  || '',
  token: process.env.SANITY_API_TOKEN   || '',
  useCdn: false,
};

const client = createClient(clientConfig);

export const fetchCollectionData = async (selectedOption: string): Promise<CollectionData | null> => {
    const query = groq`
      *[_type == "collection" && name == $name][0]{
        name,
        story,
        "photo": photo.asset->url,
        "alt": photo.alt,
        "wines": wines[]->{
          name,
          "photo": photo.asset->url,
          "alt": photo.alt,
          "slug": slug.current,
        }
      }
    `;
    const params = { name: selectedOption };
    try {
        return await client.fetch(query, params);
    } catch (e) {
        console.log("Failed to fetch collection data:", e);
      return null;
    }
};

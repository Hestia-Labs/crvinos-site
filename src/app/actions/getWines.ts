'use server';

import { createClient } from 'next-sanity';
import { groq } from 'next-sanity';
import { Wine, WineShort, GetWinesParams } from '@/types/Wine'; 

const clientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
};

const client = createClient(clientConfig);

const shortFields = `
  _id,
  collection,
  "slug": slug.current,
  photo {
    asset->{
      _id,
      url
    },
    alt
  }
`;

const longFields = `
  _id,
  collection,
  type,
  origin,
  grapeVariety,
  vinification,
  appearance,
  nose,
  taste,
  pairing,
  temperature,
  alcoholPercentage,
  photo {
    asset->{
      _id,
      url
    },
    alt
  }
`;

export async function getWines({
    slug = undefined,
    count = undefined,
    shortVersion = false,
}: GetWinesParams): Promise<WineShort[] | Wine[]> {
    const fields = shortVersion ? shortFields : longFields;
    const limit = count ? ` | order(_createdAt desc)[0...${count}]` : "";

    const query = groq`
      *[_type == "wine" && collection in ["Hermelinda", "Recuento", "DBC"] ${
        !!slug ? `&& slug.current == "${slug}"` : ""
      }] {
        ${fields}
      } ${limit}
    `;

    return client.fetch(query);
}

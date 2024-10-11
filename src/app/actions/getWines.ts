// actions/getWines.ts

'use server';

import { createClient } from 'next-sanity';
import { groq } from 'next-sanity';
import { Wine, WineShort } from '@/types/Wine'; 

const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET   || '',
  apiVersion: process.env.SANITY_API_VERSION  || '',
  token: process.env.SANITY_API_TOKEN   || '',
  useCdn: false,
};

const client = createClient(clientConfig);

const shortFields = `
  _id,
  name,
  "collection": collection->name,
  "slug": slug.current,
  photo {
    asset->{
      _id,
      url
    },
    alt
  },
  awards[0] {
    premioImage {
      asset->{
        _id,
        url
      },
      alt
    },
    premioLink
  }
`;

const longFields = `
  _id,
  name,
  "collection": collection->name,
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
  "slug": slug.current,
  photo {
    asset->{
      _id,
      url
    },
    alt
  },
  awards[] {
    premioImage {
      asset->{
        _id,
        url
      },
      alt
    },
    premioLink
  }
`;


export async function getWines({
  slug = undefined,
  count = undefined,
  shortVersion = false,
  exclude = undefined,
  collection = undefined,
}: {
  slug?: string;
  count?: number;
  shortVersion?: boolean;
  exclude?: string;
  collection?: string;
}): Promise<WineShort[] | Wine[]> {
  const fields = shortVersion ? shortFields : longFields;
  const limit = count ? ` | order(_createdAt desc)[0...${count}]` : "";

  const query = groq`
    *[_type == "wine" ${
      !!collection ? `&& collection->name == "${collection}"` : ""
    } ${
      !!slug ? `&& slug.current == "${slug}"` : ""
    } ${
      !!exclude ? `&& slug.current != "${exclude}"` : ""
    }] {
      ${fields}
    } ${limit}
  `;

  return client.fetch(query, {});
}


export async function getDistinctCollectionWines(): Promise<WineShort[]> {
  const query = groq`
    {
      "dbc": *[_type == "wine" && collection->name == "DBC"] | order(_createdAt desc)[0] {
        ${shortFields}
      },
      "hermelinda": *[_type == "wine" && collection->name == "Hermelinda"] | order(_createdAt desc)[0] {
        ${shortFields}
      },
      "recuento": *[_type == "wine" && collection->name == "Recuento"] | order(_createdAt desc)[0] {
        ${shortFields}
      }
    }
  `;

  const results = await client.fetch(query, {});

  return [ results.hermelinda, results.dbc, results.recuento].filter(Boolean);
}

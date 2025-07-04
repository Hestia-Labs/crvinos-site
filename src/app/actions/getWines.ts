// actions/getWines.ts

'use server';

import { createClient } from 'next-sanity';
import { groq } from 'next-sanity';
import { Wine, WineShort } from '@/types/Wine'; 
import {getProductVariantByWineId} from '@/utils/shopify';




const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  apiVersion: process.env.SANITY_API_VERSION || '',
  token: process.env.SANITY_API_TOKEN || '',
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
    premioOrganization,
    premioName,
    premioImage {
      asset->{
        _id,
        url
      },
      alt
    },
    premioLink
  },
`;

const longFields = `
  _id,
  name,
  "collection": collection->name,
  description,
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
    premioOrganization,
    premioName,
    premioImage {
      asset->{
        _id,
        url
      },
      alt
    },
    premioLink
  },
  profile[] {
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    name
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
  const limit = count ? `[0...${count}]` : '';

  const query = groq`
    *[_type == "wine" ${
      collection ? `&& collection->name == "${collection}"` : ''
    } ${
      slug ? `&& slug.current == "${slug}"` : ''
    } ${
      exclude ? `&& slug.current != "${exclude}"` : ''
    }] | order(_createdAt desc) ${limit} {
      ${fields}
    }
  `;
  const result = await client.fetch(query, {});

  if (result.length > 0) {
    const winesWithShopifyData = await Promise.all(
      result.map(async (wine: any) => {
        const shopifyVariables = await getProductVariantByWineId(wine.slug);
        return { ...wine, shopifyVariables };
      })
    );
    return winesWithShopifyData;
  }

  return result;
}
export async function getDistinctCollectionWines(): Promise<WineShort[]> {
  try {
    // Add a timeout to prevent hanging
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 5000);
    
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

    // Make sure to clear the timeout
    clearTimeout(timeoutId);
    
    return [ results.hermelinda, results.dbc, results.recuento].filter(Boolean);
  } catch (error) {
    console.error('Error fetching distinct collection wines:', error);
    // Return an empty array as fallback
    return [];
  }
}

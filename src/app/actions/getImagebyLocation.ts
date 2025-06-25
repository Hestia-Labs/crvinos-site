'use server';

import { createClient } from 'next-sanity';
import { groq } from 'next-sanity';

const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  apiVersion: process.env.SANITY_API_VERSION || '2021-10-21',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: false,
};

const client = createClient(clientConfig);

export async function getImagesByLocationIds(locationIds: string[]) {
  if (locationIds.length === 0) return [];
  
  const query = groq`
    *[_type == "imageWithLocation" && locationId in $locationIds] {
      _id,
      locationId,
      image {
        asset->{ //asset is a reference to the image asset s
          _id,
          url
        },  
        alt,
        crop,
        hotspot
      }
    }
  `;
  
  return client.fetch<Array<{
    _id: string;
    locationId: string;
    image: {
      asset: {
        _id: string;
        url: string;
      };
      alt?: string;
      crop?: any;
      hotspot?: any;
    };
  }>>(query, { locationIds });
}
'use server';

import { createClient } from 'next-sanity';
import { groq } from 'next-sanity';
import { getProductVariantByWineId } from '@/utils/shopify'; 
import { ShopifyWine, WineShort } from '@/types/Wine';

interface CollectionData {
  name: string;
  story: string;
  subtitle: string;
  photo: string;
  alt: string;
  wines: WineShort[];
}




const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  apiVersion: process.env.SANITY_API_VERSION || '',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: false,
};

const client = createClient(clientConfig);

export const fetchCollectionData = async (selectedOption: string): Promise<CollectionData | null> => {
  const collectionMap: Record<'dbc' | 'hermelinda' | 'recuento', string> = {
    "dbc": 'DBC',
    "hermelinda": 'Hermelinda',
    "recuento": 'Recuento',
  };
  const query = groq`
    *[_type == "collection" && name == $name][0]{
      name,
      subtitle,
      story,
      "photo": photo.asset->url,
      "alt": photo.alt,
      "wines": wines[]->{
        name,
        photo {
          asset->{
            _id,
            url
          },
          alt
        },
        "slug": slug.current,
        awards[0] {
          premioOrganization,
          premioYear,
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
      }
    }
  `;
  const key = selectedOption.toLocaleLowerCase() as keyof typeof collectionMap;
  const params = { name: collectionMap[key] };
  try {
    const collectionData = await client.fetch(query, params);
    if (collectionData) {
      // Fetch Shopify data for each wine
      const winesWithShopifyData = await Promise.all(
        collectionData.wines.map(async (wine: any) => {
          const shopifyVariables = await getProductVariantByWineId(wine.slug);
          return { ...wine, shopifyVariables };
        })
      );
      return { ...collectionData, wines: winesWithShopifyData };
    }
    return null;
  } catch (e) {
 
    return null;
  }
};

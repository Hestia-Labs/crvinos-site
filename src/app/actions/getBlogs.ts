'use server';

import { createClient } from 'next-sanity';
import { groq } from 'next-sanity';
import { BlogPost, BlogPostShort } from '@/types/Blog';
import { cache } from 'react';
import imageUrlBuilder  from '@sanity/image-url';



const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  apiVersion: process.env.SANITY_API_VERSION || '2021-10-21',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: false,
};

const client = createClient(clientConfig);

const shortFields = `
  _id,
  title,
  shortDescription,
  publishedDate,
  "slug": slug.current,
  bannerImage {
    asset->{
      _id,
      url
    },
    alt
  },
`;

const longFields = `
  _id,
  title,
  shortDescription,
  content,
  publishedDate,
  tags,
  "slug": slug.current,
  bannerImage {
    asset->{
      _id,
      url
    },
    alt
  },
  author->{
    name,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    social
  }
`;

export async function getBlogs({
  slug = undefined,
  count = undefined,
  shortVersion = false,
  exclude = undefined,
}: {
  slug?: string;
  count?: number;
  shortVersion?: boolean;
  exclude?: string;
}): Promise<BlogPostShort[] | BlogPost[]> {
  const fields = shortVersion ? shortFields : longFields;
  const limit = count ? ` | order(publishedDate desc)[0...${count}]` : '';

  const query = groq`
    *[_type == "blog" ${
      slug ? `&& slug.current == "${slug}"` : ''
    } ${exclude ? `&& slug.current != "${exclude}"` : ''}] {
      ${fields}
    } ${limit}
  `;

  return client.fetch(query, {});
}




export async function urlFor(source: string) {

  const builder = imageUrlBuilder(client)

  return builder.image(source)
}



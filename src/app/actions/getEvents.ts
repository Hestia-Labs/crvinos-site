'use server';

import { createClient } from "@sanity/client";

const clientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
};

const client = createClient(clientConfig);

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

export async function fetchCollectionData(selectedOption: string): Promise<CollectionData | null> {
    const fields = `
        name,
        story,
        "photo": photo.asset->url,
        photo.alt,
        "wines": wines[]->{
          name,
          "photo": photo.asset->url,
          photo.alt,
          slug
        }
    `;

    const query = `
        *[_type == "collection" && name == $selectedOption] {
            ${fields}
        }
    `;

    const params = { selectedOption };
    try {
        return await client.fetch(query, params);
    } catch (error) {
        console.error("Failed to fetch collection data:", error);
        return null;
    }
}

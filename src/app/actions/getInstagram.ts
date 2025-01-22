'use server';

import { createClient } from "@sanity/client";
import { InstagramPost } from "@/types/Instragram";

const clientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
    apiVersion: process.env.SANITY_API_VERSION || '',
    token: process.env.SANITY_API_TOKEN || '',
    useCdn: false,
};

const client = createClient(clientConfig);

interface GetInstagramParams {
    postId?: string;
    count?: number;
}

export async function getInstagramPosts({
    postId = undefined,
    count = undefined,
}: GetInstagramParams): Promise<InstagramPost[]> {
    const fields = `
        _id,
        "image": {
            "asset": {
                "_id": image.asset->_id,
                "url": image.asset->url
            },
            "alt": image.alt
        },
        postUrl,
        caption
    `;

    const limit = count ? ` | order(_createdAt desc)[0...${count}]` : "";

    const query = `
        *[_type == "instagramPost" ${
            !!postId ? `&& _id == "${postId}"` : ""
        }] {
            ${fields}
        } ${limit}
    `;

    return client.fetch(query, {});
}

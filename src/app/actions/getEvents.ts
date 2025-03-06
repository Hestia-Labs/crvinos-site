'use server';

import { createClient } from "@sanity/client";
import { EventShort, Event } from "@/types/Event";




const clientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET   || '',
  apiVersion: process.env.SANITY_API_VERSION  || '',
  token: process.env.SANITY_API_TOKEN   || '',
  useCdn: false,
};

const client = createClient(clientConfig);

interface GetEventsParams {
    eventId?: string;
    count?: number;
    shortVersion?: boolean;
}

export async function getEvents({
    eventId = undefined,
    count = undefined,
    shortVersion = false,
}: GetEventsParams): Promise<EventShort[] | Event[]> {
    const fields = shortVersion
        ? `
            "slug": slug.current,
            title,
            "date": dates.start,
            "endDate": dates.end,
            "time": dates.start,
            "imageUrl": poster.asset->url,
            "description": description
        `
        : `
            _id,
            title,
            "dates": {
                "start": dates.start,
                "end": dates.end
            },
            organizer,
            categories,
            "posterURL": poster.asset->url,
            "posterAlt": poster.alt,
            attendanceCap,
            description,
            article,
            photos,
            link,
            textLocation,
            locationLink,
            "slug": slug.current,
            useRSVPForm,
            contactForRegistration,
            registrationInstructions
        `;

    const limit = count ? ` | order(_createdAt desc)[0...${count}]` : "";

    return client.fetch(
        `
            *[_type == "event" ${
                !!eventId ? `&& slug.current == "${eventId}"` : ""
            }] {
                ${fields}
            } ${limit}
        `
    ,{});
}

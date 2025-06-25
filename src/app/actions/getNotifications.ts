'use server';

import { createClient } from "@sanity/client";
import { NotificationBar, NotificationPop } from "@/types/Notifications";

const clientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
    apiVersion: process.env.SANITY_API_VERSION || '',
    token: process.env.SANITY_API_TOKEN || '',
    useCdn: false,
};

const client = createClient(clientConfig);

export async function getNotificationBars(): Promise<NotificationBar[]> {
    const query = `
        *[_type == "notificationBar" && isActive == true] {
            message,
            link,
            isActive
        }
    `;
    return client.fetch(query, {});
}

export async function getNotificationPops(): Promise<NotificationPop[]> {
    const query = `
        *[_type == "notificationPop" && isActive == true] {
            "banner": {
                "url": banner.asset->url,
                "alt": banner.alt
            },
            title,
            subtitle,
            contentType,
            link,
            "eventReference": select(
                contentType == 'event' => {
                    "_ref": eventReference._ref,
                    "title": eventReference->title,
                    "slug": eventReference->slug,
                    "dates": eventReference->dates,
                    "poster": {
                        "url": eventReference->poster.asset->url
                    }
                }
            ),
            "experienceReference": select(
                contentType == 'experience' => {
                    "_ref": experienceReference._ref,
                    "title": experienceReference->title,
                    "slug": experienceReference->slug,
                    "coverImage": {
                        "url": experienceReference->mainImage.asset->url
                    }
                }
            ),
            buttonText,
            "displayOptions": {
                "frequency": coalesce(displayOptions.frequency, "once"),
                "delay": coalesce(displayOptions.delay, 5)
            },
            isActive
        }
    `;
    return client.fetch(query, {});
}




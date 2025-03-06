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
            link,
            isActive
        }
    `;
    return client.fetch(query, {});
}




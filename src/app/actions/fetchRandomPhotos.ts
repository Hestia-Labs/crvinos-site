'use server';

import { Event } from "@/types/Event";

export const fetchRandomPhotos = async (count: number, query: string): Promise<Event[]> => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&count=${count}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);

        if (!response.ok) {
            throw new Error(`Error fetching photos: ${response}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new TypeError('Expected an array of photos');
        }

        const formattedEvents: Event[] = data.map((photo: any, index: number) => ({
            id: index + 1,
            title: 'POST TITLE',
            date: new Date(photo.created_at).toLocaleDateString(),
            time: new Date(photo.created_at).toLocaleTimeString(),
            imageUrl: photo.urls.regular
        }));

        return formattedEvents;
    } catch (error) {
        console.error('Error fetching photos:', error);
        return [];
    }
};

import { PortableTextBlock } from '@portabletext/types';

export interface EventShort {
    slug: string;
    title: string;
    date: string;
    endDate: string;
    time: string;
    imageUrl: string;
    description: PortableTextBlock[];
}

export interface Event {
    id: number;
    title: string;
    dates: {
        start: string;
        end: string;
    };
    organizer: string;
    categories: string[];
    posterURL: string;
    posterAlt: string;
    attendanceCap: number;
    description: PortableTextBlock[];
    article?: string;
    photos: {
        imageUrl: string;
        alt?: string;
        description?: string;
    }[];
    link: string;
    textLocation: string;
    locationLink?: string;
    slug: string;
    useRSVPForm: boolean;
    contactForRegistration: string;
    registrationInstructions: string;
}



export interface EventShort {
    slug: string;
    title: string;
    date: string;
    endDate: string;
    time: string;
    imageUrl: string;
    description: string;
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
    description: string;
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
}


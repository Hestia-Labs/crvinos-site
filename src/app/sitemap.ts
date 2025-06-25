import { MetadataRoute } from "next";
import { getBlogs } from "@/app/actions/getBlogs";
import { getWines } from "@/app/actions/getWines";
import { getEvents } from "@/app/actions/getEvents";
import { getExperiences } from "@/app/actions/getExperiences";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.SITE_URL || 'https://crvinosmx.com';
    
    // Fetch data in parallel for better performance
    const [blogs, wines, events, experiences] = await Promise.all([
        getBlogs({shortVersion: true}),
        getWines({shortVersion: true}),
        getEvents({ shortVersion: true }),
        getExperiences({ shortVersion: true,  })
    ]);

    // Known collections
    const collections = ['dbc', 'hermelinda', 'recuento'];
    
    // Generate collection entries
    const collectionEntries: MetadataRoute.Sitemap = collections.map((collection) => ({
        url: `${siteUrl}/catalog/${collection}`,
        priority: 0.9,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const
    }));

    // Generate blog entries
    const postEntries: MetadataRoute.Sitemap = blogs.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        priority: 0.8,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const
    }));

    // Generate wine entries
    const wineEntries: MetadataRoute.Sitemap = wines.map((wine) => ({
        url: `${siteUrl}/catalog/${wine.collection.toLowerCase()}/${wine.slug}`,
        priority: 0.8,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const
    }));

    // Generate event entries
    const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
        url: `${siteUrl}/enotourism/events/${event.slug}`,
        priority: 0.8,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const
    }));

    // Generate experience entries
    const experienceEntries: MetadataRoute.Sitemap = experiences.map((experience) => ({
        url: `${siteUrl}/enotourism/experiences/${experience.slug}`,
        priority: 0.8,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const
    }));

    // Static pages with priorities
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${siteUrl}`,
            priority: 1,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const
        },
        {
            url: `${siteUrl}/about`,
            priority: 0.9,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const
        },
        {
            url: `${siteUrl}/restaurant`,
            priority: 0.9,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const
        },
        {
            url: `${siteUrl}/restaurant/menu`,
            priority: 0.9,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const
        },
        {
            url: `${siteUrl}/contact`,
            priority: 0.8,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const
        },
        {
            url: `${siteUrl}/blog`,
            priority: 0.9,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const
        },
        {
            url: `${siteUrl}/catalog`,
            priority: 1,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const
        },
        {
            url: `${siteUrl}/enotourism`,
            priority: 0.9,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const
        },
        {
            url: `${siteUrl}/enotourism/events`,
            priority: 0.9,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const
        },
        {
            url: `${siteUrl}/enotourism/experiences`,
            priority: 0.9,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const
        },
        {
            url: `${siteUrl}/legal`,
            priority: 0.4,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const
        },
        {
            url: `${siteUrl}/privacy`,
            priority: 0.4,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const
        },
        {
            url: `${siteUrl}/terms`,
            priority: 0.4,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const
        }
    ];

    // Combine all entries
    return [
        ...staticPages,
        ...collectionEntries,
        ...postEntries,
        ...wineEntries,
        ...eventEntries,
        ...experienceEntries
    ];
}


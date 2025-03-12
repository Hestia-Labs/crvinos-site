import { MetadataRoute } from "next";
import {getBlogs} from "@/app/actions/getBlogs";
import {getWines} from "@/app/actions/getWines";
import {getEvents} from "@/app/actions/getEvents";
import {getExperiences} from "@/app/actions/getExperiences";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const blogs = await getBlogs({shortVersion: true});
    const wines = await getWines({shortVersion: true});
    const events = await getEvents({ shortVersion: true });
    const experiences = await getExperiences({ shortVersion: true });


    const postEntries : MetadataRoute.Sitemap = blogs.map((post) => ({
        url: `${process.env.SITE_URL}/blog/${post.slug}`,
        priority: 1
    }));

    const wineEntries : MetadataRoute.Sitemap = wines.map((wine) => ({
        url: `${process.env.SITE_URL}/catalog/${wine.collection}/${wine.slug}`,
        priority: 1
    }));

    const eventEntries : MetadataRoute.Sitemap = events.map((event) => ({
        url: `${process.env.SITE_URL}/enotourism/events/${event.slug}`,
        priority: 1
    }));

    const experienceEntries : MetadataRoute.Sitemap = experiences.map((experience) => ({
        url: `${process.env.SITE_URL}/experiences/${experience.slug}`,
        priority: 1
    }));

    return [
        {
            url: `${process.env.SITE_URL}/`,
            priority: 1
        },
        {
            url: `${process.env.SITE_URL}/about`,
            priority: 1
        },
        {
            url: `${process.env.SITE_URL}/restaurant`,
            priority: 1
        },
        {
            url: `${process.env.SITE_URL}/restaurant/menu`,
            priority: 1
        },
        {
            url: `${process.env.SITE_URL}/contact`,
            priority: 1
        },
        {
            url: `${process.env.SITE_URL}/blog`,
            priority: 1
        },
        {
            url: `${process.env.SITE_URL}/catalog`,
            priority: 1
        },
        {
            url: `${process.env.SITE_URL}/enotourism`,
            priority: 1
        },
        {
            url: `${process.env.SITE_URL}/enotourism/events`,
            priority: 1
        },
        {
            url: `${process.env.SITE_URL}/experiences`,
            priority: 1
        },
        {
            url: `${process.env.SITE_URL}/legal`,
            priority: 0.4
        },
        {
            url: `${process.env.SITE_URL}/privacy`,
            priority: 0.4
        },
        {
            url: `${process.env.SITE_URL}/terms`,
            priority: 0.4
        },
        ...postEntries,
        ...wineEntries,
        ...eventEntries,
        ...experienceEntries
    ]
}



import { MetadataRoute } from "next";
import {getBlogs} from "@/app/actions/getBlogs";
import {getWines} from "@/app/actions/getWines";
import {getEvents} from "@/app/actions/getEvents";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const blogs = await getBlogs({shortVersion: true});
    const wines = await getWines({shortVersion: true});
    const events = await getEvents({ shortVersion: true })


    const postEntries : MetadataRoute.Sitemap = blogs.map((post) => ({
        url: `${process.env.SITE_URL}/blog/${post.slug}`,
        priority: 0.6
    }));

    const wineEntries : MetadataRoute.Sitemap = wines.map((wine) => ({
        url: `${process.env.SITE_URL}/catalog/${wine.collection}/${wine.slug}`,
        priority: 1
    }));

    const eventEntries : MetadataRoute.Sitemap = events.map((event) => ({
        url: `${process.env.SITE_URL}/events/${event.slug}`
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
            url: `${process.env.SITE_URL}/contact`,
            priority: 1
        },
        {
            url: `${process.env.SITE_URL}/blog`,
            priority: 0.6
        },
        {
            url: `${process.env.SITE_URL}/catalog`,
            priority: 1
        },
        {
            url: `${process.env.SITE_URL}/enoturism`,
            priority: 0.7
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
        ...eventEntries
    ]
}


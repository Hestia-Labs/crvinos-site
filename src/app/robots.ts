import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    // Use SITE_URL environment variable or default to production URL
    const baseUrl = process.env.SITE_URL || 'https://crvinosmx.com';
    
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api/', '/(studio)']
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl
    }
}

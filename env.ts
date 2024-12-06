import {z} from 'zod';

const envSchema = z.object({
    COMPANY_NAME: z.string(),
    TWITTER_CREATOR: z.string(),
    TWITTER_SITE: z.string(),
    SITE_NAME: z.string(),
    SHOPIFY_REVALIDATION_SECRET: z.string(),
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string(),
    SHOPIFY_STORE_DOMAIN: z.string(),
    MUX_TOKEN_ID: z.string(),
    MUX_TOKEN_SECRET: z.string(),
    PUBLIC_BASE_PATH: z.string(),
    INSTAGRAM_ACCESS_TOKEN: z.string(),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
    NEXT_PUBLIC_SANITY_DATASET: z.string(),
    SANITY_API_VERSION: z.string(),
    SANITY_API_TOKEN: z.string(),
    RESEND_API_KEY: z.string(),
    ADMIN_EMAIL: z.string(),
    SITE_URL: z.string(),
    GOOGLE_ANALYTICS: z.string(),
});

envSchema.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {
            
        }
    }
}

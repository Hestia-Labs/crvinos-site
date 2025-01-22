export const clientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
    apiVersion: process.env.SANITY_API_VERSION || '2021-10-21',
    token: process.env.SANITY_API_TOKEN || '',
    useCdn: false,
};
  
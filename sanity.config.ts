import { defineConfig } from "sanity";
import { structureTool } from 'sanity/structure';
import schemas from "./sanity/schemas";
import { visionTool } from '@sanity/vision';

const config = defineConfig({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
    title: "CRVinos Admin",
    apiVersion: process.env.SANITY_API_VERSION || '2024-03-29',
    useCdn: false,
    basePath: "/admin",
    plugins: [
        structureTool(),
        visionTool(),
    ],
    schema: {
        types: schemas
    }
});

export default config;

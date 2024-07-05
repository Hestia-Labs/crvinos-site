import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: "sqlite",
    schema: "./src/db/schema.ts",
    out: "./src/db",
    dbCredentials: {
        //@ts-ignore
        dbName: "crvdb",
        wranglerConfigPath: ".",
        url: "file:.wrangler/state/v3/d1/miniflare-D1DatabaseObject/44899e6eea525725e04a41e4eade1093dd3727eb5f047bd0e4c7146696919a00.sqlite",
    },
});
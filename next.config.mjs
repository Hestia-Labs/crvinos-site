import { withNextVideo } from "next-video/process";
import createNextIntlPlugin from 'next-intl/plugin';
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  experimental: {
    taint: true,
    // SEO and edge runtime optimizations
    serverComponentsExternalPackages: [], // Add any packages that need Node.js features
    optimizePackageImports: ['framer-motion'], // Optimize large packages
  },
  // Increase the timeout for static generation to prevent 5xx errors during crawling
  staticPageGenerationTimeout: 180,
  // Add custom headers for SEO and crawler optimization
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ],
      },
      // Special headers for bots
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow'
          }
        ]
      }
    ]
  }
};

const combinedConfig = async (config) =>{ return await withNextVideo(withNextIntl(config))};

export default combinedConfig(nextConfig);

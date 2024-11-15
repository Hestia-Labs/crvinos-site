import React from 'react';
import type { Metadata } from 'next';
import Blog from '@/components/Part/Blog';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Blog | CR Vinos MX",
  description: "Explora nuestro blog en CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CR Vinos MX', 'blog', 'artículos de vino', 'empresa mexicana'],
  openGraph: {
    title: "CR Vinos MX | Blog",
    description: "Explora nuestro blog en CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
    url: `${siteUrl}/blog`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/blogPreview.png`,
        width: 800,
        height: 600,
        alt: "CR Vinos MX",
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CR Vinos MX | Blog',
    description: 'Explora nuestro blog en CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.',
    images: [`${siteUrl}/img/blogPreview.png`],
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
    languages: {
      'es-ES': `${siteUrl}/blog`,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
  appleWebApp: {
    title: 'CR Vinos MX',
    statusBarStyle: 'black-translucent',
  },
};

const BlogPage: React.FC = () => {
  return (
    <Blog/>
  );
};

export default BlogPage;

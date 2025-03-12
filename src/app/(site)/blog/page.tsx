import React from 'react';
import type { Metadata } from 'next';
import BlogClient from '@/components/Part/Blog';
import { getBlogs } from '@/app/actions/getBlogs';
import { BlogPostShort } from '@/types/Blog';
import Navbar from '@/components/Navbar';
import Icon from '@/components/Icons';

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
        url: `${siteUrl}/img/crvinosmxLogo.jpg`,
        width: 300,
        height: 225,
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
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
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
  robots: {
    index: true, 
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    
  },
};

export default async function BlogPage() {
  const posts = await getBlogs({ shortVersion: true }) as BlogPostShort[];
  const categories = ['Todos']; // Add actual categories if needed

  return (
    <div className='flex flex-col'>
      <div className='relative w-full -z-10'>
        <Icon name='ContactVines' className='absolute h-80 w-full md:h-160 opacity-40' />
      </div>
      <Navbar clearBg redLogo red relative />
      <BlogClient initialPosts={posts} categories={categories} />
      <div className='absolute -bottom-80 right-0 -z-10'>
        <Icon name='VineLeaf' className='h-80 w-full opacity-40' />
      </div>
    </div>
  );
}



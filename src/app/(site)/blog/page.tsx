import React from 'react';
import type { Metadata } from 'next';
import BlogClient from '@/components/Part/Blog';
import { getBlogs } from '@/app/actions/getBlogs';
import { BlogPostShort } from '@/types/Blog';
import Navbar from '@/components/Navbar';
import Icon from '@/components/Icons';


const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Blog de Vino | Cultura Vinícola Mexicana | CR Vinos MX",
  description: "Descubre artículos sobre vinos mexicanos, maridajes, historia vinícola, consejos de cata, tendencias enológicas y eventos en nuestro blog especializado. La mejor guía para amantes del vino en México.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['blog de vino', 'cultura del vino México', 'artículos enológicos', 'maridaje vino y comida', 'consejos cata vinos', 'historia vinícola México', 'vitivinicultura mexicana', 'terroir Querétaro', 'elaboración vino mexicano', 'tendencias vinos mexicanos', 'blog CR Vinos', 'guía de vinos mexicanos', 'cómo catar vino', 'variedades uva mexicanas', 'viñedos en México', 'conservación de vinos', 'noticias sector vinícola', 'eventos enoturísticos', 'vocabulario enológico', 'blog bodega mexicana', 'denominaciones origen México', 'tipos de vino mexicanos', 'novedades industria vinícola', 'curiosidades mundo del vino', 'entrevistas enólogos mexicanos'],
  openGraph: {
    title: "Blog de Vino | Cultura Vinícola Mexicana | CR Vinos MX",
    description: "Descubre artículos sobre vinos mexicanos, maridajes, historia vinícola, consejos de cata, tendencias enológicas y eventos en nuestro blog especializado. La mejor guía para amantes del vino en México.",
    url: `${siteUrl}/blog`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/crvinosmxLogo.jpg`,
        width: 300,
        height: 225,
        alt: "Blog de Vino CR Vinos MX",
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog de Vino | Cultura Vinícola Mexicana | CR Vinos MX',
    description: 'Descubre artículos sobre vinos mexicanos, maridajes, historia vinícola, consejos de cata, tendencias enológicas y eventos en nuestro blog especializado. La mejor guía para amantes del vino en México.',
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
    languages: {
      'es-MX': `${siteUrl}/blog`,
    },
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
      <div className='relative w-full -z-10 opacity-60'>
          <div 
            className='absolute h-80 w-full md:h-160 opacity-30'
            style={{ 
              backgroundImage: 'url(/img/icons/ContactVines.svg)', 
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>
      <Navbar clearBg redLogo red relative />
      <BlogClient initialPosts={posts} categories={categories} />
      <div className='absolute -bottom-80 right-0 -z-10'>
        <Icon name='VineLeaf' className='h-80 w-full opacity-40' />
      </div>
    </div>
  );
}



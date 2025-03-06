import React from 'react';
import type { Metadata } from 'next';

import EnotourismPage from '@/components/Part/Enotourism';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Enoturismo | CR Vinos MX | Vinos de la más alta calidad  ",
  description: "Sumérgete en el mundo del enoturismo con CR Vinos MX. Disfruta de experiencias únicas como catas de vino, recorridos por viñedos y eventos exclusivos que celebran la cultura vinícola mexicana.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CR Vinos MX', 'enoturismo', 'catas de vino', 'visitas a la bodega', 'eventos especiales'],
  openGraph: {
    title: "CR Vinos MX | Vinos de la más alta calidad | Enoturismo",
    description: "Sumérgete en el mundo del enoturismo con CR Vinos MX. Disfruta de experiencias únicas como catas de vino, recorridos por viñedos y eventos exclusivos que celebran la cultura vinícola mexicana.",
    url: `${siteUrl}/enoturism`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/crvinosmxLogo.jpg`,
        width: 300,
        height: 225,
        alt: "CR Vinos MX",
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CR Vinos MX | Vinos de la más alta calidad | Enoturismo',
    description: 'Sumérgete en el mundo del enoturismo con CR Vinos MX. Disfruta de experiencias únicas como catas de vino, recorridos por viñedos y eventos exclusivos que celebran la cultura vinícola mexicana.',
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/enoturism`,
    languages: {
      'es-MX': `${siteUrl}/enoturism`,
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

const enotourism: React.FC = () => {
  return (
    <EnotourismPage />
  );
};

export default enotourism;

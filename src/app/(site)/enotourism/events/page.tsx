import React from 'react';
import type { Metadata } from 'next';
import EventsPage from '@/components/Part/Events';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Eventos Exclusivos | CR Vinos MX",
  description: "Explora los eventos exclusivos de CR Vinos MX, donde la pasión por el vino se encuentra con experiencias inolvidables. Únete a nuestras catas, recorridos y celebraciones únicas.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CR Vinos MX', 'eventos de vino', 'catas exclusivas', 'recorridos de bodega', 'celebraciones vinícolas'],
  openGraph: {
    title: "Eventos Exclusivos | CR Vinos MX",
    description: "Explora los eventos exclusivos de CR Vinos MX, donde la pasión por el vino se encuentra con experiencias inolvidables.",
    url: `${siteUrl}/enotourism/events`,
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
    title: 'Eventos Exclusivos | CR Vinos MX',
    description: 'Explora los eventos exclusivos de CR Vinos MX, donde la pasión por el vino se encuentra con experiencias inolvidables.',
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/enotourism/events`,
    languages: {
      'es-MX': `${siteUrl}/enotourism/events`,
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

const Events: React.FC = () => {
  return (
    <EventsPage />
  );
};

export default Events;

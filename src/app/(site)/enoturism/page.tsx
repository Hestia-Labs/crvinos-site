import React from 'react';
import type { Metadata } from 'next';
import EventsPage from '@/components/Part/Events';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "CRVinosMX | Vinos de la más alta calidad | Enoturismo",
  description: "Descubre los eventos de CRVinosMX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad. Participa en nuestras catas de vino, visitas a la bodega y otros eventos especiales.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CRVinosMX', 'enoturismo', 'catas de vino', 'visitas a la bodega', 'eventos especiales'],
  openGraph: {
    title: "CRVinosMX | Vinos de la más alta calidad | Enoturismo",
    description: "Descubre los eventos de CRVinosMX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad.",
    url: `${siteUrl}/enoturism`,
    siteName: "CRVinosMX",
    images: [
      {
        url: `${siteUrl}/img/enoPreview.png`,
        width: 800,
        height: 600,
        alt: "CRVinosMX",
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRVinosMX | Vinos de la más alta calidad | Enoturismo',
    description: 'Descubre los eventos de CRVinosMX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad.',
    images: [`${siteUrl}/img/enoPreview.png`],
  },
  alternates: {
    canonical: `${siteUrl}/enoturism`,
    languages: {
      'es-ES': `${siteUrl}/enoturism`,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
  appleWebApp: {
    title: 'CRVinosMX',
    statusBarStyle: 'black-translucent',
  },
};

const Enoturism: React.FC = () => {
  return (
    <EventsPage />
  );
};

export default Enoturism;

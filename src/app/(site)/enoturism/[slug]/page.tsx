import React from 'react';
import EventPage from '@/components/Part/Events/Event';
import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const formattedSlug = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `CRVinosMX | Vinos de la más alta calidad | Evento - ${formattedSlug}`,
    description: "Descubre los detalles de nuestros eventos exclusivos en CRVinosMX. Participa en catas de vino, visitas a la bodega y otros eventos especiales.",
    icons: {
      icon: "/favicon.ico",
      apple: "/img/apple-touch-icon.png",
    },
    keywords: ['CRVinosMX', 'evento', 'catas de vino', 'visitas a la bodega', 'eventos especiales'],
    openGraph: {
      title: `CRVinosMX | Vinos de la más alta calidad | Evento - ${formattedSlug}`,
      description: "Descubre los detalles de nuestros eventos exclusivos en CRVinosMX.",
      url: `${siteUrl}/events/${params.slug}`,
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
      title: `CRVinosMX | Vinos de la más alta calidad | Evento - ${formattedSlug}`,
      description: 'Descubre los detalles de nuestros eventos exclusivos en CRVinosMX.',
      images: [`${siteUrl}/img/enoPreview.png`],
    },
    alternates: {
      canonical: `${siteUrl}/events/${params.slug}`,
      languages: {
        'es-ES': `${siteUrl}/events/${params.slug}`,
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
};

const Event: React.FC = () => {
  return (
    <EventPage />
  );
};

export default Event;

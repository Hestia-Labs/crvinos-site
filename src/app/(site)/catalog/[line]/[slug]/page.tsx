import React from 'react';
import CatalogWine from '@/components/Part/Catalog/Wine';
import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const formattedSlug = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `CRVinosMX | Vinos de la más alta calidad | Detalle del Vino - ${formattedSlug}`,
    description: "Descubre los detalles de nuestros vinos de alta calidad en CRVinosMX. Cada vino tiene su propia historia y características únicas.",
    icons: {
      icon: "/favicon.ico",
      apple: "/img/apple-touch-icon.png",
    },
    keywords: ['CRVinosMX', 'vino', 'detalle del vino', 'alta calidad'],
    openGraph: {
      title: `CRVinosMX | Vinos de la más alta calidad | Detalle del Vino - ${formattedSlug}`,
      description: "Descubre los detalles de nuestros vinos de alta calidad en CRVinosMX.",
      url: `${siteUrl}/catalog/${params.slug}`,
      siteName: "CRVinosMX",
      images: [
        {
          url: `${siteUrl}/img/catalogPreview.png`,
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
      title: `CRVinosMX | Vinos de la más alta calidad | Detalle del Vino - ${formattedSlug}`,
      description: 'Descubre los detalles de nuestros vinos de alta calidad en CRVinosMX.',
      images: [`${siteUrl}/img/catalogPreview.png`],
    },
    alternates: {
      canonical: `${siteUrl}/catalog/${params.slug}`,
      languages: {
        'es-ES': `${siteUrl}/catalog/${params.slug}`,
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

const WinePage: React.FC = () => {
  return (
    <CatalogWine />
  );
};

export default WinePage;

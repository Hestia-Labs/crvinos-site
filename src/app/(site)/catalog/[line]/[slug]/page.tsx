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
    title: ` ${formattedSlug.toLocaleUpperCase()} | CR Vinos MX | Vinos de la más alta calidad `,
    description: "Descubre los detalles de nuestros vinos de alta calidad en CR Vinos MX. Cada vino tiene su propia historia y características únicas.",
    icons: {
      icon: "/favicon.ico",
      apple: "/img/apple-touch-icon.png",
    },
    keywords: ['CR Vinos MX', 'vino', 'detalle del vino', 'alta calidad'],
    openGraph: {
      title: `CR Vinos MX | Vinos de la más alta calidad | Detalle del Vino - ${formattedSlug.toLocaleUpperCase()}`,
      description: "Descubre los detalles de nuestros vinos de alta calidad en CR Vinos MX.",
      url: `${siteUrl}/catalog/${params.slug}`,
      siteName: "CR Vinos MX",
      images: [
        {
          url: `${siteUrl}/img/catalogPreview.png`,
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
      title: `CR Vinos MX | Vinos de la más alta calidad | Detalle del Vino - ${formattedSlug}`,
      description: 'Descubre los detalles de nuestros vinos de alta calidad en CR Vinos MX.',
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
      title: 'CR Vinos MX',
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

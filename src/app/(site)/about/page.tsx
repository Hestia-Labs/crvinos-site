import React from 'react';
import AboutPage from '@/components/Part/About';
import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const generateMetadata = (): Metadata => {
  return {
    title: "CRVinosMX | Vinos de la más alta calidad | Sobre Nosotros",
    description: "Conoce más sobre CRVinosMX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad.",
    icons: {
      icon: "/favicon.ico",
      apple: "/img/apple-touch-icon.png",
    },
    keywords: ['CRVinosMX', 'sobre nosotros', 'empresa mexicana', 'vinos de alta calidad'],
    openGraph: {
      title: "CRVinosMX | Vinos de la más alta calidad | Sobre Nosotros",
      description: "Conoce más sobre CRVinosMX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad.",
      url: `${siteUrl}/about`,
      siteName: "CRVinosMX",
      images: [
        {
          url: `${siteUrl}/img/aboutPreview.png`,
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
      title: 'CRVinosMX | Vinos de la más alta calidad | Sobre Nosotros',
      description: 'Conoce más sobre CRVinosMX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad.',
      images: [`${siteUrl}/img/aboutPreview.png`],
    },
    alternates: {
      canonical: `${siteUrl}/about`,
      languages: {
        'es-ES': `${siteUrl}/about`,
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

const About: React.FC = () => {
  return (
    <AboutPage />
  );
};

export default About;

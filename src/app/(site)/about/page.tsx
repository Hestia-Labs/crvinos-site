import React from 'react';
import AboutPage from '@/components/Part/About';
import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const generateMetadata = (): Metadata => {
  return {
    title: " Sobre Nosotros | CR Vinos MX ",
    description: "Conoce más sobre CR Vinos MX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad.",
    icons: {
      icon: "/favicon.ico",
      apple: "/img/apple-touch-icon.png",
    },
    keywords: ['CR Vinos MX', 'sobre nosotros', 'empresa mexicana', 'vinos de alta calidad'],
    openGraph: {
      title: "CR Vinos MX | Vinos de la más alta calidad | Sobre Nosotros",
      description: "Conoce más sobre CR Vinos MX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad.",
      url: `${siteUrl}/about`,
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
      title: 'CR Vinos MX | Vinos de la más alta calidad | Sobre Nosotros',
      description: 'Conoce más sobre CR Vinos MX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad.',
      images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
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
      title: 'CR Vinos MX',
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

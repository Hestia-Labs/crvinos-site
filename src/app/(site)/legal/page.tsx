import React from 'react';
import LegalNotice from '@/components/Part/Legal';
import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: " Aviso Legal | CRVinos| Vinos de Alta Calidad ",
  description: "Lee nuestro aviso legal para entender las condiciones de uso de CRVinos. Este aviso proporciona información sobre los términos legales y las condiciones bajo las cuales operamos.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CRVinos', 'aviso legal', 'condiciones de uso', 'términos legales'],
  openGraph: {
    title: "CRVinos| Vinos de Alta Calidad | Aviso Legal",
    description: "Lee nuestro aviso legal para entender las condiciones de uso de CRVinos.",
    url: `${siteUrl}/legal`,
    siteName: "CRVinos",
    images: [
      {
        url: `${siteUrl}/img/crvinosmxLogo.jpg`,
        width: 300,
        height: 225,
        alt: "CRVinos",
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRVinos| Vinos de Alta Calidad | Aviso Legal',
    description: 'Lee nuestro aviso legal para entender las condiciones de uso de CRVinos.',
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/legal`,
    languages: {
      'es-MX': `${siteUrl}/legal`,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
  appleWebApp: {
    title: 'CRVinos',
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

const LegalNoticePage: React.FC = () => {
  return (
    <div className='relative flex flex-col'>
      <LegalNotice />
    </div>
  );
};

export default LegalNoticePage;

import React from 'react';
import PrivacyPolicy from '@/components/Part/Privacy';
import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Política de Privacidad | CRVinos| Vinos de Alta Calidad",
  description: "Lee nuestra política de privacidad para entender cómo manejamos tu información personal en CRVinos. Esta política describe los tipos de información que recopilamos, cómo la usamos y las medidas que tomamos para proteger tu privacidad.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CRVinos', 'política de privacidad', 'información personal', 'protección de datos'],
  openGraph: {
    title: "CRVinos| Vinos de Alta Calidad | Política de Privacidad",
    description: "Lee nuestra política de privacidad para entender cómo manejamos tu información personal en CRVinos.",
    url: `${siteUrl}/privacy`,
    siteName: "CRVinos",
    images: [
      {
        url: `${siteUrl}/img/priPreview.png`,
        width: 800,
        height: 600,
        alt: "CRVinos",
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRVinos| Vinos de Alta Calidad | Política de Privacidad',
    description: 'Lee nuestra política de privacidad para entender cómo manejamos tu información personal en CRVinos.',
    images: [`${siteUrl}/img/priPreview.png`],
  },
  alternates: {
    canonical: `${siteUrl}/privacy`,
    languages: {
      'es-ES': `${siteUrl}/privacy`,
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

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <PrivacyPolicy />
    </div>
  );
};

export default PrivacyPolicyPage;

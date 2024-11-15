import React from 'react';
import TermsAndConditions from '@/components/Part/Terms';
import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Términos y Condiciones de Uso | CRVinos",
  description: "Lee nuestros términos y condiciones para entender las reglas y regulaciones de uso de CRVinos. Estos términos describen los derechos y responsabilidades tanto de los usuarios como de la empresa.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CRVinos', 'términos y condiciones', 'regulaciones de uso', 'derechos y responsabilidades'],
  openGraph: {
    title: "CRVinos | Términos y Condiciones de Uso",
    description: "Lee nuestros términos y condiciones para entender las reglas y regulaciones de uso de CRVinos.",
    url: `${siteUrl}/terms`,
    siteName: "CRVinos",
    images: [
      {
        url: `${siteUrl}/img/termPreview.png`,
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
    title: 'CRVinos | Términos y Condiciones de Uso',
    description: 'Lee nuestros términos y condiciones para entender las reglas y regulaciones de uso de CRVinos.',
    images: [`${siteUrl}/img/termPreview.png`],
  },
  alternates: {
    canonical: `${siteUrl}/terms`,
    languages: {
      'es-ES': `${siteUrl}/terms`,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
  appleWebApp: {
    title: 'CRVinos',
    statusBarStyle: 'black-translucent',
  },
};

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <TermsAndConditions />
    </div>
  );
};

export default TermsAndConditionsPage;

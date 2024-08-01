import React from 'react';
import type { Metadata } from 'next';
import Contact from '@/components/Part/Contact';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "CRVinosMX | Vinos de la más alta calidad | Contacto",
  description: "Ponte en contacto con CRVinosMX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad. Estamos aquí para responder a tus preguntas y ofrecerte la mejor experiencia.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CRVinosMX', 'contacto', 'vinos de alta calidad', 'empresa mexicana'],
  openGraph: {
    title: "CRVinosMX | Vinos de la más alta calidad | Contacto",
    description: "Ponte en contacto con CRVinosMX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad.",
    url: `${siteUrl}/contact`,
    siteName: "CRVinosMX",
    images: [
      {
        url: `${siteUrl}/img/contactPreview.png`,
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
    title: 'CRVinosMX | Vinos de la más alta calidad | Contacto',
    description: 'Ponte en contacto con CRVinosMX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad.',
    images: [`${siteUrl}/img/contactPreview.png`],
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
    languages: {
      'es-ES': `${siteUrl}/contact`,
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

const ContactPage: React.FC = () => {
  return (
    <Contact />
  );
};

export default ContactPage;

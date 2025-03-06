import React from 'react';
import type { Metadata } from 'next';
import Contact from '@/components/Part/Contact';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: " Contacto | CR Vinos MX | Vinos de la más alta calidad ",
  description: "Ponte en contacto con CR Vinos MX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad. Estamos aquí para responder a tus preguntas y ofrecerte la mejor experiencia.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CR Vinos MX', 'contacto', 'vinos de alta calidad', 'empresa mexicana'],
  openGraph: {
    title: "CR Vinos MX | Vinos de la más alta calidad | Contacto",
    description: "Ponte en contacto con CR Vinos MX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad.",
    url: `${siteUrl}/contact`,
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
    title: 'CR Vinos MX | Vinos de la más alta calidad | Contacto',
    description: 'Ponte en contacto con CR Vinos MX, una empresa 100% mexicana dedicada a ofrecer vinos de la más alta calidad.',
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
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
    title: 'CR Vinos MX',
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

const ContactPage: React.FC = () => {
  return (
    <Contact />
  );
};

export default ContactPage;

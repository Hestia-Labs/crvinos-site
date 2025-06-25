import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import ProfileComponent from '@/components/Part/Account/Profile/ProfileComponent';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Perfil | CR Vinos MX",
  description: "Visualiza y edita tu perfil en CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CR Vinos MX', 'perfil', 'gestión de perfil', 'empresa mexicana'],
  openGraph: {
    title: "CR Vinos MX | Perfil",
    description: "Visualiza y edita tu perfil en CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
    url: `${siteUrl}/account/profile`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/profilePreview.png`,
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
    title: 'CR Vinos MX | Perfil',
    description: 'Visualiza y edita tu perfil en CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.',
    images: [`${siteUrl}/img/profilePreview.png`],
  },
  alternates: {
    canonical: `${siteUrl}/account/profile`,
    languages: {
      'es-ES': `${siteUrl}/account/profile`,
    },
  },
  
  appleWebApp: {
    title: 'CR Vinos MX',
    statusBarStyle: 'black-translucent',
  },
};

const ProfilePage: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <Navbar redLogo red relative/>
      <div className='flex flex-col w-full items-center justify-center space-y-7'>
        <ProfileComponent />
      </div>
    </div>
  );
};

export default ProfilePage;

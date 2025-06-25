import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import LoginComponent from '@/components/Part/Account/Login/LoginComponent';


const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Mi Cuenta | CR Vinos MX  ",
  description: "Gestiona tu cuenta en CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CR Vinos MX', 'mi cuenta', 'gestión de cuenta', 'empresa mexicana'],
  openGraph: {
    title: "CR Vinos MX | Mi Cuenta",
    description: "Gestiona tu cuenta en CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
    url: `${siteUrl}/account`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/accountPreview.png`,
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
    title: 'CR Vinos MX | Mi Cuenta',
    description: 'Gestiona tu cuenta en CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.',
    images: [`${siteUrl}/img/accountPreview.png`],
  },
  alternates: {
    canonical: `${siteUrl}/account`,
    languages: {
      'es-ES': `${siteUrl}/account`,
    },
  },
  
  appleWebApp: {
    title: 'CR Vinos MX',
    statusBarStyle: 'black-translucent',
  },
};

const LoginPage: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <Navbar redLogo red relative/>
      <div className='flex flex-col w-full items-center justify-center space-y-7 py-12'>
        <LoginComponent />
      </div>
    </div>
  );
};

export default LoginPage;

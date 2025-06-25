import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import SignupComponent from '@/components/Part/Account/Signup/SignupComponent';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Registro | CR Vinos MX",
  description: "Regístrate en CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CR Vinos MX', 'registro', 'crear cuenta', 'empresa mexicana'],
  openGraph: {
    title: "CR Vinos MX | Registro",
    description: "Regístrate en CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
    url: `${siteUrl}/account/signup`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/signupPreview.png`,
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
    title: 'CR Vinos MX | Registro',
    description: 'Regístrate en CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.',
    images: [`${siteUrl}/img/signupPreview.png`],
  },
  alternates: {
    canonical: `${siteUrl}/account/signup`,
    languages: {
      'es-ES': `${siteUrl}/account/signup`,
    },
  },
  
  appleWebApp: {
    title: 'CR Vinos MX',
    statusBarStyle: 'black-translucent',
  },
};

const SignupPage: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <Navbar redLogo red relative/>
      <div className='flex flex-col w-full items-center justify-center space-y-7 '>
        <SignupComponent />
      </div>
    </div>
  );
};

export default SignupPage;

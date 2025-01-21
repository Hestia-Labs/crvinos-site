import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Catalog from '@/components/Part/Catalog';
import LoadingScreen from '@/components/Loaders/LoadingScreen';
import { fetchCollectionData } from '@/app/actions/getCollection';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: " Catálogo | CR Vinos MX | Vinos de la más alta calidad ",
  description: "Explora el catálogo de CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CR Vinos MX', 'catálogo', 'vinos de alta calidad', 'empresa mexicana'],
  openGraph: {
    title: "CR Vinos MX | Vinos de la más alta calidad | Catálogo",
    description: "Explora el catálogo de CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
    url: `${siteUrl}/catalog`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/catalogPreview.png`,
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
    title: 'CR Vinos MX | Vinos de la más alta calidad | Catálogo',
    description: 'Explora el catálogo de CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.',
    images: [`${siteUrl}/img/catalogPreview.png`],
  },
  alternates: {
    canonical: `${siteUrl}/catalog`,
    languages: {
      'es-ES': `${siteUrl}/catalog`,
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

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { line?: string };
}) {

  const line = searchParams?.line?.toLowerCase() || 'dbc';

  const collectionData = await fetchCollectionData(line);
  return (
    <div className='flex flex-col'>
      <Navbar darkenBg   />
      <div className='flex flex-col w-full items-center justify-center '>
        {/* <div className='flex flex-col justify-center items-center w-full py-8 px-36'>
          <h2 className="text-4xl text-crred tracking-wide mb-2">Colección de Vinos</h2>
          <p className="text-crred font-extralight italic text-lg text-center">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        </div> */}
        
        {/* <div className='px-20 w-full relative'>
          <div className="w-full h-2 border-crred border-t-2"></div>
        </div> */}
        <LoadingScreen animationDuration={3} displayDuration={1} />
        <Catalog 
          initialSelectedOption={line.toUpperCase()}
          serverCollectionData={collectionData}
        />
      </div>
    </div>
  );
};


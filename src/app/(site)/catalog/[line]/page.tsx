import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Catalog from '@/components/Part/Catalog';
import { fetchCollectionData } from '@/app/actions/getCollection';
import { getCollectionThumbnails } from '@/app/actions/getCollectionImages';
import { notFound } from 'next/navigation';


const siteUrl = process.env.SITE_URL || 'https://crvinosmx.com';
const validLines = ['dbc', 'hermelinda', 'recuento'];

// Add edge runtime configuration
export const runtime = 'edge';

// This helps with SEO and statically generating valid collection routes
export async function generateStaticParams() {
  return validLines.map(line => ({ line }));
}

export const generateMetadata = async ({ params }: { params: { line: string } }): Promise<Metadata> => {
  const { line } = params;
  const normalizedLine = line.toLowerCase();
  
  // Check if the line is valid
  if (!validLines.includes(normalizedLine)) {
    return {
      title: "Catálogo | CR Vinos MX | Vinos de la más alta calidad",
      description: "Explora el catálogo de CR Vinos MX, una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad."
    };
  }
  
  // Get collection data to enhance metadata with proper collection information
  const collectionData = await fetchCollectionData(normalizedLine);
  
  // Normalize line name for display
  const formattedLine = normalizedLine.charAt(0).toUpperCase() + normalizedLine.slice(1);
  
  // Prepare collection description
  const collectionDescription = collectionData 
    ? `Descubre la colección ${formattedLine} de CR Vinos MX: ${collectionData.subtitle || 'vinos mexicanos de la más alta calidad'}.`
    : `Explora la colección ${formattedLine} de CR Vinos MX, una empresa 100% mexicana que ofrece vinos de la más alta calidad.`;
  
  return {
    title: `${normalizedLine === 'Dbc' ? 'DBC' : formattedLine} | CR Vinos MX | Vinos de la más alta calidad`,
    description: collectionDescription,
    icons: {
      icon: "/favicon.ico",
      apple: "/img/apple-touch-icon.png",
    },
    keywords: ['CR Vinos MX', 'catálogo', 'vinos de alta calidad', formattedLine, 'colección'],
    openGraph: {
      title: `${formattedLine} | CR Vinos MX | Vinos de la más alta calidad`,
      description: collectionDescription,
      url: `${siteUrl}/catalog/${normalizedLine}`,
      siteName: "CR Vinos MX",
      images: [
        {
          url: collectionData?.photo || `${siteUrl}/img/crvinosmxLogo.jpg`,
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
      title: `${formattedLine} | CR Vinos MX | Vinos de la más alta calidad`,
      description: collectionDescription,
      images: [collectionData?.photo || `${siteUrl}/img/crvinosmxLogo.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}/catalog/${normalizedLine}`,
      languages: {
        'es-ES': `${siteUrl}/catalog/${normalizedLine}`,
      },
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
};

export default async function LinePage({ params }: { params: { line: string } }) {
  const line = params.line.toLowerCase();
  
  if (!validLines.includes(line)) {
    notFound();
  }

  // Fetch collection data and thumbnails in parallel
  const [collectionData, collectionThumbnails] = await Promise.all([
    fetchCollectionData(line),
    getCollectionThumbnails()
  ]);
  
  return (
    <div className='relative flex flex-col'>
      <Navbar darkenBg />
      <div className='flex flex-col w-full items-center justify-center'>
        <Catalog 
          initialSelectedOption={line.toUpperCase()}
          serverCollectionData={collectionData}
          collectionThumbnails={collectionThumbnails}
        />
      </div>
    </div>
  );
} 
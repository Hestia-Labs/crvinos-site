import Navbar from '@/components/Navbar';
import { useParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { getWines } from '@/app/actions/getWines';
import { Wine } from '@/types/Wine';
import WineDescLoader from '@/components/Loaders/WineDescLoader';
import RecommendationsSection from '@/components/Part/Catalog/Wine/RecommendationsSection';
import Icon from '@/components/Icons';
import WineDetails from '@/components/Part/Catalog/Wine/WineDetails'; // New client component
import WineProfile from '@/components/Part/Catalog/Wine/WineProfile'; // New client component
import BackToCatalogLink from '@/components/Part/Catalog/Wine/Backto'; // New client component
import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const formattedSlug = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: ` ${formattedSlug.toLocaleUpperCase()} | CR Vinos MX | Vinos de la más alta calidad `,
    description: "Descubre los detalles de nuestros vinos de alta calidad en CR Vinos MX. Cada vino tiene su propia historia y características únicas.",
    icons: {
      icon: "/favicon.ico",
      apple: "/img/apple-touch-icon.png",
    },
    keywords: ['CR Vinos MX', 'vino', 'detalle del vino', 'alta calidad'],
    openGraph: {
      title: `CR Vinos MX | Vinos de la más alta calidad | Detalle del Vino - ${formattedSlug.toLocaleUpperCase()}`,
      description: "Descubre los detalles de nuestros vinos de alta calidad en CR Vinos MX.",
      url: `${siteUrl}/catalog/${params.slug}`,
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
      title: `CR Vinos MX | Vinos de la más alta calidad | Detalle del Vino - ${formattedSlug}`,
      description: 'Descubre los detalles de nuestros vinos de alta calidad en CR Vinos MX.',
      images: [`${siteUrl}/img/catalogPreview.png`],
    },
    alternates: {
      canonical: `${siteUrl}/catalog/${params.slug}`,
      languages: {
        'es-ES': `${siteUrl}/catalog/${params.slug}`,
      },
    },
    verification: {
      google: 'google-verification-code',
    },
    appleWebApp: {
      title: 'CR Vinos MX',
      statusBarStyle: 'black-translucent',
    },
  };
};

const WinePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const wines: Wine[] = await getWines({ slug, shortVersion: false }) as Wine[];
  const wine = wines.length > 0 ? wines[0] : null;

  if (!wine) {
    // Handle the case where the wine is not found
    return <div>Wine not found</div>;
  }

  const soldOut = true; // Update this based on your data
  const wineDetails = [
    { title: 'Tipología', description: wine.type },
    { title: 'Origen', description: wine.origin },
    { title: 'Variedad de uva', description: wine.grapeVariety },
    { title: 'Temperatura de servicio', description: wine.temperature },
    { title: 'Porcentaje de alcohol', description: wine.alcoholPercentage },
  ];

  return (
    <div className="flex relative flex-col space-y-9">
      <Navbar relative red redLogo />
      <div className="flex relative w-full h-full px-4 sm:px-10 md:px-20 flex-col space-y-6">
        {/* Back to Catalog Link */}
        <BackToCatalogLink />
        <div className="mt-4 space-y-8 w-full">
          <div className="flex flex-col relative space-y-8 w-full items-center">
            {/* Main Content */}
            <div className="flex flex-col md:flex-row relative w-full py-9 justify-center items-center md:items-start px-4 md:px-12 h-full border-crred border-b-2 space-y-8 md:space-y-0 md:space-x-8">
              {/* Left Column: Wine Image */}
              <div className="flex md:w-1/3 justify-center items-center px-4">
                <Image
                  src={wine.photo.asset.url}
                  alt={wine.photo.alt}
                  priority
                  className="w-auto h-80 md:h-160"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
              {/* Right Column: Wine Info and Actions */}
              <div className="flex flex-col md:w-2/3 justify-start items-start space-y-6 py-5">
                {/* Wine Title and Price */}
                <div className="">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl text-crred italic cormorant-garamond-italic tracking-wide mb-2">
                    {wine.collection + ' ' + wine.name}
                  </h1>
                  {!soldOut && (
                    <p className="text-gray-700 text-lg sm:text-xl md:text-2xl ">$100 MXN</p>
                  )}
                </div>
                {/* Quantity Selector and Add to Cart */}
                <WineDetails wine={wine} soldOut={soldOut} />
                {/* Wine Description */}
                <div className=" ">
                  <p className="text-crred text-lg sm:text-xl md:text-2xl">Descripción</p>
                  <p className="text-gray-700 text-base sm:text-lg md:text-xl mt-4 font-thin">
                    {wine.description ||
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                  </p>
                </div>
                {/* Tabs Section */}
                <WineProfile wine={wine} wineDetails={wineDetails} />
              </div>
            </div>
            <RecommendationsSection collection={wine.collection} exclude={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinePage;

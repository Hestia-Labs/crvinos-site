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
import { getProductVariantByWineId } from '@/utils/shopify';

const siteUrl = process.env.SITE_URL || 'https://crvinosmx.com'; 

export const generateMetadata = async ({ params }: { params: { line: string; slug: string; } }): Promise<Metadata> => {
  
  const formattedSlug = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .slice(0, -1)
    .join(' ');
    const wines: Wine[] = await getWines({ slug:params.slug, shortVersion: false }) as Wine[];
  return {
    title: `${params.line.charAt(0).toUpperCase() + params.line.slice(1)} ${formattedSlug} | CR Vinos MX | Vinos de la más alta calidad `,
    description: "Descubre los detalles de nuestros vinos de alta calidad en CR Vinos MX. Cada vino tiene su propia historia y características únicas.",
    icons: {
      icon: "/favicon.ico",
      apple: "/img/apple-touch-icon.png",
    },
    keywords: ['CR Vinos MX', 'vino', 'detalle del vino', 'alta calidad', params.line, formattedSlug],
    openGraph: {
      title: `${params.line.charAt(0).toUpperCase() + params.line.slice(1)} ${formattedSlug} | CR Vinos MX | Vinos de la más alta calidad `,
      description: "Descubre los detalles de nuestros vinos de alta calidad en CR Vinos MX.",
      url: `${siteUrl}/catalog/${params.slug}`,
      siteName: "CR Vinos MX",
      images: [
        {
          url: `${siteUrl}/img/crvinosmxLogo.jpg`,
          width: 200,
          height: 150,
          alt: "CR Vinos MX",
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${params.line.charAt(0).toUpperCase() + params.line.slice(1)} ${formattedSlug} | CR Vinos MX | Vinos de la más alta calidad `,
      description: 'Descubre los detalles de nuestros vinos de alta calidad en CR Vinos MX.',
      images: [
        {
          url: `${siteUrl}/img/crvinosmxLogo.jpg`,
          width: 200,
          height: 150,
          alt: "CR Vinos MX",
        }
      ],
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

const WineNotFound = () => {
  return (
    <div className="flex flex-col relative space-y-9">
      <Navbar relative red redLogo />
      <div className="flex relative w-full h-full px-4 sm:px-10 md:px-20 flex-col space-y-6">
        <div className="mt-4 space-y-8 w-full">
          <div className="flex flex-col relative space-y-8 w-full items-center">
            <div className="flex flex-col items-center justify-center space-y-6 py-9 px-4 md:px-12 h-full">
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-crred italic cormorant-garamond-italic tracking-wide mb-2">
                Vino no encontrado
              </h1>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl font-thin text-center">
                Lo sentimos, no pudimos encontrar el vino que estás buscando.
              </p>
              <BackToCatalogLink />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WinePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const wines: Wine[] = await getWines({ slug, shortVersion: false }) as Wine[];

  const wine = wines.length > 0 ? wines[0] : null;

  if (!wine) {
    return <WineNotFound />;
  }

  const soldOut = wine.shopifyVariables ? !wine.shopifyVariables.availableForSale : true; 
  
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
        <Icon name="Vines" className="-z-10 absolute -left-10  md:top-10  h-100 w-100 md:h-144 md:w-144 opacity-70"/>
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
                    <p className="text-gray-700 text-lg sm:text-xl md:text-2xl ">${`${wine.shopifyVariables?.price} ${wine.shopifyVariables?.currencyCode}`}</p>
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

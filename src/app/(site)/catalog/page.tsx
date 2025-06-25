import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { fetchCollectionData } from '@/app/actions/getCollection';
import { getCollectionThumbnails } from '@/app/actions/getCollectionImages';
import { getImagesByLocationIds } from '@/app/actions/getImagebyLocation';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icons';
import ScrollAnimationHandler from '@/components/IntersectionObserver';

const siteUrl = process.env.SITE_URL || 'https://crvinosmx.com';

export const metadata: Metadata = {
  title: "Catálogo de Vinos Mexicanos Premium | Colecciones DBC, Hermelinda, Recuento | CR Vinos MX",
  description: "Descubre nuestras colecciones exclusivas de vinos mexicanos premium elaborados en Querétaro: DBC, Hermelinda y Recuento. Vinos 100% mexicanos con carácter único y expresión del terroir local.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['vinos mexicanos premium', 'vinos Querétaro', 'colección DBC', 'colección Hermelinda', 'colección Recuento', 'catálogo vinos mexicanos', 'vinos tintos mexicanos', 'vinos blancos mexicanos', 'vinos rosados mexicanos', 'vinos alta gama México', 'viñedos Querétaro', 'vino mexicano boutique', 'CR Vinos catálogo', 'bodegas mexicanas premium', 'vinos artesanales México', 'terroir Querétaro', 'varietales mexicanos', 'vinos producción limitada', 'enoturismo México', 'comprar vinos mexicanos', 'viñedos mexicanos', 'denominación origen México', 'vinos alta calidad mexicana', 'tienda online vinos México', 'viticultura mexicana'],
  openGraph: {
    title: "Catálogo de Vinos Mexicanos Premium | Colecciones DBC, Hermelinda, Recuento | CR Vinos MX",
    description: "Descubre nuestras colecciones exclusivas de vinos mexicanos premium elaborados en Querétaro: DBC, Hermelinda y Recuento. Vinos 100% mexicanos con carácter único y expresión del terroir local.",
    url: `${siteUrl}/catalog`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/crvinosmxLogo.jpg`,
        width: 300,
        height: 225,
        alt: "Catálogo Vinos Premium CR Vinos MX",
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo de Vinos Mexicanos Premium | Colecciones DBC, Hermelinda, Recuento | CR Vinos MX',
    description: 'Descubre nuestras colecciones exclusivas de vinos mexicanos premium elaborados en Querétaro: DBC, Hermelinda y Recuento. Vinos 100% mexicanos con carácter único y expresión del terroir local.',
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/catalog`,
    languages: {
      'es-MX': `${siteUrl}/catalog`,
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

export default async function CatalogPage() {
  // Fetch data for all collections
  const collections = {
    dbc: await fetchCollectionData('dbc'),
    hermelinda: await fetchCollectionData('hermelinda'),
    recuento: await fetchCollectionData('recuento')
  };
  
  // Get collection thumbnails
  const thumbnails = await getCollectionThumbnails();

  // Get banner image
  const bannerImage = await getImagesByLocationIds(['catalogo-banner']);
  const bannerUrl = bannerImage[0]?.image?.asset?.url || '/img/catalog-hero.jpg';


  return (
    <div className="relative flex flex-col w-full overflow-x-hidden">
      <Navbar darkenBg />
      <ScrollAnimationHandler />
      <div className="flex flex-col w-full items-center justify-center overflow-x-hidden">
        {/* Enhanced Hero Section */}
        <div className="relative w-full  h-[60vh] md:h-[70vh] rounded-bl-3xl rounded-br-3xl overflow-clip">
          <Image 
            src={bannerUrl}
            alt="Catálogo de Vinos CR"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-[60vh] md:h-[70vh] object-cover rounded-bl-3xl rounded-br-3xl"
            priority
            style={{ filter: 'brightness(0.65)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 rounded-bl-3xl rounded-br-3xl"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-12  w-full">

              <h2 className="text-5xl md:text-6xl lg:text-8xl font-semibold italic text-white drop-shadow-md">
                Colecciones
              </h2>
              <div className="w-24 h-0.5 bg-white/70 my-6"></div>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-2xl">
                Descubre nuestros vinos excepcionales, elaborados con pasión y tradición
              </p>

          </div>
        </div>
        
        {/* Refined Description Section */}
        <div className="px-8 sm:px-10 md:px-20 w-full flex flex-col items-center py-12 relative">
          <div className="max-w-4xl text-center">
            <p className="text-lg sm:text-xl md:text-2xl cormorant-garamond italic text-gray-700 leading-relaxed">
              &ldquo;Cada colección representa nuestra dedicación a la viticultura mexicana, 
              con características únicas que reflejan el terroir y la personalidad 
              de nuestros viñedos. Una experiencia sensorial que trasciende fronteras.&rdquo;
            </p>
          </div>
          <div className="absolute right-0 top-0 -z-10">
            <Icon name="VineLeaf" className="h-60 md:h-80 w-full opacity-40 rotate-12" />
          </div>
          <div className="absolute left-0 bottom-0 -z-10">
            <Icon name="VineLeaf" className="h-60 md:h-80 w-full opacity-30 -rotate-12 scale-x-[-1]" />
          </div>
        </div>
        
        {/* Elegant Divider */}
        <div className="px-4 md:px-10 lg:px-20 w-full relative mb-12">
          <div className="max-w-screen-xl mx-auto flex items-center">
            <div className="flex-grow h-0.5 bg-crred/60"></div>
            <div className="px-4">
              <Icon name="InfoVines" className="h-16 w-16 text-crred" />
            </div>
            <div className="flex-grow h-0.5 bg-crred/60"></div>
          </div>
        </div>
        
        {/* Enhanced Collections Overview */}
        <div className="max-w-screen-xl mx-auto px-6 pt-8 pb-24 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {Object.entries(collections).map(([key, collection]) => {
              if (!collection) return null;
              
              const collectionName = key.charAt(0).toUpperCase() + key.slice(1);
              const imageUrl = thumbnails[collectionName] || collection.photo;
              
              // Get a sample of wines for the collection preview
              const featuredWines = collection.wines?.slice(0, 3) || [];
              
              return (
                <Link 
                  href={`/catalog/${key}`}
                  key={key}
                  className="group flex flex-col h-full"
                >
                  <div 
                    className="aspect-[3/4] overflow-hidden relative rounded-xl shadow-lg"
                  >
                    <Image
                      src={imageUrl}
                      alt={`Colección ${collectionName}`}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 peer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
                    
                    {/* Collection name and details */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      <div className="self-end overflow-hidden">
                        <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 md:delay-100 animate-on-scroll">
                          <p className="text-white/90 text-sm">
                            {collection.wines?.length || 0} vinos
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-4xl font-semibold italic text-white mb-2">
                          {collection.name}
                        </h2>
                        
                        {collection.subtitle && (
                          <p className="text-white/80 text-lg mb-4 line-clamp-2">
                            {collection.subtitle}
                          </p>
                        )}
                        
                        {/* Preview of wine bottles in collection */}
                        {featuredWines.length > 0 && (
                          <div className="flex space-x-3 mt-4 overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 delay-100 ease-in-out animate-on-scroll">
                            <div className="w-12 h-0.5 bg-white/70 mt-3 mb-4"></div>
                            <div className="flex space-x-2">
                              {featuredWines.map((wine, index) => (
                                <div 
                                  key={wine.slug} 
                                  className="h-12 w-6 overflow-hidden rounded-sm transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                                  style={{ 
                                    transitionDelay: `${150 + (index * 75)}ms`,
                                    backgroundImage: `url(${wine.photo.asset.url})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                  }}
                                >
                                </div>
                              ))}
                              {collection.wines?.length > 3 && (
                                <div className="h-12 w-6 flex items-center justify-center text-white/80 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all" style={{ transitionDelay: '375ms' }}>
                                  +{collection.wines.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 px-2 flex justify-between items-center">
                    <p className="text-crred cormorant-garamond italic text-xl font-medium flex items-center transform group-hover:translate-x-1 transition-all duration-300">
                      Ver colección
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </p>
                    
                    {/* Subtle indicator */}
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-crred"></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

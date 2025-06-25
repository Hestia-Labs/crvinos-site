// Events.tsx
'use client';

import React from 'react';
import BasicButton from '@/components/Buttons/BasicButton';
import { useRouter } from 'next/navigation';
import SanityImg from '@/components/SanityImg';
import TransitionLink from '@/components/NewTransitionLink';

type ImageProps = {
  _id: string;
  locationId: string;
  image: {
    asset: {
      _id: string;
      url: string;
    };
    crop?: any;
    hotspot?: any;
  };
};

interface EnotourismSectionProps {
  images?: ImageProps[] 
}

const EnotourismHeader = () => (
  <div className="flex flex-col justify-center items-center w-full mb-8">
    <h2 className="text-3xl sm:text-4xl md:text-5xl text-crred font-light tracking-tight mb-2">
      Enoturismo
    </h2>
    <p className="text-crred font-light italic text-lg md:text-xl lg:text-2xl">
      Vive la experiencia completa del vino
    </p>
  </div>
);

const EnotourismSection: React.FC<EnotourismSectionProps> = ({ images = [] }) => {
  const router = useRouter();


  const getImageByLocationId = (locationId: string) => {
    return images.find(img => img.locationId === locationId)?.image;
  };

  
  const enotourismAreas = [
    {
      id: 'experiences',
      title: 'Recorridos y Experiencias',
      description: 'Descubre nuestras experiencias vinícolas cuidadosamente diseñadas para todos los amantes del buen vino.',
      imageId: 'eno-banner',
      link: '/enotourism/experiences'
    },
    {
      id: 'restaurant',
      title: 'Cartinto House',
      description: 'Gastronomía de autor maridada con nuestros vinos emblemáticos en un entorno único.',
      imageId: 'rest-banner',
      link: '/restaurant'
    },
    {
      id: 'events',
      title: 'Eventos Especiales',
      description: 'Descubre nuestras próximas actividades especiales y eventos temáticos en nuestros viñedos.',
      imageId: 'event-banner',
      link: '/enotourism/events'
    }
  ];

  return (
    <div className="w-full border-t-2 border-crred py-16">
      <div className="container mx-auto md:px-24 px-4">
        <EnotourismHeader />
        <div className="md:hidden w-full overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          <div className="flex gap-4 px-4 py-4 snap-x snap-mandatory">
            {enotourismAreas.map((area) => {
              const sanityImage = getImageByLocationId(area.imageId);
              
              return (
                <TransitionLink 
                  key={area.id}
                  href={area.link}
                  className="flex flex-col overflow-hidden rounded-xl shadow-lg border border-crred/20 bg-white 
                           hover:shadow-xl transition-shadow duration-300 w-72 flex-shrink-0 snap-start"
                >
                  <div className="relative h-48 w-full overflow-hidden">

                    <SanityImg
                      source={sanityImage}
                      alt={area.title}
                      width={500}
                      height={300}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    
                  </div>
                  <div className="p-6 flex-grow space-y-4">
                    <h3 className="text-2xl font-medium text-crred cormorant-garamond">
                      {area.title}
                    </h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="text-left">
                      <span className="relative inline-block text-crred text-lg font-medium cursor-pointer group-hover:text-crred/80 transition-colors duration-300">
                        Descubrir Más
                        <span className="absolute -bottom-1 left-0 w-full h-px bg-crred transform origin-left transition-all duration-300 group-hover:scale-x-110 group-hover:translate-x-1"></span>
                      </span>
                    </div>
                  </div>
                </TransitionLink>
              );
            })}
          </div>
        </div>
        
        {/* Desktop Grid - visible only on tablet and larger */}
        <div  className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 ">
          {enotourismAreas.map((area) => {
            const sanityImage = getImageByLocationId(area.imageId);
            
            return (
              <TransitionLink 
                href={area.link}
                key={area.id}
                className="group flex flex-col overflow-hidden rounded-xl shadow-lg border border-crred/20 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  
                  <SanityImg
                    source={sanityImage}
                    alt={area.title}
                    width={500}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  
                </div>
                <div className="p-6 flex-grow space-y-4">
                  <h3 className="text-2xl font-medium text-crred cormorant-garamond">
                    {area.title}
                  </h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    {area.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <div className="text-left">
                    <span className=" underline underline-offset-2 relative inline-flex items-center text-crred text-lg font-medium cursor-pointer group-hover:text-crred/80 transition-colors duration-300">
                      Descubrir Más
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    
                    </span>
                  </div>
                </div>
              </TransitionLink>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <BasicButton
            link="/enotourism"
            variant="transparent"
            sizex="xxlarge"
            className="border border-crred"
          >
            Explorar Enoturismo
          </BasicButton>
        </div>
      </div>
    </div>
  );
};

export default EnotourismSection;
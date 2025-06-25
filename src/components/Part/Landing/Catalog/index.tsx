'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WineShort } from '@/types/Wine';
import BasicButton from '@/components/Buttons/BasicButton';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface CatalogProps {
  wines: WineShort[]; // Data fetched server-side
}

const SkeletonLoader: React.FC = () => (
  <div className="flex items-center justify-center flex-col h-100 cursor-pointer animate-pulse">
    <div className="bg-gray-300 w-full h-full"></div>
  </div>
);

const Catalog: React.FC<CatalogProps> = ({ wines }) => {
  const router = useRouter();

  // If wines is empty or not loaded, you can conditionally show skeletons or handle error states
  const isLoading = !wines || wines.length === 0;

  const handleImageClick = (slug: string) => {
    router.push(`/catalog/${slug.toLocaleLowerCase()}`);
  };

  const handleButtonClick = () => {
    router.push('/catalog');
  };

  return (
    <div id='catalog-section' className="flex flex-col w-full items-center justify-center border-t-2 border-crred py-12 space-y-9">
      <div className='flex flex-col justify-center items-start w-full space-y-2'>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-crred font-light tracking-wide mb-2">
          Nuestras Colecciones
        </h2>
        <div className="w-full md:w-3/4 lg:w-1/3">
          <p className="text-crred font-light italic text-base md:text-lg lg:text-xl">
            Cada botella cuenta una historia única, inspirada en las vidas de personas extraordinarias.
            Descubre las historias y sabores que celebran su legado.
          </p>
        </div>
      </div>

      <div className="w-full">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8 p-4 w-full justify-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : (
          <>
            {/* Scroll hint - only visible on mobile */}
            <div className="flex items-center justify-center mb-3 sm:hidden">
              <p className="text-gray-700  italic flex items-center">
                Desliza para ver más <span className="ml-1">→</span>
              </p>
            </div>
            <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-4 w-full pb-4 snap-x">
              {wines.map((wine, index) => (
                <motion.div
                  key={wine._id}
                  className="flex-shrink-0 flex items-center justify-center flex-col w-[90vw] sm:w-auto h-96 sm:h-80 md:h-96 cursor-pointer snap-center mx-1 sm:mx-0 group"
                  onClick={() => handleImageClick(wine.collection)}
                  whileHover={{ scale: 1.05, transition: { type: 'tween', ease: 'linear' } }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={wine.photo.asset.url}
                      alt={wine.photo.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 768px) 30vw, 25vw"
                      loading="lazy"
                      className="object-contain"
                    />
                  </div>
                  <p className="text-center text-crred mt-2 text-sm font-light sm:hidden">
                    {wine.collection}
                  </p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex w-full justify-center items-center pt-9">
        <BasicButton
          onClick={handleButtonClick}
          variant="transparent"
          sizex="xxlarge"
          className="border border-solid border-crred"
        >
          <p className="lg:text-lg md:text-base sm:text-sm text-sm whitespace-nowrap">
            Explora Nuestros Vinos
          </p>
        </BasicButton>
      </div>
    </div>
  );
};

export default Catalog;

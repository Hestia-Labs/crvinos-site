'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';

import Icon from '@/components/Icons';
import WineItem from './WineItem';
import WineRecLoader from '@/components/Loaders/WineRecLoader';
import { WineShort } from '@/types/Wine';
import CollectionNavigation from './CollectionNavigation';

interface CollectionData {
  name: string;
  photo: string;
  story: string;
  subtitle?: string;
  wines: WineShort[];
}

interface WineCatalogProps {
  initialSelectedOption?: string;       
  serverCollectionData?: CollectionData | null;
  collectionThumbnails?: Record<string, string>;
}

const WineCatalog: React.FC<WineCatalogProps> = ({
  initialSelectedOption = 'DBC',
  serverCollectionData,
  collectionThumbnails = {},
}) => {

  const options = useMemo(() => ['DBC', 'Hermelinda', 'Recuento'], []);

  const router = useRouter();
  const pathname = usePathname();
  
  // Extract the current collection from URL path
  const currentPathCollection = pathname.split('/')[2]?.toLowerCase();
  
  // Initialize selectedOption based on current path or fallback to prop
  const [selectedOption, setSelectedOption] = useState<string>(
    // Find the matching option based on the URL path (case-insensitive)
    options.find(opt => opt.toLowerCase() === currentPathCollection) || 
    initialSelectedOption
  );

  const mainControls = useAnimation();


  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    serverCollectionData || null
  );


  const [loading, setLoading] = useState<boolean>(!serverCollectionData);




  useEffect(() => {
    setCollectionData(serverCollectionData || null);
    setLoading(!serverCollectionData);
  }, [serverCollectionData]);

  // Keep selectedOption in sync with URL path
  useEffect(() => {
    const pathCollection = pathname.split('/')[2]?.toLowerCase();
    if (pathCollection) {
      const matchingOption = options.find(opt => 
        opt.toLowerCase() === pathCollection
      );
      
      if (matchingOption && matchingOption !== selectedOption) {
        setSelectedOption(matchingOption);
      }
    }
  }, [pathname, options, selectedOption]);

  const handleOptionClick = (option: string) => {
    if (selectedOption !== option) {
      setSelectedOption(option);
      
      router.push(`/catalog/${option.toLowerCase()}`);
    }
  };

  const subtitle = collectionData?.subtitle ||  ''
    || 'Disfruta de nuestros vinos excepcionales';

  return (
    <div className="relative space-y-9 w-full" >
      <div
        className="relative "
      >
        {loading ? (
          <div className="w-full h-126 md:h-144 bg-gray-300 animate-pulse"></div>
        ) : (
          <>
            <Image
              src={collectionData?.photo as string}
              alt="Banner Image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-126 md:h-144 object-cover rounded-bl-3xl rounded-br-3xl"
              priority
              style={{ filter: 'brightness(0.6)' }}
            />
            <div className="absolute bottom-0 left-0 text-back p-6 md:p-12 ">
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-semibold italic text-white drop-shadow-md">
                {collectionData?.name || ''}
              </h2>
              <div className="w-24 h-0.5 bg-white/70 my-6"></div>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-2xl">
                {collectionData?.subtitle}
              </p>
            </div>
          </>
        )}
      </div>

     
      {!loading && collectionData?.story && (
        <div className="px-8 sm:px-10 md:px-20 w-full flex flex-col items-center pb-3">
          <div className="max-w-4xl text-center space-y-6 mt-12">
            <p className="text-lg sm:text-xl md:text-xl cormorant-garamond italic text-gray-700 leading-relaxed">
              &ldquo;{collectionData.story}&rdquo;
            </p>
          </div>
          <div className="absolute right-0   -z-10">
            <Icon name="VineLeaf" className="h-60 md:h-80 w-full opacity-40" />
          </div>
        </div>
      )}

      <CollectionNavigation
        selectedOption={selectedOption}
        onSelectOption={handleOptionClick}
        collectionThumbnails={collectionThumbnails}
      />

      {/* Divider */}
      <div className="px-4 md:px-10 lg:px-20 w-full relative">
        <div className="w-full h-1 md:h-2 border-crred border-t-2"></div>
      </div>

      {/* Wines Grid */}
      <div className="relative w-full flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10 px-12 sm:px-12 md:px-8 lg:px-4 justify-center items-center w-full md:w-11/12 lg:w-10/12">
          {loading ? (
            <WineRecLoader />
          ) : (
            collectionData?.wines?.map((wine, index) => (
              <WineItem
                key={wine.slug}
                wine={wine}
                index={index}
                selectedOption={collectionData?.name || ''}
                link={`/catalog/${selectedOption.toLowerCase()}/${encodeURIComponent(wine.slug)}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WineCatalog;

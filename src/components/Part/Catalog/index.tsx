'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';

import Icon from '@/components/Icons';
import WineItem from './WineItem';
import WineRecLoader from '@/components/Loaders/WineRecLoader';
import { WineShort } from '@/types/Wine';

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
}

const WineCatalog: React.FC<WineCatalogProps> = ({
  initialSelectedOption = 'DBC',
  serverCollectionData,
}) => {

  const options = useMemo(() => ['DBC', 'Hermelinda', 'Recuento'], []);


  const [selectedOption, setSelectedOption] = useState<string>(initialSelectedOption);

  const router = useRouter();

  const mainControls = useAnimation();


  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    serverCollectionData || null
  );


  const [loading, setLoading] = useState<boolean>(!serverCollectionData);


 



  useEffect(() => {
    setCollectionData(serverCollectionData || null);
    setLoading(!serverCollectionData);
  }, [serverCollectionData]);


  const handleOptionClick = (option: string) => {
    if (selectedOption !== option) {
      setSelectedOption(option);
      
      router.push(`?line=${option.toLowerCase()}`, { scroll: false });
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
            <div className="absolute bottom-0 left-0 text-back p-6 md:p-12 lg:p-24">
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-semibold italic text-white drop-shadow-md">
                {collectionData?.name || ''}
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-white mt-4 drop-shadow-md max-w-2xl">
                {subtitle}
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


      <div className="flex justify-center py-4 w-full">
        <div className="flex space-x-4">
          {options?.map((option) => (
            <motion.button
              key={option}
              className={clsx(
                'text-sm md:text-base cursor-pointer px-4 py-2 rounded-full border transition-colors duration-200',
                selectedOption === option
                  ? 'bg-crred text-white border-crred'
                  : 'text-crred border-crred hover:bg-crred hover:text-white'
              )}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: selectedOption === option ? 1 : 0.8 }}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>

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

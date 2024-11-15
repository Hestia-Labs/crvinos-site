'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchCollectionData } from '@/app/actions/getCollection';
import Image from 'next/image';
import WineItem from './WineItem';
import WineRecLoader from '@/components/Loaders/WineRecLoader';
import Icon from '@/components/Icons';
import clsx from 'clsx';

interface Wine {
  slug: string;
  photo: string;
  alt: string;
  name: string;
  awards?: {
    premioOrganization: string;
    premioYear: string;
    premioName: string;
    premioImage: {
      asset: {
        url: string;
      };
      alt: string;
    };
    premioLink: string;
  };
}

interface CollectionData {
  name: string;
  photo: string;
  story: string;
  subtitle?: string; 
  wines: Wine[];
}

interface WineCatalogProps {
  initialSelectedOption?: string;
}

const WineCatalog: React.FC<WineCatalogProps> = ({ initialSelectedOption = 'DBC' }) => {
  const options = useMemo(() => ['DBC', 'Hermelinda', 'Recuento'], []);
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const line = searchParams.get('line')?.toLowerCase();

  const [selectedOption, setSelectedOption] = useState<string>(
    options.find(option => option.toLowerCase() === line) || initialSelectedOption
  );

  const [collectionData, setCollectionData] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  const subtitles: { [key: string]: string } = {
    DBC: 'Sumérgete en la elegancia atemporal y sofisticación que define a nuestra prestigiosa colección DBC',
    Hermelinda: 'Un homenaje apasionado al legado perdurable de Hermelinda, capturado en cada copa',
    Recuento: 'Permite que Recuento te lleve a revivir memorias y forjar nuevas historias en cada degustación',
  };
  

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchCollectionData(selectedOption);
      if (isMounted && data) {
        setCollectionData(data);
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [selectedOption]);

  const handleOptionClick = (option: string) => {
    if (selectedOption !== option) {
      router.push(`?line=${option.toLowerCase()}`, { scroll: false });
      setSelectedOption(option);
    }
  };

 
  const subtitle = collectionData?.subtitle || subtitles[collectionData?.name || ''] || 'Disfruta de nuestros vinos excepcionales';

  return (
    <div className="relative space-y-9 w-full" ref={ref}>

      <motion.div
        key={collectionData?.photo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {loading ? (
          <div className="w-full  h-126 md:h-144 bg-gray-300 animate-pulse"></div>
        ) : (
          <>
            <Image
              src={collectionData?.photo as string}
              alt="Banner Image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-126 md:h-144 object-cover"
              priority
              style={{ filter: 'brightness(0.6)' }}
            />
            <div className="absolute bottom-0 left-0 text-back p-6 md:p-12 lg:p-24">
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-semibold cormorant-garamond-semibold-italic text-white drop-shadow-md">
                {collectionData?.name || ''}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-white mt-4 drop-shadow-md max-w-3xl">
                {subtitle}
              </p>
            </div>
          </>
        )}
      </motion.div>

      {/* Collection Description Section */}
      {!loading && collectionData?.story && (
        <div className="px-8 sm:px-10 md:px-20 w-full flex flex-col items-center pb-3">
          <div className="max-w-4xl text-center space-y-6 mt-12">
            <p className="text-lg sm:text-xl md:text-xl cormorant-garamond italic text-gray-700 leading-relaxed">
              &ldquo;{collectionData.story}&rdquo;
            </p>
          </div>
          <div className="absolute   right-0 -z-10">
          <Icon name="VineLeaf" className="h-80 w-full opacity-40 " />
      </div>
        </div>
      )}
       
      {/* Options Selector */}
      <div className="flex justify-center py-4 w-full">
        <div className="flex space-x-4">
          {options?.map(option => (
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

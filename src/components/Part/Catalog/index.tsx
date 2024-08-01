'use client';
import React, { useEffect, useState } from 'react';
import { motion, useAnimate,useAnimation, useInView } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchCollectionData } from '@/app/actions/getCollection';  
import Image from 'next/image';
import WineItem from './WineItem';  
import WineRecLoader from '@/components/Loaders/WineRecLoader';  

interface Wine {
    slug: string;  
    photo: string;
    alt: string;
    name: string;
}

interface CollectionData {
  photo: string;
  story: string;
  wines: Wine[];
}

interface WineCatalogProps {
  initialSelectedOption?: string;
}

const WineCatalog: React.FC<WineCatalogProps> = ({  initialSelectedOption = 'DBC' }) => {
  const [scope, animate] = useAnimate();
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const line = searchParams.get('line')?.toLowerCase();
  const options = ['DBC', 'Hermelinda', 'Recuento'];

  const [selectedOption, setSelectedOption] = useState<string>(() => {
    if (options && options.length > 0) {
      const matchedOption = options.find(option => option.toLowerCase() === line);
      return matchedOption || initialSelectedOption;
    }
    return initialSelectedOption;
  });

  const [collectionData, setCollectionData] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isInView) {
        mainControls.start("visible");
    }
}, [isInView, mainControls]);

  useEffect(() => {
    if (selectedOption) {
      const fetchData = async () => {
        console.log(`Fetching data for ${selectedOption}`);
        const data = await fetchCollectionData(selectedOption);
        console.log(data);
        if (data) {
          setCollectionData(data);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [selectedOption]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    const newUrl = `${window.location.pathname}?line=${option.toLowerCase()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    console.log(`Selected: ${option}`);
  };

  return (
    <div className="relative space-y-9 w-full" ref={scope}>
      <motion.div
        key={collectionData?.photo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {loading ? (
          <div className="w-full h-72 md:h-96 lg:h-144 bg-gray-300 animate-pulse"></div>
        ) : (
          <>
          <div className="flex justify-around pb-1 md:pb-5 w-full">
                  {options?.map((option) => (
                    <motion.h1
                      key={option}
                      className="text-lg md:text-4xl font-bold cursor-pointer p-1 px-2 text-crred italic"
                      initial={{ opacity: 0.4, scale: 1 }}
                      animate={{ opacity: selectedOption === option ? 1 : 0.4,  scale: selectedOption === option ? 1.2 : 0.9 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </motion.h1>
                  ))}
          </div>
            <Image 
              src={collectionData?.photo as string} 
              alt="Banner Image"  
              width={0} 
              height={0} 
              sizes="100vw" 
              className="w-full h-72 md:h-96 lg:h-144 object-cover" 
              priority 
              placeholder="blur" 
              blurDataURL="/img/vinedo.jpg" 
              style={{ filter: 'brightness(0.6)' }}
            />
            
            <div className="absolute top-0 left-0 w-full">
              <div className="text-crred text-center">
                
              </div>
            </div>
            <div className="absolute bottom-0 left-0 text-back p-6 md:p-12 lg:p-24">
                <div className='space-y-4 md:space-y-6'>
                    <h2 className="text-5xl md:text-6xl lg:text-8xl font-semibold cormorant-garamond-semibold-italic">{selectedOption}</h2>
                    <div className='w-full md:w-3/4'>
                        <p className="text-xs md:text-base cormorant-garamond-bold">
                        {collectionData?.story || 'Compartiendo la historia de una persona increíble...'}
                        </p>
                    </div>
                </div>
            </div>
          </>
        )}
      </motion.div>

      <div className='px-4 md:px-10 lg:px-20 w-full relative'>
        <div className="w-full h-1 md:h-2 border-crred border-t-2"></div>
      </div>

      <div className="relative w-full flex justify-center items-center">
        <motion.div 
          ref={ref} 
          initial="hidden"  
          animate={mainControls} 
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }} 
          className='absolute justify-left top-0 left-0 hidden sm:flex flex-col text-crred md:text-base lg:text-lg space-y-1 px-3'
          >
            {options.map(option => (
              <motion.p 
                key={option}
                className="cursor-pointer"
                onClick={() => handleOptionClick(option)}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: selectedOption === option ? 1.2 : 0.6, scale: selectedOption === option ? 1.0 : 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {option}
              </motion.p>
            ))}
          </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10 px-12 sm:px-12 md:px-8 lg:px-4 justify-center items-center w-full md:w-11/12 lg:w-10/12">
        {loading ? (
          <WineRecLoader />  
        ) : (
          <>
            {collectionData?.wines?.map((wine, index) => (
              <WineItem 
                key={wine.slug}
                wine={wine}
                index={index}
                selectedOption={selectedOption}
                link={`/catalog/${selectedOption.toLowerCase()}/${encodeURIComponent(wine.slug)}`}
              />
            ))}
         </>
        )}
         </div>
      </div>
    </div>
  );
};

export default WineCatalog;

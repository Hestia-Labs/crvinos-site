'use client';
import React, { useEffect, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchCollectionData } from '@/app/actions/getCollection';  // Adjust the path as needed
import Image from 'next/image';
import WineItem from './WineItem';  

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

  useEffect(() => {
    if (selectedOption) {
      const fetchData = async () => {
        console.log(`Fetching data for ${selectedOption}`);
        const data = await fetchCollectionData(selectedOption);
        console.log(data);
        if (data) {
          setCollectionData(data);
        }
      };
      fetchData();
    }
  }, [selectedOption]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    router.push(`?line=${option}`);
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
        <Image src={collectionData?.photo as string} alt="Banner Image"  width={0} height={0} sizes="100vw" className="w-full h-144 object-cover" priority />
        <div className="absolute inset-0 bg-back opacity-15"></div>
        <div className="absolute top-0 left-0 w-full">
          <div className=" text-crred text-center ">
            <div className="flex justify-around py-4">
              {options?.map((option) => (
                <motion.h1
                  key={option}
                  className="text-xl font-bold cursor-pointer p-2"
                  initial={{ opacity: 0.6, scale: 1 }}
                  animate={{ opacity: selectedOption === option ? 1 : 0.6, scale: selectedOption === option ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleOptionClick(option)}
                  style={{ 
                    backgroundColor: selectedOption === option ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    borderRadius: '8px'
                  }}
                >
                  {option}
                </motion.h1>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute  bottom-0 left-0  text-back p-24 ">
            <div className='space-y-6'>
                <h2 className="text-8xl font-semibold cormorant-garamond-semibold-italic">{selectedOption}</h2>
                <div className='w-3/4'>
                    <p className="text-sm cormorant-garamond-bold">
                    {collectionData?.story || 'Compartiendo la historia de una persona increíble...'}
                    </p>
                </div>
            </div>
        </div>
      </motion.div>

      <div className='px-20 w-full relative'>
        <div className="w-full h-2 border-crred border-t-2"></div>
      </div>

      <div className="w-full flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4 justify-center items-center w-10/12">
          {collectionData?.wines?.map((wine, index) => (
            <WineItem 
              key={wine.slug}
              wine={wine}
              index={index}
              selectedOption={selectedOption}
              link={`/catalog/${selectedOption.toLowerCase()}/${encodeURIComponent(wine.slug)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WineCatalog;

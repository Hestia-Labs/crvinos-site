'use client';

import Navbar from '@/components/Navbar';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getWines } from '@/app/actions/getWines';
import { Wine } from '@/types/Wine';
import WineDescLoader from '@/components/Loaders/WineDescLoader'; 
import RecommendationsSection from '@/components/Part/Catalog/Wine/RecommendationsSection'; 
import Icon from '@/components/Icons';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const CatalogWine: React.FC = () => {
  const params = useParams<{ line: string, slug: string }>();
  const [wine, setWine] = useState<Wine | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchWine = async () => {
      if (params.slug) {
        setLoading(true);
        try {
          const fetchedWines = await getWines({ slug: params.slug, shortVersion: false }) as Wine[];
          if (fetchedWines.length > 0) {
            setWine(fetchedWines[0]);
          }
        } catch (error) {
          console.error("Error fetching wine data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWine();
  }, [params.slug]);
  

  const wineDetails = wine ? [
    { title: 'Tipología', description: wine.type },
    { title: 'Origen', description: wine.origin },
    { title: 'Variedad de uva', description: wine.grapeVariety },
    { title: 'Vinificación', description: wine.vinification },
    { title: 'Vista', description: wine.appearance },
    { title: 'Nariz', description: wine.nose },
    { title: 'Gusto', description: wine.taste },
    { title: 'Maridaje', description: wine.pairing },
    { title: 'Temperatura de servicio', description: wine.temperature },
    { title: 'Porcentaje', description: wine.alcoholPercentage }
  ] : [];

  const halfWineDetails = wineDetails.slice(0, Math.ceil(wineDetails.length / 2));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowFullDescription(true);
      } else {
        setShowFullDescription(false);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex relative flex-col space-y-9'>
      <Navbar relative red />
      <div className='flex relative w-full h-full  px-4 sm:px-10 md:px-20 flex-col space-y-6'>
        <div onClick={()=>{router.push("/catalog")}} className='flex items-center space-x-4 transition duration-500 ease-in-out transform hover:-translate-x-2 cursor-pointer'>
          <Icon name='Arrow' className="h-5 w-5 transition-transform duration-500 ease-in-out transform hover:translate-x-2" style={{ transform: 'rotate(180deg)' }} />
          <p className="font-cormorant text-crred transition-colors duration-500 ease-in-out hover:text-crred-light">Regresar al Catalogo</p>
        </div>
        {loading ? (
          <WineDescLoader />
        ) : (
          <div className='mt-8 space-y-8'>
            <div className='border-crred border-b-2 w-full'>
              <h1 className='text-2xl sm:text-2xl md:text-3xl lg:text-5xl text-crred cormorant-garamond-semibold-italic tracking-wide mb-2'>{wine?.collection + " " + wine?.name}</h1>
            </div>
            <div className='flex flex-col relative space-y-8'>
              <div className='flex flex-col md:flex-row-reverse relative w-full py-9 justify-between items-center px-5 h-full border-crred border-b-2'>
                <div className='w-full md:w-1/3 flex justify-center items-center mb-8 md:mb-0'>
                  <Image src={wine?.photo.asset.url as string} alt={wine?.photo.alt as string} priority className='h-72 sm:h-72 md:h-96 lg:h-160 w-auto' width={0} height={0} sizes="100vw" />
                </div>
                <div className='w-full md:w-1/2 justify-start items-center space-y-4 sm:space-y-4 md:space-y-8'>
                  {(showFullDescription ? wineDetails : halfWineDetails).map((detail, index) => (
                    <div key={index} className='flex w-full relative justify-start items-start md:items-center space-x-12 sm:space-x-12 md:space-x-16'>
                      <div className='text-crred text-start cormorant-garamond-semibold w-1/3 text-sm md:text-base lg:text-lg'>
                        {detail.title}
                      </div>
                      <div className='text-crred text-wrap text-left w-3/4 text-sm md:text-base lg:text-lg'>
                        {detail.description}
                      </div>
                    </div>
                  ))}
                  <div className='block md:hidden'>
                    {!showFullDescription ? (
                      <motion.button 
                        className='text-crred text-sm underline'
                        onClick={() => setShowFullDescription(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Ver más
                      </motion.button>
                    ) : (
                      <motion.button 
                        className='text-crred text-sm underline'
                        onClick={() => setShowFullDescription(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Ver menos
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <RecommendationsSection collection={wine?.collection} exclude={params.slug} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogWine;

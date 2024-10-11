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
import clsx from 'clsx';
import BasicButton from '@/components/Buttons/BasicButton';
import { toast } from 'sonner';

const CatalogWine: React.FC = () => {
  const params = useParams<{ line: string, slug: string }>();
  const [wine, setWine] = useState<Wine | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1); // State to manage wine quantity
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

  const handleAddToCart = ({ producto }: { producto: string }): void => {
    console.log(`Se ha añadido ${producto} al carrito`);
    toast.success(`Se ha añadido ${producto} al carrito`);
  };
  return (
    <div className='flex relative flex-col space-y-9'>
      <Navbar relative red redLogo />
      <div className='flex relative w-full h-full  px-4 sm:px-10 md:px-20 flex-col space-y-6'>
        <div onClick={()=>{router.push("/catalog")}} className='flex items-center space-x-4 transition duration-500 ease-in-out transform hover:-translate-x-2 cursor-pointer'>
          <Icon name='Arrow' className="h-5 w-5 transition-transform duration-500 ease-in-out transform hover:translate-x-2" style={{ transform: 'rotate(180deg)' }} />
          <p className="font-cormorant text-crred transition-colors duration-500 ease-in-out hover:text-crred-light">Regresar al Catalogo</p>
        </div>
        {loading ? (
          <WineDescLoader />
        ) : (
          <div className='mt-8 space-y-8 w-full'>
            <div className='flex flex-col relative space-y-8 w-full items-center'>
              <div className='flex flex-col md:flex-row relative w-full py-9 justify-between items-center px-12 h-full border-crred border-b-2 space-y-8 md:space-y-0 md:space-x-8'>
                <div className='flex md:w-1/3  justify-center items-center mb-8 md:mb-0 p-8 px-12'>
                  <Image src={wine?.photo.asset.url as string} alt={wine?.photo.alt as string} priority className='h-72 sm:h-72 md:h-144  w-auto border border-crred p-5' width={0} height={0} sizes="100vw" />
                </div>
                <div className='flex flex-col md:w-4/6 justify-start items-start space-y-4 sm:space-y-4 md:space-y-10 py-5 '>
                  <div className=''>
                    <h1 className='text-2xl sm:text-2xl md:text-3xl lg:text-5xl text-crred italic cormorant-garamond-italic tracking-wide mb-2'>{wine?.collection + " " + wine?.name}</h1>
                    <p className='text-crred text-lg sm:text-xl md:text-2xl '>$100 MXN</p>
                  </div>
                  <div className='w-full flex flex-col ' >
                    <div className=' flex flex-col w-full items-start space-y-5 border-b border-crred  pb-7'>
                      <div className='flex justify-center'>
                        <div className='w-30 flex flex-row justify-between rounded-full border-crred border px-3 text-crred'>
                          <button 
                            className={clsx('hover:text-crred-50', {
                              'cursor-not-allowed opacity-50': quantity === 1,
                              'hover:scale-105': quantity > 1
                            })}
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            disabled={quantity === 1}
                          >
                            -
                          </button>
                          {quantity}
                          <button 
                            className='hover:text-crred-50 hover:scale-105'
                            onClick={() => setQuantity(prev => prev + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <BasicButton 
                        variant="bg-crred" 
                        sizex="large" 
                        sizey="medium" 
                        className="w-96 border border-crred"
                        onClick={() => handleAddToCart({ producto:wine?.collection + " " + wine?.name })}
                      >
                        Add to Cart
                      </BasicButton>
                    </div>
                  </div>
                  <div>
                    <p className='text-crred  text-lg sm:text-xl md:text-3xl'>Detalles del Vino</p>
                    <p className='text-crred text-base sm:text-lg md:text-xl mt-4 font-thin'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit.consectetur adipiscing elit. consectetur adipiscing elit.consectetur adipiscing elit.consectetur adipiscing elit. consectetur adipiscing elit.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
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
            <RecommendationsSection collection={wine?.collection} exclude={params.slug} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogWine;

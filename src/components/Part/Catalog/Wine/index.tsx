'use client';

import Navbar from '@/components/Navbar';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getWines } from '@/app/actions/getWines';
import { Wine } from '@/types/Wine';
import WineDescLoader from '@/components/Loaders/WineDescLoader';
import RecommendationsSection from '@/components/Part/Catalog/Wine/RecommendationsSection';
import Icon from '@/components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import BasicButton from '@/components/Buttons/BasicButton';
import { useCart } from '@/contexts/CartContext';
import { useDrawer } from '@/contexts/DrawerContext';

const CatalogWine: React.FC = () => {
  const params = useParams<{ line: string; slug: string }>();
  const [wine, setWine] = useState<Wine | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [soldOut, setSoldOut] = useState<boolean>(true); // Set to true for now
  const router = useRouter();
  const { addToCart } = useCart();
  const { openDrawer } = useDrawer();

  useEffect(() => {
    const fetchWine = async () => {
      if (params.slug) {
        setLoading(true);
        try {
          const fetchedWines = (await getWines({ slug: params.slug, shortVersion: false })) as Wine[];
          if (fetchedWines.length > 0) {
            setWine(fetchedWines[0]);

            if (fetchedWines[0].profile && fetchedWines[0].profile.length > 0) {
              setActiveTab('profile');
            } else {
              setActiveTab('details');
            }
          }
        } catch (error) {
          console.error('Error fetching wine data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWine();
  }, [params.slug]);

  const wineDetails = wine
    ? [
        { title: 'Tipología', description: wine.type },
        { title: 'Origen', description: wine.origin },
        { title: 'Variedad de uva', description: wine.grapeVariety },
        { title: 'Temperatura de servicio', description: wine.temperature },
        { title: 'Porcentaje de alcohol', description: wine.alcoholPercentage },
      ]
    : [];

  const handleAddToCart = (): void => {
    if (!wine || soldOut) return;
    addToCart({
      id: wine.slug,
      name: `${wine.collection} ${wine.name}`,
      price: 100,
      quantity: quantity,
      image: wine.photo.asset.url,
      shopifyVariantId: wine.shopifyVariables?.shopifyVariantId ? wine.shopifyVariables?.shopifyVariantId : '',
    });
    setTimeout(() => openDrawer('cart'), 400);
  };

  return (
    <div className='flex relative flex-col space-y-9'>
      <Navbar relative red redLogo />
      <div className='flex relative w-full h-full px-4 sm:px-10 md:px-20 flex-col space-y-6'>
        {/* Back to Catalog Link */}
        <div
          onClick={() => {
            router.push('/catalog');
          }}
          className='flex items-center space-x-4 transition duration-500 ease-in-out transform hover:-translate-x-2 cursor-pointer mt-4'
        >
          <Icon
            name='Arrow'
            className='h-5 w-5 transition-transform duration-500 ease-in-out transform hover:translate-x-2'
            style={{ transform: 'rotate(180deg)' }}
          />
          <p className=' text-crred transition-colors duration-500 ease-in-out hover:text-crred-light'>
            Regresar al Catálogo
          </p>
        </div>
        {loading ? (
          <WineDescLoader />
        ) : (
          <div className='mt-4 space-y-8 w-full'>
            <div className='flex flex-col relative space-y-8 w-full items-center'>
              {/* Main Content */}
              <div className='flex flex-col md:flex-row relative w-full py-9 justify-center items-center md:items-start px-4 md:px-12 h-full border-crred border-b-2 space-y-8 md:space-y-0 md:space-x-8'>
                {/* Left Column: Wine Image */}
                
                <div className='flex md:w-1/3 justify-center items-center px-4'>
                  <Image
                    src={wine?.photo.asset.url as string}
                    alt={wine?.photo.alt as string}
                    priority
                    className='w-auto h-80 md:h-160'
                    width={0}
                    height={0}
                    sizes='100vw'
                  />
                </div>
                {/* Right Column: Wine Info and Actions */}
                <div className='flex flex-col md:w-2/3 justify-start items-start space-y-6 py-5'>
                  {/* Wine Title and Price */}
                  <div className=''>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl text-crred italic cormorant-garamond-italic tracking-wide mb-2'>
                      {wine?.collection + ' ' + wine?.name}
                    </h1>
                    {!soldOut && (
                      <p className='text-gray-700 text-lg sm:text-xl md:text-2xl '>$100 MXN</p>
                    )}
                  </div>
                  {/* Quantity Selector and Add to Cart */}
                  
                  <div className='w-full flex flex-col'>
                    <div className='flex flex-col w-full items-start space-y-5 border-b border-crred pb-7'>
                      <div className='flex flex-row items-center space-x-4'>
                        <div className='w-36 text-2xl md:text-xl py-1 flex flex-row justify-between rounded-full border-crred border px-3 text-gray-700'>
                          <button
                            className={clsx('hover:text-crred-50', {
                              'cursor-not-allowed opacity-50': quantity === 1 || soldOut,
                              'hover:scale-105': quantity > 1 && !soldOut,
                            })}
                            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                            disabled={quantity === 1 || soldOut}
                          >
                            -
                          </button>
                          {quantity}
                          <button
                            className={clsx('hover:text-crred-50 hover:scale-105', {
                              'cursor-not-allowed opacity-50': soldOut,
                            })}
                            onClick={() => setQuantity((prev) => prev + 1)}
                            disabled={soldOut}
                          >
                            +
                          </button>
                        </div>
                        <BasicButton
                          variant={soldOut ? 'transparent' : 'bg-crred'}
                          sizex='medium'
                          sizey='small'
                          className={clsx('border border-crred', {
                            'cursor-not-allowed opacity-50': soldOut,
                          })}
                          onClick={() => handleAddToCart()}
                          disabled={soldOut}
                        >
                          {soldOut ? 'Agotado' : 'Añadir al Carrito'}
                        </BasicButton>
                      </div>
                    </div>
                  </div>
                  {/* Wine Description */}
                  <div className=' '>
                    <p className='text-crred text-lg sm:text-xl md:text-2xl'>Descripción</p>
                    <p className='text-gray-700 text-base sm:text-lg md:text-xl mt-4 font-thin'>
                      {wine?.description ||
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                    </p>
                  </div>
                  {/* Tabs Section */}
                  <div className='w-full'>
                    {/* Tabs Header */}
                    <div className='flex border-b border-crred'>
                      {wine?.profile && wine.profile.length > 0 && (
                        <button
                          className={clsx(
                            'text-crred py-2 px-4 -mb-px font-semibold',
                            activeTab === 'profile' ? 'border-b-2 border-crred' : 'opacity-50'
                          )}
                          onClick={() => setActiveTab('profile')}
                        >
                          Perfil y Sabores
                        </button>
                      )}
                      <button
                        className={clsx(
                          'text-crred py-2 px-4 -mb-px font-semibold',
                          activeTab === 'details' ? 'border-b-2 border-crred' : 'opacity-50'
                        )}
                        onClick={() => setActiveTab('details')}
                      >
                        Detalles del Vino
                      </button>
                    </div>
                    {/* Tabs Content */}
                    <div className='py-6'>
                      <AnimatePresence mode='wait'>
                        {activeTab === 'details' && (
                          <motion.div
                            key='details'
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: 'hidden' }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Details Content */}
                            {wineDetails.length > 0 ? (
                              wineDetails.map((detail, index) => (
                                <div key={index} className='flex w-full justify-start items-start space-x-2 mb-2'>
                                  <div className='text-crred font-semibold w-1/3 text-sm md:text-base'>
                                    {detail.title}:
                                  </div>
                                  <div className='text-gray-700 w-2/3 text-sm md:text-base'>
                                    {detail.description}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className='text-crred text-base'>No hay detalles disponibles.</p>
                            )}
                          </motion.div>
                        )}
                        {activeTab === 'profile' && wine?.profile && wine.profile.length > 0 && (
                          <motion.div
                            key='profile'
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: 'hidden' }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Profile Content */}
                            <div className='w-3/4'>
                              <div className='grid grid-cols-3 md:grid-cols-5 gap-2'>
                                {wine.profile.map((profileItem, index) => (
                                  <div key={index} className='flex flex-col items-center space-y-2'>
                                    <div className='flex flex-col items-center'>
                                      <Image
                                        src={profileItem.image.asset.url}
                                        alt={profileItem.image.alt}
                                        width={100}
                                        height={100}
                                        quality={100}
                                        className='w-auto h-16 p-2'
                                      />
                                      <p className='text-crred text-sm md:text-base text-center'>
                                        {profileItem.name}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
              <RecommendationsSection collection={wine?.collection} exclude={params.slug} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogWine;

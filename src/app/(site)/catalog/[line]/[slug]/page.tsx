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

export default function CatalogWine() {
  const params = useParams<{ line: string, slug: string }>();
  const [wine, setWine] = useState<Wine | null>(null);
  const [recommendations, setRecommendations] = useState<Wine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchWineAndRecommendations = async () => {
      if (params.slug) {
        setLoading(true);
        const [fetchedWines, fetchedRecommendations] = await Promise.all([
          getWines({ slug: params.slug, shortVersion: false }) as Promise<Wine[]>,
          getWines({ exclude: params.slug, count: 3, shortVersion: true }) as Promise<Wine[]>
        ]);

        if (fetchedWines.length > 0) {
          setWine(fetchedWines[0]);
        }
        setRecommendations(fetchedRecommendations);
        setLoading(false);
      }
    };
    fetchWineAndRecommendations();
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

  return (
    <div className='flex relative flex-col space-y-9'>
      <Navbar relative red />
      <div className='flex relative w-full h-full px-20 flex-col space-y-6'>
        <div onClick={()=>{router.push("/catalog")}} className='flex items-center space-x-4 transition duration-500 ease-in-out transform hover:-translate-x-2 cursor-pointer'>
          <Icon name='Arrow' className="h-5 w-5 transition-transform duration-500 ease-in-out transform hover:translate-x-2" style={{ transform: 'rotate(180deg)' }} />
          <p className="font-cormorant text-crred transition-colors duration-500 ease-in-out hover:text-crred-light">Regresar al Catalogo</p>
        </div>
        {loading ? (
          <WineDescLoader />
        ) : (
          <div className='mt-8 space-y-8'>
            <div className='border-crred border-b-2 w-full'>
              <h1 className='text-4xl text-crred cormorant-garamond-semibold-italic tracking-wide mb-2'>{wine?.collection + " " + wine?.name}</h1>
            </div>
            <div className='flex flex-col relative space-y-8'>
              <div className='flex relative w-full py-9 justify-between items-center px-5 h-full border-crred border-b-2'>
                <div className='w-1/2 justify-start items-center space-y-8'>
                  {wineDetails.map((detail, index) => (
                    <div key={index} className='flex w-full relative justify-start items-center space-x-16'>
                      <div className='text-crred cormorant-garamond-semibold w-1/3'>
                        {detail.title}
                      </div>
                      <div className='text-crred text-wrap text-left w-3/4'>
                        {detail.description}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='w-1/3 flex justify-center items-center'>
                  <Image src={wine?.photo.asset.url as string} alt={wine?.photo.alt as string} priority className='h-160 w-auto' width={0} height={0} sizes="100vw" />
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
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BasicButton from '@/components/Buttons/BasicButton';
import { WineShort } from '@/types/Wine';
import { getWines } from '@/app/actions/getWines';

const Catalog: React.FC = () => {
    const [wines, setWines] = useState<WineShort[]>([]);
    const router = useRouter();

    useEffect(() => {
      const fetchWines = async () => {
        const fetchedWines = await getWines({ count: 3, shortVersion: true });
        setWines(fetchedWines as WineShort[]);
      };
  
      fetchWines();
    }, []);

    const handleImageClick = (slug: string) => {
        router.push(`/catalog/${slug}`);
    };

    return (
        <div className="flex flex-col w-full items-center justify-center border-crred border-t-2 bg-back py-12 space-y-9">
            <div className='flex flex-col justify-center items-start w-full space-y-2'>
                <h2 className="text-4xl text-crred font-light after: tracking-wide mb-2">Nuestras Colecciones</h2>
                <div className="w-1/4 ">
                    <p className="text-crred font-light italic text-lg break-words">
                    Cada botella cuenta una historia única, inspirada en las vidas de personas extraordinarias. 
                    Descubre las historias y sabores que celebran su legado.
                    </p>
                </div>
            </div>
            <div className='flex space-x-9'>
                {wines.map((wine) => (
                    <div 
                        className='flex items-center justify-center flex-col w-126 h-126 cursor-pointer' 
                        key={wine._id}
                        onClick={() => handleImageClick(wine.slug)}
                    >
                        <img src={wine.photo.asset.url} alt={wine.photo.alt} className='object-contain w-full h-full' />
                    </div>
                ))}
            </div>
                
            <div className='flex w-full justify-center items-center pt-9'>
                <BasicButton variant='transparent' sizex='xxxlarge' className='border-crred border border-solid'>
                    <p className='text-lg'>Explora Nuestro Vinos</p>
                </BasicButton>
            </div>
        </div>
    );
};

export default Catalog;

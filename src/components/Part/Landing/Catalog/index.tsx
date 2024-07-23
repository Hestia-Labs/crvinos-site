'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BasicButton from '@/components/Buttons/BasicButton';
import { WineShort } from '@/types/Wine';
import { getDistinctCollectionWines } from '@/app/actions/getWines';
import Image from 'next/image';
import { motion } from 'framer-motion';

const SkeletonLoader: React.FC = () => (
    <div className="flex items-center justify-center flex-col h-100 cursor-pointer animate-pulse">
        <div className="bg-gray-300 w-full h-full"></div>
    </div>
);

const Catalog: React.FC = () => {
    const [wines, setWines] = useState<WineShort[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchWines = async () => {
            const fetchedWines = await getDistinctCollectionWines();
            setWines(fetchedWines as WineShort[]);
            setLoading(false);
        };

        fetchWines();
    }, []);

    const handleImageClick = (slug: string) => {
        router.push(`/catalog?line=${slug}`);
    };

    const handleButtonClick = () => {
        router.push('/catalog');
    }

    return (
        <div className="flex flex-col w-full items-center justify-center border-crred border-t-2 bg-back py-12 space-y-9">
            <div className='flex flex-col justify-center items-start w-full space-y-2'>
                <h2 className="text-3xl text-crred font-light tracking-wide mb-2">Nuestras Colecciones</h2>
                <div className="w-1/4 ">
                    <p className="text-crred font-light italic break-words">
                    Cada botella cuenta una historia única, inspirada en las vidas de personas extraordinarias. 
                    Descubre las historias y sabores que celebran su legado.
                    </p>
                </div>
            </div>
            <div className="justify-center gap-8 p-4 w-10/12 grid grid-cols-3">
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))
                ) : (
                    wines.map((wine) => (
                        <motion.div 
                            className='flex items-center justify-center flex-col h-100 cursor-pointer' 
                            key={wine._id}
                            onClick={() => handleImageClick(wine.slug)}
                            whileHover={{ scale: 1.05, transition: { type: "tween", ease: "linear" } }}
                        >
                            <Image src={wine.photo.asset.url} alt={wine.photo.alt} width={0} height={0} sizes="100vw" priority className='object-contain w-full h-full' />
                        </motion.div>
                    ))
                )}
            </div>
                
            <div className='flex w-full justify-center items-center pt-9'>
                <BasicButton onClick={handleButtonClick} variant='transparent' sizex='xxxlarge' className='border-crred border border-solid'>
                    <p className='text-lg'>Explora Nuestro Vinos</p>
                </BasicButton>
            </div>
        </div>
    );
};

export default Catalog;

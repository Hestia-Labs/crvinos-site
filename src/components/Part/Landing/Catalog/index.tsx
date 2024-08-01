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
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    };

    return (
        <div className="flex flex-col w-full items-center justify-center border-crred border-t-2 py-12 space-y-9">
            <div className='flex flex-col justify-center items-start w-full space-y-2'>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-crred font-light tracking-wide mb-2">Nuestras Colecciones</h2>
                <div className="w-full md:w-3/4 lg:w-1/3">
                    <p className="text-crred font-light italic text-base md:text-lg lg:text-xl">
                        Cada botella cuenta una historia única, inspirada en las vidas de personas extraordinarias. 
                        Descubre las historias y sabores que celebran su legado.
                    </p>
                </div>
            </div>
            <div className="justify-center gap-8 p-4 w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3">
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))
                ) : (
                    wines.map((wine, index) => (
                        <motion.div 
                            className='flex items-center justify-center flex-col lg:h-100 md:h-80 sm:h-64 h-64 cursor-pointer' 
                            key={wine._id}
                            onClick={() => handleImageClick(wine.collection)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            whileHover={{ scale: 1.05, transition: { type: "tween", ease: "linear" } }}
                            animate={{ opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.5 }}
                        >
                            <Image src={wine.photo.asset.url} alt={wine.photo.alt} width={0} height={0} sizes="100vw" priority className='object-contain w-full h-full' />
                        </motion.div>
                    ))
                )}
            </div>
            <div className='flex w-full justify-center items-center pt-9'>
                <BasicButton onClick={handleButtonClick} variant='transparent' sizex='xxlarge' className='border-crred border border-solid'>
                    <p className='lg:text-lg md:text-base sm:text-sm text-sm text-nowrap'>Explora Nuestro Vinos</p>
                </BasicButton>
            </div>
        </div>
    );
};

export default Catalog;

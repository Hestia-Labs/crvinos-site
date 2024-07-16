'use client';
import React, { useEffect, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { fetchCollectionData } from '@/app/actions/getCollection';  // Adjust the path as needed
import Reveal from '@/components/Effects/reveal';  // Adjust the path as needed

const Catalog: React.FC = () => {
    const [scope, animate] = useAnimate();
    const searchParams = useSearchParams();
    const line = searchParams.get('line')?.toLowerCase();
    
    const options = ['DBC', 'Hermelinda', 'Recuento'];
    const imageVariants = {
        nonHover: { scale: 1 },
        hover: { scale: 1.02  },
    }
    const backgroundVariants = {
        nonHover: { opacity: 0.05 },
        hover: { opacity: 0 },
    }
    const divVariants = {
        init: { opacity: 0, y: 75 },
        ani: { opacity: 1, y: 0 },
        hover: { scale: 1 },
    }

    const [selectedOption, setSelectedOption] = useState<string | null>(() => {
        const matchedOption = options.find(option => option.toLowerCase() === line);
        return matchedOption || 'DBC';
    });

    const [collectionData, setCollectionData] = useState<any>(null);

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
        console.log(`Selected: ${option}`);
    };

    return (
        <div className="relative space-y-9 w-full " ref={scope}>
            <motion.div
                key={collectionData?.photo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                <img src={collectionData?.photo} alt="Banner Image" className="w-full h-144 object-cover" />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute top-0 left-0 w-full">
                    <div className="bg-white bg-opacity-10 text-white text-center py-2 px-4">
                        <div className="flex justify-evenly space-x-8">
                            {options.map((option) => (
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
                <div className="absolute bottom-0 left-0 bg-opacity-75 text-back py-20 p-16 space-y-6">
                    <h2 className="text-5xl font-semibold cormorant-garamond-semibold-italic">{selectedOption}</h2>
                    <div className='w-3/4'>
                        <p className="text-sm cormorant-garamond-bold">
                            {collectionData?.story || 'Compartiendo la historia de una persona increíble...'}
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className='px-20 w-full relative'>
                <div className="w-full h-2 border-crred border-t-2 "></div>
            </div>

            <div className="w-full flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4 justify-center items-center w-10/12">
                    {collectionData?.wines?.map((wine: any, index: any) => (
                        <Reveal key={wine.slug.current} width="auto">
                            <motion.div 
                                className={`relative flex justify-center wine-${index}`}
                                initial="init"
                                animate="ani"
                                transition={{ delay: 0.25, duration: 0.5 }}
                                whileHover="hover"
                                variants={divVariants}
                            >
                                <motion.img 
                                    src={wine.photo} 
                                    alt={wine.alt} 
                                    className="w-56 h-72 z-10 pointer-events-none object-cover" 
                                    variants={imageVariants}
                                />
                                <motion.div 
                                    className="absolute inset-0 bg-black opacity-5 overlay" 
                                    variants={backgroundVariants}
                                ></motion.div>
                                <div className="absolute left-0 bg-opacity-75 text-back p-4">
                                    <h3 className="text-xl text-crred font-semibold cormorant-garamond-semibold-italic">{selectedOption}</h3>
                                    <p className=" text-crred text-lg">{wine.name}</p>
                                </div>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Catalog;

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { InstagramPost } from '@/types/Instragram';  
import InstagramLoader from '@/components/Loaders/InstagramLoader';

const Instagram: React.FC<{ photos: InstagramPost[] }> = ({ photos }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [visiblePhotos, setVisiblePhotos] = useState<InstagramPost[]>([]);

    useEffect(() => {
        if (photos.length > 0) {
            setLoading(false);
            updateVisiblePhotos();
        }
    }, [photos]);

    useEffect(() => {
        const handleResize = () => {
            updateVisiblePhotos();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [photos]);

    const updateVisiblePhotos = () => {
        const width = window.innerWidth;
        let count = 5;

        if (width < 640) {
            count = 2;
        } else if (width < 768) {
            count = 3;
        } else if (width < 1024) {
            count = 4;
        }

        setVisiblePhotos(photos.slice(0, count));
    };

    return (
        <div className="p-6 border-crred border-t-2 w-full">
            <div className="flex flex-col md:flex-row md:justify-between items-center mb-12">
                <h2 className="text-lg md:text-2xl text-crred font-light mb-2 md:mb-0">Síguenos en Instagram</h2>
                <a 
                    href="https://www.instagram.com/crvinosmx/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-crred font-light text-base md:text-xl underline-offset-4 underline cursor-pointer transition-colors duration-300 ease-in-out hover:text-crred-75 3"
                >
                    @crvinosmx
                </a>
            </div>
            <div className="flex space-x-4 overflow-x-auto justify-around items-center ">
                {loading ? (
                    <InstagramLoader />
                ) : (
                    visiblePhotos.map(photo => (
                        <a 
                            key={photo.image.asset._id} 
                            href={photo.postUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="overflow-hidden border flex rounded-md shadow-sm shadow-gray-300/50 cursor-pointer group"
                        >
                            <Image 
                                src={photo.image.asset.url} 
                                alt={photo.image.alt} 
                                className="w-48 h-48 rounded-md sm:w-52 sm:h-52 object-cover filter grayscale transition-opacity duration-300 group-hover:opacity-75" 
                                width={208}
                                height={208}
                                sizes="(max-width: 640px) 12rem, (max-width: 768px) 13rem, 13rem"
                            />
                        </a>
                    ))
                )}
            </div>
        </div>
    );
};

export default Instagram;
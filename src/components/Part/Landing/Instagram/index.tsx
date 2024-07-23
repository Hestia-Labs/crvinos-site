'use client';

import React, { useEffect, useState } from 'react';
import { fetchRandomPhotos } from '@/app/actions/fetchRandomPhotos';
import { EventShort } from '@/types/Event';  
import InstagramLoader from '@/components/Loaders/InstagramLoader';

const Instagram: React.FC = () => {
    const [photos, setPhotos] = useState<EventShort[]>([]);  
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadPhotos = async () => {
            const fetchedPhotos = await fetchRandomPhotos(5, "wine");
            setPhotos(fetchedPhotos);
            if (fetchedPhotos.length > 0)
                setLoading(false);
        };

        loadPhotos();
    }, []);

    return (
        <div className="p-6 border-crred border-t-2 w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-crred font-light">Síguenos en Instagram</h2>
                <span className="text-crred cormorant-garamond-light-italic font-light text-xl underline underline-offset-2 cursor-pointer transition-colors duration-300 ease-in-out hover:text-crred-light hover:underline-offset-3">@crvinosmx</span>
            </div>
            <div className="flex space-x-4 overflow-x-auto justify-around items-center ">
                {loading ? (
                    <InstagramLoader />
                ) : (
                    photos.map(photo => (
                        <div key={photo.slug} className="overflow-hidden flex rounded-lg shadow-sm shadow-gray-300/50  cursor-pointer">
                            <div className="px-1 py-1 sm:p-3">
                                <img 
                                    src={photo.imageUrl} 
                                    alt={`Instagram ${photo.slug}`} 
                                    className="w-44 h-44 sm:w-48 sm:h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105" 
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Instagram;
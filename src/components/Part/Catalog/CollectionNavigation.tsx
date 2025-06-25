'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface CollectionNavigationProps {
  selectedOption: string;
  onSelectOption: (option: string) => void;
  collectionThumbnails: Record<string, string>;
}

const CollectionNavigation: React.FC<CollectionNavigationProps> = ({
  selectedOption,
  onSelectOption,
  collectionThumbnails,
}) => {
  // Get collections from thumbnails or use fallback
  let collections = Object.keys(collectionThumbnails).length > 0 
    ? Object.keys(collectionThumbnails) 
    : ['DBC', 'Hermelinda', 'Recuento'];
  
  // Ensure DBC is first by custom sorting
  collections = collections.sort((a, b) => {
    if (a.toUpperCase() === 'DBC') return -1;
    if (b.toUpperCase() === 'DBC') return 1;
    return a.localeCompare(b);
  });
  
  // Default fallback images in case server images are missing
  const getFallbackImage = (collection: string) => {
    return `/img/collections/${collection.toLowerCase()}-fallback.jpg`;
  };
  
  return (
    <div className="w-full py-6 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto">
        <h3 className="text-center text-2xl text-gray-700 mb-5   italic">
          Nuestras Colecciones
        </h3>
        
        <div className="flex overflow-x-auto scrollbar-hide justify-center space-x-4 md:space-x-8 px-4">
          {collections.map((collection) => {
            const isSelected = selectedOption.toUpperCase() === collection.toUpperCase();
            const imageUrl = collectionThumbnails[collection] || getFallbackImage(collection);
            
            return (
              <motion.div
                key={collection}
                className="relative flex-none cursor-pointer group transition-all duration-500 ease-in-out flex flex-col items-center"
                onClick={() => onSelectOption(collection)}
              >
                {/* Container for image and indicator */}
                <div className="relative">
                  {/* Thumbnail */}
                  <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden relative`}>
                    <Image
                      src={imageUrl}
                      alt={`Colección ${collection}`}
                      width={112}
                      height={112}
                      className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 transition-all duration-500 ease-in-out
                      ${isSelected 
                        ? 'bg-crred/0' 
                        : 'bg-black/40 group-hover:bg-crred/0'}`}
                    />
                    
                    {/* Border */}
                    <div className={`absolute inset-0 rounded-full transition-all duration-500 ease-in-out border-2
                      ${isSelected ? 'border-crred' : 'border-transparent group-hover:border-crred/70'}`}
                    />
                  </div>
                  
                  {/* Selected indicator - positioned relative to the thumbnail */}
                  {isSelected && (
                    <motion.div 
                      className="absolute bottom-0 left-1/2 w-3 h-3 bg-crred transform -translate-x-1/2 translate-y-1/2 rotate-45"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  )}
                </div>
                
                {/* Collection name */}
                <p className={`text-center mt-3 font-serif transition-all duration-500 ease-in-out
                  ${isSelected ? 'text-crred' : 'text-gray-700 group-hover:text-crred'}`}>
                  {collection === 'Dbc' ? 'DBC' : collection}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CollectionNavigation;
'use client';

import React, { useState, useEffect } from 'react';
import WineItem from '@/components/Part/Catalog/WineItem';
import { WineShort } from '@/types/Wine';
import BasicButton from '@/components/Buttons/BasicButton';

interface RecommendationsSectionProps {
  collection?: string;
  initialRecommendations: WineShort[];
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  collection,
  initialRecommendations,
}) => {
  const [recommendations] = useState<WineShort[]>(initialRecommendations);
  const [visibleRecommendations, setVisibleRecommendations] = useState<WineShort[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setVisibleRecommendations(isMobile ? recommendations.slice(0, 2) : recommendations);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [recommendations]);


  return (
    <div className='w-full flex flex-col justify-center items-center space-y-6 py-5'>
      <div className='w-full flex flex-col justify-start items-start'>
        <h1 className='text-3xl md:text-4xl text-crred font-light tracking-wide mb-4'>
          Más de {collection}
        </h1>
        <div className="h-1 w-32 bg-crred mb-6" />
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-8 md:gap-20 p-4 justify-evenly items-center w-full'>
        {visibleRecommendations.map((wine, index) => (
          <WineItem 
            key={wine.slug}
            wine={wine}
            index={index}
            selectedOption={wine.collection}
            link={`/catalog/${wine.collection.toLowerCase()}/${encodeURIComponent(wine.slug)}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;

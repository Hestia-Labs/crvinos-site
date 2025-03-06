"use client";
import React, { useEffect, useState } from 'react';
import WineItem from '@/components/Part/Catalog/WineItem';
import { getWines } from '@/app/actions/getWines';
import { WineShort } from '@/types/Wine';
import WineRecLoader from '@/components/Loaders/WineRecLoader'; 

interface RecommendationsSectionProps {
  collection?: string;  
  exclude: string;
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ collection, exclude }) => {
  const [recommendations, setRecommendations] = useState<WineShort[]>([]);
  const [visibleRecommendations, setVisibleRecommendations] = useState<WineShort[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 1) Fetch recommendations whenever `exclude` or `collection` changes
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const fetchedRecommendations = await getWines({
          exclude,
          collection,
          count: 3,
          shortVersion: true,
        }) as WineShort[];

        setRecommendations(fetchedRecommendations);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [exclude, collection]);

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
        {loading ? (
          <WineRecLoader />
        ) : (
          <>
            {visibleRecommendations.map((wine, index) => (
              <WineItem 
                key={wine.slug}
                wine={wine}
                index={index}
                selectedOption={wine.collection}
                link={`/catalog/${wine.collection.toLowerCase()}/${encodeURIComponent(wine.slug)}`}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendationsSection;

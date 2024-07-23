// components/RecommendationsSection.tsx

import React, { useEffect, useState } from 'react';
import WineItem from '@/components/Part/Catalog/WineItem';
import { getWines } from '@/app/actions/getWines';
import { Wine } from '@/types/Wine';
import WineRecLoader from '@/components/Loaders/WineRecLoader'; 

interface RecommendationsSectionProps {
  collection?: string;  
  exclude: string;
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ collection, exclude }) => {
  const [recommendations, setRecommendations] = useState<Wine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const fetchedRecommendations = await getWines({
        exclude: exclude,
        collection: collection,  
        count: 3,
        shortVersion: true,
      }) as Wine[];
      setRecommendations(fetchedRecommendations);
      setLoading(false);
    };

    fetchRecommendations();
  }, [exclude, collection]);

  return (
    <div className='w-full flex flex-col justify-center items-center space-y-6 py-5'>
      <div className='w-full flex justify-start items-center'>
        <h1 className='text-crred text-2xl '> Más de {collection}</h1>
      </div>
      {loading ? (
        <WineRecLoader/>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 p-4 justify-evenly items-center w-full'>
          {recommendations.map((wine, index) => (
            <WineItem 
              key={wine.slug}
              wine={{ alt:wine.photo.alt, photo:wine.photo.asset.url, name:wine.name, slug:wine.slug}}
              index={index}
              selectedOption={wine.collection}
              link={`/catalog/${wine.collection.toLowerCase()}/${encodeURIComponent(wine.slug)}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsSection;

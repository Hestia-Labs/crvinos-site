// components/RecommendationsSection.tsx

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const fetchedRecommendations = await getWines({
        exclude: exclude,
        collection: collection,  
        count: 3,
        shortVersion: true,
      }) as WineShort[];
      setRecommendations(fetchedRecommendations);
      setLoading(false);
    };

    fetchRecommendations();
  }, [exclude, collection]);

  return (
    <div className='w-full flex flex-col justify-center items-center space-y-6 py-5'>
      <div className='w-full flex justify-start items-center'>
        <h1 className='text-crred text-xl sm:text-xl md:text-2xl lg:text-3xl '> Más de {collection}</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-8 md:gap-20 p-4 justify-evenly items-center w-full'>
      {loading ? (
        <WineRecLoader/>
      ) : (
        <>
          {recommendations.map((wine, index) => (
            <WineItem 
              key={wine.slug}
              wine={{
                slug: wine.slug,
                photo: wine.photo.asset.url,
                alt: wine.photo.alt,
                name: wine.name,
                awards: {
                  premioName: wine.awards?.premioName || '',
                  premioOrganization: wine.awards?.premioOrganization || '',
                  premioYear: wine.awards?.premioYear || '',
                  premioImage: {
                    asset: {
                      url: wine.awards?.premioImage.asset.url || ''
                    },
                    alt: wine.awards?.premioImage.alt || ''
                  },
                  premioLink: wine.awards?.premioLink || ''
                } 
              }}
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



import React from 'react';

const WineRecLoader: React.FC = () => {
  return (
     <>
      {[...Array(3)].map((_, index) => (
        <div key={index} className='w-100 h-100 bg-gray-200 rounded animate-pulse'></div>
      ))}
    </>
  );
};

export default WineRecLoader;

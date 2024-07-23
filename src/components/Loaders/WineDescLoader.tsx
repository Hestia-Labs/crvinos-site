import React from 'react';

const WineDescLoader: React.FC = () => {
  return (
    <div className='flex flex-col relative space-y-6'>
      <div className='border-crred border-b-2 w-full animate-pulse'>
        <div className='h-6 bg-gray-200 rounded w-1/3 mb-2'></div> {/* Title skeleton */}
      </div>
      <div className='flex relative w-full py-9 justify-between items-center px-5 h-full border-crred border-b-2 animate-pulse'>
        <div className='w-1/2 justify-start items-center space-y-8'>
          {[...Array(9)].map((_, index) => (
            <div key={index} className='flex w-full relative justify-start items-center space-x-16'>
              <div className='bg-gray-200 h-6 w-1/3 rounded'></div>
              <div className='bg-gray-200 h-6 w-3/4 rounded'></div>
            </div>
          ))}
        </div>
        <div className='w-1/3 flex justify-center items-center'>
          <div className='bg-gray-200 h-160 w-full rounded'></div> 
        </div>
      </div>
    </div>
  );
};

export default WineDescLoader;

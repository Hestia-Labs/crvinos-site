import React from 'react';

const WineDescLoader: React.FC = () => {
  return (
    <div className='flex relative flex-col space-y-9 animate-pulse'>
 
      <div className='mt-4 space-y-8 w-full px-4 sm:px-10 md:px-20'>
        <div className='flex flex-col relative space-y-8 w-full items-center'>
 
          <div className='flex flex-col md:flex-row relative w-full py-9 justify-center items-center md:items-start h-full border-crred border-b-2 space-y-8 md:space-y-0 md:space-x-8'>
 
            <div className='flex md:w-1/3 justify-center items-center px-4'>
              <div className='w-full h-80 md:h-160 bg-gray-200 rounded'></div>
            </div>
 
            <div className='flex flex-col md:w-2/3 justify-start items-start space-y-6 py-5'>
 
              <div className='space-y-2'>
                <div className='h-8 bg-gray-200 rounded w-2/3'></div>
                <div className='h-6 bg-gray-200 rounded w-1/3'></div>
              </div>
 
              <div className='w-full flex flex-col'>
                <div className='flex flex-col w-full items-start space-y-5 border-b border-crred pb-7'>
                  <div className='flex flex-row items-center space-x-4'>
                    <div className='w-36 h-10 bg-gray-200 rounded-full'></div>
                    <div className='h-10 w-40 bg-gray-200 rounded-full'></div>
                  </div>
                </div>
              </div>
 
              <div className='border-b border-crred pb-10 w-full'>
                <div className='h-6 bg-gray-200 rounded w-1/4 mb-4'></div>
                <div className='space-y-2'>
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className='h-4 bg-gray-200 rounded w-full'></div>
                  ))}
                </div>
              </div>
 
              <div className='w-full'>
 
                <div className='flex border-b border-crred'>
                  <div className='h-10 w-32 bg-gray-200'></div>
                  <div className='h-10 w-32 bg-gray-200 ml-4'></div>
                </div>

                <div className='py-6 space-y-2'>
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className='h-4 bg-gray-200 rounded w-full'></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Recommendations Section Placeholder */}
          {/* <div className='w-full px-4 md:px-12'>
            <div className='h-6 bg-gray-200 rounded w-1/3 mb-4'></div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {[...Array(3)].map((_, index) => (
                <div key={index} className='h-60 bg-gray-200 rounded'></div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WineDescLoader;

'use client';

import React from 'react';
import Reveal from '@/components/Effects/reveal';

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Reveal key={index} initial={true}>
          <div 
            className="relative bg-white rounded-xl shadow-lg overflow-hidden h-full animate-pulse-subtle"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            {/* Image skeleton */}
            <div className="w-full h-52 bg-gray-200"></div>
            
            {/* Content skeletons */}
            <div className="p-5">
              {/* Category badge */}
              <div className="h-6 w-24 bg-gray-200 rounded-full mb-3"></div>
              
              {/* Title */}
              <div className="h-7 w-4/5 bg-gray-200 rounded mb-2"></div>
              
              {/* Subtitle */}
              <div className="h-5 w-3/5 bg-gray-200 rounded mb-4"></div>
              
              {/* Description */}
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-11/12 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded mb-4"></div>
              
              {/* Footer */}
              <div className="flex justify-between items-center mt-5">
                <div className="h-7 w-28 bg-gray-200 rounded"></div>
                <div className="h-9 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </>
  );
};

export default SkeletonLoader; 
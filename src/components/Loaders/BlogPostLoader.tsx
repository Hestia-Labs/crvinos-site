// app/blog/[slug]/loading.tsx

import React from 'react';
import Navbar from '@/components/Navbar';
import Icon from '@/components/Icons';

const BlogPostLoader: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
            <Navbar redLogo red relative />
            <div className="relative w-full h-64 md:h-96 bg-gray-200 animate-pulse">
            </div>
            <div className="px-6 md:px-12 lg:px-20 w-full flex flex-col items-center mt-12">
              <div className="max-w-3xl w-full">

                <div className="flex w-full justify-start items-center mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 bg-gray-200 animate-pulse"></div>
                    <div className="w-24 h-5 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
                <div className="h-12 w-3/4 bg-gray-200 animate-pulse mb-6"></div>
                <div className="h-4 w-1/4 bg-gray-200 animate-pulse mb-12"></div>
                <div className="space-y-4">
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="h-4 w-full bg-gray-200 animate-pulse"></div>
                  ))}
                  <div className="h-4 w-5/6 bg-gray-200 animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 animate-pulse"></div>
                </div>
                <div className="mt-16 py-12 bg-gray-50">
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="h-8 w-2/3 bg-gray-200 animate-pulse mx-auto mb-8"></div>
                  </div>
                  <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">

                    <div className="w-full md:w-1/3 flex justify-center">
                      <div className="w-48 h-72 bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="w-full md:w-2/3 text-center md:text-left space-y-4">
                      <div className="h-6 w-1/2 bg-gray-200 animate-pulse mx-auto md:mx-0"></div>
                      <div className="h-4 w-full bg-gray-200 animate-pulse"></div>
                      <div className="h-4 w-5/6 bg-gray-200 animate-pulse"></div>
                      <div className="h-4 w-2/3 bg-gray-200 animate-pulse"></div>
                      <div className="h-10 w-40 bg-gray-200 animate-pulse mx-auto md:mx-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            {/* Optional Footer or Additional Components */}
            <div className="relative mt-auto">
              <div className="absolute -bottom-80 right-0 -z-10">
                <Icon name="VineLeaf" className="h-80 w-full opacity-40" />
              </div>
            </div>
          </div>
  );
};

export default BlogPostLoader;

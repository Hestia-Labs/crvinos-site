// Hero.tsx

'use client';

import React from 'react';
import BackgroundVideo from 'next-video/background-video';
import BasicButton from '@/components/Buttons/BasicButton';
import crvinosvideo from '../../../../../videos/crvinosbgvideo.mov';
import { useRouter } from 'next/navigation';

import { PiArrowDownThin } from "react-icons/pi";

const Hero: React.FC = () => {
  const router = useRouter();

  return (
    <div className="relative w-full no-scrollbars">
      <BackgroundVideo
        src={crvinosvideo}
        className="bg-video"
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center pt-7">
        <div className="flex flex-col items-center justify-between py-36 min-h-screen px-4 md:px-8 lg:px-16">
          <div className="text-center space-y-2 pt-5 md:pt-12">
            <div className="space-y-1 flex flex-col items-center">
              <p className="text-back text-lg lg:text-xl xl:text-2xl italic">
                Sabor 100% Mexicano
              </p>
              <h1 className="text-crred-title text-3xl sm:text-5xl md:text-7xl lg:text-8xl cormorant-garamond-semibold-italic whitespace-nowrap">
                De Nuestro Viñedo a tu Mesa
              </h1>
            </div>
            <div>
              <p className="text-back text-center cormorant-garamond-semibold-italic md:text-lg lg:text-xl xl:text-2xl">
                Experimenta la verdadera cosecha de nuestra historia
              </p>
            </div>
          </div>
          <BasicButton
            onClick={() => { router.push("/about"); }}
            variant="main"
            sizex="xlarge"
            className="border-crred border border-solid text-[12px] sm:text-sm md:text-base lg:text-base"
          >
            Aprende más
          </BasicButton>
        </div>
      </div>

      {/* New content added here */}
      <div
        className="border-b border-back absolute bottom-10 left-7 md:bottom-10 md:left-14 z-20 flex justify-center items-center space-x-1 py-1 px-2 cursor-pointer"
        onClick={() => {
          const blogSection = document.getElementById('blog-section');
          if (blogSection) {
            blogSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <PiArrowDownThin className="w-4 h-4 md:w-6 md:h-6 text-white" />
        <p className="text-white font-thin text-sm md:text-xl uppercase">Explora</p>
      </div>
    </div>
  );
};

export default Hero;

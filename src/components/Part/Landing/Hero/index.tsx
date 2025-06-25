// Hero.tsx


import React from 'react';
import BackgroundVideo from 'next-video/background-video';
import BasicButton from '@/components/Buttons/BasicButton';
import crvinosvideo from '../../../../../videos/crvinosbgvideo.mov';
import Link from 'next/link';

import ExploreScroll from './exploreScroll';
import TransitionLink from '@/components/TransitionLink';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full no-scrollbars">
      <BackgroundVideo
        autoPlay
        muted
        loop
        playsInline
        src={crvinosvideo}
        className="bg-video"
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center pt-7">
        <div className="flex flex-col items-center justify-between py-36 min-h-screen px-4 md:px-8 lg:px-16">
          <div className="text-center space-y-2 pt-10 md:pt-16">
            <div className="space-y-1 flex flex-col items-center">
              <p className="text-back text-xl md:text-3xl italic">
                Sabor 100% Mexicano
              </p>
              <h1 className="text-crred-title text-4xl md:text-8xl  italic font-semibold whitespace-nowrap">
                De Nuestro Viñedo a tu Mesa
              </h1>
            </div>
            <div>
              <p className="text-back text-center italic text-lg md:text-2xl">
                Experimenta la verdadera cosecha de nuestra historia
              </p>
            </div>
          </div>

            <BasicButton
              variant="main"
              sizex="xlarge"
              className="border-crred border border-solid text-[12px] sm:text-sm md:text-base lg:text-base"
              link="/about"
            >
              Aprende más
            </BasicButton>
        </div>
      </div>

      {/* New content added here */}
      <ExploreScroll/>
    </div>
  );
};

export default Hero;

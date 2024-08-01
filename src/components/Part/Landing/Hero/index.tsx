'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Video from 'next-video';
import BasicButton from '@/components/Buttons/BasicButton';
import crvinos from '../../../../../videos/crvinos-bg.mp4';
import { useRouter } from 'next/navigation';
import { Toaster } from 'sonner';
import Map from './Map';

const Hero: React.FC = () => {
    const t = useTranslations();
    const router = useRouter();
    return (
        <div className='relative  w-full no-scrollbars'>
            <Toaster
                toastOptions={{
                    classNames: {
                        toast: 'bg-back',
                        title: 'text-crred',
                        icon: 'text-crred',
                    },
                }}
            />
            <Video
                src={crvinos}
                autoPlay
                loop
                muted
                controls={false}
                className="bg-video"
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center pt-7">
                <div className="flex flex-col items-center justify-between py-36 min-h-screen px-4 md:px-8 lg:px-16">
                    <div className="text-center">
                        <div className='space-y-1 md:space-x-3 flex flex-col items-center'>
                            <p className='text-crred font-bold  md:text-lg lg:text-xl xl:text-2xl italic'>
                                Sabor 100% Mexicano
                            </p>
                            <h1 className='text-crred-title text-4xl md:text-5xl lg:text-6xl xl:text-8xl cormorant-garamond-semibold-italic whitespace-nowrap'>
                                De Nuestro Viñedo a tu Mesa
                            </h1>
                        </div>
                        <div>
                            <p className='text-crred text-center cormorant-garamond-semibold-italic text-sm md:text-lg lg:text-xl xl:text-2xl'>
                                Experimenta la verdadera cosecha de nuestra historia
                            </p>
                        </div>
                    </div>
                    <BasicButton onClick={() => { router.push("/about") }} variant="bg-back" sizex='xlarge' className='border-crred border border-solid text-[12px] sm:text-sm md:text-base lg:text-base'>
                        Aprende más
                    </BasicButton>
                </div>
            </div>
            <Map />
        </div>
    );
};

export default Hero;
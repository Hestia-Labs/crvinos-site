import React from 'react';
import {useTranslations} from 'next-intl';
import Video from 'next-video';
import BasicButton from '@/components/Buttons/BasicButton';
import crvinos from '../../../../../videos/crvinos-bg.mp4';
import { Toaster} from 'sonner'
import Map from './Map';

const Hero: React.FC = () => {
    const t = useTranslations();
    return (
        <div className='relative min-h-screen w-full no-scrollbars'>
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
                <div className="flex flex-col items-center justify-between py-36 min-h-screen">
                    <div className="">
                        <div className='space-y-3 justify-center flex flex-col items-center'>
                            <p className='text-crred font-semibold text-lg italic'>Sabor 100% Mexicano</p>
                            <h1 className='text-crred-title lg:text-8xl md:text-3xl text-xl italic' style={{ letterSpacing: '20%', fontWeight: '400' }}>De Nuestro Viñedo a tu Mesa</h1>
                        </div>
                        <div>
                            <p className='text-crred text-center cormorant-garamond-regular-italic text-lg'>Experimenta la verdadera cosecha de nuestra historia</p>
                        </div>
                    </div>
                    <BasicButton variant="bg-back" sizex='xlarge' className='border-crred border border-solid'>
                        Aprende más
                    </BasicButton>
                </div>
            </div>
            <Map />
        </div>
    );
};

export default Hero;
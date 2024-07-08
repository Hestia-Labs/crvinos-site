import React from 'react';
import {useTranslations} from 'next-intl';
import Video from 'next-video';
import crvinos from '../../../../videos/crvinos-bg.mp4';


const Hero: React.FC = () => {
    const  t   = useTranslations();
    return (
        <div className='relative min-h-screen w-full  no-scrollbars'>
            <Video 
                src={crvinos} 
                autoPlay 
                loop 
                muted
                controls={false}  
                className="bg-video" 
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center min-h-screen">
                    
                    <div className='flex flex-col items-center justify-center '>
                        <div className='md:w-4/6 w-5/6 md:mt-16 mt-8'>
                            <p className="text-white md:text-xl  text-xs font-semibold text-center"></p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Hero;
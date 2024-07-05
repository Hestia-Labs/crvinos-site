
import React from 'react';
import Icon from '../Icons';
import {useTranslations} from 'next-intl';

const CatalogueButton: React.FC = () => {
    const t = useTranslations();
    const link = "https://drive.google.com/file/d/1dtKqEL83c-MR5XyhP9JUH0_p3AeGUawf/view?usp=sharing"

    return (
        <a href={link} target='_blank' className='flex flex-row'>
            <div className="bg-[#8D131E] px-2 md:py-1 flex items-center justify-center rounded-tl-md rounded-bl-md">
                <div>
                    <Icon name='Download' className="h-5 w-5 md:h-7 md:w-7" />
                </div>
            </div>   
            <div className="flex items-center justify-start bg-white text-black rounded-tr-md rounded-br-md cursor-pointer w-fit h-fit">
                <div className='py-1 px-9 flex flex-col justify-center items-center space-y-[-5px]'>
                    <p className='lg:text-base md:text-sm text-xs font-bold'>{t("down")}</p>
                    <p className='text-[#8D131E] font-semibold lg:text-sm md:text-xs text-xs'>E-{t("ctg")}</p>
                </div>
            </div>
        </a>
    );
};

export default CatalogueButton;

import React from 'react';
import Counter from './Counter';
import {useTranslations} from 'next-intl';
import MailingFormListForm from './MailingFormListForm';


const Hero: React.FC = () => {
    const  t   = useTranslations();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Counter/>
            <div className='flex flex-col items-center justify-center '>
                <div className='md:w-4/6 w-5/6 md:mt-16 mt-8'>
                    <p className="text-white md:text-xl  text-xs font-semibold text-center">{t("desc")}</p>
                </div>
                <MailingFormListForm/>
            </div>
        </div>
    );
};

export default Hero;
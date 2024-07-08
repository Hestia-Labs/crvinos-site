import React from 'react';
import CatalogueButton from './CatalogueButton';
import Icon from '../Icons';

const Footer: React.FC = () => {
  return (
    <footer className=" flex w-full  items-center justify-center z-20 py-4 px-20">
        <div className='flex justify-between items-start px-5 py-5 border-crred border-t-2 w-full'>
            <div className='flex items-start'>
                <div className="flex flex-col items-center justify-center space-y-12">
                    <div className="text-white lg:text-base md:text-sm   text-xs">
                        <Icon name="CRVinosMX" className="h-20 w-20 md:h-48 md:w-48" />
                    </div>
                    <div className="text-crred lg:text-base md:text-sm   text-xs">
                        © 2024 CRVinosMX
                    </div>
                </div>
                <div className="flex  items-center justify-center py-4 px-20">
                    <div className=" flex   lg:text-base md:text-sm   text-xs space-x-8">                    
                        <a href='' className="text-crred">Política de Privacidad</a>                 
                        <a href='' className="text-crred">Cookies</a>
                        <a href='' className="text-crred">Nosotros</a>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <Icon name="Facebook" className="h-5 w-5 md:h-8 md:w-8" />
                <Icon name="Instagram" className="h-5 w-5 md:h-8 md:w-8" />
            </div>
        </div>
    </footer>
  );
};

export default Footer;

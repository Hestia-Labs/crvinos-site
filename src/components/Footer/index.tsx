'use client';

import React from 'react';
import Icon from '../Icons';
import { useRouter } from 'next/navigation';
import BasicButton from '@/components/Buttons/BasicButton';
import MailingListForm from './MailingListForm';

const Footer: React.FC = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handleNavClick = (route: string) => {
    router.push(route);
  };

  return (
    <footer className="flex flex-col w-full items-center justify-center bg-transparent text-white py-8 px-4 sm:px-10 md:px-20">
      <div className="flex flex-col md:flex-row-reverse md:justify-evenly md:items-start w-full justify-center items-center border-crred border-t-2 py-5 space-y-6">
        <div className="w-full md:items-start md:justify-end flex flex-col items-center space-y-6 px-8">
          <div className="w-full border-crred border-b py-6 justify-start items-start">
            <h3 className="text-crred md:text-2xl text-start">Preguntas, Comentarios o Algun Problema ?</h3>
            <BasicButton
              onClick={handleContactClick}
              variant='bg-crred'
              sizey='small'
              sizex='small'
              className='rounded-md border-crred border border-solid mt-4 text-xs/3 md:text-base'
            >
              Contáctanos
            </BasicButton>
          </div>
          <MailingListForm />
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-center items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 w-full">
          <div className="flex flex-col items-center space-y-4 md:space-y-6">
            <Icon name="CRVinosMX" className="h-24 w-24 md:h-48 md:w-48" />
            <div className="flex space-x-3 items-center justify-center">
              <Icon link='https://www.facebook.com/profile.php?id=100078033250234&mibextid=LQQJ4d' name="Facebook" className="h-6 w-6 md:h-8 md:w-8" newPage />
              <Icon link='https://www.instagram.com/crvinosmx/' name="Instagram" className="h-6 w-6 md:h-8 md:w-8" newPage />
            </div>
            <div className="text-crred text-xs md:text-sm lg:text-base text-center">
              CRVinosMX © 2024 | All rights reserved
            </div>
          </div>
          <div className="flex flex-col items-center md:py-6">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-4 py-4 md:py-0 text-xs md:text-sm lg:text-base text-center">
              {[
                { name: 'Política de Privacidad', route: '/privacy' },
                { name: 'Términos y Condiciones', route: '/terms' },
                { name: 'Aviso Legal', route: '/legal' },
                { name: 'Nosotros', route: '/about' },
                { name: 'Contacto', route: '/contact' },
                { name: 'Catalogo', route: '/catalog' },
                { name: 'Enoturismo', route: '/enoturism' },
              ].map((item, index) => (
                <button key={index} onClick={() => handleNavClick(item.route)} className="text-crred">
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

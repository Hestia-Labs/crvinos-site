"use client";

import React from 'react';
import Icon from '../Icons';
import { useRouter } from 'next/navigation';
import BasicButton from '@/components/Buttons/BasicButton';
import MailingListForm from './MailingListForm';
import { motion } from 'framer-motion';
import Map from './Map';
import clsx from 'clsx';
import { useColor } from '@/contexts/ColorContext'; // Import the color context

const Footer: React.FC = () => {
  const router = useRouter();
  const { isRed } = useColor(); // Use the color context to get the current theme

  const logoColorClass = isRed ? '' : '-red';
  const logoInstagram = isRed ? 'Instagram-White' : 'Instagram';
  const logoFacebook = isRed ? 'Facebook-White' : 'Facebook';

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handleNavClick = (route: string) => {
    router.push(route);
  };

  const handleLocationClick = () => {
    window.open(
      "https://www.google.com/maps/place/RANCHO+SAN+MARTIN/@20.6163015,-100.0205995,17z/data=!4m7!3m6!1s0x85d37bf349f5136f:0xd0d981870247a049!4b1!8m2!3d20.6163015!4d-100.0180246!16s%2Fg%2F11t5dbn819?entry=ttu",
      "_blank"
    );
  };

  return (
    <footer
      className={clsx(
        'flex flex-col w-full items-center justify-center py-8 px-4 sm:px-10 md:px-20',
        {
          'bg-[#631E3A] text-back': isRed,
          'bg-transparent text-white': !isRed,
        }
      )}
    >
      <div
        className={clsx(
          'flex flex-col md:flex-row-reverse md:justify-evenly md:items-center w-full justify-center items-center border-t-2 py-5 space-y-6',
          {
            'border-back': isRed,
            'border-crred': !isRed,
          }
        )}
      >
        <div className="w-full md:items-center md:justify-center flex flex-col items-center space-y-6 px-8">
          <div
            className={clsx(
              'w-full border-b py-6 justify-center items-start',
              {
                'border-back': isRed,
                'border-crred': !isRed,
              }
            )}
          >
            <h3
              className={clsx('md:text-2xl', {
                'text-back': isRed,
                'text-crred': !isRed,
              })}
            >
              ¿Preguntas o Comentarios?
            </h3>
            <BasicButton
              onClick={handleContactClick}
              variant={isRed ? 'bg-back' : 'bg-crred'}
              sizey="small"
              sizex="small"
              className={clsx(
                'rounded-md border border-solid mt-4 text-xs/3 md:text-base',
                {
                  'border-back text-crred': isRed,
                  'border-crred text-back': !isRed,
                }
              )}
            >
              Contáctanos
            </BasicButton>
          </div>
          <MailingListForm />
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-center items-center md:items-center space-y-4 md:space-y-0 md:space-x-8 w-full">
          <div className="flex flex-col items-center space-y-4 md:space-y-6">
            <Icon name={`CRVinos${logoColorClass}`} className="h-24 w-24 md:h-48 md:w-48" />
            <div className="flex space-x-3 items-center justify-center">
              <Icon
                link="https://www.facebook.com/profile.php?id=100078033250234&mibextid=LQQJ4d"
                name={logoFacebook}
                className="h-6 w-6 md:h-8 md:w-8"
                newPage
              />
              <Icon
                link="https://www.instagram.com/crvinosmx/"
                name={logoInstagram}
                className="h-6 w-6 md:h-8 md:w-8"
                newPage
              />
            </div>
            <div
              className={clsx(
                'text-xs md:text-sm lg:text-base text-center',
                {
                  'text-back': isRed,
                  'text-crred': !isRed,
                }
              )}
            >
              CR Vinos MX ® | Todos los Derechos Reservados
            </div>
          </div>
          <div className="flex flex-col items-center w-full md:space-y-8 h-full justify-center">
            <Map />
            <div
              className={clsx(
                'grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-4 py-4 md:py-0 text-xs md:text-sm lg:text-base text-center',
                {
                  'text-back': isRed,
                  'text-crred': !isRed,
                }
              )}
            >
              {[
                { name: 'Política de Privacidad', route: '/privacy' },
                { name: 'Términos y Condiciones', route: '/terms' },
                { name: 'Aviso Legal', route: '/legal' },
                { name: 'Nosotros', route: '/about' },
                { name: 'Contacto', route: '/contact' },
                { name: 'Catalogo', route: '/catalog' },
                { name: 'Enoturismo', route: '/enoturism' },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.route)}
                  className={clsx({
                    'text-back': isRed,
                    'text-crred': !isRed,
                  })}
                >
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

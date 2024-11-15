"use client";

import React from 'react';
import Icon from '../Icons';
import { useRouter } from 'next/navigation';
import MailingListForm from './MailingListForm';
import clsx from 'clsx';
import { useColor } from '@/contexts/ColorContext';  
import Link from 'next/link';

const Footer: React.FC = () => {
  const router = useRouter();
  const { isRed } = useColor();  

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
      "https://maps.app.goo.gl/CYSfaSxypWzmyctUA",
      "_blank"
    );
  };

  type LinkType = {
    name: string;
    route: string;
    icon?: string;
  };

  type Section = {
    title: string;
    links: LinkType[];
  };

  const sections: Section[] = [
    {
      title: 'Información',
      links: [
        { name: 'Política de Privacidad', route: '/privacy' },
        { name: 'Términos y Condiciones', route: '/terms' },
        { name: 'Aviso Legal', route: '/legal' },
      ],
    },
    {
      title: 'Explora',
      links: [
        { name: 'Nosotros', route: '/about' },
        { name: 'Catalogo', route: '/catalog' },
        { name: 'Blog', route: '/blog' },
        { name: 'Enoturismo', route: '/enoturism' },
        { name: 'Contacto', route: '/contact' },
        { name: 'Cuentas', route: '/account' },
      ],
    },
    {
      title: 'Redes Sociales',
      links: [
        { name: 'Instagram', route: 'https://www.instagram.com/crvinosmx/', icon: logoInstagram },
        { name: 'Facebook', route: 'https://www.facebook.com/profile.php?id=100078033250234&mibextid=LQQJ4d', icon: logoFacebook },
      ],
    },
  ];

  return (
    <footer
      className={clsx(
        'flex flex-col w-full items-center justify-start pt-8 px-4 sm:px-10 md:px-20',
        {
          'bg-accred text-back': isRed,
          'bg-transparent text-white': !isRed,
        }
      )}
    >
      <div
        className={clsx(
          'flex flex-col md:justify-start md:items-start w-full justify-start items-center border-t-2 pt-16 pb-3 space-y-6 ',
          {
            'border-back': isRed,
            'border-crred': !isRed,
          }
        )}
      >
        <div
          className={clsx(
            'w-full flex flex-col-reverse md:flex-row md:space-x-8 justify-between items-start',
            {
              'text-back': isRed,
              'text-crred': !isRed,
            }
          )}
        >
          {/* Left Column: Sections */}
          <div className='flex flex-col md:flex-row justify-start items-start w-full md:w-1/2 space-y-6 md:space-y-0 md:space-x-8 px-2 md:px-0 mt-10 md:mt-0'>
            {sections.map((section, index) => (
              <div key={index} className='space-y-6'>
                <h3 className='text-xl font-semibold md:text-4xl italic md:font-thin'>{section.title}</h3>
                <div className='space-y-2 flex-col flex text-sm md:text-base'>
                  {section.links.map((item, linkIndex) => (
                    item.icon ? (
                      <div className='flex items-center space-x-2' key={linkIndex}>
                        <Icon
                          name={item.icon}
                          className="h-3 w-3 md:h-5 md:w-5"
                          newPage
                        />
                        <Link 
                          className={clsx(
                            'uppercase transition-colors duration-300', 
                            {
                              'hover:text-back-75': isRed,
                              'hover:text-crred-75': !isRed,
                            }
                          )} 
                          href={item.route}
                        >
                          {item.name}
                        </Link>
                      </div>
                    ) : (
                      <Link 
                        className={clsx(
                          'uppercase transition-colors duration-300', 
                          {
                            'hover:text-back-75': isRed,
                            'hover:text-crred-75': !isRed,
                          }
                        )} 
                        key={linkIndex} 
                        href={item.route}
                      >
                        {item.name}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Right Column: Mailing List and Location */}
          <div
            className={clsx(
              'flex flex-col justify-between items-start md:border-b-0  pb-5 md:border-l px-8 w-full md:w-1/2 space-y-12',
              {
                'border-back': isRed,
                'border-crred': !isRed,
              }
            )}
          >
            <MailingListForm />
            <div className='flex flex-col items-start space-y-2  md:flex'>
              <h3 className='text-xl md:text-4xl italic font-thin'>Nuestra Ubicación</h3>
              <div onClick={handleLocationClick} className='flex flex-col items-start space-y-1 cursor-pointer'>
                <p className='text-sm md:text-lg underline'>Camino Tejocote a San José La Laja km 3.2</p>
                <p className='text-sm md:text-lg underline'>Tequisquiapan, Qro., México</p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div
          className={clsx(
            'flex flex-col justify-center items-center w-full text-xs md:text-sm lg:text-base text-center uppercase space-y-4 pt-12 md:pt-0',
            {
              'text-back': isRed,
              'text-crred': !isRed,
            }
          )}
        >
          <Icon name={`CRVinos${logoColorClass}`} className="h-36 w-36 " />
          <p>CR Vinos MX ® | Todos los Derechos Reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

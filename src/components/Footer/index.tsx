"use client";

import React from 'react';
import Icon from '../Icons';
import { useRouter } from 'next/navigation';
import MailingListForm from './MailingListForm';
import clsx from 'clsx';
import { useColor } from '@/contexts/ColorContext';  
import Image from 'next/image';
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
      title: 'Explora',
      links: [
        { name: 'Inicio', route: '/' },
        { name: 'Nosotros', route: '/about' },
        { name: 'Catálogo', route: '/catalog' },
        { name: 'Blog', route: '/blog' },
        { name: 'Contacto', route: '/contact' },
      ],
    },
    {
      title: 'Enoturismo',
      links: [
        { name: 'Visión General', route: '/enotourism' },
        { name: 'Eventos', route: '/enotourism/events' },
        { name: 'Experiencias', route: '/experiences' },
        { name: 'Restaurante', route: '/restaurant' },
      ],
    },
    {
      title: 'Redes',
      links: [
        { name: 'Instagram', route: 'https://www.instagram.com/crvinosmx/', icon: logoInstagram },
        { name: 'Facebook', route: 'https://www.facebook.com/profile.php?id=100078033250234&mibextid=LQQJ4d', icon: logoFacebook },
      ],
    },
  ];

  const legalLinks: LinkType[] = [
    { name: 'Política de Privacidad', route: '/privacy' },
    { name: 'Términos y Condiciones', route: '/terms' },
    { name: 'Aviso Legal', route: '/legal' },
  ];

  return (
    <footer
      className={clsx(
        'flex flex-col w-full items-center justify-start pt-8 px-4 sm:px-10 md:px-20 relative',
        {
          'bg-accred text-back-75': isRed,
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
              'text-back-75': isRed,
              'text-crred': !isRed,
            }
          )}
        >
          {/* Left Column: Sections */}
          <div className='flex flex-col md:flex-row justify-between md:justify-evenly md:px-4 items-start w-full md:w-1/2 space-y-10 md:space-y-0 md:space-x-8 px-4 mt-10 md:mt-0'>
            {sections.map((section, index) => (
              <div key={index} className='space-y-4 w-full md:w-auto'>
                <h3 className={clsx('text-3xl md:text-4xl italic font-thin', {
                  'text-back': isRed,
                  'text-crred': !isRed,
                })}>{section.title}</h3>
                <div className='space-y-2 flex-col flex text-base md:text-base'>
                  {section.links.map((item, linkIndex) => (
                    item.icon ? (
                      <div className='ml-2 flex items-center space-x-3' key={linkIndex}>
                        <Icon
                          name={item.icon}
                          className="h-5 w-5 md:h-5 md:w-5"
                          newPage
                        />
                        <Link 
                          className={clsx(
                            'uppercase transition-colors duration-300 text-base', 
                            {
                              'hover:text-back-75 ': isRed,
                              'hover:text-crred-75 text-gray-700': !isRed,
                            }
                          )} 
                          href={item.route}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.name}
                        </Link>
                      </div>
                    ) : (
                      <Link 
                        className={clsx(
                          'uppercase transition-colors duration-300 text-base py-1 ml-2', 
                          {
                            'hover:text-back-75': isRed,
                            'hover:text-crred-75 text-gray-700': !isRed,
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
              'flex flex-col justify-start md:justify-between items-start md:border-b-0  pb-5 md:border-l px-2 md:px-8 w-full md:w-1/2 space-y-12',
              {
                'border-back': isRed,
                'border-crred': !isRed,
              }
            )}
          >
            <MailingListForm />
            <div className='flex flex-col items-start space-y-4 md:flex' id="location-section">
              <h3 className={clsx('text-3xl md:text-4xl italic font-thin', {
                'text-back': isRed,
                'text-crred': !isRed,
              })}>Nuestra Ubicación</h3>
              <div className={clsx('space-y-2 flex-col flex text-base md:text-base cursor-pointer',{
                      'hover:text-back-75': isRed,
                      'hover:text-crred-75 text-gray-700': !isRed,
                    })}
                    onClick={handleLocationClick} 
                  >
                <div className="flex items-center">
                  <p 
                    className={clsx(
                      'uppercase transition-colors duration-300 text-base py-1 ml-2 ', 
                    )}
                  >
                    Camino Tejocote a San José La Laja km 3.2
                  </p>
                  
                </div>
                <div className="flex items-center">
                  <p 
                    className={clsx(
                      'uppercase transition-colors duration-300 text-base py-1 ml-2 ', 
                    )}
                  >
                    Tequisquiapan, Qro., México
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p 
                  className={clsx(
                    'transition-colors duration-300 text-base py-1 ml-2', 
                    {
                      'text-back/80': isRed,
                      'text-gray-600': !isRed,
                    }
                  )}
                >
                  Miércoles a Domingo de 12:00 p.m. a 7:00 p.m.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Separator Line */}
        <div className={clsx('w-full my-6 border-t', {
          'border-back/30': isRed,
          'border-crred/30': !isRed,
        })}></div>
        
        {/* Footer Bottom - Legal Section */}
        <div className={clsx('w-full flex flex-col md:flex-row justify-between items-center md:items-end space-y-6 md:space-y-0', {
          'text-back/75': isRed,
          'text-gray-700': !isRed,
        })}>
          {/* Left: Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={`/img/icons/CRVinos${logoColorClass}.svg`}
              alt="CR Vinos Logo"
              width={100}
              height={100}
              className="h-28 w-28 md:h-24 md:w-24 mb-3"
            />
            <p className="text-sm uppercase">CR Vinos MX ® | Todos los Derechos Reservados</p>
          </div>
          
          {/* Right: Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-end space-y-3 md:space-y-0 space-x-0 md:space-x-4 text-xs">
            {legalLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.route}
                className={clsx('uppercase transition-colors duration-300 px-3 py-2 md:px-0 md:py-0', {
                  'hover:text-back': isRed,
                  'hover:text-crred/65': !isRed,
                })}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

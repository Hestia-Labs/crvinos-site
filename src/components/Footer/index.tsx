'use client';

import React, { useState } from 'react';
import Icon from '../Icons';
import { useRouter } from 'next/navigation';
import BasicButton from '@/components/Buttons/BasicButton';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert('¡Te has unido a nuestra lista de correo!');
      setEmail('');
    }, 2000);
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <footer className="flex flex-col w-full items-center justify-center z-20 py-8 px-4 md:px-20 bg-transparent text-white">
      <div className='flex flex-col md:flex-row justify-between items-start w-full border-crred border-t-2 py-5'>
            <div className='flex items-start justify-start'>
                <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-12">
                    <div className="flex flex-col items-start space-x-3 justify-center">
                        <Icon name="CRVinosMX" className="h-16 w-16 md:h-48 md:w-48" />
                        <div className="flex items-start justify-start space-x-3">
                            <Icon name="Facebook" className="h-4 w-4 md:h-8 md:w-8" />
                            <Icon name="Instagram" className="h-4 w-4 md:h-8 md:w-8" />
                        </div>
                    </div>
                    <div className="text-crred text-xs md:text-sm lg:text-base">
                    CRVinosMX © 2024  |  Todos los derechos reservados
                    </div>
                </div>
                <div className='flex items-start justify-start py-6'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 py-4 md:py-0 text-xs md:text-sm lg:text-base">
                        {[
                            { name: 'Política de Privacidad', href: '' },
                            { name: 'Cookies', href: '' },
                            { name: 'Nosotros', href: '' },
                            { name: 'Términos y Condiciones', href: '' },
                            { name: 'Aviso Legal', href: '' },
                            { name: 'Contacto', href: '' }
                        ].map((item, index) => (
                            <a key={index} href={item.href} className="text-crred">
                            {item.name}
                            </a>
                        ))}
                    </div>
                </div>
                
            </div>
        <div className="flex flex-col px-4 items-center space-y-3  md:w-1/2">
          <div className="flex flex-col items-center space-y-3 w-full">
            <div className='space-y-6 w-full border-crred border-b py-6 px-1'>
                <h3 className="text-crred text-lg md:text-2xl">Pregunta, comentarios o algún problema?</h3>
                <BasicButton
                onClick={handleContactClick}
                variant='bg-crred'
                sizey='small'
                className='rounded-md'
                >
                Contáctanos
                </BasicButton>
            </div>
            <div className='w-full border-crred border-b py-6 px-1 space-y-6'>
                <h3 className="text-crred text-lg md:text-2xl">Únete a nuestra lista</h3>
                <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 w-full'>
                <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Tu Correo Electrónico"
                    className="border border-crred p-2 rounded w-full text-crred placeholder:text-crred-50"
                    required
                />
                <BasicButton
                    variant='bg-crred'
                    sizey='small'
                    className='rounded-md whitespace-nowrap'
                >
                    {loading ? 'Uniendo...' : 'Únete a nuestra lista'}
                </BasicButton>
                </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

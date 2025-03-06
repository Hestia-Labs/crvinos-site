import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const EventNotFound = () => {
  return (
    <div className="flex flex-col relative space-y-9">
      <Navbar relative red redLogo />
      <div className="flex relative w-full h-full px-4 sm:px-10 md:px-20 flex-col space-y-6">
        <div className="mt-4 space-y-8 w-full">
          <div className="flex flex-col relative space-y-8 w-full items-center">
            <div className="flex flex-col items-center justify-center space-y-6 py-9 px-4 md:px-12 h-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-crred italic tracking-wide mb-2">
                Evento no encontrado
              </h1>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl font-thin text-center">
                Lo sentimos, no pudimos encontrar el evento que estás buscando.
              </p>
              <Link href="/enotourism" className="text-crred underline">
                Volver a eventos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventNotFound;

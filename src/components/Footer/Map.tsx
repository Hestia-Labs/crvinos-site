'use client';
import React from 'react';
import { toast } from 'sonner';
import { useColor } from '@/contexts/ColorContext';

const Map: React.FC = () => {
    const { isRed } = useColor();

    // const handleAddressClick = () => {
    //     const address = "Carr. Chichimequillas-la Griega, 76249 El Lobo, Qro., México";
    //     navigator.clipboard.writeText(address).then(() => {
    //         toast.success("Dirección copiada al portapapeles");
    //     }).catch(err => {
    //         console.error("Failed to copy address: ", err);
    //     });
    // };

    const handleImageClick = () => {
        window.open("https://maps.app.goo.gl/3iamjSSHYSfGSemQ6", "_blank");
    };

    return (
        <div
          onClick={handleImageClick}
          className={`cursor-pointer space-x-1 flex p-2 justify-evenly items-center rounded-lg h-fit border z-30 flex-row sm:space-x-1 space-y-1 sm:flex-row sm:items-center lg:flex-row lg:items-center lg:space-x-1 lg:space-y-0 ${
            isRed ? 'bg-back-90 border-back' : 'bg-back-75 border-crred'
          }`}
        >
          <img 
            src="/img/address.png" 
            alt="Google Maps Location" 
            className={`object-cover sm:w-16 sm:h-16 w-10 h-10 mr-1 rounded-lg border-2 ${
              isRed ? 'border-crred-50' : 'border-back-50'
            } lg:w-16 lg:h-16 cursor-pointer`}
          />
          <div 
            className="flex flex-col items-start justify-center h-full sm:w-40 w-60 md:w-60 lg:w-60"
          >
            <h3 className={`font-semibold sm:text-xs text-xxs lg:text-sm ${
              'text-crred'
            }`}>
              Nuestra Ubicación:
            </h3>
            <p className={`font-semibold sm:text-xxs text-xxxs lg:text-xs break-words ${
               'text-crred'
            }`}>
              Camino Tejocote a San José La Laja km 3.2, Tequisquiapan, Qro., México 
            </p>
          </div>
        </div>
      );
    };
    
    export default Map;
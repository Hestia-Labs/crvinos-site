'use client';
import React from 'react';
import { toast } from 'sonner';

const Map: React.FC = () => {
    // const handleAddressClick = () => {
    //     const address = "Carr. Chichimequillas-la Griega, 76249 El Lobo, Qro., México";
    //     navigator.clipboard.writeText(address).then(() => {
    //         toast.success("Dirección copiada al portapapeles");
    //     }).catch(err => {
    //         console.error("Failed to copy address: ", err);
    //     });
    // };

    const handleImageClick = () => {
        window.open("https://www.google.com/maps/place/RANCHO+SAN+MARTIN/@20.6163015,-100.0205995,17z/data=!4m7!3m6!1s0x85d37bf349f5136f:0xd0d981870247a049!4b1!8m2!3d20.6163015!4d-100.0180246!16s%2Fg%2F11t5dbn819?entry=ttu", "_blank");
    };

    return (
        <div onClick={handleImageClick} className=" cursor-pointer  bg-back-75 space-x-1 flex p-2 justify-evenly items-center rounded-lg h-fit border-crred border z-30 flex-row sm:space-x-1 space-y-1 sm:flex-row sm:items-center lg:flex-row lg:items-center lg:space-x-1 lg:space-y-0">
            <img 
                src="/img/address.png" 
                alt="Google Maps Location" 
                className="object-cover  sm:w-16 sm:h-16 w-10 h-10 mr-1 rounded-lg border-back border-2 lg:w-16 lg:h-16 cursor-pointer"
            />
            <div 
                className="flex flex-col items-start justify-center h-full sm:w-40 w-60 md:w-60 lg:w-60 "
            >
                <h3 className="text-crred font-semibold sm:text-xs text-xxs lg:text-sm">Nuestra Ubicación:</h3>
                <p className="text-crred font-semibold sm:text-xxs text-xxxs lg:text-xs break-words">Camino Tejocote a San José La Laja km 3.2, Tequisquiapan, Qro., México </p>
            </div>
        </div>
    );
};

export default Map;

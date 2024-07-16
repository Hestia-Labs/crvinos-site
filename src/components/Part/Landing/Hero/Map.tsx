'use client';
import React from 'react';
import { toast } from 'sonner';

const Map: React.FC = () => {
    const handleAddressClick = () => {
        const address = "Carr. Chichimequillas-la Griega, 76249 El Lobo, Qro., México";
        navigator.clipboard.writeText(address).then(() => {
            toast.success("Dirección copiada al portapapeles");
        }).catch(err => {
            console.error("Failed to copy address: ", err);
        });
    };

    const handleImageClick = () => {
        window.open("https://www.google.com/maps/place/Carr.+Chichimequillas-la+Griega,+76249+El+Lobo,+Qro.,+México", "_blank");
    };

    return (
        <div className="absolute bottom-8 left-8 bg-back-75 space-x-2 flex p-3 justify-evenly items-center rounded-lg h-fit border-crred border z-50 flex-row  md:space-x-2  space-y-2 md:space-y-0">
            <img 
                src="/img/address.png" 
                alt="Google Maps Location" 
                className=" object-cover md:w-20 md:h-20 w-16 h-16 mr-2 rounded-lg border-back border-2"
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}
            />
            <div 
                className="flex flex-col items-start justify-end h-full cursor-pointer md:w-60 w-30"
                onClick={handleAddressClick}
            >
                <h3 className="text-crred font-semibold md:text-lg text-xs">Nuestra Ubicación:</h3>
                <p className="text-crred font-semibold text-wrap md:text-base text-xs/3">Carr. Chichimequillas-la Griega, 76249 El Lobo, Qro., México</p>
            </div>
        </div>
    );
};

export default Map;

"use client";
import React from 'react';
import { PiArrowDownThin } from "react-icons/pi";
import clsx from 'clsx';
import { useColor } from '@/contexts/ColorContext';

const ScrollToLocation: React.FC = () => {
  const { isRed } = useColor();

  const handleScrollToLocation = () => {
    const locationSection = document.getElementById('locations-section');
    if (locationSection) {
      locationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={clsx(
        "border-b z-10 flex justify-center items-center space-x-1 py-1 px-2 cursor-pointer",
        {
          'border-back text-back': isRed,
          'border-crred text-crred': !isRed,
        }
      )}
      onClick={handleScrollToLocation}
    >
      <PiArrowDownThin className="w-4 h-4 md:w-6 md:h-6" />
      <p className="font-thin text-sm md:text-xl uppercase">Sucursales</p>
    </div>
  );
};

export default ScrollToLocation; 
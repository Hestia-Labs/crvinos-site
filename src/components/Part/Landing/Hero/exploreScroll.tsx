"use client";
import React from 'react';
import { PiArrowDownThin } from "react-icons/pi";

const ExploreScroll: React.FC = () => {
  const handleScrollToBlog = () => {
    const blogSection = document.getElementById('catalog-section');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="border-b border-back absolute bottom-10 left-7 md:bottom-10 md:left-14 z-20 flex justify-center items-center space-x-1 py-1 px-2 cursor-pointer"
      onClick={handleScrollToBlog}
    >
      <PiArrowDownThin className="w-4 h-4 md:w-6 md:h-6 text-white" />
      <p className="text-white font-thin text-sm md:text-xl uppercase">Explora</p>
    </div>
  );
};

export default ExploreScroll;

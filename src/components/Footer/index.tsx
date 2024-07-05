import React from 'react';
import CatalogueButton from './CatalogueButton';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-between items-end px-5 py-5 bg-transparent z-20">
      <div className="flex items-center">
        <div className="text-white lg:text-base md:text-sm   text-xs">
          © 2024 CRVinosMX
        </div>
      </div>
      <div className="flex items-center">
        <CatalogueButton />
      </div>
    </footer>
  );
};

export default Footer;

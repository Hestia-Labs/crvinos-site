import React from 'react';
import Navbar from './Navbar';

const Loading: React.FC = () => {
  return (
    <>
      <Navbar clearBg redLogo red relative />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full border-t-crred animate-spin"></div>
        <p className="mt-4 text-gray-600">Cargando...</p>
      </div>
    </>
  );
};

export default Loading;
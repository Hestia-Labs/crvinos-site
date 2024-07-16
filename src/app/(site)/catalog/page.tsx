import Navbar from '@/components/Navbar';
import React from 'react';
import Catalog from '@/components/Part/Catalog';

const CatalogPage = () => {
  return (
    <div className=''>
        <Navbar red relative/>
        <div className='flex flex-col w-full items-center justify-center bg-back  space-y-7 '>
            {/* <div className='flex flex-col justify-center items-center w-full  py-8 px-36'>
                <h2 className="text-4xl text-crred  tracking-wide mb-2">Colección de Vinos</h2>
                <p className="text-crred font-extralight italic text-lg text-center">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div> */}
            
            {/* <div className='px-20 w-full relative'>
                <div className="w-full h-2 border-crred border-t-2 "></div>
            </div> */}
            
            <Catalog/>
        </div>
    </div>
    
  );
};

export default CatalogPage;


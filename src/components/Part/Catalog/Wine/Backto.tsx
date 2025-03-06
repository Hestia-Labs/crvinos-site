'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icons';

const BackToCatalogLink = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push('/catalog');
      }}
      className="flex items-center space-x-4 transition duration-500 ease-in-out transform hover:-translate-x-2 cursor-pointer mt-4"
    >
      <Icon
        name="Arrow"
        className="h-5 w-5 transition-transform duration-500 ease-in-out transform hover:translate-x-2"
        style={{ transform: 'rotate(180deg)' }}
      />
      <p className=" text-crred transition-colors duration-500 ease-in-out hover:text-crred-light">
        Catalogo
      </p>
    </div>
  );
};

export default BackToCatalogLink;

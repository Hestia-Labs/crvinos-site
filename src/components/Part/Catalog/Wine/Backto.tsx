'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Icon from '@/components/Icons';

const BackToCatalogLink = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract the line from the pathname (assuming format: /catalog/[line]/[slug])
  const pathParts = pathname.split('/');
  const line = pathParts.length >= 3 ? pathParts[2] : '';
  
  // Build the catalog link with the line query parameter if available
  const catalogLink = line ? `/catalog/${line}` : '/catalog';

  return (
    <div
      onClick={() => {
        router.push(catalogLink);
      }}
      className="flex items-center space-x-4 transition duration-500 ease-in-out transform hover:-translate-x-2 cursor-pointer mt-4"
    >
      <Icon
        name="Arrow"
        className="h-5 w-5 transition-transform duration-500 ease-in-out transform hover:translate-x-2"
        style={{ transform: 'rotate(180deg)' }}
      />
      <p className="text-crred transition-colors duration-500 ease-in-out hover:text-crred-light">
        Volver al Catálogo
      </p>
    </div>
  );
};

export default BackToCatalogLink;

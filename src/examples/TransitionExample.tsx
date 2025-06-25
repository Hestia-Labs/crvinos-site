'use client';

import React from 'react';
import TransitionLink from '@/components/TransitionLink';
import { useTransition } from '@/contexts/TransitionContext';

export default function TransitionExample() {
  const { startTransition } = useTransition();

  const handleProgrammaticNavigation = (e: React.MouseEvent<HTMLButtonElement>, path: string) => {
    e.preventDefault();
    startTransition(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">CR Vinos - Transiciones de Página</h1>
        
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Enlaces con Transición</h2>
          <p className="mb-4 text-gray-700">
            Haz clic en cualquiera de estos enlaces para ver la transición en acción. La animación mostrará el logo de CR Vinos mientras se carga la nueva página.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <TransitionLink 
              href="/" 
              className="px-4 py-2 bg-crred text-white rounded hover:bg-red-800 transition-colors"
            >
              Inicio
            </TransitionLink>
            <TransitionLink 
              href="/about" 
              className="px-4 py-2 bg-crred text-white rounded hover:bg-red-800 transition-colors"
            >
              Nosotros
            </TransitionLink>
            <TransitionLink 
              href="/catalog" 
              className="px-4 py-2 bg-crred text-white rounded hover:bg-red-800 transition-colors"
            >
              Catálogo
            </TransitionLink>
            <TransitionLink 
              href="/experiences" 
              className="px-4 py-2 bg-crred text-white rounded hover:bg-red-800 transition-colors"
            >
              Experiencias
            </TransitionLink>
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Navegación Programática</h2>
          <p className="mb-4 text-gray-700">
            Estos botones usan el hook <code>useTransition</code> para navegar programáticamente.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <button 
              onClick={(e) => handleProgrammaticNavigation(e, '/')}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Ir a Inicio
            </button>
            <button 
              onClick={(e) => handleProgrammaticNavigation(e, '/about')}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Ir a Nosotros
            </button>
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Enlaces sin Transición</h2>
          <p className="mb-4 text-gray-700">
            Los enlaces externos y los anchorlinks no disparan la animación de transición.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <TransitionLink 
              href="https://google.com" 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Enlace Externo
            </TransitionLink>
            <TransitionLink 
              href="#section" 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Enlace Ancla
            </TransitionLink>
          </div>
        </div>
        
        <div id="section" className="p-6 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-4">Sección Ancla</h2>
          <p className="text-gray-700">
            Esta es la sección a la que lleva el enlace de ancla.
          </p>
        </div>
      </div>
    </div>
  );
} 
'use client';

import React from 'react';
import Link from 'next/link';
import TransitionLink from '@/components/TransitionLink';
import { useTransition } from '@/contexts/TransitionContext';

export default function NavigationExample() {
  const { startTransition } = useTransition();
  
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Navegación con Transiciones</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Comparación de Enlaces</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-3">Enlaces Estándar</h3>
              <p className="text-gray-600 mb-4">Estos enlaces usan el componente Link estándar de Next.js. No muestran animación durante la navegación.</p>
              
              <div className="flex gap-3">
                <Link href="/" className="px-4 py-2 bg-gray-200 rounded">
                  Inicio
                </Link>
                <Link href="/about" className="px-4 py-2 bg-gray-200 rounded">
                  Nosotros
                </Link>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-3">Enlaces con Transición</h3>
              <p className="text-gray-600 mb-4">Estos enlaces usan el componente TransitionLink. Muestran la animación del logo durante la navegación.</p>
              
              <div className="flex gap-3">
                <TransitionLink href="/" className="px-4 py-2 bg-crred text-white rounded">
                  Inicio
                </TransitionLink>
                <TransitionLink href="/about" className="px-4 py-2 bg-crred text-white rounded">
                  Nosotros
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Navegación Programática</h2>
          <p className="text-gray-600 mb-4">También puedes iniciar transiciones programáticamente usando el hook <code>useTransition</code>.</p>
          
          <div className="flex gap-3">
            <button 
              onClick={() => startTransition('/')}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              Ir a Inicio
            </button>
            
            <button 
              onClick={() => startTransition('/about')}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              Ir a Nosotros
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">En Componentes de Navegación</h2>
          <p className="text-gray-600 mb-4">Reemplaza los enlaces en tu Navbar y otros componentes de navegación:</p>
          
          <div className="bg-gray-900 text-white p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
{`// Antes
import Link from 'next/link';

<Link href="/about">Nosotros</Link>

// Después
import TransitionLink from '@/components/TransitionLink';

<TransitionLink href="/about">Nosotros</TransitionLink>`}
            </pre>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Enlace a Página de Ejemplo</h2>
          <TransitionLink 
            href="/transition-example" 
            className="inline-block px-6 py-3 bg-crred text-white font-medium rounded-lg hover:bg-red-800 transition-colors"
          >
            Ver Página de Ejemplo
          </TransitionLink>
        </div>
      </div>
    </div>
  );
} 
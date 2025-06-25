import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Página No Encontrada | CR Vinos MX",
  description: "La página que buscas no pudo ser encontrada. Verifica la URL o regresa a la página principal.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['404', 'página no encontrada', 'error', 'CR Vinos MX'],
};

const NotFound: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#faf9f7]">
      <Navbar clearBg redLogo red />
      
      <div className="flex-1 flex items-center justify-center px-4 py-16 md:py-20">
        <div className="max-w-3xl w-full mx-auto">

          <div className="mb-12 flex justify-center">
            <div className="w-px h-20 bg-crred opacity-70"></div>
          </div>
          
          <div className="text-center space-y-8 animate-[fadeIn_0.9s_ease-out_forwards]">
            <h1 className="text-5xl md:text-7xl font-light text-crred italic tracking-wide">
              404
            </h1>
            
            <div className="space-y-4">
              <h2 className="text-xl md:text-4xl text-crred font-light cormorant-garamond italic tracking-wide">
                Página no encontrada
              </h2>
              
              <p className="text-neutral-700 max-w-lg mx-auto font-light leading-relaxed text-xl">
                Lo sentimos, la página que está buscando no existe o ha sido removida.
              </p>
            </div>
            
            <div className="w-16 h-px bg-crred/30 mx-auto my-8"></div>
            
            <nav className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-0">
              <Link 
                href="/" 
                className="py-4 sm:py-2 px-6 text-lg font-light tracking-wide text-neutral-700 hover:text-crred transition-colors duration-300 block relative group"
              >
                Inicio
                <div className="absolute bottom-0 left-1/2 w-0 h-px bg-crred transform -translate-x-1/2 transition-all duration-300 group-hover:w-1/2"></div>
              </Link>
              
              <span className="hidden sm:inline text-neutral-300 mx-2">•</span>
              
              <Link 
                href="/catalog" 
                className="py-4 sm:py-2 px-6 text-lg font-light tracking-wide text-neutral-700 hover:text-crred transition-colors duration-300 block relative group"
              >
                Catálogo
                <div className="absolute bottom-0 left-1/2 w-0 h-px bg-crred transform -translate-x-1/2 transition-all duration-300 group-hover:w-1/2"></div>
              </Link>
              
              <span className="hidden sm:inline text-neutral-300 mx-2">•</span>
              
              <Link 
                href="/contact" 
                className="py-4 sm:py-2 px-6 text-lg font-light tracking-wide text-neutral-700 hover:text-crred transition-colors duration-300 block relative group"
              >
                Contacto
                <div className="absolute bottom-0 left-1/2 w-0 h-px bg-crred transform -translate-x-1/2 transition-all duration-300 group-hover:w-1/2"></div>
              </Link>
            </nav>
            
            <p className="text-neutral-500 font-light text-base mt-12">
              O regrese a <BackButton className="text-crred hover:underline italic">la página anterior</BackButton> para continuar navegando
            </p>
          </div>
        </div>
      </div>
      
      <div className="py-8 border-t border-neutral-200">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} CR Vinos MX. Todos los derechos reservados.
          </p>
        </div>
      </div>
      
      <div className="absolute top-1/3 left-0 w-28 h-px bg-crred/20"></div>
      <div className="absolute top-1/3 right-0 w-28 h-px bg-crred/20"></div>
      <div className="absolute bottom-1/3 left-0 w-40 h-px bg-crred/20"></div>
      <div className="absolute bottom-1/3 right-0 w-40 h-px bg-crred/20"></div>
    </div>
  );
};

export default NotFound;

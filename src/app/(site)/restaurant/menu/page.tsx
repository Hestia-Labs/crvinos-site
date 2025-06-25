import React from 'react';
import Navbar from '@/components/Navbar';
import BasicButton from '@/components/Buttons/BasicButton';
import Icon from '@/components/Icons';
import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Menú | CR Vinos MX | Cartinto House",
  description: "Explora el menú de Cartinto House en CR Vinos MX, donde la cocina campestre se encuentra con la tradición vinícola mexicana.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['Menú', 'Cartinto House', 'CR Vinos MX', 'cocina campestre', 'tradición vinícola mexicana'],
  openGraph: {
    title: "Menú | CR Vinos MX | Cartinto House",
    description: "Explora el menú de Cartinto House en CR Vinos MX, donde la cocina campestre se encuentra con la tradición vinícola mexicana.",
    url: `${siteUrl}/restaurant/menu`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/crvinosmxLogo.jpg`,
        width: 300,
        height: 225,
        alt: "Cartinto House Menu",
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Menú | CR Vinos MX | Cartinto House',
    description: 'Explora el menú de Cartinto House en CR Vinos MX, donde la cocina campestre se encuentra con la tradición vinícola mexicana.',
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/restaurant/menu`,
    languages: {
      'es-ES': `${siteUrl}/restaurant/menu`,
    },
  },
  
  appleWebApp: {
    title: 'Cartinto House',
    statusBarStyle: 'black-translucent',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const MenuPage: React.FC = () => {
  return (
    <div className="relative ">
      <Navbar relative redLogo red />

      {/* === Main Container === */}
      <main className="px-8 sm:px-10 md:px-20 w-full flex flex-col items-center py-16">

        <div className="absolute top-0 left-0 -z-10 opacity-10 w-full">
          <Icon name="FullVines" className="h-full w-full" />
        </div>

        {/* Heading */}
        <div className="max-w-6xl w-full flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-crred font-light cormorant-garamond-italic mb-6">
            Explora Nuestros Menús
          </h1>
          <p className="text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed">
            Conoce nuestras diferentes opciones gastronómicas y disfruta de la experiencia completa
            que <strong>Cartinto House</strong> ofrece.
          </p>
        </div>

        {/* Grid of Menu Options */}
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {/* Spanish Food Menu */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md border border-crred/20 p-6 text-center">
            <h2 className="text-2xl text-crred cormorant-garamond mb-2">Menú de Alimentos</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Disfruta de nuestros platillos más representativos con ingredientes frescos y locales.
            </p>
            <BasicButton
              link="https://crvinosmx.com/docs/MenuAlimentosEspanol.pdf"
              variant="transparent"
              className="border border-crred"
            >
              Ver Menú (Español)
            </BasicButton>
          </div>

          {/* English Food Menu */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md border border-crred/20 p-6 text-center">
            <h2 className="text-2xl text-crred cormorant-garamond mb-2">Food Menu</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Explore our fresh, local flavors. Enjoy the best of our signature dishes in English.
            </p>
            <BasicButton
              link="https://crvinosmx.com/docs/MenuAlimentosIngles.pdf" 
              variant="transparent"
              className="border border-crred"
            >
              View Menu (English)
            </BasicButton>
          </div>

          {/* Drinks Menu */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md border border-crred/20 p-6 text-center">
            <h2 className="text-2xl text-crred cormorant-garamond mb-2">Menú de Vinos</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Acompaña tus platillos con nuestros vinos y maridajes perfectos.
            </p>
            <BasicButton
              link="https://crvinosmx.com/docs/menudevinos.pdf" 
              variant="transparent"
              className="border border-crred"
            >
              Ver Menú de Vinos
            </BasicButton>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm md:text-lg text-gray-500 mt-8">
          NUESTROS PRECIOS ESTÁN SUJETOS A CAMBIOS SIN PREVIO AVISO
        </p>
      </main>
    </div>
  );
};

export default MenuPage;

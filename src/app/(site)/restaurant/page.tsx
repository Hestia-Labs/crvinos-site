
import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import LoadingScreen from '@/components/Loaders/LoadingScreen';
import Icon from '@/components/Icons';
import BasicButton from '@/components/Buttons/BasicButton';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getImagesByLocationIds } from '@/app/actions/getImagebyLocation';


const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Cartinto House | CR Vinos MX | Cocina Campestre",
  description: "Descubre Cartinto House en CR Vinos MX, donde la cocina campestre se encuentra con la tradición vinícola mexicana.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['Cartinto House', 'CR Vinos MX', 'cocina campestre', 'tradición vinícola mexicana'],
  openGraph: {
    title: "Cartinto House | CR Vinos MX | Cocina Campestre",
    description: "Descubre Cartinto House en CR Vinos MX, donde la cocina campestre se encuentra con la tradición vinícola mexicana.",
    url: `${siteUrl}/restaurant`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/restaurantMain.jpg`,
        width: 300,
        height: 225,
        alt: "Cartinto House Hero",
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cartinto House | CR Vinos MX | Cocina Campestre',
    description: 'Descubre Cartinto House en CR Vinos MX, donde la cocina campestre se encuentra con la tradición vinícola mexicana.',
    images: [`${siteUrl}/img/restaurantMain.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/restaurant`,
    languages: {
      'es-ES': `${siteUrl}/restaurant`,
    },
  },
  verification: {
    google: 'google-verification-code',
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

const RestaurantPage: React.FC = async () => {
  const restaurantImage = await getImagesByLocationIds(['rest-banner'])
  return (
    <div className="relative">
      <Navbar />
      <LoadingScreen animationDuration={3} displayDuration={1} />

      {/* ===== Hero / Banner Section ===== */}
      <div className="relative h-126 md:h-144 overflow-hidden rounded-bl-3xl rounded-br-3xl">
        {/* Hero Background Image */}
        <Image
            src={restaurantImage[0].image.asset.url || '/img/restaurantMain.jpg'}
            alt={'Foto de Cartinto House'}
            fill
            sizes="100vw"
            className="w-full h-126 md:h-144 object-cover"
            priority
          />
        <div className="absolute inset-0 bg-black opacity-40" />
       

        {/* Heading & Subheading at bottom-left */}
        <div className="absolute bottom-0 left-0 p-8 sm:p-12 md:p-16 lg:p-20">
          <h2 className="text-5xl sm:text-6xl md:text-7xl italic cormorant-garamond-italic text-white drop-shadow-md">
            Cartinto House
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-white mt-4 drop-shadow-md">
            Donde la cocina se encuentra con la tradición vinícola Mexicana
          </p>
        </div>
      </div>

      {/* ===== Decorative Icon (Optional) ===== */}
      <div className="absolute top-100 -z-10 mt-14">
        <Icon
          name="Vines"
          className="relative h-80 w-full md:h-144 opacity-25"
        />
      </div>

      {/* ===== Introduction Section ===== */}
      <section className="px-8 sm:px-10 md:px-20 w-full flex flex-col items-center pb-10">
        <div className="flex flex-col w-full items-start gap-8 pb-10 border-crred border-b-2 px-6"> 
          <div className="mt-16 max-w-6xl mx-auto">
                <h3 className="text-3xl md:text-4xl text-crred font-light tracking-wide mb-4">
                Cocina Campestre en el Corazón de Querétaro
                </h3>
                <div className="h-1 w-32 bg-crred mb-6" />
                <p className="text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed">
                <strong>Cartinto House</strong>, un lugar donde la <strong>Cocina Campestre</strong> se encuentra
                con la tradición vinícola de Querétaro, México. Nuestro restaurante ofrece una experiencia
                culinaria única, fusionando sabores de ingredientes locales y de temporada para llevar a tu
                mesa la frescura de la región.
                </p>
                <p className="mt-6 text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed">
                Disfruta de una variedad de platillos que van desde entradas ligeras y ensaladas con vegetales
                orgánicos hasta pastas artesanales, pizzas al horno de leña y cortes a la parrilla. Cada bocado
                está diseñado para realzar tu experiencia gastronómica, acompañado de nuestros vinos producidos
                en casa, perfectamente maridados para resaltar sus aromas y texturas.
                </p>
                <p className="mt-6 text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed">
                En <strong>Cartinto House</strong>, no solo disfrutarás de la comida, sino también de la belleza
                natural de nuestros atardeceres. Relájate con una copa de vino de nuestra amplia selección y
                descubre por qué somos el lugar ideal para disfrutar tanto de la gastronomía como de la naturaleza.
                </p>
            </div>
        </div>
      </section>

      {/* ===== Hours & Reservation Section ===== */}
      <section className="px-8 sm:px-10 md:px-20 w-full flex flex-col items-center py-10">
        <div className="max-w-6xl w-full pb-14 border-crred border-b-2 px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-8">
            {/* Info Text */}
            <div>
              <h4 className="text-2xl md:text-3xl text-crred font-light cormorant-garamond mb-4">
                Horarios y Reservaciones
              </h4>
              <div className="h-1 w-32 bg-crred mb-6" />
              <p className="text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed">
                Estamos abiertos <strong>Miércoles a Domingo</strong> de <strong>12:00 p.m. a 7:00 p.m.</strong>
              </p>
              <p className="mt-4 text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed">
                Para reservar tu lugar, contáctanos al teléfono:{' '}
                <br />
                <a href="tel:+524427732600" className="text-crred underline">
                  +52 442 773 2600
                </a>
              </p>
              <div className="mt-4 text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed">
                Ubicación: 
                <Link href="https://maps.app.goo.gl/CYSfaSxypWzmyctUA" className="text-crred underline hover:text-opacity-75 transition-opacity duration-300" target="_blank" rel="noopener noreferrer">
                <p>Camino Tejocote a San José La Laja km 3.2</p>
                <p>Tequisquiapan, Qro., México</p>
                </Link>
              </div>
            </div>
            <div className="relative w-full md:w-1/2 h-64 md:h-80">
              <Image
                src="/img/restaurantSec.jpg"
                alt="Cartinto House Restaurant"
                fill
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Menu Section ===== */}
      <section className="px-8 sm:px-10 md:px-20 w-full flex flex-col items-center py-16">
        <div className="max-w-6xl pb-14 mx-auto px-6 border-crred border-b border-opacity-35">
          <h4 className="text-3xl md:text-4xl text-crred font-light tracking-wide mb-4">
            Menú Destacado
          </h4>
          <div className="h-1 w-32 bg-crred mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Entradas */}
            <div>
              <h5 className="text-2xl text-crred cormorant-garamond mb-4">Entradas</h5>
              <ul className="space-y-4 text-gray-700 leading-relaxed">
                <li>
                  <strong>Tartar de Atún Spicy:</strong> Cubos de atún fresco con mayonesa de siracha,
                  láminas de aguacate y ensaladilla de pepino sunomono.
                </li>
                <li>
                  <strong>Portobello Ripieno:</strong> Hongo portobello asado a la parrilla,
                  relleno de picadillo de ribeye y queso de cabra, servido sobre espejo de
                  salsa basilico.
                </li>
              </ul>
            </div>

            {/* Pastas */}
            <div>
              <h5 className="text-2xl text-crred cormorant-garamond mb-4">Pastas</h5>
              <ul className="space-y-4 text-gray-700 leading-relaxed">
                <li>
                  <strong>Fetuccine Prosciutto &amp; Funghi:</strong> Salsa cremosa con jamón
                  prosciutto y champiñones salteados, sobre fettuccine fresco.
                </li>
                <li>
                  <strong>Lasagna Napolitana:</strong> Láminas de pasta casera rellenas de bechamel,
                  ragout de ternera y queso mozzarella, horneada en nuestro horno de leña.
                </li>
              </ul>
            </div>

            {/* Cortes & Parrilla */}
            <div>
              <h5 className="text-2xl text-crred cormorant-garamond mb-4">Cortes y Parrilla</h5>
              <ul className="space-y-4 text-gray-700 leading-relaxed">
                <li>
                  <strong>Vacio en Salsa de Vino Blanco y Queso de Cabra:</strong> Corte de vacio
                  (300 g) bañado en salsa de vino blanco y queso de cabra, cebollas al balsámico.
                </li>
                <li>
                  <strong>Cowboy (800 g):</strong> A la parrilla, servido con mantequilla de tuétano
                  y chiltepín. Guarnición a elegir.
                </li>
              </ul>
            </div>

            {/* Pizzas */}
            <div>
              <h5 className="text-2xl text-crred cormorant-garamond mb-4">Pizzas</h5>
              <ul className="space-y-4 text-gray-700 leading-relaxed">
                <li>
                  <strong>Fugazzeta:</strong> Pizza rellena de salsa bianca y mozzarella, cubierta
                  con cebolla caramelizada al balsámico y tocino.
                </li>
                <li>
                  <strong>Ibérica:</strong> Salsa pomodoro, mozzarella, jamón serrano, arúgula y
                  reducción de balsámico.
                </li>
              </ul>
            </div>
          </div>

         
          <div className="text-center mt-14">
            <BasicButton
              link="/restaurant/menu"
              variant="transparent"
              className="border border-crred"
            >
              Explora Nuestros Menús
            </BasicButton>
          </div>
        </div>
      </section>

      {/* ===== Closing / Invitation ===== */}
      <section className="px-8 sm:px-10 md:px-20 w-full flex flex-col items-center pb-16">
            <div className="max-w-4xl text-center space-y-6">
                <h4 className="text-3xl md:text-4xl text-crred font-light tracking-wide">
                ¡Te esperamos!
                </h4>
                <p className="text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed">
                Acompáñanos a vivir una experiencia gastronómica distinta: disfruta de los sabores de la
                cocina campestre y de la belleza de nuestros atardeceres en un entorno incomparable.
                <br />
                <strong>¡Ven y descubre Cartinto House en CR Vinos!</strong>
                </p>
            </div>
            
            
            {/* <div className="mt-6">
                <Image
                src="/img/cartintoHouse.png"
                alt="Cartinto House Logo"
                width={400}       
                height={400}     
                className="object-contain "
                />
            </div> */}
        </section>

    </div>
  );
};

export default RestaurantPage;

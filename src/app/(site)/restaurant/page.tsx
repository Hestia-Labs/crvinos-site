import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Icon from '@/components/Icons';
import BasicButton from '@/components/Buttons/BasicButton';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getImagesByLocationIds } from '@/app/actions/getImagebyLocation';


const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Cartinto House | Restaurante en CR Vinos MX | Cocina Campestre y Maridaje en Querétaro",
  description: "Disfruta de la exquisita cocina campestre de Cartinto House en CR Vinos MX. Un restaurante único en Querétaro donde la gastronomía regional se fusiona con nuestra tradición vinícola para crear una experiencia culinaria incomparable.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['Cartinto House', 'restaurante en viñedo', 'cocina campestre Querétaro', 'restaurante de vino México', 'maridaje vino mexicano', 'gastronomía regional', 'comida gourmet Querétaro', 'restaurante gourmet', 'cocina de autor', 'comida y vino', 'experiencia gastronómica', 'ingredientes locales', 'restaurante campestre', 'mejores restaurantes Querétaro', 'cocina Tequisquiapan', 'restaurante con vista a viñedo', 'food and wine México', 'restaurante CR Vinos', 'alta cocina México', 'restaurante romántico Querétaro', 'cena en viñedo', 'gastronomía mexicana contemporánea', 'reservaciones restaurante viñedo', 'comida regional', 'farm-to-table México'],
  openGraph: {
    title: "Cartinto House | Restaurante en CR Vinos MX | Cocina Campestre y Maridaje en Querétaro",
    description: "Disfruta de la exquisita cocina campestre de Cartinto House en CR Vinos MX. Un restaurante único en Querétaro donde la gastronomía regional se fusiona con nuestra tradición vinícola para crear una experiencia culinaria incomparable.",
    url: `${siteUrl}/restaurant`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/restaurantMain.jpg`,
        width: 300,
        height: 225,
        alt: "Cartinto House Restaurante en Viñedo",
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cartinto House | Restaurante en CR Vinos MX | Cocina Campestre y Maridaje en Querétaro',
    description: 'Disfruta de la exquisita cocina campestre de Cartinto House en CR Vinos MX. Un restaurante único en Querétaro donde la gastronomía regional se fusiona con nuestra tradición vinícola para crear una experiencia culinaria incomparable.',
    images: [`${siteUrl}/img/restaurantMain.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/restaurant`,
    languages: {
      'es-ES': `${siteUrl}/restaurant`,
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

const RestaurantPage: React.FC = async () => {
  const restaurantImage = await getImagesByLocationIds(['rest-banner'])
  return (
    <div className="relative">
      <Navbar />

      {/* ===== Hero / Banner Section ===== */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden rounded-bl-3xl rounded-br-3xl">
        {/* Hero Background Image */}
        <Image
              src={restaurantImage[0]?.image.asset.url || ""}
              alt={'Enoturismo Banner'}
              fill
              sizes="(max-width: 768px) 100vw, 1920px"
              quality={75}
              className="object-cover"
              priority
              loading="eager"
              placeholder="blur"
              blurDataURL={`${restaurantImage[0]?.image.asset.url}?w=10&q=10`}
            />
        <div className="absolute inset-0 bg-black opacity-40" />
       

        {/* Heading & Subheading at bottom-left */}
        <div className="absolute bottom-0 left-0 text-back p-6 md:p-12 ">
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-semibold italic text-white drop-shadow-md">
            Cartinto House
          </h2>
          <div className="w-24 h-0.5 bg-white/70 my-6"></div>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-2xl">
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
              
              {/* WhatsApp Reservation Button */}
              <div className="mt-6">
                <a 
                  href="https://wa.me/524427732600?text=Hola%2C%20me%20gustaría%20hacer%20una%20reservación%20en%20Cartinto%20House." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb756] text-white py-2.5 px-4 rounded-md transition-all shadow-sm group"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="font-light tracking-wide">
                    Reservar por WhatsApp
                  </span>
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-200">→</span>
                </a>
              </div>
              
              <div className="mt-6 text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed">
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

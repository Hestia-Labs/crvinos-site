'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import EmblaCarousel from '@/components/Carousels/Embla/EmblaCarousel';
import VinificationProcess from '@/components/Part/About/VinificationProcess';

const carouselItems = [
  {
    title: 'El Viñedo',
    image: '/img/vinedo.jpg',
    text: 'Explora la esencia de nuestro viñedo, un lugar donde la tradición y la naturaleza se fusionan. Cada uva es cuidada con pasión para crear vinos excepcionales. Pasea por nuestros campos y descubre el arte de la vinificación mientras te conectas con el entorno natural. Nuestro viñedo es un santuario de serenidad, donde la tierra nutre nuestras uvas bajo un cielo abierto. Cada visita es un viaje hacia la historia y la dedicación que ponemos en cada botella.',
  },
  {
    title: 'El Restaurante',
    image: '/img/restaurant.jpeg',
    text: 'Vive una experiencia gastronómica inolvidable en nuestro restaurante italiano-argentino, donde la tradición culinaria se encuentra con nuestros vinos selectos. Nuestro chef crea platos que realzan los sabores únicos de nuestros vinos, usando ingredientes frescos y locales. Cada comida es una obra maestra que celebra la armonía entre la gastronomía y la enología, desde los aperitivos hasta los postres. Aquí, la comida y el vino se unen en perfecta sintonía.',
  },
  {
    title: 'La Bodega',
    image: '/img/barrels.jpg',
    text: 'Sumérgete en nuestra bodega, donde el vino toma vida en su máximo esplendor. En este ambiente controlado, nuestras barricas de roble transforman el vino, añadiendo capas de sabor y aroma. La bodega es el núcleo de nuestra pasión por la vinificación, donde cada barrica y botella refleja años de experiencia y dedicación. Al visitar la bodega, descubrirás el esmero y el detalle en cada etapa, desde la fermentación hasta el embotellado, que hacen de nuestro vino algo especial.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="relative  ">
      <Navbar />
      <div className='space-y-9 relative h-full w-full overflow-hidden'>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <Image src="/img/barrels.jpg" alt="Banner Image" width={0} height={0} sizes="100vw" className="w-full h-160 object-cover" priority />
            <div className="absolute inset-0 bg-back opacity-15"></div>
            <div className="absolute bottom-0 left-0 text-back p-8 sm:p-10 md:p-12 lg:p-16 xl:p-24">
                <div className='space-y-6'>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-semibold cormorant-garamond-semibold-italic">Nuestra Historia</h2>
                    <div className='w-full sm:w-5/6 md:w-3/4'>
                    <p className="text-sm sm:text-sm md:text-base lg:text-lg  cormorant-garamond">
                      Somos un equipo apasionado dedicado a traerte los mejores vinos de nuestra tierra. <strong>CRVinosMX</strong> comenzó este viaje con amor por el vino, y por el deseo de compartir ese amor con los demás. Cada botella de nuestra de colección cuenta una historia única, inspirada en la vida de hombres y mujeres excepcionales. Celebra el legado de personas extraordinarias a través de los ricos sabores y aromas de <strong>CRVinosMX</strong>.
                    </p>
                    <p className="text-sm sm:text-sm md:text-base lg:text-lg  cormorant-garamond mt-4">
                    La historia de <strong>CRVinosMX</strong> comenzó en el corazón de México, donde el suelo fértil y el clima perfecto crean las condiciones ideales para cultivar uvas estupendas. A lo largo de los años hemos perfeccionado el cultivo de la vid y la elaboración del vino, combinando técnicas tradicionales con innovaciones modernas para producir vinos contemporáneos que se tornan atemporales. La calidad y la excelencia son compromiso inquebrantable de <strong>CRVinosMX</strong>  , y nos enorgullecemos de cada botella que lleva este nombre. Desde el viñedo hasta tu copa, te invitamos a experimentar con pasión cada sorbo de nuestro vino.

                    </p>
                    </div>
                </div>
            </div>
        </motion.div>
        <div className='px-8 sm:px-10 md:px-20 w-full relative'>
            <div className="w-full h-2 border-crred border-t-2"></div>
        </div>
        <div className="w-full flex justify-center items-center px-8 sm:px-10 md:px-20">
            <EmblaCarousel slides={carouselItems} options={{ loop: true }} />
        </div>
        <div className='px-8 sm:px-10 md:px-20 w-full relative'>
            <div className="w-full h-2 border-crred border-t-2"></div>
        </div>
        <VinificationProcess/>
      </div>
    </div>
  );
};

export default AboutPage;

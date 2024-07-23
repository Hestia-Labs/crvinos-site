// pages/about.js
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import EmblaCarousel from '@/components/Carousels/Embla/EmblaCarousel';

const carouselItems = [
  {
    title: 'El Viñedo',
    image: '/img/vinedo.jpg',
    text: 'Descubre la belleza y la tradición de nuestro viñedo, donde cada uva es cultivada con esmero y dedicación para producir vinos de la más alta calidad. Pasea por nuestros campos y siente la conexión con la naturaleza mientras aprendes sobre el proceso de vinificación. Nuestro viñedo no solo es un lugar de trabajo, sino también un refugio de paz y serenidad, donde la tierra y el cielo se encuentran para crear un entorno perfecto para el crecimiento de nuestras uvas. Cada visita al viñedo es una oportunidad para sumergirse en la historia y la pasión que ponemos en cada botella de vino.'
  },
  {
    title: 'El Restaurante',
    image: '/img/restaurant.jpeg',
    text: 'Disfruta de una experiencia culinaria única en nuestro restaurante, donde los sabores de nuestros vinos se complementan perfectamente con platos exquisitos. Nuestro chef utiliza ingredientes frescos y locales para crear menús que deleitan todos los sentidos. Cada plato es una obra de arte, diseñada para resaltar las notas distintivas de nuestros vinos. Desde aperitivos hasta postres, cada bocado es una celebración de la gastronomía y la enología. Nuestro restaurante no es solo un lugar para comer, sino un destino para experimentar la armonía entre la comida y el vino en su máxima expresión.'
  },
  {
    title: 'La Bodega',
    image: '/img/barrels.jpg',
    text: 'Explora nuestra bodega, un lugar donde la magia del vino cobra vida. Aquí, en un ambiente controlado, nuestras barricas de roble añejan el vino a la perfección, desarrollando sabores y aromas complejos que te sorprenderán. La bodega es el corazón de nuestra operación, donde la ciencia y el arte de la vinificación se unen. Cada barrica cuenta una historia, y cada botella es el resultado de años de dedicación y experiencia. Al recorrer la bodega, podrás apreciar el cuidado y la atención al detalle que ponemos en cada etapa del proceso de elaboración del vino, desde la fermentación hasta el embotellado.'
  },
];

const AboutPage = () => {
  return (
    <div className="relative  ">
      <Navbar />
      <div className='space-y-9 relative h-full w-full'>

        
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <Image src="/img/barrels.jpg" alt="Banner Image" width={0} height={0} sizes="100vw" className="w-full h-160 object-cover" priority />
            <div className="absolute inset-0 bg-back opacity-15"></div>

            <div className="absolute bottom-0 left-0 text-back p-24">
            <div className='space-y-6'>
                <h2 className="text-8xl font-semibold cormorant-garamond-semibold-italic">Nuestra Historia</h2>
                <div className='w-3/4'>
                <p className="text-sm cormorant-garamond-bold">
                    Somos un equipo apasionado dedicado a traerte los mejores vinos de todo el mundo. Nuestro viaje comenzó con un amor por el vino y un deseo de compartir ese amor con los demás. Cada botella en nuestra colección cuenta una historia única, inspirada en las vidas de personas extraordinarias. Únete a nosotros para celebrar su legado a través de los ricos sabores y aromas de nuestros vinos.
                </p>
                <p className="text-sm cormorant-garamond-bold mt-4">
                    Nuestra historia comenzó en el corazón de México, donde el suelo rico y el clima perfecto crean las condiciones ideales para cultivar uvas excepcionales. A lo largo de los años, hemos perfeccionado nuestro oficio, combinando técnicas tradicionales con innovaciones modernas para producir vinos que son tanto atemporales como contemporáneos. Nuestro compromiso con la calidad y la excelencia es inquebrantable, y nos enorgullecemos de cada botella que lleva nuestro nombre. Desde el viñedo hasta tu copa, te invitamos a experimentar la pasión y dedicación que se pone en cada sorbo de nuestro vino.
                </p>
                </div>
            </div>
            </div>
        </motion.div>

        <div className='px-20 w-full relative'>
            <div className="w-full h-2 border-crred border-t-2"></div>
        </div>

        <div className="w-full flex justify-center items-center">
            <EmblaCarousel slides={carouselItems} options={{ loop: true }} />
        </div>

        <div className='px-20 w-full relative'>
            <div className="w-full h-2 border-crred border-t-2"></div>
        </div>


        <div className="w-full space-y-12 px-20 py-8">
            <h2 className="text-4xl font-semibold text-center text-crred">Proceso de Vinificación</h2>
            
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-12 py-4">
            <div className="w-full md:w-1/2 px-6">
                <h3 className="text-2xl font-semibold text-crred">Desde la Cosecha</h3>
                <p className="text-sm mt-4 text-crred">
                La cosecha es el primer paso en nuestro proceso de vinificación. Cada uva es seleccionada a mano para asegurar la mejor calidad. Este cuidado meticuloso garantiza que solo las uvas más maduras y saludables se utilicen en la producción de nuestros vinos.
                </p>
            </div>
            <div className="w-full md:w-1/2 h-64 bg-gray-300"></div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-start space-y-6 md:space-y-0 md:space-x-12">
            <div className="w-full md:w-1/2 px-6">
                <h3 className="text-2xl font-semibold text-crred">Proceso de Fermentación</h3>
                <p className="text-sm mt-4 text-crred">
                La fermentación es donde la magia ocurre. En nuestras bodegas, utilizamos técnicas tradicionales y modernas para transformar el jugo de uva en vino. Este proceso controlado permite desarrollar los sabores y aromas únicos que caracterizan a nuestros vinos.
                </p>
            </div>
            <div className="w-full md:w-1/2 h-64 bg-gray-300"></div>
            </div>

            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-12">
            <div className="w-full md:w-1/2 px-6">
                <h3 className="text-2xl font-semibold text-crred">A Tu Mesa</h3>
                <p className="text-sm mt-4 text-crred">
                Finalmente, el vino está listo para ser disfrutado. Desde nuestras bodegas hasta tu mesa, cada botella es una celebración de la dedicación y pasión que ponemos en nuestro trabajo. Disfruta de nuestros vinos en cualquier ocasión y comparte la experiencia con tus seres queridos.
                </p>
            </div>
            
            <div className="w-full md:w-1/2 h-64 bg-gray-300"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

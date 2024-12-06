'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import EmblaCarousel from '@/components/Carousels/Embla/EmblaCarousel';
import VinificationProcess from '@/components/Part/About/VinificationProcess';
import Icon from '@/components/Icons';
import LoadingScreen from '@/components/Loaders/LoadingScreen';

const carouselItems = [
  {
    title: 'El Viñedo',
    image: '/img/vinedo.jpg',
    text: 'Explora la esencia de nuestro viñedo, un lugar donde la tradición y la naturaleza se fusionan. Cada uva es cuidada con pasión para crear vinos excepcionales. Pasea por nuestros campos y descubre el arte de la vinificación mientras te conectas con el entorno natural. Nuestro viñedo es un santuario de serenidad, donde la tierra nutre nuestras uvas bajo un cielo abierto. Los atardeceres en el viñedo son particularmente mágicos, con cielos que se tiñen de colores vibrantes mientras el sol se despide, ofreciendo un espectáculo visual que complementa la tranquilidad del entorno. Cada visita es un viaje hacia la historia y la dedicación que ponemos en cada botella.',
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
    <div className='relative'>
      <Navbar />
      <div className=' space-y-0 relative h-full w-full overflow-hidden'>
        <LoadingScreen animationDuration={3} displayDuration={1} />
        {/* Banner Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='relative'
        >
          <Image
            src='/img/barrels.jpg'
            alt='Banner Image'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-126 md:h-144 object-cover'
            priority
          />
          <div className='absolute inset-0 bg-black opacity-40'></div>
          <div className='absolute bottom-0 left-0 p-8 sm:p-12 md:p-16 lg:p-20'>
            <h2 className='text-5xl sm:text-6xl md:text-7xl italic cormorant-garamond-italic text-white drop-shadow-md'>
              Nuestra Historia
            </h2>
            <p className='text-xl sm:text-2xl md:text-3xl text-white mt-4 drop-shadow-md'>
              Descubre nuestro legado en cada botella
            </p>
          </div>
        </motion.div>
        <div className='relative -z-10 mt-16'>
          <Icon
            name='FullVines'
            className='absolute h-80 w-full md:h-160 opacity-15'
          />
        </div>

        <div className='px-8 space-y-10 md:space-y-0 sm:px-10 md:px-20 w-full flex flex-col items-center pb-10'>
          <div className='max-w-6xl w-full flex flex-col md:flex-row-reverse items-center md:items-start mt-12 '>


            <div className='md:w-1/2 text-left '>
              <h3 className='text-2xl md:text-3xl font-semibold text-crred mb-6 cormorant-garamond'>
                Nuestro Legado
              </h3>
              <p className='text-base sm:text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed'>
                Somos un equipo apasionado dedicado a traerte los mejores vinos de nuestra tierra.{' '}
                <strong>CR Vinos MX</strong> comenzó este viaje con amor por el vino y el deseo de
                compartir ese amor con los demás. Cada botella de nuestra colección cuenta una historia
                única, inspirada en la vida de hombres y mujeres excepcionales.
              </p>
              <p className='text-base sm:text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed mt-6'>
                La historia de <strong>CR Vinos MX</strong> comenzó en el corazón de México, donde el
                suelo fértil y el clima perfecto crean las condiciones ideales para cultivar uvas
                excepcionales. A lo largo de los años, hemos perfeccionado el cultivo de la vid y la
                elaboración del vino, combinando técnicas tradicionales con innovaciones modernas para
                producir vinos contemporáneos. La calidad y la excelencia son nuestro compromiso
                inquebrantable, y nos enorgullecemos de cada botella que lleva este nombre. Desde el
                viñedo hasta tu copa, te invitamos a experimentar con pasión cada sorbo de nuestro vino.
              </p>
            </div>
            {/* Image Section */}
            <div className='md:w-1/2 mb-8 md:mb-0 md:pr-8'>
              <Image
                src='/img/crvinedo.png'  
                alt='Nuestro Viñedo'
                width={600}
                height={400}
                className='rounded-lg shadow-lg'
              />
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
       

        {/* Carousel Section */}
        <div className='px-8 sm:px-10 md:px-20 w-full relative mt-16'>
          <div className='w-full h-2 border-crred border-t-2'></div>
          <div className='w-full flex justify-center items-center mt-8'>
            <EmblaCarousel slides={carouselItems} options={{ loop: true }} />
          </div>
          <div className='w-full h-2 border-crred border-t-2 mt-8'></div>
        </div>

        {/* Vinification Process Section */}
        <VinificationProcess />
      </div>
    </div>
  );
};

export default AboutPage;

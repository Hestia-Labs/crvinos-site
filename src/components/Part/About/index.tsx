// AboutPage.client.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

import Icon from '@/components/Icons';
import VinificationProcess from '@/components/Part/About/VinificationProcess';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

// Define the type for the banner image returned from Sanity
interface BannerImage {
  _id: string;
  locationId: string;
  image: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
}

interface AboutPageClientProps {
  bannerImage: BannerImage | null;
}

const TimelineSection: React.FC = () => {
  const timelineData: TimelineItem[] = [
    {
      year: '2020',
      title: 'Nacimiento de CR Vinos MX',
      description:
        'Dimos nuestros primeros pasos con una visión clara: elaborar vinos de excelencia y compartir la cultura vinícola con el mundo.',
      icon: 'Single_Grape',
    },
    {
      year: '2021',
      title: 'Ampliación de Viñedo',
      description:
        'Invertimos en nuevas parcelas para diversificar nuestras uvas y optimizar la producción, siempre manteniendo la calidad como eje central.',
      icon: 'Grapevine',
    },
    {
      year: '2024',
      title: 'Reconocimiento Internacional',
      description:
        'Nuestras etiquetas brillaron en el concurso de Bruselas, llevándonos a nuevos paladares y reafirmando el prestigio de nuestra bodega a nivel internacional.',
      icon: 'Medal',
    },
    {
      year: '2025',
      title: 'Apertura del Restaurante',
      description:
        'Cartinto House abre sus puertas en el viñedo de CR Vinos. Un espacio único para disfrutar de la mejor gastronomía y maridajes con nuestros vinos.',
      icon: 'Wine_Plate',
    },
  ];

  // Map icon names to PNG file paths in public/img
  const iconMap: Record<string, string> = {
    Single_Grape: '/img/Single_Grape.png',
    Grapevine: '/img/Grapevine.png',
    Medal: '/img/Medal.png',
    Wine_Plate: '/img/Wine_Plate.png',
  };

  return (
    <section className="py-16 w-full border-b-2 border-crred">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 md:px-20">
        <h3 className="text-3xl md:text-4xl text-crred font-light tracking-wide mb-2">
          A Través del Tiempo
        </h3>
        <div className="h-1 w-32 bg-crred mb-20" />

        {/* Vertical Timeline with a center gradient line */}
        <div className="relative">
          <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-gray-300 to-transparent transform -translate-x-1/2 -z-10" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-16">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              const iconSrc = iconMap[item.icon] || '/img/defaultIcon.png'; // fallback if needed

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true, margin: '0px 0px -150px 0px' }}
                  className={`relative flex flex-col ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-start`}
                >
                  {/* ===== Icon + Year (Desktop) ===== */}
                  <div className="hidden md:flex flex-col items-center w-1/2 px-12">
                    <div className="relative">
                      {/* Icon Circle */}
                      <div className="relative w-44 h-44 rounded-full overflow-hidden shadow-xl border-2 border-crred/20 flex items-center justify-center">
                        <Image
                          src={iconSrc}
                          alt={item.title}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* ===== Desktop Content ===== */}
                  <div
                    className={`hidden md:block w-1/2 px-14 -mt-8 ${
                      isEven ? 'text-left' : 'text-right'
                    }`}
                  >
                    <div
                      className={`p-8 rounded-2xl shadow-xl border border-crred/20 relative transform transition-all ${
                        isEven ? 'ml-8' : 'mr-8'
                      }`}
                    >
                      <div
                        className={`absolute top-8 w-24 h-1 -z-20 bg-crred ${
                          isEven ? '-left-22' : '-right-22'
                        }`}
                      />
                      <h5 className="text-2xl font-light italic text-crred cormorant-garamond">
                        {item.title}
                      </h5>
                      <p className="text-base text-gray-700 cormorant-garamond leading-relaxed mt-4">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* ===== Mobile Layout (Always Stacked) ===== */}
                  <div className="md:hidden w-full flex flex-col items-center space-y-4">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-xl border-2 border-crred/20 flex items-center justify-center bg-back">
                      <Image
                        src={iconSrc}
                        alt={item.title}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <div className="bg-back p-6 rounded-xl shadow-md border border-crred/20 w-full">
                      <h5 className="text-xl font-light italic text-crred cormorant-garamond">
                        {item.title}
                      </h5>
                      <p className="text-base text-gray-700 cormorant-garamond leading-relaxed mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutPage: React.FC<AboutPageClientProps> = ({ bannerImage }) => {
  return (
    <div className="relative">
      <Navbar darkenBg  />

      {/* ===== Banner Section ===== */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-bl-3xl rounded-br-3xl">
        {bannerImage ? (
          <Image
            src={bannerImage.image.asset.url}
            alt={bannerImage.image.alt || 'Banner Image'}
            fill
            sizes="(max-width: 768px) 100vw, 1920px"
            quality={75}
            className="w-full h-126 md:h-144 object-cover"
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL={`${bannerImage.image.asset.url}?w=10&q=10`}
          />
        ) : (
          <Image
            src="/img/grapesAbout.jpg"
            alt="Banner Image"
            fill
            sizes="(max-width: 768px) 100vw, 1920px"
            quality={75}
            className="w-full h-126 md:h-144 object-cover"
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEkKzI2LywxMzYwNTY0MDY2NTA0Nj84QD04Nj02NzU2QDU3PTU1N0H/2wBDAR4eHh0dHTQdHT02KyMrNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        )}

        <div className="absolute bottom-0 left-0 text-back p-6 md:p-12 ">
          
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-semibold italic text-white drop-shadow-md">
            Nosotros
          </h2>
          <div className="w-24 h-0.5 bg-white/70 my-6"></div>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-2xl">
            Descubre nuestro legado en cada botella
          </p>
        </div>
      </div>
      <div className="relative -z-10 mt-10">
        <Icon
          name="FullVines"
          className="absolute -top-36 h-80 w-full md:h-160 opacity-15"
        />
      </div>
      {/* ===== Nuestro Legado Section ===== */}
      <section className="px-8 sm:px-10 md:px-20 w-full flex flex-col items-center pb-10">
        <div className="flex flex-col w-full md:flex-row-reverse items-center md:items-start gap-8 pb-20 border-crred border-b-2">
          <div className="mt-20 max-w-6xl mx-auto">
            <h3 className="text-3xl md:text-4xl text-crred font-light tracking-wide mb-4">
              La Esencia de Nuestro Legado
            </h3>
            <div className="h-1 w-32 bg-crred mb-6" />
            <p className="text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed">
              Somos un equipo apasionado dedicado a traerte los mejores vinos de nuestra tierra.
              <strong>CR Vinos MX</strong> comenzó este viaje con amor por el vino y el deseo de
              compartir ese amor con los demás. Cada botella de nuestra colección cuenta una historia
              única, inspirada en la vida de hombres y mujeres excepcionales.
            </p>
            <p className="mt-6 text-lg md:text-xl cormorant-garamond text-gray-700 leading-relaxed">
              La historia de <strong>CR Vinos MX</strong> comenzó en el corazón de México, donde el
              suelo fértil y el clima perfecto crean las condiciones ideales para cultivar uvas
              excepcionales. A lo largo de los años, hemos perfeccionado el cultivo de la vid y la
              elaboración del vino, combinando técnicas tradicionales con innovaciones modernas para
              producir vinos contemporáneos. La calidad y la excelencia son nuestro compromiso
              inquebrantable, y nos enorgullecemos de cada botella que lleva este nombre. Desde el
              viñedo hasta tu copa, te invitamos a experimentar con pasión cada sorbo de nuestro vino.
            </p>
          </div>
        </div>
        <TimelineSection />
      </section>

      {/* ===== Decorative Icon (Optional) ===== */}
      

      {/* ===== Vinification Process Section ===== */}
      <VinificationProcess />
    </div>
  );
};

export default AboutPage;

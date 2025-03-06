'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import BasicButton from '@/components/Buttons/BasicButton';
import EventsLoader from '@/components/Loaders/EventsLoader';
import { EventShort } from '@/types/Event';
import { getEvents } from '@/app/actions/getEvents';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import LoadingScreen from '@/components/Loaders/LoadingScreen';
import Icon from '@/components/Icons';
import Reveal from '@/components/Effects/reveal';
import { useRouter } from 'next/navigation';
import { getExperiences, getExperienceCategories } from '@/app/actions/getExperiences';
import { ExperienceShort } from '@/types/Experience';
import imageUrlBuilder from '@sanity/image-url';
import { clientConfig } from '@/utils/sanity/config';
import SanityImg from '@/components/SanityImg';


const builder = imageUrlBuilder(clientConfig);

const urlFor = (source: any) => {
  return builder.image(source)
    .auto('format') 
    .quality(80); 
};

const EnotourismPage: React.FC = () => {
    const [latestEvent, setLatestEvent] = useState<EventShort | null>(null);
    const [experiences, setExperiences] = useState<ExperienceShort[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [expLoading, setExpLoading] = useState<boolean>(true);

    const router = useRouter();
    useEffect(() => {
      const loadData = async () => {
        try {
          const [eventsData, experiencesData] = await Promise.all([
            getEvents({ shortVersion: true }),
            getExperiences({ shortVersion: true, count: 3 })
          ]);
  
          // Procesar eventos
          const now = new Date();
          const upcomingEvents = (eventsData as EventShort[])
            .filter(event => new Date(event.endDate) >= now)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
          setLatestEvent(upcomingEvents[0] || null);
          
          // Procesar experiencias
          setExperiences(experiencesData as ExperienceShort[]);
        } catch (error) {
          console.error("Error loading data:", error);
        } finally {
          setLoading(false);
          setExpLoading(false);
        }
      };
  
      loadData();
    }, []);

  const getPlainTextFromPortableText = (blocks: any[]): string => {
    if (!blocks) return '';
    return blocks
      .map(block => block.children?.map((child: any) => child.text).join('') || '')
      .join(' ')
      .slice(0, 150);
  };

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full py-16 text-center"
    >
      <div className="max-w-md mx-auto space-y-6">
        <svg
          className="w-16 h-16 mx-auto text-crred opacity-75"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-xl font-light text-gray-700">Próximos eventos en preparación</h3>
        <p className="text-gray-500 font-light leading-relaxed">
          Mientras tanto, te invitamos a explorar nuestras experiencias permanentes
        </p>
      </div>
    </motion.div>
  );

  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

  const formatTime = (dateString: string) =>
    new Date(dateString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });

  return (
    <div className='relative flex flex-col w-full items-center justify-center '>
      <Navbar />
      <LoadingScreen animationDuration={3} displayDuration={1} />

      {/* Hero Section */}
      <div className='relative w-full overflow-hidden rounded-br-3xl rounded-bl-3xl'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='relative'
        >
          <Image
            src='/img/enoturismo.jpg'
            alt='Enoturismo Banner'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-[40rem] md:h-[35rem] object-cover'
            priority
          />
          <div className='absolute inset-0 bg-black opacity-40' />
          <div className='absolute bottom-0 left-0 p-8 sm:p-12 md:p-16 lg:p-20 bg-gradient-to-t from-black/70 via-black/50 to-transparent w-full'>
            <h1 className='text-5xl sm:text-6xl md:text-7xl italic cormorant-garamond-italic text-white drop-shadow-md'>
              Enoturismo
            </h1>
            <p className='text-xl sm:text-2xl md:text-3xl text-white mt-4 drop-shadow-md'>
              Vive la experiencia completa del vino
            </p>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-7xl px-8 sm:px-10 md:px-20 py-16 space-y-20">
        
        {/* Experiences Section - Carousel on Mobile */}
        <section className="space-y-12 flex flex-col items-center justify-center">
          <div className="space-y-4 flex flex-col w-full items-start justify-start">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light text-crred tracking-wide cormorant-garamond italic">
                Experiencias CR Vinos
              </h2>
            </Reveal>
            <Reveal>
              <div className="h-1 w-44 bg-crred mb-6" />
            </Reveal>
            <Reveal>
              <p className=" text-lg md:text-2xl text-gray-600 font-light max-w-2xl">
                Descubre nuestras experiencias vinícolas cuidadosamente diseñadas para todos los amantes del buen vino.
              </p>
            </Reveal>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden w-full overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            <div className="flex gap-4 px-4 py-4 snap-x snap-mandatory">
              {expLoading ? (
                <EventsLoader  />
              ) : experiences.map((experience) => (
                <motion.div
                  key={experience._id}
                  className="relative group overflow-hidden rounded-xl shadow-lg border border-crred/20 bg-white
                             w-72 flex-shrink-0 snap-start"
                  whileHover={{ y: -3 }}
                  transition={{ type: 'easeInOut', duration: 0.3 }}
                >
                  <div className="relative h-64 w-full">
                    {experience.mainImage?.asset?.url && (
                       <SanityImg
                       source={experience.mainImage}
                       alt={experience.mainImage.alt || experience.title}
                       mobileWidth={600}
                       width={500}
                       height={375}
                     />
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-medium text-crred cormorant-garamond">
                      {experience.title}
                    </h3>
                    <p className="text-gray-700 font-light leading-relaxed line-clamp-3">
                      {experience.basicDescription}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            {expLoading ? (
              <EventsLoader />
            ) : experiences.map((experience) => (
              <Reveal key={experience._id}>
                <motion.div 
                  className="relative group overflow-hidden rounded-xl shadow-lg border border-crred/20 bg-white cursor-pointer"
                  whileHover={{ y: -3 }}
                  transition={{ type: 'easeInOut', duration: 0.3 }}
                  onClick={() => router.push(`/experiences/${experience.slug}`)}
                >
                  <div className="relative h-64">
                    {experience.mainImage?.asset?.url && (
                      <SanityImg
                      source={experience.mainImage}
                      alt={experience.mainImage.alt || experience.title}
                      width={500}
                      height={375}
                      sizes="(min-width: 1024px) 33vw, 500px"
                    />
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-medium text-crred cormorant-garamond">
                      {experience.title}
                    </h3>
                    <p className="text-gray-700 font-light leading-relaxed line-clamp-3">
                      {experience.basicDescription}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
          
          <BasicButton 
            link="/experiences"
            variant="transparent"
            sizex="xxlarge"
            className="border text-xl border-solid border-crred"
          >
            Ver Todas
          </BasicButton>
        </section>

        {/* Restaurant Section - Fixed Image Display */}
        <section className="py-12 border-t border-crred/80 space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-light text-crred tracking-wide italic">
              El Restaurante
            </h2>
            <div className="h-1 w-44 bg-crred mb-6" />
            <Reveal>
              <p className="text-2xl text-gray-600 font-light max-w-2xl">
                Gastronomía de autor maridada con nuestros vinos emblemáticos en un entorno único.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="flex flex-col md:flex-row items-center gap-12">    
              <div className="flex-1 relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/img/restaurantMain.jpg"
                  alt="Cartinto House"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex-1 space-y-10">
                <h3 className="text-4xl font-light text-crred cormorant-garamond">Cartinto House</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Disfruta de una experiencia gastronómica única donde cada platillo 
                  está cuidadosamente maridado con nuestras mejores etiquetas. 
                  Menú estacional con productos locales en un entorno de viñedos.
                </p>
                <div className="flex gap-4 mt-6">
                  <BasicButton link="/restaurant" variant="bg-crred" className="border border-crred">
                    Descubre Más
                  </BasicButton>
                  <BasicButton link="/restaurant/menu" variant="transparent" className="border border-crred">
                    Ver Menú
                  </BasicButton>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Events Section */}
        <section className="space-y-10 border-t border-crred/80 pt-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-light text-crred tracking-wide italic">
              Eventos Especiales
            </h2>
            <div className="h-1 w-44 bg-crred mb-6" />
            <Reveal>
              <p className="text-2xl text-gray-600 font-light max-w-3xl">
                Descubre nuestras próximas actividades especiales y eventos temáticos
              </p>
            </Reveal>
          </div>

          <AnimatePresence>
            {loading ? (
              <EventsLoader />
            ) : latestEvent ? (
              <Reveal>
                <div className="group relative overflow-hidden rounded-2xl shadow-xl border border-crred/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="relative h-72 lg:h-auto">
                    <SanityImg
                        source={latestEvent.imageUrl}
                        alt={latestEvent.title}
                        width={800}
                        height={600}
                        sizes="(max-width: 1024px) 100vw, 800px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    </div>
                    <div className="p-6 md:p-12 space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-light text-crred cormorant-garamond">
                          {latestEvent.title}
                        </h3>
                        <div className="flex items-center gap-4 text-gray-600">
                          <span>{`${formatDate(latestEvent.date)} • ${formatTime(latestEvent.time)}`}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {getPlainTextFromPortableText(latestEvent.description) + "..."}
                      </p>
                      <div className="flex  flex-col sm:flex-row gap-4 mt-6">
                        <BasicButton 
                          link={`enotourism/events/${latestEvent.slug}`}
                          variant="bg-crred" 
                          className="w-full sm:w-auto border border-crred"
                        >
                          Más Detalles
                        </BasicButton>
                        <BasicButton
                          link="/enotourism/events"
                          variant="transparent"
                          className="border border-crred text-crred w-full sm:w-auto"
                        >
                          Todos los Eventos
                        </BasicButton>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ) : (
              <EmptyState />
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default EnotourismPage;
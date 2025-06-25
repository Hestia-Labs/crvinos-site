'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import BasicButton from '@/components/Buttons/BasicButton';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Reveal from '@/components/Effects/reveal';
import { useRouter } from 'next/navigation';
import SanityImg from '@/components/SanityImg';
import { EventShort } from '@/types/Event';
import { ExperienceShort } from '@/types/Experience';
import TransitionLink from '@/components/NewTransitionLink';
import { Recorrido } from '@/data/recorridos';

type ImageProps = {
  _id: string;
  locationId: string;
  image: {
    asset: {
      _id: string;
      url: string;
    };
    crop?: any;
    hotspot?: any;
  };
};

interface EnotourismClientProps {
  latestEvent: EventShort | null;
  experiences: ExperienceShort[];
  restaurantImage: ImageProps | null;
  bannerImage: ImageProps | null;
  recorridos?: Recorrido[];
}

const EnotourismClient: React.FC<EnotourismClientProps> = ({
  latestEvent,
  experiences,
  restaurantImage,
  bannerImage,
  recorridos = []
}) => {
  const router = useRouter();
  


  // Helper functions for formatting and text extraction
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

  const getPlainTextFromPortableText = (blocks: any[]): string => {
    if (!blocks) return '';
    return blocks
      .map(block => block.children?.map((child: any) => child.text).join('') || '')
      .join(' ')
      .slice(0, 150);
  };

  // Check if event has passed
  const hasEventPassed = (event: EventShort | null): boolean => {
    if (!event) return true;
    
    // If we have an endDate, use that to determine if the event has passed
    if (event.endDate) {
      const eventEndDate = new Date(event.endDate);
      const currentDate = new Date();
      return eventEndDate < currentDate;
    }
    
    // Fallback to using just the date field
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return eventDate < currentDate;
  };

  // Check if there is a valid upcoming event
  const validEvent = latestEvent && !hasEventPassed(latestEvent);

  const EmptyStateExperiences = () => (
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 5h1m4-5h1m-1 5h1m-5 5h1"
          />
        </svg>
        <h3 className="text-xl font-light text-gray-700">Próximas experiencias en preparación</h3>
        <p className="text-gray-500 font-light leading-relaxed">
          Estamos creando nuevas experiencias únicas. Mientras tanto, te invitamos a explorar nuestros vinos y restaurante.
        </p>
      </div>
    </motion.div>
  );

  const EmptyStateEvents = () => (
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
          Mientras tanto, te invitamos a explorar nuestros eventos pasados.
        </p>
      </div>
    </motion.div>
  );

  // Helper for recorridos preview
  const getRecorridosPreview = () => {
    if (!recorridos || recorridos.length === 0) return null;
    
    // Return the first 2 recorridos for preview
    return recorridos.slice(0, 2);
  };

  return (
    <div className="relative flex flex-col w-full items-center justify-center">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-br-3xl rounded-bl-3xl">
          <Image
            src={bannerImage?.image.asset.url || ""}
            alt={ 'Enoturismo Banner'}
            fill
            sizes="(max-width: 768px) 100vw, 1920px"
            quality={75}
            className="w-full h-[60vh] md:h-[70vh] object-cover"
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL={`${bannerImage?.image.asset.url}?w=10&q=10`}
          />
          <div className="absolute inset-0 bg-black opacity-40" />
          <div className="absolute bottom-0 left-0 text-back p-6 md:p-12 ">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-semibold italic text-white drop-shadow-md">
              Enoturismo
            </h1>
            <div className="w-24 h-0.5 bg-white/70 my-6"></div>
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-2xl">
              Sumérgete en el fascinante mundo del vino mexicano a través de experiencias únicas y memorables
            </p>
          </div>
      </div>

      <div className="w-full max-w-7xl px-8 sm:px-10 md:px-20 py-16 space-y-20">
        {/* Experiences Section */}
        <section className="space-y-12 flex flex-col items-center justify-center">
          <div className="space-y-4 flex flex-col w-full items-start justify-start">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light text-crred tracking-wide cormorant-garamond italic">
                Recorridos y Experiencias
              </h2>
            </Reveal>
            <Reveal>
              <div className="h-1 w-44 bg-crred mb-6" />
            </Reveal>
            <Reveal>
              <p className="text-lg md:text-2xl text-gray-600 font-light max-w-2xl">
                Descubre nuestras experiencias vinícolas cuidadosamente diseñadas para todos los amantes del buen vino.
              </p>
            </Reveal>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden w-full overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            <AnimatePresence>
              {experiences && experiences.length === 0 ? (
                <EmptyStateExperiences />
              ) : (
                <div className="flex gap-4 px-4 py-4 snap-x snap-mandatory">
                  {experiences && experiences.map((experience) => (
                    <motion.div
                      key={experience._id}
                      className="relative group overflow-hidden rounded-xl shadow-lg border border-crred/20 bg-white
                                 w-72 flex-shrink-0 snap-start flex flex-col"
                      whileHover={{ y: -3 }}
                      transition={{ type: 'easeInOut', duration: 0.3 }}
                      onClick={() => router.push(`/enotourism/experiences/${experience.slug}`)}
                    >
                      <div className="relative h-56 w-full">
                        {experience.mainImage?.asset?.url && (
                          <SanityImg
                            source={experience.mainImage}
                            alt={experience.mainImage.alt || experience.title}
                            width={500}
                            height={375}
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-medium text-crred cormorant-garamond mb-3">
                          {experience.title}
                        </h3>
                        <p className="text-gray-700 font-light leading-relaxed line-clamp-3 text-sm">
                          {experience.basicDescription}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence>
              {experiences && experiences.length === 0 ? (
                <div className="col-span-3 flex justify-center">
                  <EmptyStateExperiences />
                </div>
              ) : (
                experiences && experiences.map((experience) => (
                  <Reveal key={experience._id}>
                    <motion.div 
                      className="relative group overflow-hidden rounded-xl shadow-lg border border-crred/20 bg-white cursor-pointer flex flex-col"
                      whileHover={{ y: -3 }}
                      transition={{ type: 'easeInOut', duration: 0.3 }}
                      onClick={() => router.push(`/enotourism/experiences/${experience.slug}`)}
                    >
                      <div className="relative h-64">
                        {experience.mainImage?.asset?.url && (
                          <SanityImg
                            source={experience.mainImage}
                            alt={experience.mainImage.alt || experience.title}
                            width={500}
                            height={375}
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                      <div className="p-6 flex flex-col">
                        <h3 className="text-2xl font-medium text-crred cormorant-garamond mb-3">
                          {experience.title}
                        </h3>
                        <p className="text-gray-700 font-light leading-relaxed line-clamp-3">
                          {experience.basicDescription}
                        </p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))
              )}
            </AnimatePresence>
          </div>
          
          {experiences && experiences.length > 0 && (
            <BasicButton 
              link="/enotourism/experiences"
              variant="transparent"
              sizex="xxlarge"
              className="border text-xl border-solid border-crred"
            >
              Ver Todas
            </BasicButton>
          )}
        </section>


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
              <div className="md:flex-1 relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-xl">
                <SanityImg
                  source={restaurantImage?.image}
                  alt={'Cartinto House'}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full absolute inset-0"
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
        <section className="space-y-12 flex flex-col items-center justify-center border-t border-crred/80 pt-12">
          <div className="space-y-4 flex flex-col w-full items-start justify-start">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light text-crred tracking-wide cormorant-garamond italic">
                Eventos Especiales
              </h2>
            </Reveal>
            <Reveal>
              <div className="h-1 w-44 bg-crred mb-6" />
            </Reveal>
            <Reveal>
              <p className="text-lg md:text-2xl text-gray-600 font-light max-w-2xl">
                Descubre nuestras próximas actividades especiales y eventos temáticos en CR Vinos.
              </p>
            </Reveal>
          </div>

          {/* Events Content */}
          <AnimatePresence>
            {validEvent ? (
              <Reveal>
                <div className="group relative overflow-hidden rounded-2xl shadow-xl border border-crred/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="relative h-72 lg:h-auto overflow-hidden">
                      <SanityImg
                        source={latestEvent!.imageUrl}
                        alt={latestEvent!.title}
                        width={800}
                        height={600}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    </div>
                    <div className="p-6 md:p-12 space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-light text-crred cormorant-garamond">
                          {latestEvent!.title}
                        </h3>
                        <div className="flex items-center gap-4 text-gray-600">
                          <span>{`${formatDate(latestEvent!.date)} • ${formatTime(latestEvent!.time)}`}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {getPlainTextFromPortableText(latestEvent!.description) + '...'}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <BasicButton 
                          link={`enotourism/events/${latestEvent!.slug}`}
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
              <div className="flex flex-col items-center">
                <EmptyStateEvents />
                <BasicButton
                  link="/enotourism/events"
                  variant="transparent"
                  className="border border-crred text-crred w-full sm:w-auto"
                >
                  Explora Eventos 
                </BasicButton>
              </div>
            )}
          </AnimatePresence>

        </section>
      </div>
    </div>
  );
};

export default EnotourismClient;
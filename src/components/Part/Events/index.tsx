'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import BasicButton from '@/components/Buttons/BasicButton';
import EventsLoader from '@/components/Loaders/EventsLoader';
import EventItem from '@/components/Part/Landing/Events/EventItem';
import { EventShort } from '@/types/Event';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Reveal from '@/components/Effects/reveal';

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

interface EventsPageProps {
  events: {
    upcoming: EventShort[];
    past: EventShort[];
  };

}

const EventsPageClient: React.FC<EventsPageProps> = ({ events}) => {
  const [visiblePastEvents, setVisiblePastEvents] = useState<number>(3);

  const EmptyState = ({ message, description }: { message: string; description: string }) => (
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
        <h3 className="text-xl font-light text-gray-700">{message}</h3>
        <p className="text-gray-500 font-light leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="relative flex flex-col w-full items-center justify-center px-8 sm:px-12 md:px-16 lg:px-20">
      
      {/* Title Section (replacing banner) - similar to Experiences page */}
      <div className='flex flex-col items-center justify-center w-full px-8 sm:px-12 md:px-16 lg:px-20'>
        <div className='flex flex-col justify-center items-center w-full space-y-6 py-8 sm:py-12 md:py-16 lg:py-20'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl xl:text-8xl text-crred font-light tracking-wide mb-4'>
            Eventos
          </h2>
          <div className="h-0.5 w-48 md:w-64 bg-crred/70 mx-auto my-6"></div>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl text-center font-light">
            Descubre nuestros eventos exclusivos, donde la pasión por el vino se encuentra con experiencias inolvidables
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-16 border-t-2 border-crred/80">
        {/* Upcoming Events Section */}
        <section className="space-y-10">

            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light text-crred tracking-wide mb-2">
                Próximos Eventos
              </h2>
              <div className="h-1 w-48 bg-crred mb-6" />
            </Reveal>


          <AnimatePresence>
            {events.upcoming.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {events.upcoming.map((event) => (
                  <Reveal key={event.slug}>
                    <EventItem
                      slug={event.slug}
                      imageUrl={event.imageUrl}
                      title={event.title}
                      endDate={event.endDate}
                      description={event.description}
                      date={event.date}
                      time={event.time}
                    />
                  </Reveal>
                ))}
              </motion.div>
            ) : (
              <EmptyState
                message="No hay próximos eventos programados"
                description="Estamos preparando nuevas experiencias. Suscríbete a nuestro newsletter para mantenerte informado."
              />
            )}
          </AnimatePresence>
        </section>

        {/* Past Events Section */}
        <section className="space-y-10 border-t border-crred/20 pt-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-light text-crred tracking-wide mb-2">
                Eventos Pasados
              </h2>
              <div className="h-1 w-48 bg-crred mb-6" />
            </Reveal>
          <AnimatePresence>
            {events.past.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {events.past.slice(0, visiblePastEvents).map((event) => (
                    <Reveal key={event.slug}>
                      <EventItem
                        slug={event.slug}
                        imageUrl={event.imageUrl}
                        title={event.title}
                        endDate={event.endDate}
                        description={event.description}
                        date={event.date}
                        time={event.time}
                      />
                    </Reveal>
                  ))}
                </motion.div>

                {visiblePastEvents < events.past.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center pt-12"
                  >
                    <BasicButton
                      onClick={() => setVisiblePastEvents((prev) => prev + 3)}
                      variant="transparent"
                      className="border-crred border text-crred px-8 py-3 transition-colors"
                    >
                      <span className="text-lg font-medium">Cargar Más</span>
                    </BasicButton>
                  </motion.div>
                )}
              </>
            ) : (
              <EmptyState
                message="No hay eventos pasados para mostrar"
                description="Revisa regularmente nuestra agenda para no perderte nuestras próximas actividades."
              />
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default EventsPageClient;

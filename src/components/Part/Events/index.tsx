'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import BasicButton from '@/components/Buttons/BasicButton';
import EventsLoader from '@/components/Loaders/EventsLoader';
import EventItem from '@/components/Part/Landing/Events/EventItem';
import { EventShort } from '@/types/Event';
import { getEvents } from '@/app/actions/getEvents';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import LoadingScreen from '@/components/Loaders/LoadingScreen';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<{ upcoming: EventShort[]; past: EventShort[] }>({
    upcoming: [],
    past: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [visiblePastEvents, setVisiblePastEvents] = useState<number>(3);

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = (await getEvents({ shortVersion: true })) as EventShort[];
      const now = new Date();

      const upcomingEvents = fetchedEvents
        .filter((event) => new Date(event.endDate) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      const pastEvents = fetchedEvents
        .filter((event) => new Date(event.endDate) < now)
        .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());

      setEvents({ upcoming: upcomingEvents, past: pastEvents });
      setLoading(false);
    };

    loadEvents();
  }, []);

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
    <div className='relative flex flex-col w-full items-center justify-center'>
      <Navbar />
      <LoadingScreen animationDuration={3} displayDuration={1} />
      
      {/* Banner Section - Unchanged */}
      <div className='relative w-full overflow-hidden rounded-br-2xl rounded-bl-2xl'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='relative '
        >
          <Image
            src='/img/farm.jpg'
            alt='Eventos Banner'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-[40rem] md:h-[35rem] object-cover '
            priority
          />
          <div className='absolute inset-0 bg-black opacity-40'></div>
          <div className='absolute bottom-0 left-0 p-8 sm:p-12 md:p-16 lg:p-20'>
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold text-white drop-shadow-md'>
              Eventos
            </h1>
            <p className='text-xl sm:text-2xl md:text-3xl text-white mt-4 drop-shadow-md'>
              Únete para una experiencia inolvidable
            </p>
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section className="space-y-10">
          <div className="border-b border-crred/20 pb-6">
            <h2 className="text-3xl md:text-4xl font-light text-crred tracking-wide">
              Próximos Eventos
            </h2>
          </div>

          <AnimatePresence>
            {loading ? (
              <EventsLoader />
            ) : events.upcoming.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {events.upcoming.map((event) => (
                  <EventItem
                    key={event.slug}
                    slug={event.slug}
                    imageUrl={event.imageUrl}
                    title={event.title}
                    endDate={event.endDate}
                    description={event.description}
                    date={event.date}
                    time={event.time}
                  />
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
          <div className="border-b border-crred/20 pb-6">
            <h2 className="text-3xl md:text-4xl font-light text-crred tracking-wide">
              Eventos Pasados
            </h2>
          </div>

          <AnimatePresence>
            {loading ? (
              <EventsLoader />
            ) : events.past.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {events.past.slice(0, visiblePastEvents).map((event) => (
                    <EventItem
                      key={event.slug}
                      slug={event.slug}
                      imageUrl={event.imageUrl}
                      title={event.title}
                      endDate={event.endDate}
                      description={event.description}
                      date={event.date}
                      time={event.time}
                    />
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

export default EventsPage;
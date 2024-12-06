'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import BasicButton from '@/components/Buttons/BasicButton';
import EventsLoader from '@/components/Loaders/EventsLoader';
import NoEvents from '@/components/Part/Landing/Events/NoEvents';
import EventItem from '@/components/Part/Landing/Events/EventItem';
import { EventShort } from '@/types/Event';
import { getEvents } from '@/app/actions/getEvents';
import { motion } from 'framer-motion';
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

      // Split events into upcoming and past events
      const upcomingEvents = fetchedEvents.filter((event) => new Date(event.endDate) >= now);
      const pastEvents = fetchedEvents.filter((event) => new Date(event.endDate) < now);

      // Sort upcoming events by start date ascending
      upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Sort past events by end date descending
      pastEvents.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());

      setEvents({ upcoming: upcomingEvents, past: pastEvents });
      setLoading(false);
    };

    loadEvents();
  }, []);

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <Navbar />
      <LoadingScreen animationDuration={3} displayDuration={1} />
      {/* Banner Section */}
      <div className='relative w-full'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='relative'
        >
          <Image
            src='/img/barrels.jpg' // Use the same image as in AboutPage
            alt='Eventos Banner'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-[40rem] md:h-[35rem] object-cover'
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

      {/* Upcoming Events Section */}
      <div className='px-4 sm:px-8 md:px-10 lg:px-20 w-full flex flex-col items-center'>
        <div className='w-full flex flex-col py-12'>
          <h2 className='text-4xl md:text-5xl font-thin text-crred mb-8  '>
            Próximos Eventos
          </h2>
          {loading ? (
            <EventsLoader />
          ) : (
            <>
              {events.upcoming.length > 0 ? (
                <div className='flex flex-col items-center space-y-7 p-4 sm:p-6 w-full sm:w-5/6'>
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
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center py-12'>
                  <p className='text-lg text-gray-600'>
                    No hay próximos eventos en este momento.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Past Events Section */}
      <div className='px-4 sm:px-8 md:px-10 lg:px-20 w-full flex flex-col items-center'>
        <div className='w-full flex flex-col py-12 border-crred border-t-2'>
          <h2 className='text-4xl md:text-5xl font-thin text-crred mb-8 '>
            Eventos Pasados
          </h2>
          {loading ? (
            <EventsLoader />
          ) : (
            <>
              {events.past.length > 0 ? (
                <>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-7 w-full sm:w-5/6'>
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
                  </div>
                  {visiblePastEvents < events.past.length && (
                    <div className='flex w-full justify-center items-center'>
                      <BasicButton
                        onClick={() => setVisiblePastEvents((prev) => prev + 3)}
                        variant='transparent'
                        sizex='xxxxlarge'
                        className='border-crred border border-solid mt-6'
                      >
                        <p className='text-lg'>Cargar Más</p>
                      </BasicButton>
                    </div>
                  )}
                </>
              ) : (
                <div className='flex flex-col items-center justify-center py-12'>
                  <p className='text-lg text-gray-600'>
                    No hay eventos pasados para mostrar.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;

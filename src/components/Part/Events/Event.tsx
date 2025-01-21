'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link'; // Added import for Link
import { getEvents } from '@/app/actions/getEvents';
import Navbar from '@/components/Navbar';
import { Event } from '@/types/Event';
import Icon from '@/components/Icons';
import EventDescLoader from '@/components/Loaders/EventDescLoader';
import { PortableText } from '@portabletext/react';
import { PortableTextComponentProps } from '@portabletext/react';
import { PortableTextReactComponents } from '@portabletext/react';
import { PortableTextMarkComponentProps } from '@portabletext/react';
import Image from 'next/image';

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 text-lg">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-2xl md:text-4xl text-crred tracking-wide mb-2">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl text-crred mb-2">{children}</h2>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-crred text-lg">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-gray-700 text-lg ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-crred text-lg ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-gray-700 text-lg">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-crred text-lg">{children}</li>
    ),
  },
  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps) => {
      const rel =
        value?.href && !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={value?.href || '#'}
          rel={rel}
          className="text-crred text-lg underline"
        >
          {children}
        </a>
      );
    },
  },
};

const EventNotFound = () => {
  return (
    <div className="flex flex-col relative space-y-9">
      <Navbar relative red redLogo />
      <div className="flex relative w-full h-full px-4 sm:px-10 md:px-20 flex-col space-y-6">
        <div className="mt-4 space-y-8 w-full">
          <div className="flex flex-col relative space-y-8 w-full items-center">
            <div className="flex flex-col items-center justify-center space-y-6 py-9 px-4 md:px-12 h-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl text-crred italic tracking-wide mb-2">
                Evento no encontrado
              </h1>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl font-thin text-center">
                Lo sentimos, no pudimos encontrar el evento que estás buscando.
              </p>
              <Link href="/enoturism" className="text-crred underline">
                Volver a eventos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventPage: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isPastEvent, setIsPastEvent] = useState<boolean>(false);
  const [notFoundState, setNotFoundState] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const events = await getEvents({ eventId: params.slug });
        if (events.length > 0) {
          const fetchedEvent = events[0] as Event;
          setEvent(fetchedEvent);

          // Check if the event is in the past
          const now = new Date();
          const eventEndDate = new Date(fetchedEvent.dates.end);
          if (eventEndDate < now) {
            setIsPastEvent(true);
          }
        } else {
          setNotFoundState(true); // Added this line
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setNotFoundState(true); // Handle error by showing not found
      }
    };

    fetchEvent();
  }, [params.slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleTimeString('en-US', options);
  };

  if (notFoundState || !event) {
    return <EventNotFound />;
  }

  return (
    <div className="flex flex-col w-full items-center justify-center py-12 space-y-7">
      <Navbar redLogo red={true} relative={true} />
      <div className="px-4 md:px-20 w-full flex flex-col justify-center items-center">
        {!event ? (
          <EventDescLoader />
        ) : (
          <div className="w-full flex flex-col justify-center items-center py-8 border-crred border-t-2">
            <div className="flex w-full justify-start items-start">
              <div
                onClick={() => router.push('/enoturism')}
                className="flex items-center space-x-2 transition duration-300 ease-in-out transform hover:-translate-x-2 cursor-pointer mb-6"
              >
                <Icon
                  name="Arrow"
                  className="h-5 w-5 transition-transform duration-300 ease-in-out transform hover:translate-x-2"
                  style={{ transform: 'rotate(180deg)' }}
                />
                <p className="font-cormorant text-crred transition-colors duration-300 ease-in-out hover:text-crred-light">
                  Regresar a Eventos
                </p>
              </div>
            </div>
            <div className="relative w-full">
              <Image
                src={event.posterURL}
                alt={event.posterAlt}
                width={0}
                height={0}
                sizes='100vw'
                className={`w-full h-64 md:h-100 object-cover mb-4 cursor-pointer ${
                  isPastEvent ? 'grayscale' : ''
                }`}
                onClick={() =>
                  window.open(event.locationLink, '_blank', 'noopener noreferrer')
                }
              />
              {isPastEvent && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 text-white py-2 px-4 rounded">
                    <p className="text-xl font-semibold">Evento Pasado</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-8 border-crred border-t mt-4 w-full py-8">
              <div className="w-full md:w-2/3 px-4 space-y-6">
                <h1 className="text-3xl md:text-5xl text-crred tracking-wide mb-4 font-semibold">
                  {event.title}
                </h1>
                <div className="prose max-w-none text-crred">
                  <PortableText
                    value={event.description}
                    components={myPortableTextComponents}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 space-y-4">
                <div className="bg-back p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl text-crred mb-4 font-semibold">
                    Detalles del Evento
                  </h2>
                  <p className="text-crred text-lg">
                    <strong>Organizador:</strong> {event.organizer}
                  </p>
                  <p className="text-crred text-lg">
                    <strong>Fecha:</strong> {formatDate(event.dates.start)} -{' '}
                    {formatDate(event.dates.end)}
                  </p>
                  <p className="text-crred text-lg">
                    <strong>Hora:</strong> {formatTime(event.dates.start)} -{' '}
                    {formatTime(event.dates.end)}
                  </p>
                  <p className="text-crred text-lg">
                    <strong>Lugar:</strong> {event.textLocation}
                  </p>
                  <p className="text-crred text-lg">
                    <strong>Categorías:</strong> {event.categories.join(', ')}
                  </p>
                  <p className="text-crred text-lg">
                    <strong>Límite de Asistencia:</strong> {event.attendanceCap}
                  </p>
                </div>
                {!isPastEvent ? (
                  <button
                    className="w-full py-3 bg-crred text-white text-lg font-semibold rounded-lg hover:bg-crred-light transition duration-300"
                    onClick={() => {
                      // Handle event registration or ticket purchase
                    }}
                  >
                    Registrarse
                  </button>
                ) : (
                  <div className="w-full py-3 bg-crred-75 text-back-75 text-lg font-semibold rounded-lg text-center cursor-not-allowed">
                    Evento Finalizado
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;

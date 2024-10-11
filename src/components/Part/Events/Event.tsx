'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getEvents } from '@/app/actions/getEvents';
import Navbar from '@/components/Navbar';
import { Event } from '@/types/Event';
import Icon from '@/components/Icons';
import EventDescLoader from '@/components/Loaders/EventDescLoader';
import { PortableText } from '@portabletext/react';
import { PortableTextComponentProps } from 'next-sanity';
import { PortableTextReactComponents } from 'next-sanity';
import { PortableTextMarkComponentProps } from 'next-sanity';

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
    block: {
      normal: ({children}: PortableTextComponentProps<any>) => <p className="text-crred text-lg">{children}</p>,
      h1: ({children}: PortableTextComponentProps<any>) => <h1 className="text-2xl md:text-4xl text-crred tracking-wide mb-2">{children}</h1>,
      h2: ({children}: PortableTextComponentProps<any>) => <h2 className="text-xl text-crred mb-2">{children}</h2>,
      blockquote: ({children}: PortableTextComponentProps<any>) => <blockquote className="text-crred text-lg">{children}</blockquote>,
    },
    list: {
      bullet: ({children}: PortableTextComponentProps<any>) => (
        <ul className="list-disc list-inside text-crred text-lg ml-4">{children}</ul>
      ),  
      number: ({children}: PortableTextComponentProps<any>) => (
        <ol className="list-decimal list-inside text-crred text-lg ml-4">{children}</ol>
      ),  
    },
    listItem: {
      bullet: ({children}: PortableTextComponentProps<any>) => (
        <li className="text-crred text-lg">{children}</li>
      ),  
      number: ({children}: PortableTextComponentProps<any>) => (
        <li className="text-crred text-lg">{children}</li>
      ), 
    },
    marks: {
      link: ({children, value}: PortableTextMarkComponentProps<any>) => {
        const rel = value?.href && !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value?.href || '#'} rel={rel} className="text-crred text-lg">
            {children}
          </a>
        );
      },
    },
};

const EventPage: React.FC = () => {
    const params = useParams<{ slug: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchEvent = async () => {
            const events = await getEvents({ eventId: params.slug });
            if (events.length > 0) {
                setEvent(events[0] as Event);
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
                    className="flex items-center space-x-4 transition duration-500 ease-in-out transform hover:-translate-x-2 cursor-pointer mb-6"
                  >
                    <Icon
                      name="Arrow"
                      className="h-5 w-5 transition-transform duration-500 ease-in-out transform hover:translate-x-2"
                      style={{ transform: 'rotate(180deg)' }}
                    />
                    <p className="font-cormorant text-crred transition-colors duration-500 ease-in-out hover:text-crred-light">
                      Regresar a Eventos
                    </p>
                  </div>
                </div>
                <img
                  src={event.posterURL}
                  alt={event.posterAlt}
                  className="w-full h-64 md:h-100 object-cover mb-4 cursor-pointer"
                  onClick={() => window.open(event.locationLink, '_blank', 'noopener noreferrer')}
                />
                <div className="flex flex-col md:flex-row gap-4 border-crred border-t mt-4 w-full py-4">
                  <div className="w-full md:w-1/2 px-2">
                    <div className="flex flex-col justify-start items-start min-w-1/2 ">
                        <h1 className="text-2xl md:text-4xl text-crred tracking-wide mb-2 ">
                            {event.title}
                        </h1>
                        <div className="p-4 ">
                            <PortableText value={event.description} components={myPortableTextComponents} />
                        </div>
                      
                    </div>
                    <p className="text-crred text-lg">
                      <strong>Organizador:</strong> {event.organizer}
                    </p>
                    <p className="text-crred text-lg">
                      <strong>Fecha:</strong> {formatDate(event.dates.start)} - {formatDate(event.dates.end)}
                    </p>
                    <p className="text-crred text-lg">
                      <strong>Hora:</strong> {formatTime(event.dates.start)} - {formatTime(event.dates.end)}
                    </p>
                    <p className="text-crred text-lg">
                      <strong>Lugar:</strong> {event.textLocation}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-2">
                    <h2 className="text-xl text-crred mb-2">Más Información</h2>
                    <p className="text-crred text-lg">
                      <strong>Categorías:</strong> {event.categories.join(', ')}
                    </p>
                    <p className="text-crred text-lg">
                      <strong>Límite de Asistencia:</strong> {event.attendanceCap}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };
export default EventPage;
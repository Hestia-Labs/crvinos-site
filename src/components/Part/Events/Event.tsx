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
import { myPortableTextComponents } from '@/utils/CustomPortableText';
import BasicButton from '@/components/Buttons/BasicButton';
import Image from 'next/image';

interface EventPageProps {
  event: Event;
  isPastEvent: boolean;
}





const EventPage: React.FC<EventPageProps> = ({ event, isPastEvent }) => {
  const router = useRouter();
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  // Move format functions here
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual RSVP logic

    setShowRSVPModal(false);
  };
  
  return (
    <div className="relative flex flex-col w-full items-center min-h-screen">
      <Navbar redLogo red relative />
       {/* RSVP Modal */}
       {showRSVPModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-crred">Registro para Evento</h3>
              <button
                onClick={() => setShowRSVPModal(false)}
                className="text-gray-500 hover:text-crred"
              >
                <Icon name="Close" className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleRSVPSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-crred focus:border-crred"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-crred focus:border-crred"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-crred focus:border-crred"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-crred text-white rounded-lg font-semibold hover:bg-crred-dark"
                >
                  Enviar Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Main Content Container */}
      <main className="w-full max-w-7xl px-4 md:px-8 lg:px-12 py-12">
        {/* Back Navigation */}
        <div className="w-full mb-8">
          <button
            onClick={() => router.push('/enotourism')}
            className="flex items-center group space-x-2 transition-transform duration-200"
          >
            <Icon
              name="Arrow"
              className="h-5 w-5 text-crred transform rotate-180 transition-transform group-hover:-translate-x-1"
            />
            <span className=" text-lg text-crred hover:text-crred-dark transition-colors">
              Volver a Eventos
            </span>
          </button>
        </div>

        {/* Event Content */}
        {!event ? (
          <EventDescLoader />
        ) : (
          <article className="w-full">
            {/* Event Header */}
            <div className="relative h-126 rounded-xl overflow-hidden shadow-xl mb-12">
              <Image
                src={event.posterURL}
                alt={event.posterAlt}
                fill
                className={`object-cover transition-opacity ${isPastEvent ? 'grayscale' : 'hover:opacity-95'}`}
              />
              
              {isPastEvent && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-white/90 px-6 py-3 rounded-full shadow-md">
                    <p className="text-xl font-semibold text-crred">Evento Finalizado</p>
                  </div>
                </div>
              )}
            </div>

            {/* Event Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                <header className="border-b border-crred/20 pb-6">
                  <h1 className="text-3xl md:text-5xl font-light text-crred tracking-wide">
                    {event.title}
                  </h1>
                </header>

                <section className="prose prose-lg max-w-none text-gray-800">
                  <PortableText
                    value={event.description}
                    components={myPortableTextComponents}
                  />
                </section>
              </div>

              {/* Sidebar Details */}
              <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
                <div className="bg-white border border-crred/20 rounded-xl p-6 shadow-md">
                  <h2 className="text-2xl font-light text-crred mb-6 ">
                    Detalles del Evento
                  </h2>

                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-crred uppercase tracking-wide">Organizador</dt>
                      <dd className="mt-1 text-gray-700">{event.organizer}</dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-crred uppercase tracking-wide">Fecha</dt>
                      <dd className="mt-1 text-gray-700">
                        {formatDate(event.dates.start)} – {formatDate(event.dates.end)}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-crred uppercase tracking-wide">Horario</dt>
                      <dd className="mt-1 text-gray-700">
                        {formatTime(event.dates.start)} – {formatTime(event.dates.end)}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-crred uppercase tracking-wide">Ubicación</dt>
                      <dd className="mt-1 text-gray-700">
                        <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className="hover:text-crred-75 underline transition duration-300 ease-in-out">
                          {event.textLocation}
                        </a>
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-crred uppercase tracking-wide">Categorías</dt>
                      <dd className="mt-1 text-gray-700">{event.categories.join(', ')}</dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-crred uppercase tracking-wide">Aforo</dt>
                      <dd className="mt-1 text-gray-700">{event.attendanceCap} personas</dd>
                    </div>
                  </dl>

                  {/* Registration Section */}
        <div className="mt-8">
          {isPastEvent ? (
            <div className="w-full py-3 text-center bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed">
              Registro Cerrado
            </div>
          ) : event.useRSVPForm ? (
            <BasicButton
              onClick={() => setShowRSVPModal(true)}
              className="border-crred border"
              variant='bg-crred'
            >
              Registrarse Ahora
            </BasicButton>
          ) : (
            <div className="space-y-4">
              <div className="bg-crred/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-crred mb-2">Registro</h3>
                <p className="text-gray-700 mb-2">
                   Por favor contactar para registro:
                </p>
                {event.contactForRegistration?.includes('@') ? (
                  <a
                    href={`mailto:${event.contactForRegistration}`}
                    className="text-crred hover:text-crred-dark underline"
                  >
                    {event.contactForRegistration}
                  </a>
                ) : (
                  <a
                    href={`tel:${event.contactForRegistration}`}
                    className="text-crred hover:text-crred-dark underline"
                  >
                    {event.contactForRegistration}
                  </a>
                )}
                {event.registrationInstructions && (
                  <p className="mt-4 text-sm text-gray-600">
                    {event.registrationInstructions}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
                </div>
              </aside>
            </div>
          </article>
        )}
      </main>
    </div>
  );
};

export default EventPage;
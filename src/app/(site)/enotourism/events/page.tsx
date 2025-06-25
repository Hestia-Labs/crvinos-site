import React from 'react';
import type { Metadata } from 'next';
import EventsPageClient from '@/components/Part/Events';
import { getEvents } from '@/app/actions/getEvents';
import { EventShort } from '@/types/Event';
import Navbar from '@/components/Navbar';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Eventos de Vino en Querétaro | Catas y Celebraciones Especiales | CR Vinos MX",
  description: "Descubre y reserva eventos exclusivos de vino en CR Vinos: catas temáticas, maridajes gourmet, festivales de vendimia y celebraciones especiales en nuestros viñedos de Querétaro.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['eventos de vino Querétaro', 'calendario de catas', 'festivales de vino México', 'eventos en viñedos', 'catas temáticas', 'maridaje vino y comida', 'fiesta de la vendimia', 'eventos corporativos en bodega', 'celebraciones especiales CR Vinos', 'agenda vinícola Querétaro', 'talleres de vino', 'eventos privados en viñedo', 'experiencias enológicas exclusivas', 'degustación vinos mexicanos', 'eventos gastronómicos con vino', 'calendario enológico', 'actividades en bodega CR Vinos', 'catas exclusivas reservación', 'eventos enogastronómicos', 'experiencias sensoriales vino', 'celebraciones en bodega', 'eventos temáticos de vino', 'festivales vinícolas Querétaro', 'agenda cultural vinícola', 'actividades enoturísticas'],
  openGraph: {
    title: "Eventos de Vino en Querétaro | Catas y Celebraciones Especiales | CR Vinos MX",
    description: "Descubre y reserva eventos exclusivos de vino en CR Vinos: catas temáticas, maridajes gourmet, festivales de vendimia y celebraciones especiales en nuestros viñedos de Querétaro.",
    url: `${siteUrl}/enotourism/events`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/crvinosmxLogo.jpg`,
        width: 300,
        height: 225,
        alt: "Eventos Vinícolas CR Vinos Querétaro",
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eventos de Vino en Querétaro | Catas y Celebraciones Especiales | CR Vinos MX',
    description: 'Descubre y reserva eventos exclusivos de vino en CR Vinos: catas temáticas, maridajes gourmet, festivales de vendimia y celebraciones especiales en nuestros viñedos de Querétaro.',
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/enotourism/events`,
    languages: {
      'es-MX': `${siteUrl}/enotourism/events`,
    },
  },
  appleWebApp: {
    title: 'CR Vinos MX',
    statusBarStyle: 'black-translucent',
  },
  robots: {
    index: true, 
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function EventsPageServer() {
  const eventsData = (await getEvents({ shortVersion: true })) as EventShort[];
  const now = new Date();

  const upcomingEvents = eventsData
    .filter((event) => new Date(event.endDate) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = eventsData
    .filter((event) => new Date(event.endDate) < now)
    .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());

  return (
    <div className='relative flex flex-col w-full items-center justify-center'>
      <div className='relative w-full -z-10'>
        <div 
          className='absolute h-80 w-full md:h-160 opacity-40'
          style={{ 
            backgroundImage: 'url(/img/icons/ContactVines.svg)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
      <Navbar clearBg redLogo red relative />
      <EventsPageClient 
        events={{ upcoming: upcomingEvents, past: pastEvents }}
      />
    </div>
  );
}
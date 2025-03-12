import React from 'react';
import type { Metadata } from 'next';
import EventsPageClient from '@/components/Part/Events';
import { getEvents } from '@/app/actions/getEvents';
import { EventShort } from '@/types/Event';
import  { getImagesByLocationIds } from '@/app/actions/getImagebyLocation';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Eventos Exclusivos | CR Vinos MX",
  description: "Explora los eventos exclusivos de CR Vinos MX, donde la pasión por el vino se encuentra con experiencias inolvidables. Únete a nuestras catas, recorridos y celebraciones únicas.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CR Vinos MX', 'eventos de vino', 'catas exclusivas', 'recorridos de bodega', 'celebraciones vinícolas'],
  openGraph: {
    title: "Eventos Exclusivos | CR Vinos MX",
    description: "Explora los eventos exclusivos de CR Vinos MX, donde la pasión por el vino se encuentra con experiencias inolvidables.",
    url: `${siteUrl}/enotourism/events`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/crvinosmxLogo.jpg`,
        width: 300,
        height: 225,
        alt: "CR Vinos MX",
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eventos Exclusivos | CR Vinos MX',
    description: 'Explora los eventos exclusivos de CR Vinos MX, donde la pasión por el vino se encuentra con experiencias inolvidables.',
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

  const bannerImage = await getImagesByLocationIds(['event-banner']);

  return <EventsPageClient events={{ upcoming: upcomingEvents, past: pastEvents }} bannerImage={bannerImage[0]}/>;
}
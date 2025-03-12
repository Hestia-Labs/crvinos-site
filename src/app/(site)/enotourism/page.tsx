import EnotourismClient from '@/components/Part/Enotourism';
import { getEvents } from '@/app/actions/getEvents';
import { getExperiences } from '@/app/actions/getExperiences';
import { EventShort } from '@/types/Event';
import { ExperienceShort } from '@/types/Experience';
import { getImagesByLocationIds } from '@/app/actions/getImagebyLocation';

import type { Metadata } from 'next';



const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Enoturismo | CR Vinos MX | Vinos de la más alta calidad  ",
  description: "Sumérgete en el mundo del enoturismo con CR Vinos MX. Disfruta de experiencias únicas como catas de vino, recorridos por viñedos y eventos exclusivos que celebran la cultura vinícola mexicana.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['CR Vinos MX', 'enoturismo', 'catas de vino', 'visitas a la bodega', 'eventos especiales'],
  openGraph: {
    title: "CR Vinos MX | Vinos de la más alta calidad | Enoturismo",
    description: "Sumérgete en el mundo del enoturismo con CR Vinos MX. Disfruta de experiencias únicas como catas de vino, recorridos por viñedos y eventos exclusivos que celebran la cultura vinícola mexicana.",
    url: `${siteUrl}/enoturism`,
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
    title: 'CR Vinos MX | Vinos de la más alta calidad | Enoturismo',
    description: 'Sumérgete en el mundo del enoturismo con CR Vinos MX. Disfruta de experiencias únicas como catas de vino, recorridos por viñedos y eventos exclusivos que celebran la cultura vinícola mexicana.',
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/enoturism`,
    languages: {
      'es-MX': `${siteUrl}/enoturism`,
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

async function fetchPageData() {
  try {
    const [events, experiences, images] = await Promise.all([
      getEvents({ 
        shortVersion: true, 
        filterUpcoming: true, 
        sortOrder: 'desc' 
      }),
      getExperiences({ 
        shortVersion: true, 
        count: 3 
      }),
      getImagesByLocationIds(['rest-banner', 'eno-banner'])
    ]);


    return {
      events: events as EventShort[],
      experiences: experiences as ExperienceShort[],
      restaurantImage: images.find(img => img?.locationId === 'rest-banner') || null,
      bannerImage: images.find(img => img?.locationId === 'eno-banner') || null
    };
  } catch (error) {
    console.error('Page data fetch error:', error);
    return {
      events: [],
      experiences: [],
      restaurantImage: null,
      bannerImage: null
    };
  }
}

export default async function EnotourismPage() {
  const { events, experiences, restaurantImage, bannerImage } = await fetchPageData();
  const latestEvent = events[0] || null;

  return (
    <EnotourismClient 
      latestEvent={latestEvent}
      experiences={experiences}
      restaurantImage={restaurantImage}
      bannerImage={bannerImage}
    />
  );
}
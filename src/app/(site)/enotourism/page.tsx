import EnotourismClient from '@/components/Part/Enotourism';
import { getEvents } from '@/app/actions/getEvents';
import { getExperiences } from '@/app/actions/getExperiences';
import { EventShort } from '@/types/Event';
import { ExperienceShort } from '@/types/Experience';
import { getImagesByLocationIds } from '@/app/actions/getImagebyLocation';

// Add import for recorridos
import { getRecorridos } from '@/data/recorridos';

import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Enoturismo en Querétaro | Viñedos y Catas | CR Vinos MX",
  description: "Vive la experiencia completa del enoturismo en CR Vinos MX. Disfruta de catas exclusivas, recorridos por viñedos, eventos temáticos y experiencias gastronómicas que celebran la cultura vinícola mexicana en el corazón de Querétaro.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['enoturismo Querétaro', 'turismo del vino México', 'visita viñedos mexicanos', 'ruta del vino Querétaro', 'cata de vinos CR Vinos', 'experiencias enológicas', 'turismo vinícola', 'bodega de vino visitable', 'eventos en viñedo', 'festivales de vino México', 'vacaciones vinícolas', 'turismo gastronómico', 'tours de vino Tequisquiapan', 'actividades en bodega', 'experiencia vinícola completa', 'catas profesionales', 'recorridos guiados vinícolas', 'fiestas de la vendimia', 'wine tourism Mexico', 'destino enoturístico', 'viajes temáticos de vino', 'turismo cultural vinícola', 'catas guiadas español', 'experiencia vinícola premium', 'enoturismo experiencial'],
  openGraph: {
    title: "Enoturismo en Querétaro | Viñedos y Catas | CR Vinos MX",
    description: "Vive la experiencia completa del enoturismo en CR Vinos MX. Disfruta de catas exclusivas, recorridos por viñedos, eventos temáticos y experiencias gastronómicas que celebran la cultura vinícola mexicana en el corazón de Querétaro.",
    url: `${siteUrl}/enotourism`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/crvinosmxLogo.jpg`,
        width: 300,
        height: 225,
        alt: "Enoturismo CR Vinos Querétaro",
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enoturismo en Querétaro | Viñedos y Catas | CR Vinos MX',
    description: 'Vive la experiencia completa del enoturismo en CR Vinos MX. Disfruta de catas exclusivas, recorridos por viñedos, eventos temáticos y experiencias gastronómicas que celebran la cultura vinícola mexicana en el corazón de Querétaro.',
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/enotourism`,
    languages: {
      'es-MX': `${siteUrl}/enotourism`,
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
    // First fetch events, images, and recorridos
    const [events, images, recorridos] = await Promise.all([
      getEvents({ 
        shortVersion: true, 
        filterUpcoming: true, 
        sortOrder: 'desc' 
      }),
      getImagesByLocationIds(['tours-banner', 'eno-banner', 'rest-banner']),
      getRecorridos()
    ]);

    // Now fetch exactly 3 experiences that are NOT coming soon (available only)
    // We'll need to fetch more experiences first, then filter out the "coming soon" ones client-side
    // since the API doesn't directly support filtering by comingSoon status
    let experiences = await getExperiences({ 
      shortVersion: true,
      count: 6, // Fetch more since we'll filter some out
    });

    // Filter out experiences marked as "commingSoon"
    experiences = (experiences as ExperienceShort[]).filter(exp => !exp.commingSoon);
    
    // Limit to 3 experiences after filtering
    experiences = experiences.slice(0, 3);

    // If we got fewer than 3 experiences, log it

    
    return {
      events: events as EventShort[],
      experiences: experiences as ExperienceShort[],
      recorridos: recorridos,
      toursImage: images.find(img => img?.locationId === 'tours-banner') || null,
      bannerImage: images.find(img => img?.locationId === 'eno-banner') || null,
      restaurantImage: images.find(img => img?.locationId === 'rest-banner') || null
    };
  } catch (error) {
    console.error('Page data fetch error:', error);
    return {
      events: [],
      experiences: [],
      recorridos: [],
      toursImage: null,
      bannerImage: null,
      restaurantImage: null
    };
  }
}
// TODO: FIX X padding 
// TODO: create new single experience page
// TODO: add new experiences from doc 
export default async function EnotourismPage() {
  const { events, experiences, recorridos, toursImage, bannerImage, restaurantImage } = await fetchPageData();

  const latestEvent = events[0] || null;

  return (
    <EnotourismClient 
      latestEvent={latestEvent}
      experiences={experiences}
      restaurantImage={restaurantImage}
      bannerImage={bannerImage}
      recorridos={recorridos}
    />
  );
}
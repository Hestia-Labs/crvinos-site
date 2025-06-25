import EventPage from '@/components/Part/Events/Event';
import { getEvents } from '@/app/actions/getEvents';
import type { Metadata } from 'next';
import EventNotFound from '@/components/Part/Events/EventNotFound'
import type { Event } from '@/types/Event';
import { PortableTextBlock } from '@portabletext/types';


const siteUrl = process.env.SITE_URL || 'https://crvinosmx.com';

const convertPortableTextToString = (blocks: PortableTextBlock[]): string => 
  blocks.map(b => b.children.map(c => c.text).join('')).join(' ').slice(0, 150) + '...';

export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
  const events = await getEvents({ eventId: params.slug }) as Event[];
  if (events.length === 0) {
    return {
      title: 'Evento no encontrado | CR Vinos MX',
      description: 'El evento que buscas no está disponible.',
    };
  }

  const event = events[0];
  const formattedSlug = event.title || params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedSlug} | CR Vinos MX | Vinos de la más alta calidad`,
    description: event.description
        ? convertPortableTextToString(event.description)
        : 'Descubre los detalles de nuestros eventos exclusivos en CR Vinos MX.',
    icons: {
      icon: "/favicon.ico",
      apple: "/img/apple-touch-icon.png",
    },
    keywords: [...(event.categories || []), 'CR Vinos MX', 'evento', 'catas de vino', 'visitas a la bodega', 'eventos especiales'],
    openGraph: {
      title: `${formattedSlug} | CR Vinos MX | Vinos de la más alta calidad`,
      description: event.description
        ? convertPortableTextToString(event.description)
        : 'Descubre los detalles de nuestros eventos exclusivos en CR Vinos MX.',
      url: `${siteUrl}/enotourism/${params.slug}`,
      siteName: "CR Vinos MX",
      images: [
        {
          url: event.posterURL || `${siteUrl}/img/enoPreview.png`,
          width: 300,
          height: 225,
          alt: event.title || "CR Vinos MX",
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${formattedSlug} | CR Vinos MX | Vinos de la más alta calidad`,
      description: event.description
        ? convertPortableTextToString(event.description)
        : 'Descubre los detalles de nuestros eventos exclusivos en CR Vinos MX.',
      images: [event.posterURL || `${siteUrl}/img/enoPreview.png`],
    },
    alternates: {
      canonical: `${siteUrl}/enotourism/${params.slug}`,
      languages: {
        'es-ES': `${siteUrl}/enotourism/${params.slug}`,
      },
    },
    appleWebApp: {
      title: 'CR Vinos MX',
      statusBarStyle: 'black-translucent',
    },
  };
};

export default async function Event({ params }: { params: { slug: string } }) {
  try {
    const events = await getEvents({ eventId: params.slug });
    if (events.length === 0) return <EventNotFound />;

    const event = events[0] as Event;
    const now = new Date();
    const isPastEvent = new Date(event.dates.end) < now;

    return <EventPage event={event} isPastEvent={isPastEvent} />;
  } catch (error) {
    console.error('Error fetching event:', error);
    return <EventNotFound />;
  }
}
// Events.tsx
'use client';

import React from 'react';
import BasicButton from '@/components/Buttons/BasicButton';
import EventsLoader from '@/components/Loaders/EventsLoader';
import NoEvents from './NoEvents';
import EventItem from './EventItem';
import { EventShort } from '@/types/Event';
import { useRouter } from 'next/navigation';

interface EventsProps {
  serverEvents: EventShort[] | undefined;
}

const EventsHeader = () => (
  <div className="flex flex-col justify-center items-center w-full mb-8">
    <h2 className="text-3xl sm:text-4xl md:text-5xl text-crred font-light tracking-tight mb-2">
      Próximos Eventos
    </h2>
    <p className="text-crred font-light italic text-lg md:text-xl lg:text-2xl">
      Únete para una experiencia inolvidable
    </p>
  </div>
);

const Events: React.FC<EventsProps> = ({ serverEvents }) => {
  const router = useRouter();

  if (serverEvents === undefined) {
    return (
      <div className="w-full border-t-2 border-crred py-16">
        <div className="container mx-auto px-4">
          <EventsHeader />
          <EventsLoader />
        </div>
      </div>
    );
  }

  if (serverEvents.length === 0) {
    return (
      <div className="w-full border-t-2 border-crred py-16">
        <div className="container mx-auto px-4">
          <EventsHeader />
          <NoEvents />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border-t-2 border-crred py-16">
      <div className="container mx-auto md:px-24 px-4">
        <EventsHeader />
        
        <div className={`grid ${serverEvents.length === 1 ? 'justify-center' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'} gap-8 mb-12 items-center`}>
          {serverEvents.map((event, index) => (
            <EventItem
              key={event.slug}
              slug={event.slug}
              imageUrl={event.imageUrl}
              title={event.title}
              endDate={event.endDate}
              description={event.description}
              date={event.date}
              time={event.time}
              isFeatured={index === 0}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <BasicButton
            onClick={() => router.push('/enotourism/events')}
            variant="transparent"
            sizex="xxlarge"
            className="border border-crred"
          >
            Ver Todo
          </BasicButton>
        </div>
      </div>
    </div>
  );
};

export default Events;
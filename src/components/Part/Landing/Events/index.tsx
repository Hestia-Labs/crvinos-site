'use client';

import React from 'react';
import BasicButton from '@/components/Buttons/BasicButton';
import EventsLoader from '@/components/Loaders/EventsLoader';
import NoEvents from './NoEvents';
import EventItem from './EventItem';
import { EventShort } from '@/types/Event';
import { useRouter } from 'next/navigation';

interface EventsProps {
  serverEvents: EventShort[] | undefined; // Could be undefined initially
}

const Events: React.FC<EventsProps> = ({ serverEvents }) => {
  const router = useRouter();

 
  if (serverEvents === undefined) {
    return (
      <div className="flex flex-col w-full items-center justify-center border-crred border-t-2 py-12 space-y-7">
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-crred font-thin tracking-wide mb-2">
            Próximos Eventos
          </h2>
          <p className="text-crred font-extralight italic text-base md:text-lg lg:text-xl">
            Únete para una experiencia inolvidable
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-7 sm:p-6 md:p-8 lg:p-10 w-full sm:w-5/6 md:w-4/5 lg:w-3/4">
          <EventsLoader />
        </div>
      </div>
    );
  }

  if (serverEvents.length === 0) {
    return (
      <div className="flex flex-col w-full items-center justify-center border-crred border-t-2 py-12 space-y-7">
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-crred font-thin tracking-wide mb-2">
            Próximos Eventos
          </h2>
          <p className="text-crred font-extralight italic text-base md:text-lg lg:text-xl">
            Únete para una experiencia inolvidable
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-7 sm:p-6 md:p-8 lg:p-10 w-full sm:w-5/6 md:w-4/5 lg:w-3/4">
          <NoEvents />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center justify-center border-crred border-t-2 py-12 space-y-7">
      <div className="flex flex-col justify-center items-center w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-crred font-thin tracking-wide mb-2">
          Próximos Eventos
        </h2>
        <p className="text-crred font-extralight italic text-base md:text-lg lg:text-xl">
          Únete para una experiencia inolvidable
        </p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-7 sm:p-6 md:p-8 lg:p-10 w-full sm:w-5/6 md:w-4/5 lg:w-3/4">

        <EventItem
          key={serverEvents[0].slug}
          slug={serverEvents[0].slug}
          imageUrl={serverEvents[0].imageUrl}
          title={serverEvents[0].title}
          endDate={serverEvents[0].endDate}
          description={serverEvents[0].description}
          date={serverEvents[0].date}
          time={serverEvents[0].time}
        />

        {serverEvents.length > 1 && (
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full">
            {serverEvents.slice(1).map((event) => (
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
        )}
      </div>

      {serverEvents.length > 0 && (
        <div className="flex w-full justify-center items-center">
          <BasicButton
            onClick={() => router.push('/enoturism')}
            variant="transparent"
            sizex="xxlarge"
            className="border-crred border border-solid"
          >
            <p className="text-nowrap text-sm sm:text-base md:text-lg lg:text-xl">Ver Todo</p>
          </BasicButton>
        </div>
      )}
    </div>
  );
};

export default Events;

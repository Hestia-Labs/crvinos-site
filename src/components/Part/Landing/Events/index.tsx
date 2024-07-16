'use client';

import React, { useEffect, useState } from 'react';
import BasicButton from '@/components/Buttons/BasicButton';
import EventsLoader from '@/components/Loaders/EventsLoader';
import NoEvents from './NoEvents';
import EventItem from './EventItem';
import { EventShort } from '@/types/Event';
import { getEvents } from '@/app/actions/getEvents';

const Events: React.FC = () => {
    const [events, setEvents] = useState<EventShort[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadEvents = async () => {
            const fetchedEvents = await getEvents({ count: 3, shortVersion: true }) as EventShort[];

            const now = new Date();
            const sortedEvents = fetchedEvents.sort((a: EventShort, b: EventShort) => {
                const dateA = new Date(a.endDate);
                const dateB = new Date(b.endDate);

                // If both dates are in the future or both in the past, sort by date
                if ((dateA >= now && dateB >= now) || (dateA < now && dateB < now)) {
                    return dateA.getTime() - dateB.getTime();
                }

                // If only one date is in the future, that one should come first
                if (dateA >= now && dateB < now) {
                    return -1;
                }
                if (dateA < now && dateB >= now) {
                    return 1;
                }

                return 0;
            });

            setEvents(sortedEvents as EventShort[]);
            setLoading(false);
        };

        loadEvents();
    }, []);

    return (
        <div className="flex flex-col w-full items-center justify-center border-crred border-t-2 bg-back py-12 space-y-7">
            <div className='flex flex-col justify-center items-center w-full  flex-colm'>
                <h2 className="text-4xl text-crred font-thin tracking-wide mb-2">Próximos Eventos</h2>
                <p className="text-crred font-extralight italic text-lg">Únete para una experiencia inolvidable</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-7 p-6 w-5/6">
                {loading ? (
                    <EventsLoader />
                ) : (
                    <>
                        {events.length > 0 ? (
                            <>
                                <EventItem
                                    key={events[0].slug}
                                    slug={events[0].slug}
                                    imageUrl={events[0].imageUrl}
                                    title={events[0].title}
                                    endDate={events[0].endDate}
                                    description={events[0].description}
                                    date={events[0].date}
                                    time={events[0].time}
                                />
                                <div className="flex justify-between w-full space-x-7">
                                    {events.slice(1).map(event => (
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
                            </>
                        ) : (
                            <NoEvents />
                        )}
                    </>
                )}
            </div>
            <div className='flex w-full justify-center items-center '>
                <BasicButton variant='transparent' sizex='xxxxlarge' className='border-crred border border-solid'>
                <p className='text-lg'>Ver Todo</p>
                </BasicButton>
            </div>
        </div>
    );
};

export default Events;

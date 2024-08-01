'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import BasicButton from '@/components/Buttons/BasicButton';
import EventsLoader from '@/components/Loaders/EventsLoader';
import NoEvents from '@/components/Part/Landing/Events/NoEvents';
import EventItem from '@/components/Part/Landing/Events/EventItem';
import { EventShort } from '@/types/Event';
import { getEvents } from '@/app/actions/getEvents';

const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<EventShort[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visibleEvents, setVisibleEvents] = useState<number>(3);

    useEffect(() => {
        const loadEvents = async () => {
            const fetchedEvents = await getEvents({ shortVersion: true }) as EventShort[];

            const now = new Date();
            const sortedEvents = fetchedEvents.sort((a: EventShort, b: EventShort) => {
                const dateA = new Date(a.endDate);
                const dateB = new Date(b.endDate);

                if ((dateA >= now && dateB >= now) || (dateA < now && dateB < now)) {
                    return dateA.getTime() - dateB.getTime();
                }

                if (dateA >= now && dateB < now) {
                    return -1;
                }
                if (dateA < now && dateB >= now) {
                    return 1;
                }

                return 0;
            });

            setEvents(sortedEvents);
            setLoading(false);
        };

        loadEvents();
    }, []);

    const loadMoreEvents = () => {
        setVisibleEvents(prevVisibleEvents => prevVisibleEvents + 3);
    };

    return (
        <div className="flex flex-col w-full items-center justify-center  ">
            <Navbar red={true} relative={true} />
            <div className='px-4 sm:px-8 md:px-10 lg:px-20 w-full flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-start items-start w-full px-4 py-6'>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl text-crred font-thin tracking-wide mb-2">Eventos</h1>
                    <p className="text-crred font-extralight italic">Únete para una experiencia inolvidable</p>
                </div>
                <div className='w-full flex flex-col justify-center items-center py-8 border-crred border-t-2'>
                    <div className="flex flex-col items-center justify-center space-y-7 p-4 sm:p-6 w-full sm:w-5/6">
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
                                            {events.slice(1, visibleEvents).map((event) => (
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
                    {visibleEvents < events.length && (
                        <div className='flex w-full justify-center items-center'>
                            <BasicButton onClick={loadMoreEvents} variant='transparent' sizex='xxxxlarge' className='border-crred border border-solid'>
                                <p className='text-lg'>Cargar Más</p>
                            </BasicButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventsPage;

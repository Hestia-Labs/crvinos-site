'use client';

import React, { useEffect, useState } from 'react';
import BasicButton from '@/components/Buttons/BasicButton';
import EventsLoader from '@/components/Loaders/EventsLoader';
import NoEvents from './NoEvents';
import EventItem from './EventItem';
import { EventShort } from '@/types/Event';
import { getEvents } from '@/app/actions/getEvents';
import { useRouter } from 'next/navigation';

const Events: React.FC = () => {
    const [events, setEvents] = useState<EventShort[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const loadEvents = async () => {
            const fetchedEvents = await getEvents({ shortVersion: true }) as EventShort[];
            console.log("fetchedEvents: ", fetchedEvents);
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

            setEvents(sortedEvents.slice(0, 3) as EventShort[]);
            setLoading(false);
        };

        loadEvents();
    }, []);

    return (
        <div className="flex flex-col w-full items-center justify-center border-crred border-t-2 py-12 space-y-7">
            <div className='flex flex-col justify-center items-center w-full'>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-crred font-thin tracking-wide mb-2">Próximos Eventos</h2>
                <p className="text-crred font-extralight italic text-base md:text-lg lg:text-xl">Únete para una experiencia inolvidable</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-7   sm:p-6 md:p-8 lg:p-10 w-full sm:w-5/6 md:w-4/5 lg:w-3/4">
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
                                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full">
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
            </div>{ events.length > 0 &&
            <div className='flex w-full justify-center items-center'>
                <BasicButton onClick={() => { router.push("/enoturism") }} variant='transparent' sizex='xxlarge' className='border-crred border border-solid'>
                    <p className=' text-nowrap text-sm sm:text-base md:text-lg lg:text-xl'>Ver Todo</p>
                </BasicButton>
            </div>}
        </div>
    );
};

export default Events;

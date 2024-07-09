'use client';

import React, { useEffect, useState } from 'react';
import BasicButton from '@/components/Buttons/BasicButton';
import Icon from '@/components/Icons';
import EventsLoader from '@/components/Loaders/EventsLoader';
import { Event } from '@/types/Event';
import { fetchRandomPhotos } from '@/app/actions/fetchRandomPhotos';


const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadPhotos = async () => {
            const fetchedEvents = await fetchRandomPhotos(3,"vineyard");
            setEvents(fetchedEvents);
            if (fetchedEvents.length > 0)
            setLoading(false);

        };

        loadPhotos();
    }, []);

    return (
        <div className="flex flex-col w-full items-center justify-center border-crred border-t-2 bg-back py-12 space-y-7">
            <div className='flex flex-col justify-center items-center w-full pt-9 flex-colm'>
                <h2 className="text-4xl text-crred font-thin tracking-wide mb-2">Próximos Eventos</h2>
                <p className="text-crred font-extralight italic text-lg">Únete para una experiencia inolvidable</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-7 p-6 w-5/6">
                {loading ? (
                    <EventsLoader />
                ) : (
                    <>
                        {events.length > 0 && (
                            <div className="w-full overflow-hidden cursor-pointer">
                                <img src={events[0].imageUrl} alt={events[0].title} className="w-full h-64 object-cover" />
                                <div className="flex justify-between mt-4 border-crred border-t w-full py-4 px-2">
                                    <div className='space-y-3'>
                                        <div className='space-y-1'>
                                            <p className="text-crred text-lg cormorant-garamond-light">{events[0].title}</p>
                                            <p className="text-crred text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                        <div className='flex justify-start items-center space-x-2 transition duration-300 ease-in-out hover:space-x-3'>
                                            <p className="font-cormorant text-crred underline cursor-pointer transition-colors duration-300 ease-in-out hover:text-crred-light hover:underline-offset-2">Descubre Más</p>
                                            <Icon name='Arrow' className="h-5 w-5" />
                                        </div>    
                                    </div>
                                    <div className='flex flex-col items-end space-y-1'>
                                        <p className="text-crred text-lg">{events[0].date}</p>
                                        <p className="text-crred text-lg">{events[0].time}</p> 
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between w-full space-x-7">
                            {events.slice(1).map(event => (
                                <div key={event.id} className="flex flex-col items-center justify-center space-y-2 w-1/2 overflow-hidden cursor-pointer">
                                    <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
                                    <div className="flex justify-between mt-4 border-crred border-t w-full py-4 px-2">
                                        <div className='space-y-3'>
                                            <div className='space-y-1'>
                                                <p className="text-crred text-lg cormorant-garamond-light">{event.title}</p>
                                                <p className="text-crred text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                            </div>
                                            <div className='flex justify-start items-center space-x-2 transition duration-300 ease-in-out hover:space-x-3'>
                                                <p className="font-cormorant text-crred underline cursor-pointer transition-colors duration-300 ease-in-out hover:text-crred-light hover:underline-offset-2">Descubre Más</p>
                                                <Icon name='Arrow' className="h-5 w-5" />
                                            </div>    
                                        </div>
                                        <div className='flex flex-col items-end space-y-1'>
                                            <p className="text-crred text-lg">{event.date}</p>
                                            <p className="text-crred text-lg">{event.time}</p> 
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className='flex w-full justify-center items-center '>
                <BasicButton variant='transparent' sizex='xxxxlarge' className='border-crred border border-solid'>
                    Ver Todo
                </BasicButton>
            </div>
        </div>
    );
};

export default Events;

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getEvents } from '@/app/actions/getEvents';
import Navbar from '@/components/Navbar';
import { Event } from '@/types/Event';
import Icon from '@/components/Icons';
import { useRouter } from 'next/navigation';
import BasicButton from '@/components/Buttons/BasicButton'; // Import BasicButton

const EventPage: React.FC = () => {
    const params = useParams<{ slug: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const router = useRouter();
    useEffect(() => {
        const fetchEvent = async () => {
            const events = await getEvents({ eventId: params.slug });
            if (events.length > 0) {
                setEvent(events[0] as Event);
            }
        };

        fetchEvent();
    }, [params.slug]);

    if (!event) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        const options: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return date.toLocaleTimeString('en-US', options);
    };

    return (
        <div className="flex flex-col w-full items-center justify-center bg-back py-12 space-y-7">
            <Navbar red={true} relative={true} />
            <div className='px-20 w-full flex flex-col justify-center items-center'>
                
                <div className='w-full flex flex-col justify-center items-center py-8 border-crred border-t-2'>
                    <div className='flex w-full justify-start items-start'>
                        <div onClick={()=>{router.push("/enoturism")}} className=' flex items-center space-x-4 transition duration-500 ease-in-out transform hover:-translate-x-2 cursor-pointer mb-6'>
                            <Icon name='Arrow' className="h-5 w-5 transition-transform duration-500 ease-in-out transform hover:translate-x-2" style={{ transform: 'rotate(180deg)' }} />
                            <p className="font-cormorant text-crred transition-colors duration-500 ease-in-out hover:text-crred-light">Regresar a Eventos</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-start min-w-full px-4 py-6'>
                        <h1 className="text-6xl text-crred font-thin tracking-wide mb-2">{event.title}</h1>
                        <p className="text-crred font-extralight italic">{event.description}</p>
                    </div>
                    <img src={event.posterURL} alt={event.posterAlt} className="w-full h-100 object-cover" />
                    <div className='flex flex-col space-y-10 border-crred border-t mt-4 w-full'>
                        <div className="event-details mt-4 w-full py-4 px-2 ">
                            <div className='min-w-full flex justify-between '>
                                <div className='w-1/2 items-start justify-start'>
                                    <h1 className='text-crred text-4xl'>{event.organizer}</h1>
                                </div>
                                <div className='w-1/2 flex flex-col items-end '>
                                    <p className="text-crred text-sm italic">
                                        <strong>Fecha:</strong> {formatDate(event.dates.start)} - {formatDate(event.dates.end)}
                                    </p>
                                    <p className="text-crred text-sm italic">
                                        <strong>Hora:</strong> {formatTime(event.dates.start)} - {formatTime(event.dates.end)}
                                    </p>
                                </div>
                            </div>
                            <div className="event-meta flex flex-col md:flex-row gap-4">
                                <div className="left-section flex flex-col space-y-2 md:w-1/3">
                                    <p className="text-crred text-lg italic"><strong>Fecha de Inicio:</strong> {formatDate(event.dates.start)}</p>
                                    <p className="text-crred text-lg italic"><strong>Fecha de Finalización:</strong> {formatDate(event.dates.end)}</p>
                                    <p className="text-crred text-lg italic"><strong>Hora de Inicio:</strong> {formatTime(event.dates.start)}</p>
                                    <p className="text-crred text-lg italic"><strong>Hora de Finalización:</strong> {formatTime(event.dates.end)}</p>
                                </div>
                                <div className="right-section flex flex-col space-y-2 md:w-2/3">
                                    <p className="text-crred text-lg"><strong>Categorías:</strong> {event.categories.join(', ')}</p>
                                    <p className="text-crred text-lg"><strong>Límite de Asistencia:</strong> {event.attendanceCap}</p>
                                    <p className="text-crred text-lg"><strong>Ubicación del Texto:</strong> {event.textLocation}</p>
                                    <p className="text-crred text-lg"><strong>Enlace de Ubicación:</strong> <a href={event.locationLink} target="_blank" rel="noopener noreferrer">{event.locationLink}</a></p>
                                    <p className="text-crred text-lg"><strong>Enlace:</strong> <a href={event.link} target="_blank" rel="noopener noreferrer">{event.link}</a></p>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <BasicButton variant="bg-crred" sizex="xxxlarge" sizey="large" onClick={() => alert('Mock purchase action')}>
                                Buy Tickets
                            </BasicButton>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default EventPage;

'use client';

import React from 'react';
import Icon from '@/components/Icons';
import { useRouter } from 'next/navigation';

interface EventItemProps {
    imageUrl: string;
    title: string;
    description: string;
    endDate: string;
    date: string;
    time: string;
    slug?: string; 
}

const EventItem: React.FC<EventItemProps> = ({ imageUrl, title, description, date, endDate, time, slug }) => {
    const eventDate = new Date(endDate);
    const currentDate = new Date();
    const isPastEvent = eventDate < currentDate;
    const router = useRouter();

    const handleClick = () => {
        if (isPastEvent) return;
     
        if (slug) {
            router.push(`/enoturism/${slug}`);
        }
    };

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
        <div 
            className={`w-full overflow-hidden  relative ${isPastEvent ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
            onClick={ handleClick}
        >
            <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
            {isPastEvent && (
                <div className="absolute inset-0 flex items-center justify-center bg-crred bg-opacity-15">
                    <p className="text-white text-2xl cormorant-garamond-semibold  ">Evento Pasado</p>
                </div>
            )}
            <div className="flex justify-between mt-4 border-crred border-t w-full py-4 px-2">
                <div className='space-y-3'>
                    <div className='space-y-1'>
                        <p className="text-crred text-lg cormorant-garamond-light">{title}</p>
                        <p className="text-crred text-sm">{description}</p>
                    </div>
                    <div className='flex justify-start items-center space-x-2 transition duration-300 ease-in-out transform hover:translate-x-2  '>
                        <p className="font-cormorant text-crred underline cursor-pointer transition-colors duration-300 ease-in-out hover:text-crred-light hover:underline-offset-2">Descubre Más</p>
                        <Icon name='Arrow' className="h-5 w-5 " />
                    </div>
                </div>
                <div className='flex flex-col items-end space-y-1'>
                    <p className="text-crred text-sm">{formatDate(date)}</p>
                    <p className="text-crred text-sm">{formatTime(time)}</p>
                </div>
            </div>
        </div>
    );
};

export default EventItem;

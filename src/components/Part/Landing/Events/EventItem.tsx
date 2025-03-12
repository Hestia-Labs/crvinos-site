'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/Icons';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

/** Helper: Flatten Portable Text into plain text */
function getPlainTextFromPortableText(blocks: any[]): string {
  if (!blocks) return '';

  return blocks
    .map(block => {
      // If it's a "block" type that has children, join their text
      if (block._type === 'block' && Array.isArray(block.children)) {
        return block.children.map((child: any) => child.text).join('');
      }
      return '';
    })
    .join(' ');
}

/** Custom hook: detect if we're below a certain breakpoint (e.g. 640px) */
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);
    checkScreenSize(); // check on mount
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  return isMobile;
}

interface EventItemProps {
  imageUrl: string;
  title: string;
  description: any[];
  endDate: string;
  date: string;
  time: string;
  slug?: string;
  isFeatured?: boolean;
}

const EventItem: React.FC<EventItemProps> = ({ 
  imageUrl, 
  title, 
  description, 
  date, 
  endDate, 
  time, 
  slug,
  isFeatured = false
}) => {
  const router = useRouter();
  const isMobile = useIsMobile(); 
  const eventStartDate = new Date(date);
  const eventEndDate = new Date(endDate);
  const currentDate = new Date();
  const isPastEvent = eventEndDate < currentDate;

  /** Flatten portable text into one string */
  const fullText = getPlainTextFromPortableText(description);
  
  /** Decide how many characters to show */
  let maxLength = isFeatured ? 260 : 180;
  // If on mobile, reduce the max length a bit so it doesn’t look cramped
  if (isMobile) {
    maxLength = isFeatured ? 150 : 120;
  }

  /** Truncate and add ... manually */
  const truncatedDesc =
    fullText.length > maxLength 
      ? fullText.slice(0, maxLength) + '...' 
      : fullText;

  const handleClick = () => {
    if (slug) router.push(`/enotourism/events/${slug}`);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const isMultiDayEvent = eventEndDate.toDateString() > eventStartDate.toDateString();

  return (
    <motion.div
      className={`group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 opacity-95 hover:opacity-85 ${
        isFeatured ? 'md:col-span-1 xl:col-span-2 ring-2 ring-crred/20' : ''
      } ${isPastEvent ? 'opacity-80' : 'hover:ring-1 hover:ring-crred/30'}`}
    >
      <div 
        className="flex flex-col h-full cursor-pointer rounded-xl overflow-hidden"
        onClick={handleClick}
      >
        {/* Image */}
        <div 
          className={`relative ${
            isFeatured ? 'aspect-[2.4/1]' : 'aspect-[1.6/1]'
          } overflow-hidden`}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`object-cover transition-transform duration-300 ${
              isPastEvent ? 'grayscale' : ''
            }`}
            sizes={
              isFeatured 
                ? "(min-width: 1280px) 50vw, 100vw" 
                : "(min-width: 768px) 50vw, 100vw"
            }
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {isPastEvent && (
            <div className="absolute top-4 right-4 bg-crred/90 text-white px-3 py-1.5 text-xs font-medium rounded-full backdrop-blur-sm">
              Evento Pasado
            </div>
          )}

        </div>

        {/* Text Content */}
        <div className="p-6 flex flex-col flex-1 space-y-4">
          <h3
            className={`${
              isFeatured ? 'text-2xl md:text-3xl font-light' : ' text-lg md:text-2xl font-light'
            } text-crred`}
          >
            {title}
          </h3>

          {/* Manually truncated text */}
          <p className={`${isFeatured ? 'text-base' : 'text-sm'} text-gray-700 font-light`}>
            {truncatedDesc}
          </p>

          {/* Footer Section */}
          <div className="mt-auto flex justify-between items-center">
            {/* Dates */}
            <div className="space-y-1">
              {isMultiDayEvent ? (
                <div className="flex flex-col items-center -space-y-1 md:flex-row md:space-x-2">
                  <p className="font-light text-crred">{formatDate(date)}</p>
                  <p className="font-light text-crred">-</p>
                  <p className="font-light text-crred">{formatDate(endDate)}</p>
                </div>
              ) : (
                <p className="md:text-lg font-light text-crred">
                  {formatDate(date)}
                </p>
              )}
            </div>

            {/* Action Link (only show if upcoming) */}
            {!isPastEvent && (
              <motion.div
                className="flex md:text-lg items-center space-x-2 group-hover:text-crred-dark"
                whileHover={{ x: 5 }}
              >
                <span className="text-crred font-light">
                  {isFeatured ? 'Ver Detalles' : 'Descubrir'}
                </span>
                <Icon name="Arrow" className="h-4 w-4 text-crred" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventItem;

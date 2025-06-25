'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { NotificationPop } from '@/types/Notifications';
import { shouldShowNotification } from '@/utils/notifications';
import BasicButton from '@/components/Buttons/BasicButton';
interface NotificationPopupProps {
  notification: NotificationPop;
  onClose: () => void;
}

const NOTIFICATION_HISTORY_KEY = 'cr-vinos-notification-history';

// Helper to update notification history in localStorage
const updateNotificationHistory = (notificationTitle: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    const existingHistory = localStorage.getItem(NOTIFICATION_HISTORY_KEY);
    const history = existingHistory 
      ? JSON.parse(existingHistory) 
      : { lastShown: new Date().toISOString(), shownNotifications: [] };
    
    // Update the last shown date
    history.lastShown = new Date().toISOString();
    
    // Add this notification to the shown list if not already there
    if (!history.shownNotifications.includes(notificationTitle)) {
      history.shownNotifications.push(notificationTitle);
    }
    
    localStorage.setItem(NOTIFICATION_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error updating notification history:', error);
  }
};

// Format date to elegant Spanish format
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const NotificationPopup: React.FC<NotificationPopupProps> = ({ notification, onClose }) => {
  const router = useRouter();
  const [showBackdrop, setShowBackdrop] = useState(false);
  
  // Function to get the correct image source
  const getImageSource = (): string => {
    // For events, use the poster image if available
    if (notification.contentType === 'event' && 
        notification.eventReference?.poster?.url) {
      return notification.eventReference.poster.url;
    }
    
    // For experiences, use the cover image if available
    if (notification.contentType === 'experience' && 
        notification.experienceReference?.coverImage?.url) {
      return notification.experienceReference.coverImage.url;
    }
    
    // Default to notification banner
    return notification.banner.url;
  };
  
  // Function to get image alt text
  const getImageAlt = (): string => {
    // For events or experiences, use their title
    if (getContentTitle()) {
      return getContentTitle() || '';
    }
    
    // Default to notification title or banner alt
    return notification.banner.alt || notification.title;
  };
  
  const handleAction = () => {
    // Handle action based on content type
    switch (notification.contentType) {
      case 'event':
        if (notification.eventReference?._ref) {
          router.push(`/enotourism/events/${notification.eventReference.slug.current}`);
        }
        break;
      case 'experience':
        if (notification.experienceReference?.slug?.current) {
          router.push(`/enotourism/experiences/${notification.experienceReference.slug.current}`);
        }
        break;
      case 'custom':
        if (notification.link) {
          // Open external links in a new tab, internal links in same tab
          if (notification.link.startsWith('http')) {
            window.open(notification.link, '_blank', 'noopener,noreferrer');
          } else {
            router.push(notification.link);
          }
        }
        break;
    }
    
    handleClose();
  };
  
  const handleClose = () => {
    updateNotificationHistory(notification.title);
    setShowBackdrop(false);
    // Delayed onClose to allow exit animation to play
    setTimeout(() => onClose(), 300);
  };
  
  // Get invitation text based on content type
  const getInvitationText = () => {
    switch (notification.contentType) {
      case 'event':
        return '¡Te invitamos a participar en este evento exclusivo!';
      case 'experience':
        return '¡Descubre esta experiencia única con nuestros vinos!';
      default:
        return '¡Descubre más sobre nuestros vinos y experiencias!';
    }
  };
  
  // Get event or experience title
  const getContentTitle = () => {
    if (notification.contentType === 'event' && notification.eventReference?.title) {
      return notification.eventReference.title;
    } else if (notification.contentType === 'experience' && notification.experienceReference?.title) {
      return notification.experienceReference.title;
    }
    return null;
  };
  
  // When component mounts, set showBackdrop to true for entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackdrop(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence>
      {showBackdrop && (
        <Dialog open={true} onClose={handleClose} className="relative z-50">
          {/* Use a separate motion div for the backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          />
          
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              {/* Use Dialog.Panel without motion */}
              <Dialog.Panel className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl">
                {/* Wrap the panel content in a motion div */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 8 }}
                  transition={{ 
                    type: "spring",
                    duration: 0.35, 
                    bounce: 0.05 
                  }}
                  className="w-full"
                >
                  {/* Subtle accent bar at top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crred/40 via-crred to-crred/40"></div>
                  
                  {/* Top right close button */}
                  <button 
                    onClick={handleClose}
                    className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-500 transition-all hover:bg-gray-100 hover:text-crred"
                    aria-label="Close notification"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  <div className="flex flex-col md:flex-row">
                    {/* Left side - Image */}
                    <div className="relative h-72 md:h-auto md:w-5/12">
                      <Image
                        src={getImageSource()}
                        alt={getImageAlt()}
                        fill
                        priority
                        className="object-cover"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
                      
                      {/* Content label overlay */}
                      {notification.contentType !== 'custom' && (
                        <div className="absolute top-5 left-5 bg-white/90 text-crred text-xs font-medium tracking-wide px-3 py-1.5 rounded-sm">
                          {notification.contentType === 'event' ? 'EVENTO' : 'EXPERIENCIA'}
                        </div>
                      )}
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="p-7 md:p-10 md:w-7/12 flex flex-col">
                      {/* Subtle invitation text */}
                      <p className="text-sm text-gray-500 mb-2 font-light tracking-wide">
                        {getInvitationText()}
                      </p>

                      {/* Main notification title */}
                      <h3 className="text-2xl font-light text-crred cormorant-garamond italic">
                        {notification.title}
                      </h3>
                      
                      {/* Event/Experience title if available */}
                      {getContentTitle() && (
                        <h4 className="mt-3 text-xl font-medium text-gray-800">
                          {getContentTitle()}
                        </h4>
                      )}
                      
                      {/* Elegant divider */}
                      <div className="w-16 h-px bg-crred/20 my-4"></div>
                      
                      {/* Description */}
                      {notification.subtitle && (
                        <p className="mt-2 text-base font-light text-gray-600 leading-relaxed">
                          {notification.subtitle}
                        </p>
                      )}
                      
                      {/* Event date if it's an event */}
                      {notification.contentType === 'event' && notification.eventReference?.dates && (
                        <div className="mt-5 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2.5 h-4 w-4 text-crred/70">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            <span className="font-light tracking-wide">
                              {formatDate(notification.eventReference.dates.start)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Experience label if it's an experience */}
                      {notification.contentType === 'experience' && notification.experienceReference?.title && (
                        <div className="mt-5 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2.5 h-4 w-4 text-crred/70">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                            </svg>
                            <span className="font-light tracking-wide">
                              Experiencia disponible
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Spacer to push buttons to bottom */}
                      <div className="flex-grow min-h-4"></div>

                      {/* Action buttons */}
                      <div className="mt-6 flex gap-4">
                        <BasicButton
                          onClick={handleAction}
                          variant="bg-crred"
                          className="flex-1  py-2.5 text-center text-sm font-light tracking-wide transition-colors border border-crred"
                        >
                          {notification.buttonText}
                        </BasicButton>
                        <BasicButton
                          onClick={handleClose}
                          variant="transparent"
                          className="border border-gray-200 px-5 py-2.5 text-center text-sm font-light tracking-wide text-gray-600 transition-colors hover:bg-gray-50 hover:text-crred"
                        >
                          Cerrar
                        </BasicButton>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup; 
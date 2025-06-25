'use client';

import { useEffect, useState } from 'react';

export default function ScrollAnimationHandler() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    // Check if we're on a touch device (mobile)
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    
    if (!window.matchMedia('(hover: none)').matches) return; // Only apply on touch devices
    
    const animateOnScroll = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Add a class when the element is visible with delay
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('in-view');
              }, 300); // 300ms delay to show more of the div
              
              // Optionally, stop observing after animation is triggered
              // observer.unobserve(entry.target);
            } else {
              // Remove class when element is not visible (for when it scrolls out of view)
              entry.target.classList.remove('in-view');
            }
          });
        },
        {
          root: null, // viewport
          rootMargin: '0px',
          threshold: 0.4, // Increased threshold to show more of div before triggering
        }
      );

      // Observe all collection links
      document.querySelectorAll('.group').forEach((el) => {
        observer.observe(el);
      });
      
      return observer;
    };

    const observer = animateOnScroll();
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return null;
}
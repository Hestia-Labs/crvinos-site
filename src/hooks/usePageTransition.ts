'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTransition } from '@/components/TransitionLink';

/**
 * A custom hook that provides a simple API for managing page transitions.
 * This is now a wrapper around the TransitionContext for backwards compatibility.
 */
export const usePageTransition = (animationDuration = 1.8) => {
  const router = useRouter();
  const { isTransitioning, startTransition } = useTransition();

  const navigate = useCallback((url: string) => {

    
    // Skip if trying to navigate to current page
    if (url === window.location.pathname) {
      return;
    }
    
    if (!isTransitioning) {
      // Small delay to ensure any click handlers have completed
      setTimeout(() => {
        startTransition(url);
      }, 10);
    } else {
     
    }
  }, [startTransition, isTransitioning]);

  const resetTransition = useCallback(() => {
    // This is now handled internally by the TransitionProvider
    // No-op for backward compatibility
  }, []);

  // Register beforeunload event to show loading animation when leaving the site
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Show loading animation when navigating away from the site
      // This doesn't actually control the browser's behavior,
      // it just shows our loading animation
      startTransition('/');
      
      // We don't need to return anything here since we're not
      // trying to show a confirmation dialog
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [startTransition]);

  return {
    isTransitioning,
    startTransition: navigate,
    resetTransition,
  };
};

export default usePageTransition; 
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TransitionScreen from '../components/TransitionScreen';

interface TransitionContextType {
  startTransition: (href?: string) => void;
  endTransition: () => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

// Helper function to detect if we're in a crawler/bot environment
function isCrawlerOrBot(): boolean {
  if (typeof window === 'undefined') return true; // Server-side rendering - assume it's a bot for safety
  
  try {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const botPatterns = [
      'googlebot', 'bingbot', 'yandex', 'baiduspider', 'facebookexternalhit',
      'twitterbot', 'rogerbot', 'linkedinbot', 'embedly', 'quora link preview',
      'showyoubot', 'outbrain', 'pinterest', 'slackbot', 'vkShare', 'W3C_Validator',
      'crawler', 'spider', 'bot', 'lighthouse', 'chrome-lighthouse'
    ];
    
    return botPatterns.some(pattern => userAgent.includes(pattern));
  } catch (error) {
    console.error('Error detecting bot in client:', error);
    // Default to true in case of error - safer for SEO
    return true;
  }
}

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [destinationHref, setDestinationHref] = useState<string | null>(null);
  const router = useRouter();
  const isBot = isCrawlerOrBot();

  // Start the transition with optional destination URL
  const startTransition = useCallback((href?: string) => {
    try {
      // For bots/crawlers, skip transitions and navigate immediately
      if (isBot && href) {
        router.push(href);
        return;
      }
      

      setIsVisible(true);
      if (href) {
        setDestinationHref(href);
      }
    } catch (error) {
      console.error('Error in startTransition:', error);
      // In case of error, try direct navigation as fallback
      if (href) {
        router.push(href);
      }
    }
  }, [isBot, router]);

  // End the transition
  const endTransition = useCallback(() => {
    try {

      setIsVisible(false);
      setDestinationHref(null);
    } catch (error) {
      console.error('Error in endTransition:', error);
    }
  }, []);

  // Handle animation complete - this will be called when the animation exit is done
  const handleAnimationComplete = useCallback(() => {
    try {
     
    } catch (error) {
      console.error('Error in animation complete handler:', error);
    }
  }, []);

  // Handle navigation when animation is visible
  useEffect(() => {
    if (!isBot && isVisible && destinationHref) {
      try {
        // The navigation will happen after the animation has had time to play
        // We need just enough time for the animation to be visible but not too long
        const navigationTimer = setTimeout(() => {
          router.push(destinationHref);
        }, 800); // Reduced from 1500ms to 800ms for a more responsive feel
        
        return () => clearTimeout(navigationTimer);
      } catch (error) {
        console.error('Error in navigation effect:', error);
        // Fall back to direct navigation
        if (destinationHref) {
          router.push(destinationHref);
        }
      }
    }
  }, [isVisible, destinationHref, router, isBot]);

  // Safety mechanism to ensure transition doesn't get stuck
  useEffect(() => {
    if (!isBot && isVisible) {
      try {
        const safetyTimer = setTimeout(() => {
          if (destinationHref) {
            router.push(destinationHref);
          }
          endTransition();
        }, 3000); // Reduced from 5000ms to 3000ms
        
        return () => clearTimeout(safetyTimer);
      } catch (error) {
        console.error('Error in safety timer effect:', error);
        // Fall back to direct navigation
        if (destinationHref) {
          router.push(destinationHref);
        }
        endTransition();
      }
    }
  }, [isVisible, endTransition, destinationHref, router, isBot]);

  // For bots, provide a simplified context that just does direct navigation
  if (isBot) {
    return (
      <TransitionContext.Provider 
        value={{ 
          startTransition: (href?: string) => { if (href) router.push(href); }, 
          endTransition: () => {}, 
          isTransitioning: false
        }}
      >
        {children}
      </TransitionContext.Provider>
    );
  }

  return (
    <TransitionContext.Provider 
      value={{ 
        startTransition, 
        endTransition, 
        isTransitioning: isVisible 
      }}
    >
      {children}
      <TransitionScreen 
        isVisible={isVisible} 
        onAnimationComplete={handleAnimationComplete} 
      />
    </TransitionContext.Provider>
  );
};

export const useTransition = (): TransitionContextType => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};

export default useTransition; 
'use client';

import React, { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import useTransition from '@/contexts/TransitionContext';

// TransitionLink component properties
export interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// Expose the TransitionProvider from the new context
export { TransitionProvider } from '@/contexts/TransitionContext';
export { useTransition } from '@/contexts/TransitionContext';

// TransitionLink component (drop-in replacement that uses the new system)
const TransitionLink: React.FC<TransitionLinkProps> = ({ 
  href, 
  children, 
  className = '',
  onClick,
  ...props 
}) => {
  const { startTransition, isTransitioning } = useTransition();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow the custom onClick to run first
    if (onClick) {
      onClick(e);
    }
    
    // Skip transition for external links, anchors, or when modifier keys are pressed
    const isExternal = typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:'));
    const isAnchor = typeof href === 'string' && href.startsWith('#');
    const hasModifier = e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
    
    if (isExternal || isAnchor || hasModifier || isTransitioning) {
      return; // Let the default link behavior handle it
    }
    
    // Get the URL string for the destination
    const hrefString = typeof href === 'object' ? href.pathname || '/' : href;
    
    // Check if we're on the client side and skip the transition if we're already on this page
    if (typeof window !== 'undefined' && hrefString === window.location.pathname) {
      return;
    }
    
    e.preventDefault();
    
    // Start the transition with the URL to navigate to
    startTransition(hrefString);
  };

  return (
    <Link 
      href={href} 
      className={className} 
      onClick={handleClick} 
      {...props}
    >
      {children}
    </Link>
  );
};

export default TransitionLink; 
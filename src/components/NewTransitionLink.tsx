'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import useTransition from '@/contexts/TransitionContext';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({ 
  href, 
  children, 
  className = '',
  onClick
}: TransitionLinkProps) {
  const { startTransition, isTransitioning } = useTransition();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow custom onClick to run first
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
    
    // Skip the transition if we're already on this page
    if (href === window.location.pathname) {
      return;
    }
    
    e.preventDefault();
    
    // Start the transition with the URL to navigate to
    startTransition(href);
  };

  return (
    <Link 
      href={href} 
      className={className} 
      onClick={handleClick}
    >
      {children}
    </Link>
  );
} 
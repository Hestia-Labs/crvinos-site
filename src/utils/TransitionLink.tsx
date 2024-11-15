'use client';
import React from 'react';
import Link, {LinkProps} from 'next/link';
import { useRouter } from 'next/navigation';

interface TransitionLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({ href, children, className, ...props }) => {

    const router = useRouter();

    const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        router.push(href);
    }
  return (
    <Link onClick={handleTransition} className={className} href={href} {...props}>
      {children} 
    </Link>
    );
}



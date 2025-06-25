'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbProps {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeItemClasses?: string;
  inactiveItemClasses?: string;
  excludePaths?: string[];
  hideBreadcrumbOnPaths?: string[];
}

// Define a mapping for path segments to readable names
const pathNameMapping: Record<string, string> = {
  'about': 'Acerca de',
  'blog': 'Blog',
  'contact': 'Contacto',
  'catalog': 'Catálogo',
  'experiences': 'Experiencias',
  'restaurant': 'Restaurante',
  'enotourism': 'Enoturismo',
  'account': 'Mi Cuenta',
  'terms': 'Términos y Condiciones',
  'legal': 'Información Legal',
  'privacy': 'Política de Privacidad',
  // Collection names for better display
  'dbc': 'DBC',
  'hermelinda': 'Hermelinda',
  'recuento': 'Recuento'
};

const Breadcrumb = ({
  homeElement = <HomeIcon className="h-4 w-4" />,
  separator = <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />,
  containerClasses = "flex py-4 px-4 md:px-6 text-sm",
  listClasses = "flex items-center",
  activeItemClasses = "text-primary font-semibold",
  inactiveItemClasses = "text-gray-500 hover:text-primary transition-colors duration-200",
  excludePaths = [''],
  hideBreadcrumbOnPaths = ['/']
}: BreadcrumbProps) => {
  const pathname = usePathname();
  
  // Check if we should hide the breadcrumb on this path
  // This allows hiding on exact paths like homepage, or patterns
  if (hideBreadcrumbOnPaths.some(path => {
    // Exact match
    if (!path.includes('*')) return pathname === path;
    // Wildcard pattern matching
    const pattern = path.replace('*', '');
    return pathname.startsWith(pattern);
  })) {
    return null;
  }
  
  // Split the pathname into segments
  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  
  // If no path segments (homepage), don't render breadcrumbs
  if (pathSegments.length === 0) {
    return null;
  }
  
  // Create an array of breadcrumb items
  const breadcrumbs = pathSegments.map((segment, index) => {
    // Check if we're in a catalog path and handle it specially
    const isCatalogPath = pathSegments[0] === 'catalog';
    const isCollectionSegment = isCatalogPath && index === 1;
    const isWineSegment = isCatalogPath && index === 2;
    
    // Build the href for this segment
    let href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    
    // For collection segments, link to catalog with query parameter
    if (isCollectionSegment) {
      href = `/catalog?line=${segment}`;
    }
    
    // Skip rendering if this path should be excluded
    if (excludePaths.includes(segment)) {
      return null;
    }
    
    // Get the display name for this segment
    let displayName = pathNameMapping[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    // Format wine names for better readability
    if (isWineSegment) {
      displayName = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    // Is this the last segment in the path? (active page)
    const isLast = index === pathSegments.length - 1;
    
    return (
      <React.Fragment key={href}>
        {index > 0 && separator}
        <li className="flex items-center">
          {isLast ? (
            <span className={activeItemClasses}>{displayName}</span>
          ) : (
            <Link href={href} className={inactiveItemClasses}>
              {displayName}
            </Link>
          )}
        </li>
      </React.Fragment>
    );
  });

  return (
    <nav aria-label="Breadcrumb" className={containerClasses}>
      <ol className={listClasses}>
        <li className="flex items-center">
          <Link href="/" className={inactiveItemClasses} aria-label="Inicio">
            {homeElement}
          </Link>
        </li>
        {breadcrumbs}
      </ol>
    </nav>
  );
};

export default Breadcrumb; 
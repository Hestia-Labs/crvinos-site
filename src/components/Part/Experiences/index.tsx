'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ExperienceShort } from '@/types/Experience';
import Reveal from '@/components/Effects/reveal';
import ExperiencesFilters from './ExperiencesFilters';
import ExperiencesGrid from './ExperiencesGrid';

interface ExperiencesProps {
  allExperiences: ExperienceShort[];
  experiencesByCategory: Record<string, ExperienceShort[]>;
  categories: string[];
  initialCategory?: string;
  initialQuery?: string;
  initialPriceRange?: [number, number]; // Will be removed/not used
  minPrice?: number;
  maxPrice?: number;
  totalExperiencesCount?: number;
}

export default function Experiences({
  allExperiences,
  experiencesByCategory,
  categories,
  initialCategory = 'all',
  initialQuery = '',
  initialPriceRange = undefined, // Will be removed/not used
  minPrice = 0,
  maxPrice = 0,
  totalExperiencesCount,
}: ExperiencesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize filter state from URL parameters
  const initialCategoryFromUrl = searchParams.get('categoria') || searchParams.get('category') || initialCategory || 'all';
  const initialQueryFromUrl = searchParams.get('busqueda') || searchParams.get('query') || initialQuery || '';
  const initialOrderFromUrl = searchParams.get('orden') as 'default' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc' || 'default';
  const initialAvailableFromUrl = searchParams.get('disponibles') === 'true';

  // These state variables will be passed to child components
  const [activeCategory, setActiveCategory] = useState<string | 'all'>(
    initialCategoryFromUrl as string | 'all'
  );
  const [searchQuery, setSearchQuery] = useState(initialQueryFromUrl);
  const [showAll, setShowAll] = useState(false);
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc'>(
    ['default', 'price-asc', 'price-desc', 'duration-asc', 'duration-desc'].includes(initialOrderFromUrl) 
      ? initialOrderFromUrl 
      : 'default'
  );
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(initialAvailableFromUrl);
  
  // State for mobile filter visibility
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  
  // Use the provided totalExperiencesCount or fall back to calculating it
  const calculatedTotalCount = useMemo(() => {
    // Always use the server-provided total count when available
    if (totalExperiencesCount !== undefined) {
      return totalExperiencesCount;
    }
    // Only fall back to calculating from allExperiences when necessary
    return allExperiences.length;
  }, [totalExperiencesCount]);

  const filteredExperiences = useMemo(() => {
    if (!allExperiences) return [];
    
    let filtered = [...allExperiences];
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(exp => exp.category?.toLowerCase() === activeCategory.toLowerCase());
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(exp => (
        exp.title?.toLowerCase().includes(normalizedQuery) ||
        exp.basicDescription?.toLowerCase().includes(normalizedQuery) ||
        exp.category?.toLowerCase().includes(normalizedQuery) ||
        exp.subtitle?.toLowerCase().includes(normalizedQuery)
      ));
    }
    
    // Filter to show only available experiences
    if (showOnlyAvailable) {
      filtered = filtered.filter(exp => !exp.commingSoon);
    }
    
    // Apply sorting
    if (sortOrder !== 'default') {
      if (sortOrder === 'price-asc') {
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
      } else if (sortOrder === 'price-desc') {
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (sortOrder === 'duration-asc') {
        filtered.sort((a, b) => ((typeof a.duration === 'number' ? a.duration : 0) - (typeof b.duration === 'number' ? b.duration : 0)));
      } else if (sortOrder === 'duration-desc') {
        filtered.sort((a, b) => ((typeof b.duration === 'number' ? b.duration : 0) - (typeof a.duration === 'number' ? a.duration : 0)));
      }
    }
    
    // Always sort to show available experiences first, then coming soon
    filtered.sort((a, b) => {
      // If only one is commingSoon, prioritize the available one
      if (a.commingSoon && !b.commingSoon) return 1;
      if (!a.commingSoon && b.commingSoon) return -1;
      
      // If both have the same status, maintain current order
      return 0;
    });
    
    return filtered;
  }, [allExperiences, activeCategory, searchQuery, sortOrder, showOnlyAvailable]);
  
  // Function to update URL with current filter state
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    
    if (activeCategory !== 'all') {
      params.set('categoria', activeCategory); // Only Spanish version
    }
    
    if (searchQuery.trim() !== '') {
      params.set('busqueda', searchQuery.trim()); // Only Spanish version
    }
    
    if (sortOrder !== 'default') {
      params.set('orden', sortOrder);  // Only Spanish version
    }
    
    if (showOnlyAvailable) {
      params.set('disponibles', 'true');  // Only Spanish version
    }
    
    const newUrl = 
      window.location.pathname + 
      (params.toString() ? `?${params.toString()}` : '');
    
    window.history.replaceState(
      { 
        path: newUrl,
        categoria: activeCategory,
        busqueda: searchQuery,
        orden: sortOrder,
        disponibles: showOnlyAvailable
      }, 
      '', 
      newUrl
    );
  }, [activeCategory, searchQuery, sortOrder, showOnlyAvailable]);
  
  // Debounced URL update with loading indicator
  useEffect(() => {
    // Show loading indicator immediately
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      updateUrl();
      
      // Hide loading indicator after a slight delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, sortOrder, showOnlyAvailable, updateUrl]);
  
  // Function to clear all filters
  const clearFilters = useCallback(() => {
    setActiveCategory('all');
    setSearchQuery('');
    setSortOrder('default');
    setShowOnlyAvailable(false);
    setIsLoading(true);
    
    // Navigate to the base URL to trigger a fresh server-side data fetch
    router.push(pathname);
    
    // No need for setTimeout as the page will refresh
  }, [router, pathname]);

  // Handle category selection
  const handleCategoryChange = useCallback((category: string | 'all') => {
    // If the category is already selected, do nothing to prevent redundant navigation
    if (category === activeCategory) {
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    setActiveCategory(category);
    
    // Close mobile filters when selecting on mobile
    if (window.innerWidth < 768) {
      setMobileFiltersVisible(false);
    }
    
    // Navigate with new category to trigger server-side data fetch
    if (category === 'all') {
      router.push(pathname);
    } else {
      router.push(`${pathname}?categoria=${encodeURIComponent(category)}`);
    }
    
  }, [router, pathname, activeCategory]);

  // Handle search query change
  const handleSearchChange = useCallback((query: string) => {
    // Only show loading for significant changes
    if (Math.abs(query.length - searchQuery.length) > 2) {
      setIsLoading(true);
    }
    
    setSearchQuery(query);
  }, [searchQuery]);

  // Handle search submission
  const handleSearchSubmit = useCallback(() => {
    const params = new URLSearchParams();
    
    // Build URL parameters
    if (activeCategory !== 'all') {
      params.set('categoria', activeCategory);
    }
    
    if (searchQuery.trim() !== '') {
      params.set('busqueda', searchQuery.trim());
    }
    
    // Create the target URL
    let targetUrl = pathname;
    if (params.toString()) {
      targetUrl += `?${params.toString()}`;
    }
    
    // Check if we're already on this URL to prevent redundant navigation
    const currentUrl = window.location.pathname + window.location.search;
    const normalizedCurrentUrl = currentUrl.replace(/&?categoria=([^&]*)/, '&categoria=$1'); // Normalize URL for comparison
    const normalizedTargetUrl = targetUrl.replace(/&?categoria=([^&]*)/, '&categoria=$1');
    
    if (normalizedCurrentUrl === normalizedTargetUrl) {
      // We're already on this URL, no need to navigate
      return;
    }
    
    // Navigate to the target URL
    router.push(targetUrl);
    
  }, [searchQuery, activeCategory, router, pathname]);

  // Handle sort order change
  const handleSortChange = useCallback((order: 'default' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc') => {
    // If the order is already the same, do nothing to prevent redundant navigation
    if (order === sortOrder) {
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    // Update state
    setSortOrder(order);
    
    // Close mobile filters when changing sort on mobile
    if (window.innerWidth < 768) {
      setMobileFiltersVisible(false);
    }
    
    // Build URL parameters for navigation
    const params = new URLSearchParams();
    
    if (activeCategory !== 'all') {
      params.set('categoria', activeCategory);
    }
    
    if (searchQuery.trim() !== '') {
      params.set('busqueda', searchQuery.trim());
    }
    
    if (order !== 'default') {
      params.set('orden', order);
    }
    
    if (showOnlyAvailable) {
      params.set('disponibles', 'true');
    }
    
    // Create the target URL
    let targetUrl = pathname;
    if (params.toString()) {
      targetUrl += `?${params.toString()}`;
    }
    
    // Navigate to the target URL
    router.push(targetUrl);
    
  }, [sortOrder, activeCategory, searchQuery, showOnlyAvailable, router, pathname]);

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setMobileFiltersVisible(!mobileFiltersVisible);
  };

  // Handle availability toggle
  const handleAvailabilityToggle = useCallback((show: boolean) => {
    // If the setting is already the same, do nothing to prevent redundant navigation
    if (show === showOnlyAvailable) {
      return;
    }
    
    // Update the state
    setShowOnlyAvailable(show);
    
    // Build URL parameters for navigation
    const params = new URLSearchParams();
    
    if (activeCategory !== 'all') {
      params.set('categoria', activeCategory);
    }
    
    if (searchQuery.trim() !== '') {
      params.set('busqueda', searchQuery.trim());
    }
    
    if (sortOrder !== 'default') {
      params.set('orden', sortOrder);
    }
    
    if (show) {
      params.set('disponibles', 'true');
    }
    
    // Create the target URL
    let targetUrl = pathname;
    if (params.toString()) {
      targetUrl += `?${params.toString()}`;
    }
    
    // Navigate to the target URL
    router.push(targetUrl);
    
  }, [showOnlyAvailable, activeCategory, searchQuery, sortOrder, router, pathname]);

  return (
    <section id="experiences" className="py-12 md:py-20 px-4 md:px-5 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-6">
          <button 
            onClick={toggleMobileFilters}
            className={`w-full flex items-center justify-between px-5 py-3 rounded-lg shadow-md font-medium transition-colors duration-300 ${
              mobileFiltersVisible ? 'bg-gray-100 text-crred' : 'bg-white text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>{mobileFiltersVisible ? 'Ocultar filtros' : 'Mostrar filtros'}</span>
            </div>
            <div className="transition-transform duration-300" style={{ transform: mobileFiltersVisible ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Main content - Two column layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Column - Left Side */}
          <div className={`md:w-1/4 transition-all duration-300 ease-in-out ${mobileFiltersVisible ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} md:max-h-none md:opacity-100 md:overflow-visible`}>
            <div className="sticky top-24">
              <ExperiencesFilters
                activeCategory={activeCategory}
                setActiveCategory={handleCategoryChange}
                searchQuery={searchQuery}
                setSearchQuery={handleSearchChange}
                clearFilters={clearFilters}
                experiencesByCategory={experiencesByCategory}
                allExperiences={filteredExperiences}
                totalExperiencesCount={calculatedTotalCount}
                categories={categories}
                sortOrder={sortOrder}
                setSortOrder={handleSortChange}
                showOnlyAvailable={showOnlyAvailable}
                setShowOnlyAvailable={handleAvailabilityToggle}
                handleSearchSubmit={handleSearchSubmit}
              />
                    </div>
          </div>

          {/* Experiences Grid Column - Right Side */}
          <div className="md:w-3/4">
            <ExperiencesGrid
              activeCategory={activeCategory}
              priceRange={null}
              searchQuery={searchQuery}
              showAll={showAll}
              setShowAll={setShowAll}
              allExperiences={filteredExperiences}
              experiencesByCategory={experiencesByCategory}
              clearFilters={clearFilters}
              sortOrder={sortOrder}
              isLoading={isLoading}
            />
                          </div>
                        </div>
          </div>
      
      {/* Contact Section */}
      <Reveal initial={true}>
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            ¿Buscas una experiencia personalizada?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Podemos adaptar cualquiera de nuestras experiencias a tus necesidades específicas o crear una totalmente nueva para tu evento.
          </p>
          <a 
            href="/contact" 
            className="bg-crred text-white px-8 py-3 rounded-md hover:bg-crred/90 transition-colors inline-flex items-center"
          >
            Contáctanos
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
          </Reveal>
        </section>
  );
}
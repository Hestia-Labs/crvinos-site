'use client';

import React, { useMemo, useState } from 'react';
import { ExperienceShort } from '@/types/Experience';
import { BsSliders, BsCurrencyDollar, BsArrowDownShort, BsArrowUpShort, BsGrid, BsFilterLeft, BsFilter, BsSearch, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { FaWineGlass, FaWineBottle, FaMapMarkedAlt, FaClock, FaGlassCheers, FaStar, FaSearch, FaTimes, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import Reveal from '@/components/Effects/reveal';
import CircleBackground from '@/components/Effects/CircleBackground';

interface ExperiencesFiltersProps {
  activeCategory: string | 'all';
  setActiveCategory: (category: string | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  experiencesByCategory: Record<string, ExperienceShort[]>;
  allExperiences: ExperienceShort[];
  totalExperiencesCount: number; // Total number of experiences before any filtering
  categories: string[];
  sortOrder: 'default' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc';
  setSortOrder: (order: 'default' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc') => void;
  showOnlyAvailable: boolean;
  setShowOnlyAvailable: (show: boolean) => void;
  handleSearchSubmit?: () => void; // Optional function to handle search form submission
}

// Helper to format price in MXN for display
export const formatPrice = (price: number | undefined) => {
  if (price === undefined) return '';
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Helper to get appropriate icon for category
const getCategoryIcon = (category: string) => {
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('recorrido') || lowerCat.includes('tour')) {
    return <FaMapMarkedAlt className="w-4 h-4 mr-2" />;
  } else if (lowerCat.includes('degusta') || lowerCat.includes('tasting') || lowerCat.includes('cata')) {
    return <FaWineGlass className="w-4 h-4 mr-2" />;
  } else if (lowerCat.includes('experencia') || lowerCat.includes('experiencia') || lowerCat.includes('experience')) {
    return <FaStar className="w-4 h-4 mr-2" />;
  }
  return <FaWineBottle className="w-4 h-4 mr-2" />;
};

const ExperiencesFilters: React.FC<ExperiencesFiltersProps> = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  clearFilters,
  experiencesByCategory,
  allExperiences,
  totalExperiencesCount,
  categories,
  sortOrder,
  setSortOrder,
  showOnlyAvailable,
  setShowOnlyAvailable,
  handleSearchSubmit
}) => {
  // Add state for the sorting drawer
  const [isSortingExpanded, setIsSortingExpanded] = useState(false);

  // Calculate counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // Filter out empty categories
    Object.keys(experiencesByCategory).forEach(category => {
      if (experiencesByCategory[category].length > 0) {
        counts[category] = experiencesByCategory[category].length;
      }
    });
    
    return counts;
  }, [experiencesByCategory]);

  // Calculate the non-empty categories
  const nonEmptyCategories = useMemo(() => {
    return categories.filter(category => 
      experiencesByCategory[category] && experiencesByCategory[category].length > 0
    );
  }, [categories, experiencesByCategory]);

  // Check if any filters are active
  const areFiltersActive = useMemo(() => {
    return activeCategory !== 'all' || searchQuery.trim() !== '' || sortOrder !== 'default' || showOnlyAvailable;
  }, [activeCategory, searchQuery, sortOrder, showOnlyAvailable]);

  // Get the total count to display (use totalExperiencesCount for the "Todas" button)
  const totalCount = totalExperiencesCount || 0;

  // Toggle the sorting drawer
  const toggleSortingDrawer = () => {
    setIsSortingExpanded(!isSortingExpanded);
  };

  return (
    <Reveal initial={true}>
      <div className="relative">
        <CircleBackground className="-top-10 -right-10 w-48 h-48 bg-crred/5" />
        
        {/* Filters Container */}
        <div className="rounded-lg p-5 md:p-6 bg-white/80 backdrop-blur-sm shadow-lg relative h-full">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <BsFilterLeft className="w-5 h-5 mr-2" />
              Filtros
            </h3>
            {areFiltersActive && (
              <button
                onClick={clearFilters}
                className="text-sm text-crred hover:text-crred/70 transition-colors flex items-center"
              >
                Limpiar
              </button>
            )}
          </div>
          
          {/* Search - First in the sidebar */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
              <BsSearch className="w-4 h-4 mr-1" />
              Buscar
            </h4>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchSubmit && handleSearchSubmit();
              }}
              className="relative flex"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar experiencias..."
                className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-crred focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearchSubmit && handleSearchSubmit();
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center">
                {searchQuery ? (
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-gray-600 mr-1"
                  >
                    ×
                  </button>
                ) : null}
                <button 
                  type="submit"
                  className="text-gray-400 hover:text-crred"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
          
          {/* Categories */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
              <BsGrid className="w-4 h-4 mr-1" />
              Categorías
            </h4>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeCategory === 'all'
                    ? 'bg-crred text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas ({totalCount})
              </button>
              
              {nonEmptyCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition ${
                    activeCategory === category
                      ? 'bg-crred text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getCategoryIcon(category)}
                  <span className="flex-1 text-left">{category}</span>
                  <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-white/80 text-gray-700">
                    {categoryCounts[category] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Availability Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Disponibilidad
            </h4>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                value="" 
                className="sr-only peer" 
                checked={showOnlyAvailable}
                onChange={() => setShowOnlyAvailable(!showOnlyAvailable)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-crred/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-crred"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">Solo experiencias disponibles</span>
            </label>
          </div>
          
          {/* Sorting - Now in a collapsible drawer */}
          <div className="mb-6">
            <button 
              onClick={toggleSortingDrawer}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
            >
              <div className="flex items-center">
                <BsArrowDownShort className="w-4 h-4 mr-2" />
                <span>Ordenar por</span>
                {sortOrder !== 'default' && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-crred/10 text-crred">
                    Activo
                  </span>
                )}
              </div>
              {isSortingExpanded ? 
                <BsChevronUp className="w-4 h-4" /> : 
                <BsChevronDown className="w-4 h-4" />
              }
            </button>
            
            {isSortingExpanded && (
              <div className="mt-3 flex flex-col space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-100 animate-fadeIn">
                <button
                  onClick={() => setSortOrder('default')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center ${
                    sortOrder === 'default'
                      ? 'bg-crred text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="flex-1 text-left">Destacados</span>
                </button>
                
                <button
                  onClick={() => setSortOrder('price-asc')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition ${
                    sortOrder === 'price-asc'
                      ? 'bg-crred text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaSortAmountUp className="w-4 h-4 mr-2" />
                  <span className="flex-1 text-left">Precio: menor a mayor</span>
                </button>
                
                <button
                  onClick={() => setSortOrder('price-desc')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition ${
                    sortOrder === 'price-desc'
                      ? 'bg-crred text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaSortAmountDown className="w-4 h-4 mr-2" />
                  <span className="flex-1 text-left">Precio: mayor a menor</span>
                </button>
                
                <button
                  onClick={() => setSortOrder('duration-asc')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition ${
                    sortOrder === 'duration-asc'
                      ? 'bg-crred text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaClock className="w-4 h-4 mr-2" />
                  <span className="flex-1 text-left">Duración: menor a mayor</span>
                </button>
                
                <button
                  onClick={() => setSortOrder('duration-desc')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition ${
                    sortOrder === 'duration-desc'
                      ? 'bg-crred text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaClock className="w-4 h-4 mr-2" />
                  <span className="flex-1 text-left">Duración: mayor a menor</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Active Filters Summary */}
          {areFiltersActive && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Filtros activos:</h4>
              <div className="flex flex-col space-y-2">
                {activeCategory !== 'all' && (
                  <div className="bg-gray-100 px-3 py-2 rounded-lg flex items-center text-sm">
                    {getCategoryIcon(activeCategory)}
                    <span className="flex-1">{activeCategory}</span>
                    <button 
                      onClick={() => setActiveCategory('all')}
                      className="ml-2 text-gray-500 hover:text-crred"
                    >
                      ×
                    </button>
                  </div>
                )}
                {searchQuery.trim() !== '' && (
                  <div className="bg-gray-100 px-3 py-2 rounded-lg flex items-center text-sm">
                    <BsSearch className="w-3 h-3 mr-2" />
                    <span className="flex-1 truncate">&quot;{searchQuery}&quot;</span>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-gray-500 hover:text-crred"
                    >
                      ×
                    </button>
                  </div>
                )}
                {sortOrder !== 'default' && (
                  <div className="bg-gray-100 px-3 py-2 rounded-lg flex items-center text-sm">
                    {sortOrder.includes('price') ? (
                      <>
                        <BsCurrencyDollar className="w-3 h-3 mr-2" />
                        <span className="flex-1">
                          Precio: {sortOrder === 'price-asc' ? 'Menor a mayor' : 'Mayor a menor'}
                        </span>
                      </>
                    ) : (
                      <>
                        <FaClock className="w-3 h-3 mr-2" />
                        <span className="flex-1">
                          Duración: {sortOrder === 'duration-asc' ? 'Menor a mayor' : 'Mayor a menor'}
                        </span>
                      </>
                    )}
                    <button 
                      onClick={() => setSortOrder('default')}
                      className="ml-2 text-gray-500 hover:text-crred"
                    >
                      ×
                    </button>
                  </div>
                )}
                {showOnlyAvailable && (
                  <div className="bg-gray-100 px-3 py-2 rounded-lg flex items-center text-sm">
                    <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="flex-1">Solo disponibles</span>
                    <button 
                      onClick={() => setShowOnlyAvailable(false)}
                      className="ml-2 text-gray-500 hover:text-crred"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Display current count */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-gray-600 text-sm">
            Mostrando {allExperiences.length} de {totalCount} experiencias
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default ExperiencesFilters; 
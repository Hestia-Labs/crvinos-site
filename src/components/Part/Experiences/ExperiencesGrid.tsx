'use client';

import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExperienceShort } from '@/types/Experience';
import Reveal from '@/components/Effects/reveal';
import ExperienceCard, { formatPrice } from './ExperienceCard';
import EmptyState from './EmptyState';
import SkeletonLoader from './SkeletonLoader';

interface ExperiencesGridProps {
  activeCategory: string | 'all';
  priceRange: [number, number] | null;
  searchQuery: string;
  showAll: boolean;
  setShowAll: (show: boolean) => void;
  allExperiences: ExperienceShort[];
  experiencesByCategory: Record<string, ExperienceShort[]>;
  clearFilters: () => void;
  sortOrder: 'default' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc';
  isLoading?: boolean;
}

// Helper function to extract duration in minutes from a duration string
const getDurationMinutes = (experience: ExperienceShort): number => {
  try {
    // Look for duration in content sections if available
    const duration = experience.duration;
    if (duration) {
      // Try to extract numbers from the duration string
      const match = duration.match(/(\d+)/g);
      if (match) {
        // If we have multiple numbers (like "2 hours 30 min"), try to parse accordingly
        if (match.length > 1 && 
            (duration.includes('hour') || duration.includes('hora')) && 
            (duration.includes('min') || duration.includes('minuto'))) {
          return parseInt(match[0]) * 60 + parseInt(match[1]);
        }
        // If just one number, check if it's hours or minutes
        else if (duration.includes('hour') || duration.includes('hora')) {
          return parseInt(match[0]) * 60;
        } else if (duration.includes('min') || duration.includes('minuto')) {
          return parseInt(match[0]);
        }
      }
    }
    // Fallback to a middle value so unsorted items appear in the middle
    return 90;
  } catch (e) {
    // Default fallback value
    return 90;
  }
};

const ExperiencesGrid: React.FC<ExperiencesGridProps> = React.memo(({
  activeCategory,
  priceRange,
  searchQuery,
  showAll,
  setShowAll,
  allExperiences,
  experiencesByCategory,
  clearFilters,
  sortOrder,
  isLoading = false
}) => {
  // Apply client-side filtering only for the current view
  // This is in addition to the server-side filtering which is already done
  const filteredExperiences = useMemo(() => {
    // Create a copy of the experiences
    let experiences = [...allExperiences];
    
    // Apply sorting
    if (sortOrder !== 'default') {
      experiences.sort((a, b) => {
        if (sortOrder === 'price-asc' || sortOrder === 'price-desc') {
          const priceA = a.price ?? 0;
          const priceB = b.price ?? 0;
          
          if (sortOrder === 'price-asc') {
            return priceA - priceB;
          } else {
            return priceB - priceA;
          }
        } else if (sortOrder === 'duration-asc' || sortOrder === 'duration-desc') {
          const durationA = getDurationMinutes(a);
          const durationB = getDurationMinutes(b);
          
          if (sortOrder === 'duration-asc') {
            return durationA - durationB;
          } else {
            return durationB - durationA;
          }
        }
        return 0;
      });
    }
    
    return experiences;
  }, [allExperiences, sortOrder]);

  // Apply pagination/show all logic
  const displayExperiences = useMemo(() => {
    return showAll ? filteredExperiences : filteredExperiences.slice(0, 6);
  }, [filteredExperiences, showAll]);

  return (
    <div className="h-full w-full">
      {/* Results header */}
      
      
      {/* Experience cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10 min-h-[300px]">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading" 
              className="contents"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SkeletonLoader count={showAll ? 9 : 6} />
            </motion.div>
          ) : displayExperiences.length > 0 ? (
            <motion.div 
              key="content" 
              className="contents"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {displayExperiences.map((experience, index) => (
                <Reveal key={experience._id} initial={true}>
                  <ExperienceCard 
                    experience={experience} 
                    index={index}
                    formatPrice={formatPrice}
                  />
                </Reveal>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty" 
              className="w-full col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <EmptyState clearFilters={clearFilters} activeCategory={activeCategory} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Show more button */}
      {!isLoading && filteredExperiences.length > 6 && displayExperiences.length < filteredExperiences.length && (
        <motion.div 
          className="text-center py-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center text-crred hover:text-crred/80 transition-colors py-2 px-6 border border-crred rounded-md bg-white shadow-sm hover:shadow"
          >
            <span className="mr-2">Ver más experiencias</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  );
});

ExperiencesGrid.displayName = 'ExperiencesGrid';

export default ExperiencesGrid; 
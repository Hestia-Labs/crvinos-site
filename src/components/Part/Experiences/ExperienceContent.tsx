'use client';

import React from 'react';
import { ContentSection, Experience, SectionType } from '@/types/Experience';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { experiencePortableTextComponents } from '@/utils/ExperiencePortableText';
import Image from 'next/image';
import SanityImg from '@/components/SanityImg';
import Icon from '@/components/Icons';

// Define TimeSlot interface for proper typing
interface TimeSlot {
  _key: string;
  title: string;
  time: string;
  description?: string;
}

// Get icon name from value
const getIconComponent = (iconName: string = 'InfoCup') => {
  // Icon name to path mapping
  const iconMap: Record<string, string> = {
    'Grapevine': '/img/Grapevine.png',
    'InfoBarrel': 'InfoBarrel',
    'InfoCup': 'InfoCup',
    'Single_Grape': '/icons/Single_Grape.png',
    'Medal': '/icons/Medal.png',
    'Wine_Plate': '/img/Wine_Plate.png'
  };

  
  // Use the icon component directly
  return <Icon name={iconMap[iconName] || iconName} className="h-16 w-auto text-crred" />;
};

// Hero Section Component
const HeroSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  if (section._type !== SectionType.HERO_SECTION) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-48 md:h-64 lg:h-80 mb-12 rounded-xl overflow-hidden"
    >
      {section.backgroundImage && (
        <SanityImg
          source={section.backgroundImage}
          alt={section.title || 'Hero Image'}
          width={1200}
          height={600}
          className="object-cover w-full h-full"
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
        {section.title && (
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-2">
            {section.title}
          </h2>
        )}
        
        {section.subtitle && (
          <p className="text-lg md:text-xl text-white/90">
            {section.subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// Detail Section Component
const DetailSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  if (section._type !== SectionType.DETAIL_SECTION) return null;
  
  return (
    <div className="mb-16">
      {section.title && (
        <h2 className="text-2xl md:text-3xl font-medium text-crred mb-6">
          {section.title}
        </h2>
      )}
      
      {/* Price & Duration Indicators */}
      {(section.price || section.duration) && (
        <div className="flex gap-4 flex-wrap mb-8">
          {section.price && (
            <div className="px-6 py-3 rounded-lg flex items-center gap-3 border border-crred/20 text-crred bg-white">
              <div>
                <p className="text-sm font-light">Precio desde</p>
                <p className="text-2xl font-medium">${section.price}</p>
                <p className="text-sm font-light">por persona</p>
              </div>
            </div>
          )}
          
          {section.duration && (
            <div className="px-6 py-3 rounded-lg flex items-center gap-3 border border-crred/20 text-crred bg-white">
              <div>
                <p className="text-sm font-light">Duración</p>
                <p className="text-2xl font-medium">{section.duration}</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Main Description */}
      {section.description && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-700 mb-8"
        >
          <PortableText
            value={section.description}
            components={experiencePortableTextComponents}
          />
        </motion.div>
      )}
      
      {/* Highlights Grid */}
      {section.highlights && section.highlights.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8">
          {section.highlights.map((highlight, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl flex items-center gap-4 bg-crred/5 border border-crred/10"
            >
              <div className="text-crred">
                <div className='text-2xl'>▸</div>
              </div>
              <p className="text-xl font-light text-gray-700">{highlight}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Feature Grid Component
const FeatureGridSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  if (section._type !== SectionType.FEATURE_GRID) return null;
  
  return (
    <div className="mb-16">
      {section.title && (
        <h2 className="text-2xl md:text-3xl font-medium text-crred mb-8 text-center">
          {section.title}
        </h2>
      )}
      
      <div className="grid md:grid-cols-3 gap-8">
        {section.features && section.features.length > 0 && section.features.map((feature, index) => (
          <motion.div 
            key={feature._key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center p-8 bg-white border-crred/20 border rounded-xl space-y-5 text-center shadow-sm"
          >
            {feature.icon && getIconComponent(feature.icon)}
            
            {feature.title && (
              <h3 className="text-lg md:text-xl font-medium text-crred">
                {feature.title}
              </h3>
            )}
            
            {feature.description && (
              <p className="text-sm md:text-base text-gray-700">
                {feature.description}
              </p>
            )}
            
            {feature.image && (
              <div className="w-full h-40 rounded-md overflow-hidden mt-4">
                <SanityImg
                  source={feature.image}
                  alt={feature.title || 'Feature image'}
                  width={300}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Pricing Section Component
const PricingSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  if (section._type !== SectionType.PRICING_SECTION) return null;
  
  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="h-full"
    >
      {section.title && (
        <h2 className="text-2xl md:text-3xl font-medium text-crred mb-6 text-center">
          {section.title}
        </h2>
      )}
      
      <div className="p-6 bg-white rounded-2xl shadow-lg border border-crred/20 h-full">
        {/* Base price card */}
        <div className="bg-crred/5 rounded-xl p-5 border border-crred/10 mb-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Experiencia base</p>
              <p className="text-lg font-medium">Precio por persona</p>
            </div>
            <div className="flex items-center justify-center bg-white border border-crred/20 rounded-xl h-16 w-28 shadow-sm">
              <span className="text-2xl font-medium text-crred">${section.basePrice}</span>
            </div>
          </div>
        </div>
        
        {/* Additional options */}
        {section.additionalOptions && section.additionalOptions.length > 0 && (
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-crred mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Opciones adicionales
            </h3>
            
            {section.additionalOptions.map((option, index) => (
              <motion.div 
                key={option._key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start p-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <div className="h-6 w-6 rounded-full bg-crred/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-crred" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">{option.name}</span>
                    <span className="text-crred font-medium">+${option.price}</span>
                  </div>
                  
                  {option.description && (
                    <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Total value indicator */}
        <div className="mt-6 bg-gradient-to-r from-crred/10 to-crred/5 p-4 rounded-lg border border-crred/10">
          <div className="flex items-center">
            <div className="rounded-full bg-crred/20 p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-crred" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">El precio incluye IVA</p>
              <p className="text-sm text-gray-500">Reserva con anticipación</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Schedule Section Component
const ScheduleSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  if (section._type !== SectionType.SCHEDULE_SECTION) return null;
  
  // Use a safer type assertion with a conditional check
  const timeSlots = Array.isArray(section.timeSlots) 
    ? (section.timeSlots as unknown as TimeSlot[]) 
    : [];
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      {section.title && (
        <h3 className="text-2xl md:text-3xl font-medium text-crred mb-6 text-center">
          {section.title}
        </h3>
      )}
      
      <div className="p-6 bg-white rounded-2xl shadow-lg border border-crred/20 h-full">
        <div className="space-y-5">
          {timeSlots.length > 0 && timeSlots.map((slot, index) => (
            <motion.div 
              key={slot._key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start border-crred/10 rounded-lg overflow-hidden"
            >
              {/* Time indicator dot and line */}
              <div className="absolute top-0 bottom-0 left-6 flex flex-col items-center">
                <div className={`h-6 w-6 rounded-full ${index === 0 ? 'bg-crred' : 'bg-crred/70'} flex items-center justify-center mt-1.5`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {index < (section.timeSlots?.length || 0) - 1 && (
                  <div className="w-0.5 bg-crred/20 grow mt-1"></div>
                )}
              </div>
              
              {/* Content */}
              <div className="pl-16 pb-5 w-full">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm">
                  <h4 className="text-crred font-medium text-lg">
                    {slot.title}
                  </h4>
                  <div className="inline-flex items-center gap-1 bg-crred/10 px-3 py-1 rounded-full text-crred text-sm my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {slot.time}
                  </div>
                  {slot.description && (
                    <p className="text-gray-700 text-base mt-2">
                      {slot.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {section.disclaimer && (
          <div className="mt-6 bg-yellow-50 border border-yellow-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600 italic flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {section.disclaimer}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Image Gallery Component
const ImageGallerySection: React.FC<{ section: ContentSection }> = ({ section }) => {
  if (section._type !== SectionType.IMAGE_GALLERY) return null;
  
  return (
    <div className="mb-16">
      {section.title && (
        <h2 className="text-2xl md:text-3xl font-medium text-crred mb-8 text-center">
          {section.title}
        </h2>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {section.images && section.images.length > 0 && section.images.map((image, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="aspect-square rounded-lg overflow-hidden"
          >
            <SanityImg
              source={image}
              alt={`Gallery image ${index + 1}`}
              width={400}
              height={400}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Chef Pairing Component
const ChefPairingSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  if (section._type !== SectionType.CHEF_PAIRING) return null;
  
  return (
    <div className="mb-16">
      {section.title && (
        <h2 className="text-2xl md:text-3xl font-medium text-crred mb-8">
          {section.title}
        </h2>
      )}
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Chef Profile */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full"
        >
          {section.image && (
            <div className="rounded-xl overflow-hidden mb-6 aspect-[4/3]">
              <SanityImg
                source={section.image}
                alt={section.title || 'Chef'}
                width={600}
                height={450}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
          {section.title && (
            <h3 className="text-xl font-medium text-crred mb-2">
              {section.title}
            </h3>
          )}
          
          {section.description && (
            <p className="text-gray-700 mb-4">
              {section.description}
            </p>
          )}
        </motion.div>
        
        {/* Menu Items */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-medium text-crred mb-4">
            Menú de Maridaje
          </h3>
          
          <p className="text-gray-700">
            Disfruta de un maridaje personalizado por nuestro chef.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Text Section Component
const TextSection: React.FC<{ section: ContentSection }> = ({ section }) => {
  if (section._type !== SectionType.TEXT_SECTION) return null;
  
  return (
    <div className="mb-16">
      {section.title && (
        <h2 className="text-2xl md:text-3xl font-medium text-crred mb-8">
          {section.title}
        </h2>
      )}
      
      {section.content && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none text-gray-700"
        >
          <PortableText
            value={section.content}
            components={experiencePortableTextComponents}
          />
        </motion.div>
      )}
    </div>
  );
};

// Component to render a section based on its type
const renderSection = (section: ContentSection) => {
  switch (section._type) {
    case SectionType.HERO_SECTION:
      return <HeroSection section={section} />;
    case SectionType.DETAIL_SECTION:
      return <DetailSection section={section} />;
    case SectionType.FEATURE_GRID:
      return <FeatureGridSection section={section} />;
    case SectionType.PRICING_SECTION:
      return <PricingSection section={section} />;
    case SectionType.SCHEDULE_SECTION:
      return <ScheduleSection section={section} />;
    case SectionType.IMAGE_GALLERY:
      return <ImageGallerySection section={section} />;
    case SectionType.CHEF_PAIRING:
      return <ChefPairingSection section={section} />;
    case SectionType.TEXT_SECTION:
      return <TextSection section={section} />;
    default:
      return null;
  }
};

// Main Experience Content Component
const ExperienceContent: React.FC<{ experience: Experience }> = ({ experience }) => {
  if (!experience.contentSections) {
    return <div>No content available</div>;
  }

  return (
    <div className="space-y-16 text-gray-700">
      {renderSections(experience.contentSections)}
    </div>
  );
};

const renderSections = (sections: ContentSection[]) => {
  return sections.map((currentSection, index) => {
    if (
      currentSection._type === SectionType.PRICING_SECTION &&
      index + 1 < sections.length &&
      sections[index + 1]._type === SectionType.SCHEDULE_SECTION
    ) {
      // Grouped display for pricing + schedule
      return (
        <div key={currentSection._key || index} className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PricingSection section={currentSection} />
            <ScheduleSection section={sections[index + 1]} />
          </div>
        </div>
      );
    } else if (
      currentSection._type === SectionType.SCHEDULE_SECTION &&
      index > 0 &&
      sections[index - 1]._type === SectionType.PRICING_SECTION
    ) {
      // Skip this section as it was already rendered with pricing
      return null;
    }

    // Default rendering based on section type
    return (
      <div key={currentSection._key || index} className="mb-24">
        {renderSection(currentSection)}
      </div>
    );
  });
};

export default ExperienceContent; 
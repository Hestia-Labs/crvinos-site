'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExperienceShort } from '@/types/Experience';
import { FaMapMarkerAlt, FaClock, FaStar, FaWineGlass, FaWineBottle, FaMapMarkedAlt, FaClock as FaRegularClock } from 'react-icons/fa';
import { BsCalendar, BsArrowRight, BsClock } from 'react-icons/bs';
import TransitionLink from '@/components/TransitionLink';

interface ExperienceCardProps {
  experience: ExperienceShort;
  index: number;
  formatPrice: (price: number | undefined) => string;
}

// Helper to format price for display
export const formatPrice = (price: number | undefined) => {
  if (price === undefined) return '';
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Helper to get category-specific gradient
const getCategoryGradient = (category: string): string => {
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('recorrido') || lowerCat.includes('tour')) {
    return 'from-blue-500/80 to-blue-700/80';
  } else if (lowerCat.includes('degusta') || lowerCat.includes('tasting') || lowerCat.includes('cata')) {
    return 'from-crred/80 to-crred-dark/90';
  }
  return 'from-purple-500/80 to-purple-700/80';
};

// Helper to get appropriate icon for category
const getCategoryIcon = (category: string) => {
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('recorrido') || lowerCat.includes('tour')) {
    return <FaMapMarkedAlt className="w-4 h-4 mr-1.5" />;
  } else if (lowerCat.includes('degusta') || lowerCat.includes('tasting') || lowerCat.includes('cata')) {
    return <FaWineGlass className="w-4 h-4 mr-1.5" />;
  }
  return <FaStar className="w-4 h-4 mr-1.5" />;
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index, formatPrice }) => {
  const { title, basicDescription, mainImage, price, category, link, slug, highlightPoints, duration, commingSoon } = experience;
  const categoryGradient = getCategoryGradient(category);
  const href = `/enotourism/experiences/${slug}`;

  return (
    <TransitionLink
      href={href}
      className={`block h-full transition duration-300 transform ${commingSoon ? 'hover:scale-[1.01]' : 'hover:scale-[1.02]'} focus:outline-none focus:ring-2 focus:ring-crred rounded-xl`}
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={`h-full overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative flex flex-col ${commingSoon ? 'bg-gray-50' : ''}`}
      >
        {/* Image Container with gradient overlay */}
        <div className="relative h-56 w-full overflow-hidden">
          {mainImage?.asset?.url ? (  
            <Image
              src={mainImage.asset.url}
              alt={mainImage.alt || title}
              width={500}
              height={300}
              className={`object-cover w-full h-full transition-transform duration-500 ${commingSoon ? 'filter grayscale hover:grayscale-0' : 'hover:scale-105'}`}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          
          {/* Category badge */}
          <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full ${commingSoon ? 'bg-gray-700' : `bg-gradient-to-r ${categoryGradient}`} text-white text-xs font-medium flex items-center shadow-md`}>
            {getCategoryIcon(category)}
            {category}
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Coming Soon badge */}
          {commingSoon && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg transform ">
                <span className="text-white font-semibold tracking-wider uppercase text-lg">Próximamente</span>
              </div>
            </div>
          )}
          
          {/* Price tag */}
          {price && !commingSoon && (
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
              <span className="text-crred font-bold">{formatPrice(price)}</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex flex-col flex-grow p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
          
          {/* Experience details */}
          <div className="flex items-center mb-3 text-sm text-gray-600">
            {commingSoon ? (
              <div className="flex items-center mr-4">
                <BsClock className="w-3.5 h-3.5 mr-1 text-crred" />
                <span>Disponible pronto</span>
              </div>
            ) : (
              <>
                {duration && (
                  <div className="flex items-center mr-4">
                    <FaClock className="w-3.5 h-3.5 mr-1 text-crred" />
                    <span>{duration}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <FaMapMarkerAlt className="w-3.5 h-3.5 mr-1 text-crred" />
                  <span>Tequisquiapan</span>
                </div>
              </>
            )}
          </div>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{basicDescription}</p>
          
          {/* Highlights */}
          {highlightPoints && highlightPoints.length > 0 && !commingSoon && (
            <div className="mt-auto mb-4">
              <ul className="space-y-1.5">
                {highlightPoints.slice(0, 2).map((point, i) => (
                  <li key={i} className="flex items-start text-xs text-gray-600">
                    <span className="text-crred mr-2 mt-0.5">•</span>
                    <span className="line-clamp-1">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          
          
          {/* CTA Button - visual only, entire card is already clickable */}
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between text-crred font-medium">
              <span>{commingSoon ? 'Ver avance' : 'Ver detalles'}</span>
              <BsArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </TransitionLink>
  );
};

export default ExperienceCard;
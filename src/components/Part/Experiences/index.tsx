'use client';

import React from 'react';
import { ExperienceType } from '@/types/Experience';
import BasicButton from '@/components/Buttons/BasicButton';
import BookingForm from '@/components/Part/Experiences/BookingForm';
import { motion } from 'framer-motion';
import SanityImg from '@/components/SanityImg';
import Link from 'next/link';
import { useColor } from '@/contexts/ColorContext';
import clsx from 'clsx';
import { getExperiences } from '@/app/actions/getExperiences';
import { Experience } from '@/types/Experience';

export default function ExperiencePageClient({ 
    experience,
    prevExperience,
    nextExperience 
  }: { 
    experience: Experience;
    prevExperience: Experience;
    nextExperience: Experience;
  }) {
    const { isRed } = useColor();
  
    const renderDescription = () => {
      if (experience.customDescription && experience.featureGrid) {
        return (
          <div className="space-y-8 text-gray-700">
            <p className="text-xl md:text-2xl font-light leading-relaxed">
              Custom experience details coming soon
            </p>
          </div>
        );
      }
  
      return (
        <div className="space-y-8">
          {/* Price and Duration Section */}
          {(experience.price || experience.defaultDescription?.duration) && (
            <div className="flex gap-4 flex-wrap">
              {experience.price && (
                <div className={clsx(
                  "px-6 py-3 rounded-full flex items-center gap-2",
                  {
                    'bg-crred/10 text-crred': !isRed,
                    'bg-back/10 text-back': isRed
                  }
                )}>
                  <span className="text-lg">$</span>
                  <span className="text-2xl font-medium">{experience.price}</span>
                  <span className="text-sm">por persona</span>
                </div>
              )}
              
              {experience.defaultDescription?.duration && (
                <div className={clsx(
                  "px-6 py-3 rounded-full flex items-center gap-2",
                  {
                    'bg-crred/10 text-crred': !isRed,
                    'bg-back/10 text-back': isRed
                  }
                )}>
                  <span className="text-lg">🕒</span>
                  <span className="text-lg">{experience.defaultDescription.duration}</span>
                </div>
              )}
            </div>
          )}
  
          {/* Main Content */}
          <div className="space-y-6 text-gray-700">
            {experience.defaultDescription?.mainParagraph && (
              <p className="text-xl md:text-2xl font-light leading-relaxed">
                {experience.defaultDescription.mainParagraph}
              </p>
            )}
  
            {experience.defaultDescription?.features && (
              <ul className="list-inside space-y-3 border-l-2 border-crred pl-4">
                {experience.defaultDescription.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-crred mr-2">▸</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    };
  

  return (
    <div className="relative space-y-12 w-full px-4 md:px-10 lg:px-20">
      {/* Hero Section */}
      <div className="relative group overflow-hidden rounded-xl">
        <div className="relative w-full h-96 md:h-128">
          <SanityImg
            source={experience.mainImage}
            alt={experience.title}
            width={1200}
            height={800}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority

          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        </div>

        {/* Navigation */}
        <div className="absolute top-4 w-full flex justify-between px-4 z-10">
          <Link
            href={`/experiences/${prevExperience.slug}`}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-full 
                     border border-white/60 bg-black/30 backdrop-blur-sm 
                     transition-colors hover:bg-crred/55"
          >
            <span className="text-lg">←</span>
            <span className="md:text-lg font-medium">
              {prevExperience.title}
            </span>
          </Link>

          <Link
            href={`/experiences/${nextExperience.slug}`}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-full 
                     border border-white/60 bg-black/30 backdrop-blur-sm 
                     transition-colors hover:bg-crred/55"
          >
            <span className="md:text-lg font-medium">
              {nextExperience.title}
            </span>
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-light italic text-crred">
            {experience.title}
          </h1>
          <div className="h-1 w-32 bg-crred" />
          <p className="text-2xl md:text-2xl text-gray-700 mt-4 max-w-2xl">
            {experience.subtitle}
          </p>
        </div>

        <section className="prose prose-lg max-w-none">
          {renderDescription()}
        </section>

        <section className="py-12 border-t border-crred/20">
          <h2 className={clsx('text-3xl md:text-4xl text-center mb-12', {
            'text-back': isRed,
            'text-crred': !isRed,
          })}>
            Reserva tu Experiencia
          </h2>
            <BookingForm 
                experienceType={experience.slug}
                formFields={experience.formFields || []}
            />
        </section>

        {/* Mobile Navigation */}
        <div className="flex justify-between px-8">
          <Link
            href={`/experiences/${prevExperience.slug}`}
            className="flex items-center gap-2 text-crred hover:text-white 
                     transition-colors border border-crred hover:bg-crred 
                     px-4 py-2 rounded-full"
          >
            <span className="text-lg">←</span>
            <span className="md:text-lg font-medium">
              {prevExperience.title}
            </span>
          </Link>

          <Link
            href={`/experiences/${nextExperience.slug}`}
            className="flex items-center gap-2 text-crred hover:text-white 
                     transition-colors border border-crred hover:bg-crred 
                     px-4 py-2 rounded-full"
          >
            <span className="md:text-lg font-medium">
              {nextExperience.title}
            </span>
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
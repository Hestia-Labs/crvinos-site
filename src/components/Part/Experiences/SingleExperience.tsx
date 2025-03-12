'use client';
import React from 'react';
import { ExperienceType } from '@/types/Experience';
import BookingForm from '@/components/Part/Experiences/BookingForm';
import { motion } from 'framer-motion';
import SanityImg from '@/components/SanityImg';
import Link from 'next/link';
import { Experience } from '@/types/Experience';
import ExperienceDescription from '@/components/Part/Experiences/ExperienceDescription';
import BasicButton from '@/components/Buttons/BasicButton'; // Assuming BasicButton is imported from this path

export default function ExperiencePageClient({ 
  experience,
  prevExperience,
  nextExperience 
}: { 
  experience: Experience;
  prevExperience: Experience;
  nextExperience: Experience;
}) {
  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <svg
              className="w-24 h-24 mx-auto text-crred"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-3xl md:text-4xl font-light text-crred">
              Experiencia no encontrada
            </h1>
            <p className="text-gray-600 mb-8">
              La experiencia que estás buscando no existe o ha sido removida.
            </p>
            <BasicButton
              link="/experiences"
              variant="transparent"
              className="mx-auto border border-crred"
            >
              Ver todas las experiencias
            </BasicButton>
          </motion.div>
        </div>
      </div>
    );
  }

  // Navigation Links Component
  const NavLink = ({ experience, direction }: { experience: Experience; direction: 'prev' | 'next' }) => (
    <Link
      href={`/experiences/${experience.slug}`}
      className={`flex items-center gap-1 text-white px-3 py-2 md:px-6 md:py-3 rounded-full 
                border border-white/30 bg-black/30 backdrop-blur-lg text-sm md:text-base
                transition-all hover:bg-crred/70 hover:border-crred/50`}
    >
      {direction === 'prev' && <span className="text-base md:text-lg">←</span>}
      <span className="font-medium line-clamp-1 max-w-[120px] md:max-w-none">
        {experience.title}
      </span>
      {direction === 'next' && <span className="text-base md:text-lg">→</span>}
    </Link>
  );

  return (
    <div className="relative w-full mt-6 md:mt-10">
      {/* Hero Section */}
      <div className="relative group overflow-hidden items-center justify-center flex">
        <div className="relative w-full md:w-10/12 h-[50vh] md:h-[60vh] min-h-[400px] md:min-h-[500px] rounded-none md:rounded-2xl overflow-hidden">
          <SanityImg
            source={experience.mainImage}
            alt={experience.title}
            width={1920}
            height={1080}
            className="object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          
          <div className="absolute top-4 w-full flex justify-between px-3 md:px-4 z-10">
            <motion.div className="flex items-center gap-1 md:gap-2">
              <NavLink experience={prevExperience} direction="prev" />
            </motion.div>

            <motion.div className="flex items-center gap-1 md:gap-2">
              <NavLink experience={nextExperience} direction="next" />
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 md:pb-16">
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-medium text-white mb-2 md:mb-4 px-4 md:px-0">
                  {experience.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 max-w-3xl px-4 md:px-0">
                  {experience.subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-8 md:py-16">
        <section className="prose prose-lg max-w-none">
          <ExperienceDescription experience={experience} />
        </section>

        {/* Booking Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-8 md:py-16 mt-8 md:mt-16 border-t border-crred/20"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-8 md:mb-12 font-medium text-crred">
              Reserva tu Experiencia
            </h2>
            <BookingForm 
              experienceType={experience.slug}
              formFields={experience.formFields || []}
            />
          </div>
        </motion.section>

        {/* Bottom Navigation */}
        <div className="flex justify-between gap-2 md:gap-4 mt-8 md:mt-16">
          <motion.div className="flex-1">
            <Link
              href={`/experiences/${prevExperience.slug}`}
              className="flex items-center gap-1 text-crred hover:text-white 
                       transition-colors border border-crred hover:bg-crred 
                       px-3 py-2 md:px-6 md:py-3 rounded-full justify-center text-center text-sm md:text-base"
            >
              <span className="text-base md:text-lg">←</span>
              <span className="font-medium line-clamp-1">
                {prevExperience.title}
              </span>
            </Link>
          </motion.div>

          <motion.div className="flex-1">
            <Link
              href={`/experiences/${nextExperience.slug}`}
              className="flex items-center gap-1 text-crred hover:text-white 
                       transition-colors border border-crred hover:bg-crred 
                       px-3 py-2 md:px-6 md:py-3 rounded-full justify-center text-center text-sm md:text-base"
            >
              <span className="font-medium line-clamp-1">
                {nextExperience.title}
              </span>
              <span className="text-base md:text-lg">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
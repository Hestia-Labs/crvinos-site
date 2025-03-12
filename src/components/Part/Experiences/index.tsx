'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import BasicButton from '@/components/Buttons/BasicButton';
import SanityImg from '@/components/SanityImg';
import Reveal from '@/components/Effects/reveal';
import { ExperienceShort } from '@/types/Experience';

interface ExperiencesListProps {
  experiencesByCategory: Record<string, ExperienceShort[]>;
  allExperiences: ExperienceShort[];
  categories: string[];
}

const ExperiencesList: React.FC<ExperiencesListProps> = ({
  experiencesByCategory,
  allExperiences,
  categories
}) => {
  const router = useRouter();

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full py-16 text-center"
    >
      <div className="max-w-md mx-auto space-y-6">
        <svg
          className="w-16 h-16 mx-auto text-crred opacity-75"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 5h1m4-5h1m-1 5h1m-5 5h1"
          />
        </svg>
        <h3 className="text-xl font-light text-gray-700">Próximas experiencias en preparación</h3>
        <p className="text-gray-500 font-light leading-relaxed">
          Estamos creando nuevas experiencias únicas. Mientras tanto, te invitamos a explorar nuestros vinos y restaurante.
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className='flex flex-col items-center justify-center w-full px-8 sm:px-12 md:px-16 lg:px-20'>
      <div className='flex flex-col justify-center items-center w-full space-y-6 py-8 sm:py-12 md:py-16 lg:py-20'>
        <h2 className='text-3xl md:text-5xl lg:text-6xl xl:text-8xl text-crred font-light tracking-wide mb-4'>
          Experiencias CR
        </h2>
      </div>

      <div className="w-full   space-y-20 border-t-2 border-crred/80">
        <section className="space-y-12">
          {/* Mobile Categories */}
          <div className="md:hidden space-y-12">
            <AnimatePresence>
              {allExperiences.length === 0 ? (
                <EmptyState />
              ) : (
                Object.entries(experiencesByCategory).map(([category, categoryExperiences]) => (
                  <section key={category} className="space-y-6">
                    <Reveal>
                      <div className="px-4">
                        <h3 className="text-2xl font-light text-crred cormorant-garamond italic">
                          {category}
                        </h3>
                        <div className="h-1 w-32 bg-crred mt-2" />
                      </div>
                    </Reveal>
                    
                    <div className="w-full overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                      <div className="flex gap-4 px-4 py-4 snap-x snap-mandatory">
                        {categoryExperiences.map((experience) => (
                          <motion.div
                            key={experience._id}
                            className="relative group overflow-hidden rounded-xl shadow-lg border border-crred/20 bg-white
                                       w-72 flex-shrink-0 snap-start flex flex-col h-[500px]"
                            whileHover={{ y: -3 }}
                            transition={{ type: 'easeInOut', duration: 0.3 }}
                          >
                            <div className="relative h-64 w-full flex-shrink-0">
                              {experience.mainImage?.asset?.url && (
                                <SanityImg
                                  source={experience.mainImage}
                                  alt={experience.mainImage.alt || experience.title}
                                  width={600}
                                  height={450}
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <div className="p-6 space-y-4 flex flex-col flex-grow">
                              <h3 className="text-2xl font-medium text-crred cormorant-garamond line-clamp-1">
                                {experience.title}
                              </h3>
                              <div className="flex-1 mb-4">
                                <p className="text-gray-700 font-light leading-relaxed line-clamp-3">
                                  {experience.basicDescription}
                                </p>
                              </div>
                              <div className="border-t border-crred/20 pt-4 mt-auto">
                                <BasicButton
                                  link={`/experiences/${experience.slug}`}
                                  variant="transparent"
                                  className="border border-crred text-crred w-full"
                                >
                                  Ver Detalles
                                </BasicButton>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:block">
            <AnimatePresence>
              {allExperiences.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {allExperiences.map((experience) => (
                    <Reveal key={experience._id}>
                      <motion.div 
                        className="relative group overflow-hidden rounded-xl shadow-lg border border-crred/20 bg-white cursor-pointer flex flex-col h-full"
                        whileHover={{ y: -3 }}
                        transition={{ type: 'easeInOut', duration: 0.3 }}
                        onClick={() => router.push(`/experiences/${experience.slug}`)}
                      >
                        <div className="relative h-64 w-full flex-shrink-0">
                          {experience.mainImage?.asset?.url && (
                            <SanityImg
                              source={experience.mainImage}
                              alt={experience.mainImage.alt || experience.title}
                              width={500}
                              height={375}
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="p-6 space-y-4 flex flex-col flex-grow min-h-[250px]">
                          <h3 className="text-2xl font-medium text-crred cormorant-garamond text-nowrap">
                            {experience.title}
                          </h3>
                          <div className="flex-1 mb-4">
                            <p className="text-gray-700 font-light leading-relaxed line-clamp-3">
                              {experience.basicDescription}
                            </p>
                          </div>
                          <div className="border-t border-crred/20 pt-4 mt-auto">
                            <BasicButton
                              link={`/experiences/${experience.slug}`}
                              variant="transparent"
                              className="border border-crred text-crred w-full"
                            >
                              Descubrir Experiencia
                            </BasicButton>
                          </div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 border-t border-crred/80 space-y-12 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-light text-crred tracking-wide italic">
              ¿Necesitas ayuda para elegir?
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Nuestros expertos en enoturismo pueden crear una experiencia personalizada para ti
            </p>
          </Reveal>
          <Reveal>
            <BasicButton 
              link="/contact"
              variant="transparent"
              className="mx-auto text-lg px-8 py-3 border border-crred"
            >
              Contactar a un Experto
            </BasicButton>
          </Reveal>
        </section>
      </div>
    </div>
  );
};

export default ExperiencesList;
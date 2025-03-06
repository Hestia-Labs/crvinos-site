'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import BasicButton from '@/components/Buttons/BasicButton';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LoadingScreen from '@/components/Loaders/LoadingScreen';
import Icon from '@/components/Icons';
import Reveal from '@/components/Effects/reveal';
import { useRouter } from 'next/navigation';
import { getExperiences, getExperienceCategories } from '@/app/actions/getExperiences';
import { ExperienceShort } from '@/types/Experience';

import SanityImg from '@/components/SanityImg';




const ExperiencesPage: React.FC = () => {
  const router = useRouter();
  const [experiences, setExperiences] = useState<ExperienceShort[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [experiencesData, categoriesData] = await Promise.all([
          getExperiences({ shortVersion: true }),
          getExperienceCategories()
        ]);
        
        const categoryOrder = categoriesData.map(c => c.title);
        setCategories(categoryOrder);
        setExperiences(experiencesData as ExperienceShort[]);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupExperiencesByCategory = () => {
    const grouped: Record<string, ExperienceShort[]> = {};
    
    categories.forEach(category => {
      const categoryExperiences = experiences.filter(
        exp => exp.category === category
      );
      if (categoryExperiences.length > 0) {
        grouped[category] = categoryExperiences;
      }
    });

    return grouped;
  };

  const experiencesByCategory = groupExperiencesByCategory();

  if (loading) {
    return <LoadingScreen animationDuration={1} displayDuration={1} />;
  }

  return (
    <div className='relative flex flex-col w-full items-center justify-center'>
      <div className='relative w-full -z-10'>
        <Icon name='ContactVines' className='absolute h-80 w-full md:h-160 opacity-40' />
      </div>
      <Navbar clearBg redLogo red relative />
      <div className='flex flex-col justify-center items-center w-full space-y-6 py-8 sm:py-12 md:py-16 lg:py-20'>
        <h2 className='text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl text-crred font-light tracking-wide mb-4'>
          Experiencias CR
        </h2>
      </div>

      <div className="w-full max-w-7xl px-8 sm:px-10 md:px-20 py-16 space-y-20 border-t-2 border-crred/80">
        <section className="space-y-12">
          {/* Mobile Categories */}
          <div className="md:hidden space-y-12">
            {Object.entries(experiencesByCategory).map(([category, categoryExperiences]) => (
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
                            sizes="(max-width: 768px) 100vw, 600px"
                            mobileWidth={600}
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
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience) => (
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
                      sizes="(min-width: 1024px) 33vw, 500px"
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
              link="/contacto"
              variant="bg-crred"
              className="mx-auto text-lg px-8 py-3"
            >
              Contactar a un Experto
            </BasicButton>
          </Reveal>
        </section>
      </div>
    </div>
  );
};


export default ExperiencesPage;
'use client';
import React from 'react';
import { Experience } from '@/types/Experience';
import BookingForm from '@/components/Part/Experiences/BookingForm';
import { motion } from 'framer-motion';
import SanityImg from '@/components/SanityImg';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { experiencePortableTextComponents } from '@/utils/ExperiencePortableText';
import BasicButton from '@/components/Buttons/BasicButton';
import Reveal from '@/components/Effects/reveal';
import { FaCalendarAlt, FaClock, FaWineGlass, FaTag, FaChild, FaCheckCircle, FaRegClock, FaBell } from 'react-icons/fa';
import { BsCalendar2Check } from 'react-icons/bs';

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
            className="flex flex-col items-center space-y-6"
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
            <p className="text-gray-600">
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
      href={`/enotourism/experiences/${experience.slug}`}
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

  // Find sections we need
  const detailSection = experience.contentSections?.find(section => section._type === 'detailSection');
  const scheduleSection = experience.contentSections?.find(section => section._type === 'scheduleSection');
  const pricingSection = experience.contentSections?.find(section => section._type === 'pricingSection');
  const featureSection = experience.contentSections?.find(section => section._type === 'featureGrid');
  
  // Get days range or specific days text for schedule display
  const getDaysText = () => {
    if (!scheduleSection || scheduleSection._type !== 'scheduleSection') return '';
    
    if (scheduleSection.scheduleType === 'dayRange' && scheduleSection.dayRange) {
      return `${scheduleSection.dayRange.startDay} a ${scheduleSection.dayRange.endDay}`;
    } else if (scheduleSection.scheduleType === 'specificDays' && scheduleSection.specificDays?.length) {
      if (scheduleSection.specificDays.length === 1) {
        return `${scheduleSection.specificDays[0]}`;
      } else if (scheduleSection.specificDays.length === 7) {
        return 'Todos los días';
      } else {
        return scheduleSection.specificDays.join(', ');
      }
    }
    return '';
  };
  
  // Get available time slots for booking form
  const timeSlots = scheduleSection && scheduleSection._type === 'scheduleSection' && scheduleSection.timeSlots
    ? scheduleSection.timeSlots.map(slot => ({
        value: slot,
        label: `${slot} ${scheduleSection.timeSuffix || 'hrs'}`
      }))
    : [];

  // Check if there's a kids pricing option - now with support for the dedicated kidsPrice field
  const hasKidsPrice = experience.kidsPrice !== undefined && experience.kidsPrice !== null;
  const kidsOption = !hasKidsPrice && pricingSection && pricingSection._type === 'pricingSection'
    ? pricingSection.additionalOptions?.find(option => 
        option.name.toLowerCase().includes('niño') || 
        option.name.toLowerCase().includes('kids') ||
        option.name.toLowerCase().includes('infantil'))
    : null;

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
            className={`object-cover w-full h-full ${experience.commingSoon ? 'filter grayscale' : ''}`}
            priority={true}
            qualityTier="incredible"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          
          {/* Coming Soon Overlay */}
          {experience.commingSoon && (
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
              <div className="bg-black/70 backdrop-blur px-8 py-5 rounded-lg transform  shadow-2xl border border-white/10">
                <h2 className="text-white font-semibold tracking-wider uppercase text-2xl md:text-3xl lg:text-4xl text-center">
                  Próximamente
                </h2>
              </div>
            </div>
          )}
          
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
                <div className="inline-flex items-center px-3 py-1 bg-crred/90 text-white text-sm rounded-full mb-3">
                  <FaTag className="mr-1" /> {experience.category}
                </div>
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
        {/* Coming Soon Alert Banner */}
        {experience.commingSoon && (
          <div className="mb-8 bg-gradient-to-r from-crred/10 to-crred/5 rounded-xl p-5 border border-crred/20 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-crred/20 p-3 rounded-full">
                <FaBell className="text-xl text-crred" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-800 mb-1">Experiencia en preparación</h3>
                <p className="text-gray-600">
                  Estamos trabajando en esta experiencia. Pronto estará disponible para reservaciones.
                  Si estás interesado, déjanos tus datos para notificarte cuando esté lista.
                </p>
              </div>
              <div className="mt-3 md:mt-0">
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Notificación: ${experience.title}`)}&message=${encodeURIComponent(`Me interesa recibir una notificación cuando la experiencia "${experience.title}" esté disponible.\n\nGracias por mantenerme informado/a.`)}`}
                  className="inline-flex items-center bg-crred text-white px-5 py-2 rounded-lg hover:bg-crred/90 transition-colors"
                >
                  <BsCalendar2Check className="mr-2" />
                  Notificarme
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Experience Overview */}
            <section className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-medium text-crred">Acerca de la Experiencia</h2>
              
              <div className="prose prose-lg max-w-none">
                {detailSection && detailSection._type === 'detailSection' && detailSection.description && (
                  <PortableText
                    value={detailSection.description}
                    components={experiencePortableTextComponents}
                  />
                )}
                {!detailSection && (
                  <p>{experience.basicDescription}</p>
                )}
              </div>
              
              {/* Highlights/Key Points */}
              {detailSection && detailSection._type === 'detailSection' && detailSection.highlights && detailSection.highlights.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {detailSection.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-crred/5 rounded-lg border border-crred/10">
                      <FaCheckCircle className="text-crred text-lg mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
              )}
        </section>

            {/* What's Included */}
            {featureSection && featureSection._type === 'featureGrid' && featureSection.features && featureSection.features.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-medium text-crred">
                  {featureSection.title || "Lo que incluye"}
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featureSection.features.map((feature) => (
                    <div key={feature._key} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                      <div className="text-crred mb-3">
                        {feature.icon ? (
                          <span className="text-3xl">{feature.icon}</span>
                        ) : (
                          <FaWineGlass className="text-3xl" />
                        )}
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">{feature.title}</h3>
                      {feature.description && (
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Schedule Information - Enhanced */}
            {scheduleSection && scheduleSection._type === 'scheduleSection' && scheduleSection.timeSlots && scheduleSection.timeSlots.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-medium text-crred">
                  {scheduleSection.title || "Horarios Disponibles"}
                </h2>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Schedule Header */}
                  <div className="bg-crred/10 p-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-crred/20 text-crred p-3 rounded-full">
                        <FaCalendarAlt className="text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">Días de operación</h3>
                        <p className="text-gray-600 font-medium">{getDaysText()}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Time Slots */}
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="bg-crred/20 text-crred p-3 rounded-full mt-1">
                        <FaRegClock className="text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Horarios</h3>
                        <div className="flex flex-wrap gap-2">
                          {scheduleSection.timeSlots.map((timeSlot, index) => (
                            <div 
                              key={index} 
                              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium"
                            >
                              {timeSlot} {scheduleSection.timeSuffix || 'hrs'}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {scheduleSection.disclaimer && (
                      <div className="mt-5 pt-5 border-t border-gray-100">
                        <p className="text-sm italic text-gray-500">{scheduleSection.disclaimer}</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Quick Info Card */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-xl font-medium text-crred mb-4">Detalles</h3>
                
                <div className="space-y-4">
                  {/* Category */}
                  <div className="flex items-center gap-3">
                    <div className="bg-crred/10 p-2 rounded-full">
                      <FaTag className="text-crred" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Categoría</p>
                      <p className="font-medium">{experience.category}</p>
                    </div>
                  </div>
                  
                  {/* Duration */}
                  {(experience.duration || (detailSection && detailSection._type === 'detailSection' && detailSection.duration)) && (
                    <div className="flex items-center gap-3">
                      <div className="bg-crred/10 p-2 rounded-full">
                        <FaClock className="text-crred" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duración</p>
                        <p className="font-medium">{experience.duration || (detailSection && detailSection._type === 'detailSection' && detailSection.duration)}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Regular Price */}
                  {!experience.commingSoon && (experience.price || (detailSection && detailSection._type === 'detailSection' && detailSection.price) || (pricingSection && pricingSection._type === 'pricingSection' && pricingSection.basePrice)) && (
                    <div className="flex items-center gap-3">
                      <div className="bg-crred/10 p-2 rounded-full">
                        <span className="text-crred font-medium">$</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Precio por adulto</p>
                        <p className="font-medium text-xl">
                          ${experience.price || 
                            (detailSection && detailSection._type === 'detailSection' && detailSection.price) || 
                            (pricingSection && pricingSection._type === 'pricingSection' && pricingSection.basePrice)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Availability Status */}
                  {experience.commingSoon && (
                    <div className="flex items-center gap-3">
                      <div className="bg-crred/10 p-2 rounded-full">
                        <FaCalendarAlt className="text-crred" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Disponibilidad</p>
                        <p className="font-medium text-amber-600">Próximamente</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Kids Price */}
                  {!experience.commingSoon && (hasKidsPrice || kidsOption) && (
                    <div className="flex items-center gap-3">
                      <div className="bg-crred/10 p-2 rounded-full">
                        <FaChild className="text-crred" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Precio para niños</p>
                        <p className="font-medium text-xl">
                          ${hasKidsPrice ? experience.kidsPrice : kidsOption?.price}
                        </p>
                        {kidsOption?.description && !hasKidsPrice && (
                          <p className="text-xs text-gray-500">{kidsOption.description}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Coming Soon Sign-up or Booking Form */}
              <div>
                {experience.commingSoon ? (
                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <h3 className="text-xl font-medium text-crred mb-4">¿Te interesa esta experiencia?</h3>
                    <p className="text-gray-600 mb-4">
                      Estamos trabajando para que esta experiencia esté disponible pronto. Déjanos tus datos y te avisaremos cuando puedas reservarla.
                    </p>
                    <Link
                      href={`/contact?subject=${encodeURIComponent(`Notificación: ${experience.title}`)}&message=${encodeURIComponent(`Me interesa recibir una notificación cuando la experiencia "${experience.title}" esté disponible para reservar.\n\nDetalles de la experiencia:\n- Categoría: ${experience.category}\n- Duración: ${experience.duration || 'No especificada'}\n\nGracias por mantenerme informado/a.\n\n`)}`}
                      className="block w-full bg-crred text-white text-center py-3 rounded-lg shadow-sm hover:bg-crred/90 transition-colors"
                    >
                      Recibir notificación cuando esté disponible
                    </Link>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-medium text-crred mb-4">Reserva tu Experiencia</h3>
            <BookingForm 
              experienceType={experience.slug}
                      experienceTitle={experience.title}
              formFields={experience.formFields || []}
                      timeSlots={timeSlots}
            />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between gap-2 md:gap-4 mt-16">
          <motion.div className="flex-1">
            <Link
              href={`/enotourism/experiences/${prevExperience.slug}`}
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
              href={`/enotourism/experiences/${nextExperience.slug}`}
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
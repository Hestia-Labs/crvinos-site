'use client';
import { motion } from 'framer-motion';
import Icon from '@/components/Icons';
import { PortableText } from '@portabletext/react';
import { experiencePortableTextComponents } from '@/utils/ExperiencePortableText';
import { Experience } from '@/types/Experience';
import Image from 'next/image';
import SanityImg from '@/components/SanityImg';

export default function ExperienceDescription({ experience }: { experience: Experience }) {
    const iconMap: Record<string, string> = {
        Single_Grape: '/img/Single_Grape.png',
        Grapevine: '/img/Grapevine.png',
        Medal: '/img/Medal.png',
        Wine_Plate: '/img/Wine_Plate.png',
      };
  // Price & Duration Section
  const renderPriceDuration = (price: number | undefined, duration: string | undefined) => (
    <div className="flex gap-4 flex-wrap mb-8">
      {price && (
        <div className="px-6 py-3 rounded-lg flex items-center gap-3 border border-crred/20 text-crred bg-white">
          <div>
            <p className="text-sm font-light">Desde</p>
            <p className="text-2xl font-medium">${price}</p>
            <p className="text-sm font-light">por persona</p>
          </div>
        </div>
      )}
      
      {duration && (
        <div className="px-6 py-3 rounded-lg flex items-center gap-3 border border-crred/20 text-crred bg-white">
          <div>
            <p className="text-sm font-light">Duración</p>
            <p className="text-2xl font-medium">{duration}</p>
          </div>
        </div>
      )}
    </div>
  );

  // Feature Cards
  const renderFeatureCards = (features: any[]) => (
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div 
          key={feature?._key || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center p-6 bg-white border-crred/20 border rounded-xl space-y-4 text-center"
        >
          <Icon 
            name={
              feature?.locationId === 'step-vinedo' ? 'InfoVines' :
              feature?.locationId === 'step-bodega' ? 'InfoBarrel' : 'InfoCup'
            } 
            className="h-20 w-20 md:h-32 md:w-32" 
          />
          <h3 className="text-lg md:text-xl font-medium text-crred">
            {feature?.mainText}
          </h3>
          <p className="text-sm md:text-base">
            {feature?.description}
          </p>
        </motion.div>
      ))}
    </div>
  );

  // Schedule Section
  const renderSchedule = (scheduleTitle: any, morning: any, afternoon: any, disclaimer: any) => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8 p-6 border-t border-crred/20"
    >
      <h3 className="text-lg font-medium text-crred mb-4">{scheduleTitle.mainText}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {[morning, afternoon].map((timeSlot, index) => (
          <div 
            key={timeSlot?._key || index}
            className="flex flex-col items-center bg-white border-crred/20 border p-4 rounded-xl space-y-1"
          >
            <span className="text-crred text-2xl">{index === 0 ? '🕙' : '🕑'}</span>
            <h4 className="text-crred font-medium text-base">{timeSlot?.mainText}</h4>
            <p className="text-gray-700 text-base">{timeSlot?.description}</p>
          </div>
        ))}
      </div>
      {disclaimer?.description && (
        <p className="text-sm text-gray-500 mt-4">{disclaimer.description}</p>
      )}
    </motion.div>
  );

  // Main render logic
  if (experience.customDescription && experience.featureGrid) {
    if (experience.slug === 'tour-cr-cata-m7xvy20j') {
      const items = experience.featureGrid.items;
      return (
        <div className="space-y-8 text-gray-700">
          {(experience.price || experience.defaultDescription?.duration) && renderPriceDuration(experience.price, items.find(i => i.locationId === 'main-duration')?.mainText)}
          
          {items.find(i => i.locationId === 'main-desc')?.description && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl font-light leading-relaxed"
            >
              {items.find(i => i.locationId === 'main-desc')?.description}
            </motion.p>
          )}

          {renderFeatureCards([
            items.find(i => i.locationId === 'step-vinedo'),
            items.find(i => i.locationId === 'step-bodega'),
            items.find(i => i.locationId === 'step-cata')
          ])}

          {items.find(i => i.locationId === 'time-tittle')?.mainText && 
            renderSchedule(
              items.find(i => i.locationId === 'time-tittle'),
              items.find(i => i.locationId === 'time-am'),
              items.find(i => i.locationId === 'time-pm'),
              items.find(i => i.locationId === 'main-hint')
            )}
        </div>
      );
    }
    if (experience.slug === 'experiencia-premium-m7xzurda') {
        const items = experience.featureGrid.items;
        return (
          <div className="space-y-12 text-gray-800">
            {/* Hero Section */}
            
      
            {/* Price & Duration */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="p-8 bg-white rounded-2xl shadow-lg border border-crred/20"
              >
                <h3 className="text-2xl font-medium text-crred mb-4">Inversión</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-crred/10">
                    <span className="font-light">Experiencia base</span>
                    <span className="text-2xl font-medium text-crred">${experience.price}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-light">Opción de maridaje</span>
                    <span className="text-lg text-gray-600">+ ${items.find(i => i.locationId === 'maridaje-price')?.mainText}</span>
                  </div>
                </div>
              </motion.div>
      
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="p-8 bg-crred/5 rounded-2xl border border-crred/20"
              >
                <h3 className="text-2xl font-medium text-crred mb-4">Duración</h3>
                <div className="flex items-center gap-4">
                  <Icon name="Clock" className="h-12 w-12 text-crred" />
                  <span className="text-3xl font-light">{items.find(i => i.locationId === 'main-duration')?.mainText}</span>
                </div>
              </motion.div>
            </div>
      
            {/* Experience Highlights */}
            <div className="grid md:grid-cols-3 gap-8">
              {['step-vinedo', 'step-bodega', 'step-maridaje'].map((stepId, index) => {
                const feature = items.find(i => i.locationId === stepId);
                return (
                  <motion.div
                    key={stepId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="group relative overflow-hidden rounded-xl bg-white shadow-lg border-crred/20 border-2"
                  >
                    <div className="p-8 space-y-4">
                        {/* TODO: Use Icons from Timeline */}
                      <Icon 
                        name={
                            stepId === 'step-vinedo' ? iconMap['Grapevine'] :
                            stepId === 'step-bodega' ? "InfoBarrel" : iconMap['Wine_Plate']
                        } 
                        className="h-16 w-auto text-crred mb-4"
                      />
                      <h3 className="text-xl font-medium text-crred">{feature?.mainText}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature?.description}</p>
                    </div>

                  </motion.div>
                );
              })}
            </div>
      
            {/* Chef's Pairing Option */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-crred/5 to-crred/10 border border-crred/20"
            >
            <div className="p-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-medium text-crred">{items.find(i => i.locationId === 'opcion-titulo')?.mainText}</h3>
                <p className="text-lg leading-relaxed text-gray-700">
                    {items.find(i => i.locationId === 'opcion-desc')?.description}
                </p>
                </div>
                <div className="w-full md:w-96 h-64 relative rounded-lg overflow-hidden shadow-xl border-2 border-crred/20">
                <SanityImg
                    source={items.find(i => i.locationId === 'image_desc')?.image}
                    alt={items.find(i => i.locationId === 'opcion-titulo')?.mainText || "Opción de Maridaje del Chef"}
                    width={768}
                    height={512}
                    className="object-cover"

                />
                </div>
            </div>
            </motion.div>
      
            {/* Schedule Section */}
            {renderSchedule(
              items.find(i => i.locationId === 'time-tittle'),
              items.find(i => i.locationId === 'time-am'),
              items.find(i => i.locationId === 'time-pm'),
              items.find(i => i.locationId === 'main-hint')
            )}
          </div>
        );
    }
    return (
      <div className="space-y-8 text-gray-700">
        <p className="text-xl md:text-2xl font-light leading-relaxed">
          Custom experience details coming soon
        </p>
      </div>
    );
  }

  // Default description
  return (
    <div className="space-y-8">
      {(experience.price || experience.defaultDescription?.duration) && renderPriceDuration(experience.price, experience.defaultDescription?.duration)}

      <div className="space-y-8">
        {experience.defaultDescription?.mainParagraph && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-700 mb-8">
              <PortableText
                value={experience.defaultDescription.mainParagraph}
                components={experiencePortableTextComponents}
              />
            </div>
          </motion.div>
        )}

        {experience.defaultDescription?.features && (
          <div className="grid md:grid-cols-2 gap-8">
            {experience.defaultDescription.features.map((feature, index) => (
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
                <p className="text-xl font-light text-gray-700">{feature}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
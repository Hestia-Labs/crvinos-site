'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine } from '@/types/Wine';
import Image from 'next/image';
import clsx from 'clsx';

const WineProfile: React.FC<{ wine: Wine; wineDetails: { title: string; description: string }[] }> = ({ wine, wineDetails }) => {
  const [activeTab, setActiveTab] = useState(
    wine?.profile && wine.profile.length > 0 ? 'profile' : 'details'
  );

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div className="flex border-b border-crred">
        {wine?.profile && wine.profile.length > 0 && (
          <button
            className={clsx(
              'text-crred py-2 px-4 -mb-px font-semibold',
              activeTab === 'profile' ? 'border-b-2 border-crred' : 'opacity-50'
            )}
            onClick={() => setActiveTab('profile')}
          >
            Perfil y Sabores
          </button>
        )}
        <button
          className={clsx(
            'text-crred py-2 px-4 -mb-px font-semibold',
            activeTab === 'details' ? 'border-b-2 border-crred' : 'opacity-50'
          )}
          onClick={() => setActiveTab('details')}
        >
          Detalles del Vino
        </button>
      </div>
      {/* Tabs Content */}
      <div className="py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
              transition={{ duration: 0.3 }}
            >
              {/* Details Content */}
              {wineDetails.length > 0 ? (
                wineDetails.map((detail, index) => (
                  <div key={index} className="flex w-full justify-start items-start space-x-2 mb-2">
                    <div className="text-crred font-semibold w-1/3 text-sm md:text-base">
                      {detail.title}:
                    </div>
                    <div className="text-gray-700 w-2/3 text-sm md:text-base">
                      {detail.description}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-crred text-base">No hay detalles disponibles.</p>
              )}
            </motion.div>
          )}
          {activeTab === 'profile' && wine?.profile && wine.profile.length > 0 && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
              transition={{ duration: 0.3 }}
            >
              {/* Profile Content */}
              <div className="w-3/4">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {wine.profile.map((profileItem, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div className="flex flex-col items-center">
                        <Image
                          src={profileItem.image.asset.url}
                          alt={profileItem.image.alt}
                          width={100}
                          height={100}
                          quality={100}
                          className="w-auto h-16 p-2"
                        />
                        <p className="text-crred text-sm md:text-base text-center">
                          {profileItem.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WineProfile;

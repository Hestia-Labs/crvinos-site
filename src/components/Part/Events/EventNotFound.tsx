"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BasicButton from '@/components/Buttons/BasicButton';
import { motion } from 'framer-motion';

const EventNotFound = () => {
  return (
    <div className="flex flex-col relative space-y-9">
      <Navbar relative red redLogo />
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
              Evento no encontrado
            </h1>
            <p className="text-gray-600">
              El evento que estás buscando no existe o ha sido removido.
            </p>
            
            <div className="h-4"></div>
            
            <BasicButton
              link="/events"
              variant="transparent"
              className="mx-auto border border-crred"
            >
              Ver todos los eventos
            </BasicButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventNotFound;

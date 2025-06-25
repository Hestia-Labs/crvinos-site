'use client';

import React from 'react';
import BasicButton from '@/components/Buttons/BasicButton';
import Reveal from '@/components/Effects/reveal';

const ContactSection: React.FC = () => {
  return (
    <Reveal initial={true}>
      <div className="mt-16 text-center">
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-md rounded-xl p-8">
          <h3 className="text-xl font-medium text-crred mb-4">¿Necesitas información personalizada?</h3>
          <p className="text-gray-700 mb-6">
            Si quieres más detalles sobre nuestras experiencias, reservaciones especiales, 
            o cualquier consulta específica, nuestro equipo está listo para ayudarte.
          </p>
          <BasicButton
            link="/contact"
            variant="transparent"
            className="border border-crred mx-auto"
          >
            Contáctanos
          </BasicButton>
        </div>
      </div>
    </Reveal>
  );
};

export default ContactSection; 
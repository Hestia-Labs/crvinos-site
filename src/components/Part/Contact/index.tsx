"use client";

import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icons';
import { sendQuestion } from '@/app/actions/emails';
import { useColor } from '@/contexts/ColorContext'; // Import the useColor hook

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { redOn } = useColor(); // Destructure redOn from the color context

  // Set red theme when component mounts
  useEffect(() => {
    redOn(); // Activate red theme on component mount
  }, [redOn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await sendQuestion(formData.email, formData.message, formData.name);
      setLoading(false);

      if (response.error) {
        setError(response.error);
        return;
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setLoading(false);
      setError('Error sending message. Please try again later.');
    }
  };

  return (
    <div className='flex flex-col bg-[#631E3A] overflow-x-hidden'>
      <div className="relative w-full">
        <Icon name="ContactVines" className="absolute h-80 w-full scale-[1.1] md:h-160 opacity-10" />
      </div>
      <Navbar relative />
      <div className='flex flex-col items-center justify-center w-full px-4 sm:px-10 md:px-20'>
        
        <div className='flex flex-col justify-center items-center w-full space-y-6 py-24'>
          <h2 className="text-2xl sm:text-3xl md:text-8xl text-back font-light tracking-wide mb-4">Contáctanos</h2>
          <p className="text-back font-light italic text-4xl">¡Nos encantaría saber de ti!</p>
        </div>
        <div className='border-back border-t-2 w-full flex flex-col justify-center items-center py-10 sm:py-15 md:py-20 space-y-12 relative mb-8'>
          <div className='md:py-9 absolute top-0 right-0 mt-4 mr-4 text-right'>
            <p className="text-back text-sm sm:text-lg md:text-xl italic">Teléfono: +52 993 166 7349</p>
            <p className="text-back text-sm sm:text-lg md:text-xl italic">Correo Electrónico: crvinosmx@gmail.com</p>
          </div>
          {submitted ? (
            <div className='flex flex-col justify-center items-center w-full space-y-2 p-10 sm:p-20 md:p-40'>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-back tracking-wide mb-2">¡Gracias por tu mensaje!</h2>
              <p className="text-back font-light italic">Nos pondremos en contacto contigo pronto.</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className='flex flex-col space-y-12 w-full sm:w-3/4 md:w-1/2'>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu Nombre"
                  className="border-b border-back p-2 bg-transparent text-back placeholder:text-back-75"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Tu Correo Electrónico"
                  className="border-b border-back p-2 bg-transparent text-back placeholder:text-back-75"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tu Mensaje"
                  className="border-b border-back p-2 bg-transparent text-back placeholder:text-back-75"
                  rows={5}
                  required
                />
                <button
                  type="submit"
                  className={`p-2 text-lg rounded-full transition-all duration-300 ease-in-out border border-back-90 ${loading ? ' text-back-90 animate-pulse hover:bg-back-50  ' : 'bg-back-90 text-crred hover:bg-transparent hover:text-back-90  hover:border-back-90  '}`}
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
              {error && <p className="text-back mt-2">{error}</p>}
            </>
          )}
          <div onClick={() => router.push('/')} className='flex items-center space-x-2 sm:space-x-4 transition duration-500 ease-in-out transform hover:-translate-x-2 cursor-pointer'>
            <Icon name='Arrow-White' className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-500 ease-in-out transform hover:translate-x-2" style={{ transform: 'rotate(180deg)' }} />
            <p className="font-cormorant text-back transition-colors duration-500 ease-in-out hover:text-back-75">Volver a Inicio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

"use client";

import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/Icons';
import { sendQuestion } from '@/app/actions/emails';
import { useColor } from '@/contexts/ColorContext'; // Import the useColor hook
import { motion } from 'framer-motion'; // Import motion from framer-motion
import ScrollToLocation from './ScrollToLocation';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { redOn, redOff } = useColor(); // Destructure redOn from the color context

  // Function to check if a field is filled
  const isFieldFilled = (fieldName: string): boolean => {
    return formData[fieldName as keyof typeof formData]?.trim().length > 0;
  };

  // Set red theme when component mounts and handle URL query parameters
  useEffect(() => {
    redOn(); // Activate red theme on component mount
    
    // Check for query parameters and pre-populate form
    const subject = searchParams.get('subject');
    const message = searchParams.get('message');
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    
    // Update form data with any provided query parameters
    setFormData(prevData => {
      const newData = { ...prevData };
      
      // Add subject prefix to message if subject is provided
      if (subject && !message) {
        newData.message = `Asunto: ${subject}\n\n`;
      }
      
      // Use provided message if available
      if (message) {
        newData.message = message;
      }
      
      // Set name if provided
      if (name) {
        newData.name = name;
      }
      
      // Set email if provided
      if (email) {
        newData.email = email;
      }
      
      return newData;
    });
    
    return () => redOff(); // Deactivate red theme on component unmount
  }, [redOn, redOff, searchParams]); // Added redOff and searchParams to dependency array

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField(e.target.name);
  };

  const handleBlur = () => {
    setFocusedField(null);
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
    <div className='flex relative flex-col bg-accred overflow-x-hidden'>
      <div className="relative w-full">
        <Icon name="ContactVines" className="absolute h-80 w-full    md:h-160 opacity-10" />
      </div>
      <Navbar relative />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col items-center justify-center w-full px-4 sm:px-10 md:px-20'
      >
        <div className='flex flex-col justify-center items-center w-full space-y-4 md:space-y-6 py-8 md:py-24'>
          <div className="text-center max-w-4xl">
            <h1 className="text-2xl sm:text-4xl md:text-8xl text-back font-light tracking-wide mb-2 md:mb-6">Contáctanos</h1>
            <p className="text-back font-light italic text-lg md:text-4xl mb-4 ">¡Nos encantaría saber de ti!</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-back text-sm sm:text-base">
              <div className="flex items-center">
                <span className="mr-2 opacity-75">Teléfono:</span>
                <a href="tel:+524427732600" className="hover:opacity-75 transition-opacity">+52 442 773 2600</a>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-back rounded-full opacity-50"></div>
              <div className="flex items-center">
                <span className="mr-2 opacity-75">Email:</span>
                <a href="mailto:crvinosmx@gmail.com" className="hover:opacity-75 transition-opacity">crvinosmx@gmail.com</a>
              </div>
        </div>
          </div>
          <ScrollToLocation />
        </div>
        <div className='border-back border-t-2 w-full flex flex-col justify-center items-center py-12 sm:py-16 md:py-20 space-y-12 relative mb-8'>
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='w-full sm:w-3/4 md:w-1/2 relative'
            >
              <div className="absolute -inset-1 bg-white/5 rounded-xl blur-sm"></div>
              <div className="bg-accred/90 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-back/20 shadow-lg relative">
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl sm:text-4xl text-back tracking-wide">¡Gracias por tu mensaje!</h2>
                  <p className="text-back font-light italic text-lg">Nos pondremos en contacto contigo pronto.</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSubmitted(false)}
                    className="mt-4 inline-flex items-center px-5 py-2 border border-back/30 rounded-full hover:bg-back/10 transition-colors text-back"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Enviar otro mensaje
                  </motion.button>
                </div>
            </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full sm:w-3/4 md:w-1/2 relative"
              >
                <div className="absolute -inset-1 bg-white/5 rounded-xl blur-sm"></div>
                <div className="bg-accred/90 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-xl border border-back/20 shadow-lg relative">
                  <h3 className="text-back text-xl font-semibold mb-8 border-b border-back/20 pb-3">Formulario de Contacto</h3>
                  <motion.form 
                    onSubmit={handleSubmit} 
                    className='flex flex-col space-y-10'
                  >
                    <div className="relative space-y-2">
                      <label 
                        htmlFor="name" 
                        className={`absolute -top-5 left-0 text-back font-semibold transition-all ${focusedField === 'name' ? 'text-white' : ''}`}>
                        Nombre
                      </label>
                      <div className="relative">
                <input
                          id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          placeholder="Ingresa tu nombre completo"
                          className={`w-full border-b ${
                            focusedField === 'name' 
                              ? 'border-white' 
                              : isFieldFilled('name') 
                                ? 'border-back/90' 
                                : 'border-back/70'
                          } p-2 bg-black/10 backdrop-blur-[1px] rounded-sm text-white placeholder:text-white/50 focus:outline-none focus:bg-black/20 hover:bg-black/15 transition-all duration-200`}
                  required
                />
                        
                        {isFieldFilled('name') && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/80"></div>
                        )}
                      </div>
                    </div>
                    
                    <div className="relative space-y-2">
                      <label 
                        htmlFor="email" 
                        className={`absolute font-semibold -top-5 left-0 text-back transition-all ${focusedField === 'email' ? 'text-white' : ''}`}>
                        Correo Electrónico
                      </label>
                      <div className="relative">
                <input
                          id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          placeholder="ejemplo@correo.com"
                          className={`w-full border-b ${
                            focusedField === 'email' 
                              ? 'border-white' 
                              : isFieldFilled('email') 
                                ? 'border-back/90' 
                                : 'border-back/70'
                          } p-2 bg-black/10 backdrop-blur-[1px] rounded-sm text-white placeholder:text-white/50 focus:outline-none focus:bg-black/20 hover:bg-black/15 transition-all duration-200`}
                  required
                />
                        
                        {isFieldFilled('email') && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/80"></div>
                        )}
                      </div>
                    </div>
                    
                    <div className="relative space-y-2">
                      <label 
                        htmlFor="phone" 
                        className={`absolute font-semibold -top-5 left-0 text-back transition-all ${focusedField === 'phone' ? 'text-white' : ''}`}>
                        Teléfono (opcional)
                      </label>
                      <div className="relative">
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          placeholder="+52 (442) XXX XXXX"
                          className={`w-full border-b ${
                            focusedField === 'phone' 
                              ? 'border-white' 
                              : isFieldFilled('phone') 
                                ? 'border-back/90' 
                                : 'border-back/70'
                          } p-2 bg-black/10 backdrop-blur-[1px] rounded-sm text-white placeholder:text-white/50 focus:outline-none focus:bg-black/20 hover:bg-black/15 transition-all duration-200`}
                        />
                        
                        {isFieldFilled('phone') && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/80"></div>
                        )}
                      </div>
                    </div>
                    
                    <div className="relative space-y-2">
                      <label 
                        htmlFor="message" 
                        className={`absolute font-semibold -top-5 left-0 text-back transition-all ${focusedField === 'message' ? 'text-white' : ''}`}>
                        Mensaje
                      </label>
                      <div className="relative">
                <textarea
                          id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          placeholder="Escribe tu mensaje aquí..."
                          className={`w-full border-b ${
                            focusedField === 'message' 
                              ? 'border-white' 
                              : isFieldFilled('message') 
                                ? 'border-back/90' 
                                : 'border-back/70'
                          } p-2 bg-black/10 backdrop-blur-[1px] rounded-sm text-white placeholder:text-white/50 focus:outline-none focus:bg-black/20 hover:bg-black/15 transition-all duration-200 min-h-[150px] whitespace-pre-wrap`}
                          rows={7}
                  required
                />
                        
                        {isFieldFilled('message') && (
                          <div className="absolute right-2 top-4 w-1.5 h-1.5 rounded-full bg-white/80"></div>
                        )}
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                  type="submit"
                      className={`p-3 mt-4 text-lg rounded-full transition-all duration-300 ease-in-out border ${loading ? 'text-back-90 animate-pulse hover:bg-back-50 border-back/40' : 'bg-back-90 text-crred hover:bg-transparent hover:text-back-90 hover:border-back-90 border-back-90'}`}
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                    </motion.button>
                  </motion.form>
                  {error && <p className="text-back mt-6 p-3 bg-red-500/20 rounded-lg border border-red-500/30 text-center">{error}</p>}
                </div>
              </motion.div>
            </>
          )}

          {/* Locations Section - Integrated within the border section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-5xl mt-16 relative"
            id="locations-section"
          >
            {/* Visual connector line */}
            <div className="absolute left-1/2 -top-8 transform -translate-x-1/2 w-px h-8 bg-back/30"></div>

            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-back font-light tracking-wide mb-2">Encuentra nuestros vinos en</h2>
              <div className="h-0.5 w-32 sm:w-40 bg-back/40 mx-auto mt-4 mb-3"></div>
              <p className="text-back/80 italic text-base md:text-lg">Visítanos en cualquiera de nuestras ubicaciones</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Location 1 - Villahermosa */}
              <motion.div 
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)" }} 
                className="relative overflow-hidden"
              >
                <div className="absolute -inset-1 bg-white/5 rounded-xl blur-sm"></div>
                <div className="bg-accred/90 backdrop-blur-sm p-6 rounded-xl border border-back/20 shadow-lg relative h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-back/10 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-back" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl text-back font-medium">Villahermosa</h3>
                  </div>
                  <div className="space-y-3 flex-grow">
                    <p className="text-back/90 text-sm md:text-base">Centenario Instituto Juárez No. 108 No. Int. 2 Reforma</p>
                    <p className="text-back/90 text-sm md:text-base">Villahermosa 86080, Centro Tabasco México</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-back/20">
                    <a href="tel:+529932587379" className="flex items-center text-back/80 hover:text-back transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>993 258 7379</span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Location 2 - Veracruz */}
              <motion.div 
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)" }} 
                className="relative overflow-hidden"
              >
                <div className="absolute -inset-1 bg-white/5 rounded-xl blur-sm"></div>
                <div className="bg-accred/90 backdrop-blur-sm p-6 rounded-xl border border-back/20 shadow-lg relative h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-back/10 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-back" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl text-back font-medium">Veracruz</h3>
                  </div>
                  <div className="space-y-3 flex-grow">
                    <a 
                      href="https://g.co/kgs/61cHFTG" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block hover:text-white transition-colors"
                    >
                      <p className="text-back/90 text-sm md:text-base">Alaminos #561 esq. Isabel la Católica</p>
                      <p className="text-back/90 text-sm md:text-base">Fracc. Reforma, Veracruz, Ver.</p>
                      <p className="text-back/90 text-sm md:text-base flex items-center">
                        Veracruz 91919
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1.5 text-back/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </p>
                    </a>
                  </div>
                  <div className="mt-4 pt-4 border-t border-back/20">
                    <a href="tel:+522299014402" className="flex items-center text-back/80 hover:text-back transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>229 901 4402</span>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Location 3 - Querétaro */}
              <motion.div 
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)" }} 
                className="relative overflow-hidden"
              >
                <div className="absolute -inset-1 bg-white/5 rounded-xl blur-sm"></div>
                <div className="bg-accred/90 backdrop-blur-sm p-6 rounded-xl border border-back/20 shadow-lg relative h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-back/10 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-back" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl text-back font-medium">Querétaro</h3>
                  </div>
                  <div className="space-y-3 flex-grow">
                    <a 
                      href="https://g.co/kgs/W5pGLo7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block hover:text-white transition-colors"
                    >
                      <p className="text-back/90 text-sm md:text-base">Camino Tejocote a San Jose la Laja, Km 3.2</p>
                      <p className="text-back/90 text-sm md:text-base flex items-center">
                        Tequisquiapan, Qro.
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1.5 text-back/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </p>
                    </a>
                  </div>
                  <div className="mt-4 pt-4 border-t border-back/20">
                    <a href="tel:+524427732600" className="flex items-center text-back/80 hover:text-back transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>442 773 2600</span>
                    </a>
                  </div>
                </div>
              </motion.div>
          </div>
          </motion.div>

          {/* Back to Home button - Now at the bottom of both sections */}
          <motion.div 
            whileHover={{ x: -3 }}
            onClick={() => router.push('/')} 
            className='flex items-center space-x-2 sm:space-x-4 transition duration-500 ease-in-out cursor-pointer mt-14'
          >
            <Icon name='Arrow-White' className="h-4 w-4 sm:h-5 sm:w-5" style={{ transform: 'rotate(180deg)' }} />
            <p className="text-back transition-colors duration-500 ease-in-out hover:text-back-75">Volver a Inicio</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;

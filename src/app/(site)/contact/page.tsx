'use client';

import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icons';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  return (
    <div className='flex flex-col space-y-9'>
      <Navbar relative red />
      <div className='flex flex-col items-center justify-center w-full px-20'>
        <div className='border-crred border-t-2 w-full flex flex-col justify-center items-center py-20   space-y-9'>

        
            {submitted ? (
            <div className='flex flex-col justify-center items-center w-full space-y-2 p-40'>
                <h2 className="text-5xl text-crred  tracking-wide mb-2">¡Gracias por tu mensaje!</h2>
                <p className="text-crred font-light italic">Nos pondremos en contacto contigo pronto.</p>
            </div>
            ) : (
                <>
                <div className='flex flex-col justify-center items-center w-full space-y-2'>
                    <h2 className="text-3xl text-crred font-light tracking-wide mb-2">Contáctanos</h2>
                    <p className="text-crred font-light italic">¡Nos encantaría saber de ti!</p>
                </div>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-6 w-1/2'>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu Nombre"
                className="border border-crred p-2 rounded"
                required
                />
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Tu Correo Electrónico"
                className="border border-crred p-2 rounded"
                required
                />
                <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Tu Número de Teléfono"
                className="border border-crred p-2 rounded"
                required
                />
                <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tu Mensaje"
                className="border border-crred p-2 rounded"
                rows={5}
                required
                />
                <button
                type="submit"
                className={`p-2 rounded transition-all duration-300 ease-in-out ${loading ? 'bg-gray-400' : 'bg-crred text-white'}`}
                disabled={loading}
                >
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
            </form>
            </>
            )}
            <div onClick={() => router.push('/')} className='flex items-center space-x-4 transition duration-500 ease-in-out transform hover:-translate-x-2 cursor-pointer'>
            <Icon name='Arrow' className="h-5 w-5 transition-transform duration-500 ease-in-out transform hover:translate-x-2" style={{ transform: 'rotate(180deg)' }} />
            <p className="font-cormorant text-crred transition-colors duration-500 ease-in-out hover:text-crred-light">Volver a Inicio</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

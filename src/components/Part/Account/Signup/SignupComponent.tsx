'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BasicButton from '@/components/Buttons/BasicButton';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Icons from '@/components/Icons';

const SignupComponent: React.FC = () => {
  const { login } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [mailingList, setMailingList] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStepOneValid = firstName && lastName && phoneNumber;

  const isStepTwoValid =
    birthDate &&
    email &&
    validateEmail(email) &&
    password &&
    confirmPassword === password &&
    termsAccepted;

  const nextStep = () => {
    if (isStepOneValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Por favor, introduce un correo electrónico válido.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    if (!isStepTwoValid) {
      setErrorMessage(
        'Por favor, completa todos los campos y acepta los términos y condiciones.'
      );
      return;
    }

    try {
      await login();
      alert('Cuenta creada exitosamente!');
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('Hubo un error al crear tu cuenta.');
    }
  };

  const validateBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = new Date(e.target.value);
    const today = new Date();
    const age = today.getFullYear() - inputDate.getFullYear();
    const monthDifference = today.getMonth() - inputDate.getMonth();
    const dayDifference = today.getDate() - inputDate.getDate();

    if (
      age < 18 ||
      (age === 18 &&
        (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))
    ) {
      e.target.setCustomValidity('Debes tener al menos 18 años');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const variants = {
    hidden: { opacity: 0, x: -100, transition: { ease: 'easeIn', duration: 0.1 } },
    visible: { opacity: 1, x: 0, transition: { ease: 'easeIn', duration: 0.1 } },
    exit: { opacity: 0, x: 100, transition: { ease: 'easeIn', duration: 0.1 } },
  };

  return (
    <div className='bg-back-75 p-6 md:p-8 rounded shadow-md w-8/12 md:w-1/3 mx-auto border border-crred-50'>
      <h2 className='text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-crred'>Crear una Cuenta</h2>
 
      <div className="flex justify-between mb-6">
        {[1, 2].map((i) => (
          <div key={i} className={`w-full h-1 ${step >= i ? 'bg-crred' : 'bg-gray-300'} mx-1`}></div>
        ))}
      </div>

      <form className='space-y-3 md:space-y-4' onSubmit={handleSignup}>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          className='space-y-5'
          key={step}
        >
          {step === 1 && (
            <>
              <div>
                <label className='block text-xs md:text-sm font-medium text-crred'>Nombre*</label>
                <input
                  type='text'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='mt-1 block w-full px-2 py-1 md:py-2 border-crred border-b text-crred placeholder:text-gray-400 bg-transparent text-xs md:text-sm'
                  placeholder='Tu Nombre'
                  required
                />
              </div>
              <div>
                <label className='block text-xs md:text-sm font-medium text-crred'>Apellido*</label>
                <input
                  type='text'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='mt-1 block w-full px-2 py-1 md:py-2 border-crred border-b text-crred placeholder:text-gray-400 bg-transparent text-xs md:text-sm'
                  placeholder='Tu Apellido'
                  required
                />
              </div>
              <div>
                <label className='block text-xs md:text-sm font-medium text-crred'>Número de Teléfono*</label>
                <input
                  type='tel'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className='mt-1 block w-full px-2 py-1 md:py-2 border-crred border-b text-crred placeholder:text-gray-400 bg-transparent text-xs md:text-sm'
                  placeholder='123-456-7890'
                  required
                />
              </div>
              <div className='mt-4'>
                <BasicButton onClick={nextStep} variant='bg-crred' sizex='medium' sizey='small' disabled={!isStepOneValid}>
                  Siguiente
                </BasicButton>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className='block text-xs md:text-sm font-medium text-crred'>Fecha de Nacimiento*</label>
                <input
                  type='date'
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                    validateBirthDate(e);
                  }}
                  className='mt-1 block w-full px-2 py-1 md:py-2 border-crred border-b  text-gray-400 placeholder:text-gray-400 bg-transparent text-xs md:text-sm'
                  required
                />
              </div>

              <div>
                <label className='block text-xs md:text-sm font-medium text-crred'>Correo Electrónico*</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='mt-1 block w-full px-2 py-1 md:py-2 border-crred border-b text-crred placeholder:text-gray-400 bg-transparent text-xs md:text-sm'
                  placeholder='tu@ejemplo.com'
                  required
                />
              </div>

              <div>
                <label className='block text-xs md:text-sm font-medium text-crred'>Contraseña*</label>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='mt-1 block w-full px-2 py-1 md:py-2 border-crred border-b text-crred placeholder:text-gray-400 bg-transparent text-xs md:text-sm'
                  placeholder='••••••••'
                  required
                />
              </div>
              <div>
                <label className='block text-xs md:text-sm font-medium text-crred'>Confirmar Contraseña*</label>
                <input
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='mt-1 block w-full px-2 py-1 md:py-2 border-crred border-b text-crred placeholder:text-gray-400 bg-transparent text-xs md:text-sm'
                  placeholder='••••••••'
                  required
                />
              </div>

              {/* Mailing List Checkbox */}
              <div className='mt-4'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox h-4 w-4 text-crred'
                    checked={mailingList}
                    onChange={(e) => setMailingList(e.target.checked)}
                  />
                  <span className='ml-2 text-xs md:text-sm text-crred'>
                    Quiero unirme a la lista de correo para recibir novedades y promociones
                  </span>
                </label>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className='mt-4'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox h-4 w-4 text-crred'
                    required
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <span className='ml-2 text-xs md:text-sm text-crred'>
                    Acepto los <Link href='/terms' className='underline'>términos y condiciones</Link>
                  </span>
                </label>
              </div>

              {errorMessage && (
                <div className='mt-4 text-xs md:text-sm text-red-700'>
                  {errorMessage}
                </div>
              )}

              <div className="flex flex-col justify-between items-center space-y-4 mt-6">
                <BasicButton
                  variant='bg-crred'
                  sizex='medium'
                  sizey='small'
                  className='w-full mt-0 border border-crred'
                >
                  Crear Cuenta
                </BasicButton>
                <div
                  onClick={prevStep}
                  className='flex items-center space-x-2 transition duration-200 ease-in-out transform hover:-translate-x-2 cursor-pointer'
                >
                  <Icons name='Arrow' className="h-5 w-5 transition-transform duration-500 ease-in-out transform hover:translate-x-2" style={{ transform: 'rotate(180deg)' }} />
                  <p className="font-cormorant text-crred transition-colors duration-500 ease-in-out hover:text-crred-light">Atrás</p>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </form>
      <div className='text-center mt-6'>
        <Link href='/account/login' className='text-xs md:text-sm text-crred underline'>
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
      </div>
    </div>
  );
};

export default SignupComponent;

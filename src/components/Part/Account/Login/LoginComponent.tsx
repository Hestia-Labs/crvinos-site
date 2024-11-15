'use client';
import React, { useState } from 'react';
import BasicButton from '@/components/Buttons/BasicButton';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {useRouter } from "next/navigation"
 
const LoginComponent: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
 
    if (email === 'test@example.com' && password === 'password') {
      login();
      alert('Login successful!');
      router.push("/account/profile")
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='bg-back p-6 md:p-8 rounded shadow-md w-8/12 md:w-1/3 mx-auto border border-crred-50'>
      <h2 className='text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-crred'>Iniciar Sesión</h2>
      <form className='space-y-3 md:space-y-4' onSubmit={handleLogin}>
        <div>
          <label className='block text-xs md:text-sm font-medium text-crred'>Correo Electrónico*</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1 block w-full px-2 py-1 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-crred focus:border-crred text-xs md:text-sm'
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
            className='mt-1 block w-full px-2 py-1 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-crred focus:border-crred text-xs md:text-sm'
            placeholder='••••••••'
            required
          />
        </div>
        <div className='text-left'>
          <Link href='/account/forgot-password' className='text-xs md:text-sm text-crred underline'>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <BasicButton
          variant='bg-crred'
          sizex='medium'
          sizey='small'
          className='w-full mt-0 border border-crred'
        >
          Iniciar Sesión
        </BasicButton>
      
        <div className='text-center mt-1'>
          <Link href='/account/signup' className='text-xs md:text-sm text-crred underline'>
            Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;

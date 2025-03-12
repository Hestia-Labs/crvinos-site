"use client";

import React, { useState } from 'react';
import BasicButton from '@/components/Buttons/BasicButton';
import { useColor } from '@/contexts/ColorContext';  
import clsx from 'clsx';

const MailingListForm: React.FC = () => {
  const { isRed } = useColor();  
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response: Response = await fetch('/api/addEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data: { error?: string } = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setSuccess(true);
      setEmail('');
    } catch (error) {
      setLoading(false);
      setError('Something went wrong');
    }
  };

  return (
    <div className={'w-full'}>
      <h3 className={clsx('text-3xl md:text-4xl italic font-thin', {
        'text-back': isRed,
        'text-crred': !isRed,
      })}>
        Forma parte de nuestra comunidad
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-row items-center space-x-3 mt-4 w-full">
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Tu Correo Electrónico"
          className={
            clsx(' p-2  w-full placeholder:text-xs/3 md:placeholder:text-base', {
            'border-b border-back   text-back placeholder:text-back-75  bg-transparent': isRed,
            ' border-crred-75 border-b text-gray-700 placeholder:text-gray-400 bg-transparent': !isRed,
          })}
          required
        />
        <BasicButton
          variant={isRed ? 'transparent-foot' : 'transparent'}
          sizey="small"
          sizex="small"
          className={clsx('rounded-md border border-solid text-nowrap text-sm md:text-base', {
            'border-back text-back': isRed,
            'border-crred text-back': !isRed,
          })}
        >
          {loading ? 'Subscribiendo...' : 'Suscribirme'}
        </BasicButton>
      </form>
      {error && <p className={clsx('mt-2', {
        'text-back': isRed,
        'text-crred-light': !isRed,
      })}>{error}</p>}
      {success && <p className={clsx('mt-2', {
        'text-back': isRed,
        'text-crred': !isRed,
      })}>
        Pronto sabrás de nosotros, ¡gracias!
      </p>}
    </div>
  );
};

export default MailingListForm;

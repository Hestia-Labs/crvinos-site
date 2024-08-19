'use client';

import React, { useState } from 'react';
import BasicButton from '@/components/Buttons/BasicButton';

const MailingListForm: React.FC = () => {
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
    <div className="w-full border-crred border-b py-6">
      <h3 className="text-crred md:text-2xl text-start">Forma parte de nuestra comunidad</h3>
      <form onSubmit={handleSubmit} className='flex flex-row items-center space-x-3 mt-4 w-full'>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Tu Correo Electrónico"
          className="border border-crred p-1 md:p-2 rounded text-crred placeholder:text-crred-50 w-full placeholder:text-xs/3 md:placeholder:text-base "
          required
        />
        <BasicButton
            variant='bg-crred'
            sizey='small'
            sizex='small'
          className='rounded-md border-crred border border-solid text-nowrap text-xs/3 md:text-base'
        >
          {loading ? 'Subscribiendo...' : 'Suscribirme'}
        </BasicButton>
      </form>
      {error && <p className="text-crred-light mt-2">{error}</p>}
      {success && <p className="text-crred-light mt-2">Pronto sabrás de nosotros, ¡gracias!</p>}
    </div>
  );
};

export default MailingListForm;

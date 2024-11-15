import React, { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import BasicButton from "@/components/Buttons/BasicButton";

interface SettingsFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  birthday: string;
  setBirthday: React.Dispatch<React.SetStateAction<string>>;
  handleSaveSettings: () => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  birthday,
  setBirthday,
  handleSaveSettings,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es obligatorio.';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio.';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'El teléfono debe tener 10 dígitos.';
    }

    if (!birthday.trim()) {
      newErrors.birthday = 'La fecha de nacimiento es obligatoria.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSave = () => {
    if (validate()) {
      handleSaveSettings();
      setSuccessMessage('Tus cambios han sido guardados exitosamente.');
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  };

  return (
    <div className='flex flex-col items-start justify-start w-full'>
      <h2 className='text-3xl font-thin mb-6 text-crred'>Información Personal</h2>
      <div className='bg-white p-8 rounded-lg shadow-md w-full '>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Name Field */}
          <div className='flex flex-col'>
            <label htmlFor='name' className='text-gray-800 font-semibold mb-2'>
              Nombre <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:border-crred`}
            />
            {errors.name && (
              <span className='text-red-500 text-sm mt-1'>{errors.name}</span>
            )}
          </div>
          {/* Email Field */}
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-gray-800 font-semibold mb-2'>
              Correo Electrónico <span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:border-crred`}
            />
            {errors.email && (
              <span className='text-red-500 text-sm mt-1'>{errors.email}</span>
            )}
          </div>
          {/* Phone Field */}
          <div className='flex flex-col'>
            <label htmlFor='phone' className='text-gray-800 font-semibold mb-2'>
              Teléfono <span className='text-red-500'>*</span>
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full p-3 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:border-crred`}
            />
            {errors.phone && (
              <span className='text-red-500 text-sm mt-1'>{errors.phone}</span>
            )}
          </div>
          {/* Birthday Field */}
          <div className='flex flex-col'>
            <label htmlFor='birthday' className='text-gray-800 font-semibold mb-2'>
              Fecha de Nacimiento <span className='text-red-500'>*</span>
            </label>
            <input
              type='date'
              id='birthday'
              name='birthday'
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className={`w-full p-3 border ${
                errors.birthday ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:border-crred`}
            />
            {errors.birthday && (
              <span className='text-red-500 text-sm mt-1'>{errors.birthday}</span>
            )}
          </div>
        </div>
        <BasicButton
          onClick={onSave}
          variant='bg-crred'
          className='mt-8 bg-crred text-white py-3 px-8 rounded-md border border-crred hover:bg-white'
        >
          Guardar Cambios
        </BasicButton>
        {successMessage && (
          <div className='mt-6 flex items-center text-green-600'>
            <AiOutlineCheckCircle className='mr-2 text-xl' />
            <span className='font-medium'>{successMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsForm;

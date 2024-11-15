import React from 'react';
import { motion } from 'framer-motion';
import BasicButton from '@/components/Buttons/BasicButton';

interface LogoutConfirmationModalProps {
  handleLogout: () => void;
  closeModal: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  handleLogout,
  closeModal,
}) => {
  return (
    <motion.div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className='bg-white p-6 rounded-lg shadow-lg'
        initial={{ y: '-50%', opacity: 0 }}
        animate={{ y: '0', opacity: 1 }}
        exit={{ y: '-50%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <h3 className='text-xl font-bold mb-4 text-gray-800'>
          Confirmar Cierre de Sesión
        </h3>
        <p className='text-gray-700 mb-6'>¿Realmente deseas cerrar sesión?</p>
        <div className='flex justify-end space-x-4'>
            <BasicButton
                onClick={closeModal}
                variant='bg-gray-300'
               className='rounded-md mt-4  '
            >
                Cancelar
            </BasicButton>
            <BasicButton
                onClick={handleLogout}
                variant='bg-crred'
                className='mt-4 bg-crred text-white rounded-md border border-crred hover:bg-white'
                >
                Cerrar Sesión
            </BasicButton>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default LogoutConfirmationModal;

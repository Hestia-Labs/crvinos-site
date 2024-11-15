import React from 'react';
import { motion } from 'framer-motion';
import { getStatusBadge } from '@/utils/statusBadge';

interface OrderDetailsModalProps {
  order: any;
  closeModal: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, closeModal }) => {
  return (
    <motion.div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className='bg-white p-6 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto max-h-full'
        initial={{ y: '-50%', opacity: 0 }}
        animate={{ y: '0', opacity: 1 }}
        exit={{ y: '-50%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-bold text-gray-800'>
            Detalles del Pedido #{order.id}
          </h3>
          <button
            onClick={closeModal}
            className='text-gray-600 hover:text-gray-800'
          >
            ✕
          </button>
        </div>
        <p className='text-gray-600 mb-2'>
          Fecha: <span className='font-medium'>{order.date}</span>
        </p>
        <p className='text-gray-600 mb-2'>
          Estado: {getStatusBadge(order.status)}
        </p>
        {order.trackingNumber && (
          <p className='text-gray-600 mb-2'>
            Número de Seguimiento:{' '}
            <span className='font-medium'>{order.trackingNumber}</span>
          </p>
        )}
        <h4 className='text-lg font-semibold mt-4 mb-2 text-gray-800'>Artículos:</h4>
        <ul className='mb-4'>
          {order.items.map((item: any, index: number) => (
            <li
              key={index}
              className='flex justify-between text-gray-700 mb-2'
            >
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>{item.price}</span>
            </li>
          ))}
        </ul>
        <div className='border-t pt-4'>
          <div className='flex justify-between text-gray-700 mb-2'>
            <span>Subtotal:</span>
            <span>{order.subtotal}</span>
          </div>
          <div className='flex justify-between text-gray-700 mb-2'>
            <span>Impuestos:</span>
            <span>{order.tax}</span>
          </div>
          <div className='flex justify-between text-gray-800 font-semibold'>
            <span>Total:</span>
            <span>{order.total}</span>
          </div>
        </div>
        <div className='mt-6 flex justify-end'>
          <button
            onClick={closeModal}
            className='py-2 px-4 bg-crred text-white rounded-md hover:bg-red-600 transition-colors duration-200'
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderDetailsModal;

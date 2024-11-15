import React from 'react';
import BasicButton from '@/components/Buttons/BasicButton';
import { getStatusBadge } from '@/utils/statusBadge';

interface OrderHistoryProps {
  orders: any[];
  isLoading: boolean;
  setSelectedOrder: React.Dispatch<React.SetStateAction<any>>;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, isLoading, setSelectedOrder }) => {
  return (
    <div className='flex flex-col items-start justify-start w-full'>
      <h2 className='text-3xl font-thin mb-6 text-crred'>Historial de Compras</h2>
      {isLoading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-8'>
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className='p-4 border border-gray-300 rounded-md animate-pulse '
            >
              <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
              <div className='h-3 bg-gray-300 rounded w-1/2 mb-2'></div>
              <div className='h-3 bg-gray-300 rounded w-1/3 mb-2'></div>
              <div className='h-3 bg-gray-300 rounded w-1/4'></div>
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-8'>
          {orders.map((order) => (
            <div
              key={order.id}
              className='p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white/90'
            >
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Pedido #{order.id}
                </h3>
                {getStatusBadge(order.status)}
              </div>
              <p className='text-gray-600 mb-2'>
                Fecha: <span className='font-medium'>{order.date}</span>
              </p>
              <p className='text-gray-600 mb-2'>
                Total: <span className='font-medium'>{order.total}</span>
              </p>
              <BasicButton
                variant='transparent'
                onClick={() => setSelectedOrder(order)}
                className='mt-4 w-full border border-crred hover:bg-crred-90 py-1 rounded-md'
              >
                Ver detalles
              </BasicButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

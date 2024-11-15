import React from 'react';

export const getStatusBadge = (status: string) => {
  let colorClass = '';
  switch (status) {
    case 'Entregado':
      colorClass = 'bg-green-100 text-green-800';
      break;
    case 'En camino':
      colorClass = 'bg-blue-100 text-blue-800';
      break;
    case 'Procesando':
        colorClass = 'bg-gray-200';
      break;
    case 'Cancelado':
      colorClass = 'bg-red-100 text-red-800';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800';
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
      {status}
    </span>
  );
};

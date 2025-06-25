import React from 'react';
import { motion } from 'framer-motion';
import { FaSearchMinus, FaRedo } from 'react-icons/fa';

interface EmptyStateProps {
  clearFilters: () => void;
  activeCategory: string | 'all';
}

const EmptyState: React.FC<EmptyStateProps> = ({ clearFilters, activeCategory }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full py-16 px-8 flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100"
    >
      <div className="bg-gray-100 p-5 rounded-full mb-6">
        <FaSearchMinus className="w-10 h-10 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        No se encontraron experiencias
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {activeCategory !== 'all' 
          ? `No hay experiencias disponibles en la categoría "${activeCategory}" con los filtros actuales.` 
          : 'No hay experiencias que coincidan con los filtros seleccionados.'}
      </p>
      
      <button
        onClick={clearFilters}
        className="flex items-center gap-2 bg-crred text-white px-6 py-3 rounded-lg hover:bg-crred/90 transition-colors shadow-sm"
      >
        <FaRedo className="w-4 h-4" />
        <span>Limpiar filtros</span>
      </button>
    </motion.div>
  );
};

export default EmptyState; 
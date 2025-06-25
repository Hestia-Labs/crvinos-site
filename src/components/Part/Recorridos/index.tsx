'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Recorrido } from '@/data/recorridos';
import { motion, AnimatePresence } from 'framer-motion';
import BasicButton from '@/components/Buttons/BasicButton';
import Icon from '@/components/Icons';
import Image from 'next/image';
import Link from 'next/link';
import TransitionLink from '@/components/NewTransitionLink';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Reveal from '@/components/Effects/reveal';

interface RecorridosClientProps {
  recorridos: Recorrido[];
  comingSoon?: boolean;
}

export default function RecorridosClient({ recorridos, comingSoon = false }: RecorridosClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Filter states
  const [showAll, setShowAll] = useState(false);
  const [displayRecorridos, setDisplayRecorridos] = useState<Recorrido[]>([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>('');
  const [durationFilter, setDurationFilter] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calculate min and max prices for UI display
  const priceStats = useMemo(() => {
    if (recorridos.length === 0) return { min: 0, max: 0 };
    
    const prices = recorridos.map(r => r.prices.adult);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [recorridos]);
  
  // Initialize filters from URL
  useEffect(() => {
    const priceRange = searchParams.get('priceRange') || '';
    const duration = searchParams.get('duration') || '';
    const query = searchParams.get('q') || '';
    
    setPriceRangeFilter(priceRange);
    setDurationFilter(duration);
    setSearchQuery(query);
  }, [searchParams]);
  
  // Apply filters
  useEffect(() => {
    let filtered = [...recorridos];
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(query) || 
        r.description.toLowerCase().includes(query) ||
        r.includes.some(item => item.toLowerCase().includes(query))
      );
    }
    
    // Apply price range filter
    if (priceRangeFilter) {
      if (priceRangeFilter === 'under500') {
        filtered = filtered.filter(r => r.prices.adult < 500);
      } else if (priceRangeFilter === '500to1000') {
        filtered = filtered.filter(r => r.prices.adult >= 500 && r.prices.adult <= 1000);
      } else if (priceRangeFilter === 'over1000') {
        filtered = filtered.filter(r => r.prices.adult > 1000);
      }
    }
    
    // Apply duration filter
    if (durationFilter) {
      if (durationFilter === 'short') {
        filtered = filtered.filter(r => r.duration.includes('45 min'));
      } else if (durationFilter === 'medium') {
        filtered = filtered.filter(r => r.duration.includes('1 hr') && !r.duration.includes('2 hrs'));
      } else if (durationFilter === 'long') {
        filtered = filtered.filter(r => r.duration.includes('2 hrs'));
      }
    }
    
    // Apply show all or show first 3
    setDisplayRecorridos(showAll ? filtered : filtered.slice(0, 3));
  }, [recorridos, priceRangeFilter, durationFilter, searchQuery, showAll]);
  
  // Update URL with filters
  const updateFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    
    if (priceRangeFilter) {
      params.set('priceRange', priceRangeFilter);
    } else {
      params.delete('priceRange');
    }
    
    if (durationFilter) {
      params.set('duration', durationFilter);
    } else {
      params.delete('duration');
    }
    
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  }, [priceRangeFilter, durationFilter, searchQuery, pathname, router, searchParams]);
  
  // Clear all filters
  const clearFilters = () => {
    setPriceRangeFilter('');
    setDurationFilter('');
    setSearchQuery('');
    
    router.push(pathname);
  };
  
  // Apply filters when changed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateFilters();
    }
  }, [priceRangeFilter, durationFilter, searchQuery, updateFilters]);

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (comingSoon) {
    return (
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-crred mb-8"
            >
              Recorridos y Tours
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 md:p-12 mb-10"
            >
              <div className="flex flex-col items-center">
                <div className="mb-8">
                  <Icon name="VineLeaf" className="h-20 w-20 text-crred opacity-80" />
                </div>
                
                <h2 className="text-2xl md:text-3xl text-crred font-medium mb-6">
                  Próximamente
                </h2>
                
                <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                  Estamos preparando una experiencia única de recorridos por nuestros viñedos y bodega. 
                  Pronto podrás reservar tu visita para conocer de primera mano nuestro proceso de 
                  elaboración de vinos y disfrutar de catas exclusivas.
                </p>
                
                <BasicButton
                  link="/contact"
                  variant="transparent"
                  className="border border-crred"
                >
                  Contactarnos para más información
                </BasicButton>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm text-gray-500 italic"
            >
              Nos encontramos trabajando para brindarte la mejor experiencia enoturística
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  const EmptyState = () => (
    <div className="col-span-2 py-12 text-center">
      <div className="max-w-md mx-auto">
        <Icon name="VineLeaf" className="h-16 w-16 text-crred opacity-60 mx-auto mb-6" />
        <h3 className="text-xl font-medium text-gray-700 mb-3">No se encontraron recorridos</h3>
        <p className="text-gray-600 mb-6">No hay recorridos que coincidan con los filtros seleccionados.</p>
        <button 
          onClick={clearFilters}
          className="text-crred hover:text-crred/80 transition-colors font-medium"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );

  return (
    <div className="py-12 pb-24">
      <div className="container mx-auto px-4 md:px-10 max-w-7xl">
        {/* Filters Section */}
        <Reveal>
          <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center">
                <h2 className="text-lg font-medium text-gray-700">Filtrar Recorridos</h2>
                <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {displayRecorridos.length} resultados
                </span>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-auto md:min-w-[260px]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input 
                  type="search" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-crred focus:border-crred"
                  placeholder="Buscar recorridos..."
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Duration Filter */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2.5">Duración</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="duration" 
                      className="form-radio text-crred focus:ring-crred h-4 w-4"
                      checked={durationFilter === ''}
                      onChange={() => setDurationFilter('')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Todas</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="duration" 
                      className="form-radio text-crred focus:ring-crred h-4 w-4"
                      checked={durationFilter === 'short'}
                      onChange={() => setDurationFilter('short')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Corta (45 min)</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="duration" 
                      className="form-radio text-crred focus:ring-crred h-4 w-4"
                      checked={durationFilter === 'medium'}
                      onChange={() => setDurationFilter('medium')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Media (1 - 2 hrs)</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="duration" 
                      className="form-radio text-crred focus:ring-crred h-4 w-4"
                      checked={durationFilter === 'long'}
                      onChange={() => setDurationFilter('long')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Larga (2+ hrs)</span>
                  </label>
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2.5">Rango de Precio</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="priceRange" 
                      className="form-radio text-crred focus:ring-crred h-4 w-4"
                      checked={priceRangeFilter === ''}
                      onChange={() => setPriceRangeFilter('')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Todos los precios</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="priceRange" 
                      className="form-radio text-crred focus:ring-crred h-4 w-4"
                      checked={priceRangeFilter === 'under500'}
                      onChange={() => setPriceRangeFilter('under500')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Menos de {formatPrice(500)}</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="priceRange" 
                      className="form-radio text-crred focus:ring-crred h-4 w-4"
                      checked={priceRangeFilter === '500to1000'}
                      onChange={() => setPriceRangeFilter('500to1000')}
                    />
                    <span className="ml-2 text-sm text-gray-700">{formatPrice(500)} - {formatPrice(1000)}</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="priceRange" 
                      className="form-radio text-crred focus:ring-crred h-4 w-4"
                      checked={priceRangeFilter === 'over1000'}
                      onChange={() => setPriceRangeFilter('over1000')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Más de {formatPrice(1000)}</span>
                  </label>
                </div>
              </div>
              
              {/* Price Stats */}
              <div className="p-3 bg-gray-50 rounded-lg col-span-1 lg:col-span-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2.5">Información de Precios</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Precio mínimo</p>
                    <p className="text-lg font-medium text-crred">{formatPrice(priceStats.min)}</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Precio máximo</p>
                    <p className="text-lg font-medium text-crred">{formatPrice(priceStats.max)}</p>
                  </div>
                </div>
                {(priceRangeFilter || durationFilter || searchQuery) && (
                  <div className="mt-4">
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-crred hover:text-crred/80 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      Limpiar todos los filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Applied Filters */}
        {(priceRangeFilter || durationFilter || searchQuery) && (
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 mb-6 pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Filtros aplicados:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Búsqueda: &quot;{searchQuery}&quot;
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </span>
              )}
              
              {priceRangeFilter && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-crred/10 text-crred">
                  Precio: {
                    priceRangeFilter === 'under500' ? 'Menos de $500' : 
                    priceRangeFilter === '500to1000' ? '$500 - $1000' : 
                    'Más de $1000'
                  }
                  <button 
                    onClick={() => setPriceRangeFilter('')}
                    className="ml-1 text-crred/70 hover:text-crred"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </span>
              )}
              
              {durationFilter && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-crred/10 text-crred">
                  Duración: {
                    durationFilter === 'short' ? 'Corta (45 min)' : 
                    durationFilter === 'medium' ? 'Media (1 - 2 hrs)' : 
                    'Larga (2+ hrs)'
                  }
                  <button 
                    onClick={() => setDurationFilter('')}
                    className="ml-1 text-crred/70 hover:text-crred"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </span>
              )}
            </div>
          </Reveal>
        )}

        {/* Recorridos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          <AnimatePresence>
            {displayRecorridos.length > 0 ? (
              displayRecorridos.map((recorrido, index) => (
                <Reveal key={recorrido.id}>
                  <RecorridoCard 
                    recorrido={recorrido} 
                    index={index} 
                  />
                </Reveal>
              ))
            ) : (
              <EmptyState />
            )}
          </AnimatePresence>
        </div>
        
        {recorridos.length > 3 && displayRecorridos.length < recorridos.length && !showAll && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center text-crred hover:text-crred/80 transition-colors py-2 px-4 border border-crred rounded-md"
            >
              <span className="mr-2">Ver más recorridos</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        )}
        
        <Reveal>
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-md rounded-xl p-8">
              <h3 className="text-xl font-medium text-crred mb-4">¿Necesitas información personalizada?</h3>
              <p className="text-gray-700 mb-6">
                Si quieres más detalles sobre nuestros recorridos, reservaciones para grupos grandes, 
                o cualquier consulta específica, nuestro equipo está listo para ayudarte.
              </p>
              <BasicButton
                link="/contact"
                variant="transparent"
                className="border border-crred mx-auto"
              >
                Contáctanos
              </BasicButton>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function RecorridoCard({ recorrido, index }: { recorrido: Recorrido; index: number }) {
  const imagePath = recorrido.image || '/img/placeholder-tour.jpg';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full group"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imagePath}
          alt={recorrido.title}
          width={600}
          height={400}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h2 className="text-2xl text-white font-semibold mb-1">{recorrido.title}</h2>
          <div className="flex items-center text-white/90 space-x-3">
            <span className="flex items-center text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {recorrido.duration}
            </span>
            <span className="flex items-center text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Desde ${recorrido.prices.adult}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <p className="text-gray-700 mb-6 italic line-clamp-2">
          {recorrido.description}
        </p>
      
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1 text-crred" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Incluye
          </h3>
          <ul className="space-y-1">
            {recorrido.includes.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start text-sm">
                <span className="text-crred mr-2 mt-1">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
            {recorrido.includes.length > 3 && (
              <li className="text-sm text-gray-500 pl-4 italic">Y {recorrido.includes.length - 3} elemento(s) más</li>
            )}
          </ul>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center">
              <svg className="w-4 h-4 mr-1 text-crred" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Precios
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs text-gray-500">Adulto</p>
                <p className="text-base font-semibold text-crred">${recorrido.prices.adult}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs text-gray-500">Niño</p>
                <p className="text-base font-semibold text-crred">${recorrido.prices.child}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center">
              <svg className="w-4 h-4 mr-1 text-crred" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Horarios
            </h3>
            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded h-full flex items-center">
              {recorrido.schedule.length > 50 ? 
                `${recorrido.schedule.substring(0, 50)}...` : 
                recorrido.schedule
              }
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6 pt-2 border-t border-gray-100">
        <TransitionLink
          href={`/enotourism/tours/${recorrido.slug}`}
          className="inline-block w-full"
        >
          <span className="relative flex items-center justify-center bg-crred hover:bg-crred/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 w-full">
            Ver Detalles y Reservar
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </TransitionLink>
      </div>
    </motion.div>
  );
} 
export interface Recorrido {
  id: string;
  title: string;
  slug: string;
  includes: string[];
  prices: {
    adult: number;
    child: number;
  };
  schedule: string;
  duration: string;
  image?: string;
  description: string;
  comingSoon?: boolean;
}

export const recorridos: Recorrido[] = [
  {
    id: '1',
    title: 'TOUR CR',
    slug: 'tour-cr',
    includes: [
      'Recorrido guiado por el viñedo y la vinícola',
      '1 Degustación de vino',
      '1 amenidad para niños',
    ],
    prices: {
      adult: 300,
      child: 180
    },
    schedule: 'Miércoles a domingo 12:30, 14:30, 16:30 hrs',
    duration: '45 min.',
    image: '/img/farm.jpg',
    description: 'Explora nuestro viñedo, conoce los procesos de vinificación en la bodega y termina con una degustación de vino.',
  },
  {
    id: '2',
    title: 'TOUR CR + CATA DE VINOS',
    slug: 'tour-cr-cata',
    includes: [
      'Recorrido guiado por el viñedo y la vinícola',
      '3 vinos con cata guiada por nuestro Sommelier',
      '1 tabla individual de quesos y carnes frías',
      '1 souvenir',
      '1 bebida + bocadillos para niños',
    ],
    prices: {
      adult: 500,
      child: 250
    },
    schedule: 'Miércoles a domingo 12:30, 14:30, 16:30 hrs',
    duration: '1 hr. 30 min.',
    image: '/img/farm.jpg',
    description: 'Recorrido por el viñedo, la vinícola y cata de 3 vinos queretanos con maridaje de quesos de la región y carnes frías.',
  },
  {
    id: '3',
    title: 'TOUR PREMIUM',
    slug: 'tour-premium',
    includes: [
      'Recorrido guiado por el viñedo y la vinícola',
      '5 vinos premium con cata guiada por nuestro Sommelier',
      '1 tabla individual premium de quesos y carnes frías para maridar',
      '1 souvenir',
      '2 bebidas + bocadillos para niños + artículos para dibujar',
    ],
    prices: {
      adult: 1000,
      child: 350
    },
    schedule: 'Miércoles a domingo de 10:00 a 18:00 pm bajo reservación',
    duration: '1 hr. 45 min.',
    image: '/img/farm.jpg',
    description: 'Recorrido por el viñedo, la vinícola y cata de 5 vinos de nuestra línea premium con maridaje de quesos premium y carnes frías.',
  },
  {
    id: '4',
    title: 'TOUR VIP',
    slug: 'tour-vip',
    includes: [
      'Recorrido guiado por el viñedo y la vinícola',
      'Cata de vinos de tanques y barricas guiado por el sommelier',
      '1 maridaje de tapas y bocadillos gourmet',
      '1 Copa grabada',
      '2 bebidas + bocadillos premium para niños + artículos para dibujar',
    ],
    prices: {
      adult: 2000,
      child: 500
    },
    schedule: 'Miércoles a domingo de 10:00 a 18:00 pm bajo reservación y disponibilidad de vinos',
    duration: '2 hrs.',
    image: '/img/farm.jpg',
    description: 'Recorrido por el viñedo, la vinícola y cata de vinos de tanque y barricas, maridaje de tapas y bocadillos gourmet.',
  },
];

// Mock function to simulate fetching from Sanity
export async function getRecorridos(options?: { comingSoon?: boolean; filters?: Record<string, any> }): Promise<Recorrido[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredRecorridos = [...recorridos];
  
  // Apply filters if provided
  if (options?.filters) {
    const { priceRange, duration } = options.filters;
    
    // Filter by price range
    if (priceRange) {
      if (priceRange === 'under500') {
        filteredRecorridos = filteredRecorridos.filter(r => r.prices.adult < 500);
      } else if (priceRange === '500to1000') {
        filteredRecorridos = filteredRecorridos.filter(r => r.prices.adult >= 500 && r.prices.adult <= 1000);
      } else if (priceRange === 'over1000') {
        filteredRecorridos = filteredRecorridos.filter(r => r.prices.adult > 1000);
      }
    }
    
    // Filter by duration
    if (duration) {
      if (duration === 'short') {
        filteredRecorridos = filteredRecorridos.filter(r => r.duration.includes('45 min'));
      } else if (duration === 'medium') {
        filteredRecorridos = filteredRecorridos.filter(r => 
          r.duration.includes('1 hr') && !r.duration.includes('2 hrs')
        );
      } else if (duration === 'long') {
        filteredRecorridos = filteredRecorridos.filter(r => r.duration.includes('2 hrs'));
      }
    }
  }
  
  if (options?.comingSoon) {
    return filteredRecorridos.map(recorrido => ({
      ...recorrido,
      comingSoon: true
    }));
  }
  
  return filteredRecorridos;
}

export async function getRecorridoBySlug(slug: string): Promise<Recorrido | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const found = recorridos.find(r => r.slug === slug);
  return found || null;
} 
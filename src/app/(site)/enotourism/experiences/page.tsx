import { Suspense } from 'react';
import { getExperiences, getExperienceCategories, getTotalExperiencesCount } from '@/app/actions/getExperiences';
import Experiences from '@/components/Part/Experiences';
import Loading from '@/components/LoadingUI';
import { ExperienceShort } from '@/types/Experience';

import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

const siteUrl = process.env.SITE_URL || 'https://crvinos-site.pages.dev';

export const metadata: Metadata = {
  title: "Experiencias y Recorridos Vinícolas en Querétaro | CR Vinos MX",
  description: "Descubre nuestros recorridos y experiencias vinícolas en CR Vinos: visitas guiadas por viñedos, catas profesionales, talleres de maridaje y eventos especiales. Conoce todos los secretos de la vinicultura mexicana en Querétaro.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['recorridos vinícolas Querétaro', 'experiencias vinícolas Querétaro', 'tours de viñedos México', 'visitas a viñedos México', 'catas de vino guiadas', 'recorrido por bodega de vino', 'tour viñedo México', 'degustación vinos mexicanos', 'talleres de vino', 'experiencia enológica', 'enoturismo Querétaro', 'actividades en viñedos', 'turismo vinícola México', 'cata y maridaje', 'tour de vinos Tequisquiapan', 'experiencias CR Vinos', 'recorridos CR Vinos', 'visitar bodega México', 'tour enológico', 'ruta del vino mexicano', 'paquetes enoturísticos', 'cata profesional de vinos', 'actividades turísticas Querétaro', 'eventos en viñedos', 'turismo del vino', 'conoce viñedos mexicanos', 'visita guiada bodega', 'workshop de vinos México'],
  openGraph: {
    title: "Experiencias y Recorridos Vinícolas en Querétaro | CR Vinos MX",
    description: "Descubre nuestros recorridos y experiencias vinícolas en CR Vinos: visitas guiadas por viñedos, catas profesionales, talleres de maridaje y eventos especiales. Conoce todos los secretos de la vinicultura mexicana en Querétaro.",
    url: `${siteUrl}/experiences`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/crvinosmxLogo.jpg`,
        width: 300,
        height: 225,
        alt: "Recorridos y Experiencias Vinícolas CR Vinos MX",
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experiencias y Recorridos Vinícolas en Querétaro | CR Vinos MX',
    description: 'Descubre nuestros recorridos y experiencias vinícolas en CR Vinos: visitas guiadas por viñedos, catas profesionales y talleres de maridaje. Conoce todos los secretos de la vinicultura mexicana en Querétaro.',
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/experiences`,
    languages: {
      'es-MX': `${siteUrl}/experiences`,
    },
  },
  appleWebApp: {
    title: 'CR Vinos MX - Experiencias y Recorridos',
    statusBarStyle: 'black-translucent',
  },
  robots: {
    index: true, 
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function EnotourismExperiences({
  searchParams
}: {
  searchParams: { 
    categoria?: string; 
    busqueda?: string; 
    orden?: 'default' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc';
    disponibles?: string;
  }
}) {
   // Extract search parameters from URL using Spanish parameter names
   const category = searchParams.categoria || 'all';
   const query = searchParams.busqueda || '';
   const sortOrder = searchParams.orden || 'default';
 
   // Fetch experiences using server action
   const categories = await getExperienceCategories();
   const categoryNames = categories.map(cat => cat.title);
   
   // Get experiences filtered by parameters
   const experiences = await getExperiences({
     category: category !== 'all' ? category : undefined,
     shortVersion: true
   }) as ExperienceShort[];
   
   // Get all experiences for filter UI
   const allExperiences = await getExperiences({
     shortVersion: true
   }) as ExperienceShort[];
   
   // Get the total count of all experiences (regardless of filters)
   const totalExperiencesCount = await getTotalExperiencesCount();
   
   // Group by category for filter UI
   const experiencesByCategory: Record<string, ExperienceShort[]> = {};
   categoryNames.forEach(cat => {
     experiencesByCategory[cat] = allExperiences.filter(exp => exp.category === cat);
   });

  return (
    <Suspense fallback={<Loading />}>
      <div className='relative w-full -z-10 opacity-60'>
        <div 
          className='absolute h-80 w-full md:h-160 opacity-30'
          style={{ 
            backgroundImage: 'url(/img/icons/ContactVines.svg)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
      <Navbar clearBg redLogo red relative />
      <div className="min-h-screen flex flex-col w-full items-center justify-center px-8 md:px-12 lg:px-16 xl:px-20">
      
      {/* Title and separator section */}
      <div className="border-b-2 border-crred w-full max-w-7xl px-4 md:px-10 pt-24 pb-8  md:pb-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl  text-crred font-light tracking-wide mb-4">
          Recorridos y Experiencias
        </h1>
        <div className="h-0.5 w-48 md:w-64 bg-crred/70 mx-auto my-6"></div>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Conoce nuestros viñedos a través de recorridos guiados diseñados para cada tipo de visitante, 
          desde el tour básico hasta experiencias exclusivas con catas premium y maridajes.
        </p>
      </div>
        
        <Experiences
          experiencesByCategory={experiencesByCategory}
          allExperiences={experiences}
          categories={categoryNames}
          initialCategory={category}
          initialQuery={query}
          totalExperiencesCount={totalExperiencesCount}
        />
      </div>
    </Suspense>
  );
} 


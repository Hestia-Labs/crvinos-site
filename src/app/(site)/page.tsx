import Hero from '@/components/Part/Landing/Hero';
import Instagram from '@/components/Part/Landing/Instagram';
import EnotourismSection from '@/components/Part/Landing/Events';
import Catalog from '@/components/Part/Landing/Catalog';
import Navbar from '@/components/Navbar';
import Icon from '@/components/Icons';
import type { Metadata } from "next";
import Blog from '@/components/Part/Landing/Blog';
import { getDistinctCollectionWines } from '@/app/actions/getWines';
import { getBlogs } from '@/app/actions/getBlogs';
import { WineShort } from '@/types/Wine';
import { BlogPostShort } from '@/types/Blog';
import { getInstagramPosts } from '@/app/actions/getInstagram';
import { InstagramPost } from '@/types/Instragram';
import { getImagesByLocationIds } from '@/app/actions/getImagebyLocation';
import ScrollIndicator from '@/components/ScrollIndicator';
import { headers } from 'next/headers';

export const runtime = 'edge';

export const metadata: Metadata = {
  applicationName: "CR Vinos MX",
  title: "Inicio | CR Vinos MX | Vinos Mexicanos de la más alta calidad",
  description: "CR Vinos es una empresa 100% mexicana que ofrece una exclusiva selección de vinos elaborados en Querétaro. Descubre nuestros vinos premiados, experiencias de enoturismo, y la auténtica cultura vinícola mexicana.",
  keywords: ["vinos mexicanos", "CR Vinos", "bodega Querétaro", "vinos alta calidad México", "vinos premium mexicanos", "vino tinto mexicano", "vino blanco mexicano", "vino rosado mexicano", "cata de vinos Querétaro", "enoturismo México", "viñedos en Querétaro", "maridaje con vinos mexicanos", "vinos artesanales", "Tours de vino en México", "Cartinto House", "restaurante viñedo", "degustación de vinos", "cultura vinícola mexicana", "sommelier mexicano", "bodega boutique", "vino orgánico México", "productor de vino mexicano", "experiencia enológica", "eventos en viñedo", "vinicultura mexicana"],
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
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

// Helper function to detect search engine bots
function isBot(userAgent: string): boolean {
  if (!userAgent) return false;
  
  const botPatterns = [
    'googlebot', 'bingbot', 'yandex', 'baiduspider', 'facebookexternalhit',
    'twitterbot', 'rogerbot', 'linkedinbot', 'embedly', 'quora link preview',
    'showyoubot', 'outbrain', 'pinterest', 'slackbot', 'vkShare', 'W3C_Validator',
    'crawler', 'spider', 'bot', 'lighthouse', 'Chrome-Lighthouse'
  ];
  
  const lowercasedUA = userAgent.toLowerCase();
  return botPatterns.some(pattern => lowercasedUA.includes(pattern));
}

// Helper function to safely fetch data with error handling
async function safeDataFetch<T>(
  fetchFn: () => Promise<T>,
  fallback: T,
  errorMessage: string,
  isForBot: boolean
): Promise<T> {
  // For bots, use a smaller timeout to prevent hanging
  const timeout = isForBot ? 3000 : 10000;
  
  try {
    // Create a promise that rejects after the timeout
    const timeoutPromise = new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(`Timeout after ${timeout}ms`)), timeout);
    });
    
    // Race the fetch against the timeout
    return await Promise.race([
      fetchFn(),
      timeoutPromise
    ]);
  } catch (error) {
    console.error(`${errorMessage}`, error);
    return fallback;
  }
}

export default async function Home() {
  // Check if the request is from a bot
  let isFromBot = false;
  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    isFromBot = isBot(userAgent);
  } catch (error) {
    console.error('Error detecting bot:', error);
  }
  
  // Safely fetch all data with proper error handling and fallbacks
  const wines = await safeDataFetch<WineShort[]>(
    () => getDistinctCollectionWines(),
    [],
    'Error fetching wines:',
    isFromBot
  );
  
  const blogPosts = await safeDataFetch<BlogPostShort[]>(
    () => getBlogs({ shortVersion: true }),
    [],
    'Error fetching blog posts:',
    isFromBot
  );
  
  const instagramPosts = await safeDataFetch<InstagramPost[]>(
    () => getInstagramPosts({ count: 5 }),
    [],
    'Error fetching Instagram posts:',
    isFromBot
  );
  
  const enotourismImages = await safeDataFetch<any[]>(
    () => getImagesByLocationIds(['rest-banner', 'eno-banner', 'event-banner']),
    [],
    'Error fetching enotourism images:',
    isFromBot
  );

  // For bots, provide a simplified version to ensure proper indexing
  if (isFromBot) {
    return (
      <div className="relative min-h-screen w-full bg-transparent overflow-x-hidden">
        <Navbar darkenBg red={false} />
        <div id="hero">
          <Hero />
        </div>
        <div className='relative flex flex-col justify-center items-center w-full px-8 sm:px-10 md:px-20 space-y-3 mt-5'>
          <div className='w-full' id="catalog">
            <Catalog wines={wines} />
          </div>
          <div className='w-full' id="blog">
            <Blog serverPosts={blogPosts} />
          </div>
          <div className='w-full' id="events">
            <EnotourismSection images={enotourismImages} />
          </div>
          <div className='w-full' id="instagram">
            <Instagram photos={instagramPosts} />
          </div>
        </div>
      </div>
    );
  }

  // For regular users, provide the full experience
  return (
    <div className="relative min-h-screen w-full bg-transparent no-scrollbars overflow-x-hidden">
      <Navbar darkenBg red={false} />
      <ScrollIndicator />
      <div id="hero">
        <Hero />
      </div>
      <div className='overflow-clip relative flex flex-col justify-center items-center w-full px-8 sm:px-10 md:px-20 space-y-3 mt-5'>
        <div className='w-full' id="catalog">
          <Catalog wines={wines} />
        </div>
        <div className='w-full' id="blog">
          <Blog serverPosts={blogPosts} />
        </div>
        <div className='w-full' id="events">
          <EnotourismSection images={enotourismImages} />
        </div>
        <div className='w-full' id="instagram">
          <Instagram photos={instagramPosts} />
        </div>
        <Icon name="RightGrapes" className="-z-10 absolute -right-14 top-100 md:top-10 h-80 w-80 md:h-160 md:w-160 opacity-90" />
        <Icon name="Vines" className="-z-10 absolute -left-14 bottom-1/3 md:bottom-1/4 h-80 w-80 md:h-144 md:w-144 opacity-90" />
      </div>
    </div>
  );
}

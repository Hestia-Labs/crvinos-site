import Hero from '@/components/Part/Landing/Hero';
import Instagram from '@/components/Part/Landing/Instagram';
import Events from '@/components/Part/Landing/Events';
import Catalog from '@/components/Part/Landing/Catalog';
import Navbar from '@/components/Navbar';
import Icon from '@/components/Icons';
import type { Metadata } from "next";
import Blog from '@/components/Part/Landing/Blog';
import { getDistinctCollectionWines } from '@/app/actions/getWines';
import { getBlogs } from '@/app/actions/getBlogs';
import { WineShort } from '@/types/Wine';
import { BlogPostShort } from '@/types/Blog';
import { getEvents } from '@/app/actions/getEvents';
import { EventShort } from '@/types/Event';
import { getInstagramPosts } from '@/app/actions/getInstagram';
import { InstagramPost } from '@/types/Instragram';

export const runtime = 'edge';

export const metadata: Metadata = {
  applicationName: "CR Vinos MX",
  title: "Inicio | CR Vinos MX | Vinos de la más alta calidad ",
  description: "CR vinos es una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
  keywords: "vinos, CRVinos, alta calidad, vinos mexicanos, empresa mexicana, vinos en mexico, vinos calidad, calidad, vino tinto, vino blanco, vino rosado, cata de vinos, maridaje, enoturismo, bodega, viñedo, sommelier, degustación",
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

export default async function Home() {
  let wines: WineShort[] = [];
  let blogPosts: BlogPostShort[] = [];
  let upcomingEvents: EventShort[] = [];
  let instagramPosts: InstagramPost[] = [];

  try {
    wines = await getDistinctCollectionWines();
  } catch (error) {
    console.error('Error fetching wines:', error);
  }

  try {
    blogPosts = await getBlogs({ shortVersion: true });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  try {
    const fetchedEvents = await getEvents({ shortVersion: true }) as EventShort[];
    const now = new Date();
    const validEvents = fetchedEvents.filter((e) => new Date(e.endDate) >= now);
    validEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    upcomingEvents = validEvents.slice(0, 3);
  } catch (error) {
    console.error('Error fetching events:', error);
  }

  try {
    instagramPosts = await getInstagramPosts({ count: 5 });
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
  }

  return (
    <div className="relative min-h-screen w-full bg-transparent no-scrollbars ">
      <Navbar darkenBg red={false} />
      <Hero />
      <div className='overflow-clip relative flex flex-col justify-center items-center w-full px-8 sm:px-10 md:px-20 space-y-3 mt-5'>
        <Catalog wines={wines} />
        <Blog serverPosts={blogPosts} />
        <Events serverEvents={upcomingEvents} />
        <Instagram photos={instagramPosts} />
        <Icon name="RightGrapes" className="-z-10 absolute -right-14 top-100 md:top-10 h-80 w-80 md:h-160 md:w-160 opacity-90" />
        <Icon name="Vines" className="-z-10 absolute -left-14 bottom-1/3 md:bottom-1/4 h-80 w-80 md:h-144 md:w-144 opacity-90" />
      </div>
    </div>
  );
}

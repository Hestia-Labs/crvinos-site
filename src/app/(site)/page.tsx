
import Video from 'next-video';
import crvinos from '../../videos/crvinos-bg.mp4';
import Hero from '@/components/Part/Landing/Hero';
import Instagram from '@/components/Part/Landing/Instagram';
import Events from '@/components/Part/Landing/Events';
import Catalog from '@/components/Part/Landing/Catalog';
import Navbar from '@/components/Navbar';


export const runtime = 'edge';


export default function Home() {
  return ( 
    <main className="relative min-h-screen w-full  no-scrollbars ">
      <Navbar />
      <Hero />
      <div className='flex flex-col justify-center items-center w-full px-20 space-y-3 mt-5'>
        <Catalog />
        <Events />
        <Instagram />
      </div>
    </main>
  );
}

import Video from 'next-video';
import crvinos from '../../videos/crvinos-bg.mp4';
import Hero from '@/components/Sections/Hero';
import Instagram from '@/components/Sections/Instagram';
import Events from '@/components/Sections/Events';


export const runtime = 'edge'


export default function Home() {
  return ( 
    <main className="relative min-h-screen w-full  no-scrollbars ">
      <Hero />
      <div className='flex flex-col justify-center items-center w-full px-20 space-y-3 mt-5'>
        <Events />
        <Instagram />
      </div>
    </main>
  );
}

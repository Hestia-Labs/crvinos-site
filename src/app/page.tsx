import Video from 'next-video';
import crvinos from '../../videos/crvinos-bg.mp4';
import Hero from '@/components/Sections/Hero';
import Instagram from '@/components/Sections/Instagram';


export const runtime = 'edge'


export default function Home() {
  return ( 
    <main className="relative min-h-screen w-full  no-scrollbars">
      <Hero />
      <Instagram />
    </main>
  );
}

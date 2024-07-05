import Video from 'next-video';
import crvinos from '../../videos/crvinos-bg.mp4';
import Hero from '@/components/Sections/Hero';


export const runtime = 'edge'


export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden no-scrollbars">
      <Video 
        src={crvinos} 
        autoPlay 
        loop 
        muted
        controls={false}  
        className="bg-video" 
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <Hero />
      </div>
    </main>
  );
}

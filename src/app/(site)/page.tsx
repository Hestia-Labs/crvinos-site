import Hero from '@/components/Part/Landing/Hero';
import Instagram from '@/components/Part/Landing/Instagram';
import Events from '@/components/Part/Landing/Events';
import Catalog from '@/components/Part/Landing/Catalog';
import Navbar from '@/components/Navbar';
import type { Metadata } from "next";


export const runtime = 'edge';


export const metadata: Metadata = {
  title: "CRVinosMX | Vinos de la más alta calidad | Home",
  description: "CRvinos es una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
  keywords: "vinos, CRVinos, alta calidad, vinos mexicanos, empresa mexicana, vinos en mexico, vinos calidad, calidad, vino tinto, vino blanco, vino rosado, cata de vinos, maridaje, enoturismo, bodega, viñedo, sommelier, degustación",
  metadataBase: new URL(`${process.env.SITE_URL}`),
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  openGraph: {
    title: "CRVinos | Vinos de la más alta calidad | Home",
    type: "website",
    url: `${process.env.SITE_URL}`,
    images: `${process.env.SITE_URL}/img/pagePreview.png`,
    description: "CRvinos es una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
  },
};

export default function Home() {
  return ( 
    <main className="relative min-h-screen w-full bg-transparent no-scrollbars ">
      <Navbar />
      <Hero />
      <div className='flex flex-col justify-center items-center w-full px-8 sm:px-10 md:px-20 space-y-3 mt-5'>
        <Catalog />
        <Events />
        {/* <Instagram /> */}
      </div>
    </main>
  );
}

import Hero from '@/components/Part/Landing/Hero';
import Instagram from '@/components/Part/Landing/Instagram';
import Events from '@/components/Part/Landing/Events';
import Catalog from '@/components/Part/Landing/Catalog';
import Navbar from '@/components/Navbar';
import Icon from '@/components/Icons';
import type { Metadata } from "next";
import Blog from '@/components/Part/Landing/Blog';
import { getMenu } from '@/utils/shopify';



export const runtime = 'edge';


export const metadata: Metadata = {
  title: "Inicio | CR Vinos MX | Vinos de la más alta calidad ",
  description: "CR vinos es una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad.",
  keywords: "vinos, CRVinos, alta calidad, vinos mexicanos, empresa mexicana, vinos en mexico, vinos calidad, calidad, vino tinto, vino blanco, vino rosado, cata de vinos, maridaje, enoturismo, bodega, viñedo, sommelier, degustación",
  metadataBase: new URL(`${process.env.SITE_URL}`),
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
};

export default async function Home() {
  const menu = await getMenu('main-menu');
  console.log("Menu: ",menu);
  return ( 
    <div className="relative min-h-screen w-full bg-transparent no-scrollbars ">
      <Navbar  darkenBg  red={false} />
      <Hero />
      <div className=' overflow-clip relative flex flex-col justify-center items-center w-full px-8 sm:px-10 md:px-20 space-y-3 mt-5'>
        <Blog />
        <Catalog />
        <Events />
        {/* <Instagram />  */}
        <Icon name="RightGrapes" className="-z-10 absolute -right-14 top-100 md:top-80 h-80 w-80 md:h-144 md:w-144 opacity-90" />
        <Icon name="Vines" className="-z-10 absolute -left-14 bottom-1/3  md:bottom-1/4  h-80 w-80 md:h-144 md:w-144 opacity-90"/>
      </div>
    </div>
  );
}

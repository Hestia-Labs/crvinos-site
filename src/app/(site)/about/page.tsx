import React from 'react';
import AboutPageClient from '@/components/Part/About';
import { getImagesByLocationIds} from '@/app/actions/getImagebyLocation';
import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const generateMetadata = (): Metadata => {
  return {
    title: "Nuestra Historia | Viñedos y Bodega en Querétaro | CR Vinos MX",
    description: "Conoce la historia de CR Vinos MX, bodega 100% mexicana en Querétaro dedicada a la producción de vinos premium con un profundo respeto por el terroir local y técnicas tradicionales combinadas con innovación.",
    icons: {
      icon: "/favicon.ico",
      apple: "/img/apple-touch-icon.png",
    },
    keywords: ['historia viñedos mexicanos', 'bodega CR Vinos', 'productores vino Querétaro', 'vitivinicultura mexicana', 'terroir Querétaro', 'viñedos sustentables México', 'elaboración vinos premium', 'bodega boutique México', 'tradición vinícola mexicana', 'enología mexicana', 'productores independientes vino', 'viñedos familiares México', 'historia de la marca', 'proceso elaboración vino México', 'valores CR Vinos', 'equipo vinicultura', 'filosofía bodega mexicana', 'bodega artesanal Querétaro', 'sobre CR Vinos', 'proyecto enológico México', 'bodega sostenible', 'historia viticultura Querétaro', 'tradición e innovación vinos', 'elaboración vinos artesanales', 'visión vinícola mexicana'],
    openGraph: {
      title: "Nuestra Historia | Viñedos y Bodega en Querétaro | CR Vinos MX",
      description: "Conoce la historia de CR Vinos MX, bodega 100% mexicana en Querétaro dedicada a la producción de vinos premium con un profundo respeto por el terroir local y técnicas tradicionales combinadas con innovación.",
      url: `${siteUrl}/about`,
      siteName: "CR Vinos MX",
      images: [
        {
          url: `${siteUrl}/img/crvinosmxLogo.jpg`,
          width: 300,
          height: 225,
          alt: "Bodega CR Vinos MX Querétaro",
        },
      ],
      locale: 'es_MX',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Nuestra Historia | Viñedos y Bodega en Querétaro | CR Vinos MX',
      description: 'Conoce la historia de CR Vinos MX, bodega 100% mexicana en Querétaro dedicada a la producción de vinos premium con un profundo respeto por el terroir local y técnicas tradicionales combinadas con innovación.',
      images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}/about`,
      languages: {
        'es-MX': `${siteUrl}/about`,
      },
    },
    appleWebApp: {
      title: 'CR Vinos MX',
      statusBarStyle: 'black-translucent',
    },
  };
};



export default async function About() {
  
  const bannerImage = await getImagesByLocationIds(['about-banner']);

  return <AboutPageClient bannerImage={bannerImage[0]} />;
}


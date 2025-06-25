import React from 'react';
import type { Metadata } from 'next';
import Contact from '@/components/Part/Contact';

const siteUrl = process.env.SITE_URL || 'https://default-url.com';

export const metadata: Metadata = {
  title: "Contacta con Nosotros | Visitas, Eventos y Pedidos | CR Vinos MX",
  description: "Contáctanos para reservar visitas a viñedos y bodega, organizar eventos, realizar pedidos especiales o cualquier consulta sobre nuestros vinos mexicanos premium elaborados en Querétaro.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['contacto bodega vinos', 'reservar visita viñedo', 'contactar CR Vinos', 'reservaciones cata vino', 'pedidos vino Querétaro', 'eventos en bodega', 'visitar viñedos Querétaro', 'ubicación bodega CR Vinos', 'teléfono viñedo', 'correo electrónico bodega', 'comprar vinos mexicanos', 'contacto distribución vinos', 'información visitas guiadas', 'reservar experiencia vinícola', 'consultas sobre vinos', 'atención a clientes vino', 'horarios visita bodega', 'reservar evento corporativo', 'información bodega Querétaro', 'formulario contacto viñedo', 'mapa ubicación CR Vinos', 'preguntas sobre productos', 'programar cata privada', 'contacto ventas por mayor', 'reserva de servicios enoturísticos'],
  openGraph: {
    title: "Contacta con Nosotros | Visitas, Eventos y Pedidos | CR Vinos MX",
    description: "Contáctanos para reservar visitas a viñedos y bodega, organizar eventos, realizar pedidos especiales o cualquier consulta sobre nuestros vinos mexicanos premium elaborados en Querétaro.",
    url: `${siteUrl}/contact`,
    siteName: "CR Vinos MX",
    images: [
      {
        url: `${siteUrl}/img/crvinosmxLogo.jpg`,
        width: 300,
        height: 225,
        alt: "Contacto CR Vinos MX Querétaro",
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacta con Nosotros | Visitas, Eventos y Pedidos | CR Vinos MX',
    description: 'Contáctanos para reservar visitas a viñedos y bodega, organizar eventos, realizar pedidos especiales o cualquier consulta sobre nuestros vinos mexicanos premium elaborados en Querétaro.',
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
    languages: {
      'es-MX': `${siteUrl}/contact`,
    },
  },
  appleWebApp: {
    title: 'CR Vinos MX',
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

export default function ContactPage() {
  return (<Contact />);
}

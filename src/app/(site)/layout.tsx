import "@/styles/globals.css";
import Footer from "@/components/Footer";
import AgeVerification from "@/components/Modals/AgeVerification";
import type { Metadata, Viewport } from "next";
import Providers from "@/utils/Providers";
import CartDrawer from "@/components/Cart/CartDrawer";
import { Cormorant_Garamond } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google'
import NotificationBarComponent from "@/components/Notifications/Bar";
import NotificationPopupContainer from "@/components/Notifications/PopupContainer";




const siteUrl = process.env.SITE_URL || "https://crvinosmx.com";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: "#fffbf7",
  colorScheme: "light",
  width: 'device-width',
  initialScale: 1.0
}


export const metadata: Metadata = {
  
  applicationName: "CR Vinos MX",
  generator: "Next.js",
  keywords: ["Vinos mexicanos", "Vinos de calidad","crvinosmx", "CRVinos", "Vino Mexicano","viñedos tequisquiapan","tequisquiapan",  "CRVinosMX", "crvinosmx", "crvinos", "vinos", "vino", "vinos de calidad", "vinos mexicanos", "vinos en mexico", "vinos de mexico", "vinos de alta calidad"],
  authors: [{ name: "CRVinosMX" }],
  creator: "CRVinosMX",
  publisher: "CRVinosMX",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
    languages: {
      "es-MX": siteUrl,
    },
  },
  openGraph: {
    title: "CR Vinos MX",
    description: "Explora nuestra selección de vinos mexicanos de alta calidad.",
    url: siteUrl,
    siteName: "CRVinos",
    images: [
      {
        url: `${siteUrl}/img/crvinosmxLogo.jpg`,
        width: 300,
        height: 225,
        alt: "CRVinos",
      },
    ],
    type: "website",
    locale: "es_MX",

  },
  twitter: {
    card: "summary_large_image",
    title: "CRVinos",
    description: "Explora nuestra selección de vinos mexicanos de alta calidad.",
    images: [`${siteUrl}/img/crvinosmxLogo.jpg`],
  },
  icons: {
    icon: [
      { url: `${siteUrl}/img/favicon-32x32.png`, type: "image/png", sizes: "32x32" },
      { url: `${siteUrl}/img/favicon-16x16.png`, type: "image/png", sizes: "16x16" },
    ],
    apple: `${siteUrl}/img/apple-touch-icon.png`,
    other: {
      rel: "mask-icon",
      url: `${siteUrl}/img/safari-pinned-tab.svg"`,
      color: "#5bbad5",
    },
  },
  manifest: "/site.webmanifest",
};

export const runtime = 'edge';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CR Vinos MX ",
    "url": siteUrl,
    "logo": `${siteUrl}/img/crvinosmxLogo.jpg`,
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100078033250234&mibextid=LQQJ4d",
      "https://www.instagram.com/crvinosmx/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+52 442 773 2600",
      "contactType": "Customer Service"
    }
  };

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      
      <body className={cormorantGaramond.className + " bg-transparent"}>

          <AgeVerification />
          <NotificationPopupContainer />
          <NotificationBarComponent />
          <CartDrawer />

          {children}
          <Footer />
        
      </body>
      <GoogleAnalytics gaId="G-MBBBLXL0L8" />
    </html>
  );
}

import "@/styles/globals.css";
import Footer from "@/components/Footer";
import AgeVer from "@/components/Modals/AgeVer"; 
import type { Metadata } from "next";
import "@/styles/globals.css";


export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "CRVinos",
    description: "Explora nuestra selección de vinos mexicanos de alta calidad.",
    images: [
      {
        url: `${process.env.SITE_URL}/img/CRVino-logo.png`,
        width: 800,
        height: 600,
        alt: "CRVinos",
      },
    ],
    type: "website",
    url: `${process.env.SITE_URL}/`,
  },
};


export const runtime = 'edge';

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "CRVinos",
        "url": `${process.env.SITE_URL}`,
        "logo": `${process.env.SITE_URL}/img/CRVino-logo.png`,
        "sameAs": [
          "https://www.facebook.com/profile.php?id=100078033250234&mibextid=LQQJ4d",
          "https://www.instagram.com/crvinosmx/"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+52 993 166 7349",
          "contactType": "Customer Service"
        }
      };
    
      return (
        <html lang="es">
          <head>
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#fffbf7" />
            <meta name="theme-color" content="#fffbf7" />
            <meta name="description" content="CRvinos es una empresa 100% mexicana que ofrece una amplia variedad de vinos de la más alta calidad." />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content="CRVinos" />
            <meta property="og:description" content="Explora nuestra selección de vinos mexicanos de alta calidad." />
            <meta property="og:image" content={`${process.env.SITE_URL}/img/CRVino-logo.png`} />
            <meta property="og:url" content={`${process.env.SITE_URL}/`} />
            <meta property="og:type" content="website" />
            <link rel="canonical" href={`${process.env.SITE_URL}/`} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          </head>
      <body className="font-cormorant bg-transparent">
        <AgeVer />
            {children}
        <Footer />
      </body>
    </html>
  );
}

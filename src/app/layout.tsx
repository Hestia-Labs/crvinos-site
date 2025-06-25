
import "@/styles/globals.css";
import Providers from "@/utils/Providers";


export const runtime = 'edge';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="es">
        <body>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
  );
}

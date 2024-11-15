import Navbar from '@/components/Navbar';
import BasicButton from '@/components/Buttons/BasicButton';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Página No Encontrada",
  description: "La página que buscas no pudo ser encontrada. Verifica la URL o regresa a la página principal.",
  icons: {
    icon: "/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  keywords: ['404', 'página no encontrada', 'error', 'CRVinos'],
  
};

const NotFound: React.FC = () => {

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center ">
      <div className="text-center py-20 px-4">
        <p className="text-crred font-bold text-6xl md:text-8xl italic mb-4">404</p>
        <h1 className="text-crred-title text-2xl md:text-4xl lg:text-6xl italic mb-6" style={{ letterSpacing: '0.1em', fontWeight: '400' }}>
          Esta página no pudo ser encontrada.
        </h1>
        <p className="text-crred text-lg md:text-xl mb-8">
          Por favor, verifica la URL o regresa a la página principal.
        </p>
        <BasicButton link="/" variant="transparent" sizex="xlarge" className="border-crred border border-solid">
          Ir a la Página Principal
        </BasicButton>
      </div>
    </div>
  );
};

export default NotFound;

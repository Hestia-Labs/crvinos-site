import Navbar from '@/components/Navbar';
import BasicButton from '@/components/Buttons/BasicButton';


const NotFound: React.FC = () => {

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center ">
      <Navbar red  />
      <div className="text-center py-20 px-4">
        <p className="text-crred font-bold text-6xl md:text-8xl italic mb-4">404</p>
        <h1 className="text-crred-title text-2xl md:text-4xl lg:text-6xl italic mb-6" style={{ letterSpacing: '0.1em', fontWeight: '400' }}>
          Esta página no pudo ser encontrada.
        </h1>
        <p className="text-crred text-lg md:text-xl mb-8">
          Por favor, verifica la URL o regresa a la página principal.
        </p>
        <BasicButton link="/" variant="bg-back" sizex="xlarge" className="border-crred border border-solid">
          Ir a la Página Principal
        </BasicButton>
      </div>
    </div>
  );
};

export default NotFound;

import Navbar from '@/components/Navbar';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <Navbar redLogo red relative />
    
      <div className="privacy-policy-container px-6 sm:px-10 md:px-20 lg:px-32 py-8">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center text-crred mt-6 mb-8">Política de Privacidad</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Introducción</h2>
            <p className="text-base sm:text-lg md:text-xl text-crred">
              En CRVinos, valoramos tu privacidad y nos comprometemos a proteger tu información personal. Esta política de privacidad explica como recopilamos, usamos y compartimos tu información.
            </p>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Información que Recopilamos</h2>
            <p className="text-base sm:text-lg md:text-xl text-crred">
              Recopilamos información que nos proporcionas directamente, como tu nombre, dirección de correo electrónico y cualquier otro dato que ingreses en nuestros formularios.
            </p>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Uso de la Información</h2>
            <p className="text-base sm:text-lg md:text-xl text-crred">
              Utilizamos la información recopilada para mejorar nuestros servicios, comunicarnos contigo y personalizar tu experiencia en nuestro sitio web.
            </p>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Compartir Información</h2>
            <p className="text-base sm:text-lg md:text-xl text-crred">
              No compartimos tu información personal con terceros, excepto cuando sea necesario para cumplir con la ley, proteger nuestros derechos y/o brindarte algún servicio, por ejemplo, al enviarte productos a domicilio.
            </p>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Seguridad</h2>
            <p className="text-base sm:text-lg md:text-xl text-crred">
              Implementamos medidas de seguridad para proteger tu información personal contra el acceso no autorizado y la divulgación. En cumplimiento a lo dispuesto en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, CRVinos hace del conocimiento este Aviso de Privacidad. El procedimiento para ejercer los Derechos de Acceso, Rectificación, Cancelación y Oposición al tratamiento de los datos personales, en adelante &quot;Derechos ARCO&quot;, está disponible en la siguiente dirección electrónica: <a href="https://www.gob.mx/cms/uploads/attachment/file/428335/DDP_Gu_a_derechos_ARCO_13Dic18.pdf" target="_blank" rel="noopener noreferrer">Guía de Derechos ARCO</a> o en la que en un futuro se designe.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Cambios a esta Política</h2>
            <p className="text-base sm:text-lg md:text-xl text-crred">
              Podemos actualizar esta política de privacidad de vez en cuando. Publicaremos en esta página los cambios.
            </p>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Contacto</h2>
            <p className="text-base sm:text-lg md:text-xl text-crred">
              Si tienes alguna pregunta sobre esta política de privacidad, por favor contáctanos, enviándonos un correo electrónico a crvinosmx@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

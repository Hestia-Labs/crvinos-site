import React from 'react';
import Navbar from '@/components/Navbar';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="terms-conditions-container px-6 sm:px-10 md:px-20 lg:px-32 py-8">
      <Navbar red relative />
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center text-crred mt-6 mb-8">Términos y Condiciones</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Introducción</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            Bienvenido a CRVinos. Al acceder y utilizar nuestro sitio web, aceptas estar sujeto a los siguientes términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, por favor no utilices nuestro sitio web.
          </p>
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Uso del Sitio Web</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            Este sitio web está destinado únicamente para uso personal y no comercial. No puedes utilizar este sitio web para ningún propósito ilegal o no autorizado. El uso indebido de cualquier información y contenido de este sitio web está estrictamente prohibido.
          </p>
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Propiedad Intelectual</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            Todo el contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes, y software, es propiedad exclusiva de CRVinos o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual nacionales e internacionales. La reproducción, distribución, o transmisión de cualquier contenido de este sitio web sin el permiso previo y por escrito de CRVinos está estrictamente prohibida.
          </p>
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Limitación de Responsabilidad</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            CRVinos no será responsable por ningún daño directo, indirecto, incidental, especial, consecuente, o ejemplar que resulte del uso o la imposibilidad de uso de nuestro sitio web, incluso si CRVinos ha sido informado de la posibilidad de tales daños.
          </p>
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Modificaciones a los Términos</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento y a nuestra sola discreción. Te notificaremos sobre cualquier cambio significativo publicando los nuevos términos en nuestro sitio web. Es tu responsabilidad revisar periódicamente estos términos para estar al tanto de cualquier cambio.
          </p>
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Ley Aplicable y Jurisdicción</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de México, sin tener en cuenta sus disposiciones sobre conflictos de leyes. Cualquier disputa que surja en relación con estos términos y condiciones estará sujeta a la jurisdicción exclusiva de los tribunales de México.
          </p>
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Contacto</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            Si tienes alguna pregunta sobre estos términos y condiciones, por favor contáctanos a través de nuestro formulario de contacto o envíanos un correo electrónico a crvinosmx@gmail.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;

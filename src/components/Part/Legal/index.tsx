import React from 'react';
import Navbar from '@/components/Navbar';

const LegalNotice: React.FC = () => {
  return (
    <div className="legal-notice-container px-6 sm:px-10 md:px-20 lg:px-32 py-8">
      <Navbar red relative />
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center text-crred mt-6 mb-8">Aviso Legal</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Identificación del Responsable</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            El responsable del sitio web <strong>CRVinos</strong>, con domicilio en Centenario Instituto Juárez 86080 Villahermosa, México, es CRVinosMX, registrada en México con RFC [Número de RFC].
          </p>
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Propiedad Intelectual</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            Todo el contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes, y software, es propiedad exclusiva de CRVinos o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual nacionales e internacionales. Queda prohibida la reproducción, distribución, transformación, o cualquier otra forma de explotación sin el consentimiento expreso y por escrito del titular.
          </p>
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Responsabilidad</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            CRVinos no se responsabiliza de los daños y perjuicios que puedan derivarse del uso de este sitio web, incluyendo errores u omisiones en los contenidos, falta de disponibilidad del sitio web, o la transmisión de virus o programas maliciosos a través de los contenidos.
          </p>
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Enlaces a Terceros</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            Este sitio web puede contener enlaces a sitios web de terceros. CRVinos no se responsabiliza del contenido ni de las políticas de privacidad de dichos sitios web. La inclusión de estos enlaces no implica la aprobación o asociación con dichos sitios.
          </p>
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Legislación Aplicable y Jurisdicción</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            Las presentes condiciones de uso se regirán e interpretarán de acuerdo con la legislación mexicana. Cualquier disputa que surja en relación con el uso de este sitio web será sometida a la jurisdicción exclusiva de los tribunales de [Ciudad, México].
          </p>
        </section>
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Contacto</h2>
          <p className="text-base sm:text-lg md:text-xl text-crred">
            Para cualquier consulta sobre este aviso legal, puedes ponerte en contacto con nosotros a través de nuestro formulario de contacto o enviando un correo electrónico a crvinosmx@gmail.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default LegalNotice;

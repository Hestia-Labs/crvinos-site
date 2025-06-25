import React from 'react';
import Navbar from '@/components/Navbar';

const LegalNotice: React.FC = () => {
  return (
    <div>
      <Navbar redLogo red relative />
      <div className="legal-notice-container px-6 sm:px-10 md:px-20 lg:px-32 py-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center text-crred mt-6 mb-8">Aviso Legal</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Identificación del Responsable</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700">
              El responsable del sitio web <strong>CR Vinos MX</strong>, con domicilio en Centenario Instituto Juárez No. 108, interior 2, C.P. 86080, Villahermosa, México, es <strong>CR Vinos MX</strong>, registrada en México con RFC cvm2202193ea.
            </p>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Propiedad Intelectual</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700">
            Todo el contenido de este sitio web, incluyendo, pero no limitado a textos, datos, gráficos, logotipos, imágenes, y software, es propiedad exclusiva de <strong>CR Vinos MX</strong>, y/o de sus proveedores de contenido, y está protegido por las leyes de propiedad intelectual nacionales e internacionales. Queda prohibida la reproducción, distribución, transformación, o cualquier otra forma de explotación, total o parcial, sin el consentimiento previo, expreso y por escrito del titular.
            </p>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Responsabilidad</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700">
            <strong>CR Vinos MX</strong> no se responsabiliza de los daños y perjuicios que puedan derivarse del uso de este sitio web, incluyendo errores u omisiones en los contenidos, falta de disponibilidad del sitio web, y/o la transmisión de virus o programas maliciosos a través de los contenidos.
            </p>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Enlaces a Terceros</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700">
              Este sitio web puede contener enlaces a sitios web de terceros. <strong>CR Vinos MX</strong> no se responsabiliza del contenido ni de las políticas de privacidad de dichos sitios web. La inclusión de esos enlaces no implica la aprobación o asociación con dichos sitios.
            </p>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Legislación Aplicable y Jurisdicción</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700">
              Las presentes condiciones de uso se regirán e interpretarán de acuerdo con la legislación mexicana. Cualquier disputa que surja en relación con el uso de este sitio web será sometida a la jurisdicción exclusiva de los tribunales de la Ciudad de México..
            </p>
          </section>
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-crred">Contacto</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700">
            Para cualquier consulta sobre este aviso legal, puede ponerse en contacto con nosotros a través de nuestro formulario de contacto, o enviando un correo electrónico a <a className=" underline " href={"mailto:admin@crvinosmx.com"}>admin@crvinosmx.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;

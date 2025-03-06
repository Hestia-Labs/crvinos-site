import React from 'react';
import Image from 'next/image';
import Icon from '@/components/Icons';

const vinificationSteps = [
  {
    title: 'Desde la Cosecha',
    description: `
      Preparar la tierra, sembrar, cultivar y cosechar son los primeros pasos del proceso de vinificación. Cada uva es seleccionada a mano para asegurar la mejor calidad.
      Este cuidado meticuloso garantiza que solo las uvas más maduras y saludables se utilicen en la producción de nuestros vinos.
      El momento de la cosecha es crucial, ya que determina la frescura y la riqueza de los sabores que se desarrollarán en cada botella.
      A medida que recolectamos cada racimo, nos aseguramos de preservar la integridad de las uvas, evitando cualquier daño que pueda afectar el sabor final del vino.
    `,
    image: 'InfoVines',
    imageAlt: 'Desde la Cosecha',
    reverse: true,
  },
  {
    title: 'Proceso de Fermentación',
    description: `
      La fermentación es donde la magia ocurre. En nuestras bodegas, utilizamos técnicas tanto tradicionales como modernas para transformar el jugo de uva en vino.
      Este proceso controlado permite desarrollar los sabores y aromas únicos que caracterizan a nuestros vinos.
      Durante la fermentación, monitoreamos cuidadosamente la temperatura y los niveles de azúcar para asegurar una conversión perfecta.
      Este paso es fundamental para establecer el perfil de sabor y la complejidad del vino, garantizando que cada botella ofrezca una experiencia sensorial excepcional.
    `,
    image: 'InfoBarrel',
    imageAlt: 'Proceso de Fermentación',
    reverse: false,
  },
  {
    title: 'A Tu Mesa',
    description: `
      Finalmente, el vino está listo para ser disfrutado. Desde la bodega hasta tu mesa, cada botella demuestra la dedicación y pasión que ponemos en nuestro trabajo.
      Disfruta de nuestros vinos en cualquier ocasión y comparte la experiencia con tus seres queridos.
      Cada sorbo revela el compromiso y la atención al detalle que hemos puesto en cada etapa de la vinificación.
      Ya sea que estés celebrando un evento especial o simplemente disfrutando de una cena tranquila, nuestro vino es el acompañamiento perfecto.
    `,
    image: 'InfoCup',
    imageAlt: 'A Tu Mesa',
    reverse: true,
  },
];


const VinificationProcess = () => {
  return (
    <div className="w-full space-y-6 px-8 sm:px-10 md:px-20 py-8">
      <h2 className="text-3xl md:text-4xl text-crred font-light tracking-wide text-center mb-10">
        Proceso de Vinificación
      </h2>
      {vinificationSteps.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col ${step.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between space-y-3 md:space-y-0 md:space-x-6 py-4`}
        >
          <div className="w-full md:w-1/2 px-6 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl  text-crred">
              {step.title}
            </h3>
            <p className=" text-base md:text-lg mt-4 text-gray-700 whitespace-pre-line">
              {step.description}
            </p>
          </div>
          <div className="w-full md:p-0 md:w-1/2 flex justify-center">
            <Icon name={step.image} className="h-60 w-60 md:h-80 md:w-80" alt={step.imageAlt} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VinificationProcess;

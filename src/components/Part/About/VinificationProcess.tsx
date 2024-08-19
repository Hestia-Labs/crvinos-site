import React from 'react';
import Image from 'next/image';

const vinificationSteps = [
  {
    title: 'Desde la Cosecha',
    description: `
      Preparar la tierra, sembrar, cultivar y cosechar son los primeros pasos del proceso de vinificación. Cada uva es seleccionada a mano para asegurar la mejor calidad.
      Este cuidado meticuloso garantiza que solo las uvas más maduras y saludables se utilicen en la producción de nuestros vinos.
      El momento de la cosecha es crucial, ya que determina la frescura y la riqueza de los sabores que se desarrollarán en cada botella.
      A medida que recolectamos cada racimo, nos aseguramos de preservar la integridad de las uvas, evitando cualquier daño que pueda afectar el sabor final del vino.
    `,
    image: '/img/grapes.jpg',
    imageAlt: 'Desde la Cosecha',
    reverse: false,
  },
  {
    title: 'Proceso de Fermentación',
    description: `
      La fermentación es donde la magia ocurre. En nuestras bodegas, utilizamos técnicas tanto tradicionales como modernas para transformar el jugo de uva en vino.
      Este proceso controlado permite desarrollar los sabores y aromas únicos que caracterizan a nuestros vinos.
      Durante la fermentación, monitoreamos cuidadosamente la temperatura y los niveles de azúcar para asegurar una conversión perfecta.
      Este paso es fundamental para establecer el perfil de sabor y la complejidad del vino, garantizando que cada botella ofrezca una experiencia sensorial excepcional.
    `,
    image: '/img/wineTanks.jpeg',
    imageAlt: 'Proceso de Fermentación',
    reverse: true,
  },
  {
    title: 'A Tu Mesa',
    description: `
      Finalmente, el vino está listo para ser disfrutado. Desde la bodega hasta tu mesa, cada botella demuestra la dedicación y pasión que ponemos en nuestro trabajo.
      Disfruta de nuestros vinos en cualquier ocasión y comparte la experiencia con tus seres queridos.
      Cada sorbo revela el compromiso y la atención al detalle que hemos puesto en cada etapa de la vinificación.
      Ya sea que estés celebrando un evento especial o simplemente disfrutando de una cena tranquila, nuestro vino es el acompañamiento perfecto.
    `,
    image: '/img/wineTable.jpeg',
    imageAlt: 'A Tu Mesa',
    reverse: false,
  },
];


const VinificationProcess = () => {
  return (
    <div className="w-full space-y-12 px-8 sm:px-10 md:px-20 py-8">
      <h2 className="text-xl sm:text-3xl md:text-4xl font-semibold text-center text-crred">Proceso de Vinificación</h2>
      {vinificationSteps.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col ${step.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between md:items-start space-y-6 md:space-y-0 md:space-x-12 py-4`}
        >
          <div className="w-full md:w-1/2 px-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-crred">{step.title}</h3>
            <p className="text-xs sm:text-sm md:text-base mt-4 text-crred whitespace-pre-line">{step.description}</p>
          </div>
          <div className="w-full p-4 md:p-0 md:w-1/2 h-64">
            <Image src={step.image} alt={step.imageAlt} width={0} height={0} sizes="100vw" className="w-full h-full object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VinificationProcess;

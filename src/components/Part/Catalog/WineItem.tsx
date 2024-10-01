import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Reveal from '@/components/Effects/reveal'; 

interface WineItemProps {
  wine: {
    slug: string;
    photo: string;
    alt: string;
    name: string;
  };
  index: number;
  selectedOption: string;
  className?: string;  
  link?: string;  
}

const WineItem: React.FC<WineItemProps> = ({ wine, index, selectedOption, className, link }) => {
  const router = useRouter();

  const imageVariants = {
    nonHover: { scale: 1 },
    hover: { scale: 1.02 },
  };

  const backgroundVariants = {
    nonHover: { opacity: 0.05 },
    hover: { opacity: 0 },
  };

  const divVariants = {
    init: { opacity: 0, y: 75 },
    ani: { opacity: 1, y: 0 },
    hover: { scale: 1 },
  };

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <Reveal key={wine.slug} width="auto">
      <motion.div 
        className={`p-5 cursor-pointer relative flex items-center justify-center wine-${index} ${className}`}  
        initial="init"
        animate="ani"
        transition={{ delay: 0.25, duration: 0.5 }}
        whileHover="hover"
        variants={divVariants}
        onClick={handleClick}  
      >
        <motion.img 
          src={wine.photo} 
          alt={wine.alt} 
          className="w-40 h-72 sm:w-48 sm:h-80 md:w-56 md:h-100  z-10 pointer-events-none object-contain center-image" 
          variants={imageVariants}
        />
        <motion.div 
          className="absolute inset-0 bg-crred opacity-5 overlay" 
          variants={backgroundVariants}
        ></motion.div>
        <div className="absolute top-0 left-0 bg-opacity-75 text-back p-2 sm:p-3 md:p-4">
          <h3 className="text-lg sm:text-xl md:text-2xl text-crred font-semibold cormorant-garamond-semibold-italic">{selectedOption}</h3>
          <p className="text-base sm:text-lg md:text-xl text-crred">{wine.name}</p>
        </div>
      </motion.div>
    </Reveal>
  );
};

export default WineItem;

'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Reveal from '@/components/Effects/reveal'; 
import { FiPlus } from "react-icons/fi";
import { toast } from 'sonner';


interface WineItemProps {
  wine: {
    slug: string;
    photo: string;
    alt: string;
    name: string;
    awards?: {
      premioImage: {
        asset: {
          url: string;
        };
        alt: string;
      };
      premioLink: string;
    };
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

  const handleClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }
    if (link) {
      router.push(link);
    }
  };

  const handleAddToCart = ({ producto }: { producto: string }): void => {
    console.log(`Se ha añadido ${producto} al carrito`);
    toast.success(`Se ha añadido ${producto} al carrito`);
  };

  return (
    <Reveal key={wine.slug} width="auto">
      <div>
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
          {wine.awards?.premioImage && wine.awards?.premioLink && (
            <img
              src={wine.awards?.premioImage.asset.url}
              className="absolute top-3 left-3 w-auto h-20 object-contain"
              alt="Medal"
              onClick={(event) => {
                event.stopPropagation();
                window.open(wine.awards?.premioLink, "_blank", "noopener,noreferrer");
              }}
            />
          )}
          <motion.button 
            className="absolute bottom-3 right-3 bg-opacity-75 p-1 bg-back rounded-full text-back flex items-center justify-center pointer-events-auto cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(event) => {
              event.stopPropagation(); 
              handleAddToCart({producto: `${selectedOption}${" "}${wine.name}`});
            }}
          >
            <FiPlus className='text-crred w-6 h-6' />
          </motion.button>
        </motion.div>
        <div className='flex flex-row justify-between py-2' >
          <div className='flex flex-row '>
            <p className="text-sm sm:text-base md:text-lg text-crred  cormorant-garamond-italic">{selectedOption}{" "}{wine.name}</p>
          </div>
          <p className='text-crred text-sm sm:text-base md:text-lg'>$100 MXN</p>
        </div>
        
      </div>
    </Reveal>
  );
};

export default WineItem;
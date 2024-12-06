// WineItem.tsx

'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Reveal from '@/components/Effects/reveal';
import { FiPlus } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';
import { useDrawer } from '@/contexts/DrawerContext';
import { ShopifyWine } from '@/types/Wine';
import { toast } from 'sonner';
import {WineShort} from '@/types/Wine';

interface WineAward {
  premioOrganization: string;
  premioYear: string;
  premioName: string;
  premioImage: {
    asset: {
      url: string;
    };
    alt: string;
  };
  premioLink: string;
}

interface WineItemProps {
  wine: WineShort;
  index: number;
  selectedOption: string;
  className?: string;
  link?: string;
}

const WineItem: React.FC<WineItemProps> = ({ wine, index, selectedOption, className, link }) => {
  const router = useRouter();
  const { openDrawer } = useDrawer();
  const { addToCart } = useCart();

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const soldOut = wine.shopifyVariables ? !wine.shopifyVariables.availableForSale : true;

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

  const handleAddToCart = (): void => {
    addToCart({
      id: wine.slug,
      name: `${selectedOption} ${wine.name}`,
      price: wine.shopifyVariables?.price ? parseFloat(wine.shopifyVariables.price) : 0,
      quantity: 1,
      image: wine.photo.asset.url,
      shopifyVariantId: wine.shopifyVariables?.shopifyVariantId ? wine.shopifyVariables?.shopifyVariantId : '',
    });
    setTimeout(() => openDrawer('cart'), 400);
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
          {/* Wine Image */}
          <motion.img
            src={wine.photo.asset.url}
            alt={wine.photo.alt}
            className="w-40 h-72 sm:w-48 sm:h-80 md:w-56 md:h-100 z-10 pointer-events-none object-contain center-image"
            variants={imageVariants}
          />

          {/* Background Overlay */}
          <motion.div
            className="absolute inset-0 bg-crred opacity-5 rounded-md overlay"
            variants={backgroundVariants}
          ></motion.div>

          {/* Award Image with Tooltip */}
          {wine.awards?.premioImage && wine.awards?.premioLink && (
            <div
              className="absolute top-3 left-3 z-30"
              onClick={(event) => {
                event.stopPropagation();
                if (wine.awards?.premioLink) {
                  window.open(wine.awards.premioLink, '_blank', 'noopener,noreferrer');
                }
              }}
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              <img
                src={wine.awards.premioImage.asset.url}
                className="w-auto h-20 object-contain"
                alt={wine.awards.premioImage.alt || 'Premio'}
              />

              {/* Tooltip */}
              {isTooltipVisible && (
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 p-3 bg-white border border-gray-300 rounded shadow-lg text-center z-40"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  <p className="text-sm font-semibold text-crred">{wine.awards.premioName}</p>
                  <p className="text-xs text-gray-600">{wine.awards.premioOrganization}</p>
                  <p className="text-xs text-gray-600">{wine.awards.premioYear}</p>
                </motion.div>
              )}
            </div>
          )}

          {/* Add to Cart Button */}
          <motion.button
            className={`absolute bottom-3 right-3 bg-opacity-75 p-1 bg-back rounded-full text-back flex items-center justify-center pointer-events-auto z-20 ${
              soldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(event) => {
              event.stopPropagation();
              if (!soldOut) handleAddToCart();
            }}
            disabled={soldOut}
          >
            <FiPlus className="text-crred w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Wine Name and Price */}
        <div className="flex flex-row justify-between py-2">
          <div className="flex flex-row">
            <p className="text-sm sm:text-base md:text-lg text-crred cormorant-garamond-italic">
              {selectedOption} {wine.name}
            </p>
          </div>
          {!soldOut && (
            <p className="text-crred text-sm sm:text-base md:text-lg">${`${wine.shopifyVariables?.price} ${wine.shopifyVariables?.currencyCode}`}</p>
          )}
        </div>
      </div>
    </Reveal>
  );
};

export default WineItem;

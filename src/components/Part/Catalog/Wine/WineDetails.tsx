'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import BasicButton from '@/components/Buttons/BasicButton';
import { Wine } from '@/types/Wine';
import { useCart } from '@/contexts/CartContext';
import { useDrawer } from '@/contexts/DrawerContext';

const WineDetails = ({ wine, soldOut }: { wine: Wine; soldOut: boolean }) => {
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const { addToCart, cartItems } = useCart();
  const { openDrawer } = useDrawer();

  const availableQuantity = wine.shopifyVariables?.quantityAvailable || 0;
  const existingCartItem = cartItems.find((item) => item.id === wine.slug);
  const currentQuantityInCart = existingCartItem ? existingCartItem.quantity : 0;

  const handleAddToCart = () => {
    const totalRequestedQuantity = currentQuantityInCart + quantity;

    if (totalRequestedQuantity > availableQuantity) {
      setErrorMessage(
        `No se pueden añadir más de ${availableQuantity} unidades. Ya tienes ${currentQuantityInCart} en el carrito.`
      );
      setTimeout(() => setErrorMessage(''), 3000); // Clear the message after 3 seconds
      return;
    }

    addToCart({
      id: wine.slug,
      name: `${wine.collection} ${wine.name}`,
      price: wine.shopifyVariables?.price ? parseFloat(wine.shopifyVariables.price) : 0,
      quantity,
      image: wine.photo.asset.url,
      shopifyVariantId: wine.shopifyVariables?.shopifyVariantId ? wine.shopifyVariables?.shopifyVariantId : '',
    });

    setTimeout(() => openDrawer('cart'), 400);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col w-full items-start space-y-5 border-b border-crred pb-7">
        <div className="flex flex-row items-center space-x-4">
          <div className="w-36 text-2xl md:text-xl py-1 flex flex-row justify-between rounded-full border-crred border px-3 text-gray-700">
            <button
              className={clsx('hover:text-crred-50', {
                'cursor-not-allowed opacity-50': quantity === 1 || soldOut,
                'hover:scale-105': quantity > 1 && !soldOut,
              })}
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={quantity === 1 || soldOut}
            >
              -
            </button>
            {quantity}
            <button
              className={clsx('hover:text-crred-50 hover:scale-105', {
                'cursor-not-allowed opacity-50': soldOut || currentQuantityInCart + quantity >= availableQuantity,
              })}
              onClick={() =>
                setQuantity((prev) => Math.min(availableQuantity - currentQuantityInCart, prev + 1))
              }
              disabled={soldOut || currentQuantityInCart + quantity >= availableQuantity}
            >
              +
            </button>
          </div>
          <BasicButton
            variant={soldOut ? 'transparent' : 'bg-crred'}
            sizex="medium"
            sizey="small"
            className={clsx('border border-crred', {
              'cursor-not-allowed opacity-50': soldOut,
            })}
            onClick={handleAddToCart}
            disabled={soldOut}
          >
            {soldOut ? 'Agotado' : 'Añadir al Carrito'}
          </BasicButton>
        </div>
      </div>
      {/* Temporary Error Message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            className="text-red-500 mt-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WineDetails;

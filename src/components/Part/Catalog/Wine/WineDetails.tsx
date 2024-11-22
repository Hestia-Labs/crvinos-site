'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import BasicButton from '@/components/Buttons/BasicButton';
import {Wine} from '@/types/Wine';
import { useCart } from '@/contexts/CartContext';
import { useDrawer } from '@/contexts/DrawerContext';
const WineDetails = ({ wine, soldOut }: { wine: Wine; soldOut: boolean }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { openDrawer } = useDrawer();

  const handleAddToCart = () => {
    if (!wine || soldOut) return;
    addToCart({
      id: wine.slug,
      name: `${wine.collection} ${wine.name}`,
      price: 100,
      quantity,
      image: wine.photo.asset.url,
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
                'cursor-not-allowed opacity-50': soldOut,
              })}
              onClick={() => setQuantity((prev) => prev + 1)}
              disabled={soldOut}
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
    </div>
  );
};

export default WineDetails;

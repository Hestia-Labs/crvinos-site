// components/CartDrawer.tsx
'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrawer } from '@/contexts/DrawerContext';
import { useCart } from '@/contexts/CartContext';
import { TfiClose } from 'react-icons/tfi';
import BasicButton from '@/components/Buttons/BasicButton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CartDrawer: React.FC = () => {
  const { isOpen, activeDrawer, closeDrawer } = useDrawer();
  const {
    cartItems,
    removeFromCart,
    updateCartItem,
    totalItems,
    totalPrice,
    checkoutUrl,
    isLoading,
  } = useCart();

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  return (
    <>
      <AnimatePresence>
        {activeDrawer === 'cart' && (
          <motion.div
            className={`fixed top-0 right-0 w-full max-w-md h-full bg-back shadow-lg z-[9999]`}
            initial={{ x: '100%' }}
            animate={{ x: isOpen ? '0%' : '100%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex flex-row justify-between w-full text-crred items-center mb-2">
                <h2 className="text-lg">Tu Carrito ({totalItems})</h2>
                <button onClick={closeDrawer} className="text-xl font-thin hover:text-crred-75">
                  <TfiClose />
                </button>
              </div>

              <div className="mt-4 flex-grow overflow-y-auto">
                {isLoading ? (
                  // Loading Skeleton
                  <div>
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex justify-between items-end mb-4 border-b border-crred pb-2">
                        <div className="flex flex-row justify-center items-center">
                          <Skeleton width={80} height={112} />
                          <div className="space-y-4 text-crred ml-4">
                            <Skeleton width={100} height={20} />
                            <Skeleton width={50} height={20} />
                            <Skeleton width={112} height={32} />
                          </div>
                        </div>
                        <Skeleton width={60} height={20} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <AnimatePresence>
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          className="flex justify-between items-end mb-4 border-b border-crred pb-2"
                          initial={{ opacity: 1, x: 0 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: '100%' }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex flex-row justify-center items-center">
                            <img src={item.image} alt={item.name} className="w-20 h-28 object-contain" />
                            <div className="space-y-4 text-crred ml-4">
                              <p>{item.name}</p>
                              <p>${item.price.toFixed(2)}</p>
                              <div className="w-28 flex flex-row justify-between rounded-full border-crred border px-3 py-1">
                                <button
                                  className="hover:text-crred-50"
                                  onClick={() => {
                                    if (item.quantity > 1) {
                                      updateCartItem(item.id, item.quantity - 1);
                                    } else {
                                      handleRemove(item.id);
                                    }
                                  }}
                                >
                                  -
                                </button>
                                {item.quantity}
                                <button
                                  className="hover:text-crred-50"
                                  onClick={() => updateCartItem(item.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <button onClick={() => handleRemove(item.id)} className="text-crred underline hover:text-crred-75">
                            Eliminar
                          </button>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-crred text-center italic">Tu carrito está vacío</p>
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Only show the total and buttons if not loading */}
              {!isLoading && (
                <>
                  <div className="mt-6 w-full text-xl text-crred flex flex-row items-center justify-between">
                    <p>Total:</p>
                    <p className="">${totalPrice.toFixed(2)}</p>
                  </div>

                  <div className="mt-4">
                    <BasicButton
                      variant="bg-crred"
                      sizex="large"
                      sizey="medium"
                      className={`w-full border border-crred ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={cartItems.length === 0}
                      link={checkoutUrl}
                    >
                      Pagar
                    </BasicButton>
                  </div>

                  <div className="mt-2">
                    <BasicButton onClick={closeDrawer} variant="cart" sizex="large" sizey="medium" className="w-full border border-crred">
                      Seguir Viendo
                    </BasicButton>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;

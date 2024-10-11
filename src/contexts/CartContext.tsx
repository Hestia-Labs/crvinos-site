// contexts/CartContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Example test data for development purposes
  const testItems: CartItem[] = [
    {
      id: '1',
      name: 'Test Wine 1',
      price: 15.99,
      quantity: 1,
      image: '/img/dbcT.png'
    },
    {
      id: '2',
      name: 'Test Wine 2',
      price: 25.49,
      quantity: 2,
      image: '/img/dbcT.png'
    },
    {
        id: '3',
        name: 'Test Wine 2',
        price: 25.49,
        quantity: 2,
        image: '/img/dbcT.png'
    },
    {
        id: '4',
        name: 'Test Wine 2',
        price: 25.49,
        quantity: 2,
        image: '/img/dbcT.png'
    },
    {
        id: '5',
        name: 'Test Wine 2',
        price: 25.49,
        quantity: 2,
        image: '/img/dbcT.png'
    },
    {
        id: '6',
        name: 'Test Wine 2',
        price: 25.49,
        quantity: 2,
        image: '/img/dbcT.png'
    },
    {
        id: '7',
        name: 'Test Wine 2',
        price: 25.49,
        quantity: 2,
        image: '/img/dbcT.png'
      }
  ];

  // Load cart from localStorage on initial load or set default test data
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      // Set test items if no cart is present in localStorage
      setCartItems(testItems);
      localStorage.setItem('cart', JSON.stringify(testItems)); // Optionally store it
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cartItems]);

  const addToCart = useCallback((item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevItems, item];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const updateCartItem = useCallback((id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItem, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

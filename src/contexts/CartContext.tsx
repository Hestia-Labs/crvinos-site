// contexts/CartContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getCurrentCart,
  createCartAndSetCookie,
  addItem,
  getCartId,
  removeItem,
  updateItemQuantity,
} from '@/app/actions/shopifyCart';


interface CartItem {
  id: string; // slug from tags or product identifier
  name: string;
  price: number;
  quantity: number;
  image: string;
  shopifyVariantId: string;
  // lineId?: string; // Include if needed in future
}

interface CartContextProps {
  cartItems: CartItem[];
  checkoutUrl: string;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean; // Added isLoading to context props
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

function mapCartDataToCartItems(cartData: any): CartItem[] {
  if (!cartData || !cartData.lines || !cartData.lines.edges) {
    return [];
  }
  return cartData.lines.edges.map((edge: any) => {
    const node = edge.node;
    // const lineId = node.id; // Uncomment if you need lineId
    const quantity = node.quantity;
    const totalAmount = parseFloat(node.cost.totalAmount.amount);
    const unitPrice = totalAmount / quantity;
    const merchandise = node.merchandise;
    const product = merchandise.product;

    const name = product.title || '';
    const image = product.featuredImage?.url || '';
    const shopifyVariantId = merchandise.id || '';
    const tags = product.tags || [];
    const slug = tags.length > 0 ? tags[0] : '';

    return {
      id: slug,
      // lineId, // Include if needed
      name,
      price: unitPrice,
      quantity,
      image,
      shopifyVariantId,
    };
  });
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize loading state

  useEffect(() => {
    async function initializeCart() {
      setIsLoading(true); // Start loading
      try {
        let cartId = await getCartId();
        
        if (!cartId) {
          const cart = await createCartAndSetCookie();
        }

        // Fetch the current cart data using the cartId
        const cartData = await getCurrentCart();

        if (!cartData) {
          setCartItems([]);
          setCheckoutUrl('');
        } else {
          const cartItems = mapCartDataToCartItems(cartData);
          setCartItems(cartItems);
          setCheckoutUrl(cartData.checkoutUrl || '');
        }
      } catch (error) {
        console.error('Failed to initialize cart', error);
        setCartItems([]);
        setCheckoutUrl('');
      } finally {
        setIsLoading(false); // End loading regardless of outcome
      }
    }

    initializeCart();
  }, []);

  const addToCart = useCallback(
    async (item: CartItem) => {
      if (!item.shopifyVariantId) {
        console.error('No shopifyVariantId provided');
        return;
      }
      setIsLoading(true); // Start loading
      try {
        await addItem(item.shopifyVariantId, item.quantity); // Call your Shopify API function

        // Fetch the updated cart data
        const cartData = await getCurrentCart();

        if (cartData) {
          const updatedCartItems = mapCartDataToCartItems(cartData);
          setCartItems(updatedCartItems);
          setCheckoutUrl(cartData.checkoutUrl || '');
        }
      } catch (error) {
        console.error('Error adding item to cart', error);
      } finally {
        setIsLoading(false); // End loading
      }
    },
    [setCartItems, setCheckoutUrl]
  );

  const removeFromCart = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        // Find the cart item with the given id (slug)
        const itemToRemove = cartItems.find((item) => item.id === id);
        if (!itemToRemove) {
          console.error('Item not found in cart');
          return;
        }

        await removeItem(itemToRemove.shopifyVariantId);

        // Fetch the updated cart data
        const cartData = await getCurrentCart();
        if (cartData ) {
          const updatedCartItems = mapCartDataToCartItems(cartData);
          setCartItems(updatedCartItems);
          setCheckoutUrl(cartData.checkoutUrl || '');
        }
      } catch (error) {
        console.error('Error removing item from cart', error);
      } finally {
        setIsLoading(false);
      }
    },
    [cartItems, setCartItems, setCheckoutUrl]
  );

  const updateCartItem = useCallback(
    async (id: string, quantity: number) => {
      setIsLoading(true); // Start loading
      try {
        // Find the cart item with the given id (slug)
        const itemToUpdate = cartItems.find((item) => item.id === id);
        if (!itemToUpdate) {
          console.error('Item not found in cart');
          return;
        }

        await updateItemQuantity(itemToUpdate.shopifyVariantId, quantity);

        // Fetch the updated cart data
        const cartData = await getCurrentCart();
        if (cartData) {
          const updatedCartItems = mapCartDataToCartItems(cartData);
          setCartItems(updatedCartItems);
          setCheckoutUrl(cartData.checkoutUrl || '');
        }
      } catch (error) {
        console.error('Error updating item quantity', error);
      } finally {
        setIsLoading(false); // End loading
      }
    },
    [cartItems, setCartItems, setCheckoutUrl]
  );
  const clearCart = useCallback(async () => {
    // Implement clearCart logic with Shopify API if applicable
    // For now, we can set cartItems and checkoutUrl to empty
    setCartItems([]);
    setCheckoutUrl('');
  }, [setCartItems, setCheckoutUrl]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        checkoutUrl,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        totalItems,
        totalPrice,
        isLoading, // Provide isLoading in context
      }}
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

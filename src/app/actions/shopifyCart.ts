"use server";

import { TAGS } from "@/utils/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@/utils/shopify";
import { ShopifyCart } from "@/utils/shopify/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItem(selectedVariantId: string, quantity: number = 1) {
    let cartId = cookies().get('cartId')?.value;
  
    if (!cartId) {
        // Create a new cart if none exists
        const cart = await createCartAndSetCookie();
        cartId = cart.id;
    }
  
    if (!selectedVariantId) {
        throw new Error('No variant ID provided');
    }
  
    try {
        if (!cartId) {
            throw new Error('No cart ID');
        }
        
        await addToCart(cartId, [
            { merchandiseId: selectedVariantId, quantity },
        ]);
        revalidateTag(TAGS.cart);
    } catch (error) {
        console.error("Error adding item, cart may be expired:", error);
        // Create a new cart and retry - cart is likely expired
        const newCart = await createCartAndSetCookie();
        await addToCart(newCart.id!, [
            { merchandiseId: selectedVariantId, quantity },
        ]);
        revalidateTag(TAGS.cart);
    }
}

export async function getCurrentCart() {
    let cartId = cookies().get("cartId")?.value;

    if (!cartId) {
        return undefined;
    }
    
    try {
        let cart = await getCart(cartId);
        // If cart exists but is empty (might happen near expiration), return it anyway
        return cart;
    } catch (error) {
        console.error("Error fetching cart, likely expired:", error);
        // Cart is expired or invalid - create a new one
        const newCart = await createCartAndSetCookie();
        return newCart;
    }
}

export async function updateItemQuantity(
    merchandiseId: string,
    quantity: number
) {
    let cartId = cookies().get("cartId")?.value;
    if (!cartId) {
        // If no cart and quantity > 0, create cart and add item
        if (quantity > 0) {
            const cart = await createCartAndSetCookie();
            await addToCart(cart.id!, [{ merchandiseId, quantity }]);
            revalidateTag(TAGS.cart);
        }
        return;
    }

    try {
        const cart = await getCart(cartId);
        if (!cart) {
            // Cart is invalid, create new one
            if (quantity > 0) {
                const newCart = await createCartAndSetCookie();
                await addToCart(newCart.id!, [{ merchandiseId, quantity }]);
                revalidateTag(TAGS.cart);
            }
            return;
        }

        const lineItem = cart.lines.edges.find(
            (edge) => edge.node.merchandise.id === merchandiseId
        );

        if (lineItem && lineItem.node.id) {
            if (quantity === 0) {
                await removeFromCart(cartId, [lineItem.node.id]);
            } else {
                await updateCart(cartId, [
                    {
                        id: lineItem.node.id,
                        merchandiseId,
                        quantity,
                    },
                ]);
            }
        } else if (quantity > 0) {
            await addToCart(cartId, [{ merchandiseId, quantity }]);
        }

        revalidateTag(TAGS.cart);
    } catch (error) {
        console.error("Error updating item, cart may be expired:", error);
        // Create a new cart and retry if quantity > 0
        if (quantity > 0) {
            const newCart = await createCartAndSetCookie();
            await addToCart(newCart.id!, [{ merchandiseId, quantity }]);
            revalidateTag(TAGS.cart);
        }
    }
}

export async function removeItem(merchandiseId: string) {
    const cartId = cookies().get("cartId")?.value;
  
    if (!cartId) {
        return; // No cart, so nothing to remove
    }
  
    try {
        // Fetch the current cart
        const cartData = await getCurrentCart();
        if (!cartData) {
            // No valid cart found
            return;
        }
  
        // Find the line item ID associated with the merchandise ID
        const lineItem = cartData.lines.edges.find(
            (edge) => edge.node.merchandise.id === merchandiseId
        );
  
        if (lineItem && lineItem.node.id) {
            await removeFromCart(cartId, [lineItem.node.id]);
            revalidateTag(TAGS.cart);
        }
    } catch (error) {
        console.error("Error removing item, cart may be expired:", error);
        // If cart is expired, item is effectively removed already, so just create a new cart
        await createCartAndSetCookie();
        revalidateTag(TAGS.cart);
    }
}

// export async function redirectToCheckout() {
//   let cartId = cookies().get("cartId")?.value;

//   if (!cartId) {
//     return "Missing cart ID";
//   }

//   let cart = await getCart(cartId);

//   if (!cart) {
//     return "Error fetching cart";
//   }

//   redirect(cart.checkoutUrl);
// }

export async function createCartAndSetCookie() {
  let cart = await createCart();
  
  // Set cookie expiration to match Shopify's 10-day cart expiration
  const tenDaysInSeconds = 10 * 24 * 60 * 60;
  
  cookies().set("cartId", cart.id!, {
    maxAge: tenDaysInSeconds,
  });
  return cart;
}

export async function getCartId() {
    return cookies().get("cartId")?.value;
}
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
    const cartId = cookies().get('cartId')?.value;
  
    if (!cartId || !selectedVariantId) {
      throw new Error('Error adding item to cart');
    }
  
    try {
      await addToCart(cartId, [
        { merchandiseId: selectedVariantId, quantity },
      ]);
      revalidateTag(TAGS.cart);
    } catch (error) {
      throw new Error('Error adding item to cart');
    }
}

export async function getCurrentCart() {
    let cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return undefined;
  }
    let cart = await getCart(cartId);
    console.log("CART:" , cart);
    return cart;
}



export async function updateItemQuantity(
    merchandiseId: string,
    quantity: number
  
) {
  let cartId = cookies().get("cartId")?.value;
  if (!cartId) {
    return "Missing cart ID";
  }

 

  try {
    const cart = await getCart(cartId);
    if (!cart) {
      return "Error fetching cart";
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
    console.error(error);
    return "Error updating item quantity";
  }
}

export async function removeItem(merchandiseId: string) {
    const cartId = cookies().get("cartId")?.value;
  
    if (!cartId) {
      throw new Error("Missing cart ID");
    }
  
    try {
      // Fetch the current cart
      const cartData = await getCurrentCart();
      if (!cartData) {
        throw new Error("Error fetching cart");
      }
  
      // Find the line item ID associated with the merchandise ID
      const lineItem = cartData.lines.edges.find(
        (edge) => edge.node.merchandise.id === merchandiseId
      );
  
      if (lineItem && lineItem.node.id) {
        await removeFromCart(cartId, [lineItem.node.id]);
        revalidateTag(TAGS.cart);
      } else {
        throw new Error("Item not found in cart");
      }
    } catch (error) {
      console.error("Error removing item from cart", error);
      throw error;
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
  console.log("CART:" , cart);
  cookies().set("cartId", cart.id!);
  return cart;
}

export async function getCartId() {
  return cookies().get("cartId")?.value;
}
import { Menu,ShopifyMenuOperation, Cart, ShopifyUpdateCartOperation,ShopifyCartOperation,ShopifyAddToCartOperation,ShopifyCreateCartOperation, ShopifyProductsOperation,ShopifyProductVariantByWineIdOperation ,ShopifyProductsByCollectionOperation, Connection, Product, ShopifyProduct, Image,ShopifyRemoveFromCartOperation } from "./types";
import {getMenuQuery} from "./queries/menu";
import { TAGS, SHOPIFY_GRAPHQL_API_ENDPOINT, HIDDEN_PRODUCT_TAG}from "../constants";
import { ensureStartWith } from "./utils";
import { isShopifyError } from "../type-guards";
import { getProductsQuery, getProductByWineIdQuery  } from "./queries/product";
import { getProductsByCollectionQuery } from "./queries/collection";
import { addToCartMutation,createCartMutation,removeFromCartMutation, editCartItemsMutation} from "./mutations/cart";
import { getCartQuery  } from "./queries/cart";
import { ShopifyWine } from "../../types/Wine";




const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";

const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const adminkey = process.env.SHOPIFY_BACKEND_ACCESS_TOKEN || "";

type ExtractVariables<T> = T extends { variables: Object } ? T['variables'] : never;

export async function shopifyFetch<T>({
    cache = "force-cache",
    headers,
    query,
    tags,
    variables,
  }: {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string;
    tags?: string[];
    variables?: ExtractVariables<T>;
  }): Promise<{ status: number; body: T } | never> {
    try {
      const result = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": key,
          ...headers,
        },
        body: JSON.stringify({
          ...(query && { query }),
          ...(variables && { variables }),
        }),
        // cache,
        // ...(tags && { next: { tags } }),
      });
  
      const body = await result.json() as { errors?: any[]; data?: any };
  
      if (body.errors) {
        throw body.errors[0];
      }
  
      return {
        status: result.status,
        body: body as T,
      };
    } catch (error) {
      if (isShopifyError(error)) {
        throw {
          cause: error.cause?.toString() || "unknown",
          status: error.status || 500,
          message: error.message,
          query,
        };
      }
  
      throw {
        error,
        query,
      };
    }
  }
  

  
function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
    return array.edges.map((edge) => edge?.node);
}

function reshapeImages(images: Connection<Image>, productTitle: string) {
    const flattened = removeEdgesAndNodes(images);
  
    return flattened.map((image) => {
      const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
  
      return {
        ...image,
        altText: image.altText || `${productTitle} - ${filename}`,
      };
    });
  }

function reshapeProduct(product: ShopifyProduct, filterHiddenProducts:boolean = true) {
    if(!product || (filterHiddenProducts && !product.tags.includes(HIDDEN_PRODUCT_TAG))){
        return undefined;
    }
    const { images, variants, ...rest } = product;
    return {
        ...rest,
        images: reshapeImages(images, product.title),
        variants: removeEdgesAndNodes(variants),
    }
}


function reshapeProducts(products: ShopifyProduct[]): Product[] {
    const reshapedProducts: Product[] = [];
    for (const product of products) {
        if (product) {
            const reshapedProduct = reshapeProduct(product);
            if (reshapedProduct) {
                reshapedProducts.push(reshapedProduct);
            }
        }
    }
    return reshapedProducts;  
}


export async function getMenu(handle: string) : Promise<Menu[]> {
  const response = await shopifyFetch<ShopifyMenuOperation>({
    headers: {
      
    },
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: { 
        handle 
    },
  });

    return (response.body?.data?.menu?.items.map((item: {title: string, url: string}) => ({  
            title: item.title,
            path: item.url.replace(domain, "").replace("/collections", "/search").replace("/pages",""),
        })    
        ) || []
    );
    
}



export async function getProducts({
    query,
    reverse,
    sortKey,
  }: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  }) {
    const res = await shopifyFetch<ShopifyProductsOperation>({
        query: getProductsQuery,
        tags: [TAGS.products],
        variables: {
          query: query || "",   
          reverse: reverse || false,
          sortKey: sortKey || "CREATED_AT",
        },
      });

    

    //   return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
    return res.body.data.products
}

export async function getProductsByCollection(handle: string) {
  const res = await shopifyFetch<ShopifyProductsByCollectionOperation>({
    query: getProductsByCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle: handle,
    },
    cache: "no-cache",
  });

  const collection = res.body.data.collectionByHandle;

  if (!collection) {
    throw new Error(`Collection with handle '${handle}' not found.`);
  }

  return collection.products;
}



export async function getProductVariantByWineId(wineId: string): Promise<ShopifyWine | undefined>{
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductByWineIdQuery,
    variables: {
      query: `tag:${wineId}`,
    },
    tags: [TAGS.products],
    cache: "no-cache",
  });

  const data = res.body.data;

  if (!data || !data.products.edges.length) {
    console.error(`Product with tag '${wineId}' not found.`);
    return undefined;
  }

  const productNode = data.products.edges[0].node;

  if (!productNode.variants.edges.length) {
    console.error(`No variants found for product '${productNode.title}'.`);
    return undefined;
  }


  const variantNode = productNode.variants.edges[0].node;

  
  const result = {
    shopifyProductId: productNode.id,
    shopifyVariantId: variantNode.id,
    availableForSale: variantNode.availableForSale,
    price: variantNode.price.amount,
    currencyCode: variantNode.price.currencyCode,
    quantityAvailable: variantNode.quantityAvailable,
  };

  return result;
}

export async function createCart() {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: "no-cache",
  });

  return res.body.data.cartCreate.cart;
}

export async function getCart(
  cartId: string | undefined
)  {
  if (!cartId) return undefined;

  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
    cache: "no-cache",
  });

  // old carts becomes 'null' when you checkout
  if (!res.body.data.cart) {
    return undefined;
  }

  return res.body.data.cart;
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
) {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
    cache: "no-cache",
  });

  return res.body.data;
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
) {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-cache",
  });

  return res.body.data;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
) {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-cache",
  });
 

  return res.body.data;
}



export type Menu = {
    title: string;
    path: string;
};

export type ShopifyMenuOperation = {
    data: {
        menu?: {
            items: {
                title: string;
                url: string;
            }[];
        };
    };
    variables: {
        handle: string;
    };
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductOption = {
    id: string;
    name: string;
    values: string[];
  };
  
  export type Edge<T> = {
    node: T;
  };
  
  export type Connection<T> = {
    edges: Array<Edge<T>>;
  };
  
  export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    quantityAvailable: number;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    price: Money;
  };
  
  export type Image = {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  
  export type SEO = {
    title: string;
    description: string;
  };
  export type ShopifyProduct = {
    id: string;
    handle: string;
    availableForSale: boolean;
    title: string;
    description: string;
    descriptionHtml: string;
    options: ProductOption[];
    priceRange: {
      maxVariantPrice: Money;
      minVariantPrice: Money;
    };
    variants: Connection<ProductVariant>;
    featuredImage: Image;
    images: Connection<Image>;
    seo: SEO;
    tags: string[];
    updatedAt: string;
  };
  
  export type Product = Omit<ShopifyProduct, "variants" | "images"> & {
    variants: ProductVariant[];
    images: Image[];
  };

  export type ShopifyProductsOperation = {
    data: {
      products: Connection<ShopifyProduct>;
    };
    variables: {
      query?: string;
      reverse?: boolean;
      sortKey?: string;
    };
  };

  export type ShopifyCreateCartOperation = {
    data: { cartCreate: { cart: ShopifyCart } };
  };
  

  export type ShopifyProductsByCollectionOperation = {
    variables: {
      handle: string;
    };
    data: {
      collectionByHandle: {
        id: string;
        title: string;
        products: {
          edges: Array<{
            node: {
              id: string;
              title: string;
              availableForSale: boolean;
              handle: string;
              description: string;
              variants: {
                edges: Array<{
                  node: {
                    id: string;
                    title: string;
                    availableForSale: boolean;
                    selectedOptions: Array<{
                      name: string;
                      value: string;
                    }>;
                    price: {
                      amount: string;
                      currencyCode: string;
                    };
                  };
                }>;
              };
              metafields: Array<{
                namespace: string;
                key: string;
                value: string;
              }>;
            };
          }>;
        };
      } | null;
    };
  };


  interface Metafield {
    namespace: string;
    key: string;
    value: string;
  }
  
  interface VariantProduct {
    id: string;
    title: string;
    availableForSale: boolean;
    handle: string;
    description: string;
    metafields: Metafield[];
  }
  
  interface Variant {
    id: string;
    title: string;
    availableForSale: boolean;
    sku: string;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: VariantProduct;
  }
  
  export type ShopifyProductVariantByWineIdOperation = {
    variables: {
      query: string;
    };
    data: {
      productVariants: {
        edges: Array<{
          node: Variant;
        }>;
      };
    };
  };

  export type ShopifyCart = {
    id: string | undefined;
    checkoutUrl: string;
    cost: {
      subtotalAmount: Money;
      totalAmount: Money;
      totalTaxAmount: Money;
    };
    lines: Connection<CartItem>;
    totalQuantity: number;
  };
  

  export type Cart = Omit<ShopifyCart, "lines"> & { 
    lines: CartItem[];
  };

  export type CartProduct = {
    id: string;
    handle: string;
    title: string;
    featuredImage: Image;
  }

  export type CartItem = { 
    id: string | undefined;
    quantity: number;
    cost:{
      totalAmount: Money;
    }
    merchandise: {
      id:string;
      title: string;
      selectedOptions: {
        name: string;
        value: string;
      }[];
      product: CartProduct;
    };
  };


  export type ShopifyAddToCartOperation = {
    data: {
      cart: ShopifyCart;
    };
    variables: {
      cartId: string;
      lines: {
        merchandiseId: string;
        quantity: number;
      }[];
    };
  };

  export type ShopifyCartOperation = {
    data: {
      cart: ShopifyCart;
    };
    variables: {
      cartId: string;
    };
  };


  export type ShopifyRemoveFromCartOperation = {
    data: {
      cartLinesRemove: {
        cart: ShopifyCart;
      };
    };
    variables: {
      cartId: string;
      lineIds: string[];
    };
  };
  
  export type ShopifyUpdateCartOperation = {
    data: {
      cartLinesUpdate: {
        cart: ShopifyCart;
      };
    };
    variables: {
      cartId: string;
      lines: {
        id: string;
        merchandiseId: string;
        quantity: number;
      }[];
    };
  };

// import { Menu,ShopifyMenuOperation  } from "./types";
// import {getMenuQuery} from "./queries";


// export async function shopifyFetch<T>({ 
//     cache = 'force-cache', 
//     headers, 
//     query, 
//     variables, 
//     tags }: { 
//         cache?:RequestCache; 
//         headers: HeadersInit;  
//         query: string; 
//         variables?: ExtractVariables<T>; 
//         tags?: string[] 
//     }): Promise<{status:number; body: T} | never> {
//         try{
//             const result = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: {
//                     ...headers,
//                     'Content-Type': 'application/json',
//                     'X-Shopify-Storefront-Access-Token': key,
//                 },
//                 body: JSON.stringify({ ...(query && {query}) , ...(variables && {variables}) }),    
//                 cache,
//                 ...(tags && {next: {tags}}),
//             })
//             const body:any = await result.json();
//             if(body.errors){
//                 throw body.errors[0];
//             }

//             return {status: result.status, body};
//         }catch(error){
//             if(isShopifyError(error)){
//                 throw {
//                     cause: error.cause?.toString() || "Unknown",
//                     status: error.status || 500,
//                     message: error.message || "Unknown",
//                     query,
//                 };
//             }
//             throw{
//                 error,
//                 query,
//             }
//         }

// }


// export async function getMenu(handle: string) : Promise<Menu[]> {
//   const response = await shopifyFetch<ShopifyMenuOperation>({
//     query: getMenuQuery,
//     tags: [TAGS.collections],
//     variables: {
//         handle 
//     },
//   });

//     return response.body?.data?.menu?.items.map((item: {title: string, url: string}) => ({  
//             title: item.title,
//             path: item.url.replace(domain, "").replace("/collections", "/search").replace("/pages",""),
//         }) || []    
//         )
    
// }
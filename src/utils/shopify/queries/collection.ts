export const getProductsByCollectionQuery = /* GraphQL */ `
  query getProductsByCollection($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      products(first: 250) {
        edges {
          node {
            id
            title
            availableForSale
            handle
            description
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            metafields(identifiers: [{ namespace: "custom", key: "wineid" }]) {
              namespace
              key
              value
            }
          }
        }
      }
    }
  }
`;

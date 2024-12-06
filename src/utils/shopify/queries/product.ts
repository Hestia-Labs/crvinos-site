export const getProductsQuery = /* GraphQL */ `
  query getProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                quantityAvailable
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          metafields(identifiers: [{ namespace: "custom", key: "wineid" }]) {
            id
            namespace
            key
            value
          }
        }
      }
    }
  }
`;

export const getProductByWineIdQuery = /* GraphQL */ `
  query getProductByWineId($query: String!) {
    products(first: 10, query: $query) {
      edges {
        node {
          id
          title
          variants(first: 10) {
            edges {
              node {
                id
                availableForSale
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.us-central1.gcp.commercetools.com/teste-dev/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: "Bearer aKKviCgYtaoNsnUEoStSFrl31cZZbA5s",
  },
});

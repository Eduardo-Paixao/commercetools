import { ApolloClient, InMemoryCache } from "@apollo/client";
const authEndpoint = "https://auth.us-central1.gcp.commercetools.com/oauth/token";

let token = "F143DLgxjpMWzoKefRdRzhfs4nYQ9R0f";
export async function getToken() {
  const response = await fetch(authEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_CTP_CLIENT_ID}:${process.env.NEXT_PUBLIC_CTP_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "manage_project:teste-dev",
    }),
  });
  const data = await response.json();
  token = data.access_token;
  return token;
}

getToken();
export const createApolloClient = new ApolloClient({
  uri: "https://api.us-central1.gcp.commercetools.com/teste-dev/graphql",
  cache: new InMemoryCache(),
  headers: { authorization: `Bearer ${token}` },
});

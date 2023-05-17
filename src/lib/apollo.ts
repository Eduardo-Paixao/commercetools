import {ApolloClient,ApolloLink,InMemoryCache,createHttpLink,from,} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import axios from "axios";

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_CTP_API_URL}/teste-dev/graphql`,
});
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("token"),
    },
  }));
  return forward(operation);
});
const asyncAuthLink = setContext(async function getToken() {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_CTP_AUTH_URL}/oauth/token?grant_type=client_credentials`,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          `${process.env.NEXT_PUBLIC_CTP_CLIENT_ID}:${process.env.NEXT_PUBLIC_CTP_CLIENT_SECRET}`
        )}`,
      },
    }
  );
  localStorage.setItem("token", `Bearer ${data.access_token}`);
});

export const createApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([asyncAuthLink,authMiddleware, httpLink]),
});

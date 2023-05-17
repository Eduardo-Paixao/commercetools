import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "@/lib/apollo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function App({ Component, ...pageProps }: AppProps) {
  return (
    <ApolloProvider client={createApolloClient}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
}

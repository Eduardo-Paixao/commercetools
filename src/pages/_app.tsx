import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "@/lib/apollo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, ...pageProps }: AppProps) {
  return (
    <ApolloProvider client={createApolloClient}>
      <Header />
      <Component {...pageProps} />
      <ToastContainer limit={3} transition={Slide} />
      <Footer />
    </ApolloProvider>
  );
}

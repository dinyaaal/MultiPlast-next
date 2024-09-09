import type { AppProps } from "next/app";
// import "../styles/globals.css";
import "./globals.css";
import "../assets/scss/style.scss";
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

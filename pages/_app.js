import "../styles/globals.css";
import { ThemeProvider } from "theme-ui";
import theme from "../theme.js";
import PlausibleProvider from "next-plausible";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider
      domain="ror.tk.gg"
      customDomain="https://stats.tk.gg"
      selfHosted={true}
    >
      <Head>
        <link rel="icon" href="/images/Artifact_of_Command.pn" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </PlausibleProvider>
  );
}

export default MyApp;

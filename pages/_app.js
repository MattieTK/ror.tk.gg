import "../styles/globals.css";
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
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}

export default MyApp;

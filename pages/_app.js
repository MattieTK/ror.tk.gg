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
        <title>Risk of Rain 2 Items - ror.tk.gg</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A complete list of all Risk of Rain 2 items. Find items by rarity and view their stats and effects." />
        <meta name="keywords" content="Risk of Rain 2, RoR2, items, rarity, Common, Uncommon, Legendary, Boss, Lunar, Equipment, Void, Survivors of the Void, Seekers of the Storm" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ror.tk.gg" />
        <meta property="og:title" content="Risk of Rain 2 Items - ror.tk.gg" />
        <meta property="og:description" content="A complete list of all Risk of Rain 2 items. Find items by rarity and view their stats and effects." />
        <meta property="og:image" content="https://ror.tk.gg/images/57_Leaf_Clover.webp" />
        <meta property="og:url" content="https://ror.tk.gg" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Risk of Rain 2 Items - ror.tk.gg" />
        <meta name="twitter:description" content="A complete list of all Risk of Rain 2 items. Find items by rarity and view their stats and effects." />
        <meta name="twitter:image" content="https://ror.tk.gg/images/57_Leaf_Clover.webp" />
        <link rel="canonical" href="https://ror.tk.gg" />
        <link rel="icon" href="/images/57_Leaf_Clover.webp" />
      </Head>
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}

export default MyApp;

import "../styles/globals.css";
import { ThemeProvider } from "theme-ui";
import theme from "../theme.js";
import PlausibleProvider from "next-plausible";

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider
      domain="tk.gg"
      customDomain="https://stats.tk.gg"
      selfHosted={true}
    >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </PlausibleProvider>
  );
}

export default MyApp;

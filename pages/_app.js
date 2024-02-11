import '../styles/fonts.css'
import '@/styles/globals.css'
import '../styles/background.css'
// add custom bootstrap
import '../styles/bootstrap.css'
import { GoogleAnalytics } from "nextjs-google-analytics";
import { SessionProvider } from "next-auth/react"
import CookieConsent from "react-cookie-consent";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { useEffect } from "react";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <CookieConsent>This website uses cookies to understand the user experience.</CookieConsent>
      <SessionProvider session={session}>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Component {...pageProps} />
      </SessionProvider>
    </>
    
  );
};

export default App;
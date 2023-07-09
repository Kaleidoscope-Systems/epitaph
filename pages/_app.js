import Layout from '../components/Layout'
import '../styles/fonts.css'
import '@/styles/globals.css'
import '../styles/background.css'
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import { GoogleAnalytics } from "nextjs-google-analytics";
import { SessionProvider } from "next-auth/react"
import CookieConsent from "react-cookie-consent";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <CookieConsent>This website uses cookies to understand the user experience.</CookieConsent>
      <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
    </>
    
  );
};

export default App;
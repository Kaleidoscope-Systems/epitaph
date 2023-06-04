import Layout from '../components/Layout'
import '../styles/fonts.css'
import '@/styles/globals.css'
import '../styles/background.css'
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import { SSRProvider } from 'react-bootstrap';
import { GoogleAnalytics } from "nextjs-google-analytics";
import { SessionProvider } from "next-auth/react"

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SSRProvider>
      <GoogleAnalytics trackPageViews />
      <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
    </SSRProvider>
  );
};

export default App;
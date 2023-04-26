import Layout from '../components/Layout'
import '../styles/fonts.css'
import '@/styles/globals.css'
import '../styles/background.css'
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import { SSRProvider } from 'react-bootstrap';
import { GoogleAnalytics } from "nextjs-google-analytics";

const App = ({ Component, pageProps }) => {
  return (
    <SSRProvider>
      <GoogleAnalytics trackPageViews />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  );
};

export default App;
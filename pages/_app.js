import Layout from '../components/Layout'
import '../styles/fonts.css'
import '@/styles/globals.css'
import '../styles/background.css'
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import { SSRProvider } from 'react-bootstrap';

export default function App({ Component, pageProps }) {
  return (
    <SSRProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout></SSRProvider>
    )
}

import Link from 'next/link'
import Layout from '@/components/Layout'

let appModule = "home"

export default function Custom404() {
    return (
    <Layout title="404" metaDescriptionContent="The page you are looking for does not exist." appModule={appModule}>
        <div className="p-5 mb-4 bg-light rounded-3">
            <h1 className="display-5 fw-bold">404 - Page Not Found</h1>
            <p className="col-md-8 fs-4">The page you are looking for does not exist.</p>
            <Link className="btn btn-primary btn-lg" role="button" href="/">Return to home page</Link>        
        </div>
    </Layout>
    )
  }

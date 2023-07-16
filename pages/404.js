import Link from 'next/link'
import Head from 'next/head'

export default function Custom404() {
    return <div className="p-5 mb-4 bg-light rounded-3">
        <Head>
			<title>404 - Ss. Nicodemus & Joseph Burial Society</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
        <h1>404 - Page Not Found</h1>
        <p className="col-md-8 fs-4">The page you are looking for does not exist.</p>
        <Link className="btn btn-primary btn-lg" role="button" href="/">Return to home page</Link>        
    </div>     
  }

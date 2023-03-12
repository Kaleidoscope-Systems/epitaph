import Head from 'next/head'
import Link from 'next/link'
//import Image from 'next/image'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Ss. Nicodemus & Joseph Burial Society</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="container py-4">
          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Orthodox Christian Burial</h1>
              <p className="col-md-8 fs-4">Learn about ancient Christian burial practices, organize your final wishes, and find prayers for your loved ones.</p>
              <Link className="btn btn-primary btn-lg" role="button" href="/ancient-christian-burial-practices">Learn more</Link>
            </div>
          </div>

          <div className="row align-items-md-stretch">
            <div className="col-md-6">
              <div className="h-100 p-5 text-bg-dark rounded-3">
                <h2>Download resources</h2>
                <p>Download the complete set of post-mortem planning documents.</p>
                <Link className="btn btn-outline-light" role="button" href="/Complete-Planning-Documents-for-Family-Records.pdf" target="_blank">Download now</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="h-100 p-5 bg-light border rounded-3">
                <h2>Sign up to pray</h2>
                <p>Volunteer to take a time slot praying for the recently departed.</p>
                <Link className="btn btn-outline-secondary" role="button" href="https://calendly.com/saintspyridon/psalm-reading-for-the-reposed" target="_blank">See schedule</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

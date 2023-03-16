import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Layout.module.css'

export default function About() {
    return (
        <div>
      <Head>
        <title>About Us - Ss. Nicodemus & Joseph Burial Society</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-bg-light p-4 rounded-5">
        <h1>
            About Us
        </h1>
        <p>
            <strong>The Ss. Nicodemus & Joseph Orthodox Christian Burial Society of Northern Colorado</strong> was established in 2013 to assist those desiring to follow Ancient Orthodox Christian Practices in pre-planning their burial or that of a loved one. It is a Pan-Orthodox society made up of Orthodox volunteers from Northern Colorado who view the society’s work as a ministry to the grieving and a service to departed Christian brothers and sisters in preparing them to attend the heavenly banquet with Christ their King and Savior.
        </p>
      </main>
    </div>
    )
}
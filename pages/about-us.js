import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Layout.module.css'
import fetchAboutUs from '@/lib/content'
import { useEffect, useState } from 'react'

export default function About() {
  const [aboutUsText, setAboutUsText] = useState("");

  const getAboutUsText = async () => {
      const data = await fetchAboutUs();
      setAboutUsText(data);
  };

  useEffect(() => {
    getAboutUsText();
  });

  return (
    <div>
      <Head>
        <title>About Us - Ss. Nicodemus & Joseph Burial Society</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Ss. Nicodemus and Joseph Burial Society of Northern Colorado" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-bg-light p-4 rounded-5">
        <div className='container-lg'>
        <h1>
            About Us
        </h1>
        <p>
          {aboutUsText}
        </p>
        </div>
      </main>
    </div>
  )
}
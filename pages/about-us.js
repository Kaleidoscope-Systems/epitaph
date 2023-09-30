import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Layout.module.css'
import { useEffect, useState } from 'react'
import fetchContent from '@/lib/content';
import Layout from '@/components/Layout';

export default function About() {
  const [aboutUsText, setAboutUsText] = useState("");

  const getAboutUsText = async () => {
      const contentData = await fetchContent('aboutUs');
      contentData && setAboutUsText(contentData.value);
  };

  useEffect(() => {
    getAboutUsText();
  });

  return (
    <div>
      <Layout title="About Us" metaDescriptionContent={process.env.NEXT_PUBLIC_SOCIETY_LONG_NAME} module="home">
        <main className="text-bg-light p-4 rounded-5">
          <div className='container-lg'>
          <h1>
              About Us
          </h1>
          <p dangerouslySetInnerHTML={{ __html: aboutUsText }} />
          </div>
        </main>
      </Layout>     
    </div>
  )
}
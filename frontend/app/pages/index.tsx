import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Top from '../components/Top';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Spidy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.container}>
        <Top />
        <Footer />
      
      </div>
    </div>
  )
}

export default Home;
import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Top from '../components/Top';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spidy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Top />

 
    </div>
  )
}

export default Home;
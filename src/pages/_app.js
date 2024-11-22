// src/pages/_app.js
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/carousel.css';
import Head from 'next/head';
import styles from '../styles/App.module.css';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      <Head>
        <title>Mi Gimnasio</title>
        <meta name="description" content="Bienvenido a nuestro gimnasio." />
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

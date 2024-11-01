import Header from '../components/Header'; 
import Footer from '../components/Footer';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header /> 
      <main>
        <Component {...pageProps} />
      </main>
      <Footer /> 
    </>
  );
}

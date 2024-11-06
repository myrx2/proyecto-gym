import AboutSection from '../sections/AboutSection';
import ProductsSection from '../sections/ProductsSection';
import ContactSection from '../sections/ContactSection';
import styles from '../styles/index.module.css';
import HeroSection from '../sections/HeroSection';

export default function Home() {
  return (
    <div className={styles['main-container']}>
      <main>
        <section className={styles['section']}>
          <HeroSection />
        </section>
        <section className={styles['section']}>
          <AboutSection />
        </section>
        <section className={styles['section']}>
          <ProductsSection />
        </section>
        <section className={styles['section']}>
          <ContactSection />
        </section>
      </main>
    </div>
  );
}

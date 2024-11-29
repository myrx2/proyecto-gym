import styles from '../styles/HeroSection.module.css';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.title}>Transformá tu Cuerpo</h1>
      <p className={styles.description}>Uníte a nuestra comunidad y comenzá tu viaje hacia un estilo de vida saludable.</p>
      <Link href="/products"> 
        <button className={styles.ctaButton}>Empezá Hoy</button>
      </Link>
    </section>
  );
}

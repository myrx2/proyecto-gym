import styles from '../styles/HeroSection.module.css';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.title}>Transforma tu Cuerpo</h1>
      <p className={styles.description}>Únete a nuestra comunidad y comienza tu viaje hacia un estilo de vida saludable.</p>
      <Link href="/products"> 
        <button className={styles.ctaButton}>Empieza Hoy</button>
      </Link>
    </section>
  );
}

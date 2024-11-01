import styles from '../styles/HeroSection.module.css'; 

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.title}>Transforma tu Cuerpo</h1>
      <p className={styles.description}>Únete a nuestra comunidad y comienza tu viaje hacia un estilo de vida saludable.</p>
      <button className={styles.ctaButton}>Empieza Hoy</button>
    </section>
  );
}

import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ProductSection from '../sections/ProductsSection';
import ContactSection from '../sections/ContactSection';
import styles from '../styles/index.module.css';
import HeroSection from '../sections/HeroSection';

export default function Home () {
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
                    <ProductSection />
                </section>

                <section className={styles['section']}>
                    <h2>Nuestras Instalaciones</h2>
                    <OwlCarousel />
                </section>

                
                <section className={styles['section']}>
                    <ContactSection />
                </section>
            </main>
        </div>
    );
}

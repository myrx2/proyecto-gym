import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ProductsPage from './products';
import ContactSection from '../sections/ContactSection';
import styles from '../styles/index.module.css';
import OwlCarouselComponent from '@/components/owlCarousel';

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
                    <h2>Nuestros Planes</h2>
                    <ProductsPage />
                </section>

                <section className={styles['section']}>
                    <h2>Nuestras Instalaciones</h2>
                    <OwlCarouselComponent />
                </section>

                <section className={styles['section']}>
                    <ContactSection />
                </section>
            </main>
        </div>
    );
}
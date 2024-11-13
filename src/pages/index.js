import AboutSection from '../sections/AboutSection';
import ProductSection from '../sections/ProductsSection';
import ContactSection from '../sections/ContactSection';
import HeroSection from '../sections/HeroSection';
import styles from '../styles/index.module.css';

import dynamic from 'next/dynamic';

// Importación dinámica para OwlCarousel
const OwlCarousel = dynamic(() => import('@/components/owlcarousel'), {
    ssr: false
});

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

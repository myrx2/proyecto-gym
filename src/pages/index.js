// src/pages/index.js
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ProductsSection from '../sections/ProductsSection';
import ContactSection from '../sections/ContactSection'; // Importa la sección de contacto

export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <ContactSection /> 
      </main>
    </div>
  );
}


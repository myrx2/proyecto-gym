import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/images/logo.png" alt="Logo" className={styles.logoImage} />
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/">Inicio</Link>
        <Link href="/about">Nosotros</Link>
        <Link href="/products">Productos</Link>
        <Link href="/contact">Contacto</Link>
        <Link href="/cart">Carrito</Link> 
      </div>
    </nav>
  );
}



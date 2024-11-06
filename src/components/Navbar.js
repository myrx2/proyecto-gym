import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [collapse, setCollapse] = useState(false);

  const handleNavClick = () => {
    setCollapse(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand d-flex align-items-center" style={{ color: '#FFD700' }}>
          <Image
            src="/images/logo.png" 
            alt="Logo del Gimnasio"
            width={50}
            height={50}
            className="me-2"
          />
          GYM
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setCollapse(!collapse)}
          aria-controls="navbarNav"
          aria-expanded={collapse}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${collapse ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link text-white" onClick={handleNavClick}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link text-white" onClick={handleNavClick}>
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className="nav-link text-white" onClick={handleNavClick}>
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link text-white" onClick={handleNavClick}>
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/cart" className="nav-link text-white" onClick={handleNavClick}>
                Carrito
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

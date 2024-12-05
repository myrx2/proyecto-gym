import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useCart from '../hooks/useCart';  // Importa el hook useCart

export default function Navbar() {
  const [collapse, setCollapse] = useState(false);

  // Desestructuramos la función 'getTotalQuantity' que ahora está optimizada con useCallback
  const { getTotalQuantity } = useCart(); 

  const totalQuantity = getTotalQuantity(); // Calcula la cantidad total optimizada

  const handleNavClick = () => {
    setCollapse(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg fixed-top">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand d-flex align-items-center" style={{ color: 'yellow' }}>
          <Image src="/images/logo.png" alt="Logo del Gimnasio" width={50} height={50} className="me-2" />
          CodeFit
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
              <Link href="/" className="nav-link text-white" onClick={handleNavClick}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link text-white" onClick={handleNavClick}>Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className="nav-link text-white" onClick={handleNavClick}>Productos</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link text-white" onClick={handleNavClick}>Contacto</Link>
            </li>
            <li className="nav-item">
              <Link href="/cart" className="nav-link text-white" onClick={handleNavClick}>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-shopping-cart"></i>
                  {totalQuantity > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-5px',
                        left: '10px',
                        backgroundColor: 'yellow',
                        borderRadius: '50%',
                        padding: '0 5px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      {totalQuantity}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

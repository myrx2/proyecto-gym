
export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="mb-3">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2" aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2" aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
      <p className="mb-0">© 2024 Gym. Todos los derechos reservados.</p>
    </footer>
  );
}

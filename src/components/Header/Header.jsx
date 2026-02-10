import { useState } from 'react';
import './Header.css';

const NAV_ITEMS = [
  { id: 'areas', label: 'ÁREAS DE ATUAÇÃO' },
  { id: 'advogados', label: 'ADVOGADOS' },
  { id: 'sobre', label: 'SOBRE O ESCRITÓRIO' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo" aria-label="Stenio Veras Advocacia - Página inicial">
          <img
            src="/images/logo.png"
            alt="Stenio Veras Advocacia"
            className="header__logo-img"
          />
          <div className="header__logo-text">
            <span className="header__logo-title">STENIO VERAS</span>
            <span className="header__logo-subtitle">ADVOCACIA</span>
          </div>
        </a>

        <button
          type="button"
          className="header__menu-toggle"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="header__menu-icon" />
          <span className="header__menu-icon" />
          <span className="header__menu-icon" />
        </button>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="header__nav-link"
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="header__search"
            aria-label="Buscar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

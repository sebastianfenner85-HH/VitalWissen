import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/laborwerte", label: "Laborwerte" },
    { to: "/supplements", label: "Supplements" },
    { to: "/krankheiten", label: "Krankheiten" },
    { to: "/medikamente", label: "Medikamente", soon: true },
    { to: "/arztbrief", label: "Arztbrief-Decoder", beta: true },
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="nav">
      <div className="nav-inner container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="nav-logo-mark">V</span>
          <span className="nav-logo-text">
            Vital<span>Wissen</span>
          </span>
        </Link>

        <div className={`nav-links${menuOpen ? " open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.soon ? "#" : link.to}
              className={`nav-link ${location.pathname.startsWith(link.to) && !link.soon ? "active" : ""} ${link.soon ? "soon" : ""}`}
              onClick={closeMenu}
            >
              {link.label}
              {link.soon && <span className="soon-tag">bald</span>}
              {link.beta && <span className="beta-tag">beta</span>}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <span className="nav-tagline">Verstehen, nicht googeln.</span>
          <button
            className="nav-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

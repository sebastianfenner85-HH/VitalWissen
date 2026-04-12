import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  const location = useLocation();

  const links = [
    { to: "/laborwerte", label: "Laborwerte" },
    { to: "/supplements", label: "Supplements" },
    { to: "/krankheiten", label: "Krankheiten" },
    { to: "/medikamente", label: "Medikamente", soon: true },
    { to: "/arztbrief", label: "Arztbrief-Decoder", soon: true },
  ];

  return (
    <nav className="nav">
      <div className="nav-inner container">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-mark">V</span>
          <span className="nav-logo-text">
            Vital<span>Wissen</span>
          </span>
        </Link>

        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.soon ? "#" : link.to}
              className={`nav-link ${location.pathname.startsWith(link.to) && !link.soon ? "active" : ""} ${link.soon ? "soon" : ""}`}
            >
              {link.label}
              {link.soon && <span className="soon-tag">bald</span>}
            </Link>
          ))}
        </div>

        <div className="nav-cta">
          <span className="nav-tagline">Verstehen, nicht googeln.</span>
        </div>
      </div>
    </nav>
  );
}

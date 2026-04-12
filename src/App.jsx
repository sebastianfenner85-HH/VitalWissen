import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LaborwerteListe from "./pages/LaborwerteListe";
import LaborwertDetail from "./pages/LaborwertDetail";
import SupplementsListe from "./pages/SupplementsListe";
import SupplementDetail from "./pages/SupplementDetail";
import KrankheitenListe from "./pages/KrankheitenListe";
import KrankheitDetail from "./pages/KrankheitDetail";
import "./styles/global.css";
import "./components/Footer.css";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Nav />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/laborwerte" element={<LaborwerteListe />} />
            <Route path="/laborwerte/:code" element={<LaborwertDetail />} />
            <Route path="/supplements" element={<SupplementsListe />} />
            <Route path="/supplements/:slug" element={<SupplementDetail />} />
            <Route path="/krankheiten" element={<KrankheitenListe />} />
            <Route path="/krankheiten/:slug" element={<KrankheitDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
      <h2 style={{ fontFamily: "Instrument Serif, serif", fontSize: "32px", marginBottom: "12px", color: "var(--text-dark)" }}>
        Seite nicht gefunden
      </h2>
      <p style={{ color: "var(--text-light)", marginBottom: "32px", maxWidth: "400px", margin: "0 auto 32px", lineHeight: "1.6" }}>
        Diese Seite gibt es (noch) nicht — oder der Link ist veraltet.
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: "white", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px 20px", cursor: "pointer", color: "var(--text-light)", fontSize: "14px" }}
        >
          ← Zurück
        </button>
        <button
          onClick={() => navigate("/")}
          style={{ background: "var(--primary)", border: "none", borderRadius: "10px", padding: "10px 20px", cursor: "pointer", color: "white", fontSize: "14px", fontWeight: "600" }}
        >
          Zur Startseite
        </button>
      </div>
    </div>
  );
}
